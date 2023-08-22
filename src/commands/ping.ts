import { commandTemplate } from 'src/types/types';

const command: commandTemplate = {
  name: 'ping',
  description: 'Ping!',
  execute: (client, message, args) => {
    message.channel.send('Pong.');
  },
};

export default command;
