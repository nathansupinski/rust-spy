import 'dotenv/config';
import { formatDistanceToNow, parseISO } from 'date-fns';

export const getPlayerStringStatus = async (playerId) =>{
    const serverId = process.env.RUST_SERVER_ID
    const battlemetricsUrl = `https://api.battlemetrics.com/players/${playerId}/servers/${serverId}`
    const bmRes = await fetch(battlemetricsUrl);
    const bmData = await bmRes.json();

    if(bmData?.errors){
        if(bmData.errors[0]?.status === '400' && bmData.errors[0]?.title === 'Invalid Player ID'){
            throw new Error('Invalid Player ID')
        }
    }

    const playerName = await getPlayerName(playerId)

    const status = bmData?.data?.attributes?.online ? `${playerName} is online!` : `${playerName} is offline!`
    return status
}

export const getPlayerName = async (playerId) => {
    const battlemetricsUrl = `https://api.battlemetrics.com/players/${playerId}`
    const bmRes = await fetch(battlemetricsUrl);
    const bmData = await bmRes.json();

    if(bmData?.errors){
        if(bmData.errors[0]?.status === '400' && bmData.errors[0]?.title === 'Invalid Player ID'){
            throw new Error('Invalid Player ID')
        }
    }

    const name = bmData?.data?.attributes?.name ?? 'player name not found'
    return name
}

export const spyOnPlayer = async (record, client) => {
    const channelId = process.env.DISCORD_NOTIFICATION_CHANNEL_ID
    const status = await updateSpyStatus(record)
    
    if(status.statusChanged){
        console.log(`STATUS CHANGE: ${status.message}`)
        client.channels.cache.get(channelId).send(status.message);
    } else {
        console.log(`${status.message}`)
    }
}

export const updateSpyStatus = async (record) => {
    const { playerId, lastSeen, online, name, } = record

    const serverId = process.env.RUST_SERVER_ID
    const battlemetricsUrl = `https://api.battlemetrics.com/players/${playerId}/servers/${serverId}`
    const bmRes = await fetch(battlemetricsUrl);
    const bmData = await bmRes.json();
  
    const bmAttributes = bmData?.data?.attributes
  
    if(bmAttributes){
        record.lastSeen = bmAttributes.lastSeen
        record.online = bmAttributes.online

        const lastSeenDate = parseISO(bmAttributes.lastSeen);
        const timeSinceLastSeen = formatDistanceToNow(lastSeenDate, { addSuffix: true });


        const status = {
            statusChanged: online === null ? false : online !== bmAttributes.online,
            online: bmAttributes?.online,
            timeSinceLastSeen,
            message: bmAttributes?.online ? `${name} is online!` : `${name} is offline - Last seen ${timeSinceLastSeen}.`
        }
  
        return status
  
    } else {
      throw new Error('Battlemetrics api returned unexpected data', bmData)
    }
}

export const activeSpys = []

