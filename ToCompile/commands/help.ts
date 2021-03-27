// help.ts - Module for my help command.
// Jan 29, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

import Discord = require('discord.js');
import DiscordStuff = require('../DiscordStuff.js');
import commandIndex = require('../commandindex');

const command = new DiscordStuff.BotCommand();

command.name = 'help';
command.description = 'Help Usage: !help, or !help = COMMANDNAME, in order to get help with a specific COMMAND.';

/**
 * Returns a menu of helping information for the various commands I have.
 */
    export async function execute(message: Discord.Message, args: string[]): Promise<string> {
    try {
        const commandFiles = commandIndex.default.commands;

        if (args[0] === undefined) {
            const commandNames = [String('')];

            commandFiles.forEach((value: any, key: string, map) => {
                commandNames[key as any] = value.name;
                return commandNames;
            });

            let msgString = String('');
            msgString += '!help = COMMANDNAMEHERE\n\n__**List of command names:**__ ';

            let currentIndex = Number(0);
            commandFiles.forEach((value, key, map) => {
                msgString += commandNames[key as any];
                currentIndex += 1;
                if (currentIndex < commandFiles.size) {
                    msgString += ', ';
                }
                return commandNames;
            });

            const messageEmbed = new Discord.MessageEmbed();
            messageEmbed.setImage(((message.client.user as Discord.User).avatarURL() as string).toString()).setTimestamp((Date() as unknown) as Date)
                .setAuthor(message.author.username, (message.author as Discord.User).avatarURL() as string).setTitle(`__**${(message.client.user as Discord.User).username} Help:**__`)
                .setDescription(msgString)
                .setColor([254, 254, 254]);

            if (message.author.dmChannel == null) {
                const dmChannel = await message.author.createDM();
                await dmChannel.send(messageEmbed);
            } else {
                await message.author.dmChannel.send(messageEmbed);
            }

            if (message.channel.type !== 'dm' && message.deletable) {
                await message.delete();
            }
            return command.name;
        }

        let isFound = false;
        let commandDescription;
        let commandName = String('');

        commandFiles.forEach((value, key, map) => {
            const command = value;
            if (args[0] === command.name) {
                isFound = true;
                commandDescription = command.description;
                commandName = command.name;
            }
            return commandName;
        });

        if (isFound === false) {
            if (message.channel.type !== 'dm' && message.deletable) {
                await message.delete();
            }
            await message.reply('Sorry, but that command was not found!');
            return command.name;
        }

        if (((commandDescription as unknown) as Discord.MessageEmbed) instanceof Discord.MessageEmbed) {
            ((commandDescription as unknown) as Discord.MessageEmbed).setAuthor(message.author.username,
                (message.author as Discord.User).avatarURL() as string).setColor([254, 254, 254])
                .setTitle(`__**${commandName.charAt(0).toUpperCase() + commandName.slice(1)} Help:**__`).setTimestamp((Date() as unknown) as Date);
            await message.channel.send((commandDescription as unknown) as Discord.MessageEmbed);
        } else {
            const messageEmbed = new Discord.MessageEmbed();
            messageEmbed.setDescription(commandDescription)
                .setTimestamp((Date() as unknown) as Date).setAuthor(message.author.username, (message.author as Discord.User).avatarURL() as string)
                .setTitle(`__**${commandName.charAt(0).toUpperCase() + commandName.slice(1)} Help:**__`)
                .setColor([254, 254, 254]);

            await message.channel.send(messageEmbed);
        }
        if (message.channel.type !== 'dm' && message.deletable) {
            await message.delete();
        }
        return command.name;
    } catch (error) {
        return new Promise((resolve, reject) => {
            reject(error);
        });
    }
}
command.function = execute;
export default command as DiscordStuff.BotCommand;
