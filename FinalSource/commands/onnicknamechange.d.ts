import Discord = require("discord.js");
import DiscordStuff = require("../DiscordStuff");
export const name: string;
export const description: string;
/**
 * @param {Discord.Client}          client
 * @param {Discord.GuildMember}     oldGuildMember
 * @param {Discord.GuildMember}     newGuildMember
 * @param {DiscordStuff.DiscordUser}discordUser
 * @returns {String}
 */
export function execute(client: Discord.Client, oldGuildMember: Discord.GuildMember, newGuildMember: Discord.GuildMember, discordUser: DiscordStuff.DiscordUser): string;
/**
 * @param {Discord.Client}          client
 * @param {Discord.GuildMember}     oldGuildMember
 * @param {Discord.GuildMember}     newGuildMember
 * @param {DiscordStuff.DiscordUser}discordUser
 * @returns {String}
 */
export function execute(client: Discord.Client, oldGuildMember: Discord.GuildMember, newGuildMember: Discord.GuildMember, discordUser: DiscordStuff.DiscordUser): string;
