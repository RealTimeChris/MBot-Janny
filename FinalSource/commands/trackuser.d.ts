import Discord = require('discord.js');
import DiscordStuff = require('../DiscordStuff');
/**
 * Deals with the setting of a user's tracking status.
 * @param   {Discord.Message}           message
 * @param   {String[]}                  args
 * @param   {DiscordStuff.DiscordUser}  discordUser
 * @returns {Promise<string>}
 */
export declare function execute(message: Discord.Message, args: string[], discordUser: DiscordStuff.DiscordUser): Promise<string>;
declare const _default: DiscordStuff.BotCommand;
export default _default;
