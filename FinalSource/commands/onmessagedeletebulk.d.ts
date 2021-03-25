import Discord = require('discord.js');
import DiscordStuff = require('../DiscordStuff');
/**
 * @param {Discord.Client}                              client
 * @param {Discord.Collection<String, Discord.Message>} collection
 * @param {DiscordStuff.DiscordUser}                    discordUser
 * @returns {Promise<string>}
 */
export declare function execute(client: Discord.Client, collection: Discord.Collection<string, Discord.Message>, discordUser: DiscordStuff.DiscordUser): Promise<string>;
declare const _default: DiscordStuff.BotCommand;
export default _default;
