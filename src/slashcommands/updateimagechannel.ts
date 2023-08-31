import { Message, SlashCommandBuilder } from 'discord.js';
import { env } from '../utils/envManager';
import { slashCommandTemplate } from '../types/discordCommandTemplates';
import { logging } from '../utils/logging';

const slashCommand: slashCommandTemplate = {
  data: new SlashCommandBuilder()
    .setName('updateimagechannel')
    .setDescription('Updates the image channel'),

  async execute(client, interaction) {
    await interaction.reply('Updating image channel...');

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
    if (!channel.isTextBased()) return;
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
    await interaction.editReply('Image channel updated!');
  },
  ownerOnly: true,
};

export default slashCommand;
