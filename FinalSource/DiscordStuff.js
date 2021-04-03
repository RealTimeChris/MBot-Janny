// DiscordStuff.js - Implementation for my Discord bots.
// Jan 28, 2021
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
exports.DiscordUser = exports.CommandReturnData = exports.CommandData = exports.BotCommand = exports.DiscordUserData = exports.GuildData = exports.Log = exports.VerificationSystem = exports.TimedMessage = exports.DeletionChannel = exports.GuildMemberData = exports.ServerRecord = exports.UserRecord = exports.PermissionOverwrites = exports.recurseThroughServerRecords = exports.applyDefaultRoles = exports.areWeInADM = exports.recurseThroughMessagePages = exports.checkForBotCommanderStatus = exports.sendMessageWithCorrectChannel = void 0;
var Discord = require("discord.js");
var level_ts_1 = __importDefault(require("level-ts"));
var config = require("./config.json");
/**
 * Functino for sending out a message, using the appropriate channel.
 */
function sendMessageWithCorrectChannel(commandData, messageContents, atUserID) {
    var _a;
    if (atUserID === void 0) { atUserID = null; }
    return __awaiter(this, void 0, void 0, function () {
        var returnMessage_1, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 18, , 19]);
                    if (!(commandData.toTextChannel instanceof Discord.WebhookClient)) return [3 /*break*/, 8];
                    if (!(atUserID !== null && messageContents instanceof Discord.MessageEmbed)) return [3 /*break*/, 3];
                    return [4 /*yield*/, ((_a = commandData.fromTextChannel) === null || _a === void 0 ? void 0 : _a.send("<@!" + atUserID + ">"))];
                case 1:
                    _b.sent();
                    return [4 /*yield*/, (commandData.toTextChannel.send(messageContents))];
                case 2:
                    returnMessage_1 = (_b.sent());
                    return [3 /*break*/, 7];
                case 3:
                    if (!(atUserID === null)) return [3 /*break*/, 5];
                    return [4 /*yield*/, commandData.toTextChannel.send(messageContents)];
                case 4:
                    returnMessage_1 = (_b.sent());
                    return [3 /*break*/, 7];
                case 5: return [4 /*yield*/, commandData.toTextChannel.send("<@!" + atUserID + "> " + messageContents)];
                case 6:
                    returnMessage_1 = (_b.sent());
                    _b.label = 7;
                case 7: return [3 /*break*/, 17];
                case 8:
                    if (!(commandData.toTextChannel instanceof Discord.TextChannel)) return [3 /*break*/, 15];
                    if (!(atUserID !== null && messageContents instanceof Discord.MessageEmbed)) return [3 /*break*/, 10];
                    return [4 /*yield*/, commandData.toTextChannel.send("<@!" + atUserID + ">", { embed: messageContents })];
                case 9:
                    returnMessage_1 = (_b.sent());
                    return [3 /*break*/, 14];
                case 10:
                    if (!(atUserID === null)) return [3 /*break*/, 12];
                    return [4 /*yield*/, commandData.toTextChannel.send(messageContents)];
                case 11:
                    returnMessage_1 = (_b.sent());
                    return [3 /*break*/, 14];
                case 12: return [4 /*yield*/, commandData.toTextChannel.send("<@!" + atUserID + "> " + messageContents)];
                case 13:
                    returnMessage_1 = (_b.sent());
                    _b.label = 14;
                case 14: return [3 /*break*/, 17];
                case 15:
                    if (!(commandData.toTextChannel instanceof Discord.DMChannel)) return [3 /*break*/, 17];
                    return [4 /*yield*/, commandData.toTextChannel.send(messageContents)];
                case 16:
                    returnMessage_1 = (_b.sent());
                    _b.label = 17;
                case 17: return [2 /*return*/, new Promise(function (resolve, reject) {
                        resolve(returnMessage_1);
                    })];
                case 18:
                    error_1 = _b.sent();
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            reject(error_1);
                        })];
                case 19: return [2 /*return*/];
            }
        });
    });
}
exports.sendMessageWithCorrectChannel = sendMessageWithCorrectChannel;
/**
 * Checks a user ID against an array of user IDs to see if it is present.
 */
function checkForBotCommanderStatus(userID, commanderIDs) {
    var isCommander = false;
    for (var x = 0; x < commanderIDs.length; x += 1) {
        if (userID === commanderIDs[x]) {
            isCommander = true;
            break;
        }
    }
    return isCommander;
}
exports.checkForBotCommanderStatus = checkForBotCommanderStatus;
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
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        resolve();
                    })];
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
exports.recurseThroughMessagePages = recurseThroughMessagePages;
/**
 * Checks to see if we're in a DM channel, and sends a warning message if so.
 */
function areWeInADM(commandData) {
    return __awaiter(this, void 0, void 0, function () {
        var currentChannelType, msgString, msgEmbed, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    currentChannelType = commandData.fromTextChannelType;
                    if (!(currentChannelType === 'dm')) return [3 /*break*/, 2];
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
                    _a.sent();
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            resolve(true);
                        })];
                case 2: return [2 /*return*/, new Promise(function (resolve, reject) {
                        resolve(false);
                    })];
                case 3:
                    error_2 = _a.sent();
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            reject(error_2);
                        })];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.areWeInADM = areWeInADM;
/**
* Applies default roles to a new guild member.
*/
function applyDefaultRoles(guildData, guildMember) {
    return __awaiter(this, void 0, void 0, function () {
        var currentIndex, guildMemberRoleManager, x, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    currentIndex = 0;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, , 7]);
                    if (!(guildData.verificationSystem.channelID === null)) return [3 /*break*/, 5];
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
                case 5: return [2 /*return*/, new Promise(function (resolve, reject) {
                        resolve();
                    })];
                case 6:
                    error_3 = _a.sent();
                    guildData.defaultRoleIDs.splice(currentIndex, 1);
                    applyDefaultRoles(guildData, guildMember);
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            reject(error_3);
                        })];
                case 7: return [2 /*return*/];
            }
        });
    });
}
exports.applyDefaultRoles = applyDefaultRoles;
/**
* Takes a server record and a live guild object and either updates or adds it to the records.
*/
function recurseThroughServerRecords(dataBase, liveGuildArray, keyNames, y) {
    var _a, _b;
    if (y === void 0) { y = 0; }
    return __awaiter(this, void 0, void 0, function () {
        var yNew, fileObject, guildMembersCollection, membersArray, z, areTheyFoundInFile, w, userRecord, serverRecordKey, error_4, serverRecord, guildMembersCollection, membersArray, z, userRecord, serverRecordKey;
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
                            userRecord = new UserRecord();
                            userRecord.lastKnownUserTag = membersArray[z].user.tag;
                            userRecord.lastKnownUsername = membersArray[z].user.username;
                            userRecord.userID = membersArray[z].id;
                            fileObject.userRecords.push(userRecord);
                            console.log("Adding New User Record: " + userRecord.lastKnownUserTag + " of server: " + fileObject.serverName);
                        }
                    }
                    serverRecordKey = liveGuildArray[y].id + " + Record";
                    dataBase.put(serverRecordKey, fileObject);
                    console.log(fileObject);
                    yNew += 1;
                    return [4 /*yield*/, recurseThroughServerRecords(dataBase, liveGuildArray, keyNames, yNew)];
                case 3:
                    _c.sent();
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            resolve();
                        })];
                case 4:
                    error_4 = _c.sent();
                    if (!(error_4.type === 'NotFoundError')) return [3 /*break*/, 8];
                    serverRecord = new ServerRecord();
                    serverRecord.serverName = liveGuildArray[y].name;
                    serverRecord.serverID = liveGuildArray[y].id;
                    serverRecord.replacementServerInvite = String();
                    serverRecord.userRecords = [];
                    console.log("Adding New Server Record: " + serverRecord.serverName);
                    console.log("Saving the JSON file for this Discord server for the first time: " + serverRecord.serverName);
                    return [4 /*yield*/, liveGuildArray[y].members.fetch()];
                case 5:
                    guildMembersCollection = _c.sent();
                    membersArray = guildMembersCollection.array().sort();
                    for (z = 0; z < membersArray.length; z += 1) {
                        userRecord = new UserRecord();
                        userRecord.lastKnownUserTag = membersArray[z].user.tag;
                        userRecord.lastKnownUsername = membersArray[z].user.username;
                        userRecord.userID = membersArray[z].id;
                        serverRecord.userRecords.push(userRecord);
                        console.log("Adding New User Record: " + userRecord.lastKnownUserTag + " of server: " + serverRecord.serverName);
                    }
                    serverRecordKey = liveGuildArray[y].id + " + Record";
                    return [4 /*yield*/, dataBase.put(serverRecordKey, serverRecord)];
                case 6:
                    _c.sent();
                    console.log(serverRecord);
                    return [4 /*yield*/, recurseThroughServerRecords(dataBase, liveGuildArray, keyNames, y)];
                case 7:
                    _c.sent();
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            resolve();
                        })];
                case 8: return [2 /*return*/, new Promise(function (resolve, reject) {
                        reject(error_4);
                    })];
                case 9: return [2 /*return*/];
            }
        });
    });
}
exports.recurseThroughServerRecords = recurseThroughServerRecords;
/**
 * Class representing permission overwrites for Discord.
 */
var PermissionOverwrites = /** @class */ (function () {
    function PermissionOverwrites(guild) {
        this.deny = [];
        this.allow = [];
        this.id = '';
        this.type = '';
        this.channel = new Discord.GuildChannel(guild, {});
    }
    return PermissionOverwrites;
}());
exports.PermissionOverwrites = PermissionOverwrites;
/**
 * Class representing some info about a given user.
 */
var UserRecord = /** @class */ (function () {
    function UserRecord() {
        this.userID = '';
        this.lastKnownUsername = '';
        this.lastKnownUserTag = '';
    }
    return UserRecord;
}());
exports.UserRecord = UserRecord;
/**
 * Class representing some info about a given server.
 */
var ServerRecord = /** @class */ (function () {
    function ServerRecord() {
        this.replacementServerInvite = '';
        this.serverName = '';
        this.serverID = '';
        this.userRecords = [];
    }
    return ServerRecord;
}());
exports.ServerRecord = ServerRecord;
/**
 * Class representing a single guild/server member.
 */
var GuildMemberData = /** @class */ (function () {
    function GuildMemberData() {
        this.previousRoleIDs = [];
        this.previousPermissionOverwrites = [];
        this.userID = '';
        this.userName = '';
        this.displayName = '';
    }
    return GuildMemberData;
}());
exports.GuildMemberData = GuildMemberData;
/**
 * Class representing an actively-being-pruned channel.
 */
var DeletionChannel = /** @class */ (function () {
    function DeletionChannel() {
        this.channelID = '';
        this.numberOfMessagesToSave = 0;
        this.timeOfLastPurge = 0;
        this.currentlyBeingDeleted = false;
        this.deletionMessageID = '';
    }
    return DeletionChannel;
}());
exports.DeletionChannel = DeletionChannel;
/**
 * Class representing a timed message to be sent out.
 */
var TimedMessage = /** @class */ (function () {
    function TimedMessage() {
        this.textChannelID = '';
        this.messageContent = '';
        this.msBetweenSends = 0;
        this.timeOfLastSend = 0;
        this.name = '';
    }
    return TimedMessage;
}());
exports.TimedMessage = TimedMessage;
/**
 * Class representing a "server-joining verification" system.
 */
var VerificationSystem = /** @class */ (function () {
    function VerificationSystem() {
        this.channelID = '';
        this.messageID = '';
        this.emoji = '';
    }
    return VerificationSystem;
}());
exports.VerificationSystem = VerificationSystem;
/**
 * Class representing a single log for something on a server.
 */
var Log = /** @class */ (function () {
    function Log() {
        this.name = '';
        this.nameSmall = '';
        this.enabled = false;
        this.loggingChannelID = '';
        this.loggingChannelName = '';
    }
    return Log;
}());
exports.Log = Log;
/**
 * Class representing a single guild/server. *
 */
var GuildData = /** @class */ (function () {
    function GuildData() {
        this.borderColor = [0, 0, 255];
        this.ghostedRoleID = '';
        this.timedMessages = [];
        this.guildID = '';
        this.guildName = '';
        this.guildMemberCount = 0;
        this.logs = [];
        this.verificationSystem = new VerificationSystem();
        this.deletionChannels = [];
        this.defaultRoleIDs = [];
        this.logs[0] = new Log();
        this.logs[0].name = 'Guild Ban Add';
        this.logs[0].nameSmall = 'guildbanadd';
        this.logs[1] = new Log();
        this.logs[1].name = 'Guild Ban Remove';
        this.logs[1].nameSmall = 'guildbanremove';
        this.logs[2] = new Log();
        this.logs[2].name = 'Guild Member Add';
        this.logs[2].nameSmall = 'guildmemberadd';
        this.logs[3] = new Log();
        this.logs[3].name = 'Guild Member Remove';
        this.logs[3].nameSmall = 'guildmemberremove';
        this.logs[4] = new Log();
        this.logs[4].name = 'Display Name Change';
        this.logs[4].nameSmall = 'displaynamechange';
        this.logs[5] = new Log();
        this.logs[5].name = 'Nickname Change';
        this.logs[5].nameSmall = 'nicknamechange';
        this.logs[6] = new Log();
        this.logs[6].name = 'Role Add Or Remove';
        this.logs[6].nameSmall = 'roleaddorremove';
        this.logs[7] = new Log();
        this.logs[7].name = 'Invite Create';
        this.logs[7].nameSmall = 'invitecreate';
        this.logs[8] = new Log();
        this.logs[8].name = 'Message Delete';
        this.logs[8].nameSmall = 'messagedelete';
        this.logs[9] = new Log();
        this.logs[9].name = 'Message Delete Bulk';
        this.logs[9].nameSmall = 'messagedeletebulk';
        this.logs[10] = new Log();
        this.logs[10].name = 'Role Create';
        this.logs[10].nameSmall = 'rolecreate';
        this.logs[11] = new Log();
        this.logs[11].name = 'Role Delete';
        this.logs[11].nameSmall = 'roledelete';
        this.logs[12] = new Log();
        this.logs[12].name = 'Username Change';
        this.logs[12].nameSmall = 'usernamechange';
    }
    return GuildData;
}());
exports.GuildData = GuildData;
/**
 * Class representing a single instance of "Discord".
 */
var DiscordUserData = /** @class */ (function () {
    function DiscordUserData() {
        this.userID = '';
        this.userName = '';
        this.publicKey = '';
        this.clientID = '';
        this.guildCount = 0;
        this.botToken = '';
        this.msBetweenCacheBackup = 0;
        this.currencyName = '';
        this.timeOfLastUpdateAndSave = 0;
        this.prefix = '';
        this.dataBaseFilePath = '';
        this.msBetweenRecordUpdates = 0;
        this.timeOfLastRecordUpdate = 0;
        this.msBetweenInvites = 0;
        this.timeOfLastInvite = 0;
        this.msBetweenMessageDeletion = 0;
        this.startupCall = true;
        this.activeInviteGuilds = [];
        this.botCommanders = [];
        this.trackingGuildIDs = [];
        this.trackingChannelIDs = [];
        this.trackedUserIDs = [];
        this.trackedUserNames = [];
    }
    return DiscordUserData;
}());
exports.DiscordUserData = DiscordUserData;
/**
 * Class representing a function/command.
 */
var BotCommand = /** @class */ (function () {
    function BotCommand() {
        this.name = '';
        this.description = '';
        this.function = new Function();
    }
    return BotCommand;
}());
exports.BotCommand = BotCommand;
/**
 * Class representing the data that goes into a command.
 */
var CommandData = /** @class */ (function () {
    function CommandData() {
        this.interaction = null;
        this.guild = null;
        this.guildMember = null;
        this.fromTextChannel = null;
        this.fromTextChannelType = '';
        this.permsChannel = null;
        this.toTextChannel = null;
        this.args = [];
    }
    CommandData.prototype.initialize = function (client, fromTextChannelID, fromTextChannelType, interaction, guildMemberID, guildID) {
        if (interaction === void 0) { interaction = null; }
        if (guildMemberID === void 0) { guildMemberID = ''; }
        if (guildID === void 0) { guildID = ''; }
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, _d, _e, _f, _g, _h, error_5;
            return __generator(this, function (_j) {
                switch (_j.label) {
                    case 0:
                        _j.trys.push([0, 15, , 16]);
                        this.fromTextChannelType = fromTextChannelType;
                        _a = this;
                        return [4 /*yield*/, client.channels.fetch(fromTextChannelID)];
                    case 1:
                        _a.fromTextChannel = (_j.sent());
                        if (interaction !== null) {
                            this.interaction = interaction;
                        }
                        if (!(guildID !== '')) return [3 /*break*/, 3];
                        _b = this;
                        return [4 /*yield*/, client.guilds.fetch(guildID)];
                    case 2:
                        _b.guild = (_j.sent());
                        _j.label = 3;
                    case 3:
                        if (!(guildMemberID !== '' && guildID !== '')) return [3 /*break*/, 5];
                        _c = this;
                        return [4 /*yield*/, this.guild.members.fetch(guildMemberID)];
                    case 4:
                        _c.guildMember = (_j.sent());
                        return [3 /*break*/, 7];
                    case 5:
                        _d = this;
                        return [4 /*yield*/, client.users.fetch(guildMemberID)];
                    case 6:
                        _d.guildMember = (_j.sent());
                        _j.label = 7;
                    case 7:
                        if (interaction !== null && fromTextChannelType !== 'dm') {
                            this.toTextChannel = new Discord.WebhookClient(client.user.id, this.interaction.token);
                            this.permsChannel = new Discord.GuildChannel(this.guild, this.fromTextChannel);
                        }
                        if (!(interaction === null && fromTextChannelType !== 'dm')) return [3 /*break*/, 9];
                        _e = this;
                        return [4 /*yield*/, client.channels.fetch(fromTextChannelID)];
                    case 8:
                        _e.toTextChannel = (_j.sent());
                        this.permsChannel = new Discord.GuildChannel(this.guild, this.fromTextChannel);
                        _j.label = 9;
                    case 9:
                        if (!(interaction !== null && fromTextChannelType === 'dm')) return [3 /*break*/, 11];
                        this.toTextChannel = new Discord.WebhookClient(client.user.id, this.interaction.token);
                        _f = this;
                        return [4 /*yield*/, client.channels.fetch(fromTextChannelID)];
                    case 10:
                        _f.permsChannel = (_j.sent());
                        _j.label = 11;
                    case 11:
                        if (!(interaction === null && fromTextChannelType === 'dm')) return [3 /*break*/, 14];
                        _g = this;
                        return [4 /*yield*/, this.guildMember.createDM(true)];
                    case 12:
                        _g.toTextChannel = (_j.sent());
                        _h = this;
                        return [4 /*yield*/, client.channels.fetch(fromTextChannelID)];
                    case 13:
                        _h.permsChannel = (_j.sent());
                        _j.label = 14;
                    case 14: return [3 /*break*/, 16];
                    case 15:
                        error_5 = _j.sent();
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                reject(error_5);
                            })];
                    case 16: return [2 /*return*/];
                }
            });
        });
    };
    return CommandData;
}());
exports.CommandData = CommandData;
/**
 * Class representing a command' return values.
 */
var CommandReturnData = /** @class */ (function () {
    function CommandReturnData() {
        this.commandName = '';
    }
    return CommandReturnData;
}());
exports.CommandReturnData = CommandReturnData;
/**
 *  Class representing an entire instance of Discord, from the perspective of a given bot.
 */
var DiscordUser = /** @class */ (function () {
    function DiscordUser() {
        this.userData = new DiscordUserData();
        this.guildsData = new Map();
        this.guildMembersData = new Map();
    }
    /**
    * Initializes the instance of Discord, within the DiscordUser class.
    */
    DiscordUser.prototype.initializeInstance = function (client) {
        return __awaiter(this, void 0, void 0, function () {
            var dataBaseFilePath, _a, error_6;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 5, , 6]);
                        dataBaseFilePath = config.dataBaseFilePath + " + " + client.user.id;
                        this.dataBase = new level_ts_1.default(dataBaseFilePath);
                        _a = this;
                        return [4 /*yield*/, this.getUserDataFromDB(client)];
                    case 1:
                        _a.userData = (_b.sent());
                        this.userData.dataBaseFilePath = dataBaseFilePath;
                        this.userData.startupCall = true;
                        return [4 /*yield*/, this.updateUserDataInDB(this.userData)];
                    case 2:
                        _b.sent();
                        console.log("Logged in as " + client.user.tag + "!");
                        return [4 /*yield*/, this.updateDataCacheAndSaveToFile(client)];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, this.cacheMessagesForVerification(client)];
                    case 4:
                        _b.sent();
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                resolve();
                            })];
                    case 5:
                        error_6 = _b.sent();
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                reject(error_6);
                            })];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    /**
    * Collects user data from the database, or alternatively, from the live objects.
    */
    DiscordUser.prototype.getUserDataFromDB = function (client) {
        return __awaiter(this, void 0, void 0, function () {
            var userData_1, error_7, userData_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        console.log('Loading user data from the database!');
                        return [4 /*yield*/, this.dataBase.get(client.user.id)];
                    case 1:
                        userData_1 = _a.sent();
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                resolve(userData_1);
                            })];
                    case 2:
                        error_7 = _a.sent();
                        if (error_7.type === 'NotFoundError') {
                            console.log("Adding new entry for the current user's data!");
                            userData_2 = new DiscordUserData();
                            userData_2.botToken = config.botToken;
                            userData_2.botCommanders = config.botCommanders;
                            userData_2.msBetweenRecordUpdates = config.msBetweenRecordUpdates;
                            userData_2.msBetweenInvites = config.msBetweenInvites;
                            userData_2.msBetweenMessageDeletion = config.msBetweenMessageDeletion;
                            userData_2.currencyName = config.currencyName;
                            userData_2.publicKey = config.publicKey;
                            userData_2.clientID = config.clientID;
                            userData_2.timeOfLastInvite = 0;
                            userData_2.activeInviteGuilds = [];
                            userData_2.timeOfLastRecordUpdate = 0;
                            userData_2.guildCount = client.guilds.cache.array().length;
                            userData_2.msBetweenCacheBackup = config.msBetweenCacheBackup;
                            userData_2.prefix = config.prefix;
                            userData_2.timeOfLastUpdateAndSave = new Date().getTime();
                            userData_2.trackedUserIDs = [];
                            userData_2.trackedUserNames = [];
                            userData_2.trackingChannelIDs = [];
                            userData_2.trackingGuildIDs = [];
                            userData_2.userID = client.user.id;
                            userData_2.userName = client.user.username;
                            return [2 /*return*/, new Promise(function (resolve, reject) {
                                    resolve(userData_2);
                                })];
                        }
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                reject(error_7);
                            })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
    * Updates the user data within the database.
    */
    DiscordUser.prototype.updateUserDataInDB = function (newUserData) {
        return __awaiter(this, void 0, void 0, function () {
            var userData, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        this.userData = newUserData;
                        return [4 /*yield*/, this.dataBase.put(this.userData.userID, this.userData)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.dataBase.get(this.userData.userID)];
                    case 2:
                        userData = _a.sent();
                        console.log('New User Cache:');
                        console.log(userData);
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                resolve();
                            })];
                    case 3:
                        error_8 = _a.sent();
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                reject(error_8);
                            })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
    * * Updates the cache of user data.
    */
    DiscordUser.prototype.updateUserData = function (client) {
        return __awaiter(this, void 0, void 0, function () {
            var userData, error_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.getUserDataFromDB(client)];
                    case 1:
                        userData = _a.sent();
                        console.log('Updating the user data!');
                        userData.botToken = config.botToken;
                        userData.botCommanders = config.botCommanders;
                        userData.msBetweenRecordUpdates = config.msBetweenRecordUpdates;
                        userData.msBetweenInvites = config.msBetweenInvites;
                        userData.msBetweenMessageDeletion = config.msBetweenMessageDeletion;
                        userData.currencyName = config.currencyName;
                        userData.publicKey = config.publicKey;
                        userData.clientID = config.clientID;
                        userData.guildCount = client.guilds.cache.array().length;
                        userData.msBetweenCacheBackup = config.msBetweenCacheBackup;
                        userData.prefix = config.prefix;
                        userData.timeOfLastUpdateAndSave = new Date().getTime();
                        if (userData.trackedUserIDs === undefined) {
                            userData.trackedUserIDs = [];
                            userData.trackedUserNames = [];
                            userData.trackingChannelIDs = [];
                            userData.trackingGuildIDs = [];
                        }
                        userData.userID = client.user.id;
                        userData.userName = client.user.username;
                        return [4 /*yield*/, this.updateUserDataInDB(userData)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                resolve();
                            })];
                    case 3:
                        error_9 = _a.sent();
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                reject(error_9);
                            })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
    * Collects the data for a single guild, from the database.
    */
    DiscordUser.prototype.getGuildDataFromDB = function (guild) {
        return __awaiter(this, void 0, void 0, function () {
            var guildData_1, error_10, guildData_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        console.log('Loading guild data from the database!');
                        return [4 /*yield*/, this.dataBase.get(guild.id)];
                    case 1:
                        guildData_1 = _a.sent();
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                resolve(guildData_1);
                            })];
                    case 2:
                        error_10 = _a.sent();
                        if (error_10.type === 'NotFoundError') {
                            console.log("Adding new entry for guild data! For guild: " + guild.name);
                            guildData_2 = new GuildData();
                            guildData_2.defaultRoleIDs = [];
                            guildData_2.deletionChannels = [];
                            guildData_2.ghostedRoleID = '';
                            guildData_2.guildID = guild.id;
                            guildData_2.guildMemberCount = guild.memberCount;
                            guildData_2.guildName = guild.name;
                            guildData_2.timedMessages = [];
                            guildData_2.verificationSystem = new VerificationSystem();
                            return [2 /*return*/, new Promise(function (resolve, reject) {
                                    resolve(guildData_2);
                                })];
                        }
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                reject(error_10);
                            })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
    * Updates a given guild's data in the database.
    */
    DiscordUser.prototype.updateGuildDataInDB = function (guildData) {
        return __awaiter(this, void 0, void 0, function () {
            var newGuildData, error_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        this.guildsData.set(guildData.guildID, guildData);
                        newGuildData = this.guildsData.get(guildData.guildID);
                        return [4 /*yield*/, this.dataBase.put(guildData.guildID, newGuildData)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.dataBase.get(guildData.guildID)];
                    case 2:
                        newGuildData = _a.sent();
                        console.log('New Guild Cache:');
                        console.log(newGuildData);
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                resolve();
                            })];
                    case 3:
                        error_11 = _a.sent();
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                reject(error_11);
                            })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
    * Updates the cache of guild data.
    */
    DiscordUser.prototype.updateGuildsData = function (client) {
        return __awaiter(this, void 0, void 0, function () {
            var liveDataGuildArray, x, guildData, y, error_12;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        liveDataGuildArray = [new Discord.Guild(client, {})];
                        liveDataGuildArray.length = client.guilds.cache.array().length;
                        liveDataGuildArray = client.guilds.cache.array().sort();
                        x = 0;
                        _a.label = 1;
                    case 1:
                        if (!(x < liveDataGuildArray.length)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.getGuildDataFromDB(liveDataGuildArray[x])];
                    case 2:
                        guildData = _a.sent();
                        console.log("Updating the guild data, for guild number " + x + "!");
                        if (this.guildsData.get(liveDataGuildArray[x].id) !== undefined) {
                            guildData = this.guildsData.get(liveDataGuildArray[x].id);
                        }
                        if (this.userData.startupCall === true) {
                            for (y = 0; y < guildData.deletionChannels.length; y += 1) {
                                guildData.deletionChannels[y].currentlyBeingDeleted = false;
                                guildData.deletionChannels[y].timeOfLastPurge = 0;
                            }
                        }
                        guildData.guildID = liveDataGuildArray[x].id;
                        guildData.guildMemberCount = liveDataGuildArray[x].memberCount;
                        guildData.guildName = liveDataGuildArray[x].name;
                        return [4 /*yield*/, this.updateGuildDataInDB(guildData)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        x += 1;
                        return [3 /*break*/, 1];
                    case 5: return [2 /*return*/, new Promise(function (resolve, reject) {
                            resolve();
                        })];
                    case 6:
                        error_12 = _a.sent();
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                reject(error_12);
                            })];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    /**
    * Retrieves a guild member's data from the database, or returnds fresh data.
    */
    DiscordUser.prototype.getGuildMemberDataFromDB = function (guildMember) {
        return __awaiter(this, void 0, void 0, function () {
            var guildMemberData_1, error_13, guildMemberData_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.dataBase.get(guildMember.guild.id + " + " + guildMember.id)];
                    case 1:
                        guildMemberData_1 = _a.sent();
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                resolve(guildMemberData_1);
                            })];
                    case 2:
                        error_13 = _a.sent();
                        if (error_13.type === 'NotFoundError') {
                            console.log("Adding new entry for guild member data! For member: " + guildMember.user.username);
                            guildMemberData_2 = new GuildMemberData();
                            guildMemberData_2.displayName = guildMember.displayName;
                            guildMemberData_2.userID = guildMember.id;
                            guildMemberData_2.userName = guildMember.user.username;
                            return [2 /*return*/, new Promise(function (resolve, reject) {
                                    resolve(guildMemberData_2);
                                })];
                        }
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                reject(error_13);
                            })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
    * Updates a given guild member's data in the database.
    */
    DiscordUser.prototype.updateGuildMemberDataInDB = function (guildMemberData, guildID) {
        return __awaiter(this, void 0, void 0, function () {
            var guildMemberDataNew, error_14;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.guildMembersData.set(guildID + " + " + guildMemberData.userID, guildMemberData);
                        guildMemberDataNew = this.guildMembersData.get(guildID + " + " + guildMemberData.userID);
                        return [4 /*yield*/, this.dataBase.put(guildID + " + " + guildMemberData.userID, guildMemberDataNew)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                resolve();
                            })];
                    case 2:
                        error_14 = _a.sent();
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                reject(error_14);
                            })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
    * Function for updating all of the guild member's data caches,
    */
    DiscordUser.prototype.updateGuildMembersData = function (client) {
        return __awaiter(this, void 0, void 0, function () {
            var liveDataGuildArray, x, liveDataGuildMemberArray, y, guildMemberData, userData, error_15;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 11, , 12]);
                        liveDataGuildArray = client.guilds.cache.array();
                        x = 0;
                        _a.label = 1;
                    case 1:
                        if (!(x < liveDataGuildArray.length)) return [3 /*break*/, 8];
                        return [4 /*yield*/, liveDataGuildArray[x].members.fetch()];
                    case 2:
                        liveDataGuildMemberArray = (_a.sent()).array();
                        y = 0;
                        _a.label = 3;
                    case 3:
                        if (!(y < liveDataGuildMemberArray.length)) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.getGuildMemberDataFromDB(liveDataGuildMemberArray[y])];
                    case 4:
                        guildMemberData = _a.sent();
                        if (this.guildMembersData.get(liveDataGuildArray[x].id + " + " + liveDataGuildMemberArray[y].id) !== undefined) {
                            guildMemberData = this.guildMembersData.get(liveDataGuildArray[x].id + " + " + liveDataGuildMemberArray[y].id);
                        }
                        guildMemberData.displayName = liveDataGuildMemberArray[y].displayName;
                        guildMemberData.userID = liveDataGuildMemberArray[y].id;
                        guildMemberData.userName = liveDataGuildMemberArray[y].user.username;
                        return [4 /*yield*/, this.updateGuildMemberDataInDB(guildMemberData, liveDataGuildArray[x].id)];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6:
                        y += 1;
                        return [3 /*break*/, 3];
                    case 7:
                        x += 1;
                        return [3 /*break*/, 1];
                    case 8: return [4 /*yield*/, this.getUserDataFromDB(client)];
                    case 9:
                        userData = _a.sent();
                        userData.timeOfLastUpdateAndSave = new Date().getTime();
                        userData.startupCall = false;
                        return [4 /*yield*/, this.updateUserDataInDB(userData)];
                    case 10:
                        _a.sent();
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                resolve();
                            })];
                    case 11:
                        error_15 = _a.sent();
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                reject(error_15);
                            })];
                    case 12: return [2 /*return*/];
                }
            });
        });
    };
    /**
    * Updates the current data cache from live objects,
    * and the,JSON data file, and saves it to the JSON file.
    */
    DiscordUser.prototype.updateDataCacheAndSaveToFile = function (client) {
        return __awaiter(this, void 0, void 0, function () {
            var error_16;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, this.updateUserData(client)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.updateGuildsData(client)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.updateGuildMembersData(client)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                resolve();
                            })];
                    case 4:
                        error_16 = _a.sent();
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                reject(error_16);
                            })];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
    * Function that updates the data cache and saves it to disk,
    * if a certain amount of time has passed since it was last done.
    */
    DiscordUser.prototype.saveCacheIfTimeHasPassed = function (client) {
        return __awaiter(this, void 0, void 0, function () {
            var currentTime, msPassed, timeLeft, error_17;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        currentTime = new Date().getTime();
                        msPassed = currentTime - this.userData.timeOfLastUpdateAndSave;
                        if (!(msPassed >= this.userData.msBetweenCacheBackup)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.updateDataCacheAndSaveToFile(client)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        timeLeft = this.userData.msBetweenCacheBackup - msPassed;
                        console.log("Time until next cache update and backup: " + timeLeft + "ms");
                        _a.label = 3;
                    case 3: return [2 /*return*/, new Promise(function (resolve, reject) {
                            resolve();
                        })];
                    case 4:
                        error_17 = _a.sent();
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                reject(error_17);
                            })];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Checks if we have admin permissions in the current channel.
     */
    DiscordUser.prototype.doWeHaveAdminPermission = function (commandData) {
        return __awaiter(this, void 0, void 0, function () {
            var guildData, currentChannelPermissions, permissionStrings, areTheyAnAdmin, areTheyACommander, msgString, msgEmbed, msg, error_18;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, this.getGuildDataFromDB(commandData.guild)];
                    case 1:
                        guildData = _a.sent();
                        currentChannelPermissions = commandData.guildMember.permissionsIn(commandData.permsChannel);
                        permissionStrings = ['ADMINISTRATOR'];
                        areTheyAnAdmin = currentChannelPermissions.has(permissionStrings);
                        areTheyACommander = checkForBotCommanderStatus(commandData.guildMember.id, this.userData.botCommanders);
                        if (areTheyAnAdmin === true || areTheyACommander === true) {
                            return [2 /*return*/, new Promise(function (resolve, reject) {
                                    resolve(true);
                                })];
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
                    case 2:
                        msg = _a.sent();
                        if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                            msg = new Discord.Message(commandData.guildMember.client, msg, commandData.fromTextChannel);
                        }
                        return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                resolve(false);
                            })];
                    case 4:
                        error_18 = _a.sent();
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                reject(error_18);
                            })];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
    * Updates and saves the Discord record, which contains user information.
    */
    DiscordUser.prototype.updateAndSaveDiscordRecordIfTimeHasPassed = function (client) {
        return __awaiter(this, void 0, void 0, function () {
            var currentTime, timeDifference, liveGuildArray, keyNames, x, keyname, error_19;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        currentTime = new Date().getTime();
                        timeDifference = currentTime - this.userData.timeOfLastRecordUpdate;
                        if (!(timeDifference >= this.userData.msBetweenRecordUpdates)) return [3 /*break*/, 3];
                        liveGuildArray = client.guilds.cache.array();
                        keyNames = [];
                        for (x = 0; x < liveGuildArray.length; x += 1) {
                            keyname = liveGuildArray[x].id + " + Record";
                            keyNames.push(keyname);
                        }
                        return [4 /*yield*/, recurseThroughServerRecords(this.dataBase, liveGuildArray, keyNames)];
                    case 1:
                        _a.sent();
                        this.userData.timeOfLastRecordUpdate = new Date().getTime();
                        return [4 /*yield*/, this.updateUserDataInDB(this.userData)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        console.log("Time until next record update and backup: " + (this.userData.msBetweenRecordUpdates - timeDifference) + "ms");
                        _a.label = 4;
                    case 4: return [2 /*return*/, new Promise(function (resolve, reject) {
                            resolve();
                        })];
                    case 5:
                        error_19 = _a.sent();
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                reject(error_19);
                            })];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    /**
    * Sends out an invite to a user from a selected list of users,
    * if the server has been nuked/deleted.
    */
    DiscordUser.prototype.sendInviteIfTimeHasPassedAndGuildIsActive = function (client) {
        return __awaiter(this, void 0, void 0, function () {
            var currentTime, timeDifference, timeRemaining, x, fileKey, currentFileObject, error_20, userID, guildName, inviteLink, inviteString, currentUser, wereTheyAvailable, dmChannel, error_21, savedUser, availableFileKey, availableFileString, availableFileObject, error_22, serverRecord, deletedUser, notAvailableFileKey, notAvailableFileString, notAvailableFileObject, error_23, serverRecord, error_24;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 32, , 33]);
                        if (this.userData.activeInviteGuilds.length === 0) {
                            return [2 /*return*/, new Promise(function (resolve, reject) {
                                    resolve();
                                })];
                        }
                        currentTime = new Date().getTime();
                        timeDifference = currentTime - this.userData.timeOfLastInvite;
                        if (timeDifference < this.userData.msBetweenInvites) {
                            timeRemaining = this.userData.msBetweenInvites - timeDifference;
                            console.log("Time until next invite can be sent out: " + timeRemaining + "ms");
                            return [2 /*return*/, new Promise(function (resolve, reject) {
                                    resolve();
                                })];
                        }
                        x = 0;
                        _a.label = 1;
                    case 1:
                        if (!(x < this.userData.activeInviteGuilds.length)) return [3 /*break*/, 31];
                        fileKey = String();
                        fileKey = this.userData.activeInviteGuilds[x] + " + Record";
                        currentFileObject = void 0;
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, this.dataBase.get(fileKey)];
                    case 3:
                        currentFileObject = (_a.sent());
                        return [3 /*break*/, 5];
                    case 4:
                        error_20 = _a.sent();
                        if (error_20.type === 'NotFoundError') {
                            this.userData.activeInviteGuilds.splice(x, 1);
                            console.log("Splicing the 'active invite guild'!");
                            return [2 /*return*/, new Promise(function (resolve, reject) {
                                    resolve();
                                })];
                        }
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                reject(error_20);
                            })];
                    case 5:
                        userID = currentFileObject.userRecords[0].userID;
                        guildName = currentFileObject.serverName;
                        inviteLink = currentFileObject.replacementServerInvite;
                        inviteString = "Hello, it is my understanding that you were a member of " + guildName + ".\nIf you would like to continue along with us, then please go ahead and join this new server! Enjoy!\n" + inviteLink;
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
                        error_21 = _a.sent();
                        console.log("Sorry, but the user " + currentFileObject.userRecords[0].lastKnownUsername + " could not be found!");
                        return [3 /*break*/, 10];
                    case 10:
                        if (!(wereTheyAvailable === true)) return [3 /*break*/, 20];
                        savedUser = new UserRecord();
                        savedUser.userID = currentFileObject.userRecords[0].userID;
                        savedUser.lastKnownUserTag = currentFileObject.userRecords[0].lastKnownUserTag;
                        savedUser.lastKnownUsername = currentFileObject.userRecords[0].lastKnownUsername;
                        currentFileObject.userRecords.splice(0, 1);
                        if (!(currentFileObject.userRecords.length === 0)) return [3 /*break*/, 11];
                        this.dataBase.del(fileKey);
                        return [3 /*break*/, 13];
                    case 11: return [4 /*yield*/, this.dataBase.put(fileKey, currentFileObject)];
                    case 12:
                        _a.sent();
                        _a.label = 13;
                    case 13:
                        availableFileKey = fileKey + " + Available";
                        availableFileString = String();
                        _a.label = 14;
                    case 14:
                        _a.trys.push([14, 17, , 19]);
                        return [4 /*yield*/, this.dataBase.get(availableFileKey)];
                    case 15:
                        availableFileObject = _a.sent();
                        availableFileObject.userRecords.push(savedUser);
                        availableFileString = JSON.stringify(availableFileObject);
                        return [4 /*yield*/, this.dataBase.put(availableFileKey, availableFileString)];
                    case 16:
                        _a.sent();
                        return [3 /*break*/, 19];
                    case 17:
                        error_22 = _a.sent();
                        serverRecord = new ServerRecord();
                        serverRecord.replacementServerInvite = currentFileObject.replacementServerInvite;
                        serverRecord.serverID = currentFileObject.serverID;
                        serverRecord.serverName = currentFileObject.serverName;
                        serverRecord.userRecords.push(savedUser);
                        availableFileString = JSON.stringify(serverRecord);
                        return [4 /*yield*/, this.dataBase.put(availableFileKey, availableFileString)];
                    case 18:
                        _a.sent();
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                resolve();
                            })];
                    case 19: return [3 /*break*/, 28];
                    case 20:
                        deletedUser = new UserRecord();
                        deletedUser.userID = currentFileObject.userRecords[0].userID;
                        deletedUser.lastKnownUserTag = currentFileObject.userRecords[0].lastKnownUserTag;
                        deletedUser.lastKnownUsername = currentFileObject.userRecords[0].lastKnownUsername;
                        currentFileObject.userRecords.splice(0, 1);
                        if (!(currentFileObject.userRecords.length === 0)) return [3 /*break*/, 21];
                        this.dataBase.del(fileKey);
                        return [3 /*break*/, 23];
                    case 21: return [4 /*yield*/, this.dataBase.put(fileKey, currentFileObject)];
                    case 22:
                        _a.sent();
                        _a.label = 23;
                    case 23:
                        notAvailableFileKey = fileKey + " +  NotAvailable";
                        notAvailableFileString = String();
                        _a.label = 24;
                    case 24:
                        _a.trys.push([24, 27, , 28]);
                        return [4 /*yield*/, this.dataBase.get(notAvailableFileKey)];
                    case 25:
                        notAvailableFileObject = _a.sent();
                        notAvailableFileObject.userRecords.push(deletedUser);
                        return [4 /*yield*/, this.dataBase.put(notAvailableFileKey, notAvailableFileObject)];
                    case 26:
                        _a.sent();
                        return [3 /*break*/, 28];
                    case 27:
                        error_23 = _a.sent();
                        serverRecord = new ServerRecord();
                        serverRecord.replacementServerInvite = currentFileObject.replacementServerInvite;
                        serverRecord.serverID = currentFileObject.serverID;
                        serverRecord.serverName = currentFileObject.serverName;
                        serverRecord.userRecords.push(deletedUser);
                        this.dataBase.put(notAvailableFileKey, serverRecord);
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                resolve();
                            })];
                    case 28:
                        this.userData.timeOfLastInvite = new Date().getTime();
                        return [4 /*yield*/, this.updateUserDataInDB(this.userData)];
                    case 29:
                        _a.sent();
                        _a.label = 30;
                    case 30:
                        x += 1;
                        return [3 /*break*/, 1];
                    case 31: return [2 /*return*/, new Promise(function (resolve, reject) {
                            resolve();
                        })];
                    case 32:
                        error_24 = _a.sent();
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                reject(error_24);
                            })];
                    case 33: return [2 /*return*/];
                }
            });
        });
    };
    /**
    * Purges all of the selected messages within the given channels,
    * of each of the instance's guilds.
    */
    DiscordUser.prototype.deleteMessagesIfTimeHasPassed = function (client, guild, channelIndex) {
        return __awaiter(this, void 0, void 0, function () {
            var numberOfMessagesToSave, channelID, newGuild, currentChannel, error_25, currentTime, timeDifference, startingMessage, x_1, currentMessageLimit, arrayOfMessagesToSave, arrayOfMessagesToSave, arrayOfMessagesToSave, arrayOfMessagesToSave, x, arrayOfMessageArrays, arrayOfMessages, arrayOfMessages, totalMessageCount, y, z, y, z, x, y, arrayOfMessageArrays, startingMessage, arrayOfMessages, totalMessageCount, w, z, w, z, error_26;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 43, , 44]);
                        numberOfMessagesToSave = guild.deletionChannels[channelIndex].numberOfMessagesToSave;
                        channelID = guild.deletionChannels[channelIndex].channelID;
                        newGuild = guild;
                        currentChannel = new Discord.TextChannel(client.guilds
                            .resolve(newGuild.guildID), {});
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 5]);
                        return [4 /*yield*/, client.channels.fetch(channelID)];
                    case 2:
                        currentChannel = (_a.sent());
                        return [3 /*break*/, 5];
                    case 3:
                        error_25 = _a.sent();
                        newGuild.deletionChannels.splice(channelIndex, 1);
                        console.log('Removing an "unknown channel" from list of deletion channels!');
                        return [4 /*yield*/, this.updateGuildDataInDB(newGuild)];
                    case 4:
                        _a.sent();
                        return [2 /*return*/, new Promise(function (resolve) {
                                resolve();
                            })];
                    case 5:
                        currentTime = new Date().getTime();
                        timeDifference = currentTime - newGuild.deletionChannels[channelIndex].timeOfLastPurge;
                        if (newGuild.deletionChannels[channelIndex].currentlyBeingDeleted === true) {
                            console.log("Nope! Still being deleted! Channel: " + currentChannel.name);
                            return [2 /*return*/, new Promise(function (resolve) {
                                    resolve();
                                })];
                        }
                        if (timeDifference < this.userData.msBetweenMessageDeletion) {
                            console.log("Nope! Still " + (this.userData.msBetweenMessageDeletion - timeDifference) + "ms left until we can purge! Channel: " + currentChannel.name);
                            return [2 /*return*/, new Promise(function (resolve) {
                                    resolve();
                                })];
                        }
                        console.log("Checking for messages to delete in channel: " + currentChannel.name);
                        newGuild.deletionChannels[channelIndex].currentlyBeingDeleted = true;
                        if (!(numberOfMessagesToSave > 0)) return [3 /*break*/, 29];
                        startingMessage = void 0;
                        x_1 = (Math.trunc(numberOfMessagesToSave / 100));
                        _a.label = 6;
                    case 6:
                        if (!(x_1 >= 0)) return [3 /*break*/, 16];
                        currentMessageLimit = 0;
                        if (!(x_1 > 0)) return [3 /*break*/, 11];
                        currentMessageLimit = 100;
                        if (!(x_1 === (Math.trunc(numberOfMessagesToSave / 100)))) return [3 /*break*/, 8];
                        return [4 /*yield*/, currentChannel.messages
                                .fetch({ limit: currentMessageLimit })];
                    case 7:
                        arrayOfMessagesToSave = (_a.sent()).array();
                        if (arrayOfMessagesToSave.length === 0) {
                            return [3 /*break*/, 16];
                        }
                        startingMessage = arrayOfMessagesToSave[arrayOfMessagesToSave.length - 1];
                        return [3 /*break*/, 10];
                    case 8: return [4 /*yield*/, currentChannel.messages
                            .fetch({ limit: currentMessageLimit, before: startingMessage.id })];
                    case 9:
                        arrayOfMessagesToSave = (_a.sent()).array();
                        if (arrayOfMessagesToSave.length === 0) {
                            return [3 /*break*/, 16];
                        }
                        startingMessage = arrayOfMessagesToSave[arrayOfMessagesToSave.length - 1];
                        _a.label = 10;
                    case 10: return [3 /*break*/, 15];
                    case 11:
                        currentMessageLimit = (numberOfMessagesToSave % 100) + 1;
                        if (!(x_1 === (Math.trunc(numberOfMessagesToSave / 100)))) return [3 /*break*/, 13];
                        return [4 /*yield*/, currentChannel.messages
                                .fetch({ limit: currentMessageLimit })];
                    case 12:
                        arrayOfMessagesToSave = (_a.sent()).array();
                        arrayOfMessagesToSave.splice(arrayOfMessagesToSave.length - 1, 1);
                        if (arrayOfMessagesToSave.length === 0) {
                            return [3 /*break*/, 16];
                        }
                        startingMessage = arrayOfMessagesToSave[arrayOfMessagesToSave.length - 1];
                        return [3 /*break*/, 15];
                    case 13: return [4 /*yield*/, currentChannel.messages
                            .fetch({ limit: currentMessageLimit })];
                    case 14:
                        arrayOfMessagesToSave = (_a.sent()).array();
                        arrayOfMessagesToSave.splice(arrayOfMessagesToSave.length - 1, 1);
                        if (arrayOfMessagesToSave.length === 0) {
                            return [3 /*break*/, 16];
                        }
                        startingMessage = arrayOfMessagesToSave[arrayOfMessagesToSave.length - 1];
                        _a.label = 15;
                    case 15:
                        x_1 -= 1;
                        return [3 /*break*/, 6];
                    case 16:
                        x = 1;
                        arrayOfMessageArrays = [];
                        _a.label = 17;
                    case 17:
                        if (!(x !== 0)) return [3 /*break*/, 22];
                        if (!(startingMessage !== undefined)) return [3 /*break*/, 19];
                        return [4 /*yield*/, currentChannel.messages
                                .fetch({ limit: 100, before: startingMessage.id })];
                    case 18:
                        arrayOfMessages = (_a.sent()).array();
                        x = arrayOfMessages.length;
                        if (arrayOfMessages !== undefined && startingMessage !== undefined && x > 0) {
                            startingMessage = arrayOfMessages[arrayOfMessages.length - 1];
                            arrayOfMessageArrays.push(arrayOfMessages);
                        }
                        else {
                            return [3 /*break*/, 22];
                        }
                        return [3 /*break*/, 21];
                    case 19: return [4 /*yield*/, currentChannel.messages
                            .fetch({ limit: 100 })];
                    case 20:
                        arrayOfMessages = (_a.sent()).array();
                        x = arrayOfMessages.length;
                        if (arrayOfMessages !== undefined && x > 0) {
                            startingMessage = arrayOfMessages[arrayOfMessages.length - 1];
                            arrayOfMessageArrays.push(arrayOfMessages);
                        }
                        else {
                            return [3 /*break*/, 22];
                        }
                        _a.label = 21;
                    case 21: return [3 /*break*/, 17];
                    case 22:
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
                        if (arrayOfMessageArrays[0] === undefined || arrayOfMessageArrays[0].length === 0) {
                            newGuild.deletionChannels[channelIndex].currentlyBeingDeleted = false;
                            return [2 /*return*/, new Promise(function (resolve) {
                                    resolve();
                                })];
                        }
                        y = arrayOfMessageArrays.length - 1;
                        _a.label = 23;
                    case 23:
                        if (!(y >= 0)) return [3 /*break*/, 28];
                        z = arrayOfMessageArrays[y].length - 1;
                        _a.label = 24;
                    case 24:
                        if (!(z >= 0)) return [3 /*break*/, 27];
                        if (newGuild.deletionChannels[channelIndex].currentlyBeingDeleted === false) {
                            return [2 /*return*/, new Promise(function (resolve) {
                                    resolve();
                                })];
                        }
                        if (!!arrayOfMessageArrays[y][z].pinned) return [3 /*break*/, 26];
                        return [4 /*yield*/, arrayOfMessageArrays[y][z].delete()];
                    case 25:
                        _a.sent();
                        console.log("Deleting Message Number: " + (totalMessageCount - (y * 100 + z)) + " of " + totalMessageCount + " in channel " + currentChannel.name + ".");
                        _a.label = 26;
                    case 26:
                        z -= 1;
                        return [3 /*break*/, 24];
                    case 27:
                        y -= 1;
                        return [3 /*break*/, 23];
                    case 28: return [3 /*break*/, 41];
                    case 29:
                        x = 1;
                        y = 0;
                        arrayOfMessageArrays = [];
                        startingMessage = void 0;
                        _a.label = 30;
                    case 30:
                        if (!(x !== 0)) return [3 /*break*/, 35];
                        arrayOfMessages = void 0;
                        if (!(y === 0)) return [3 /*break*/, 32];
                        return [4 /*yield*/, currentChannel.messages.fetch({ limit: 100 })];
                    case 31:
                        arrayOfMessages = (_a.sent()).array();
                        return [3 /*break*/, 34];
                    case 32: return [4 /*yield*/, currentChannel.messages
                            .fetch({ limit: 100, })];
                    case 33:
                        arrayOfMessages = (_a.sent()).array();
                        _a.label = 34;
                    case 34:
                        x = arrayOfMessages.length;
                        if (arrayOfMessages !== undefined && x > 0) {
                            startingMessage = arrayOfMessages[arrayOfMessages.length - 1];
                            arrayOfMessageArrays.push(arrayOfMessages);
                            y += 1;
                        }
                        else {
                            return [3 /*break*/, 35];
                        }
                        return [3 /*break*/, 30];
                    case 35:
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
                        if (arrayOfMessageArrays[0] === undefined || arrayOfMessageArrays[0].length === 0) {
                            newGuild.deletionChannels[channelIndex].currentlyBeingDeleted = false;
                            return [2 /*return*/, new Promise(function (resolve) {
                                    resolve();
                                })];
                        }
                        w = arrayOfMessageArrays.length - 1;
                        _a.label = 36;
                    case 36:
                        if (!(w >= 0)) return [3 /*break*/, 41];
                        z = arrayOfMessageArrays[w].length - 1;
                        _a.label = 37;
                    case 37:
                        if (!(z >= 0)) return [3 /*break*/, 40];
                        if (newGuild.deletionChannels[channelIndex].currentlyBeingDeleted === false) {
                            return [2 /*return*/, new Promise(function (resolve) {
                                    resolve();
                                })];
                        }
                        if (!!arrayOfMessageArrays[w][z].pinned) return [3 /*break*/, 39];
                        return [4 /*yield*/, arrayOfMessageArrays[w][z].delete()];
                    case 38:
                        _a.sent();
                        console.log("Deleting Message Number: " + (totalMessageCount - (w * 100 + z)) + " of " + totalMessageCount + " in channel " + currentChannel.name + ".");
                        _a.label = 39;
                    case 39:
                        z -= 1;
                        return [3 /*break*/, 37];
                    case 40:
                        w -= 1;
                        return [3 /*break*/, 36];
                    case 41:
                        newGuild.deletionChannels[channelIndex].timeOfLastPurge = new Date().getTime();
                        newGuild.deletionChannels[channelIndex].currentlyBeingDeleted = false;
                        return [4 /*yield*/, this.updateGuildDataInDB(newGuild)];
                    case 42:
                        _a.sent();
                        return [2 /*return*/, new Promise(function (resolve) {
                                resolve();
                            })];
                    case 43:
                        error_26 = _a.sent();
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                reject(error_26);
                            })];
                    case 44: return [2 /*return*/];
                }
            });
        });
    };
    /**
    * Purges the actively-being-purged text channels, if enough time has passed.
    */
    DiscordUser.prototype.purgeMessageChannelsIfTimeHasPassed = function (client) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                try {
                    this.guildsData.forEach(function (guild) { return __awaiter(_this, void 0, void 0, function () {
                        var y;
                        return __generator(this, function (_a) {
                            if (guild.deletionChannels.length > 0) {
                                for (y = 0; y < guild.deletionChannels.length; y += 1) {
                                    this.deleteMessagesIfTimeHasPassed(client, guild, y).catch(function (error) {
                                        console.log(error);
                                    });
                                }
                            }
                            return [2 /*return*/];
                        });
                    }); });
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            resolve();
                        })];
                }
                catch (error) {
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            reject(error);
                        })];
                }
                return [2 /*return*/];
            });
        });
    };
    /**
    * Sends out the timed messages within each server, if enough time has passed.
    */
    DiscordUser.prototype.sendTimedMessagesIfTimeHasPassed = function (client) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                try {
                    this.guildsData.forEach(function (guildData) { return __awaiter(_this, void 0, void 0, function () {
                        var y, newGuildData, currentTime, guild, textChannel, timeDifference, timeRemaining;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    y = 0;
                                    _a.label = 1;
                                case 1:
                                    if (!(y < guildData.timedMessages.length)) return [3 /*break*/, 7];
                                    newGuildData = guildData;
                                    currentTime = new Date().getTime();
                                    if (!((currentTime - newGuildData.timedMessages[y].timeOfLastSend)
                                        > newGuildData.timedMessages[y].msBetweenSends)) return [3 /*break*/, 5];
                                    guild = client.guilds.resolve(newGuildData.guildID);
                                    textChannel = new Discord.TextChannel(guild, {});
                                    return [4 /*yield*/, client.channels.fetch(newGuildData.timedMessages[y].textChannelID)];
                                case 2:
                                    textChannel = (_a.sent());
                                    return [4 /*yield*/, textChannel.send(newGuildData.timedMessages[y].messageContent)];
                                case 3:
                                    _a.sent();
                                    newGuildData.timedMessages[y].timeOfLastSend = new Date().getTime();
                                    return [4 /*yield*/, this.updateGuildDataInDB(newGuildData)];
                                case 4:
                                    _a.sent();
                                    return [3 /*break*/, 7];
                                case 5:
                                    timeDifference = currentTime - newGuildData.timedMessages[y].timeOfLastSend;
                                    timeRemaining = newGuildData.timedMessages[y].msBetweenSends - timeDifference;
                                    console.log(newGuildData.timedMessages[y].name + " has " + timeRemaining + "ms left until it can be sent!");
                                    _a.label = 6;
                                case 6:
                                    y += 1;
                                    return [3 /*break*/, 1];
                                case 7: return [2 /*return*/];
                            }
                        });
                    }); });
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            resolve();
                        })];
                }
                catch (error) {
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            reject(error);
                        })];
                }
                return [2 /*return*/];
            });
        });
    };
    /**
    * Caches messages for each of the guilds that have an active "verification" system.
    */
    DiscordUser.prototype.cacheMessagesForVerification = function (client) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.guildsData.forEach(function (guildData) { return __awaiter(_this, void 0, void 0, function () {
                    var newGuildData, currentGuild, currentChannel, msgManager, oldVerificationMessage, newMsgEmbed, newVerificationMessage, error_27;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                newGuildData = guildData;
                                _a.label = 1;
                            case 1:
                                _a.trys.push([1, 11, , 13]);
                                if (!(newGuildData.verificationSystem.channelID != '')) return [3 /*break*/, 10];
                                return [4 /*yield*/, client.guilds.fetch(newGuildData.guildID)];
                            case 2:
                                currentGuild = _a.sent();
                                currentChannel = currentGuild.channels
                                    .resolve(newGuildData.verificationSystem.channelID);
                                if (!(currentChannel === null)) return [3 /*break*/, 4];
                                console.log('null Channel! Purging from the values! For Guild: ' + newGuildData.guildName);
                                newGuildData.verificationSystem.channelID = '';
                                newGuildData.verificationSystem.messageID = '';
                                newGuildData.verificationSystem.emoji = '';
                                return [4 /*yield*/, this.updateGuildDataInDB(newGuildData)];
                            case 3:
                                _a.sent();
                                return [2 /*return*/, new Promise(function (resolve, reject) {
                                        resolve();
                                    })];
                            case 4:
                                msgManager = new Discord.MessageManager(currentChannel);
                                return [4 /*yield*/, msgManager
                                        .fetch(newGuildData.verificationSystem.messageID)];
                            case 5:
                                oldVerificationMessage = _a.sent();
                                newMsgEmbed = oldVerificationMessage.embeds[0];
                                return [4 /*yield*/, currentChannel.send(newMsgEmbed)];
                            case 6:
                                newVerificationMessage = _a.sent();
                                newGuildData.verificationSystem.messageID = newVerificationMessage.id;
                                return [4 /*yield*/, this.updateGuildDataInDB(newGuildData)];
                            case 7:
                                _a.sent();
                                return [4 /*yield*/, newVerificationMessage
                                        .react(oldVerificationMessage.reactions.cache.first().emoji.name)];
                            case 8:
                                _a.sent();
                                return [4 /*yield*/, oldVerificationMessage.delete()];
                            case 9:
                                _a.sent();
                                return [2 /*return*/, new Promise(function (resolve, reject) {
                                        resolve();
                                    })];
                            case 10: return [2 /*return*/, this.userData.userID];
                            case 11:
                                error_27 = _a.sent();
                                console.log('Looks like the channel or the message no longer exists! Purging the verification system values!');
                                newGuildData.verificationSystem.channelID = '';
                                newGuildData.verificationSystem.messageID = '';
                                newGuildData.verificationSystem.emoji = '';
                                return [4 /*yield*/, this.updateGuildDataInDB(newGuildData)];
                            case 12:
                                _a.sent();
                                return [2 /*return*/, new Promise(function (resolve, reject) {
                                        reject(error_27);
                                    })];
                            case 13: return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
            });
        });
    };
    return DiscordUser;
}());
exports.DiscordUser = DiscordUser;
