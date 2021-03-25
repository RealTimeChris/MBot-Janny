import Discord = require('discord.js');
import DiscordStuff = require('../DiscordStuff');
/**
 * Purges up to 100 messages from a given channel at a time.
 * @param   {Discord.Message}             message
 * @param   {String[]}                    args
 * @param   {DiscordStuff.DiscordUser}    discordUser
 * @returns {String}
 */
export declare function execute(message: Discord.Message, args: string[], discordUser: DiscordStuff.DiscordUser): Promise<string>;
declare const _default: DiscordStuff.BotCommand;
export default _default;
