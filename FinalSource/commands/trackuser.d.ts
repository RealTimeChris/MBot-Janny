import Discord = require('discord.js');
import DiscordStuff = require('../DiscordStuff');
/**
 * Deals with the setting of a user's tracking status.
 */
export declare function execute(message: Discord.Message, args: string[], discordUser: DiscordStuff.DiscordUser): Promise<string>;
declare const _default: DiscordStuff.BotCommand;
export default _default;
