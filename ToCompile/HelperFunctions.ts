// HelperFunctions.ts - Module for my "helper functions".
// Apr 4, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

import Discord = require('discord.js');
import Level from 'level-ts';
import FoundationClasses from './FoundationClasses';
import DiscordUser from './DiscordUser';
import GuildData from './GuildData';

module HelperFunctions{
    /**
    * Function for sending out a message, using the appropriate channel.
    */
    export async function sendMessageWithCorrectChannel(commandData: FoundationClasses.CommandData, messageContents: String | Discord.MessageEmbed, atUserID: string | null = null): Promise<Discord.Message>{
        try{
            let returnMessage: Discord.Message;
            if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                if (atUserID !== null && messageContents instanceof Discord.MessageEmbed) {
                    const msgEmbeds: Discord.MessageEmbed[] = [];
                    msgEmbeds.push(messageContents);
                    returnMessage = await commandData.toTextChannel.send(`<@!${atUserID}>`, {embeds: msgEmbeds, split: false});
                }
                else if (atUserID === null) {
                    returnMessage = await commandData.toTextChannel.send(messageContents as string | Discord.MessageEmbed);
                }
                else{
                    returnMessage = await commandData.toTextChannel.send(`<@!${atUserID}> ${messageContents}`);
                }
            }
            else if (commandData.toTextChannel instanceof Discord.TextChannel) {
                if (atUserID !== null && messageContents instanceof Discord.MessageEmbed) {
                    returnMessage = await commandData.toTextChannel.send(`<@!${atUserID}>`, {embed: messageContents});
                }
                else if (atUserID === null) {
                    returnMessage = await commandData.toTextChannel.send(messageContents as string | Discord.MessageEmbed);
                }
                else{
                    returnMessage = await commandData.toTextChannel.send(`<@!${atUserID}> ${messageContents}`);
                }			
            }
            else if (commandData.toTextChannel instanceof Discord.DMChannel) {
                returnMessage = await commandData.toTextChannel.send(messageContents as string | Discord.MessageEmbed);
            }

            return returnMessage!;
        }
        catch(error) {
            return new Promise((resolve, reject) => {
                reject(error);
                })
        }
    }

    /**
     * Recurses through a succession of messages.
     */
    export async function recurseThroughMessagePages(userID: string, message: Discord.Message,
        currentPageIndex: number, messageEmbeds: Discord.MessageEmbed[], deleteAfter: boolean): Promise<void> {
        let newCurrentPageIndex = currentPageIndex;
        try {
            message.react('◀️');
            message.react('▶️');
            message.react('❌');
            const filter = (reaction: Discord.MessageReaction, user: Discord.User) => (reaction.emoji.name === '◀️' || reaction.emoji.name === '▶️' || reaction.emoji.name === '❌') && user.id === userID;
            const reactionCollector = message.createReactionCollector(filter, { time: 120000 });
            reactionCollector.on('collect', async (reaction) => {
                reactionCollector.resetTimer({ time: 120000 });
                if (reaction.emoji.name === '❌') {
                    reactionCollector.stop('User exited.');
                } else if (reaction.emoji.name === '▶️' && (newCurrentPageIndex === (messageEmbeds.length - 1))) {
                    reaction.users.remove(userID);
                    newCurrentPageIndex = 0;
                    const messageEmbed = messageEmbeds[newCurrentPageIndex]!;
                    await message.edit(messageEmbed);
                } else if (reaction.emoji.name === '▶️' && (newCurrentPageIndex < messageEmbeds.length)) {
                    reaction.users.remove(userID);
                    newCurrentPageIndex += 1;
                    const messageEmbed = messageEmbeds[newCurrentPageIndex]!;
                    await message.edit(messageEmbed);
                } else if (reaction.emoji.name === '◀️' && (newCurrentPageIndex > 0)) {
                    reaction.users.remove(userID);
                    newCurrentPageIndex -= 1;
                    const messageEmbed = messageEmbeds[newCurrentPageIndex]!;
                    await message.edit(messageEmbed);
                } else if (reaction.emoji.name === '◀️' && (newCurrentPageIndex === 0)) {
                    reaction.users.remove(userID);
                    newCurrentPageIndex = messageEmbeds.length - 1;
                    const messageEmbed = messageEmbeds[newCurrentPageIndex]!;
                    await message.edit(messageEmbed);
                }
            });

            reactionCollector.on('end', async () => {
                if (deleteAfter === true) {
                    if (message.deletable) {
                        await message.delete();
                    }
                    await message.delete();
                } else {
                    await message.reactions.removeAll();
                }
            });
            return;
        } catch (error) {
            return new Promise((resolve, reject) => {
                reject(error);
            });
        }
    }
    
    /**
     * Checks a user ID against an array of user IDs to see if it is present.
     */
    export async function checkForBotCommanderStatus(userID: string, commanderIDs: string[]): Promise<boolean> {
        let isCommander = false;
        for (let x = 0; x < commanderIDs.length; x += 1) {
            if (userID === commanderIDs[x]) {
                isCommander = true;
                break;
            }
        }
        return isCommander;
    }

    /**
     * Checks to see if we're in a DM channel, and sends a warning message if so.
     */
    export async function areWeInADM(commandData: FoundationClasses.CommandData): Promise<boolean> {
        try { 
            const currentChannelType = commandData.fromTextChannelType;

            if (currentChannelType === 'dm') {
                const msgString = `------\n**Sorry, but we can't do that in a direct message!**\n------`;
                const msgEmbed = new Discord.MessageEmbed();
                msgEmbed
                    .setAuthor((commandData.guildMember as Discord.User).username, (commandData.guildMember as Discord.User).avatarURL()!)
                    .setColor([254, 254, 254])
                    .setDescription(msgString)
                    .setTimestamp(Date() as unknown as Date)
                    .setTitle('__**Direct Message Issue:**__');
                let msg = await sendMessageWithCorrectChannel(commandData, msgEmbed);
                if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                    msg = new Discord.Message(commandData.guildMember!.client, msg, commandData.fromTextChannel!);
                }
                await msg.delete({timeout: 20000});
                
                return true;
            }
            return false;
        } catch (error) {
            return new Promise((resolve, reject) => {
                reject(error);
            });
        }
    }

    /**
     * Checks if we have admin permissions in the current channel.
     */
    export async function doWeHaveAdminPermission(commandData: FoundationClasses.CommandData, discordUser: DiscordUser): Promise<boolean> {
        try {
            const guildData = new GuildData({dataBase: discordUser.dataBase, id: commandData.guild!.id, name: commandData.guild!.name, memberCount: commandData.guild!.memberCount});
            await guildData.getFromDataBase();

            const currentChannelPermissions = (commandData.guildMember! as Discord.GuildMember).permissionsIn(commandData.permsChannel!);

            const permissionStrings = 'ADMINISTRATOR';

            const areTheyAnAdmin = currentChannelPermissions.has(permissionStrings);

            const areTheyACommander = await checkForBotCommanderStatus(commandData.guildMember!.id,
                discordUser.userData.botCommanders);

            if (areTheyAnAdmin === true || areTheyACommander === true) {
                return true;
            }

            const msgString = `------\n**Sorry, but you don't have the permissions required for that!**\n------`
            const msgEmbed = new Discord.MessageEmbed();
            msgEmbed
                .setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
                .setColor(guildData.borderColor as [number, number, number])
                .setDescription(msgString)
                .setTimestamp(Date() as unknown as Date)
                .setTitle("__**Permissions Issue:**__");
            let msg = await sendMessageWithCorrectChannel(commandData, msgEmbed);
            if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                msg = new Discord.Message(commandData.guildMember!.client, msg, commandData.fromTextChannel!);
            }
            await msg.delete({timeout:20000});
            return false;
        } catch (error) {
            return new Promise((resolve, reject) => {
                reject(error);
            });
        }
    }

    /**
    * Applies default roles to a new guild member.
    */
    export async function applyDefaultRoles(guildData: GuildData, guildMember: Discord.GuildMember): Promise<void> {
        let currentIndex = 0;
        try {
            if (guildData.verificationSystem.channelID === null||guildData.verificationSystem.channelID === "") {
                const guildMemberRoleManager = new Discord.GuildMemberRoleManager(guildMember);

                for (let x = 0; x < guildData.defaultRoleIDs.length; x += 1) {
                    currentIndex = x;
                    await guildMemberRoleManager.add(guildData.defaultRoleIDs[x]!);
                }
            }
            return;
        } catch (error) {
            guildData.defaultRoleIDs.splice(currentIndex, 1);
            applyDefaultRoles(guildData, guildMember);
            return new Promise((resolve, reject) => {
                reject(error);
            });
        }
    }

    /**
    * Takes a server record and a live guild object and either updates or adds it to the records.
    */
    export async function recurseThroughServerRecords(dataBase: Level, liveGuildArray: Discord.Guild[], keyNames: string[], y = 0): Promise<void> {
        try {
            if (keyNames.length === 0) {
                return new Promise((resolve, reject) => {
                    resolve();
                });
            }
            let yNew = y;
            const fileObject = await dataBase.get(keyNames[0]!);
            
            keyNames.splice(0, 1);

            fileObject.serverName = liveGuildArray[y]?.name;
            fileObject.serverID = liveGuildArray[y]?.id;
            console.log(`Updating Server Record Info For Server #${y}: ${fileObject.serverName}`);

            const guildMembersCollection = await liveGuildArray[y]!.members.fetch();

            const membersArray = guildMembersCollection.array().sort();

            for (let z = 0; z < membersArray.length; z += 1) {
                let areTheyFoundInFile = false;
                for (let w = 0; w < fileObject.userRecords.length; w += 1) {
                    if (membersArray[z]!.id === fileObject.userRecords[w]!.userID) {
                        areTheyFoundInFile = true;
                        fileObject.userRecords[w].userID = membersArray[z]!.user.id;
                        fileObject.userRecords[w].lastKnownUserTag = membersArray[z]!.user.tag;
                        fileObject.userRecords[w].lastKnownUsername = membersArray[z]!.user.username;
                    }
                }
                if (areTheyFoundInFile === false) {
                    const userRecord: FoundationClasses.UserRecord = {
                        lastKnownUserTag: membersArray[z]!.user.tag,
                        lastKnownUsername: membersArray[z]!.user.username,
                        userID: membersArray[z]!.id,
                    };
                    fileObject.userRecords.push(userRecord);
                    console.log(`Adding New User Record: ${userRecord.lastKnownUserTag} of server: ${fileObject.serverName}`);
                }
            }
            const serverRecordKey = `${liveGuildArray[y]!.id} + Record`;
            dataBase.put(serverRecordKey, fileObject);
            yNew += 1;
            await recurseThroughServerRecords(dataBase, liveGuildArray, keyNames, yNew);
            return;
        } catch (error) {
            if (error.type === 'NotFoundError') {
                const serverRecord: FoundationClasses.ServerRecord = {
                    serverName: liveGuildArray[y]!.name,
                    serverID: liveGuildArray[y]!.id,
                    replacementServerInvite: '',
                    userRecords: []
                };
                console.log(`Adding New Server Record: ${serverRecord.serverName}`);

                const guildMembersCollection = await liveGuildArray[y]!.members.fetch();

                const membersArray = guildMembersCollection.array().sort();

                for (let z = 0; z < membersArray.length; z += 1) {
                    const userRecord: FoundationClasses.UserRecord = {
                        lastKnownUsername: membersArray[z]!.user.username,
                        lastKnownUserTag: membersArray[z]!.user.tag,
                        userID: membersArray[z]!.id
                    };
                    serverRecord.userRecords.push(userRecord);
                    console.log(`Adding New User Record: ${userRecord.lastKnownUserTag} of server: ${serverRecord.serverName}`);
                }
                const serverRecordKey = `${liveGuildArray[y]!.id} + Record`;
                await dataBase.put(serverRecordKey, serverRecord);
                await recurseThroughServerRecords(dataBase, liveGuildArray, keyNames, y);
                return;
            }
            return new Promise((resolve, reject) => {
                reject(error);
            });
        }
    }

    /**
	* Caches messages for each of the guilds that have an active "verification" system.
	*/
    export async function cacheMessagesForVerification(client: Discord.Client, discordUser: DiscordUser): Promise<void> {
		GuildData.guildsData.forEach(async (guildData: GuildData) => {
			try {
				if (guildData.verificationSystem.channelID != '') {
					const currentGuild = await client.guilds.fetch(guildData.id!);
					const currentChannel = currentGuild.channels.resolve(guildData.verificationSystem.channelID) as Discord.TextChannel;
					if (currentChannel === null) {
						console.log('null Channel! Purging from the values! For Guild: ' + guildData.guildName);
						guildData.verificationSystem.channelID = '';
						guildData.verificationSystem.messageID = '';
						guildData.verificationSystem.emoji = '';
						await guildData.writeToDataBase();
						return;
					}
					const msgManager = new Discord.MessageManager(currentChannel);
					const oldVerificationMessage = await msgManager.fetch(guildData.verificationSystem.messageID);
					const newMsgEmbed = oldVerificationMessage.embeds[0];
					const newVerificationMessage = await currentChannel.send(newMsgEmbed!);
					guildData.verificationSystem.messageID = newVerificationMessage.id;
					await guildData.writeToDataBase();
					await newVerificationMessage.react((oldVerificationMessage.reactions.cache.first()!).emoji.name);
					await oldVerificationMessage.delete();
					return;
				}
				return discordUser.userData.userID;
			} catch (error) {
				console.log('Looks like the channel or the message no longer exists! Purging the verification system values!');
				guildData.verificationSystem.channelID = '';
				guildData.verificationSystem.messageID = '';
				guildData.verificationSystem.emoji = '';
				await guildData.writeToDataBase();
				return new Promise((resolve, reject) => {
					reject(error);
				});
			}
		});
	}
    
    /**
    * Updates and saves the Discord record, which contains user information.
    */
    export async function updateAndSaveDiscordRecord(client: Discord.Client, discordUser: DiscordUser): Promise<void> {
        try {
            const liveGuildArray = client.guilds.cache.array();

            const keyNames = [];
            for (let x = 0; x < liveGuildArray.length; x += 1) {
                const keyname = `${liveGuildArray[x]!.id} + Record`;
                keyNames.push(keyname);
            }

            await recurseThroughServerRecords(discordUser.dataBase, liveGuildArray, keyNames);
            return;
        } catch (error) {
            return new Promise((resolve, reject) => {
                reject(error);
            });
        }
    }

    /**
    * Sends out an invite to a user from a selected list of users,
    * if the server has been nuked/deleted.
    */
    export async function sendInviteIfGuildIsActive(client: Discord.Client, discordUser: DiscordUser): Promise<void> {
        try {
            if (discordUser.userData.activeInviteGuilds.length === 0) {
                return new Promise((resolve, reject) => {
                    resolve();
                });
            }

            for (let x = 0; x < discordUser.userData.activeInviteGuilds.length; x += 1) {
                let fileKey = '';

                fileKey = `${discordUser.userData.activeInviteGuilds[x]} + Record`;

                let currentFileObject: FoundationClasses.ServerRecord;
                try {
                    currentFileObject = await discordUser.dataBase.get(fileKey);
                } catch (error) {
                    if (error.type === 'NotFoundError') {
                        discordUser.userData.activeInviteGuilds.splice(x, 1);
                        console.log("Splicing the 'active invite guild'!");
                        return new Promise((resolve, reject) => {
                            resolve();
                        });
                    }
                    return new Promise((resolve, reject) => {
                        reject(error);
                    });
                }

                const { userID } = currentFileObject.userRecords[0]!;
                const guildName = currentFileObject.serverName;
                const inviteLink = currentFileObject.replacementServerInvite;
                const inviteString = `Hello, it is my understanding that you were a member of ${guildName
                }.\nIf you would like to continue along with us, then please go ahead and join the new server! Enjoy!\n${inviteLink}`;

                const currentUser = client.users.resolve(userID);
                let wereTheyAvailable = false;

                try {
                    const dmChannel = await currentUser!.createDM();
                    await dmChannel.send(inviteString);
                    wereTheyAvailable = true;
                } catch (error) {
                    console.log(`Sorry, but the user ${currentFileObject.userRecords[0]!.lastKnownUsername} could not be found!`);
                }

                if (wereTheyAvailable === true) {
                    const savedUser: FoundationClasses.UserRecord = {
                        userID: currentFileObject.userRecords[0]!.userID,
                        lastKnownUserTag: currentFileObject.userRecords[0]!.lastKnownUserTag,
                        lastKnownUsername: currentFileObject.userRecords[0]!.lastKnownUsername
                    };
                    currentFileObject.userRecords.splice(0, 1);

                    if (currentFileObject.userRecords.length === 0) {
                        discordUser.dataBase.del(fileKey);
                    } else {
                        await discordUser.dataBase.put(fileKey, currentFileObject);
                    }

                    const availableFileKey = `${fileKey} + Available`;

                    let availableFileString = '';
                    try {
                        const availableFileObject = await discordUser.dataBase.get(availableFileKey);

                        availableFileObject.userRecords.push(savedUser);

                        availableFileString = JSON.stringify(availableFileObject);

                        await discordUser.dataBase.put(availableFileKey, availableFileString);
                    } catch (error) {
                        const serverRecord: FoundationClasses.ServerRecord = {
                            replacementServerInvite: currentFileObject.replacementServerInvite,
                            serverID: currentFileObject.serverID,
                            serverName: currentFileObject.serverName,
                            userRecords: []
                        };
                        serverRecord.userRecords.push(savedUser);
                        availableFileString = JSON.stringify(serverRecord);

                        await discordUser.dataBase.put(availableFileKey, availableFileString);
                        return;
                    }
                } else {
                    const deletedUser: FoundationClasses.UserRecord = {
                        userID: currentFileObject.userRecords[0]!.userID,
                        lastKnownUsername: currentFileObject.userRecords[0]!.lastKnownUsername,
                        lastKnownUserTag: currentFileObject.userRecords[0]!.lastKnownUserTag
                    };
                    currentFileObject.userRecords.splice(0, 1);

                    if (currentFileObject.userRecords.length === 0) {
                        discordUser.dataBase.del(fileKey);
                    } else {
                        await discordUser.dataBase.put(fileKey, currentFileObject);
                    }

                    const notAvailableFileKey = `${fileKey} +  NotAvailable`;

                    try {
                        const notAvailableFileObject = await discordUser.dataBase.get(notAvailableFileKey);

                        notAvailableFileObject.userRecords.push(deletedUser);

                        await discordUser.dataBase.put(notAvailableFileKey, notAvailableFileObject);
                    } catch (error) {
                        const serverRecord: FoundationClasses.ServerRecord = {
                            replacementServerInvite: currentFileObject.replacementServerInvite,
                            serverName: currentFileObject.serverName,
                            serverID: currentFileObject.serverID,
                            userRecords: []
                        };
                        serverRecord.userRecords.push(deletedUser);

                        discordUser.dataBase.put(notAvailableFileKey, serverRecord);
                        return;
                    }
                }
            }
            return new Promise((resolve, reject) => {
                resolve();
            });
        } catch (error) {
            return new Promise((resolve, reject) => {
                reject(error);
            });
        }
    }

    async function deleteMessage(message: Discord.Message, messageNumber: number, messageCount: number, channelName: string){
        console.log(`Deleting message number ${messageNumber} of ${messageCount}, in channel ${channelName}.`);
        await message.delete();
    };
    
    /**
    * Purges all of the selected messages within the given channels,
    * of each of the instance's guilds.
    */
    export async function deleteMessages(client: Discord.Client, guildData: GuildData, channelIndex: number, discordUser: DiscordUser): Promise<void> {
        try {
            const numberOfMessagesToSave = guildData.deletionChannels[channelIndex]?.numberOfMessagesToSave!;
            const channelID = guildData.deletionChannels[channelIndex]?.channelID!;
            const currentChannel = client.channels.resolve(channelID) as Discord.TextChannel;
            if (currentChannel === null){
                guildData.deletionChannels.splice(channelIndex, 1);
                console.log('Removing an "unknown channel" from list of deletion channels!');
                await guildData.writeToDataBase();
                return;
            }
            await guildData.getFromDataBase();
            if (guildData.deletionChannels[channelIndex]!.currentlyBeingDeleted === true) {
                console.log(`Nope! Still being deleted! Channel: ${currentChannel.name}`);
                return;
            }

            console.log(`Checking for messages to delete in channel: ${currentChannel.name}`);

            guildData.deletionChannels[channelIndex]!.currentlyBeingDeleted = true;
            await guildData.writeToDataBase();

            if (numberOfMessagesToSave > 0) {
                let startingMessage: Discord.Message | undefined = undefined;
                for (let x = (Math.trunc(numberOfMessagesToSave / 100)); x >= 0; x -= 1) {
                    let currentMessageLimit = 0;
                    if (x > 0) {
                        currentMessageLimit = 100;
                        if (x === (Math.trunc(numberOfMessagesToSave / 100))) {
                            const arrayOfMessagesToSave = (await currentChannel.messages.fetch({ limit: currentMessageLimit })).array();
                            if (arrayOfMessagesToSave.length === 0) {
                                break;
                            }
                            startingMessage = arrayOfMessagesToSave[arrayOfMessagesToSave.length - 1];
                        } else {
                            const arrayOfMessagesToSave = (await currentChannel.messages.fetch({ limit: currentMessageLimit, before: startingMessage!.id })).array();
                            if (arrayOfMessagesToSave.length === 0) {
                                break;
                            }
                            startingMessage = arrayOfMessagesToSave[arrayOfMessagesToSave.length - 1];
                        }
                    } else {
                        currentMessageLimit = (numberOfMessagesToSave % 100) + 1;
                        if (x === (Math.trunc(numberOfMessagesToSave / 100))) {
                            const arrayOfMessagesToSave = (await currentChannel.messages.fetch({ limit: currentMessageLimit })).array();
                            arrayOfMessagesToSave.splice(arrayOfMessagesToSave.length - 1, 1);
                            if (arrayOfMessagesToSave.length === 0) {
                                break;
                            }
                            startingMessage = arrayOfMessagesToSave[arrayOfMessagesToSave.length - 1];
                        } else {
                            const arrayOfMessagesToSave = (await currentChannel.messages.fetch({ limit: currentMessageLimit, before: startingMessage!.id })).array();
                            arrayOfMessagesToSave.splice(arrayOfMessagesToSave.length - 1, 1);
                            if (arrayOfMessagesToSave.length === 0) {
                                break;
                            }
                            startingMessage = arrayOfMessagesToSave[arrayOfMessagesToSave.length - 1];
                        }
                    }
                }
                let x = 1;
                const arrayOfMessageArrays = [];
                while (x !== 0) {
                    if (startingMessage !== undefined) {
                        const arrayOfMessages = (await currentChannel.messages
                            .fetch({ limit: 100, before: startingMessage.id })).array();
                            x = arrayOfMessages.length;
                        if (arrayOfMessages !== undefined && startingMessage !== undefined && x > 0) {
                            startingMessage = arrayOfMessages[arrayOfMessages.length - 1];
                            arrayOfMessageArrays.push(arrayOfMessages);
                        } else {
                            break;
                        }
                    }	
                    else {
                        const arrayOfMessages = (await currentChannel.messages
                            .fetch({ limit: 100})).array();
                            x = arrayOfMessages.length;
                        if (arrayOfMessages !== undefined && x > 0) {
                            startingMessage = arrayOfMessages[arrayOfMessages.length - 1];
                            arrayOfMessageArrays.push(arrayOfMessages);
                        } else {
                            break;
                        }
                    }
                }
                let totalMessageCount = 0;
                for (let y = 0; y < arrayOfMessageArrays.length; y += 1) {
                    for (let z = 0; z < arrayOfMessageArrays[y]!.length; z += 1) {
                        if (arrayOfMessageArrays[y]![z]!.pinned === true
            || arrayOfMessageArrays[y]![z]!.deleted === true) {
                            arrayOfMessageArrays[y]!.splice(z, 1);
                        } else {
                            totalMessageCount += 1;
                        }
                    }
                }
                console.log(`Total of ${totalMessageCount} in channel: ${currentChannel.name}`);
                if (arrayOfMessageArrays[0] === undefined || arrayOfMessageArrays[0].length === 0) {
                    guildData.deletionChannels[channelIndex]!.currentlyBeingDeleted = false;
                    await guildData.writeToDataBase();
                    return;
                }
                for (let y = arrayOfMessageArrays.length - 1; y >= 0; y -= 1) {
                    for (let z = arrayOfMessageArrays[y]!.length - 1; z >= 0; z -= 1) {
                        await guildData.getFromDataBase();
                        if (guildData.deletionChannels[channelIndex]!.currentlyBeingDeleted === false) {
                            return;
                        }
                        if (!arrayOfMessageArrays[y]![z]!.pinned) {
                            if (arrayOfMessageArrays[y]![z]?.deletable) {
                                deleteMessage(arrayOfMessageArrays![y]![z]!, totalMessageCount - (y*100+z), totalMessageCount, currentChannel.name);
                            }
                        }
                    }
                }
            } else {
                let x = 1;
                let y = 0;
                const arrayOfMessageArrays = [];
                let startingMessage: Discord.Message;
                while (x !== 0) {
                    let arrayOfMessages;
                    if (y === 0) {
                        arrayOfMessages = (await currentChannel.messages.fetch({ limit: 100 })).array();
                        startingMessage = arrayOfMessages[arrayOfMessages.length - 1]!;
                    } else {
                        arrayOfMessages = (await currentChannel.messages.fetch({ limit: 100, before: startingMessage!.id })).array();
                        startingMessage = arrayOfMessages[arrayOfMessages.length - 1]!;
                    }

                    x = arrayOfMessages.length;
                    if (arrayOfMessages !== undefined && x > 0) {
                        arrayOfMessageArrays.push(arrayOfMessages);
                        y += 1;
                    } else {
                        break;
                    }
                }
                let totalMessageCount = 0;
                for (let w = 0; w < arrayOfMessageArrays.length; w += 1) {
                    for (let z = 0; z < arrayOfMessageArrays[w]!.length; z += 1) {
                        if (arrayOfMessageArrays[w]![z]!.pinned === true
            || arrayOfMessageArrays[w]![z]!.deleted === true) {
                            arrayOfMessageArrays[w]!.splice(z, 1);
                        } else {
                            totalMessageCount += 1;
                        }
                    }
                }
                console.log(`Total of ${totalMessageCount} in channel: ${currentChannel.name}`);
                if (arrayOfMessageArrays[0] === undefined || arrayOfMessageArrays[0].length === 0) {
                    guildData.deletionChannels[channelIndex]!.currentlyBeingDeleted = false;
                    await guildData.writeToDataBase();
                    return;
                }
                for (let w = arrayOfMessageArrays.length - 1; w >= 0; w -= 1) {
                    for (let z = arrayOfMessageArrays[w]!.length - 1; z >= 0; z -= 1) {
                        await guildData.getFromDataBase();
                        if (guildData.deletionChannels![channelIndex]!.currentlyBeingDeleted === false) {
                            return;
                        }
                        if (!arrayOfMessageArrays[w]![z]!.pinned) {
                            deleteMessage(arrayOfMessageArrays![w]![z]!, totalMessageCount - (w * 100 + z), totalMessageCount, currentChannel.name);
                        }
                    }
                }
            }
            guildData.deletionChannels[channelIndex]!.currentlyBeingDeleted = false;
            await guildData.writeToDataBase();
            return;
        } catch (error) {
            guildData.deletionChannels[channelIndex]!.currentlyBeingDeleted = false;
            await guildData.writeToDataBase();
            return new Promise((resolve, reject) => {
                reject(error);
            });
        }
    }

    /**
    * Purges the actively-being-purged text channels, if enough time has passed.
    */
    export function purgeMessageChannels(client: Discord.Client, discordUser: DiscordUser): void {
        try {
            GuildData.guildsData.forEach(async (guild: GuildData) => {
                if (guild.deletionChannels.length > 0) {
                    for (let y = 0; y < guild.deletionChannels.length; y += 1) {
                        try{
                            await guild.getFromDataBase();
                            await deleteMessages(client, guild, y, discordUser);
                        }
                        catch(error) {
                            console.log(error);
                        }
                    }
                }
            });
            return;
        } catch (error) {
            throw error;
        }
    }

    /**
    * Sends out the timed messages within each server, if enough time has passed.
    */
    export async function sendTimedMessagesIfTimeHasPassed(client: Discord.Client, discordUser: DiscordUser): Promise<void> {
        try {
            GuildData.guildsData.forEach(async guildData => {
                for (let y = 0; y < guildData.timedMessages.length; y += 1) {
                    const currentTime = new Date().getTime();
                    if ((currentTime - guildData.timedMessages[y]!.timeOfLastSend)
                        > guildData.timedMessages[y]!.msBetweenSends) {
                        const guild = client.guilds.resolve(guildData.id);
                        let textChannel = new Discord.TextChannel(guild!, {});
                        textChannel = await client.channels.fetch(guildData.timedMessages[y]!.textChannelID) as Discord.TextChannel;
                        await textChannel.send(guildData.timedMessages[y]!.messageContent);
                        guildData.timedMessages[y]!.timeOfLastSend = new Date().getTime();
                        await guildData.writeToDataBase();
                        break;
                    } else {
                        const timeDifference = currentTime - guildData.timedMessages[y]!.timeOfLastSend;
                        const timeRemaining = guildData.timedMessages[y]!.msBetweenSends - timeDifference;
                        console.log(`${guildData.timedMessages[y]!.name} has ${timeRemaining}ms left until it can be sent!`);
                    }
                }
            });
            return;
        } catch (error) {
            return new Promise((resolve, reject) => {
                reject(error);
            });
        }
    }
}
export default HelperFunctions;
