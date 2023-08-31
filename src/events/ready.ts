import { ExtendedClient } from 'src/types/extendedClient';
import { eventTemplate } from '../types/discordCommandTemplates';
import { logging } from '../utils/logging';
import { REST, Routes } from 'discord.js';
import { env } from '../utils/envManager';

const event: eventTemplate = {
  name: 'ready',
  once: true,
  execute: (client: ExtendedClient) => {
    const rest = new REST().setToken(env.DISCORD_TOKEN);

    (async () => {
      logging.info(
        `Started refreshing application (/) commands. ${client.slashCommandsRaw.length} commands total.`,
      );
      if (client.user === null) {
        logging.error('Client user is null!');
        return;
      }
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
  },
};

export default event;
