import Discord = require('discord.js');
import DiscordStuff = require('../DiscordStuff');
export declare function execute(client: Discord.Client, oldGuildMemberRoleManager: Discord.GuildMemberRoleManager, newGuildMemberRoleManager: Discord.GuildMemberRoleManager, newGuildMember: Discord.GuildMember, collectionSizeDifference: number, discordUser: DiscordStuff.DiscordUser): Promise<string>;
declare const _default: DiscordStuff.BotCommand;
export default _default;
