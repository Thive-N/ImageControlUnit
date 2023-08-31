import { Client, Message, SlashCommandBuilder } from 'discord.js';
import { ExtendedClient } from './extendedClient';

export type eventTemplate = {
  name: string;
  once: boolean;
  execute: (client: ExtendedClient, ...args: any) => void;
};

export type commandTemplate = {
  name: string;
  description: string;
  execute: (client: ExtendedClient, message: Message, ...args: any) => void;
};

export type slashCommandTemplate = {
  data: SlashCommandBuilder;
  ownerOnly: boolean;
  execute: (client: ExtendedClient, interaction: any, ...args: any) => void;
};
