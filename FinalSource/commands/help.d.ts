import Discord = require('discord.js');
import DiscordStuff = require('../DiscordStuff.js');
/**
 * Returns a menu of helping information for the various commands I have.
 * @param   {Discord.Message}             message
 * @param   {String[]}                    args
 * @param   {DiscordStuff.DiscordUser}    discordUser
 * @returns {Promise<string>}
 */
export declare function execute(message: Discord.Message, args: string[]): Promise<string>;
declare const _default: DiscordStuff.BotCommand;
export default _default;
