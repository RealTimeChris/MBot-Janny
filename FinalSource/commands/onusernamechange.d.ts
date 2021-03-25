import Discord = require('discord.js');
import DiscordStuff = require('../DiscordStuff');
/**
 * @param {Discord.Client}              client
 * @param {Discord.User}                oldUser
 * @param {Discord.User}                newUser
 * @param {Discord.Guild}               guild
 * @param {DiscordStuff.DiscordUser}    discordUser
 * @returns {Promise<string>}
 */
export declare function execute(client: Discord.Client, oldUser: Discord.User, newUser: Discord.User, guild: Discord.Guild, discordUser: DiscordStuff.DiscordUser): Promise<string>;
declare const _default: DiscordStuff.BotCommand;
export default _default;
