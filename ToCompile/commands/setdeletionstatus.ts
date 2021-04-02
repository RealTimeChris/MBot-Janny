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

export async function execute(commandData: DiscordStuff.CommandData, discordUser: DiscordStuff.DiscordUser): Promise<DiscordStuff.CommandReturnData> {
    try {
        const commandReturnData = new DiscordStuff.CommandReturnData();
		commandReturnData.commandName = command.name;
        const areWeInADM = await DiscordStuff.areWeInADM(commandData);

        if (areWeInADM === true) {
            return commandReturnData;
        }

        const doWeHaveAdminPerms = await discordUser.doWeHaveAdminPermission(commandData);

        if (doWeHaveAdminPerms === false) {
            return commandReturnData;
        }

        let whatAreWeDoing = '';
        const messageCountRegExp = /\d{1,18}/;
        let howManyBack = 0;
        if (commandData.args[0] === undefined) {
            whatAreWeDoing = 'viewing';
        } else if ((commandData.args[0] !== undefined && commandData.args[0].toLowerCase() !== 'enable' && commandData.args[0].toLowerCase() !== 'disable')) {
            const msgString = "------\n**Please enter either 'enable' or 'disable'! (!setdeletionstatus = ENABLE/DISABLE, AMOUNTOFMESSAGESTOSAVE, or just !setdeletionstatus = ENABLE/DISABLE)**\n------";
            let msgEmbed = new Discord.MessageEmbed()
				.setAuthor((commandData.guildMember as Discord.GuildMember)?.user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL() as string)
				.setColor([0, 0, 255])
				.setDescription(msgString)
				.setTimestamp(Date() as unknown as Date)
				.setTitle('__**Missing Or Invalid Arguments:**__');
			await DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed);
            return commandReturnData;
        } else if (commandData.args[0].toLowerCase() === 'enable' && commandData.args[1] !== undefined && (!messageCountRegExp.test(commandData.args[1]) || parseInt(commandData.args[1], 10) < 0 || parseInt(commandData.args[1], 10) > 10000)) {
            const msgString = '------\n**Please enter a valid number of messages back to save! (0 to 10000) (!setdeletionstatus = ENABLE/DISABLE, AMOUNTOFMESSAGESTOSAVE, or just !setdeletionstatus = ENABLE/DISABLE)**\n------';
            let msgEmbed = new Discord.MessageEmbed()
				.setAuthor((commandData.guildMember as Discord.GuildMember)?.user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL() as string)
				.setColor([0, 0, 255])
				.setDescription(msgString)
				.setTimestamp(Date() as unknown as Date)
				.setTitle('__**Missing Or Invalid Arguments:**__');
			await DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed);
            return commandReturnData;
        } else if (commandData.args[1] !== undefined) {
            whatAreWeDoing = commandData.args[0].toLowerCase();
            howManyBack = parseInt((commandData.args[1].toString().match(messageCountRegExp) as string[])[0] as string, 10);
        } else if (commandData.args[1] === undefined) {
            whatAreWeDoing = commandData.args[0].toLowerCase();
            howManyBack = 0;
        }

        const guildData = await discordUser.getGuildDataFromDB(commandData.guild as Discord.Guild);

        let currentDeletionChannel = new DiscordStuff.DeletionChannel();
        let isItFound = false;
        for (let x = 0; x < guildData.deletionChannels.length; x += 1) {
            if ((commandData.permsChannel as Discord.TextChannel).id === (guildData.deletionChannels[x] as DiscordStuff.DeletionChannel).channelID) {
                currentDeletionChannel = guildData.deletionChannels[x] as DiscordStuff.DeletionChannel;
                isItFound = true;
            }
        }
        if (isItFound === false) {
            currentDeletionChannel.numberOfMessagesToSave = howManyBack;
            currentDeletionChannel.channelID = (commandData.permsChannel as Discord.TextChannel).id;
            currentDeletionChannel.timeOfLastPurge = 0;
            currentDeletionChannel.currentlyBeingDeleted = false;
        }
        if (whatAreWeDoing !== 'viewing') {
            currentDeletionChannel.numberOfMessagesToSave = howManyBack;
        }

        if (whatAreWeDoing === 'viewing') {
            let msgString = '';
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
                .setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL() as string)
                .setColor([0, 0, 255])
                .setDescription(msgString)
                .setTimestamp((Date() as unknown) as Date)
                .setTitle('__**Current Deletion Channels:**__');

            await DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed);
            return commandReturnData;
        }
        if (whatAreWeDoing === 'enable') {
            isItFound = false;
            for (let x = 0; x < guildData.deletionChannels.length; x += 1) {
                if ((guildData.deletionChannels[x] as DiscordStuff.DeletionChannel).channelID === currentDeletionChannel.channelID) {
                    const msgString = '------\n**This channel has already been added! I will update your number of saved messages though!**\n------';
                    let msgEmbed = new Discord.MessageEmbed()
				        .setAuthor((commandData.guildMember as Discord.GuildMember)?.user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL() as string)
				        .setColor([0, 0, 255])
				        .setDescription(msgString)
				        .setTimestamp(Date() as unknown as Date)
				        .setTitle('__**Channel Issue:**__');
			        await DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed);
                    if (currentDeletionChannel.deletionMessageID
                        !== undefined && currentDeletionChannel.deletionMessageID !== '') {
                        try {
                            const previousMessage = await (commandData.permsChannel as Discord.TextChannel).messages
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
                .setAuthor(((commandData.guildMember as Discord.GuildMember).user as Discord.User).username, ((commandData.guildMember as Discord.GuildMember).user as Discord.User).avatarURL() as string)
                .setColor([0, 0, 255])
                .setDescription(msgString)
                .setTimestamp((Date() as unknown) as Date)
                .setTitle('__**Enabled Channel Purging:**__');
            let pinMessage = new Discord.Message((commandData.guildMember as Discord.GuildMember).client, await DiscordStuff.sendMessageWithCorrectChannel(commandData, messageEmbed), commandData.permsChannel as Discord.TextChannel);
            await pinMessage.pin();
            currentDeletionChannel.deletionMessageID = pinMessage.id;
            if (isItFound === false) {
                guildData.deletionChannels.push(currentDeletionChannel);
            }
            await discordUser.updateGuildDataInDB(guildData);
            
            return commandReturnData;
        }
        if (whatAreWeDoing === 'disable') {
            isItFound = false;
            let deletionChannelIndex = 0;
            for (let x = 0; x < guildData.deletionChannels.length; x += 1) {
                if ((guildData.deletionChannels[x] as DiscordStuff.DeletionChannel).channelID === currentDeletionChannel.channelID) {
                    isItFound = true;
                    deletionChannelIndex = x;
                    break;
                }
            }
            if (isItFound === false) {
                const msgString = '------\n**Sorry, but this channel could not be found in the list of active deletion channels!**\n------';
                let msgEmbed = new Discord.MessageEmbed()
				.setAuthor((commandData.guildMember as Discord.GuildMember)?.user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL() as string)
				.setColor([0, 0, 255])
				.setDescription(msgString)
				.setTimestamp(Date() as unknown as Date)
				.setTitle('__**Channel Issue:**__');
			await DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed);
                return commandReturnData;
            }
            guildData.deletionChannels.splice(deletionChannelIndex, 1);
            discordUser.updateGuildDataInDB(guildData);

            const msgString = `${'\n------\n__**Channel Name:**__ <#'}${currentDeletionChannel.channelID}>\n------`;
            const messageEmbed = new Discord.MessageEmbed();
            messageEmbed
                .setAuthor(((commandData.guildMember as Discord.GuildMember).user as Discord.User).username, ((commandData.guildMember as Discord.GuildMember).user.avatarURL() as string))
                .setColor([0, 0, 255])
                .setDescription(msgString)
                .setTimestamp((Date() as unknown) as Date)
                .setTitle('__**Disabled Channel Purging:**__');
            await DiscordStuff.sendMessageWithCorrectChannel(commandData, messageEmbed)
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
