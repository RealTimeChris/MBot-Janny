// ping.ts - Module for the "ping - pong" command.
// Jan 29, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

import Discord = require('discord.js');
import FoundationClasses from '../FoundationClasses';
import DiscordUser from '../DiscordUser';
import GuildData from '../GuildData';
import HelperFunctions from '../HelperFunctions';

const command: FoundationClasses.BotCommand = {
    name: 'ping',
    description: 'Simply enter !ping',
    function: Function()
};

/**
 * A testing function for the early implementation of the command handler.
 */
async function execute(commandData: FoundationClasses.CommandData, discordUser: DiscordUser): Promise<FoundationClasses.CommandReturnData> {
    try {
        const commandReturnData: FoundationClasses.CommandReturnData = {
            commandName: command.name
        };
		
        const msgString = '------\n**Pong!**\n------';
        let msgEmbed = new Discord.MessageEmbed();
        if (commandData.guildMember instanceof Discord.GuildMember) {
            const guildData = new GuildData({dataBase: discordUser.dataBase, id: commandData.guild!.id, name: commandData.guild!.name, memberCount: commandData.guild!.memberCount});
            await guildData.getFromDataBase();
            msgEmbed
            .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL()!)
            .setColor(guildData.borderColor)
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
export default command as FoundationClasses.BotCommand;
