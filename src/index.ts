import { env } from './utils/envManager';
import { ExtendedClient } from './types/extendedClient';
import { Collection, Message, GatewayIntentBits } from 'discord.js';
import fs from 'fs';
import { eventTemplate } from './types/types';
import { Console } from 'console';

const client = new ExtendedClient({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildInvites,
  ],
});

client.commands = new Collection();

const eventFiles = fs
  .readdirSync('./src/events')
  .filter((file: string) => file.endsWith('.ts'));

const commandFiles = fs
  .readdirSync('./src/commands')
  .filter((file: String) => file.endsWith('.ts'));

for (const file of eventFiles) {
  const event: eventTemplate = require(`./events/${file}`).default;
  console.log(`Loading event: ${event.name}` + (event.once ? ' (once)' : ''));
  if (event.once) {
    client.once(event.name, (...args) => {
      event.execute(client, ...args);
    });
  } else {
    client.on(event.name, (...args) => {
      event.execute(client, ...args);
    });
  }
}

for (const file of commandFiles) {
  const command = require(`./commands/${file}`).default;
  console.log(`Loading command: ${command.name}`);
  client.commands.set(command.name, command);
}

client.login(env.DISCORD_TOKEN);
