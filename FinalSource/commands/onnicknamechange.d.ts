import Discord = require('discord.js');
import DiscordStuff = require('../DiscordStuff');
export declare function execute(client: Discord.Client, oldGuildMember: Discord.GuildMember, newGuildMember: Discord.GuildMember, discordUser: DiscordStuff.DiscordUser): Promise<string>;
declare const _default: DiscordStuff.BotCommand;
export default _default;
