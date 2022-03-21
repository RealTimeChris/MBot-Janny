// setdeletionstatus.ts - Module for my "set deletion status" command.
// Feb 25, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

import Discord = require('discord.js');
import FoundationClasses from '../FoundationClasses';
import DiscordUser from '../DiscordUser';
import GuildData from '../GuildData';
import HelperFunctions from '../HelperFunctions';

const command: FoundationClasses.BotCommand = {
    name: 'setdeletionstatus',
    description: 'Use this to enable/disable message deletion/pruning in a given channel.\nIn the desired channel, type !setdeletionstatus = ENABLE/DISABLE, AMOUNTOFMESSAGESTOSAVE,'
    + ' enter nothing for AMOUNTOFMESSAGESTOSAVE to save none!\nAlso simply enter !setdeletionstatus to view the current list of channels being purged on the current server!',
    function: Function()
};

async function execute(commandData: FoundationClasses.CommandData, discordUser: DiscordUser): Promise<FoundationClasses.CommandReturnData> {
    try {
        const commandReturnData: FoundationClasses.CommandReturnData = {
            commandName: command.name
        };
		
        const areWeInADM = await HelperFunctions.areWeInADM(commandData);

        if (areWeInADM === true) {
            return commandReturnData;
        }

        const doWeHaveAdminPerms = await HelperFunctions.doWeHaveAdminPermission(commandData, discordUser);

        if (doWeHaveAdminPerms === false) {
            return commandReturnData;
        }

        const guildData = new GuildData({dataBase: discordUser.dataBase, id: commandData.guild!.id, name: commandData.guild!.name, memberCount: commandData.guild!.memberCount});
        await guildData.getFromDataBase();

        let whatAreWeDoing = '';
        const messageCountRegExp = /\d{1,18}/;
        let howManyBack = 0;
        if (commandData.args[0] === undefined) {
            whatAreWeDoing = 'viewing';
        } else if ((commandData.args[0] !== undefined && commandData.args[0].toLowerCase() !== 'enable' && commandData.args[0].toLowerCase() !== 'disable')) {
            const msgString = "------\n**Please enter either 'enable' or 'disable'! (!setdeletionstatus = ENABLE/DISABLE, AMOUNTOFMESSAGESTOSAVE, or just !setdeletionstatus = ENABLE/DISABLE)**\n------";
            let msgEmbed = new Discord.MessageEmbed()
				.setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
				.setColor(guildData.borderColor)
				.setDescription(msgString)
				.setTimestamp(Date() as unknown as Date)
				.setTitle('__**Missing Or Invalid Arguments:**__');
            let msg = await HelperFunctions.sendMessageWithCorrectChannel(commandData, msgEmbed);
            if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                msg = new Discord.Message(commandData.guild!.client, msg, commandData.fromTextChannel!);
            }
            await msg.delete({timeout: 20000});
            return commandReturnData;
        } else if (commandData.args[0].toLowerCase() === 'enable' && commandData.args[1] !== undefined && (!messageCountRegExp.test(commandData.args[1]) || parseInt(commandData.args[1], 10) < 0 || parseInt(commandData.args[1], 10) > 10000)) {
            const msgString = '------\n**Please enter a valid number of messages back to save! (0 to 10000) (!setdeletionstatus = ENABLE/DISABLE, AMOUNTOFMESSAGESTOSAVE, or just !setdeletionstatus = ENABLE/DISABLE)**\n------';
            let msgEmbed = new Discord.MessageEmbed()
				.setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
				.setColor(guildData.borderColor)
				.setDescription(msgString)
				.setTimestamp(Date() as unknown as Date)
				.setTitle('__**Missing Or Invalid Arguments:**__');
            let msg = await HelperFunctions.sendMessageWithCorrectChannel(commandData, msgEmbed);
            if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                msg = new Discord.Message(commandData.guild!.client, msg, commandData.fromTextChannel!);
            }
            await msg.delete({timeout: 20000});
            return commandReturnData;
        } else if (commandData.args[1] !== undefined) {
            whatAreWeDoing = commandData.args[0].toLowerCase();
            howManyBack = parseInt(commandData.args[1].toString().match(messageCountRegExp)![0]!, 10);
        } else if (commandData.args[1] === undefined) {
            whatAreWeDoing = commandData.args[0].toLowerCase();
            howManyBack = 0;
        }

        let currentDeletionChannel: FoundationClasses.DeletionChannel = {
            numberOfMessagesToSave: howManyBack,
            channelID: commandData.fromTextChannel!.id,
            currentlyBeingDeleted: false,
            deletionMessageID: ''
        };

        if (whatAreWeDoing === 'viewing') {
            let msgString = '\n------\n';
            if (guildData.deletionChannels.length > 0) {
                for (let x = 0; x < guildData.deletionChannels.length; x += 1) {
                    const currentChannel = commandData.guild?.channels.resolve(guildData.deletionChannels[x]?.channelID as string);
                    if (currentChannel === null) {
                        guildData.deletionChannels.splice(x, 1);
                        continue;
                    }
                    msgString += `__**Channel:**__ <#${guildData.deletionChannels[x]!.channelID}>, __**Messages To Save:**__ `+
                    `${guildData.deletionChannels[x]!.numberOfMessagesToSave}\n`;
                }
            } else {
                msgString = "------\n__There's no channels to display, currently!__\n";
            }
            msgString += '------';

            const msgEmbed = new Discord.MessageEmbed();
            msgEmbed
                .setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
                .setColor(guildData.borderColor)
                .setDescription(msgString)
                .setTimestamp(Date() as unknown as Date)
                .setTitle('__**Current Deletion Channels:**__');
            await HelperFunctions.sendMessageWithCorrectChannel(commandData, msgEmbed);
            return commandReturnData;
        }
        if (whatAreWeDoing === 'enable') {
            let isItFound = false;
            let deletionChannelIndex: number;
            for (let x = 0; x < guildData.deletionChannels.length; x += 1) {
                if (commandData.fromTextChannel!.id === guildData.deletionChannels[x]!.channelID) {
                    currentDeletionChannel = guildData.deletionChannels[x]!;
                    currentDeletionChannel.currentlyBeingDeleted = false;
                    currentDeletionChannel.numberOfMessagesToSave = howManyBack;
                    isItFound = true;
                    deletionChannelIndex = x;
                }
            }

            if (isItFound === true) {
                const msgString = '------\n**This channel has already been added! I will update your number of saved messages though!**\n------';
                let msgEmbed = new Discord.MessageEmbed()
                    .setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
                    .setColor(guildData.borderColor)
                    .setDescription(msgString)
                    .setTimestamp(Date() as unknown as Date)
                    .setTitle('__**Channel Re-Added:**__');
                let message = await HelperFunctions.sendMessageWithCorrectChannel(commandData, msgEmbed);
                if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                    message = new Discord.Message(commandData.guildMember!.client, message, commandData.fromTextChannel!);
                }
                message.delete({timeout: 20000});
                try {
                    const previousMessage = await commandData.fromTextChannel!.messages.fetch(currentDeletionChannel.deletionMessageID);
                    if (previousMessage.deletable === true) {
                        await previousMessage.delete();
                    }
                } catch (error) {
                    if (error.message === 'Unknown Message') {
                        currentDeletionChannel.deletionMessageID = '';
                    }
                }
            }

            const msgString = `__**Messages beyond message number ${currentDeletionChannel.numberOfMessagesToSave} are being purged, in this channel.**__`;
            const messageEmbed = new Discord.MessageEmbed();
            messageEmbed
                .setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
                .setColor(guildData.borderColor)
                .setDescription(msgString)
                .setTimestamp(Date() as unknown as Date)
                .setTitle('__**Enabled Channel Purging:**__');
            let pinMessage = await HelperFunctions.sendMessageWithCorrectChannel(commandData, messageEmbed);
            if (commandData.toTextChannel instanceof Discord.WebhookClient) {
               pinMessage = new Discord.Message(commandData.guildMember!.client, pinMessage, commandData.fromTextChannel!);
            }
            await pinMessage.pin();
            
            currentDeletionChannel.deletionMessageID = pinMessage.id;

            if (isItFound === true) {
                guildData.deletionChannels[deletionChannelIndex!] = currentDeletionChannel;
            }
            else {
                guildData.deletionChannels.push(currentDeletionChannel);
            }
            await guildData.writeToDataBase();
            
            return commandReturnData;
        }
        if (whatAreWeDoing === 'disable') {
            let isItFound = false;
            let deletionChannelIndex: number;
            for (let x = 0; x < guildData.deletionChannels.length; x += 1) {
                if (commandData.fromTextChannel!.id === guildData.deletionChannels[x]!.channelID) {
                    isItFound = true;
                    deletionChannelIndex = x;
                }
            }

            if (isItFound === false) {
                const msgString = '------\n**Sorry, but this channel could not be found in the list of active deletion channels!**\n------';
                let msgEmbed = new Discord.MessageEmbed()
                    .setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
                    .setColor(guildData.borderColor)
                    .setDescription(msgString)
                    .setTimestamp(Date() as unknown as Date)
                    .setTitle('__**Channel Issue:**__');
                let msg = await HelperFunctions.sendMessageWithCorrectChannel(commandData, msgEmbed);
                if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                    msg = new Discord.Message(commandData.guild!.client, msg, commandData.fromTextChannel!);
                }
                await msg.delete({timeout: 20000});
                return commandReturnData;
            }
            guildData.deletionChannels.splice(deletionChannelIndex!, 1);
            await guildData.writeToDataBase();

            const msgString = `${'\n------\n__**Channel Name:**__ <#'}${currentDeletionChannel.channelID}>\n------`;
            const messageEmbed = new Discord.MessageEmbed();
            messageEmbed
                .setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
                .setColor(guildData.borderColor)
                .setDescription(msgString)
                .setTimestamp(Date() as unknown as Date)
                .setTitle('__**Disabled Channel Purging:**__');
            await HelperFunctions.sendMessageWithCorrectChannel(commandData, messageEmbed);
        }
        return commandReturnData;
    } catch (error) {
        return new Promise((resolve, reject) => {
            reject(error);
        });
    }
}
command.function = execute;
export default command as FoundationClasses.BotCommand;
