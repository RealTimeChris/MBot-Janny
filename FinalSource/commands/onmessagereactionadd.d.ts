import Discord = require('discord.js');
import DiscordStuff = require('../DiscordStuff');
export declare function execute(messageReaction: Discord.MessageReaction, client: Discord.Client, args: string[], discordUser: DiscordStuff.DiscordUser): Promise<string>;
declare const _default: DiscordStuff.BotCommand;
export default _default;
