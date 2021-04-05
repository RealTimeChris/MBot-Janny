// ping.ts - Module for the "ping - pong" command.
// Jan 29, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

import Discord = require('discord.js');
import DiscordUser from '../DiscordUser';
import HelperFunctions from '../HelperFunctions';

const command = new DiscordUser.BotCommand();
command.name = 'ping';
command.description = 'Simply enter !ping';

/**
 * A testing function for the early implementation of the command handler.
 */
async function execute(commandData: DiscordUser.CommandData, discordUser: DiscordUser.DiscordUser): Promise<DiscordUser.CommandReturnData> {
    try {
        const commandReturnData = new DiscordUser.CommandReturnData();
		commandReturnData.commandName = command.name;

        const msgString = '------\n**Pong!**\n------';
        let msgEmbed = new Discord.MessageEmbed();
        if (commandData.guildMember instanceof Discord.GuildMember){
            const guildData = await discordUser.getGuildDataFromDB(commandData.guild!);
            msgEmbed
            .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL()!)
            .setColor(guildData.borderColor as [number, number, number])
            .setDescription(msgString)
            .setTimestamp(Date() as unknown as Date)
            .setTitle('__**Ping! Response:**__');
        }
        else{
            msgEmbed
            .setAuthor(commandData.guildMember!.username, commandData.guildMember!.avatarURL()!)
            .setColor([254, 254, 254])
            .setDescription(msgString)
            .setTimestamp(Date() as unknown as Date)
            .setTitle('__**Ping! Response:**__');
        }
			await HelperFunctions.sendMessageWithCorrectChannel(commandData, msgEmbed);

        return commandReturnData;
    } catch (error) {
        return new Promise((resolve, reject) => {
            reject(error);
        });
    }
}
command.function = execute;
export default command as DiscordUser.BotCommand;