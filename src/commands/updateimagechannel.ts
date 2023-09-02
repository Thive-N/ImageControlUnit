import { Message, SlashCommandBuilder } from 'discord.js';
import { env } from '../utils/envManager';
import {
  slashCommandExecute,
  slashCommandTemplate,
} from '../types/discordCommandTemplates';
import { logging } from '../utils/logging';
import { titleEmbed } from '../utils/embeds';

const execute: slashCommandExecute = async (client, interaction) => {
  await interaction.reply(titleEmbed('Updating image channel!', 1));

  const guild = client.guilds.resolve(env.GUILD_ID);
  if (guild === null) {
    logging.warning(
      'Guild is null! origin: src/slashcommands/updateimagechannel.ts exiting...',
    );
    return;
  }
  const channel = guild.channels.resolve(env.IMAGE_CHANNEL_ID);
  if (channel === null) {
    logging.warning(
      'Channel is null! origin: src/slashcommands/updateimagechannel.ts exiting...',
    );
    return;
  }

  // TODO: add a more verbose output so that the user knows to change the channel id
  if (!channel.isTextBased()) return;

  // TODO: paginate this to fetch more messages
  // fetch the last 100 messages and delete them if they don't have an attachment
  // else react with 👍 and 👎
  await channel.messages.fetch({ limit: 100 }).then(messages => {
    messages.forEach(message => {
      if (message.attachments.size == 0) {
        message.delete();
      } else {
        message.react('👍');
        message.react('👎');
      }
    });
  });

  // success message
  await interaction.editReply(titleEmbed('Updated image channel!', 1));
};

const slashCommand: slashCommandTemplate = {
  data: new SlashCommandBuilder()
    .setName('updateimagechannel')
    .setDescription('Updates the image channel'),

  execute,
  ownerOnly: true,
};

export default slashCommand;
