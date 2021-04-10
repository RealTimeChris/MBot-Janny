// ghost.ts - Module for my "ghost" command.
// Mar 18, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

import Discord = require('discord.js');
import FoundationClasses from '../FoundationClasses';
import DiscordUser from '../DiscordUser';
import GuildData from '../GuildData';
import GuildMemberData from '../GuildMemberData';
import HelperFunctions from '../HelperFunctions';

const command: FoundationClasses.BotCommand = {
    name: 'ghost',
    description: ' THIS WILL COMPLETELY SILENCE AND MUTE THE USER ACROSS THE SERVER!\n!ghost to display a list of all currently ghosted users.\n!ghost = add, REASON, '
    + '@USERMENTION to ghost a new user.\n!ghost = remove, @USERMENTION to unghost a user.',
    function: Function()
};

async function execute(commandData: FoundationClasses.CommandData, discordUser: DiscordUser): Promise<FoundationClasses.CommandReturnData> {
    const returnData: FoundationClasses.CommandReturnData = {
        commandName: command.name
    };
    returnData.commandName = command.name;
    const guildData = new GuildData({dataBase: discordUser.dataBase, id: commandData.guild!.id, name: commandData.guild!.name, memberCount: commandData.guild!.memberCount});
    await guildData.getFromDataBase();
    try {
        const areWeInADM = await HelperFunctions.areWeInADM(commandData);

        if (areWeInADM) {
            return returnData;
        }

        const doWeHaveAdminPerms = await HelperFunctions.doWeHaveAdminPermission(commandData, discordUser);

        if (!doWeHaveAdminPerms) {
            return new Promise((resolve, reject) => {
                resolve(returnData);
            });
        }

        let whatAreWeDoing;
        const userMentionRegExp = /<@!\d{18}>/;
        const userIDRegExp = /\d{18}/;
        let ghostReason;
        let userID;
        if (commandData.args[0] === '' || commandData.args[0] === undefined) {
            whatAreWeDoing = 'viewing';
            userID = commandData.guildMember!.id;
        } else if (commandData.args[0] !== undefined && commandData.args[0].toString().toLowerCase() !== 'add' && commandData.args[0].toString().toLowerCase() !== 'remove') {
            const msgString = `------\n**Please, enter a proper first argument! (!ghost = add, REASON, @USERMENTION to 
                ghost a new user, !ghost = remove, @USERMENTION to unghost a user)**\n------`;
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
            return new Promise((resolve, reject) => {
                resolve(returnData);
            });
        }	else if (commandData.args[0] !== undefined && commandData.args[0].toString().toLowerCase() === 'add' && commandData.args[1] === undefined) {
            const msgString = `------\n**Please, enter a reason for this ghosting! (!ghost = add, REASON, @USERMENTION to 
                ghost a new user, !ghost = remove, @USERMENTION to unghost a user)**\n------`;
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
            return new Promise((resolve, reject) => {
                resolve(returnData);
            });
        } else if (commandData.args[0] !== undefined && commandData.args[0].toString().toLowerCase() === 'add' && commandData.args[2] === undefined) {
            const msgString = `------\n**Please, enter a usermention to select the target to ghost! (!ghost = add, REASON, 
                @USERMENTION to ghost a new user, !ghost = remove, @USERMENTION to unghost a user)**\n------`;
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
            return new Promise((resolve, reject) => {
                resolve(returnData);
            });
        }	else if (commandData.args[0] !== undefined && commandData.args[0].toString().toLowerCase() === 'remove' && commandData.args[1] === undefined) {
            const msgString = `------\n**Please, enter a usermention to select the target to de-ghost!
                (!ghost = remove, @USERMENTION to unghost a user)**\n------`;
                let msgEmbed = new Discord.MessageEmbed()
				.setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
				.setColor(guildData.borderColor)
				.setDescription(msgString)
				.setTimestamp(Date() as unknown as Date)
				.setTitle('__**Missing Or Invalid Arguments:**__')
            let msg = await HelperFunctions.sendMessageWithCorrectChannel(commandData, msgEmbed);
            if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                msg = new Discord.Message(commandData.guild!.client, msg, commandData.fromTextChannel!);
            }
            await msg.delete({timeout: 20000});
            return new Promise((resolve, reject) => {
                resolve(returnData);
            });
        } else if (commandData.args[0] !== undefined && commandData.args[0].toString().toLowerCase() === 'add' && !userMentionRegExp.test(commandData.args[2]!) && !userIDRegExp.test(commandData.args[2]!)) {
            const msgString = `------\n**Please, enter a usermention to select the target to ghost! (!ghost = add, REASON, 
                @USERMENTION to ghost a new user, !ghost = remove, @USERMENTION to unghost a user)**\n------`;
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
            return new Promise((resolve, reject) => {
                resolve(returnData);
            });
        } else if (commandData.args[0] !== undefined && commandData.args[0].toString().toLowerCase() === 'remove' && !userMentionRegExp.test(commandData.args[1]!) && !userIDRegExp.test(commandData.args[1]!)) {
            const msgString = `------\n**Please, enter a proper usermention to select the target to de-ghost! 
                (!ghost = remove, @USERMENTION to unghost a user)**\n------`;
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
            return new Promise((resolve, reject) => {
                resolve(returnData);
            });
        } else if (commandData.args[0] !== undefined && commandData.args[0].toString().toLowerCase() === 'add') {
            whatAreWeDoing = 'add';
            const argOne = commandData.args[1];
            ghostReason = argOne;
            const argTwo = commandData.args[2];
            const userIDRaw = argTwo!.match(/\d{18}/)![0];
            userID = userIDRaw;
        } else if (commandData.args[0] !== undefined && commandData.args[0].toString().toLowerCase() === 'remove') {
            whatAreWeDoing = 'remove';
            const argOne = commandData.args[1];
            const userIDRaw = argOne!.match(/\d{18}/)![0];
            userID = userIDRaw;
        }

        const currentGuildMember = await commandData.guild!.members.fetch(userID as string);

        const guildMemberData = new GuildMemberData({dataBase: discordUser.dataBase, displayName: currentGuildMember.displayName,
            id: currentGuildMember.id, guildId: commandData.guild!.id, userName: currentGuildMember.user.username});
        await guildMemberData.getFromDataBase();

        const channelsArray = commandData.guild!.channels.cache.array();

        const roleManager = new Discord.RoleManager(commandData.guild!);

        let ghostedRole = await roleManager.fetch(guildData.ghostedRoleID!);

        const memberRoleManager = new Discord.GuildMemberRoleManager(currentGuildMember);

        const memberRoleManagerBot = new Discord.GuildMemberRoleManager(commandData.guildMember as Discord.GuildMember);

        if (!(ghostedRole instanceof Discord.Role)) {
            ghostedRole = await roleManager.create({
                data: {
                    position: memberRoleManagerBot.highest.position - 1, color: 'FF3333', mentionable: true, name: 'Ghosted',
                },
            });

            guildData.ghostedRoleID = ghostedRole.id;
            await guildData.writeToDataBase();
        }

        if (whatAreWeDoing === 'add' || whatAreWeDoing === 'remove') {
            for (let x = 0; x < channelsArray.length; x += 1) {
                const voicePermissionOptions: FoundationClasses.PermissionOverwrites = {
                    channel: null,
                    id: guildData.ghostedRoleID!,
                    type: 'role',
                    allow: ['VIEW_CHANNEL'],
                    deny: ['ADMINISTRATOR', 'CREATE_INSTANT_INVITE', 'KICK_MEMBERS', 'BAN_MEMBERS',
                    'MANAGE_CHANNELS', 'MANAGE_GUILD', 'VIEW_AUDIT_LOG', 'PRIORITY_SPEAKER', 'STREAM', 'VIEW_GUILD_INSIGHTS',
                    'CONNECT', 'SPEAK', 'MUTE_MEMBERS', 'DEAFEN_MEMBERS', 'MOVE_MEMBERS', 'USE_VAD', 'CHANGE_NICKNAME', 'MANAGE_NICKNAMES',
                    'MANAGE_ROLES', 'MANAGE_WEBHOOKS', 'MANAGE_EMOJIS']
                };

                const textPermissionOptions: FoundationClasses.PermissionOverwrites = {
                    channel: null,
                    id: (guildData.ghostedRoleID as string),
                    type: 'role',
                    allow: ['VIEW_CHANNEL', 'READ_MESSAGE_HISTORY'],
                    deny: ['ADMINISTRATOR', 'CREATE_INSTANT_INVITE', 'KICK_MEMBERS', 'BAN_MEMBERS',
                    'MANAGE_CHANNELS', 'MANAGE_GUILD', 'ADD_REACTIONS', 'VIEW_AUDIT_LOG', 'SEND_MESSAGES',
                    'SEND_TTS_MESSAGES', 'MANAGE_MESSAGES', 'EMBED_LINKS', 'ATTACH_FILES', 'MENTION_EVERYONE', 'USE_EXTERNAL_EMOJIS',
                    'VIEW_GUILD_INSIGHTS', 'CHANGE_NICKNAME', 'MANAGE_NICKNAMES', 'MANAGE_ROLES',
                    'MANAGE_WEBHOOKS', 'MANAGE_EMOJIS']
                };

                if (channelsArray[x]!.type === 'voice') {
                    let currentChannel = new Discord.VoiceChannel(commandData.guild!, {});
                    currentChannel = channelsArray[x] as Discord.VoiceChannel;

                    let isItFound = false;
                    let currentChannelPerms;
                    for (let y = 0; y < memberRoleManager.cache.array().length; y += 1) {
                        if (guildData.verificationSystem!.channelID !== null) {
                            if (memberRoleManager.cache.array()[y]!.name === '@everyone') {
                                continue;
                            }
                        }
                        currentChannelPerms = currentChannel
                            .permissionsFor(memberRoleManager.cache.array()[y]!);
                        if (currentChannelPerms!.has('VIEW_CHANNEL')) {
                            isItFound = true;
                        }
                    }
                    currentChannelPerms = currentChannel.permissionsFor(currentGuildMember);
                    if (currentChannelPerms!.has('VIEW_CHANNEL')) {
                        isItFound = true;
                    }

                    if (isItFound === false) {
                        voicePermissionOptions.allow.splice(0, 1);
                        voicePermissionOptions.deny.push('VIEW_CHANNEL');
                    }
                    const currentOverwritesArray = currentChannel.permissionOverwrites.array();

                    voicePermissionOptions.channel = currentChannel;
                    currentOverwritesArray.push(voicePermissionOptions as unknown as Discord.PermissionOverwrites);
                    await currentChannel.overwritePermissions(currentOverwritesArray);
                } else {
                    let currentChannel = new Discord.GuildChannel(commandData.guild!, {});
                    currentChannel = channelsArray[x]!;

                    let isItFound1 = false;
                    let isItFound2 = false;
                    let currentChannelPerms;
                    for (let y = 0; y < memberRoleManager.cache.array().length; y += 1) {
                        if (guildData.verificationSystem!.channelID !== null) {
                            if (memberRoleManager.cache.array()[y]!.name === '@everyone') {
                                continue;
                            }
                        }
                        currentChannelPerms = currentChannel
                            .permissionsFor(memberRoleManager.cache.array()[y]!);
                        if (currentChannelPerms!.has('VIEW_CHANNEL')) {
                            isItFound1 = true;
                        }
                        if (currentChannelPerms!.has('READ_MESSAGE_HISTORY')) {
                            isItFound2 = true;
                        }
                    }
                    currentChannelPerms = currentChannel.permissionsFor(currentGuildMember);
                    if (currentChannelPerms!.has('VIEW_CHANNEL')) {
                        isItFound1 = true;
                    }
                    if (currentChannelPerms!.has('READ_MESSAGE_HISTORY')) {
                        isItFound2 = true;
                    }

                    if (isItFound1 === false) {
                        const argOne = textPermissionOptions.allow[1];
                        textPermissionOptions.allow[0] = argOne!;
                        textPermissionOptions.allow.splice(1, 1);
                        textPermissionOptions.deny.push('VIEW_CHANNEL');
                    }
                    if (isItFound2 === false && isItFound1 === false)	{
                        textPermissionOptions.allow.splice(0, 1);
                        textPermissionOptions.deny.push('READ_MESSAGE_HISTORY');
                    }
                    if (isItFound2 === false)	{
                        textPermissionOptions.allow.splice(1, 1);
                        textPermissionOptions.deny.push('READ_MESSAGE_HISTORY');
                    }

                    const currentOverwritesArray = currentChannel.permissionOverwrites.array();

                    textPermissionOptions.channel = currentChannel;
                    currentOverwritesArray.push(textPermissionOptions as unknown as Discord.PermissionOverwrites);
                    await currentChannel.overwritePermissions(currentOverwritesArray);
                }
            }
        }

        const ghostedUserArray: Discord.GuildMember[] = [];
        for (let x = 0; x < ghostedRole.members.array().length; x += 1) {
            ghostedUserArray.push(ghostedRole.members.array()[x]!);
        }

        if (whatAreWeDoing === 'viewing') {
            let msgString;
            if (ghostedUserArray.length === 0) {
                msgString = '------\n__**Great! There\'s nobody in "ghost" mode on your server!**__';
            } else {
                msgString = '------\n__**These are your server\'s currently "ghosted" members:**__\n------\n';
                for (let x = 0; x < ghostedUserArray.length; x += 1) {
                    if (x % 5 === 0 && x > 1) {
                        msgString += '\n';
                    }
                    msgString += `<@!${ghostedUserArray[x]!.id}>`;
                    if (x < ghostedUserArray.length - 1) {
                        msgString += ', ';
                    }
                }
            }

            msgString += '\n------';
            const msgEmbed = new Discord.MessageEmbed();
            msgEmbed
                .setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
                .setColor(guildData.borderColor)
                .setDescription(msgString)
                .setTimestamp(Date() as unknown as Date)
                .setTitle('__**Currently Ghosted Members:**__');
                await HelperFunctions.sendMessageWithCorrectChannel(commandData, msgEmbed);
            return new Promise((resolve, reject) => {
                resolve(returnData);
            });
        } if (whatAreWeDoing === 'add') {
            for (let x = 0; x < ghostedUserArray.length; x += 1) {
                if (currentGuildMember.id === (ghostedUserArray[x] as Discord.GuildMember).id) {
                    const msgString = `------\n**They are already ghosted!**\n------`;
                    let msgEmbed = new Discord.MessageEmbed()
				        .setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
				        .setColor(guildData.borderColor)
				        .setDescription(msgString)
				        .setTimestamp(Date() as unknown as Date)
				        .setTitle('__**Already Ghosted:**__');
                    let msg = await HelperFunctions.sendMessageWithCorrectChannel(commandData, msgEmbed);
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild!.client, msg, commandData.fromTextChannel!);
                    }
                    await msg.delete({timeout: 20000});
                    return new Promise((resolve, reject) => {
                resolve(returnData);
            });
                }
            }

            guildMemberData.previousRoleIDs.push(memberRoleManager.highest.id);
            for (let x = 0; x < memberRoleManager.cache.array().length; x += 1) {
                if (memberRoleManager.cache.array()[x]!.id === memberRoleManager.highest.id) {
                    continue;
                }
                if (memberRoleManager.cache.array()[x]!.name !== '@everyone' && memberRoleManager.cache.array()[x]!.name !== 'general'
                    && memberRoleManager.cache.array()[x]!.id !== memberRoleManager.highest.id) {
                    guildMemberData.previousRoleIDs!.push(memberRoleManager.cache.array()[x]!.id);
                }
            }

            for (let x = 0; x < guildMemberData.previousRoleIDs.length; x += 1) {
                try {
                    await memberRoleManager.remove(guildMemberData.previousRoleIDs[x]!);
                } catch (error) {
                    if (error.message === 'Missing Permissions') {
                        console.log('Missing Permissions');
                        continue;
                    }
                    else {
                        console.log(error);
                        continue;
                    }
                }             
            }

            for (let x = 0; x < channelsArray.length; x += 1) {
                const currentChannel = channelsArray[x]!;

                const currentChannelOverwritesArray = currentChannel.permissionOverwrites.array();

                for (let y = 0; y < currentChannelOverwritesArray.length; y += 1) {
                    if (currentChannelOverwritesArray[y]!.id === currentGuildMember.id) {
                        const permOWs: FoundationClasses.PermissionOverwrites = {
                            channel: currentChannel,
                            type: 'member',
                            id: currentGuildMember.id,
                            allow: currentChannelOverwritesArray[y]!.allow.toArray(),
                            deny: currentChannelOverwritesArray[y]!.deny.toArray()
                        };
                        guildMemberData.previousPermissionOverwrites!
                            .push(permOWs);
                        await currentChannelOverwritesArray[y]!.delete();
                    }
                }
            }

            await guildMemberData.writeToDataBase();

            if (currentGuildMember.voice.channel) {
                currentGuildMember.voice.kick();
            }

            await memberRoleManager.add(ghostedRole.id);

            const msgString = `------\n**Hello! You've been REDACTED, on the server ${commandData.guild!.name},
            for the following reason(s):	${ghostReason}\n Please, contact a moderator or admin to clear this issue up! Thanks!**\n------`;
            const msgEmbed = new Discord.MessageEmbed();
            msgEmbed
                .setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
                .setColor(guildData.borderColor)
                .setDescription(msgString)
                .setTimestamp(Date() as unknown as Date)
                .setTitle('__**You\'ve been ghosted:**__');

            const dmChannel = await currentGuildMember.createDM(true);
            dmChannel.send(msgEmbed);

            const msgString2 = `------\n__Hello! You've ghosted the following member__: <@!${currentGuildMember.id}> (${currentGuildMember.user.username})\n------`;
            const msgEmbed2 = new Discord.MessageEmbed();
            msgEmbed2
                .setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
                .setColor(guildData.borderColor)
                .setDescription(msgString2)
                .setTimestamp(Date() as unknown as Date)
                .setTitle('__**New Server Member Ghosted:**__');

                await HelperFunctions.sendMessageWithCorrectChannel(commandData, msgEmbed2);
            return new Promise((resolve, reject) => {
                resolve(returnData);
            });
        } if (whatAreWeDoing === 'remove') {
            let isItFound = false;
            for (let x = 0; x < ghostedUserArray.length; x += 1) {
                if (currentGuildMember.id === ghostedUserArray[x]!.id) {
                    isItFound = true;
                    break;
                }
            }

            if (isItFound === false) {
                const msgString = `-------\n**Sorry, but that user is not currently ghosted!**\n------`;
                let msgEmbed = new Discord.MessageEmbed()
				        .setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
				        .setColor(guildData.borderColor)
				        .setDescription(msgString)
				        .setTimestamp(Date() as unknown as Date)
				        .setTitle('__**Not Ghosted:**__');
                let msg = await HelperFunctions.sendMessageWithCorrectChannel(commandData, msgEmbed);
                if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                    msg = new Discord.Message(commandData.guild!.client, msg, commandData.fromTextChannel!);
                }
                await msg.delete({timeout: 20000});
                return new Promise((resolve, reject) => {
                resolve(returnData);
            });
            }

            for (let x = 0; x < guildMemberData.previousRoleIDs.length; x += 1) {
                try {
                    await memberRoleManager.add(guildMemberData.previousRoleIDs[x]!);
                } catch (error) {
                    if (error.message === 'Missing Permissions') {
                        continue;
                    }
                }
            }

            for (let x = 0; x < channelsArray.length; x += 1) {
                const currentChannel = channelsArray[x];

                const currentChannelOverwritesArray = currentChannel!.permissionOverwrites.array();

                for (let z = 0; z < guildMemberData.previousPermissionOverwrites!.length; z += 1) {
                    if ((guildMemberData.previousPermissionOverwrites![z]!)
                        .channel!.id === channelsArray[x]!.id) {
                        currentChannelOverwritesArray.push(guildMemberData.previousPermissionOverwrites[z] as unknown as Discord.PermissionOverwrites)
                    }
                }
                await (currentChannel as Discord.GuildChannel).overwritePermissions(currentChannelOverwritesArray);
            }

            guildMemberData.previousPermissionOverwrites = [];
            guildMemberData.previousRoleIDs = [];
            await guildMemberData.writeToDataBase();

            await memberRoleManager.remove(ghostedRole.id);

            const msgString = '------\n**Hello! You\'ve had your redacted status removed! Have a great day!**\n------';
            const msgEmbed = new Discord.MessageEmbed();
            msgEmbed
                .setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
                .setColor(guildData.borderColor)
                .setDescription(msgString)
                .setTimestamp(Date() as unknown as Date)
                .setTitle('__**You\'ve been un-ghosted:**__');

            const dmChannel = await currentGuildMember.createDM(true);
            dmChannel.send(msgEmbed);

            const msgString2 = `------\n__Hello! You've un-ghosted the following member__: <@!${currentGuildMember.id}> (${currentGuildMember.user.username})\n------`;
            const msgEmbed2 = new Discord.MessageEmbed();
            msgEmbed2
                .setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
                .setColor(guildData.borderColor)
                .setDescription(msgString2)
                .setTimestamp(Date() as unknown as Date)
                .setTitle('__**New Server Member Un-Ghosted:**__');
                await HelperFunctions.sendMessageWithCorrectChannel(commandData, msgEmbed2);
            return new Promise((resolve, reject) => {
                resolve(returnData);
            });
        }

        return new Promise((resolve, reject) => {
                resolve(returnData);
            });
    } catch (error) {
        if (error.message === 'Missing Permissions') {
            const msgString =  `------\n**I need more permissions! Please promote my role rank in the server options!**\n------`;
            const msgEmbed = new Discord.MessageEmbed();
            msgEmbed
                .setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
                .setColor(guildData.borderColor)
                .setDescription(msgString)
                .setTimestamp(Date() as unknown as Date)
                .setTitle('__**Permissions Issue:**__');
            await HelperFunctions.sendMessageWithCorrectChannel(commandData, msgEmbed);
            console.log(error);
            return new Promise((resolve, reject) => {
                resolve(returnData);
            });
        }
        return new Promise((resolve, reject) => {
            reject(error);
        });
    }
}
command.function = execute;
export default command as FoundationClasses.BotCommand;
