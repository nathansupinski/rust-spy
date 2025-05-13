import { SlashCommandBuilder } from 'discord.js';
import { getPlayerStringStatus } from '../../battleMetricsUtils.js';

export const data = new SlashCommandBuilder()
    .setName('checkplayer')
    .setDescription('Checks if the given player is online')
    .addStringOption(option => option.setName('playerid').setDescription('Enter the steamId of the player to check').setRequired(true))

export const execute = async (interaction) => {
    const playerId = interaction.options.getString('playerid')
    console.log(`checking player ${playerId}`)

    try {
        const status = await getPlayerStringStatus(playerId)
        await interaction.reply(status);
    } catch (err) {
        await interaction.reply(`${err.message}: ${playerId}`);
    }

}
