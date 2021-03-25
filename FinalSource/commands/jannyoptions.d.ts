import Discord = require('discord.js');
import DiscordStuff = require('../DiscordStuff');
/**
 * @param   {Discord.Message}           message
 * @param   {String[]}                  args
 * @param   {DiscordStuff.DiscordUser}  discordUser
 * @returns {Prmise<string>}
 */
export declare function execute(message: Discord.Message, args: string[], discordUser: DiscordStuff.DiscordUser): Promise<string>;
declare const _default: DiscordStuff.BotCommand;
export default _default;
