// test.ts - Module for my testing stuff.
// Feb 4, 2021
// Chris M.
// https://github.com/RealTimeChriss

'use strict';

import Discord = require('discord.js');
import DiscordStuff = require('../DiscordStuff');

const command = new DiscordStuff.BotCommand();
command.name = 'test';
command.description = '!test';

 export async function execute(commandData: DiscordStuff.CommandData,  discordUser: DiscordStuff.DiscordUser): Promise<DiscordStuff.CommandReturnData> {
    try {
        const commandReturnData = new DiscordStuff.CommandReturnData();
		commandReturnData.commandName = command.name;

        const guildData = await discordUser.getGuildDataFromDB(commandData.guild as Discord.Guild);

        const msgString = '------\n**TEST!**\n------';
        let msgEmbed = new Discord.MessageEmbed()
			.setAuthor((commandData.guildMember as Discord.GuildMember)?.user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL() as string)
			.setColor(guildData.borderColor as [number, number, number])
			.setDescription(msgString)
			.setTimestamp(Date() as unknown as Date)
			.setTitle('__**Test:**__')
		await DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed);
        
        return commandReturnData;
    } catch (error) {
        return new Promise((resolve, reject) => {
            reject(error);
        });
    }
}
command.function = execute;
export default command as DiscordStuff.BotCommand;
