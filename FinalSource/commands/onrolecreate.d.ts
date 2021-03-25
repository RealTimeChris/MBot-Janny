import Discord = require('discord.js');
import DiscordStuff = require('../DiscordStuff');
/**
 * @param {Discord.Client}              client
 * @param {Discord.Role}                role
 * @param {DiscordStuff.DiscordUser}    discordUser
 * @returns {Promise<string>}
 */
export declare function execute(client: Discord.Client, role: Discord.Role, discordUser: DiscordStuff.DiscordUser): Promise<string>;
declare const _default: DiscordStuff.BotCommand;
export default _default;
