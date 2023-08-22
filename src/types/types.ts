import { Client, Message } from 'discord.js';
import { ExtendedClient } from './extendedClient';

export type eventTemplate = {
  name: string;
  once: boolean;
  execute: (client: ExtendedClient, ...args: any) => void;
};

export type commandTemplate = {
  name: string;
  description: string;
  execute: (client: ExtendedClient, message: Message, args: string[]) => void;
};
