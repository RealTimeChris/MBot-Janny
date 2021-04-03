// trackuser.ts - Module for my track user command.
// Jan 30, 2021
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = void 0;
var Discord = require("discord.js");
var DiscordStuff = require("../DiscordStuff");
var command = new DiscordStuff.BotCommand();
command.name = 'trackuser';
command.description = '!trackuser = ADD, @USERMENTION to track the user within the current text channel.\n\t!trackuser = REMOVE, @USERMENTION to stop tracking the user\n\t!trackuser to display all of the currently tracked users.';
/**
 * Deals with the setting of a user's tracking status.
 */
function execute(commandData, discordUser) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
    return __awaiter(this, void 0, void 0, function () {
        var commandReturnData, areWeInADM, doWeHaveAdminPermission, userMentionRegExp, idRegExp, whatAreWeDoing, trackedUserID, msgString, msgEmbed, msg, msgString, msgEmbed, msg, argOne, trackedUserIDOne, userData, x, isUserFound, y, currentGuild_1, z, currentUser, msgString, msgEmbed, msg, currentGuild, currentTextChannel, currentGuildMember, msgString, messageEmbed, msgString, currentIndex, error_1, msgString, msgEmbed, msg, currentGuildMember, currentIndex, msgString, messageEmbed, msgString, msgEmbed, msg, msgString, messageEmbed, error_2, msgString, msgString, x, trackedGuildName, trackedChannelName, messageEmbed, error_3;
        return __generator(this, function (_m) {
            switch (_m.label) {
                case 0:
                    _m.trys.push([0, 40, , 41]);
                    commandReturnData = new DiscordStuff.CommandReturnData();
                    commandReturnData.commandName = command.name;
                    return [4 /*yield*/, DiscordStuff.areWeInADM(commandData)];
                case 1:
                    areWeInADM = _m.sent();
                    if (areWeInADM === true) {
                        return [2 /*return*/, commandReturnData];
                    }
                    return [4 /*yield*/, discordUser.doWeHaveAdminPermission(commandData)];
                case 2:
                    doWeHaveAdminPermission = _m.sent();
                    if (doWeHaveAdminPermission === false) {
                        return [2 /*return*/, commandReturnData];
                    }
                    userMentionRegExp = /.{2,3}\d{18}>/;
                    idRegExp = /\d{18}/;
                    whatAreWeDoing = '';
                    trackedUserID = '';
                    if (!(commandData.args[0] !== undefined && (commandData.args[0].toLowerCase() !== 'add' && commandData.args[0].toLowerCase() !== 'remove'))) return [3 /*break*/, 5];
                    msgString = "------\n**Please enter either add or remove for the first argument! (!trackuser = ADDorREMOVE, @USERMENTION, or just !trackuser)**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor((_a = commandData.guildMember) === null || _a === void 0 ? void 0 : _a.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Missing Or Invalid Arguments:**__');
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 3:
                    msg = _m.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 4:
                    _m.sent();
                    return [2 /*return*/, commandReturnData];
                case 5:
                    if (!(commandData.args[0] !== undefined && (commandData.args[1] === undefined || (!userMentionRegExp.test(commandData.args[1]) && !idRegExp.test(commandData.args[1]))))) return [3 /*break*/, 8];
                    msgString = "------\n**Please enter a valud usermention! (!trackuser = ADDorREMOVE, @USERMENTION, or just !trackuser)**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor((_b = commandData.guildMember) === null || _b === void 0 ? void 0 : _b.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Missing Or Invalid Arguments:**__');
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 6:
                    msg = _m.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 7:
                    _m.sent();
                    return [2 /*return*/, commandReturnData];
                case 8:
                    if (commandData.args[0] !== undefined) {
                        whatAreWeDoing = commandData.args[0].toLowerCase();
                    }
                    else {
                        whatAreWeDoing = '';
                    }
                    if (commandData.args[1] !== undefined) {
                        argOne = commandData.args[1];
                        trackedUserIDOne = argOne.match(idRegExp)[0];
                        trackedUserID = trackedUserIDOne;
                    }
                    return [4 /*yield*/, discordUser.getUserDataFromDB(commandData.guildMember.client)];
                case 9:
                    userData = _m.sent();
                    if (!(userData.trackedUserIDs !== undefined)) return [3 /*break*/, 14];
                    x = 0;
                    _m.label = 10;
                case 10:
                    if (!(x < userData.trackedUserIDs.length)) return [3 /*break*/, 14];
                    isUserFound = false;
                    for (y = 0; y < commandData.guildMember.client.guilds.cache.size; y += 1) {
                        currentGuild_1 = commandData.guildMember.client.guilds.resolve(userData.trackingGuildIDs[x]);
                        if (currentGuild_1 != null) {
                            for (z = 0; z < currentGuild_1.memberCount; z += 1) {
                                currentUser = currentGuild_1.members.resolve(userData.trackedUserIDs[x]);
                                if (currentUser != null) {
                                    isUserFound = true;
                                }
                            }
                        }
                    }
                    if (!(isUserFound === false)) return [3 /*break*/, 13];
                    msgString = "------\n**Removing user " + userData.trackedUserNames[x] + " from the list of tracked users!**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor((_c = commandData.guildMember) === null || _c === void 0 ? void 0 : _c.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Missing User(s):**__');
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 11:
                    msg = _m.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 12:
                    _m.sent();
                    userData.trackedUserIDs.splice(x, 1);
                    userData.trackedUserNames.splice(x, 1);
                    userData.trackingChannelIDs.splice(x, 1);
                    userData.trackingGuildIDs.splice(x, 1);
                    discordUser.updateUserDataInDB(userData);
                    _m.label = 13;
                case 13:
                    x += 1;
                    return [3 /*break*/, 10];
                case 14:
                    currentGuild = commandData.guild;
                    currentTextChannel = commandData.fromTextChannel;
                    if (!(whatAreWeDoing === 'add')) return [3 /*break*/, 24];
                    _m.label = 15;
                case 15:
                    _m.trys.push([15, 20, , 23]);
                    return [4 /*yield*/, currentGuild.members.fetch(trackedUserID)];
                case 16:
                    currentGuildMember = _m.sent();
                    if (!(userData.trackedUserIDs.indexOf(trackedUserID) === -1)) return [3 /*break*/, 18];
                    userData.trackedUserIDs.length += 1;
                    userData.trackedUserIDs[userData.trackedUserIDs.length - 1] = currentGuildMember
                        .user.id;
                    userData.trackedUserNames.length += 1;
                    userData.trackedUserNames[userData.trackedUserNames.length - 1] = currentGuildMember
                        .user.username;
                    userData.trackingChannelIDs.length += 1;
                    userData.trackingChannelIDs[userData.trackingChannelIDs.length - 1] = (_d = commandData.fromTextChannel) === null || _d === void 0 ? void 0 : _d.id;
                    userData.trackingGuildIDs.length += 1;
                    userData.trackingGuildIDs[userData.trackingGuildIDs.length - 1] = commandData.guild.id;
                    discordUser.updateUserDataInDB(userData);
                    msgString = "" + 'User <@!' + currentGuildMember.id.toString() + "> is now being tracked, in channel " + currentTextChannel.name.toString() + ".";
                    messageEmbed = new Discord.MessageEmbed()
                        .setTimestamp(Date())
                        .setTitle('__**New Tracked User:**__')
                        .setDescription(msgString)
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setThumbnail(currentGuildMember.user.avatarURL())
                        .setColor([254, 254, 254]);
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, messageEmbed)];
                case 17:
                    _m.sent();
                    return [3 /*break*/, 19];
                case 18:
                    if (userData.trackedUserIDs.indexOf(trackedUserID) >= 0) {
                        msgString = "<@!" + ((_e = commandData.guildMember) === null || _e === void 0 ? void 0 : _e.id) + "> That user is already being tracked! I will update their tracking channel though!";
                        currentIndex = userData.trackedUserIDs.indexOf(trackedUserID);
                        userData.trackingGuildIDs[currentIndex] = commandData.guild.id;
                        userData.trackingChannelIDs[currentIndex] = (_f = commandData.fromTextChannel) === null || _f === void 0 ? void 0 : _f.id;
                        discordUser.updateUserDataInDB(userData);
                    }
                    _m.label = 19;
                case 19: return [3 /*break*/, 23];
                case 20:
                    error_1 = _m.sent();
                    msgString = "------\n**Sorry, but the specified user could not be found!**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor((_g = commandData.guildMember) === null || _g === void 0 ? void 0 : _g.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**User Issue:**__');
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 21:
                    msg = _m.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 22:
                    _m.sent();
                    return [3 /*break*/, 23];
                case 23: return [2 /*return*/, commandReturnData];
                case 24:
                    if (!(whatAreWeDoing === 'remove')) return [3 /*break*/, 37];
                    _m.label = 25;
                case 25:
                    _m.trys.push([25, 35, , 36]);
                    return [4 /*yield*/, currentGuild.members.fetch(trackedUserID)];
                case 26:
                    currentGuildMember = _m.sent();
                    if (!(commandData.args[0].toLowerCase() === 'remove' && userData.trackedUserIDs.length >= 1)) return [3 /*break*/, 32];
                    currentIndex = userData.trackedUserIDs.indexOf(trackedUserID);
                    if (!(currentIndex >= 0)) return [3 /*break*/, 28];
                    userData.trackedUserIDs.splice(currentIndex, 1);
                    userData.trackedUserNames.splice(currentIndex, 1);
                    userData.trackingGuildIDs.splice(currentIndex, 1);
                    userData.trackingChannelIDs.splice(currentIndex, 1);
                    discordUser.updateUserDataInDB(userData);
                    msgString = "User #" + currentIndex.toString() + " is no longer being tracked! Their name is: " + currentGuildMember.user.username + ".\n";
                    if (userData.trackedUserIDs.length === 0) {
                        msgString += '------\nNo more users are being tracked!\n';
                    }
                    messageEmbed = new Discord.MessageEmbed()
                        .setTimestamp(Date())
                        .setTitle('__**Removed Tracked User:**__')
                        .setDescription(msgString)
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([254, 254, 254]);
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, messageEmbed)];
                case 27:
                    _m.sent();
                    return [3 /*break*/, 31];
                case 28:
                    if (!(currentIndex === -1)) return [3 /*break*/, 31];
                    msgString = "------\n**There is noone by that ID being tracked!**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor((_h = commandData.guildMember) === null || _h === void 0 ? void 0 : _h.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**User Issue:**__');
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 29:
                    msg = _m.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 30:
                    _m.sent();
                    _m.label = 31;
                case 31: return [3 /*break*/, 34];
                case 32:
                    if (!(commandData.args[0].toLowerCase() === 'remove' && userData.trackedUserIDs.length === 0)) return [3 /*break*/, 34];
                    msgString = 'There is noone to remove from the tracked users!';
                    messageEmbed = new Discord.MessageEmbed()
                        .setTimestamp(Date())
                        .setTitle('__**No Tracked Users:**__')
                        .setDescription(msgString)
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([254, 254, 254]);
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, messageEmbed)];
                case 33:
                    _m.sent();
                    _m.label = 34;
                case 34: return [3 /*break*/, 36];
                case 35:
                    error_2 = _m.sent();
                    msgString = "<@!" + ((_j = commandData.guildMember) === null || _j === void 0 ? void 0 : _j.id) + "> Sorry, but the specified user could not be found!";
                    return [3 /*break*/, 36];
                case 36: return [2 /*return*/, commandReturnData];
                case 37:
                    if (!(commandData.args[0] === undefined)) return [3 /*break*/, 39];
                    msgString = '';
                    if (userData.trackedUserIDs.length > 0) {
                        for (x = 0; x < userData.trackedUserIDs.length; x += 1) {
                            if (userData.trackingGuildIDs[x] === commandData.guild.id) {
                                trackedGuildName = ((_k = commandData.guild) === null || _k === void 0 ? void 0 : _k.client.guilds.resolve(userData.trackingGuildIDs[x])).name;
                                trackedChannelName = ((_l = commandData.guild) === null || _l === void 0 ? void 0 : _l.client.channels.resolve(userData.trackingChannelIDs[x])).name;
                                msgString += "__**Tracked User Name #" + x.toString() + ":**__ " + userData.trackedUserNames[x].toString() + "\n";
                                msgString += "In channel " + trackedChannelName + " of the server " + trackedGuildName + "\n";
                            }
                        }
                    }
                    else {
                        msgString += 'Noone is being tracked, currently!';
                    }
                    messageEmbed = new Discord.MessageEmbed()
                        .setTitle('__**Tracked Users:**__')
                        .setTimestamp(Date())
                        .setDescription(msgString)
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([254, 254, 254]);
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, messageEmbed)];
                case 38:
                    _m.sent();
                    return [2 /*return*/, commandReturnData];
                case 39: return [2 /*return*/, commandReturnData];
                case 40:
                    error_3 = _m.sent();
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            reject(error_3);
                        })];
                case 41: return [2 /*return*/];
            }
        });
    });
}
exports.execute = execute;
command.function = execute;
exports.default = command;
