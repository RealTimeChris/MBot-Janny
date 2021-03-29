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
function execute(message, args, discordUser) {
    return __awaiter(this, void 0, void 0, function () {
        var commandReturnData, areWeInADM, doWeHaveAdminPermission, userMentionRegExp, idRegExp, whatAreWeDoing, trackedUserID, argOne, trackedUserIDOne, userData, x, isUserFound, y, currentGuild_1, z, currentUser, currentGuild, currentTextChannel, currentGuildMember, msgString, messageEmbed, currentIndex, error_1, currentGuildMember, currentIndex, msgString, messageEmbed, msgString, messageEmbed, error_2, msgString, x, trackedGuildName, trackedChannelName, messageEmbed, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 47, , 48]);
                    commandReturnData = new DiscordStuff.CommandReturnData();
                    commandReturnData.commandName = command.name;
                    return [4 /*yield*/, DiscordStuff.areWeInADM(message)];
                case 1:
                    areWeInADM = _a.sent();
                    if (areWeInADM === true) {
                        return [2 /*return*/, command.name];
                    }
                    return [4 /*yield*/, discordUser.doWeHaveAdminPermission(message)];
                case 2:
                    doWeHaveAdminPermission = _a.sent();
                    if (doWeHaveAdminPermission === false) {
                        return [2 /*return*/, command.name];
                    }
                    userMentionRegExp = /.{2,3}\d{18}>/;
                    idRegExp = /\d{18}/;
                    whatAreWeDoing = '';
                    trackedUserID = '';
                    if (!(args[0] !== undefined && (args[0].toLowerCase() !== 'add' && args[0].toLowerCase() !== 'remove'))) return [3 /*break*/, 6];
                    return [4 /*yield*/, message.reply('Please enter either add or remove for the first argument! (!trackuser = ADDorREMOVE, @USERMENTION, or just !trackuser)')];
                case 3:
                    _a.sent();
                    if (!message.deletable) return [3 /*break*/, 5];
                    return [4 /*yield*/, message.delete()];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5: return [2 /*return*/, command.name];
                case 6:
                    if (!(args[0] !== undefined && (args[1] === undefined || !userMentionRegExp.test(args[1])))) return [3 /*break*/, 10];
                    return [4 /*yield*/, message.reply('Please enter a valud usermention! (!trackuser = ADDorREMOVE, @USERMENTION, or just !trackuser)')];
                case 7:
                    _a.sent();
                    if (!message.deletable) return [3 /*break*/, 9];
                    return [4 /*yield*/, message.delete()];
                case 8:
                    _a.sent();
                    _a.label = 9;
                case 9: return [2 /*return*/, command.name];
                case 10:
                    if (args[0] !== undefined) {
                        whatAreWeDoing = args[0].toLowerCase();
                    }
                    else {
                        whatAreWeDoing = '';
                    }
                    if (args[1] !== undefined) {
                        argOne = args[1];
                        trackedUserIDOne = argOne.match(idRegExp)[0];
                        trackedUserID = trackedUserIDOne;
                    }
                    return [4 /*yield*/, discordUser.getUserDataFromDB(message.client)];
                case 11:
                    userData = _a.sent();
                    if (!(userData.trackedUserIDs !== undefined)) return [3 /*break*/, 15];
                    x = 0;
                    _a.label = 12;
                case 12:
                    if (!(x < userData.trackedUserIDs.length)) return [3 /*break*/, 15];
                    isUserFound = false;
                    for (y = 0; y < message.client.guilds.cache.size; y += 1) {
                        currentGuild_1 = message.client.guilds.resolve(userData.trackingGuildIDs[x]);
                        if (currentGuild_1 != null) {
                            for (z = 0; z < currentGuild_1.memberCount; z += 1) {
                                currentUser = currentGuild_1.members.resolve(userData.trackedUserIDs[x]);
                                if (currentUser != null) {
                                    isUserFound = true;
                                }
                            }
                        }
                    }
                    if (!(isUserFound === false)) return [3 /*break*/, 14];
                    return [4 /*yield*/, message.reply("Removing user " + userData.trackedUserNames[x] + " from the list of tracked users!")];
                case 13:
                    _a.sent();
                    userData.trackedUserIDs.splice(x, 1);
                    userData.trackedUserNames.splice(x, 1);
                    userData.trackingChannelIDs.splice(x, 1);
                    userData.trackingGuildIDs.splice(x, 1);
                    discordUser.updateUserDataInDB(userData);
                    _a.label = 14;
                case 14:
                    x += 1;
                    return [3 /*break*/, 12];
                case 15:
                    currentGuild = message.guild;
                    currentTextChannel = message.channel;
                    if (!(whatAreWeDoing === 'add')) return [3 /*break*/, 27];
                    _a.label = 16;
                case 16:
                    _a.trys.push([16, 22, , 24]);
                    return [4 /*yield*/, currentGuild.members.fetch(trackedUserID)];
                case 17:
                    currentGuildMember = _a.sent();
                    if (!(userData.trackedUserIDs.indexOf(trackedUserID) === -1)) return [3 /*break*/, 19];
                    userData.trackedUserIDs.length += 1;
                    userData.trackedUserIDs[userData.trackedUserIDs.length - 1] = currentGuildMember
                        .user.id;
                    userData.trackedUserNames.length += 1;
                    userData.trackedUserNames[userData.trackedUserNames.length - 1] = currentGuildMember
                        .user.username;
                    userData.trackingChannelIDs.length += 1;
                    userData.trackingChannelIDs[userData.trackingChannelIDs.length - 1] = message
                        .channel.id;
                    userData.trackingGuildIDs.length += 1;
                    userData.trackingGuildIDs[userData.trackingGuildIDs.length - 1] = message.guild.id;
                    discordUser.updateUserDataInDB(userData);
                    msgString = "" + 'User <@!' + currentGuildMember.id.toString() + "> is now being tracked, in channel " + currentTextChannel.name.toString() + ".";
                    messageEmbed = new Discord.MessageEmbed()
                        .setTimestamp(Date())
                        .setTitle('__**New Tracked User:**__')
                        .setDescription(msgString)
                        .setAuthor(message.author.username, message.author.avatarURL())
                        .setThumbnail(currentGuildMember.user.avatarURL())
                        .setColor([254, 254, 254]);
                    return [4 /*yield*/, currentTextChannel.send("<@!" + message.author.id + ">, attention!", { embed: messageEmbed, split: true })];
                case 18:
                    _a.sent();
                    return [3 /*break*/, 21];
                case 19:
                    if (!(userData.trackedUserIDs.indexOf(trackedUserID) >= 0)) return [3 /*break*/, 21];
                    return [4 /*yield*/, message.reply('That user is already being tracked! I will update their tracking channel though!')];
                case 20:
                    _a.sent();
                    currentIndex = userData.trackedUserIDs.indexOf(trackedUserID);
                    userData.trackingGuildIDs[currentIndex] = message.guild.id;
                    userData.trackingChannelIDs[currentIndex] = message.channel.id;
                    discordUser.updateUserDataInDB(userData);
                    _a.label = 21;
                case 21: return [3 /*break*/, 24];
                case 22:
                    error_1 = _a.sent();
                    return [4 /*yield*/, message.reply('Sorry, but the specified user could not be found!')];
                case 23:
                    _a.sent();
                    return [3 /*break*/, 24];
                case 24:
                    if (!message.deletable) return [3 /*break*/, 26];
                    return [4 /*yield*/, message.delete()];
                case 25:
                    _a.sent();
                    _a.label = 26;
                case 26: return [2 /*return*/, command.name];
                case 27:
                    if (!(whatAreWeDoing === 'remove')) return [3 /*break*/, 42];
                    _a.label = 28;
                case 28:
                    _a.trys.push([28, 37, , 39]);
                    return [4 /*yield*/, currentGuild.members.fetch(trackedUserID)];
                case 29:
                    currentGuildMember = _a.sent();
                    if (!(args[0].toLowerCase() === 'remove' && userData.trackedUserIDs.length >= 1)) return [3 /*break*/, 34];
                    currentIndex = userData.trackedUserIDs.indexOf(trackedUserID);
                    if (!(currentIndex >= 0)) return [3 /*break*/, 31];
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
                        .setAuthor(message.author.username, message.author.avatarURL())
                        .setColor([254, 254, 254]);
                    return [4 /*yield*/, currentTextChannel.send("<@!" + message.author.id + ">, attention!", { embed: messageEmbed, split: true })];
                case 30:
                    _a.sent();
                    return [3 /*break*/, 33];
                case 31:
                    if (!(currentIndex === -1)) return [3 /*break*/, 33];
                    return [4 /*yield*/, message.reply('There is noone by that ID being tracked!')];
                case 32:
                    _a.sent();
                    _a.label = 33;
                case 33: return [3 /*break*/, 36];
                case 34:
                    if (!(args[0].toLowerCase() === 'remove' && userData.trackedUserIDs.length === 0)) return [3 /*break*/, 36];
                    msgString = 'There is noone to remove from the tracked users!';
                    messageEmbed = new Discord.MessageEmbed()
                        .setTimestamp(Date())
                        .setTitle('__**No Tracked Users:**__')
                        .setDescription(msgString)
                        .setAuthor(message.author.username, message.author.avatarURL())
                        .setColor([254, 254, 254]);
                    return [4 /*yield*/, currentTextChannel.send("<@!" + message.author.id + ">, attention!", { embed: messageEmbed, split: true })];
                case 35:
                    _a.sent();
                    _a.label = 36;
                case 36: return [3 /*break*/, 39];
                case 37:
                    error_2 = _a.sent();
                    return [4 /*yield*/, message.reply('Sorry, but the specified user could not be found!')];
                case 38:
                    _a.sent();
                    return [3 /*break*/, 39];
                case 39:
                    if (!message.deletable) return [3 /*break*/, 41];
                    return [4 /*yield*/, message.delete()];
                case 40:
                    _a.sent();
                    _a.label = 41;
                case 41: return [2 /*return*/, command.name];
                case 42:
                    if (!(args[0] === undefined)) return [3 /*break*/, 46];
                    msgString = '';
                    if (userData.trackedUserIDs.length > 0) {
                        for (x = 0; x < userData.trackedUserIDs.length; x += 1) {
                            if (userData.trackingGuildIDs[x] === message.guild.id) {
                                trackedGuildName = message.client.guilds
                                    .resolve(userData.trackingGuildIDs[x]).name;
                                trackedChannelName = message.client.channels
                                    .resolve(userData.trackingChannelIDs[x]).name;
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
                        .setAuthor(message.author.username, message.author.avatarURL())
                        .setColor([254, 254, 254]);
                    return [4 /*yield*/, currentTextChannel.send(messageEmbed)];
                case 43:
                    _a.sent();
                    if (!message.deletable) return [3 /*break*/, 45];
                    return [4 /*yield*/, message.delete()];
                case 44:
                    _a.sent();
                    _a.label = 45;
                case 45: return [2 /*return*/, command.name];
                case 46: return [2 /*return*/, command.name];
                case 47:
                    error_3 = _a.sent();
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            reject(error_3);
                        })];
                case 48: return [2 /*return*/];
            }
        });
    });
}
exports.execute = execute;
command.function = execute;
exports.default = command;
