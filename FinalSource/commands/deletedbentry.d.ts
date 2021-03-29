import DiscordStuff = require('../DiscordStuff');
/**
     * @param 	{Discord.Message} 			message
     * @param 	{String[]} 					args
     * @param 	{DiscordStuff.DiscordUser}	discordUser
     * @returns {Promise<strin>}
     */
export declare function execute(commandData: DiscordStuff.CommandData, discordUser: DiscordStuff.DiscordUser): Promise<string>;
declare const _default: DiscordStuff.BotCommand;
export default _default;
