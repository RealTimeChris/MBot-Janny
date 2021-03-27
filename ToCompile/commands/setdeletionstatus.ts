// setdeletionstatus.ts - Module for my "set deletion status" command.
// Feb 25, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

import Discord = require('discord.js');
import DiscordStuff = require('../DiscordStuff');

const command = new DiscordStuff.BotCommand();
command.name = 'setdeletionstatus';
command.description = 'Use this to enable/disable message deletion/pruning in a given channel.\nIn the desired channel, type !setdeletionstatus = ENABLE/DISABLE, AMOUNTOFMESSAGESTOSAVE,'
+ ' enter nothing for AMOUNTOFMESSAGESTOSAVE to save none!\nAlso simply enter !setdeletionstatus to view the current list of channels being purged on the current server!';

export async function execute(message: Discord.Message, args: string[], discordUser: DiscordStuff.DiscordUser): Promise<string> {
    try {
        const areWeInADM = await DiscordStuff.areWeInADM(message);

        if (areWeInADM === true) {
            return command.name;
        }

        const doWeHaveAdminPerms = await discordUser.doWeHaveAdminPermission(message);

        if (doWeHaveAdminPerms === false) {
            return command.name;
        }

        let whatAreWeDoing = String('');
        const messageCountRegExp = /\d{1,18}/;
        let howManyBack = Number('');
        if (args[0] === undefined) {
            whatAreWeDoing = 'viewing';
        } else if ((args[0] !== undefined && args[0].toLowerCase() !== 'enable' && args[0].toLowerCase() !== 'disable')) {
            await message.reply("Please enter either 'enable' or 'disable'! (!setdeletionstatus = ENABLE/DISABLE, AMOUNTOFMESSAGESTOSAVE, or just !setdeletionstatus = ENABLE/DISABLE)");
            if (message.deletable){
                await message.delete();
            }
            return command.name;
        } else if (args[0].toLowerCase() === 'enable' && args[1] !== undefined && (!messageCountRegExp.test(args[1]) || parseInt(args[1], 10) < 0 || parseInt(args[1], 10) > 10000)) {
            await message.reply('Please enter a valid number of messages back to save! (0 to 10000) (!setdeletionstatus = ENABLE/DISABLE, AMOUNTOFMESSAGESTOSAVE, or just !setdeletionstatus = ENABLE/DISABLE)');
            if (message.deletable){
                await message.delete();
            }
            return command.name;
        } else if (args[1] !== undefined) {
            whatAreWeDoing = args[0].toLowerCase();
            howManyBack = parseInt((args[1].match(messageCountRegExp) as string[])[0] as string, 10);
        } else if (args[1] === undefined) {
            whatAreWeDoing = args[0].toLowerCase();
            howManyBack = 0;
        }

        const guildData = await discordUser.getGuildDataFromDB(message.guild as Discord.Guild);

        let currentDeletionChannel = new DiscordStuff.DeletionChannel();
        let isItFound = false;
        for (let x = 0; x < guildData.deletionChannels.length; x += 1) {
            if (message.channel.id === (guildData.deletionChannels[x] as DiscordStuff.DeletionChannel).channelID) {
                currentDeletionChannel = guildData.deletionChannels[x] as DiscordStuff.DeletionChannel;
                isItFound = true;
            }
        }
        if (isItFound === false) {
            currentDeletionChannel.numberOfMessagesToSave = howManyBack;
            currentDeletionChannel.channelID = message.channel.id;
            currentDeletionChannel.timeOfLastPurge = 0;
            currentDeletionChannel.currentlyBeingDeleted = false;
        }
        if (whatAreWeDoing !== 'viewing') {
            currentDeletionChannel.numberOfMessagesToSave = howManyBack;
        }

        if (whatAreWeDoing === 'viewing') {
            let msgString = String('');
            msgString = '\n------\n';
            if (guildData.deletionChannels.length > 0) {
                for (let x = 0; x < guildData.deletionChannels.length; x += 1) {
                    msgString += `__**Channel:**__ <#${(guildData.deletionChannels[x] as DiscordStuff.DeletionChannel).channelID}>, __**Messages To Save:**__ 
                    ${(guildData.deletionChannels[x] as DiscordStuff.DeletionChannel).numberOfMessagesToSave}\n`;
                }
            } else {
                msgString = "------\n__There's no channels to display, currently!__\n";
            }
            msgString += '------';

            const msgEmbed = new Discord.MessageEmbed();
            msgEmbed
                .setAuthor(message.author.username, message.author.avatarURL() as string)
                .setColor([0, 0, 255])
                .setDescription(msgString)
                .setTimestamp((Date() as unknown) as Date)
                .setTitle('__**Current Deletion Channels:**__');

            await message.channel.send(msgEmbed);
            if (message.deletable) {
                await message.delete();
            }
            return command.name;
        }
        if (whatAreWeDoing === 'enable') {
            isItFound = false;
            for (let x = 0; x < guildData.deletionChannels.length; x += 1) {
                if ((guildData.deletionChannels[x] as DiscordStuff.DeletionChannel).channelID === currentDeletionChannel.channelID) {
                    await message.reply('This channel has already been added! I will update your number of saved messages though!');
                    if (currentDeletionChannel.deletionMessageID
                        !== undefined && currentDeletionChannel.deletionMessageID !== '') {
                        try {
                            const previousMessage = await message.channel.messages
                                .fetch(currentDeletionChannel.deletionMessageID);
                            if (previousMessage.deletable === true) {
                                await previousMessage.delete();
                            }
                        } catch (error) {
                            if (error.message === 'Unknown Message') {
                                currentDeletionChannel.deletionMessageID = '';
                            }
                        }
                    }
                    guildData.deletionChannels[x] = currentDeletionChannel;
                    isItFound = true;
                }
            }

            const msgString = `__**Messages beyond message number ${currentDeletionChannel.numberOfMessagesToSave} are being purged, in this channel.**__`;
            const messageEmbed = new Discord.MessageEmbed();
            messageEmbed
                .setAuthor(message.author.username, message.author.avatarURL() as string)
                .setColor([0, 0, 255])
                .setDescription(msgString)
                .setTimestamp((Date() as unknown) as Date)
                .setTitle('__**Enabled Channel Purging:**__');
            const pinMessage = await message.channel.send(messageEmbed);
            await pinMessage.pin();
            currentDeletionChannel.deletionMessageID = pinMessage.id;
            if (isItFound === false) {
                guildData.deletionChannels.push(currentDeletionChannel);
            }
            await discordUser.updateGuildDataInDB(guildData);
            if (message.deletable) {
                await message.delete();
            }
            return command.name;
        }
        if (whatAreWeDoing === 'disable') {
            isItFound = false;
            let deletionChannelIndex = Number();
            for (let x = 0; x < guildData.deletionChannels.length; x += 1) {
                if ((guildData.deletionChannels[x] as DiscordStuff.DeletionChannel).channelID === currentDeletionChannel.channelID) {
                    isItFound = true;
                    deletionChannelIndex = x;
                    break;
                }
            }
            if (isItFound === false) {
                await message.reply('Sorry, but this channel could not be found in the list of active deletion channels!');
                if (message.deletable) {
                    await message.delete();
                }
                return command.name;
            }
            guildData.deletionChannels.splice(deletionChannelIndex, 1);
            discordUser.updateGuildDataInDB(guildData);

            const msgString = `${'\n------\n__**Channel Name:**__ <#'}${currentDeletionChannel.channelID}>\n------`;
            const messageEmbed = new Discord.MessageEmbed();
            messageEmbed
                .setAuthor(message.author.username, message.author.avatarURL() as string)
                .setColor([0, 0, 255])
                .setDescription(msgString)
                .setTimestamp((Date() as unknown) as Date)
                .setTitle('__**Disabled Channel Purging:**__');
            await message.channel.send(messageEmbed);
            if (message.deletable) {
                await message.delete();
            }
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