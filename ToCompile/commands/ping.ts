// ping.ts - Module for the "ping - pong" command.
// Jan 29, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

import Discord = require('discord.js');
import DiscordStuff = require('../DiscordStuff');

const command = new DiscordStuff.BotCommand();
command.name = 'ping';
command.description = 'Simply enter !ping';

/**
 * A testing function for the early implementation of the command handler.
 */
async function execute(commandData: DiscordStuff.CommandData, discordUser: DiscordStuff.DiscordUser): Promise<DiscordStuff.CommandReturnData> {
    try {
        const commandReturnData = new DiscordStuff.CommandReturnData();
		commandReturnData.commandName = command.name;

        const msgString = '------\n**Pong!**\n------';
        let msgEmbed = new Discord.MessageEmbed();
        if (commandData.guildMember instanceof Discord.GuildMember){
            const guildData = await discordUser.getGuildDataFromDB(commandData.guild!);
            msgEmbed
            .setAuthor((commandData.guildMember as Discord.GuildMember)?.user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
            .setColor(guildData.borderColor as [number, number, number])
            .setDescription(msgString)
            .setTimestamp(Date() as unknown as Date)
            .setTitle('__**Ping! Response:**__');
        }
        else{
            msgEmbed
            .setAuthor((commandData.guildMember as Discord.User).username, (commandData.guildMember as Discord.User).avatarURL()!)
            .setColor([254, 254, 254])
            .setDescription(msgString)
            .setTimestamp(Date() as unknown as Date)
            .setTitle('__**Ping! Response:**__');
        }
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