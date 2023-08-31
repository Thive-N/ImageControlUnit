import { Client, Message, SlashCommandBuilder } from 'discord.js';
import { ExtendedClient } from './extendedClient';

export type eventTemplate = {
  name: string;
  once: boolean;
  execute: eventExecute;
};

export type commandTemplate = {
  name: string;
  description: string;
  execute: commandExecute;
};

export type slashCommandTemplate = {
  data: SlashCommandBuilder;
  ownerOnly: boolean;
  execute: slashCommandExecute;
};

export type eventExecute = (client: ExtendedClient, ...args: any) => void;

export type commandExecute = (
  client: ExtendedClient,
  message: Message,
  ...args: any
) => void;

export type slashCommandExecute = (
  client: ExtendedClient,
  interaction: any,
  ...args: any
) => void;
