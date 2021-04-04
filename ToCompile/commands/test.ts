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

async function execute(commandData: DiscordStuff.CommandData, discordUser: DiscordStuff.DiscordUser): Promise<DiscordStuff.CommandReturnData> {
    try {
        const commandReturnData = new DiscordStuff.CommandReturnData();
		commandReturnData.commandName = command.name;

        if (commandData.guildMember instanceof Discord.User){
            const msgString = '------\n**TEST!**\n------';
            let msgEmbed = new Discord.MessageEmbed()
                .setAuthor((commandData.guildMember as Discord.User).username, (commandData.guildMember as Discord.User).avatarURL()!)
                .setColor([254, 254, 254])
                .setDescription(msgString)
                .setTimestamp(Date() as unknown as Date)
                .setTitle('__**Test:**__')
            await DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed);
        }
        else{
            const msgString = '------\n**TEST!**\n------';
            let msgEmbed = new Discord.MessageEmbed()
                .setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
                .setColor([254, 254, 254])
                .setDescription(msgString)
                .setTimestamp(Date() as unknown as Date)
                .setTitle('__**Test:**__')
            await DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed);
        }
        
        return commandReturnData;
    } catch (error) {
        return new Promise((resolve, reject) => {
            reject(error);
        });
    }
}
command.function = execute;
export default command as DiscordStuff.BotCommand;
