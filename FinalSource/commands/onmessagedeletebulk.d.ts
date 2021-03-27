import Discord = require('discord.js');
import DiscordStuff = require('../DiscordStuff');
export declare function execute(client: Discord.Client, collection: Discord.Collection<string, Discord.Message>, discordUser: DiscordStuff.DiscordUser): Promise<string>;
declare const _default: DiscordStuff.BotCommand;
export default _default;
