// HelperFunctions.ts - Module for my "helper functions".
// Apr 4, 2021
// Chris M.
// https://github.com/RealTimeChris
'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Discord = require("discord.js");
var GuildData_1 = __importDefault(require("./GuildData"));
var HelperFunctions;
(function (HelperFunctions) {
    /**
    * Function for sending out a message, using the appropriate channel.
    */
    function sendMessageWithCorrectChannel(commandData, messageContents, atUserID) {
        if (atUserID === void 0) { atUserID = null; }
        return __awaiter(this, void 0, void 0, function () {
            var returnMessage, msgEmbeds, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 17, , 18]);
                        returnMessage = void 0;
                        if (!(commandData.toTextChannel instanceof Discord.WebhookClient)) return [3 /*break*/, 7];
                        if (!(atUserID !== null && messageContents instanceof Discord.MessageEmbed)) return [3 /*break*/, 2];
                        msgEmbeds = [];
                        msgEmbeds.push(messageContents);
                        return [4 /*yield*/, commandData.toTextChannel.send("<@!" + atUserID + ">", { embeds: msgEmbeds, split: false })];
                    case 1:
                        returnMessage = _a.sent();
                        return [3 /*break*/, 6];
                    case 2:
                        if (!(atUserID === null)) return [3 /*break*/, 4];
                        return [4 /*yield*/, commandData.toTextChannel.send(messageContents)];
                    case 3:
                        returnMessage = _a.sent();
                        return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, commandData.toTextChannel.send("<@!" + atUserID + "> " + messageContents)];
                    case 5:
                        returnMessage = _a.sent();
                        _a.label = 6;
                    case 6: return [3 /*break*/, 16];
                    case 7:
                        if (!(commandData.toTextChannel instanceof Discord.TextChannel)) return [3 /*break*/, 14];
                        if (!(atUserID !== null && messageContents instanceof Discord.MessageEmbed)) return [3 /*break*/, 9];
                        return [4 /*yield*/, commandData.toTextChannel.send("<@!" + atUserID + ">", { embed: messageContents })];
                    case 8:
                        returnMessage = _a.sent();
                        return [3 /*break*/, 13];
                    case 9:
                        if (!(atUserID === null)) return [3 /*break*/, 11];
                        return [4 /*yield*/, commandData.toTextChannel.send(messageContents)];
                    case 10:
                        returnMessage = _a.sent();
                        return [3 /*break*/, 13];
                    case 11: return [4 /*yield*/, commandData.toTextChannel.send("<@!" + atUserID + "> " + messageContents)];
                    case 12:
                        returnMessage = _a.sent();
                        _a.label = 13;
                    case 13: return [3 /*break*/, 16];
                    case 14:
                        if (!(commandData.toTextChannel instanceof Discord.DMChannel)) return [3 /*break*/, 16];
                        return [4 /*yield*/, commandData.toTextChannel.send(messageContents)];
                    case 15:
                        returnMessage = _a.sent();
                        _a.label = 16;
                    case 16: return [2 /*return*/, returnMessage];
                    case 17:
                        error_1 = _a.sent();
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                reject(error_1);
                            })];
                    case 18: return [2 /*return*/];
                }
            });
        });
    }
    HelperFunctions.sendMessageWithCorrectChannel = sendMessageWithCorrectChannel;
    /**
     * Recurses through a succession of messages.
     */
    function recurseThroughMessagePages(userID, message, currentPageIndex, messageEmbeds, deleteAfter) {
        return __awaiter(this, void 0, void 0, function () {
            var newCurrentPageIndex, filter, reactionCollector_1;
            var _this = this;
            return __generator(this, function (_a) {
                newCurrentPageIndex = currentPageIndex;
                try {
                    message.react('◀️');
                    message.react('▶️');
                    message.react('❌');
                    filter = function (reaction, user) { return (reaction.emoji.name === '◀️' || reaction.emoji.name === '▶️' || reaction.emoji.name === '❌') && user.id === userID; };
                    reactionCollector_1 = message.createReactionCollector(filter, { time: 120000 });
                    reactionCollector_1.on('collect', function (reaction) { return __awaiter(_this, void 0, void 0, function () {
                        var messageEmbed, messageEmbed, messageEmbed, messageEmbed;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    reactionCollector_1.resetTimer({ time: 120000 });
                                    if (!(reaction.emoji.name === '❌')) return [3 /*break*/, 1];
                                    reactionCollector_1.stop('User exited.');
                                    return [3 /*break*/, 9];
                                case 1:
                                    if (!(reaction.emoji.name === '▶️' && (newCurrentPageIndex === (messageEmbeds.length - 1)))) return [3 /*break*/, 3];
                                    reaction.users.remove(userID);
                                    newCurrentPageIndex = 0;
                                    messageEmbed = messageEmbeds[newCurrentPageIndex];
                                    return [4 /*yield*/, message.edit(messageEmbed)];
                                case 2:
                                    _a.sent();
                                    return [3 /*break*/, 9];
                                case 3:
                                    if (!(reaction.emoji.name === '▶️' && (newCurrentPageIndex < messageEmbeds.length))) return [3 /*break*/, 5];
                                    reaction.users.remove(userID);
                                    newCurrentPageIndex += 1;
                                    messageEmbed = messageEmbeds[newCurrentPageIndex];
                                    return [4 /*yield*/, message.edit(messageEmbed)];
                                case 4:
                                    _a.sent();
                                    return [3 /*break*/, 9];
                                case 5:
                                    if (!(reaction.emoji.name === '◀️' && (newCurrentPageIndex > 0))) return [3 /*break*/, 7];
                                    reaction.users.remove(userID);
                                    newCurrentPageIndex -= 1;
                                    messageEmbed = messageEmbeds[newCurrentPageIndex];
                                    return [4 /*yield*/, message.edit(messageEmbed)];
                                case 6:
                                    _a.sent();
                                    return [3 /*break*/, 9];
                                case 7:
                                    if (!(reaction.emoji.name === '◀️' && (newCurrentPageIndex === 0))) return [3 /*break*/, 9];
                                    reaction.users.remove(userID);
                                    newCurrentPageIndex = messageEmbeds.length - 1;
                                    messageEmbed = messageEmbeds[newCurrentPageIndex];
                                    return [4 /*yield*/, message.edit(messageEmbed)];
                                case 8:
                                    _a.sent();
                                    _a.label = 9;
                                case 9: return [2 /*return*/];
                            }
                        });
                    }); });
                    reactionCollector_1.on('end', function () { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!(deleteAfter === true)) return [3 /*break*/, 4];
                                    if (!message.deletable) return [3 /*break*/, 2];
                                    return [4 /*yield*/, message.delete()];
                                case 1:
                                    _a.sent();
                                    _a.label = 2;
                                case 2: return [4 /*yield*/, message.delete()];
                                case 3:
                                    _a.sent();
                                    return [3 /*break*/, 6];
                                case 4: return [4 /*yield*/, message.reactions.removeAll()];
                                case 5:
                                    _a.sent();
                                    _a.label = 6;
                                case 6: return [2 /*return*/];
                            }
                        });
                    }); });
                    return [2 /*return*/];
                }
                catch (error) {
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            reject(error);
                        })];
                }
                return [2 /*return*/];
            });
        });
    }
    HelperFunctions.recurseThroughMessagePages = recurseThroughMessagePages;
    /**
     * Checks a user ID against an array of user IDs to see if it is present.
     */
    function checkForBotCommanderStatus(userID, commanderIDs) {
        return __awaiter(this, void 0, void 0, function () {
            var isCommander, x;
            return __generator(this, function (_a) {
                isCommander = false;
                for (x = 0; x < commanderIDs.length; x += 1) {
                    if (userID === commanderIDs[x]) {
                        isCommander = true;
                        break;
                    }
                }
                return [2 /*return*/, isCommander];
            });
        });
    }
    HelperFunctions.checkForBotCommanderStatus = checkForBotCommanderStatus;
    /**
     * Checks to see if we're in a DM channel, and sends a warning message if so.
     */
    function areWeInADM(commandData) {
        return __awaiter(this, void 0, void 0, function () {
            var currentChannelType, msgString, msgEmbed, msg, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        currentChannelType = commandData.fromTextChannelType;
                        if (!(currentChannelType === 'dm')) return [3 /*break*/, 3];
                        msgString = "------\n**Sorry, but we can't do that in a direct message!**\n------";
                        msgEmbed = new Discord.MessageEmbed();
                        msgEmbed
                            .setAuthor(commandData.guildMember.username, commandData.guildMember.avatarURL())
                            .setColor([254, 254, 254])
                            .setDescription(msgString)
                            .setTimestamp(Date())
                            .setTitle('__**Direct Message Issue:**__');
                        return [4 /*yield*/, sendMessageWithCorrectChannel(commandData, msgEmbed)];
                    case 1:
                        msg = _a.sent();
                        if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                            msg = new Discord.Message(commandData.guildMember.client, msg, commandData.fromTextChannel);
                        }
                        return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, true];
                    case 3: return [2 /*return*/, false];
                    case 4:
                        error_2 = _a.sent();
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                reject(error_2);
                            })];
                    case 5: return [2 /*return*/];
                }
            });
        });
    }
    HelperFunctions.areWeInADM = areWeInADM;
    /**
     * Checks if we have admin permissions in the current channel.
     */
    function doWeHaveAdminPermission(commandData, discordUser) {
        return __awaiter(this, void 0, void 0, function () {
            var guildData, currentChannelPermissions, permissionStrings, areTheyAnAdmin, areTheyACommander, msgString, msgEmbed, msg, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        guildData = new GuildData_1.default({ dataBase: discordUser.dataBase, id: commandData.guild.id, name: commandData.guild.name, memberCount: commandData.guild.memberCount });
                        return [4 /*yield*/, guildData.getFromDataBase()];
                    case 1:
                        _a.sent();
                        currentChannelPermissions = commandData.guildMember.permissionsIn(commandData.permsChannel);
                        permissionStrings = 'ADMINISTRATOR';
                        areTheyAnAdmin = currentChannelPermissions.has(permissionStrings);
                        return [4 /*yield*/, checkForBotCommanderStatus(commandData.guildMember.id, discordUser.userData.botCommanders)];
                    case 2:
                        areTheyACommander = _a.sent();
                        if (areTheyAnAdmin === true || areTheyACommander === true) {
                            return [2 /*return*/, true];
                        }
                        msgString = "------\n**Sorry, but you don't have the permissions required for that!**\n------";
                        msgEmbed = new Discord.MessageEmbed();
                        msgEmbed
                            .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                            .setColor(guildData.borderColor)
                            .setDescription(msgString)
                            .setTimestamp(Date())
                            .setTitle("__**Permissions Issue:**__");
                        return [4 /*yield*/, sendMessageWithCorrectChannel(commandData, msgEmbed)];
                    case 3:
                        msg = _a.sent();
                        if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                            msg = new Discord.Message(commandData.guildMember.client, msg, commandData.fromTextChannel);
                        }
                        return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                    case 4:
                        _a.sent();
                        return [2 /*return*/, false];
                    case 5:
                        error_3 = _a.sent();
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                reject(error_3);
                            })];
                    case 6: return [2 /*return*/];
                }
            });
        });
    }
    HelperFunctions.doWeHaveAdminPermission = doWeHaveAdminPermission;
    /**
    * Applies default roles to a new guild member.
    */
    function applyDefaultRoles(guildData, guildMember) {
        return __awaiter(this, void 0, void 0, function () {
            var currentIndex, guildMemberRoleManager, x, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        currentIndex = 0;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        if (!(guildData.verificationSystem.channelID === null || guildData.verificationSystem.channelID === "")) return [3 /*break*/, 5];
                        guildMemberRoleManager = new Discord.GuildMemberRoleManager(guildMember);
                        x = 0;
                        _a.label = 2;
                    case 2:
                        if (!(x < guildData.defaultRoleIDs.length)) return [3 /*break*/, 5];
                        currentIndex = x;
                        return [4 /*yield*/, guildMemberRoleManager.add(guildData.defaultRoleIDs[x])];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        x += 1;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/];
                    case 6:
                        error_4 = _a.sent();
                        guildData.defaultRoleIDs.splice(currentIndex, 1);
                        applyDefaultRoles(guildData, guildMember);
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                reject(error_4);
                            })];
                    case 7: return [2 /*return*/];
                }
            });
        });
    }
    HelperFunctions.applyDefaultRoles = applyDefaultRoles;
    /**
    * Takes a server record and a live guild object and either updates or adds it to the records.
    */
    function recurseThroughServerRecords(dataBase, liveGuildArray, keyNames, y) {
        var _a, _b;
        if (y === void 0) { y = 0; }
        return __awaiter(this, void 0, void 0, function () {
            var yNew, fileObject, guildMembersCollection, membersArray, z, areTheyFoundInFile, w, userRecord, serverRecordKey, error_5, serverRecord, guildMembersCollection, membersArray, z, userRecord, serverRecordKey;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 4, , 9]);
                        if (keyNames.length === 0) {
                            return [2 /*return*/, new Promise(function (resolve, reject) {
                                    resolve();
                                })];
                        }
                        yNew = y;
                        return [4 /*yield*/, dataBase.get(keyNames[0])];
                    case 1:
                        fileObject = _c.sent();
                        keyNames.splice(0, 1);
                        fileObject.serverName = (_a = liveGuildArray[y]) === null || _a === void 0 ? void 0 : _a.name;
                        fileObject.serverID = (_b = liveGuildArray[y]) === null || _b === void 0 ? void 0 : _b.id;
                        console.log("Updating Server Record Info For Server #" + y + ": " + fileObject.serverName);
                        return [4 /*yield*/, liveGuildArray[y].members.fetch()];
                    case 2:
                        guildMembersCollection = _c.sent();
                        membersArray = guildMembersCollection.array().sort();
                        for (z = 0; z < membersArray.length; z += 1) {
                            areTheyFoundInFile = false;
                            for (w = 0; w < fileObject.userRecords.length; w += 1) {
                                if (membersArray[z].id === fileObject.userRecords[w].userID) {
                                    areTheyFoundInFile = true;
                                    fileObject.userRecords[w].userID = membersArray[z].user.id;
                                    fileObject.userRecords[w].lastKnownUserTag = membersArray[z].user.tag;
                                    fileObject.userRecords[w].lastKnownUsername = membersArray[z].user.username;
                                }
                            }
                            if (areTheyFoundInFile === false) {
                                userRecord = {
                                    lastKnownUserTag: membersArray[z].user.tag,
                                    lastKnownUsername: membersArray[z].user.username,
                                    userID: membersArray[z].id,
                                };
                                fileObject.userRecords.push(userRecord);
                                console.log("Adding New User Record: " + userRecord.lastKnownUserTag + " of server: " + fileObject.serverName);
                            }
                        }
                        serverRecordKey = liveGuildArray[y].id + " + Record";
                        dataBase.put(serverRecordKey, fileObject);
                        yNew += 1;
                        return [4 /*yield*/, recurseThroughServerRecords(dataBase, liveGuildArray, keyNames, yNew)];
                    case 3:
                        _c.sent();
                        return [2 /*return*/];
                    case 4:
                        error_5 = _c.sent();
                        if (!(error_5.type === 'NotFoundError')) return [3 /*break*/, 8];
                        serverRecord = {
                            serverName: liveGuildArray[y].name,
                            serverID: liveGuildArray[y].id,
                            replacementServerInvite: '',
                            userRecords: []
                        };
                        console.log("Adding New Server Record: " + serverRecord.serverName);
                        return [4 /*yield*/, liveGuildArray[y].members.fetch()];
                    case 5:
                        guildMembersCollection = _c.sent();
                        membersArray = guildMembersCollection.array().sort();
                        for (z = 0; z < membersArray.length; z += 1) {
                            userRecord = {
                                lastKnownUsername: membersArray[z].user.username,
                                lastKnownUserTag: membersArray[z].user.tag,
                                userID: membersArray[z].id
                            };
                            serverRecord.userRecords.push(userRecord);
                            console.log("Adding New User Record: " + userRecord.lastKnownUserTag + " of server: " + serverRecord.serverName);
                        }
                        serverRecordKey = liveGuildArray[y].id + " + Record";
                        return [4 /*yield*/, dataBase.put(serverRecordKey, serverRecord)];
                    case 6:
                        _c.sent();
                        return [4 /*yield*/, recurseThroughServerRecords(dataBase, liveGuildArray, keyNames, y)];
                    case 7:
                        _c.sent();
                        return [2 /*return*/];
                    case 8: return [2 /*return*/, new Promise(function (resolve, reject) {
                            reject(error_5);
                        })];
                    case 9: return [2 /*return*/];
                }
            });
        });
    }
    HelperFunctions.recurseThroughServerRecords = recurseThroughServerRecords;
    /**
    * Caches messages for each of the guilds that have an active "verification" system.
    */
    function cacheMessagesForVerification(client, discordUser) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                GuildData_1.default.guildsData.forEach(function (guildData) { return __awaiter(_this, void 0, void 0, function () {
                    var currentGuild, currentChannel, msgManager, oldVerificationMessage, newMsgEmbed, newVerificationMessage, error_6;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 10, , 12]);
                                if (!(guildData.verificationSystem.channelID != '')) return [3 /*break*/, 9];
                                return [4 /*yield*/, client.guilds.fetch(guildData.id)];
                            case 1:
                                currentGuild = _a.sent();
                                currentChannel = currentGuild.channels.resolve(guildData.verificationSystem.channelID);
                                if (!(currentChannel === null)) return [3 /*break*/, 3];
                                console.log('null Channel! Purging from the values! For Guild: ' + guildData.guildName);
                                guildData.verificationSystem.channelID = '';
                                guildData.verificationSystem.messageID = '';
                                guildData.verificationSystem.emoji = '';
                                return [4 /*yield*/, guildData.writeToDataBase()];
                            case 2:
                                _a.sent();
                                return [2 /*return*/];
                            case 3:
                                msgManager = new Discord.MessageManager(currentChannel);
                                return [4 /*yield*/, msgManager.fetch(guildData.verificationSystem.messageID)];
                            case 4:
                                oldVerificationMessage = _a.sent();
                                newMsgEmbed = oldVerificationMessage.embeds[0];
                                return [4 /*yield*/, currentChannel.send(newMsgEmbed)];
                            case 5:
                                newVerificationMessage = _a.sent();
                                guildData.verificationSystem.messageID = newVerificationMessage.id;
                                return [4 /*yield*/, guildData.writeToDataBase()];
                            case 6:
                                _a.sent();
                                return [4 /*yield*/, newVerificationMessage.react((oldVerificationMessage.reactions.cache.first()).emoji.name)];
                            case 7:
                                _a.sent();
                                return [4 /*yield*/, oldVerificationMessage.delete()];
                            case 8:
                                _a.sent();
                                return [2 /*return*/];
                            case 9: return [2 /*return*/, discordUser.userData.userID];
                            case 10:
                                error_6 = _a.sent();
                                console.log('Looks like the channel or the message no longer exists! Purging the verification system values!');
                                guildData.verificationSystem.channelID = '';
                                guildData.verificationSystem.messageID = '';
                                guildData.verificationSystem.emoji = '';
                                return [4 /*yield*/, guildData.writeToDataBase()];
                            case 11:
                                _a.sent();
                                return [2 /*return*/, new Promise(function (resolve, reject) {
                                        reject(error_6);
                                    })];
                            case 12: return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
            });
        });
    }
    HelperFunctions.cacheMessagesForVerification = cacheMessagesForVerification;
    /**
    * Updates and saves the Discord record, which contains user information.
    */
    function updateAndSaveDiscordRecord(client, discordUser) {
        return __awaiter(this, void 0, void 0, function () {
            var liveGuildArray, keyNames, x, keyname, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        liveGuildArray = client.guilds.cache.array();
                        keyNames = [];
                        for (x = 0; x < liveGuildArray.length; x += 1) {
                            keyname = liveGuildArray[x].id + " + Record";
                            keyNames.push(keyname);
                        }
                        return [4 /*yield*/, recurseThroughServerRecords(discordUser.dataBase, liveGuildArray, keyNames)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                    case 2:
                        error_7 = _a.sent();
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                reject(error_7);
                            })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    }
    HelperFunctions.updateAndSaveDiscordRecord = updateAndSaveDiscordRecord;
    /**
    * Sends out an invite to a user from a selected list of users,
    * if the server has been nuked/deleted.
    */
    function sendInviteIfGuildIsActive(client, discordUser) {
        return __awaiter(this, void 0, void 0, function () {
            var x, fileKey, currentFileObject, error_8, userID, guildName, inviteLink, inviteString, currentUser, wereTheyAvailable, dmChannel, error_9, savedUser, availableFileKey, availableFileString, availableFileObject, error_10, serverRecord, deletedUser, notAvailableFileKey, notAvailableFileObject, error_11, serverRecord, error_12;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 30, , 31]);
                        if (discordUser.userData.activeInviteGuilds.length === 0) {
                            return [2 /*return*/, new Promise(function (resolve, reject) {
                                    resolve();
                                })];
                        }
                        x = 0;
                        _a.label = 1;
                    case 1:
                        if (!(x < discordUser.userData.activeInviteGuilds.length)) return [3 /*break*/, 29];
                        fileKey = '';
                        fileKey = discordUser.userData.activeInviteGuilds[x] + " + Record";
                        currentFileObject = void 0;
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, discordUser.dataBase.get(fileKey)];
                    case 3:
                        currentFileObject = _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        error_8 = _a.sent();
                        if (error_8.type === 'NotFoundError') {
                            discordUser.userData.activeInviteGuilds.splice(x, 1);
                            console.log("Splicing the 'active invite guild'!");
                            return [2 /*return*/, new Promise(function (resolve, reject) {
                                    resolve();
                                })];
                        }
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                reject(error_8);
                            })];
                    case 5:
                        userID = currentFileObject.userRecords[0].userID;
                        guildName = currentFileObject.serverName;
                        inviteLink = currentFileObject.replacementServerInvite;
                        inviteString = "Hello, it is my understanding that you were a member of " + guildName + ".\nIf you would like to continue along with us, then please go ahead and join the new server! Enjoy!\n" + inviteLink;
                        currentUser = client.users.resolve(userID);
                        wereTheyAvailable = false;
                        _a.label = 6;
                    case 6:
                        _a.trys.push([6, 9, , 10]);
                        return [4 /*yield*/, currentUser.createDM()];
                    case 7:
                        dmChannel = _a.sent();
                        return [4 /*yield*/, dmChannel.send(inviteString)];
                    case 8:
                        _a.sent();
                        wereTheyAvailable = true;
                        return [3 /*break*/, 10];
                    case 9:
                        error_9 = _a.sent();
                        console.log("Sorry, but the user " + currentFileObject.userRecords[0].lastKnownUsername + " could not be found!");
                        return [3 /*break*/, 10];
                    case 10:
                        if (!(wereTheyAvailable === true)) return [3 /*break*/, 20];
                        savedUser = {
                            userID: currentFileObject.userRecords[0].userID,
                            lastKnownUserTag: currentFileObject.userRecords[0].lastKnownUserTag,
                            lastKnownUsername: currentFileObject.userRecords[0].lastKnownUsername
                        };
                        currentFileObject.userRecords.splice(0, 1);
                        if (!(currentFileObject.userRecords.length === 0)) return [3 /*break*/, 11];
                        discordUser.dataBase.del(fileKey);
                        return [3 /*break*/, 13];
                    case 11: return [4 /*yield*/, discordUser.dataBase.put(fileKey, currentFileObject)];
                    case 12:
                        _a.sent();
                        _a.label = 13;
                    case 13:
                        availableFileKey = fileKey + " + Available";
                        availableFileString = '';
                        _a.label = 14;
                    case 14:
                        _a.trys.push([14, 17, , 19]);
                        return [4 /*yield*/, discordUser.dataBase.get(availableFileKey)];
                    case 15:
                        availableFileObject = _a.sent();
                        availableFileObject.userRecords.push(savedUser);
                        availableFileString = JSON.stringify(availableFileObject);
                        return [4 /*yield*/, discordUser.dataBase.put(availableFileKey, availableFileString)];
                    case 16:
                        _a.sent();
                        return [3 /*break*/, 19];
                    case 17:
                        error_10 = _a.sent();
                        serverRecord = {
                            replacementServerInvite: currentFileObject.replacementServerInvite,
                            serverID: currentFileObject.serverID,
                            serverName: currentFileObject.serverName,
                            userRecords: []
                        };
                        serverRecord.userRecords.push(savedUser);
                        availableFileString = JSON.stringify(serverRecord);
                        return [4 /*yield*/, discordUser.dataBase.put(availableFileKey, availableFileString)];
                    case 18:
                        _a.sent();
                        return [2 /*return*/];
                    case 19: return [3 /*break*/, 28];
                    case 20:
                        deletedUser = {
                            userID: currentFileObject.userRecords[0].userID,
                            lastKnownUsername: currentFileObject.userRecords[0].lastKnownUsername,
                            lastKnownUserTag: currentFileObject.userRecords[0].lastKnownUserTag
                        };
                        currentFileObject.userRecords.splice(0, 1);
                        if (!(currentFileObject.userRecords.length === 0)) return [3 /*break*/, 21];
                        discordUser.dataBase.del(fileKey);
                        return [3 /*break*/, 23];
                    case 21: return [4 /*yield*/, discordUser.dataBase.put(fileKey, currentFileObject)];
                    case 22:
                        _a.sent();
                        _a.label = 23;
                    case 23:
                        notAvailableFileKey = fileKey + " +  NotAvailable";
                        _a.label = 24;
                    case 24:
                        _a.trys.push([24, 27, , 28]);
                        return [4 /*yield*/, discordUser.dataBase.get(notAvailableFileKey)];
                    case 25:
                        notAvailableFileObject = _a.sent();
                        notAvailableFileObject.userRecords.push(deletedUser);
                        return [4 /*yield*/, discordUser.dataBase.put(notAvailableFileKey, notAvailableFileObject)];
                    case 26:
                        _a.sent();
                        return [3 /*break*/, 28];
                    case 27:
                        error_11 = _a.sent();
                        serverRecord = {
                            replacementServerInvite: currentFileObject.replacementServerInvite,
                            serverName: currentFileObject.serverName,
                            serverID: currentFileObject.serverID,
                            userRecords: []
                        };
                        serverRecord.userRecords.push(deletedUser);
                        discordUser.dataBase.put(notAvailableFileKey, serverRecord);
                        return [2 /*return*/];
                    case 28:
                        x += 1;
                        return [3 /*break*/, 1];
                    case 29: return [2 /*return*/, new Promise(function (resolve, reject) {
                            resolve();
                        })];
                    case 30:
                        error_12 = _a.sent();
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                reject(error_12);
                            })];
                    case 31: return [2 /*return*/];
                }
            });
        });
    }
    HelperFunctions.sendInviteIfGuildIsActive = sendInviteIfGuildIsActive;
    function deleteMessage(message, messageNumber, messageCount, channelName) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("Deleting message number " + messageNumber + " of " + messageCount + ", in channel " + channelName + ".");
                        return [4 /*yield*/, message.delete()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    ;
    /**
    * Purges all of the selected messages within the given channels,
    * of each of the instance's guilds.
    */
    function deleteMessages(client, guildData, channelIndex, discordUser) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var numberOfMessagesToSave, channelID, currentChannel, startingMessage, x_1, currentMessageLimit, arrayOfMessagesToSave, arrayOfMessagesToSave, arrayOfMessagesToSave, arrayOfMessagesToSave, x, arrayOfMessageArrays, arrayOfMessages, arrayOfMessages, totalMessageCount, y, z, y, z, x, y, arrayOfMessageArrays, startingMessage, arrayOfMessages, totalMessageCount, w, z, w, z, error_13;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 46, , 48]);
                        numberOfMessagesToSave = (_a = guildData.deletionChannels[channelIndex]) === null || _a === void 0 ? void 0 : _a.numberOfMessagesToSave;
                        channelID = (_b = guildData.deletionChannels[channelIndex]) === null || _b === void 0 ? void 0 : _b.channelID;
                        currentChannel = client.channels.resolve(channelID);
                        if (!(currentChannel === null)) return [3 /*break*/, 2];
                        guildData.deletionChannels.splice(channelIndex, 1);
                        console.log('Removing an "unknown channel" from list of deletion channels!');
                        return [4 /*yield*/, guildData.writeToDataBase()];
                    case 1:
                        _d.sent();
                        return [2 /*return*/];
                    case 2: return [4 /*yield*/, guildData.getFromDataBase()];
                    case 3:
                        _d.sent();
                        if (guildData.deletionChannels[channelIndex].currentlyBeingDeleted === true) {
                            console.log("Nope! Still being deleted! Channel: " + currentChannel.name);
                            return [2 /*return*/];
                        }
                        console.log("Checking for messages to delete in channel: " + currentChannel.name);
                        guildData.deletionChannels[channelIndex].currentlyBeingDeleted = true;
                        return [4 /*yield*/, guildData.writeToDataBase()];
                    case 4:
                        _d.sent();
                        if (!(numberOfMessagesToSave > 0)) return [3 /*break*/, 30];
                        startingMessage = undefined;
                        x_1 = (Math.trunc(numberOfMessagesToSave / 100));
                        _d.label = 5;
                    case 5:
                        if (!(x_1 >= 0)) return [3 /*break*/, 15];
                        currentMessageLimit = 0;
                        if (!(x_1 > 0)) return [3 /*break*/, 10];
                        currentMessageLimit = 100;
                        if (!(x_1 === (Math.trunc(numberOfMessagesToSave / 100)))) return [3 /*break*/, 7];
                        return [4 /*yield*/, currentChannel.messages.fetch({ limit: currentMessageLimit })];
                    case 6:
                        arrayOfMessagesToSave = (_d.sent()).array();
                        if (arrayOfMessagesToSave.length === 0) {
                            return [3 /*break*/, 15];
                        }
                        startingMessage = arrayOfMessagesToSave[arrayOfMessagesToSave.length - 1];
                        return [3 /*break*/, 9];
                    case 7: return [4 /*yield*/, currentChannel.messages.fetch({ limit: currentMessageLimit, before: startingMessage.id })];
                    case 8:
                        arrayOfMessagesToSave = (_d.sent()).array();
                        if (arrayOfMessagesToSave.length === 0) {
                            return [3 /*break*/, 15];
                        }
                        startingMessage = arrayOfMessagesToSave[arrayOfMessagesToSave.length - 1];
                        _d.label = 9;
                    case 9: return [3 /*break*/, 14];
                    case 10:
                        currentMessageLimit = (numberOfMessagesToSave % 100) + 1;
                        if (!(x_1 === (Math.trunc(numberOfMessagesToSave / 100)))) return [3 /*break*/, 12];
                        return [4 /*yield*/, currentChannel.messages.fetch({ limit: currentMessageLimit })];
                    case 11:
                        arrayOfMessagesToSave = (_d.sent()).array();
                        arrayOfMessagesToSave.splice(arrayOfMessagesToSave.length - 1, 1);
                        if (arrayOfMessagesToSave.length === 0) {
                            return [3 /*break*/, 15];
                        }
                        startingMessage = arrayOfMessagesToSave[arrayOfMessagesToSave.length - 1];
                        return [3 /*break*/, 14];
                    case 12: return [4 /*yield*/, currentChannel.messages.fetch({ limit: currentMessageLimit, before: startingMessage.id })];
                    case 13:
                        arrayOfMessagesToSave = (_d.sent()).array();
                        arrayOfMessagesToSave.splice(arrayOfMessagesToSave.length - 1, 1);
                        if (arrayOfMessagesToSave.length === 0) {
                            return [3 /*break*/, 15];
                        }
                        startingMessage = arrayOfMessagesToSave[arrayOfMessagesToSave.length - 1];
                        _d.label = 14;
                    case 14:
                        x_1 -= 1;
                        return [3 /*break*/, 5];
                    case 15:
                        x = 1;
                        arrayOfMessageArrays = [];
                        _d.label = 16;
                    case 16:
                        if (!(x !== 0)) return [3 /*break*/, 21];
                        if (!(startingMessage !== undefined)) return [3 /*break*/, 18];
                        return [4 /*yield*/, currentChannel.messages
                                .fetch({ limit: 100, before: startingMessage.id })];
                    case 17:
                        arrayOfMessages = (_d.sent()).array();
                        x = arrayOfMessages.length;
                        if (arrayOfMessages !== undefined && startingMessage !== undefined && x > 0) {
                            startingMessage = arrayOfMessages[arrayOfMessages.length - 1];
                            arrayOfMessageArrays.push(arrayOfMessages);
                        }
                        else {
                            return [3 /*break*/, 21];
                        }
                        return [3 /*break*/, 20];
                    case 18: return [4 /*yield*/, currentChannel.messages
                            .fetch({ limit: 100 })];
                    case 19:
                        arrayOfMessages = (_d.sent()).array();
                        x = arrayOfMessages.length;
                        if (arrayOfMessages !== undefined && x > 0) {
                            startingMessage = arrayOfMessages[arrayOfMessages.length - 1];
                            arrayOfMessageArrays.push(arrayOfMessages);
                        }
                        else {
                            return [3 /*break*/, 21];
                        }
                        _d.label = 20;
                    case 20: return [3 /*break*/, 16];
                    case 21:
                        totalMessageCount = 0;
                        for (y = 0; y < arrayOfMessageArrays.length; y += 1) {
                            for (z = 0; z < arrayOfMessageArrays[y].length; z += 1) {
                                if (arrayOfMessageArrays[y][z].pinned === true
                                    || arrayOfMessageArrays[y][z].deleted === true) {
                                    arrayOfMessageArrays[y].splice(z, 1);
                                }
                                else {
                                    totalMessageCount += 1;
                                }
                            }
                        }
                        console.log("Total of " + totalMessageCount + " in channel: " + currentChannel.name);
                        if (!(arrayOfMessageArrays[0] === undefined || arrayOfMessageArrays[0].length === 0)) return [3 /*break*/, 23];
                        guildData.deletionChannels[channelIndex].currentlyBeingDeleted = false;
                        return [4 /*yield*/, guildData.writeToDataBase()];
                    case 22:
                        _d.sent();
                        return [2 /*return*/];
                    case 23:
                        y = arrayOfMessageArrays.length - 1;
                        _d.label = 24;
                    case 24:
                        if (!(y >= 0)) return [3 /*break*/, 29];
                        z = arrayOfMessageArrays[y].length - 1;
                        _d.label = 25;
                    case 25:
                        if (!(z >= 0)) return [3 /*break*/, 28];
                        return [4 /*yield*/, guildData.getFromDataBase()];
                    case 26:
                        _d.sent();
                        if (guildData.deletionChannels[channelIndex].currentlyBeingDeleted === false) {
                            return [2 /*return*/];
                        }
                        if (!arrayOfMessageArrays[y][z].pinned) {
                            if ((_c = arrayOfMessageArrays[y][z]) === null || _c === void 0 ? void 0 : _c.deletable) {
                                deleteMessage(arrayOfMessageArrays[y][z], totalMessageCount - (y * 100 + z), totalMessageCount, currentChannel.name);
                            }
                        }
                        _d.label = 27;
                    case 27:
                        z -= 1;
                        return [3 /*break*/, 25];
                    case 28:
                        y -= 1;
                        return [3 /*break*/, 24];
                    case 29: return [3 /*break*/, 44];
                    case 30:
                        x = 1;
                        y = 0;
                        arrayOfMessageArrays = [];
                        startingMessage = void 0;
                        _d.label = 31;
                    case 31:
                        if (!(x !== 0)) return [3 /*break*/, 36];
                        arrayOfMessages = void 0;
                        if (!(y === 0)) return [3 /*break*/, 33];
                        return [4 /*yield*/, currentChannel.messages.fetch({ limit: 100 })];
                    case 32:
                        arrayOfMessages = (_d.sent()).array();
                        startingMessage = arrayOfMessages[arrayOfMessages.length - 1];
                        return [3 /*break*/, 35];
                    case 33: return [4 /*yield*/, currentChannel.messages.fetch({ limit: 100, before: startingMessage.id })];
                    case 34:
                        arrayOfMessages = (_d.sent()).array();
                        startingMessage = arrayOfMessages[arrayOfMessages.length - 1];
                        _d.label = 35;
                    case 35:
                        x = arrayOfMessages.length;
                        if (arrayOfMessages !== undefined && x > 0) {
                            arrayOfMessageArrays.push(arrayOfMessages);
                            y += 1;
                        }
                        else {
                            return [3 /*break*/, 36];
                        }
                        return [3 /*break*/, 31];
                    case 36:
                        totalMessageCount = 0;
                        for (w = 0; w < arrayOfMessageArrays.length; w += 1) {
                            for (z = 0; z < arrayOfMessageArrays[w].length; z += 1) {
                                if (arrayOfMessageArrays[w][z].pinned === true
                                    || arrayOfMessageArrays[w][z].deleted === true) {
                                    arrayOfMessageArrays[w].splice(z, 1);
                                }
                                else {
                                    totalMessageCount += 1;
                                }
                            }
                        }
                        console.log("Total of " + totalMessageCount + " in channel: " + currentChannel.name);
                        if (!(arrayOfMessageArrays[0] === undefined || arrayOfMessageArrays[0].length === 0)) return [3 /*break*/, 38];
                        guildData.deletionChannels[channelIndex].currentlyBeingDeleted = false;
                        return [4 /*yield*/, guildData.writeToDataBase()];
                    case 37:
                        _d.sent();
                        return [2 /*return*/];
                    case 38:
                        w = arrayOfMessageArrays.length - 1;
                        _d.label = 39;
                    case 39:
                        if (!(w >= 0)) return [3 /*break*/, 44];
                        z = arrayOfMessageArrays[w].length - 1;
                        _d.label = 40;
                    case 40:
                        if (!(z >= 0)) return [3 /*break*/, 43];
                        return [4 /*yield*/, guildData.getFromDataBase()];
                    case 41:
                        _d.sent();
                        if (guildData.deletionChannels[channelIndex].currentlyBeingDeleted === false) {
                            return [2 /*return*/];
                        }
                        if (!arrayOfMessageArrays[w][z].pinned) {
                            deleteMessage(arrayOfMessageArrays[w][z], totalMessageCount - (w * 100 + z), totalMessageCount, currentChannel.name);
                        }
                        _d.label = 42;
                    case 42:
                        z -= 1;
                        return [3 /*break*/, 40];
                    case 43:
                        w -= 1;
                        return [3 /*break*/, 39];
                    case 44:
                        guildData.deletionChannels[channelIndex].currentlyBeingDeleted = false;
                        return [4 /*yield*/, guildData.writeToDataBase()];
                    case 45:
                        _d.sent();
                        return [2 /*return*/];
                    case 46:
                        error_13 = _d.sent();
                        guildData.deletionChannels[channelIndex].currentlyBeingDeleted = false;
                        return [4 /*yield*/, guildData.writeToDataBase()];
                    case 47:
                        _d.sent();
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                reject(error_13);
                            })];
                    case 48: return [2 /*return*/];
                }
            });
        });
    }
    HelperFunctions.deleteMessages = deleteMessages;
    /**
    * Purges the actively-being-purged text channels, if enough time has passed.
    */
    function purgeMessageChannels(client, discordUser) {
        var _this = this;
        try {
            GuildData_1.default.guildsData.forEach(function (guild) { return __awaiter(_this, void 0, void 0, function () {
                var y, error_14;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(guild.deletionChannels.length > 0)) return [3 /*break*/, 7];
                            y = 0;
                            _a.label = 1;
                        case 1:
                            if (!(y < guild.deletionChannels.length)) return [3 /*break*/, 7];
                            _a.label = 2;
                        case 2:
                            _a.trys.push([2, 5, , 6]);
                            return [4 /*yield*/, guild.getFromDataBase()];
                        case 3:
                            _a.sent();
                            return [4 /*yield*/, deleteMessages(client, guild, y, discordUser)];
                        case 4:
                            _a.sent();
                            return [3 /*break*/, 6];
                        case 5:
                            error_14 = _a.sent();
                            console.log(error_14);
                            return [3 /*break*/, 6];
                        case 6:
                            y += 1;
                            return [3 /*break*/, 1];
                        case 7: return [2 /*return*/];
                    }
                });
            }); });
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
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                try {
                    GuildData_1.default.guildsData.forEach(function (guildData) { return __awaiter(_this, void 0, void 0, function () {
                        var y, currentTime, guild, textChannel, timeDifference, timeRemaining;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    y = 0;
                                    _a.label = 1;
                                case 1:
                                    if (!(y < guildData.timedMessages.length)) return [3 /*break*/, 7];
                                    currentTime = new Date().getTime();
                                    if (!((currentTime - guildData.timedMessages[y].timeOfLastSend)
                                        > guildData.timedMessages[y].msBetweenSends)) return [3 /*break*/, 5];
                                    guild = client.guilds.resolve(guildData.id);
                                    textChannel = new Discord.TextChannel(guild, {});
                                    return [4 /*yield*/, client.channels.fetch(guildData.timedMessages[y].textChannelID)];
                                case 2:
                                    textChannel = (_a.sent());
                                    return [4 /*yield*/, textChannel.send(guildData.timedMessages[y].messageContent)];
                                case 3:
                                    _a.sent();
                                    guildData.timedMessages[y].timeOfLastSend = new Date().getTime();
                                    return [4 /*yield*/, guildData.writeToDataBase()];
                                case 4:
                                    _a.sent();
                                    return [3 /*break*/, 7];
                                case 5:
                                    timeDifference = currentTime - guildData.timedMessages[y].timeOfLastSend;
                                    timeRemaining = guildData.timedMessages[y].msBetweenSends - timeDifference;
                                    console.log(guildData.timedMessages[y].name + " has " + timeRemaining + "ms left until it can be sent!");
                                    _a.label = 6;
                                case 6:
                                    y += 1;
                                    return [3 /*break*/, 1];
                                case 7: return [2 /*return*/];
                            }
                        });
                    }); });
                    return [2 /*return*/];
                }
                catch (error) {
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            reject(error);
                        })];
                }
                return [2 /*return*/];
            });
        });
    }
    HelperFunctions.sendTimedMessagesIfTimeHasPassed = sendTimedMessagesIfTimeHasPassed;
})(HelperFunctions || (HelperFunctions = {}));
exports.default = HelperFunctions;
