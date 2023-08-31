import { eventExecute, eventTemplate } from 'src/types/discordCommandTemplates';
import { env } from '../utils/envManager';

const execute: eventExecute = async (client, interaction) => {
  // if the creator of the interaction is a bot, return
  if (interaction.user.bot) return;

  // if the interaction is not a command, return
  if (!interaction.isCommand()) return;

  // if the command does not exist, return
  if (!client.slashCommands.has(interaction.commandName)) return;

  // if the command is owner only...
  if (client.slashCommands.get(interaction.commandName).ownerOnly) {
    // if the creator of the interaction is not the bot owner...
    if (interaction.user.id !== env.OWNER_ID) {
      // reply with an error message and return
      await interaction.reply({
        content: 'You are not the bot owner!',
        ephemeral: true,
      });
      return;
    }
  }

  // if here all checks have passed, execute the command
  client.slashCommands
    .get(interaction.commandName)
    .execute(client, interaction);
};

const event: eventTemplate = {
  name: 'interactionCreate',
  once: false,
  execute,
};

export default event;
