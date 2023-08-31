import { eventTemplate } from 'src/types/discordCommandTemplates';
import { env } from '../utils/envManager';

const event: eventTemplate = {
  name: 'interactionCreate',
  once: false,
  execute: async (client, interaction) => {
    if (interaction.user.bot) return;
    if (!interaction.isCommand()) return;
    if (client.slashCommands.has(interaction.commandName)) {
      if (client.slashCommands.get(interaction.commandName).ownerOnly) {
        if (interaction.user.id !== env.OWNER_ID) {
          await interaction.reply({
            content: 'You are not the bot owner!',
            ephemeral: true,
          });
          return;
        }
      }

      client.slashCommands
        .get(interaction.commandName)
        .execute(client, interaction);
    }
  },
};

export default event;
