import { eventTemplate } from 'src/types/types';

const event: eventTemplate = {
  name: 'messageCreate',
  once: false,
  execute: (client, message) => {
    if (message === undefined) return;
    if (message.author.bot) return;
    console.log(message.content);
  },
};

export default event;
