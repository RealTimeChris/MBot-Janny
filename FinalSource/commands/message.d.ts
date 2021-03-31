import Discord = require('discord.js');
import DiscordStuff = require('../DiscordStuff');
/**
   * Selects a chosen chat message and sends it via the appropriate channel,
     * upon recieving a trigger phrase or word.
   * @param   {Discord.Message}           message
   * @param   {String[]}                  args
   * @param   {DiscordStuff.discordUser}  discordUser
   * @returns {Promise<string>}
   */
export declare function execute(message: Discord.Message): Promise<string>;
declare const _default: DiscordStuff.BotCommand;
export default _default;
