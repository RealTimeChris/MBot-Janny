import Discord = require("discord.js");
import DiscordStuff = require("../DiscordStuff");
export const name: string;
export const description: string;
/**
 * @param   {Discord.Client}            client
 * @param   {Discord.Guild}             guild
 * @param   {Discord.User}              user
 * @param   {DiscordStuff.DiscordUser}  discordUser
 * @returns {String}
 */
export function execute(client: Discord.Client, guild: Discord.Guild, user: Discord.User, discordUser: DiscordStuff.DiscordUser): string;
/**
 * @param   {Discord.Client}            client
 * @param   {Discord.Guild}             guild
 * @param   {Discord.User}              user
 * @param   {DiscordStuff.DiscordUser}  discordUser
 * @returns {String}
 */
export function execute(client: Discord.Client, guild: Discord.Guild, user: Discord.User, discordUser: DiscordStuff.DiscordUser): string;
