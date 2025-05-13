import { SlashCommandBuilder } from 'discord.js';
import { activeSpys } from '../../battleMetricsUtils.js';

export const data = new SlashCommandBuilder()
    .setName('removespy')
    .setDescription('Stop spying on the given player.')
    .addStringOption(option => option.setName('playerid').setDescription('Enter the steamId or the name of the player stop spying on').setRequired(true))

export const execute = async (interaction) => {
    const playerId = interaction.options.getString('playerid')
    console.log(`removing spy for ${playerId}`)

    const spyIndex = activeSpys.findIndex((item)=> item.id === playerId || item.name.toLowerCase() === playerId.toLowerCase())

    if(spyIndex >= 0){
        const spyRecord = activeSpys[spyIndex]
        activeSpys.splice(spyIndex, 1)
        await interaction.reply(`Stopped spying on ${spyRecord.name}.`);
    } else {
        await interaction.reply(`No spy found for '${playerId}'.`);
    }
}
