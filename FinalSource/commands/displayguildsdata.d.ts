import Discord = require('discord.js');
import DiscordStuff = require('../DiscordStuff.js');
/**
 * Displays all of the data for all of the guilds, either in console or in chat.
 */
export declare function execute(message: Discord.Message, args: string[], discordUser: DiscordStuff.DiscordUser): Promise<string>;
declare const _default: DiscordStuff.BotCommand;
export default _default;
