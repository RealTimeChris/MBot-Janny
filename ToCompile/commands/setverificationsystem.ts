//  setverificationsystem.ts - Module for my "set verification system" command!.
// Feb 26, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

import Discord = require('discord.js');
import DiscordStuff = require('../DiscordStuff');

const command = new DiscordStuff.BotCommand();
command.name = 'setverificationsystem';
command.description = '!setverificationsystem = ENABLE, VERIFICATIONMESSAGE, REACTIONEMOJI, in the channel you would like to use for your verification channel!\nAlso, !setverificationsystem = DISABLE.';

async function execute(commandData: DiscordStuff.CommandData,  discordUser: DiscordStuff.DiscordUser): Promise<DiscordStuff.CommandReturnData> {
    try {
        const commandReturnData = new DiscordStuff.CommandReturnData();
		commandReturnData.commandName = command.name;
        const areWeInADM = await DiscordStuff.areWeInADM(commandData);

        if (areWeInADM === true) {
            return commandReturnData;
        }

        const doWeHaveAdminPermission = await discordUser.doWeHaveAdminPermission(commandData);

        if (doWeHaveAdminPermission === false) {
            return commandReturnData;
        }

        const guildData = await discordUser.getGuildDataFromDB(commandData.guild!);

        let whatAreWeDoing;
        const emojiRegExp = /.{1,26}/;
        if (commandData.args[0] === undefined) {
            whatAreWeDoing = 'viewing';
        } else if (commandData.args[0].toLowerCase() !== 'enable' && commandData.args[0].toLowerCase() !== 'disable') {
            const msgString = "------\n**Please enter either 'enable' or 'disable' as the first argument! (!setverificationsystem = ENABLE, VERIFICATIONMESSAGE, REACTIONEMOJI, or !setverificationsystem = DISABLE)**\n------";
            let msgEmbed = new Discord.MessageEmbed()
				.setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
				.setColor(guildData.borderColor as [number, number, number])
				.setDescription(msgString)
				.setTimestamp(Date() as unknown as Date)
				.setTitle('__**Missing Or Invalid Arguments:**__');
            let msg = await DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed);
            if (commandData.toTextChannel instanceof Discord.WebhookClient){
                msg = new Discord.Message(commandData.guild!.client, msg, commandData.fromTextChannel!);
            }
            await msg.delete({timeout: 20000});
            return commandReturnData;
        } else if (commandData.args[0].toLowerCase() === 'enable' && commandData.args[1] === undefined) {
            const msgString = '------\n**Please, enter a greeting message for the verification system!**\n------';
            let msgEmbed = new Discord.MessageEmbed()
				.setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
				.setColor(guildData.borderColor as [number, number, number])
				.setDescription(msgString)
				.setTimestamp(Date() as unknown as Date)
				.setTitle('__**Missing Or Invalid Arguments:**__');
            let msg = await DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed);
            if (commandData.toTextChannel instanceof Discord.WebhookClient){
                msg = new Discord.Message(commandData.guild!.client, msg, commandData.fromTextChannel!);
            }
            await msg.delete({timeout: 20000});
            return commandReturnData;
        } else if (commandData.args[0].toLowerCase() === 'enable' && (commandData.args[2] === undefined || !emojiRegExp.test(commandData.args[2]))) {
            const msgString = '------\n**Please, enter a valid emoji for them to react with!**\n------';
            let msgEmbed = new Discord.MessageEmbed()
				.setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
				.setColor(guildData.borderColor as [number, number, number])
				.setDescription(msgString)
				.setTimestamp(Date() as unknown as Date)
				.setTitle('__**Missing Or Invalid Arguments:**__');
            let msg = await DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed);
            if (commandData.toTextChannel instanceof Discord.WebhookClient){
                msg = new Discord.Message(commandData.guild!.client, msg, commandData.fromTextChannel!);
            }
            await msg.delete({timeout: 20000});
            return commandReturnData;
        } else if (commandData.args[0].toLowerCase() === 'enable') {
            whatAreWeDoing = 'enable';
        } else if (commandData.args[0].toLowerCase() === 'disable') {
            whatAreWeDoing = 'disable';
        }

        let msgString = '';
        if (whatAreWeDoing === 'viewing') {
            if (guildData.verificationSystem.messageID !== ''){
                try{
                    const messageManager = new Discord.MessageManager(commandData.guildMember!.client.channels.resolve(guildData.verificationSystem.channelID) as Discord.TextChannel);
                    const newMessage = await messageManager.fetch(guildData.verificationSystem.messageID);
                    msgString = `------\n__**Channel:**__ <#${guildData.verificationSystem.channelID}>\n`;
                    msgString += `__**Message Content:**__ ${newMessage.embeds[0]!.description}\n`;
                    msgString += `__**Emoji:**__ ${guildData.verificationSystem.emoji}\n------`;
                }
                catch(error){
                    console.log(error);
                    msgString = '------\n__The verification system is currently disabled.__\n------\n';
                    guildData.verificationSystem.channelID = '';
                    guildData.verificationSystem.messageID = '';
                    guildData.verificationSystem.emoji = '';
                    await discordUser.updateGuildDataInDB(guildData);
                    const msgEmbed = new Discord.MessageEmbed();
                    msgEmbed
                        .setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
                        .setColor(guildData.borderColor as [number, number, number])
                        .setTimestamp(Date() as unknown as Date)
                        .setTitle('__**Verification System:**__')
                        .setDescription(msgString);
                    await DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed);
                    return commandReturnData;
                }
            } else {
                msgString = '------\n__The verification system is currently disabled.__\n------\n';
                guildData.verificationSystem.channelID = '';
                guildData.verificationSystem.messageID = '';
                guildData.verificationSystem.emoji = '';
                await discordUser.updateGuildDataInDB(guildData);
            }

            const msgEmbed = new Discord.MessageEmbed();
            msgEmbed
                .setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
                .setColor(guildData.borderColor as [number, number, number])
                .setTimestamp(Date() as unknown as Date)
                .setTitle('__**Verification System:**__')
                .setDescription(msgString);
            await DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed);
            return commandReturnData;
        }
        if (whatAreWeDoing === 'disable') {
            const currentChannel = commandData.guildMember!.client.channels
                .resolve(guildData.verificationSystem.channelID) as Discord.TextChannel;

            if (guildData.verificationSystem.channelID == '' || currentChannel === null) {
                const msgString = '------\n**Sorry, it looks as though it is already disabled!**\n------';
                let msgEmbed = new Discord.MessageEmbed()
				    .setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
				    .setColor(guildData.borderColor as [number, number, number])
				    .setDescription(msgString)
	    			.setTimestamp(Date() as unknown as Date)
    				.setTitle('__**Existence Issue:**__');
                let msg = await DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed);
                if (commandData.toTextChannel instanceof Discord.WebhookClient){
                    msg = new Discord.Message(commandData.guild!.client, msg, commandData.fromTextChannel!);
                }
                await msg.delete({timeout: 20000});
                guildData.verificationSystem.channelID = '';
                guildData.verificationSystem.messageID = '';
                guildData.verificationSystem.emoji = '';
                await discordUser.updateGuildDataInDB(guildData);
                return commandReturnData;
            }

            const messageManager = new Discord.MessageManager(currentChannel);

            await messageManager.delete(guildData.verificationSystem.messageID);

            guildData.verificationSystem.channelID = '';
            guildData.verificationSystem.messageID = '';
            guildData.verificationSystem.emoji = '';
            await discordUser.updateGuildDataInDB(guildData);

            msgString = "__**Nicely done! You've disabled the verification system for this server!**__";
            const msgEmbed = new Discord.MessageEmbed();
            msgEmbed
                .setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
                .setColor(guildData.borderColor as [number, number, number])
                .setTimestamp(Date() as unknown as Date)
                .setTitle('__**Set Verification System:**__')
                .setDescription(msgString);
            await DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed);
            return commandReturnData;
        }
        if (whatAreWeDoing === 'enable') {
            if (guildData.defaultRoleIDs.length === 0) {
                const msgString = '------\n**Please, first set a default role to be applied to the new member! Using !setdefaultrole.**\n------';
                let msgEmbed = new Discord.MessageEmbed()
				    .setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
				    .setColor(guildData.borderColor as [number, number, number])
				    .setDescription(msgString)
	    			.setTimestamp(Date() as unknown as Date)
    				.setTitle('__**Role Issue:**__');
                let msg = await DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed);
                if (commandData.toTextChannel instanceof Discord.WebhookClient){
                    msg = new Discord.Message(commandData.guild!.client, msg, commandData.fromTextChannel!);
                }
                await msg.delete({timeout: 20000});
                return commandReturnData;
            }
            
            const msgEmbed2 = new Discord.MessageEmbed()
                .setColor(guildData.borderColor as [number, number, number])
                .setDescription(commandData.args[1])
                .setTimestamp(Date() as unknown as Date);
            let newMessage = await DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed2);
            if (commandData.toTextChannel instanceof Discord.WebhookClient){
                newMessage = new Discord.Message(commandData.guild!.client, newMessage, commandData.fromTextChannel!);
            }            
            
            await newMessage.react(commandData.args[2]!);

            guildData.verificationSystem.channelID = commandData.fromTextChannel!.id;
            guildData.verificationSystem.messageID = newMessage.id;
            const argTwo = commandData.args[2];
            guildData.verificationSystem.emoji = argTwo!;
            discordUser.updateGuildDataInDB(guildData);

            msgString = "__**Nicely done! You've enabled the verification system for this server!**__";
            const msgEmbed = new Discord.MessageEmbed();
            msgEmbed
                .setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
                .setColor(guildData.borderColor as [number, number, number])
                .setTimestamp(Date() as unknown as Date)
                .setTitle('__**Set Verification System:**__')
                .setDescription(msgString);
            await DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed);
            return commandReturnData;
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
