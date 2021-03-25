import Discord = require('discord.js');
import DiscordStuff = require('../DiscordStuff');
/**
 * @param   {Discord.Client}            client
 * @param   {Discord.Guild}             guild
 * @param   {Discord.User}              user
 * @param   {DiscordStuff.DiscordUser}  discordUser
 * @returns {Promise<string>}
 */
export declare function execute(client: Discord.Client, guild: Discord.Guild, user: Discord.User, discordUser: DiscordStuff.DiscordUser): Promise<string>;
declare const _default: DiscordStuff.BotCommand;
export default _default;
