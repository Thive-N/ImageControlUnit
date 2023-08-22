import { Client } from 'discord.js';

class ExtendedClient extends Client {
  public commands: any;
  public cooldowns: any;
  constructor(options: any) {
    super(options);
    this.commands = new Map();
    this.cooldowns = new Map();
  }
}

export { ExtendedClient };
