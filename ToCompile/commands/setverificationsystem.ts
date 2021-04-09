//  setverificationsystem.ts - Module for my "set verification system" command!.
// Feb 26, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

import Discord = require('discord.js');
import FoundationClasses from '../FoundationClasses';
import DiscordUser from '../DiscordUser';
import GuildData from '../GuildData';
import HelperFunctions from '../HelperFunctions';

const command: FoundationClasses.BotCommand = {
    name: 'setverificationsystem',
    description: '!setverificationsystem = ENABLE, VERIFICATIONMESSAGE, REACTIONEMOJI, in the channel you would like to use for your verification channel!\nAlso, !setverificationsystem = DISABLE.',
    function: Function()
};

async function execute(commandData: FoundationClasses.CommandData,  discordUser: DiscordUser): Promise<FoundationClasses.CommandReturnData> {
    try {
        const commandReturnData: FoundationClasses.CommandReturnData = {
            commandName: command.name
        };
		
        const areWeInADM = await HelperFunctions.areWeInADM(commandData);

        if (areWeInADM === true) {
            return commandReturnData;
        }

        const doWeHaveAdminPermission = await HelperFunctions.doWeHaveAdminPermission(commandData, discordUser);

        if (doWeHaveAdminPermission === false) {
            return commandReturnData;
        }

        const guildData = new GuildData({dataBase: discordUser.dataBase, id: commandData.guild!.id, name: commandData.guild!.name, memberCount: commandData.guild!.memberCount});
        await guildData.getFromDataBase();

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
            let msg = await HelperFunctions.sendMessageWithCorrectChannel(commandData, msgEmbed);
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
            let msg = await HelperFunctions.sendMessageWithCorrectChannel(commandData, msgEmbed);
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
            let msg = await HelperFunctions.sendMessageWithCorrectChannel(commandData, msgEmbed);
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
            if (guildData.verificationSystem!.messageID !== ''){
                try{
                    const messageManager = new Discord.MessageManager(commandData.guildMember!.client.channels.resolve(guildData.verificationSystem!.channelID) as Discord.TextChannel);
                    const newMessage = await messageManager.fetch(guildData.verificationSystem!.messageID);
                    msgString = `------\n__**Channel:**__ <#${guildData.verificationSystem!.channelID}>\n`;
                    msgString += `__**Message Content:**__ ${newMessage.embeds[0]!.description}\n`;
                    msgString += `__**Emoji:**__ ${guildData.verificationSystem!.emoji}\n------`;
                }
                catch(error){
                    console.log(error);
                    msgString = '------\n__The verification system is currently disabled.__\n------\n';
                    guildData.verificationSystem!.channelID = '';
                    guildData.verificationSystem!.messageID = '';
                    guildData.verificationSystem!.emoji = '';
                    await guildData.writeToDataBase();
                    const msgEmbed = new Discord.MessageEmbed();
                    msgEmbed
                        .setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
                        .setColor(guildData.borderColor as [number, number, number])
                        .setTimestamp(Date() as unknown as Date)
                        .setTitle('__**Verification System:**__')
                        .setDescription(msgString);
                    await HelperFunctions.sendMessageWithCorrectChannel(commandData, msgEmbed);
                    return commandReturnData;
                }
            } else {
                msgString = '------\n__The verification system is currently disabled.__\n------\n';
                guildData.verificationSystem!.channelID = '';
                guildData.verificationSystem!.messageID = '';
                guildData.verificationSystem!.emoji = '';
                await guildData.writeToDataBase();
            }

            const msgEmbed = new Discord.MessageEmbed();
            msgEmbed
                .setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
                .setColor(guildData.borderColor as [number, number, number])
                .setTimestamp(Date() as unknown as Date)
                .setTitle('__**Verification System:**__')
                .setDescription(msgString);
            await HelperFunctions.sendMessageWithCorrectChannel(commandData, msgEmbed);
            return commandReturnData;
        }
        if (whatAreWeDoing === 'disable') {
            const currentChannel = commandData.guildMember!.client.channels
                .resolve(guildData.verificationSystem!.channelID) as Discord.TextChannel;

            if (guildData.verificationSystem!.channelID == '' || currentChannel === null) {
                const msgString = '------\n**Sorry, it looks as though it is already disabled!**\n------';
                let msgEmbed = new Discord.MessageEmbed()
				    .setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
				    .setColor(guildData.borderColor as [number, number, number])
				    .setDescription(msgString)
	    			.setTimestamp(Date() as unknown as Date)
    				.setTitle('__**Existence Issue:**__');
                let msg = await HelperFunctions.sendMessageWithCorrectChannel(commandData, msgEmbed);
                if (commandData.toTextChannel instanceof Discord.WebhookClient){
                    msg = new Discord.Message(commandData.guild!.client, msg, commandData.fromTextChannel!);
                }
                await msg.delete({timeout: 20000});
                guildData.verificationSystem!.channelID = '';
                guildData.verificationSystem!.messageID = '';
                guildData.verificationSystem!.emoji = '';
                await guildData.writeToDataBase();
                return commandReturnData;
            }

            const messageManager = new Discord.MessageManager(currentChannel);

            await messageManager.delete(guildData.verificationSystem!.messageID);

            guildData.verificationSystem!.channelID = '';
            guildData.verificationSystem!.messageID = '';
            guildData.verificationSystem!.emoji = '';
            await guildData.writeToDataBase();

            msgString = "__**Nicely done! You've disabled the verification system for this server!**__";
            const msgEmbed = new Discord.MessageEmbed();
            msgEmbed
                .setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
                .setColor(guildData.borderColor as [number, number, number])
                .setTimestamp(Date() as unknown as Date)
                .setTitle('__**Set Verification System:**__')
                .setDescription(msgString);
            await HelperFunctions.sendMessageWithCorrectChannel(commandData, msgEmbed);
            return commandReturnData;
        }
        if (whatAreWeDoing === 'enable') {
            if (guildData.defaultRoleIDs!.length === 0) {
                const msgString = '------\n**Please, first set a default role to be applied to the new member! Using !setdefaultrole.**\n------';
                let msgEmbed = new Discord.MessageEmbed()
				    .setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
				    .setColor(guildData.borderColor as [number, number, number])
				    .setDescription(msgString)
	    			.setTimestamp(Date() as unknown as Date)
    				.setTitle('__**Role Issue:**__');
                let msg = await HelperFunctions.sendMessageWithCorrectChannel(commandData, msgEmbed);
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
            let newMessage = await HelperFunctions.sendMessageWithCorrectChannel(commandData, msgEmbed2);
            if (commandData.toTextChannel instanceof Discord.WebhookClient){
                newMessage = new Discord.Message(commandData.guild!.client, newMessage, commandData.fromTextChannel!);
            }            
            
            await newMessage.react(commandData.args[2]!);

            const currentGuild = commandData.guild?.client.guilds.resolve(commandData.guild.id)!;
            const channelsArray = currentGuild.channels.cache.array()!;
            const currentRolesArray = currentGuild.roles.cache.array()!;
            let everyoneRoleID;
            for (let x = 0; x < currentRolesArray.length; x += 1){
                if (currentRolesArray[x]!.name === '@everyone'){
                    everyoneRoleID = currentRolesArray[x]?.id;
                }
            }
            for (let x = 0; x < channelsArray!.length; x += 1){
                if (channelsArray![x]!.id === commandData.fromTextChannel!.id){
                    const permOWs = channelsArray![x]?.permissionOverwrites.array()!;
                    for (let y = 0; y < permOWs.length; y += 1){
                        if (permOWs[y]?.id === everyoneRoleID){
                            await permOWs[y]?.update({VIEW_CHANNEL: true});
                        }
                    }
                    for (let y = 0; y < guildData.defaultRoleIDs.length; y += 1){
                        const newPermOWs = new Discord.PermissionOverwrites(channelsArray[x]!, {});
                        newPermOWs.type = 'role';
                        newPermOWs.id = guildData.defaultRoleIDs[y]!;
                        await newPermOWs.update({VIEW_CHANNEL: false});
                    }
                    
                }
                else{
                    const permOWs = channelsArray![x]?.permissionOverwrites.array()!;
                    for (let y = 0; y < permOWs.length; y += 1){
                        if (permOWs[y]?.id === everyoneRoleID){
                            await permOWs[y]?.update({VIEW_CHANNEL: false});
                        }
                    }
                    for (let y = 0; y < guildData.defaultRoleIDs.length; y += 1){
                        const newPermOWs = new Discord.PermissionOverwrites(channelsArray[x]!, {});
                        newPermOWs.type = 'role';
                        newPermOWs.id = guildData.defaultRoleIDs[y]!;
                        await newPermOWs.update({VIEW_CHANNEL: true});
                    }
                }
            }

            guildData.verificationSystem.channelID = commandData.fromTextChannel!.id;
            guildData.verificationSystem.messageID = newMessage.id;
            const argTwo = commandData.args[2];
            guildData.verificationSystem.emoji = argTwo!;
            await guildData.writeToDataBase();

            msgString = "__**Nicely done! You've enabled the verification system for this server!**__";
            const msgEmbed = new Discord.MessageEmbed();
            msgEmbed
                .setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
                .setColor(guildData.borderColor as [number, number, number])
                .setTimestamp(Date() as unknown as Date)
                .setTitle('__**Set Verification System:**__')
                .setDescription(msgString);
            let msg = await HelperFunctions.sendMessageWithCorrectChannel(commandData, msgEmbed);
            if (commandData.toTextChannel instanceof Discord.WebhookClient){
                msg = new Discord.Message(commandData.guild!.client, msg, commandData.fromTextChannel!);
            }
            await msg.delete({timeout: 20000});
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
export default command as FoundationClasses.BotCommand;
