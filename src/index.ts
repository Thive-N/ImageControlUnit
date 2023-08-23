import { env } from './utils/envManager';
import { ExtendedClient } from './types/extendedClient';
import { Collection, Message, GatewayIntentBits } from 'discord.js';
import fs from 'fs';
import { eventTemplate } from './types/types';
import { logging } from './utils/logging';

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

// get all event files and command files from their respective folders and load them
const eventFiles = fs
  .readdirSync('./src/events')
  .filter((file: string) => file.endsWith('.ts'));

const commandFiles = fs
  .readdirSync('./src/commands')
  .filter((file: String) => file.endsWith('.ts'));

for (const file of eventFiles) {
  const event: eventTemplate = require(`./events/${file}`).default;
  if (event == null) {
    logging.warning(
      `The command at ${file} is malformed and will not be loaded.`,
    );
    continue;
  }
  logging.info(`Loading event ${event.name}` + (event.once ? ' (once)' : ''));
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
  if (command == null) {
    logging.warning(
      `The command at ${file} is malformed and will not be loaded.`,
    );
    continue;
  }
  logging.info(`Loading command ${command.name}`);
  client.commands.set(command.name, command);
}

client.login(env.DISCORD_TOKEN);
