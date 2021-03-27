// userinfo.ts - Module for my user info command.
// Jan 29, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

import Discord = require('discord.js');
import DiscordStuff = require('../DiscordStuff');

const command = new DiscordStuff.BotCommand();
command.name = 'userinfo';
command.description = '!userinfo to display your own info!\nOr !userinfo = @USERMENTION, to display the info of another user!';

/**
 * Displays info about a selected user.
 */
async function execute(message: Discord.Message, args: string[]): Promise<string> {
    try {
        const areWeInADM = await DiscordStuff.areWeInADM(message);

        if (areWeInADM === true) {
            return command.name;
        }

        let userID = String('');
        const userMentionRegExp = /.{2,3}\d{18}>/;
        const userIDRegExp = /\d{18}/;
        if (args[0] === undefined) {
            userID = message.author.id;
        } else if ((args[0].match(userIDRegExp) as string[])[0] as string === null
            && (args[0].match(userMentionRegExp) as string[])[0] === null) {
            await message.reply('Please enter a valid user ID or user mention! (!displayuserinfo = @USERMENTION)');
            await message.delete();
            return command.name;
        } else if (args[0].match(userMentionRegExp) != null) {
            userID = args[0].substring(3, args[0].length - 1);
        } else if ((args[0].match(userIDRegExp) as string[])[0] != null) {
            const argZero = args[0];
            const userIDOne = (argZero.match(userIDRegExp) as string[])[0];
            userID = userIDOne as string;
        }

        const guildMemberManager = new Discord.GuildMemberManager(message.guild as Discord.Guild);

        let guildMember;
        try {
            guildMember = await guildMemberManager.fetch(userID);
        } catch (error) {
            await message.reply('Sorry, but that user could not be found!');
            await message.delete();
            return command.name;
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
        const permissionsArray = guildMember.permissions.toArray();
        let msgString = String();
        for (let x = 0; x < permissionsArray.length; x += 1) {
            if ((permissionsArray[x] as Discord.PermissionString).split('_')[2] !== undefined) {
                msgString += `${((permissionsArray[x] as string ).split('_')[0] as string).substr(0, 1)}${((permissionsArray[x] as string).split('_')[0] as string).substr(1).toLowerCase()} ${((permissionsArray[x] as string)
                    .split('_')[1] as string).substr(0, 1)}${((permissionsArray[x]as string).split('_')[1] as string).substr(1).toLowerCase()} ${((permissionsArray[x] as string).split('_')[2] as string)
                    .substr(0, 1)}${((permissionsArray[x] as string).split('_')[2] as string).substr(1).toLowerCase()}`;
            } else if ((permissionsArray[x] as string).split('_')[1] !== undefined) {
                msgString += `${((permissionsArray[x] as string).split('_')[0] as string).substr(0, 1)}${((permissionsArray[x] as string).split('_')[0] as string).substr(1).toLowerCase()}	${((permissionsArray[x] as string)
                    .split('_')[1] as string).substr(0, 1)}${((permissionsArray[x] as string).split('_')[1] as string).substr(1).toLowerCase()}`;
            } else {
                msgString += `${((permissionsArray[x] as string).split('_')[0] as string).substr(0, 1)}${((permissionsArray[x] as string).split('_')[0] as string).substr(1).toLowerCase()}`;
            }
            if (x < permissionsArray.length - 1) {
                msgString += ', ';
            }
        }
        const field6 = { name: '__Roles:__', value: `${guildMember.roles.cache.array()}`, inline: false };
        fields.push(field6);
        const field7 = { name: '__Permissions:__', value: msgString, inline: false };
        fields.push(field7);

        const messageEmbed = new Discord.MessageEmbed();
        messageEmbed
            .setColor(guildMember.displayColor)
            .setTimestamp((Date() as unknown) as Date)
            .setTitle('__**User Info:**__')
            .setImage(guildMember.user.avatarURL() as string)
            .setAuthor(message.author.username, message.author.avatarURL() as string);
        messageEmbed.fields = fields as Discord.EmbedField[];
        await message.channel.send(messageEmbed);
        await message.delete();
        return command.name;
    } catch (error) {
        return new Promise((resolve, reject) => {
            reject(error);
        });
    }
}
command.function = execute;
export default command as DiscordStuff.BotCommand;
