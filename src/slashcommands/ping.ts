import { SlashCommandBuilder } from 'discord.js';
import { slashCommandTemplate } from 'src/types/discordCommandTemplates';

const slashCommand: slashCommandTemplate = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!'),
  async execute(client, interaction) {
    await interaction.reply('Pong!');
  },
  ownerOnly: false,
};

export default slashCommand;
