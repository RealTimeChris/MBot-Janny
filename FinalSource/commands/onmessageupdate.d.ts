import Discord = require('discord.js');
import DiscordStuff = require('../DiscordStuff');
/**
 * @param {Discord.Client}              client
 * @param {Discord.Message}             oldMessage
 * @param {Discord.Message}             newMessage
 * @param {DiscordStuff.DiscordUser}    discordUser
 * @returns {Promise<string>}
 */
export declare function execute(client: Discord.Client, oldMessage: Discord.Message, newMessage: Discord.Message, discordUser: DiscordStuff.DiscordUser): Promise<string>;
declare const _default: DiscordStuff.BotCommand;
export default _default;
