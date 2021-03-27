import Discord = require('discord.js');
import DiscordStuff = require('../DiscordStuff');
export declare function execute(client: Discord.Client, oldMessage: Discord.Message, newMessage: Discord.Message, discordUser: DiscordStuff.DiscordUser): Promise<string>;
declare const _default: DiscordStuff.BotCommand;
export default _default;
