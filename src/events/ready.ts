import { ExtendedClient } from 'src/types/extendedClient';
import { eventExecute, eventTemplate } from '../types/discordCommandTemplates';
import { logging } from '../utils/logging';
import { REST, Routes } from 'discord.js';
import { env } from '../utils/envManager';

const execute: eventExecute = client => {
  // create a new REST client and set the token to the bot token
  const rest = new REST().setToken(env.DISCORD_TOKEN);

  // refresh the slash commands
  (async () => {
    logging.info(
      `Started refreshing application (/) commands. ${client.slashCommandsRaw.length} commands total.`,
    );

    // if the client user is null, return
    if (client.user === null) {
      logging.error('Client user is null!');
      return;
    }

    // send a request to the discord api to refresh the slash commands
    // the commands are generated in src/index.ts
    const data = await rest.put(
      Routes.applicationGuildCommands(client.user.id, env.GUILD_ID),
      {
        body: client.slashCommandsRaw,
      },
    );
  })();

  logging.info(`Logged in as ${client.user?.tag}!`);
  console.log('normal commands: ', client.commands);
  console.log('slash commands: ', client.slashCommands.keys());
};

const event: eventTemplate = {
  name: 'ready',
  once: true,
  execute,
};

export default event;
