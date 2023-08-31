import { Message } from 'discord.js';

export function defaultEmbed(
  title: string,
  description: string,
  color: number,
) {
  return {
    embeds: [
      {
        title: title,
        description: description,
        color: color,
      },
    ],
  };
}

export function titleEmbed(title: string, color: number) {
  return {
    embeds: [
      {
        title: title,
        color: color,
      },
    ],
  };
}
