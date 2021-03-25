import Discord = require('discord.js');
import DiscordStuff = require('../DiscordStuff');
/**
     * @param {Discord.Client}          client
     * @param {Discord.GuildMember}     guildMember
     * @param {DiscordStuff.DiscordUser}discordUser
     * @returns {Promise<string>}
     */
export declare function execute(client: Discord.Client, guildMember: Discord.GuildMember, discordUser: DiscordStuff.DiscordUser): Promise<string>;
declare const _default: DiscordStuff.BotCommand;
export default _default;
