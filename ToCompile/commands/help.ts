// help.ts - Module for my help command.
// Jan 29, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

import Discord = require('discord.js');
import DiscordStuff = require('../DiscordStuff');
import commandIndex = require('../commandindex');

const command = new DiscordStuff.BotCommand();

command.name = 'help';
command.description = 'Help Usage: !help, or !help = COMMANDNAME, in order to get help with a specific COMMAND.';

/**
 * Returns a menu of helping information for the various commands I have.
 */
export async function execute(commandData: DiscordStuff.CommandData): Promise<DiscordStuff.CommandReturnData> {
    try {
        const commandReturnData = new DiscordStuff.CommandReturnData();
        commandReturnData.commandName = command.name;
        const commandFiles = commandIndex.default.commands;

        if (commandData.args[0] === undefined) {
            const commandNames: string[] = [];

            commandFiles.forEach((value: any, key: string, map) => {
                commandNames[key as any] = value.name;
                return commandNames;
            });

            let msgString = '';
            msgString += '!help = COMMANDNAMEHERE\n\n__**List of command names:**__ ';

            let currentIndex = 0;
            commandFiles.forEach((value, key, map) => {
                msgString += commandNames[key as any];
                currentIndex += 1;
                if (currentIndex < commandFiles.size) {
                    msgString += ', ';
                }
                return commandNames;
            });

            const messageEmbed = new Discord.MessageEmbed();
            if (commandData.guildMember instanceof Discord.GuildMember){
                messageEmbed
                    .setImage(((commandData.guildMember?.client.user as Discord.User).avatarURL() as string).toString())
                    .setTimestamp((Date() as unknown) as Date)
                    .setAuthor(commandData.guildMember?.client.user?.username, (commandData.guildMember?.client.user?.avatarURL() as string))
                    .setTitle(`__**${((commandData.guildMember as Discord.GuildMember).user as Discord.User).username} Help:**__`)
                    .setDescription(msgString)
                    .setColor([254, 254, 254]);
            }
            else if (commandData.guildMember instanceof Discord.User){
                messageEmbed
                    .setImage(((commandData.guildMember?.client.user as Discord.User).avatarURL() as string).toString())
                    .setTimestamp((Date() as unknown) as Date)
                    .setAuthor(commandData.guildMember?.username, (commandData.guildMember?.avatarURL() as string))
                    .setTitle(`__**${commandData.guildMember.username} Help:**__`)
                    .setDescription(msgString)
                    .setColor([254, 254, 254]);
            }
            
            if (commandData.guildMember instanceof Discord.User){
                await DiscordStuff.sendMessageWithCorrectChannel(commandData, messageEmbed);
            }
            else if (commandData.guildMember instanceof Discord.GuildMember){
                const dmChannel = await (commandData.guildMember as Discord.GuildMember).user.createDM();
                await dmChannel.send(messageEmbed);
                const msgString = `------\n**I've sent you help info, via a message!**\n------`;
                let msgEmbed = new Discord.MessageEmbed()
				.setAuthor((commandData.guildMember as Discord.GuildMember)?.user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL() as string)
				.setColor([0, 0, 255])
				.setDescription(msgString)
				.setTimestamp(Date() as unknown as Date)
				.setTitle('__**Help:**__');
			await DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed);
            }

            return commandReturnData;
        }

        let isFound = false;
        let commandDescription;
        let commandName = '';

        commandFiles.forEach((value, key, map) => {
            const command = value;
            if (commandData.args[0] === command.name) {
                isFound = true;
                commandDescription = command.description;
                commandName = command.name;
            }
            return commandName;
        });

        if (isFound === false) {
            const msgString = `------\n**Sorry, but that command was not found!**\n------`;
            let msgEmbed = new Discord.MessageEmbed()
				.setAuthor((commandData.guildMember as Discord.GuildMember)?.user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL() as string)
				.setColor([0, 0, 255])
				.setDescription(msgString)
				.setTimestamp(Date() as unknown as Date)
				.setTitle('__**Command Issue:**__')
			await DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed);
            return commandReturnData;
        }

        if (((commandDescription as unknown) as Discord.MessageEmbed) instanceof Discord.MessageEmbed) {
            ((commandDescription as unknown) as Discord.MessageEmbed)
                .setAuthor(commandData.guildMember?.client.user?.username,
                (commandData.guildMember?.client.user?.avatarURL() as string))
                .setColor([254, 254, 254])
                .setTitle(`__**${commandName.charAt(0).toUpperCase() + commandName.slice(1)} Help:**__`)
                .setTimestamp((Date() as unknown) as Date);
                await DiscordStuff.sendMessageWithCorrectChannel(commandData, (commandDescription as unknown) as Discord.MessageEmbed);
        } 
        else {
            const messageEmbed = new Discord.MessageEmbed();
            if (commandData.guildMember instanceof Discord.GuildMember){
                messageEmbed
                    .setDescription(commandDescription)
                    .setTimestamp((Date() as unknown) as Date)
                    .setAuthor(commandData.guildMember?.client.user?.username, commandData.guildMember?.client.user?.avatarURL() as string)
                    .setTitle(`__**${commandName.charAt(0).toUpperCase() + commandName.slice(1)} Help:**__`)
                    .setColor([254, 254, 254]);
            }
            else if (commandData.guildMember instanceof Discord.User){
                messageEmbed
                    .setDescription(commandDescription)
                    .setTimestamp((Date() as unknown) as Date)
                    .setAuthor(commandData.guildMember?.username, commandData.guildMember?.avatarURL() as string)
                    .setTitle(`__**${commandName.charAt(0).toUpperCase() + commandName.slice(1)} Help:**__`)
                    .setColor([254, 254, 254])
            }
            await DiscordStuff.sendMessageWithCorrectChannel(commandData, messageEmbed);
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
