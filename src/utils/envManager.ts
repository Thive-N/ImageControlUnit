import * as dotenv from 'dotenv';
import { resolve } from 'path';
import fs from 'fs';

const FILEPATH = resolve(__dirname, '../../.env');

// check if .env file exists
if (!fs.existsSync(FILEPATH)) {
  console.error('No .env file found creating template...');
  fs.writeFileSync(FILEPATH, `DISCORD_TOKEN=\nOWNER_ID=\nIMAGE_CHANNEL_ID=`);
  console.error('Please fill out the .env file and restart the bot.');
  process.exit(0);
}

// load .env file
dotenv.config({ path: FILEPATH });

export const env = {
  DISCORD_TOKEN: process.env.DISCORD_TOKEN!,
  OWNER_ID: process.env.OWNER_ID!,

  IMAGE_CHANNEL_ID: process.env.IMAGE_CHANNEL_ID!,
  GUILD_ID: process.env.GUILD_ID!,
};
