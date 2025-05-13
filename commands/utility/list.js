import { SlashCommandBuilder } from 'discord.js';
import { activeSpys, updateSpyStatus } from '../../battleMetricsUtils.js';

export const data = new SlashCommandBuilder()
    .setName('list')
    .setDescription('List all currently active spies')
    
export const execute = async (interaction) => {
    console.log(`Listing active spies`)

    if(activeSpys.length === 0){
        await interaction.reply(`No spies are currently set.`); 
        return
    }

    let spyListString = 'Active Spies:\n'
    
    for await(const record of activeSpys){
        const status = await updateSpyStatus(record)

        const message = status.online ? 'Online!' : `Offline, last Seen: ${status.timeSinceLastSeen}.`
        
        spyListString = spyListString + `${record.name} - ${record.playerId} - ${message}\n`
    }


    await interaction.reply(spyListString);


}
