import Discord = require('discord.js');
import DiscordStuff = require('../DiscordStuff.js');
/**
 * @param   {Discord.Message}             message
 * @param   {String[]}                    args
 * @param   {DiscordStuff.DiscordUser}    discordUser
 * @returns {Promise<string>}
 */
export declare function execute(message: Discord.Message): Promise<string>;
declare const _default: DiscordStuff.BotCommand;
export default _default;
