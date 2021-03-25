import Discord = require("discord.js");
import DiscordStuff = require("../DiscordStuff");
export const name: string;
export const description: string;
/**
 * @param   {Discord.Client}                    client
 * @param   {Discord.GuildMemberRoleManager}    oldGuildMemberRoleManager
 * @param   {Discord.GuildMemberRoleManager}    newGuildMemberRoleManager
 * @param   {Discord.GuildMember}               newGuildMember
 * @param   {Number}                            collectionSizeDifference
 * @param   {DiscordStuff.DiscordUser}          discordUser
 * @returns {String}
 */
export function execute(client: Discord.Client, oldGuildMemberRoleManager: Discord.GuildMemberRoleManager, newGuildMemberRoleManager: Discord.GuildMemberRoleManager, newGuildMember: Discord.GuildMember, collectionSizeDifference: number, discordUser: DiscordStuff.DiscordUser): string;
/**
 * @param   {Discord.Client}                    client
 * @param   {Discord.GuildMemberRoleManager}    oldGuildMemberRoleManager
 * @param   {Discord.GuildMemberRoleManager}    newGuildMemberRoleManager
 * @param   {Discord.GuildMember}               newGuildMember
 * @param   {Number}                            collectionSizeDifference
 * @param   {DiscordStuff.DiscordUser}          discordUser
 * @returns {String}
 */
export function execute(client: Discord.Client, oldGuildMemberRoleManager: Discord.GuildMemberRoleManager, newGuildMemberRoleManager: Discord.GuildMemberRoleManager, newGuildMember: Discord.GuildMember, collectionSizeDifference: number, discordUser: DiscordStuff.DiscordUser): string;
