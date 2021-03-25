import Discord = require("discord.js");
import DiscordStuff = require("../DiscordStuff");
export const name: string;
export const description: string;
/**
 * @param {Discord.Client}              client
 * @param {Discord.Message}             message
 * @param {DiscordStuff.DiscordUser}    discordUser
 * @returns {String}
 */
export function execute(client: Discord.Client, message: Discord.Message, discordUser: DiscordStuff.DiscordUser): string;
/**
 * @param {Discord.Client}              client
 * @param {Discord.Message}             message
 * @param {DiscordStuff.DiscordUser}    discordUser
 * @returns {String}
 */
export function execute(client: Discord.Client, message: Discord.Message, discordUser: DiscordStuff.DiscordUser): string;
