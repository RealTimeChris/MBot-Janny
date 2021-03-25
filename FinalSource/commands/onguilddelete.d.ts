import Discord = require('discord.js');
import DiscordStuff = require('../DiscordStuff');
/**
 * @param   {Discord.Guild}             guild
 * @param   {DiscordStuff.DiscordUser}  discordUser
 * @returns {Promise<string>}
 */
export declare function execute(guild: Discord.Guild, discordUser: DiscordStuff.DiscordUser): Promise<string>;
declare const _default: DiscordStuff.BotCommand;
export default _default;
