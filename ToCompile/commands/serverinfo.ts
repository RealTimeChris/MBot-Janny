// serverinfo.ts - Module file for my display server info command.
// Jan 29, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

import Discord = require('discord.js');
import DiscordStuff = require('../DiscordStuff');

const command = new DiscordStuff.BotCommand();
command.name = 'serverinfo';
command.description = '!serverinfo to get info about the current server!\n!serverinfo = SERVERID to display info about that server!';

/**
 * Displays the info of a chosen server./
 */
async function execute(commandData: DiscordStuff.CommandData, discordUser: DiscordStuff.DiscordUser): Promise<DiscordStuff.CommandReturnData> {
    try {
        const commandReturnData = new DiscordStuff.CommandReturnData();
		commandReturnData.commandName = command.name;
        const idRegExp = /\d{18}/;

        let currentServerID;

        if (commandData.guildMember instanceof Discord.User && commandData.args[0] === undefined){
            const msgString = `------\n**Please, enter a server ID if you're going to DM this command!**\n------`;
            let msgEmbed = new Discord.MessageEmbed()
				.setAuthor((commandData.guildMember as Discord.User).username, (commandData.guildMember as Discord.User).avatarURL()!)
				.setColor([254, 254, 254])
				.setDescription(msgString)
				.setTimestamp(Date() as unknown as Date)
				.setTitle('__**Missing Or Invalid Arguments:**__')
            let msg = await DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed);
            if (commandData.toTextChannel instanceof Discord.WebhookClient){
                msg = new Discord.Message(commandData.guildMember!.client, msg, commandData.fromTextChannel!);
            }
            await msg.delete({timeout: 20000});
            return commandReturnData;
        }

        let guildData: DiscordStuff.GuildData;
        if (commandData.guildMember instanceof Discord.GuildMember){
            guildData = await discordUser.getGuildDataFromDB(commandData.guild!);
        }

        if (commandData.args[0] === undefined && (commandData.permsChannel as Discord.Channel).type !== 'dm') {
            currentServerID = (commandData.guild as Discord.Guild).id;
        }   else if (commandData.args[0] === undefined && (commandData.permsChannel as Discord.Channel).type === 'dm') {
            
            const msgString = '------\n**Please enter a valid server ID! (!displayserverinfo = SERVERID)**\n------';
                const messageEmbed = new Discord.MessageEmbed();
                if (commandData.guildMember instanceof Discord.User){
                    messageEmbed
                        .setDescription(msgString)
                        .setTitle('__**Missing Or Invalid Arguments:**__')
                        .setTimestamp(Date() as unknown as Date)
                        .setAuthor((commandData.guildMember as Discord.User).username, (commandData.guildMember as Discord.User).avatarURL()!)
                        .setColor([254, 254, 254]);
                    let msg = await DiscordStuff.sendMessageWithCorrectChannel(commandData, messageEmbed);
                    if (commandData.toTextChannel instanceof Discord.WebhookClient){
                        msg = new Discord.Message(commandData.guildMember!.client, msg, commandData.fromTextChannel!);
                    }
                    await msg.delete({timeout: 20000});
                }
                else if (commandData.guildMember instanceof Discord.GuildMember){
                     messageEmbed
                        .setDescription(msgString)
                        .setTitle('__**Missing Or Invalid Arguments:**__')
                        .setTimestamp((Date() as unknown) as Date)
                        .setAuthor(((commandData.guildMember as Discord.GuildMember).user as Discord.User).username, (((commandData.guildMember as Discord.GuildMember).user as Discord.User).avatarURL()!))
                        .setColor(guildData!.borderColor as [number, number, number]);
                    let msg = await DiscordStuff.sendMessageWithCorrectChannel(commandData, messageEmbed);
                    if (commandData.toTextChannel instanceof Discord.WebhookClient){
                        msg = new Discord.Message(commandData.guild!.client, msg, commandData.fromTextChannel!);
                    }
                    await msg.delete({timeout: 20000});
                }
            return commandReturnData;
        }	else if (!idRegExp.test(commandData.args[0] as string)) {
            const msgString = '------\n**Please enter a valid server ID! (!displayserverinfo = SERVERID)**\n------';
            const messageEmbed = new Discord.MessageEmbed();
            if (commandData.guildMember instanceof Discord.User){
                messageEmbed
                    .setDescription(msgString)
                    .setTitle('__**Missing Or Invalid Arguments:**__')
                    .setTimestamp((Date() as unknown) as Date)
                    .setAuthor((commandData.guildMember as Discord.User).username, (commandData.guildMember as Discord.User).avatarURL()!)
                    .setColor([254, 254, 254]);
                let msg = await DiscordStuff.sendMessageWithCorrectChannel(commandData, messageEmbed);
                if (commandData.toTextChannel instanceof Discord.WebhookClient){
                    msg = new Discord.Message(commandData.guildMember!.client, msg, commandData.fromTextChannel!);
                }
                await msg.delete({timeout: 20000});
            }
            else if (commandData.guildMember instanceof Discord.GuildMember){
                 messageEmbed
                    .setDescription(msgString)
                    .setTitle('__**Missing Or Invalid Arguments:**__')
                    .setTimestamp((Date() as unknown) as Date)
                    .setAuthor((commandData.guildMember as Discord.GuildMember).user!.username, (commandData.guildMember as Discord.GuildMember).user!.avatarURL()!)
                    .setColor(guildData!.borderColor as [number, number, number]);
                let msg = await DiscordStuff.sendMessageWithCorrectChannel(commandData, messageEmbed);
                if (commandData.toTextChannel instanceof Discord.WebhookClient){
                    msg = new Discord.Message(commandData.guild!.client, msg, commandData.fromTextChannel!);
                }
                await msg.delete({timeout: 20000});
            }
            return commandReturnData;
        }	else {
            const argZero = commandData.args[0];
            currentServerID = argZero;
        }
        const serverArray = commandData.guildMember?.client.guilds.cache.array().sort() as Discord.Guild[];

        let currentServer = null;
        for (let x = 0; x < serverArray.length; x += 1) {
            if (currentServerID === serverArray[x]!.id) {
                currentServer = serverArray[x];
            }
        }

        if (currentServer == null) {
            const msgString = '------\n**Sorry! No matching servers were found!**\n------';
            const messageEmbed = new Discord.MessageEmbed()
            if (commandData.guildMember instanceof Discord.User){
                messageEmbed
                    .setDescription(msgString)
                    .setTitle('__**Server Issue:**__')
                    .setTimestamp(Date() as unknown as Date)
                    .setAuthor((commandData.guildMember as Discord.User).username, (commandData.guildMember as Discord.User).avatarURL() as string)
                    .setColor([254, 254, 254]);
                let msg = await DiscordStuff.sendMessageWithCorrectChannel(commandData, messageEmbed);
                if (commandData.toTextChannel instanceof Discord.WebhookClient){
                    msg = new Discord.Message(commandData.guildMember!.client, msg, commandData.fromTextChannel!);
                }
                await msg.delete({timeout: 20000});
             }
             else if (commandData.guildMember instanceof Discord.GuildMember){
                 messageEmbed
                    .setDescription(msgString)
                    .setTitle('__**Server Issue:**__')
                    .setTimestamp(Date() as unknown as Date)
                    .setAuthor((commandData.guildMember as Discord.GuildMember).user!.username, (commandData.guildMember as Discord.GuildMember).user!.avatarURL()!)
                    .setColor(guildData!.borderColor as [number, number, number]);
                let msg = await DiscordStuff.sendMessageWithCorrectChannel(commandData, messageEmbed);
                if (commandData.toTextChannel instanceof Discord.WebhookClient){
                    msg = new Discord.Message(commandData.guild!.client, msg, commandData.fromTextChannel!);
                }
                await msg.delete({timeout: 20000});
            }
            return commandReturnData;
        }

        let categoryCount = 0;
        let voiceChannelCount = 0;
        let textChannelCount = 0;
        for (let x = 0; x < currentServer.channels.cache.size; x += 1) {
            if (currentServer.channels.cache.array()[x]!.type === 'voice') {
                voiceChannelCount += 1;
            }
            if (currentServer.channels.cache.array()[x]!.type === 'text') {
                textChannelCount += 1;
            }
            if (currentServer.channels.cache.array()[x]!.type === 'category') {
                categoryCount += 1;
            }
        }

        const fields = [];
        const field1 = { name: '__Server Name:__', value: currentServer.name, inline: true };
        fields.push(field1);
        const field2 = { name: '__Server ID:__', value: currentServer.id, inline: true };
        fields.push(field2);
        const field3 = { name: '__Server Member Count:__', value: currentServer.memberCount, inline: true };
        fields.push(field3);
        const field4 = { name: '__Server Owner:__', value: `<@!${currentServer.owner!.user.id}> 
        (${currentServer.owner!.user.tag})`, inline: true };
        fields.push(field4);
        const field5 = { name: '__Server Owner ID:__', value: currentServer.ownerID, inline: true };
        fields.push(field5);
        const field6 = { name: '__Role Count:__', value: currentServer.roles.cache.size, inline: true };
        fields.push(field6);
        const field7 = { name: '__Channel Category Count:__', value: categoryCount, inline: true };
        fields.push(field7);
        const field8 = { name: '__Text Channel Count:__', value: textChannelCount, inline: true };
        fields.push(field8);
        const field9 = { name: '__Voice Channel Count:__', value: voiceChannelCount, inline: true };
        fields.push(field9);
        const field10 = { name: '__Created At:__', value: currentServer.createdAt, inline: true };
        fields.push(field10);
        const field11 = { name: '__Region:__', value: currentServer.region, inline: true };
        fields.push(field11);

        let messageEmbed = new Discord.MessageEmbed()
        if (commandData.guildMember instanceof Discord.User){
           messageEmbed
            .setImage(currentServer.iconURL()!)
            .setTitle('__**Server Info:**__')
            .setTimestamp(Date() as unknown as Date)
            .setAuthor((commandData.guildMember as Discord.User).username, (commandData.guildMember as Discord.User).avatarURL()!)
            .setColor([254, 254, 254]);
            messageEmbed.fields = fields as Discord.EmbedField[];
        }
        else if (commandData.guildMember instanceof Discord.GuildMember){
            messageEmbed
            .setImage(currentServer.iconURL()!)
            .setTitle('__**Server Info:**__')
            .setTimestamp(Date() as unknown as Date)
            .setAuthor((commandData.guildMember as Discord.GuildMember).user!.username, (commandData.guildMember as Discord.GuildMember).user!.avatarURL()!)
            .setColor(guildData!.borderColor as [number, number, number]);
            messageEmbed.fields = fields as Discord.EmbedField[];
        }
        
        await DiscordStuff.sendMessageWithCorrectChannel(commandData, messageEmbed);
        return commandReturnData;
    } catch (error) {
        return new Promise((resolve, reject) => {
            reject(error);
        });
    }
}
command.function = execute;
export default command as DiscordStuff.BotCommand;
