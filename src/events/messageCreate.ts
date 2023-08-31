import { Message } from 'discord.js';
import { ExtendedClient } from 'src/types/extendedClient';
import { eventExecute, eventTemplate } from 'src/types/discordCommandTemplates';
import { env } from '../utils/envManager';

const execute: eventExecute = (client, message) => {
  if (message === undefined) return;
  if (message.author.bot) return;

  // manage the image channel
  if (message.channel.id == env.IMAGE_CHANNEL_ID) {
    // if the message has an attachment, react with 👍 and 👎
    if (message.attachments.size > 0) {
      message.react('👍');
      message.react('👎');
    } else message.delete();
    return;
  }
};
const event: eventTemplate = {
  name: 'messageCreate',
  once: false,
  execute,
};

export default event;
