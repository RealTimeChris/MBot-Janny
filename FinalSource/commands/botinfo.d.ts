import Discord = require('discord.js');
import DiscordStuff = require('../DiscordStuff.js');
/**
 * Displays the data about the currend user
 *  */
export declare function execute(message: Discord.Message, args: string[], discordUser: DiscordStuff.DiscordUser): Promise<string>;
declare const _default: DiscordStuff.BotCommand;
export default _default;
