import Discord = require('discord.js');
import DiscordStuff = require('../DiscordStuff.js');
/**
     * A testing function for the early implementation of the command handler.
     * @param   {Discord.Message}             message
     * @param   {String[]}                    args
     * @param   {DiscordStuff.DiscordUser}    discordUser
     * @returns {String}
     */
export declare function execute(message: Discord.Message): Promise<unknown>;
declare const _default: DiscordStuff.BotCommand;
export default _default;
