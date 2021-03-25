import Discord = require('discord.js');
import DiscordStuff = require('../DiscordStuff.js');
/*** Displays the data about the currend user.
* @param   {Discord.Message}             message
* @param   {String[]}                    args
* @param   {DiscordStuff.DiscordUser}    discordUser
* @returns {Promise<string>}
*/
export declare function execute(message: Discord.Message, args: string[], discordUser: DiscordStuff.DiscordUser): Promise<string>;
declare const _default: DiscordStuff.BotCommand;
export default _default;
