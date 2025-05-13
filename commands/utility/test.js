import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
    .setName('test')
    .setDescription('test action')

export const execute = async (interaction) => {
    await interaction.reply('Pong!');
}