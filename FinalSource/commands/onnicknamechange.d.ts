import Discord = require('discord.js');
import DiscordStuff = require('../DiscordStuff');
/**
     * @param {Discord.Client}          client
     * @param {Discord.GuildMember}     oldGuildMember
     * @param {Discord.GuildMember}     newGuildMember
     * @param {DiscordStuff.DiscordUser}discordUser
     * @returns {Promise<string>}
     */
export declare function execute(client: Discord.Client, oldGuildMember: Discord.GuildMember, newGuildMember: Discord.GuildMember, discordUser: DiscordStuff.DiscordUser): Promise<string>;
declare const _default: DiscordStuff.BotCommand;
export default _default;
