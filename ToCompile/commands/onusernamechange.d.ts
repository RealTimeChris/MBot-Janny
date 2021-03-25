import Discord = require("discord.js");
import DiscordStuff = require("../DiscordStuff");
export const name: string;
export const description: string;
/**
 * @param {Discord.Client}              client
 * @param {Discord.User}                oldUser
 * @param {Discord.User}                newUser
 * @param {Discord.Guild}               guild
 * @param {DiscordStuff.DiscordUser}    discordUser
 * @returns {String}
 */
export function execute(client: Discord.Client, oldUser: Discord.User, newUser: Discord.User, guild: Discord.Guild, discordUser: DiscordStuff.DiscordUser): string;
/**
 * @param {Discord.Client}              client
 * @param {Discord.User}                oldUser
 * @param {Discord.User}                newUser
 * @param {Discord.Guild}               guild
 * @param {DiscordStuff.DiscordUser}    discordUser
 * @returns {String}
 */
export function execute(client: Discord.Client, oldUser: Discord.User, newUser: Discord.User, guild: Discord.Guild, discordUser: DiscordStuff.DiscordUser): string;
