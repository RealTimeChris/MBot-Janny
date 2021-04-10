// HelperFunctions.ts - Module for my "helper functions".
// Apr 4, 2021
// Chris M.
// https://github.com/RealTimeChris
'use strict';
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Discord = __importStar(require("discord.js"));
const GuildData_1 = __importDefault(require("./GuildData"));
var HelperFunctions;
(function (HelperFunctions) {
    /**
    * Function for sending out a message, using the appropriate channel.
    */
    function sendMessageWithCorrectChannel(commandData, messageContents, atUserID = null) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let returnMessage;
                if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                    if (atUserID !== null && messageContents instanceof Discord.MessageEmbed) {
                        const msgEmbeds = [];
                        msgEmbeds.push(messageContents);
                        returnMessage = yield commandData.toTextChannel.send(`<@!${atUserID}>`, { embeds: msgEmbeds, split: false });
                    }
                    else if (atUserID === null) {
                        returnMessage = yield commandData.toTextChannel.send(messageContents);
                    }
                    else {
                        returnMessage = yield commandData.toTextChannel.send(`<@!${atUserID}> ${messageContents}`);
                    }
                }
                else if (commandData.toTextChannel instanceof Discord.TextChannel) {
                    if (atUserID !== null && messageContents instanceof Discord.MessageEmbed) {
                        returnMessage = yield commandData.toTextChannel.send(`<@!${atUserID}>`, { embed: messageContents });
                    }
                    else if (atUserID === null) {
                        returnMessage = yield commandData.toTextChannel.send(messageContents);
                    }
                    else {
                        returnMessage = yield commandData.toTextChannel.send(`<@!${atUserID}> ${messageContents}`);
                    }
                }
                else if (commandData.toTextChannel instanceof Discord.DMChannel) {
                    returnMessage = yield commandData.toTextChannel.send(messageContents);
                }
                return returnMessage;
            }
            catch (error) {
                return new Promise((resolve, reject) => {
                    reject(error);
                });
            }
        });
    }
    HelperFunctions.sendMessageWithCorrectChannel = sendMessageWithCorrectChannel;
    /**
     * Recurses through a succession of messages.
     */
    function recurseThroughMessagePages(userID, message, currentPageIndex, messageEmbeds, deleteAfter) {
        return __awaiter(this, void 0, void 0, function* () {
            let newCurrentPageIndex = currentPageIndex;
            try {
                message.react('◀️');
                message.react('▶️');
                message.react('❌');
                const filter = (reaction, user) => (reaction.emoji.name === '◀️' || reaction.emoji.name === '▶️' || reaction.emoji.name === '❌') && user.id === userID;
                const reactionCollector = message.createReactionCollector(filter, { time: 120000 });
                reactionCollector.on('collect', (reaction) => __awaiter(this, void 0, void 0, function* () {
                    reactionCollector.resetTimer({ time: 120000 });
                    if (reaction.emoji.name === '❌') {
                        reactionCollector.stop('User exited.');
                    }
                    else if (reaction.emoji.name === '▶️' && (newCurrentPageIndex === (messageEmbeds.length - 1))) {
                        reaction.users.remove(userID);
                        newCurrentPageIndex = 0;
                        const messageEmbed = messageEmbeds[newCurrentPageIndex];
                        yield message.edit(messageEmbed);
                    }
                    else if (reaction.emoji.name === '▶️' && (newCurrentPageIndex < messageEmbeds.length)) {
                        reaction.users.remove(userID);
                        newCurrentPageIndex += 1;
                        const messageEmbed = messageEmbeds[newCurrentPageIndex];
                        yield message.edit(messageEmbed);
                    }
                    else if (reaction.emoji.name === '◀️' && (newCurrentPageIndex > 0)) {
                        reaction.users.remove(userID);
                        newCurrentPageIndex -= 1;
                        const messageEmbed = messageEmbeds[newCurrentPageIndex];
                        yield message.edit(messageEmbed);
                    }
                    else if (reaction.emoji.name === '◀️' && (newCurrentPageIndex === 0)) {
                        reaction.users.remove(userID);
                        newCurrentPageIndex = messageEmbeds.length - 1;
                        const messageEmbed = messageEmbeds[newCurrentPageIndex];
                        yield message.edit(messageEmbed);
                    }
                }));
                reactionCollector.on('end', () => __awaiter(this, void 0, void 0, function* () {
                    if (deleteAfter === true) {
                        if (message.deletable) {
                            yield message.delete();
                        }
                        yield message.delete();
                    }
                    else {
                        yield message.reactions.removeAll();
                    }
                }));
                return;
            }
            catch (error) {
                return new Promise((resolve, reject) => {
                    reject(error);
                });
            }
        });
    }
    HelperFunctions.recurseThroughMessagePages = recurseThroughMessagePages;
    /**
     * Checks a user ID against an array of user IDs to see if it is present.
     */
    function checkForBotCommanderStatus(userID, commanderIDs) {
        return __awaiter(this, void 0, void 0, function* () {
            let isCommander = false;
            for (let x = 0; x < commanderIDs.length; x += 1) {
                if (userID === commanderIDs[x]) {
                    isCommander = true;
                    break;
                }
            }
            return isCommander;
        });
    }
    HelperFunctions.checkForBotCommanderStatus = checkForBotCommanderStatus;
    /**
     * Checks to see if we're in a DM channel, and sends a warning message if so.
     */
    function areWeInADM(commandData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const currentChannelType = commandData.fromTextChannelType;
                if (currentChannelType === 'dm') {
                    const msgString = `------\n**Sorry, but we can't do that in a direct message!**\n------`;
                    const msgEmbed = new Discord.MessageEmbed();
                    msgEmbed
                        .setAuthor(commandData.guildMember.username, commandData.guildMember.avatarURL())
                        .setColor([254, 254, 254])
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Direct Message Issue:**__');
                    let msg = yield sendMessageWithCorrectChannel(commandData, msgEmbed);
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guildMember.client, msg, commandData.fromTextChannel);
                    }
                    yield msg.delete({ timeout: 20000 });
                    return true;
                }
                return false;
            }
            catch (error) {
                return new Promise((resolve, reject) => {
                    reject(error);
                });
            }
        });
    }
    HelperFunctions.areWeInADM = areWeInADM;
    /**
     * Checks if we have admin permissions in the current channel.
     */
    function doWeHaveAdminPermission(commandData, discordUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const guildData = new GuildData_1.default({ dataBase: discordUser.dataBase, id: commandData.guild.id, name: commandData.guild.name, memberCount: commandData.guild.memberCount });
                yield guildData.getFromDataBase();
                const currentChannelPermissions = commandData.guildMember.permissionsIn(commandData.permsChannel);
                const permissionStrings = 'ADMINISTRATOR';
                const areTheyAnAdmin = currentChannelPermissions.has(permissionStrings);
                const areTheyACommander = yield checkForBotCommanderStatus(commandData.guildMember.id, discordUser.userData.botCommanders);
                if (areTheyAnAdmin === true || areTheyACommander === true) {
                    return true;
                }
                const msgString = `------\n**Sorry, but you don't have the permissions required for that!**\n------`;
                const msgEmbed = new Discord.MessageEmbed();
                msgEmbed
                    .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                    .setColor(guildData.borderColor)
                    .setDescription(msgString)
                    .setTimestamp(Date())
                    .setTitle("__**Permissions Issue:**__");
                let msg = yield sendMessageWithCorrectChannel(commandData, msgEmbed);
                if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                    msg = new Discord.Message(commandData.guildMember.client, msg, commandData.fromTextChannel);
                }
                yield msg.delete({ timeout: 20000 });
                return false;
            }
            catch (error) {
                return new Promise((resolve, reject) => {
                    reject(error);
                });
            }
        });
    }
    HelperFunctions.doWeHaveAdminPermission = doWeHaveAdminPermission;
    /**
    * Applies default roles to a new guild member.
    */
    function applyDefaultRoles(guildData, guildMember) {
        return __awaiter(this, void 0, void 0, function* () {
            let currentIndex = 0;
            try {
                if (guildData.verificationSystem.channelID === null) {
                    const guildMemberRoleManager = new Discord.GuildMemberRoleManager(guildMember);
                    for (let x = 0; x < guildData.defaultRoleIDs.length; x += 1) {
                        currentIndex = x;
                        yield guildMemberRoleManager.add(guildData.defaultRoleIDs[x]);
                    }
                }
                return;
            }
            catch (error) {
                guildData.defaultRoleIDs.splice(currentIndex, 1);
                applyDefaultRoles(guildData, guildMember);
                return new Promise((resolve, reject) => {
                    reject(error);
                });
            }
        });
    }
    HelperFunctions.applyDefaultRoles = applyDefaultRoles;
    /**
    * Takes a server record and a live guild object and either updates or adds it to the records.
    */
    function recurseThroughServerRecords(dataBase, liveGuildArray, keyNames, y = 0) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (keyNames.length === 0) {
                    return new Promise((resolve, reject) => {
                        resolve();
                    });
                }
                let yNew = y;
                const fileObject = yield dataBase.get(keyNames[0]);
                keyNames.splice(0, 1);
                fileObject.serverName = (_a = liveGuildArray[y]) === null || _a === void 0 ? void 0 : _a.name;
                fileObject.serverID = (_b = liveGuildArray[y]) === null || _b === void 0 ? void 0 : _b.id;
                console.log(`Updating Server Record Info For Server #${y}: ${fileObject.serverName}`);
                const guildMembersCollection = yield liveGuildArray[y].members.fetch();
                const membersArray = guildMembersCollection.array().sort();
                for (let z = 0; z < membersArray.length; z += 1) {
                    let areTheyFoundInFile = false;
                    for (let w = 0; w < fileObject.userRecords.length; w += 1) {
                        if (membersArray[z].id === fileObject.userRecords[w].userID) {
                            areTheyFoundInFile = true;
                            fileObject.userRecords[w].userID = membersArray[z].user.id;
                            fileObject.userRecords[w].lastKnownUserTag = membersArray[z].user.tag;
                            fileObject.userRecords[w].lastKnownUsername = membersArray[z].user.username;
                        }
                    }
                    if (areTheyFoundInFile === false) {
                        const userRecord = {
                            lastKnownUserTag: membersArray[z].user.tag,
                            lastKnownUsername: membersArray[z].user.username,
                            userID: membersArray[z].id,
                        };
                        fileObject.userRecords.push(userRecord);
                        console.log(`Adding New User Record: ${userRecord.lastKnownUserTag} of server: ${fileObject.serverName}`);
                    }
                }
                const serverRecordKey = `${liveGuildArray[y].id} + Record`;
                dataBase.put(serverRecordKey, fileObject);
                yNew += 1;
                yield recurseThroughServerRecords(dataBase, liveGuildArray, keyNames, yNew);
                return;
            }
            catch (error) {
                if (error.type === 'NotFoundError') {
                    const serverRecord = {
                        serverName: liveGuildArray[y].name,
                        serverID: liveGuildArray[y].id,
                        replacementServerInvite: '',
                        userRecords: []
                    };
                    console.log(`Adding New Server Record: ${serverRecord.serverName}`);
                    const guildMembersCollection = yield liveGuildArray[y].members.fetch();
                    const membersArray = guildMembersCollection.array().sort();
                    for (let z = 0; z < membersArray.length; z += 1) {
                        const userRecord = {
                            lastKnownUsername: membersArray[z].user.username,
                            lastKnownUserTag: membersArray[z].user.tag,
                            userID: membersArray[z].id
                        };
                        serverRecord.userRecords.push(userRecord);
                        console.log(`Adding New User Record: ${userRecord.lastKnownUserTag} of server: ${serverRecord.serverName}`);
                    }
                    const serverRecordKey = `${liveGuildArray[y].id} + Record`;
                    yield dataBase.put(serverRecordKey, serverRecord);
                    yield recurseThroughServerRecords(dataBase, liveGuildArray, keyNames, y);
                    return;
                }
                return new Promise((resolve, reject) => {
                    reject(error);
                });
            }
        });
    }
    HelperFunctions.recurseThroughServerRecords = recurseThroughServerRecords;
    /**
    * Caches messages for each of the guilds that have an active "verification" system.
    */
    function cacheMessagesForVerification(client, discordUser) {
        return __awaiter(this, void 0, void 0, function* () {
            GuildData_1.default.guildsData.forEach((guildData) => __awaiter(this, void 0, void 0, function* () {
                try {
                    if (guildData.verificationSystem.channelID != '') {
                        const currentGuild = yield client.guilds.fetch(guildData.id);
                        const currentChannel = currentGuild.channels.resolve(guildData.verificationSystem.channelID);
                        if (currentChannel === null) {
                            console.log('null Channel! Purging from the values! For Guild: ' + guildData.guildName);
                            guildData.verificationSystem.channelID = '';
                            guildData.verificationSystem.messageID = '';
                            guildData.verificationSystem.emoji = '';
                            yield guildData.writeToDataBase();
                            return;
                        }
                        const msgManager = new Discord.MessageManager(currentChannel);
                        const oldVerificationMessage = yield msgManager.fetch(guildData.verificationSystem.messageID);
                        const newMsgEmbed = oldVerificationMessage.embeds[0];
                        const newVerificationMessage = yield currentChannel.send(newMsgEmbed);
                        guildData.verificationSystem.messageID = newVerificationMessage.id;
                        yield guildData.writeToDataBase();
                        yield newVerificationMessage.react((oldVerificationMessage.reactions.cache.first()).emoji.name);
                        yield oldVerificationMessage.delete();
                        return;
                    }
                    return discordUser.userData.userID;
                }
                catch (error) {
                    console.log('Looks like the channel or the message no longer exists! Purging the verification system values!');
                    guildData.verificationSystem.channelID = '';
                    guildData.verificationSystem.messageID = '';
                    guildData.verificationSystem.emoji = '';
                    yield guildData.writeToDataBase();
                    return new Promise((resolve, reject) => {
                        reject(error);
                    });
                }
            }));
        });
    }
    HelperFunctions.cacheMessagesForVerification = cacheMessagesForVerification;
    /**
    * Updates and saves the Discord record, which contains user information.
    */
    function updateAndSaveDiscordRecord(client, discordUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const liveGuildArray = client.guilds.cache.array();
                const keyNames = [];
                for (let x = 0; x < liveGuildArray.length; x += 1) {
                    const keyname = `${liveGuildArray[x].id} + Record`;
                    keyNames.push(keyname);
                }
                yield recurseThroughServerRecords(discordUser.dataBase, liveGuildArray, keyNames);
                return;
            }
            catch (error) {
                return new Promise((resolve, reject) => {
                    reject(error);
                });
            }
        });
    }
    HelperFunctions.updateAndSaveDiscordRecord = updateAndSaveDiscordRecord;
    /**
    * Sends out an invite to a user from a selected list of users,
    * if the server has been nuked/deleted.
    */
    function sendInviteIfGuildIsActive(client, discordUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (discordUser.userData.activeInviteGuilds.length === 0) {
                    return new Promise((resolve, reject) => {
                        resolve();
                    });
                }
                for (let x = 0; x < discordUser.userData.activeInviteGuilds.length; x += 1) {
                    let fileKey = '';
                    fileKey = `${discordUser.userData.activeInviteGuilds[x]} + Record`;
                    let currentFileObject;
                    try {
                        currentFileObject = yield discordUser.dataBase.get(fileKey);
                    }
                    catch (error) {
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
                    const { userID } = currentFileObject.userRecords[0];
                    const guildName = currentFileObject.serverName;
                    const inviteLink = currentFileObject.replacementServerInvite;
                    const inviteString = `Hello, it is my understanding that you were a member of ${guildName}.\nIf you would like to continue along with us, then please go ahead and join the new server! Enjoy!\n${inviteLink}`;
                    const currentUser = client.users.resolve(userID);
                    let wereTheyAvailable = false;
                    try {
                        const dmChannel = yield currentUser.createDM();
                        yield dmChannel.send(inviteString);
                        wereTheyAvailable = true;
                    }
                    catch (error) {
                        console.log(`Sorry, but the user ${currentFileObject.userRecords[0].lastKnownUsername} could not be found!`);
                    }
                    if (wereTheyAvailable === true) {
                        const savedUser = {
                            userID: currentFileObject.userRecords[0].userID,
                            lastKnownUserTag: currentFileObject.userRecords[0].lastKnownUserTag,
                            lastKnownUsername: currentFileObject.userRecords[0].lastKnownUsername
                        };
                        currentFileObject.userRecords.splice(0, 1);
                        if (currentFileObject.userRecords.length === 0) {
                            discordUser.dataBase.del(fileKey);
                        }
                        else {
                            yield discordUser.dataBase.put(fileKey, currentFileObject);
                        }
                        const availableFileKey = `${fileKey} + Available`;
                        let availableFileString = '';
                        try {
                            const availableFileObject = yield discordUser.dataBase.get(availableFileKey);
                            availableFileObject.userRecords.push(savedUser);
                            availableFileString = JSON.stringify(availableFileObject);
                            yield discordUser.dataBase.put(availableFileKey, availableFileString);
                        }
                        catch (error) {
                            const serverRecord = {
                                replacementServerInvite: currentFileObject.replacementServerInvite,
                                serverID: currentFileObject.serverID,
                                serverName: currentFileObject.serverName,
                                userRecords: []
                            };
                            serverRecord.userRecords.push(savedUser);
                            availableFileString = JSON.stringify(serverRecord);
                            yield discordUser.dataBase.put(availableFileKey, availableFileString);
                            return;
                        }
                    }
                    else {
                        const deletedUser = {
                            userID: currentFileObject.userRecords[0].userID,
                            lastKnownUsername: currentFileObject.userRecords[0].lastKnownUsername,
                            lastKnownUserTag: currentFileObject.userRecords[0].lastKnownUserTag
                        };
                        currentFileObject.userRecords.splice(0, 1);
                        if (currentFileObject.userRecords.length === 0) {
                            discordUser.dataBase.del(fileKey);
                        }
                        else {
                            yield discordUser.dataBase.put(fileKey, currentFileObject);
                        }
                        const notAvailableFileKey = `${fileKey} +  NotAvailable`;
                        try {
                            const notAvailableFileObject = yield discordUser.dataBase.get(notAvailableFileKey);
                            notAvailableFileObject.userRecords.push(deletedUser);
                            yield discordUser.dataBase.put(notAvailableFileKey, notAvailableFileObject);
                        }
                        catch (error) {
                            const serverRecord = {
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
            }
            catch (error) {
                return new Promise((resolve, reject) => {
                    reject(error);
                });
            }
        });
    }
    HelperFunctions.sendInviteIfGuildIsActive = sendInviteIfGuildIsActive;
    function deleteMessage(message, messageNumber, messageCount, channelName) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`Deleting message number ${messageNumber} of ${messageCount}, in channel ${channelName}.`);
            yield message.delete();
        });
    }
    ;
    /**
    * Purges all of the selected messages within the given channels,
    * of each of the instance's guilds.
    */
    function deleteMessages(client, guildData, channelIndex, discordUser) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const numberOfMessagesToSave = (_a = guildData.deletionChannels[channelIndex]) === null || _a === void 0 ? void 0 : _a.numberOfMessagesToSave;
                const channelID = (_b = guildData.deletionChannels[channelIndex]) === null || _b === void 0 ? void 0 : _b.channelID;
                const currentChannel = client.channels.resolve(channelID);
                if (currentChannel === null) {
                    guildData.deletionChannels.splice(channelIndex, 1);
                    console.log('Removing an "unknown channel" from list of deletion channels!');
                    yield guildData.writeToDataBase();
                    return;
                }
                yield guildData.getFromDataBase();
                if (guildData.deletionChannels[channelIndex].currentlyBeingDeleted === true) {
                    console.log(`Nope! Still being deleted! Channel: ${currentChannel.name}`);
                    return;
                }
                console.log(`Checking for messages to delete in channel: ${currentChannel.name}`);
                guildData.deletionChannels[channelIndex].currentlyBeingDeleted = true;
                yield guildData.writeToDataBase();
                if (numberOfMessagesToSave > 0) {
                    let startingMessage = undefined;
                    for (let x = (Math.trunc(numberOfMessagesToSave / 100)); x >= 0; x -= 1) {
                        let currentMessageLimit = 0;
                        if (x > 0) {
                            currentMessageLimit = 100;
                            if (x === (Math.trunc(numberOfMessagesToSave / 100))) {
                                const arrayOfMessagesToSave = (yield currentChannel.messages.fetch({ limit: currentMessageLimit })).array();
                                if (arrayOfMessagesToSave.length === 0) {
                                    break;
                                }
                                startingMessage = arrayOfMessagesToSave[arrayOfMessagesToSave.length - 1];
                            }
                            else {
                                const arrayOfMessagesToSave = (yield currentChannel.messages.fetch({ limit: currentMessageLimit, before: startingMessage.id })).array();
                                if (arrayOfMessagesToSave.length === 0) {
                                    break;
                                }
                                startingMessage = arrayOfMessagesToSave[arrayOfMessagesToSave.length - 1];
                            }
                        }
                        else {
                            currentMessageLimit = (numberOfMessagesToSave % 100) + 1;
                            if (x === (Math.trunc(numberOfMessagesToSave / 100))) {
                                const arrayOfMessagesToSave = (yield currentChannel.messages.fetch({ limit: currentMessageLimit })).array();
                                arrayOfMessagesToSave.splice(arrayOfMessagesToSave.length - 1, 1);
                                if (arrayOfMessagesToSave.length === 0) {
                                    break;
                                }
                                startingMessage = arrayOfMessagesToSave[arrayOfMessagesToSave.length - 1];
                            }
                            else {
                                const arrayOfMessagesToSave = (yield currentChannel.messages.fetch({ limit: currentMessageLimit, before: startingMessage.id })).array();
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
                            const arrayOfMessages = (yield currentChannel.messages
                                .fetch({ limit: 100, before: startingMessage.id })).array();
                            x = arrayOfMessages.length;
                            if (arrayOfMessages !== undefined && startingMessage !== undefined && x > 0) {
                                startingMessage = arrayOfMessages[arrayOfMessages.length - 1];
                                arrayOfMessageArrays.push(arrayOfMessages);
                            }
                            else {
                                break;
                            }
                        }
                        else {
                            const arrayOfMessages = (yield currentChannel.messages
                                .fetch({ limit: 100 })).array();
                            x = arrayOfMessages.length;
                            if (arrayOfMessages !== undefined && x > 0) {
                                startingMessage = arrayOfMessages[arrayOfMessages.length - 1];
                                arrayOfMessageArrays.push(arrayOfMessages);
                            }
                            else {
                                break;
                            }
                        }
                    }
                    let totalMessageCount = 0;
                    for (let y = 0; y < arrayOfMessageArrays.length; y += 1) {
                        for (let z = 0; z < arrayOfMessageArrays[y].length; z += 1) {
                            if (arrayOfMessageArrays[y][z].pinned === true
                                || arrayOfMessageArrays[y][z].deleted === true) {
                                arrayOfMessageArrays[y].splice(z, 1);
                            }
                            else {
                                totalMessageCount += 1;
                            }
                        }
                    }
                    console.log(`Total of ${totalMessageCount} in channel: ${currentChannel.name}`);
                    if (arrayOfMessageArrays[0] === undefined || arrayOfMessageArrays[0].length === 0) {
                        guildData.deletionChannels[channelIndex].currentlyBeingDeleted = false;
                        yield guildData.writeToDataBase();
                        return;
                    }
                    for (let y = arrayOfMessageArrays.length - 1; y >= 0; y -= 1) {
                        for (let z = arrayOfMessageArrays[y].length - 1; z >= 0; z -= 1) {
                            yield guildData.getFromDataBase();
                            if (guildData.deletionChannels[channelIndex].currentlyBeingDeleted === false) {
                                return;
                            }
                            if (!arrayOfMessageArrays[y][z].pinned) {
                                if ((_c = arrayOfMessageArrays[y][z]) === null || _c === void 0 ? void 0 : _c.deletable) {
                                    deleteMessage(arrayOfMessageArrays[y][z], totalMessageCount - (y * 100 + z), totalMessageCount, currentChannel.name);
                                }
                            }
                        }
                    }
                }
                else {
                    let x = 1;
                    let y = 0;
                    const arrayOfMessageArrays = [];
                    let startingMessage;
                    while (x !== 0) {
                        let arrayOfMessages;
                        if (y === 0) {
                            arrayOfMessages = (yield currentChannel.messages.fetch({ limit: 100 })).array();
                            startingMessage = arrayOfMessages[arrayOfMessages.length - 1];
                        }
                        else {
                            arrayOfMessages = (yield currentChannel.messages.fetch({ limit: 100, before: startingMessage.id })).array();
                            startingMessage = arrayOfMessages[arrayOfMessages.length - 1];
                        }
                        x = arrayOfMessages.length;
                        if (arrayOfMessages !== undefined && x > 0) {
                            arrayOfMessageArrays.push(arrayOfMessages);
                            y += 1;
                        }
                        else {
                            break;
                        }
                    }
                    let totalMessageCount = 0;
                    for (let w = 0; w < arrayOfMessageArrays.length; w += 1) {
                        for (let z = 0; z < arrayOfMessageArrays[w].length; z += 1) {
                            if (arrayOfMessageArrays[w][z].pinned === true
                                || arrayOfMessageArrays[w][z].deleted === true) {
                                arrayOfMessageArrays[w].splice(z, 1);
                            }
                            else {
                                totalMessageCount += 1;
                            }
                        }
                    }
                    console.log(`Total of ${totalMessageCount} in channel: ${currentChannel.name}`);
                    if (arrayOfMessageArrays[0] === undefined || arrayOfMessageArrays[0].length === 0) {
                        guildData.deletionChannels[channelIndex].currentlyBeingDeleted = false;
                        yield guildData.writeToDataBase();
                        return;
                    }
                    for (let w = arrayOfMessageArrays.length - 1; w >= 0; w -= 1) {
                        for (let z = arrayOfMessageArrays[w].length - 1; z >= 0; z -= 1) {
                            yield guildData.getFromDataBase();
                            if (guildData.deletionChannels[channelIndex].currentlyBeingDeleted === false) {
                                return;
                            }
                            if (!arrayOfMessageArrays[w][z].pinned) {
                                deleteMessage(arrayOfMessageArrays[w][z], totalMessageCount - (w * 100 + z), totalMessageCount, currentChannel.name);
                            }
                        }
                    }
                }
                guildData.deletionChannels[channelIndex].currentlyBeingDeleted = false;
                yield guildData.writeToDataBase();
                return;
            }
            catch (error) {
                guildData.deletionChannels[channelIndex].currentlyBeingDeleted = false;
                yield guildData.writeToDataBase();
                return new Promise((resolve, reject) => {
                    reject(error);
                });
            }
        });
    }
    HelperFunctions.deleteMessages = deleteMessages;
    /**
    * Purges the actively-being-purged text channels, if enough time has passed.
    */
    function purgeMessageChannels(client, discordUser) {
        try {
            GuildData_1.default.guildsData.forEach((guild) => __awaiter(this, void 0, void 0, function* () {
                if (guild.deletionChannels.length > 0) {
                    for (let y = 0; y < guild.deletionChannels.length; y += 1) {
                        try {
                            yield guild.getFromDataBase();
                            yield deleteMessages(client, guild, y, discordUser);
                        }
                        catch (error) {
                            console.log(error);
                        }
                    }
                }
            }));
            return;
        }
        catch (error) {
            throw error;
        }
    }
    HelperFunctions.purgeMessageChannels = purgeMessageChannels;
    /**
    * Sends out the timed messages within each server, if enough time has passed.
    */
    function sendTimedMessagesIfTimeHasPassed(client, discordUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                GuildData_1.default.guildsData.forEach((guildData) => __awaiter(this, void 0, void 0, function* () {
                    for (let y = 0; y < guildData.timedMessages.length; y += 1) {
                        const currentTime = new Date().getTime();
                        if ((currentTime - guildData.timedMessages[y].timeOfLastSend)
                            > guildData.timedMessages[y].msBetweenSends) {
                            const guild = client.guilds.resolve(guildData.id);
                            let textChannel = new Discord.TextChannel(guild, {});
                            textChannel = (yield client.channels.fetch(guildData.timedMessages[y].textChannelID));
                            yield textChannel.send(guildData.timedMessages[y].messageContent);
                            guildData.timedMessages[y].timeOfLastSend = new Date().getTime();
                            yield guildData.writeToDataBase();
                            break;
                        }
                        else {
                            const timeDifference = currentTime - guildData.timedMessages[y].timeOfLastSend;
                            const timeRemaining = guildData.timedMessages[y].msBetweenSends - timeDifference;
                            console.log(`${guildData.timedMessages[y].name} has ${timeRemaining}ms left until it can be sent!`);
                        }
                    }
                }));
                return;
            }
            catch (error) {
                return new Promise((resolve, reject) => {
                    reject(error);
                });
            }
        });
    }
    HelperFunctions.sendTimedMessagesIfTimeHasPassed = sendTimedMessagesIfTimeHasPassed;
})(HelperFunctions || (HelperFunctions = {}));
exports.default = HelperFunctions;
