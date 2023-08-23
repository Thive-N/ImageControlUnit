import { ExtendedClient } from 'src/types/extendedClient';
import { eventTemplate } from '../types/types';

const event: eventTemplate = {
  name: 'ready',
  once: true,
  execute: (client: ExtendedClient) => {
    console.log(`Logged in as ${client.user?.tag}!`);
    console.log(client.commands);
  },
};
