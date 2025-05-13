import { SlashCommandBuilder } from 'discord.js';
import { activeSpys, getPlayerName } from '../../battleMetricsUtils.js';

export const data = new SlashCommandBuilder()
    .setName('spyon')
    .setDescription('Spy on the given player and check their status every 10 minutes')
    .addStringOption(option => option.setName('playerid').setDescription('Enter the steamId of the player to check').setRequired(true))

export const execute = async (interaction) => {
    const playerId = interaction.options.getString('playerid')
    console.log(`registering spy for ${playerId}`)

    try {
        const name = await getPlayerName(playerId)
        activeSpys.push({playerId, lastSeen: null, online: null, name: name})
        await interaction.reply(`Now spying on ${name}!`);
    } catch (err) {
        await interaction.reply(`${err.message}: ${playerId}`);
    }

}
