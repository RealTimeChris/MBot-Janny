// trackuser.ts - Module for my track user command.
// Jan 30, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

import Discord = require('discord.js');
import DiscordStuff = require('../DiscordStuff');

const command = new DiscordStuff.BotCommand()
command.name = 'trackuser';
command.description = '!trackuser = ADD, @USERMENTION to track the user within the current text channel.\n\t!trackuser = REMOVE, @USERMENTION to stop tracking the user\n\t!trackuser to display all of the currently tracked users.';

/**
 * Deals with the setting of a user's tracking status.
 */
async function execute(commandData: DiscordStuff.CommandData, discordUser: DiscordStuff.DiscordUser): Promise<DiscordStuff.CommandReturnData> {
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

        const userMentionRegExp = /.{2,3}\d{18}>/;
        const idRegExp = /\d{18}/;
        let whatAreWeDoing = '';
        let trackedUserID = '';
        if (commandData.args[0] !== undefined && (commandData.args[0].toLowerCase() !== 'add' && commandData.args[0].toLowerCase() !== 'remove')) {
            const msgString = `------\n**Please enter either add or remove for the first argument! (!trackuser = ADDorREMOVE, @USERMENTION, or just !trackuser)**\n------`;
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
        }
        if (commandData.args[0] !== undefined && (commandData.args[1] === undefined || (!userMentionRegExp.test(commandData.args[1]) && !idRegExp.test(commandData.args[1])))) {
            const msgString = `------\n**Please enter a valud usermention! (!trackuser = ADDorREMOVE, @USERMENTION, or just !trackuser)**\n------`;
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
        }

        if (commandData.args[0] !== undefined) {
            whatAreWeDoing = commandData.args[0].toLowerCase();
        } else {
            whatAreWeDoing = '';
        }

        if (commandData.args[1] !== undefined) {
            const argOne = commandData.args[1];
            const trackedUserIDOne = argOne.match(idRegExp)![0]!;
            trackedUserID = trackedUserIDOne;
        }

        const userData = await discordUser.getUserDataFromDB(commandData.guildMember!.client);
        if (userData.trackedUserIDs !== undefined) {
            for (let x = 0; x < userData.trackedUserIDs.length; x += 1) {
                let isUserFound = false;
                for (let y = 0; y < commandData.guildMember!.client.guilds.cache.size; y += 1) {
                    const currentGuild = commandData.guildMember!.client.guilds.resolve(userData.trackingGuildIDs[x]!);
                    if (currentGuild != null) {
                        for (let z = 0; z < currentGuild.memberCount; z += 1) {
                            const currentUser = currentGuild.members.resolve(userData.trackedUserIDs[x]!);
                            if (currentUser != null) {
                                isUserFound = true;
                            }
                        }
                    }
                }
                if (isUserFound === false) {
                    const msgString = `------\n**Removing user ${userData.trackedUserNames[x]} from the list of tracked users!**\n------`;
                    let msgEmbed = new Discord.MessageEmbed()
				        .setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL() as string)
				        .setColor(guildData.borderColor as [number, number, number])
				        .setDescription(msgString)
				        .setTimestamp(Date() as unknown as Date)
				        .setTitle('__**Missing User(s):**__');
                    let msg = await DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed);
                    if (commandData.toTextChannel instanceof Discord.WebhookClient){
                        msg = new Discord.Message(commandData.guild!.client, msg, commandData.fromTextChannel!);
                    }
                    await msg.delete({timeout: 20000});
                    userData.trackedUserIDs.splice(x, 1);
                    userData.trackedUserNames.splice(x, 1);
                    userData.trackingChannelIDs.splice(x, 1);
                    userData.trackingGuildIDs.splice(x, 1);
                    discordUser.updateUserDataInDB(userData);
                }
            }
        }

        const currentGuild = commandData.guild!;

        const currentTextChannel = commandData.fromTextChannel as Discord.TextChannel;

        if (whatAreWeDoing === 'add') {
            try {
                const currentGuildMember = await currentGuild.members.fetch(trackedUserID);

                if (userData.trackedUserIDs.indexOf(trackedUserID) === -1) {
                    userData.trackedUserIDs.length += 1;
                    userData.trackedUserIDs[userData.trackedUserIDs.length - 1] = currentGuildMember
                        .user.id;

                    userData.trackedUserNames.length += 1;
                    userData.trackedUserNames[userData.trackedUserNames.length - 1] = currentGuildMember
                        .user.username;

                    userData.trackingChannelIDs.length += 1;
                    userData.trackingChannelIDs[userData.trackingChannelIDs.length - 1] = commandData.fromTextChannel!.id!;

                    userData.trackingGuildIDs.length += 1;
                    userData.trackingGuildIDs[userData.trackingGuildIDs.length - 1] = commandData.guild!.id;

                    discordUser.updateUserDataInDB(userData);

                    const msgString = `${'User <@!'}${currentGuildMember.id.toString()}> is now being tracked, in channel ${
                        currentTextChannel.name.toString()}.`;

                    const messageEmbed = new Discord.MessageEmbed()
                        .setTimestamp(Date() as unknown as Date)
                        .setTitle('__**New Tracked User:**__')
                        .setDescription(msgString)
                        .setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
                        .setThumbnail(currentGuildMember.user.avatarURL()!)
                        .setColor(guildData.borderColor as [number, number, number]);
                    await DiscordStuff.sendMessageWithCorrectChannel(commandData, messageEmbed);
                } else if (userData.trackedUserIDs.indexOf(trackedUserID) >= 0) {
                    const msgString = `<@!${commandData.guildMember?.id}> That user is already being tracked! I will update their tracking channel though!`;

                    const currentIndex = userData.trackedUserIDs.indexOf(trackedUserID);

                    userData.trackingGuildIDs[currentIndex] = commandData.guild!.id;
                    userData.trackingChannelIDs[currentIndex] = commandData.fromTextChannel!.id;

                    discordUser.updateUserDataInDB(userData);
                }
            } catch (error) {
                const msgString = `------\n**Sorry, but the specified user could not be found!**\n------`;
                let msgEmbed = new Discord.MessageEmbed()
				    .setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
				    .setColor(guildData.borderColor as [number, number, number])
				    .setDescription(msgString)
				    .setTimestamp(Date() as unknown as Date)
				    .setTitle('__**User Issue:**__');
                let msg = await DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed);
                if (commandData.toTextChannel instanceof Discord.WebhookClient){
                    msg = new Discord.Message(commandData.guild!.client, msg, commandData.fromTextChannel!);
                }
                await msg.delete({timeout: 20000});
            }
            
            return commandReturnData;
        }
        if (whatAreWeDoing === 'remove') {
            try {
                const currentGuildMember = await currentGuild.members.fetch(trackedUserID);

                if (commandData.args[0]!.toLowerCase() === 'remove' && userData.trackedUserIDs.length >= 1) {
                    const currentIndex = userData.trackedUserIDs.indexOf(trackedUserID);

                    if (currentIndex >= 0) {
                        userData.trackedUserIDs.splice(currentIndex, 1);
                        userData.trackedUserNames.splice(currentIndex, 1);
                        userData.trackingGuildIDs.splice(currentIndex, 1);
                        userData.trackingChannelIDs.splice(currentIndex, 1);
                        discordUser.updateUserDataInDB(userData);

                        let msgString = `User #${currentIndex.toString()} is no longer being tracked! Their name is: ${currentGuildMember.user.username}.\n`;

                        if (userData.trackedUserIDs.length === 0) {
                            msgString += '------\nNo more users are being tracked!\n';
                        }

                        const messageEmbed = new Discord.MessageEmbed()
                            .setTimestamp(Date() as unknown as Date)
                            .setTitle('__**Removed Tracked User:**__')
                            .setDescription(msgString)
                            .setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
                            .setColor(guildData.borderColor as [number, number, number]);
                        await DiscordStuff.sendMessageWithCorrectChannel(commandData, messageEmbed);
                    } else if (currentIndex === -1) {
                        const msgString = `------\n**There is noone by that ID being tracked!**\n------`;
                        let msgEmbed = new Discord.MessageEmbed()
				            .setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
				            .setColor(guildData.borderColor as [number, number, number])
				            .setDescription(msgString)
				            .setTimestamp(Date() as unknown as Date)
				            .setTitle('__**User Issue:**__');
                        let msg = await DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed);
                        if (commandData.toTextChannel instanceof Discord.WebhookClient){
                            msg = new Discord.Message(commandData.guild!.client, msg, commandData.fromTextChannel!);
                        }
                        await msg.delete({timeout: 20000});
                    }
                } else if ((commandData.args[0] as string).toLowerCase() === 'remove' && userData.trackedUserIDs.length === 0) {
                    const msgString = 'There is noone to remove from the tracked users!';

                    const messageEmbed = new Discord.MessageEmbed()
                        .setTimestamp(Date() as unknown as Date)
                        .setTitle('__**No Tracked Users:**__')
                        .setDescription(msgString)
                        .setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
                        .setColor(guildData.borderColor as [number, number, number]);
                    await DiscordStuff.sendMessageWithCorrectChannel(commandData, messageEmbed);
                }
            } catch (error) {
                const msgString = `<@!${commandData.guildMember?.id}> Sorry, but the specified user could not be found!`;
            }
            return commandReturnData;
        }
        if (commandData.args[0] === undefined) {
            let msgString = '';

            if (userData.trackedUserIDs.length > 0) {
                for (let x = 0; x < userData.trackedUserIDs.length; x += 1) {
                    if (userData.trackingGuildIDs[x] === commandData.guild!.id) {
                        const trackedGuildName = commandData.guild?.client.guilds
                            .resolve(userData.trackingGuildIDs[x]!)!.name;

                        const trackedChannelName = (commandData.guild?.client.channels
                            .resolve(userData.trackingChannelIDs[x]!) as Discord.TextChannel).name;

                        msgString += `__**Tracked User Name #${x.toString()}:**__ ${userData.trackedUserNames[x]!.toString()}\n`;
                        msgString += `In channel ${trackedChannelName} of the server ${trackedGuildName}\n`;
                    }
                }
            } else {
                msgString += 'Noone is being tracked, currently!';
            }

            const messageEmbed = new Discord.MessageEmbed()
                .setTitle('__**Tracked Users:**__')
                .setTimestamp(Date() as unknown as Date)
                .setDescription(msgString)
                .setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
                .setColor([254, 254, 254]);
            await DiscordStuff.sendMessageWithCorrectChannel(commandData, messageEmbed);
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
