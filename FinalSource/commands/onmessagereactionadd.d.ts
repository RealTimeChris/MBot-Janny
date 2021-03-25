import Discord = require('discord.js');
import DiscordStuff = require('../DiscordStuff.js');
/**
 * @param   {Discord.MessageReaction}       messageReaction
 * @param   {String[]}                      args
 * @param   {Discord.Client}                client
 * @param   {DiscordStuff.DiscordUser}      discordUser
 * @returns {Promise<string>}
 */
export declare function execute(messageReaction: Discord.MessageReaction, client: Discord.Client, args: string[], discordUser: DiscordStuff.DiscordUser): Promise<string>;
declare const _default: DiscordStuff.BotCommand;
export default _default;
