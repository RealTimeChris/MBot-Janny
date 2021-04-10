// userinfo.ts - Module for my user info command.
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
    name: 'userinfo',
    description: '!userinfo to display your own info!\nOr !userinfo = @USERMENTION, to display the info of another user!',
    function: Function()
};

/**
 * Displays info about a selected user.
 */
async function execute(commandData: FoundationClasses.CommandData, discordUser: DiscordUser): Promise<FoundationClasses.CommandReturnData> {
    try {
        const commandReturnData: FoundationClasses.CommandReturnData = {
            commandName: command.name
        };
        
        const areWeInADM = await HelperFunctions.areWeInADM(commandData);

        if (areWeInADM === true) {
            return commandReturnData;
        }

        const guildData = new GuildData({dataBase: discordUser.dataBase, id: commandData.guild!.id, name: commandData.guild!.name, memberCount: commandData.guild!.memberCount});
        await guildData.getFromDataBase();

        let userID = '';
        const userMentionRegExp = /.{2,3}\d{18}>/;
        const userIDRegExp = /\d{18}/;
        if (commandData.args[0] === undefined) {
            userID = commandData.guildMember!.id;
        } else if (commandData.args[0].match(userIDRegExp)![0]! === null
            && (commandData.args[0].match(userMentionRegExp)![0]!) === null) {
            const msgString = '------\n**Please enter a valid user ID or user mention! (!displayuserinfo = @USERMENTION)**\n------';
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
        } else if (commandData.args[0].match(userMentionRegExp) != null) {
            userID = commandData.args[0].substring(3, commandData.args[0].length - 1);
        } else if (commandData.args[0].match(userIDRegExp)![0] != null) {
            const argZero = commandData.args[0];
            const userIDOne = argZero.match(userIDRegExp)![0];
            userID = userIDOne!;
        }

        const guildMemberManager = new Discord.GuildMemberManager(commandData.guild!);

        let guildMember;
        try {
            guildMember = await guildMemberManager.fetch(userID);
        } catch (error) {
            const msgString = '------\n**Sorry, but that user could not be found!**\n------';
            let msgEmbed = new Discord.MessageEmbed()
				.setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
				.setColor(guildData.borderColor)
				.setDescription(msgString)
				.setTimestamp(Date() as unknown as Date)
				.setTitle('__**User Issue:**__');
            let msg = await HelperFunctions.sendMessageWithCorrectChannel(commandData, msgEmbed);
            if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                msg = new Discord.Message(commandData.guild!.client, msg, commandData.fromTextChannel!);
            }
            await msg.delete({timeout: 20000});
            return commandReturnData;
        }

        const fields = [];
        const field = { name: '__User Tag:__', value: guildMember.user.tag, inline: true };
        fields.push(field);
        const field1 = { name: '__User Name:__', value: guildMember.user.username, inline: true };
        fields.push(field1);
        const field2 = { name: '__Display Name:__', value: guildMember.displayName, inline: true };
        fields.push(field2);
        const field3 = { name: '__User ID:__', value: guildMember.id, inline: true };
        fields.push(field3);
        const field4 = { name: '__Status:__', value: guildMember.presence.status, inline: true };
        fields.push(field4);
        const field5 = { name: '__Joined:__', value: guildMember.joinedAt, inline: true };
        fields.push(field5);
        const field6 = {name: '__Created At:__', value: guildMember.user.createdAt, inline: true}
        fields.push(field6);
        const permissionsArray = guildMember.permissions.toArray();
        let msgString = '';
        for (let x = 0; x < permissionsArray.length; x += 1) {
            if (permissionsArray[x]!.split('_')[2] !== undefined) {
                msgString += `${permissionsArray[x]!.split('_')[0]!.substr(0, 1)}${permissionsArray[x]!
                    .split('_')[0]!.substr(1).toLowerCase()} ${permissionsArray[x]!
                    .split('_')[1]!.substr(0, 1)}${permissionsArray[x]!.split('_')[1]!.substr(1).toLowerCase()} ${permissionsArray[x]!.split('_')[2]!
                    .substr(0, 1)}${permissionsArray[x]!.split('_')[2]!.substr(1).toLowerCase()}`;
            } else if (permissionsArray[x]!.split('_')[1] !== undefined) {
                msgString += `${permissionsArray[x]!.split('_')[0]!.substr(0, 1)}${permissionsArray[x]!.split('_')[0]!
                    .substr(1).toLowerCase()}	${permissionsArray[x]!
                    .split('_')[1]!.substr(0, 1)}${permissionsArray[x]!.split('_')[1]!.substr(1).toLowerCase()}`;
            } else {
                msgString += `${permissionsArray[x]!.split('_')[0]!.substr(0, 1)}${permissionsArray[x]!
                    .split('_')[0]!.substr(1).toLowerCase()}`;
            }
            if (x < permissionsArray.length - 1) {
                msgString += ', ';
            }
        }
        const field7 = { name: '__Roles:__', value: `${guildMember.roles.cache.array()}`, inline: false };
        fields.push(field7);
        const field8 = { name: '__Permissions:__', value: msgString, inline: false };
        fields.push(field8);

        const messageEmbed = new Discord.MessageEmbed();
        messageEmbed
            .setColor(guildMember.displayColor)
            .setTimestamp(Date() as unknown as Date)
            .setTitle('__**User Info:**__')
            .setImage(guildMember.user.avatarURL()!)
            .setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!);
        messageEmbed.fields = fields as Discord.EmbedField[];
        await HelperFunctions.sendMessageWithCorrectChannel(commandData, messageEmbed);
        return commandReturnData;
    } catch (error) {
        return new Promise((resolve, reject) => {
            reject(error);
        });
    }
}
command.function = execute;
export default command as FoundationClasses.BotCommand;
