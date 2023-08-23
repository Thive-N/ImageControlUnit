import { Message } from 'discord.js';
import { ExtendedClient } from 'src/types/extendedClient';
import { eventTemplate } from 'src/types/types';

const event: eventTemplate = {
  name: 'messageCreate',
  once: false,
  execute: (client: ExtendedClient, message: Message) => {
    if (message === undefined) return;
    if (message.author.bot) return;
    console.log(message.content);
    // for (const command of client.commands.values()) {
    //   if (message.content.startsWith(command.name)) {
    //     command.execute(message);
    //   }
    // }
  },
};

export default event;
