import Discord = require("discord.js");
import DiscordStuff = require("../DiscordStuff");
export const name: string;
export const description: string;
/**
* @param {Discord.Message} 					message
* @param {String[]} 									args
* @param {DiscordStuff.DiscordUser}	discordUser
* @returns {String}
*/
export function execute(message: Discord.Message, args: string[], discordUser: DiscordStuff.DiscordUser): string;
/**
* @param {Discord.Message} 					message
* @param {String[]} 									args
* @param {DiscordStuff.DiscordUser}	discordUser
* @returns {String}
*/
export function execute(message: Discord.Message, args: string[], discordUser: DiscordStuff.DiscordUser): string;
