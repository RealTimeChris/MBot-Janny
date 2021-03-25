import Discord = require('discord.js');
import DiscordStuff = require('../DiscordStuff');
/**
     * @param   {Discord.Client}                    client
     * @param   {Discord.GuildMemberRoleManager}    oldGuildMemberRoleManager
     * @param   {Discord.GuildMemberRoleManager}    newGuildMemberRoleManager
     * @param   {Discord.GuildMember}               newGuildMember
     * @param   {Number}                            collectionSizeDifference
     * @param   {DiscordStuff.DiscordUser}          discordUser
     * @returns {Promise<string>}
     */
export declare function execute(client: Discord.Client, oldGuildMemberRoleManager: Discord.GuildMemberRoleManager, newGuildMemberRoleManager: Discord.GuildMemberRoleManager, newGuildMember: Discord.GuildMember, collectionSizeDifference: number, discordUser: DiscordStuff.DiscordUser): Promise<string>;
declare const _default: DiscordStuff.BotCommand;
export default _default;
