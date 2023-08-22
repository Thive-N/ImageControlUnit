import { ExtendedClient } from 'src/types/extendedClient';
import { eventTemplate } from '../types/types';

const event: eventTemplate = {
  name: 'ready',
  once: true,
  execute: (client: ExtendedClient) => {
    return console.log(`Logged in as ${client.user?.tag}!`);
  },
};

export default event;
