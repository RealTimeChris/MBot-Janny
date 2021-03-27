import Discord = require('discord.js');
import DiscordStuff = require('../DiscordStuff');
export declare function execute(client: Discord.Client, oldUser: Discord.User, newUser: Discord.User, guild: Discord.Guild, discordUser: DiscordStuff.DiscordUser): Promise<string>;
declare const _default: DiscordStuff.BotCommand;
export default _default;
