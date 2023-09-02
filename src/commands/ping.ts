import { SlashCommandBuilder } from 'discord.js';
import {
  slashCommandExecute,
  slashCommandTemplate,
} from 'src/types/discordCommandTemplates';
import { titleEmbed } from '../utils/embeds';

const execute: slashCommandExecute = async (client, interaction) => {
  await interaction.reply(titleEmbed('Pong!', 200));
};

const slashCommand: slashCommandTemplate = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!'),
  execute,
  ownerOnly: false,
};

export default slashCommand;
