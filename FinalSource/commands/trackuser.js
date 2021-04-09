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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Discord = require("discord.js");
var GuildData_1 = __importDefault(require("../GuildData"));
var HelperFunctions_1 = __importDefault(require("../HelperFunctions"));
var command = {
    name: 'trackuser',
    description: '!trackuser = ADD, @USERMENTION to track the user within the current text channel.\n\t!trackuser = REMOVE, @USERMENTION to stop tracking the user\n\t!trackuser to display all of the currently tracked users.',
    function: Function()
};
/**
 * Deals with the setting of a user's tracking status.
 */
function execute(commandData, discordUser) {
    var _a, _b, _c, _d, _e, _f, _g;
    return __awaiter(this, void 0, void 0, function () {
        var commandReturnData, areWeInADM, doWeHaveAdminPermission, guildData, userMentionRegExp, idRegExp, whatAreWeDoing, trackedUserID, msgString, msgEmbed, msg, msgString, msgEmbed, msg, argOne, trackedUserIDOne, x, isUserFound, currentGuild_1, currentUser, msgString, msgEmbed, msg, currentGuild, currentTextChannel, currentGuildMember, currentIndex, x, trackedUser, msgString, messageEmbed, currentIndex_1, x, msgString, msgEmbed, error_1, msgString, msgEmbed, msg, currentIndex, x, msgString, messageEmbed, msgString, msgEmbed, msg, msgString, messageEmbed, error_2, msgString, messageEmbed, msg, msgString, x, trackedChannelName, messageEmbed, error_3;
        return __generator(this, function (_h) {
            switch (_h.label) {
                case 0:
                    _h.trys.push([0, 46, , 47]);
                    commandReturnData = {
                        commandName: command.name
                    };
                    return [4 /*yield*/, HelperFunctions_1.default.areWeInADM(commandData)];
                case 1:
                    areWeInADM = _h.sent();
                    if (areWeInADM === true) {
                        return [2 /*return*/, commandReturnData];
                    }
                    return [4 /*yield*/, HelperFunctions_1.default.doWeHaveAdminPermission(commandData, discordUser)];
                case 2:
                    doWeHaveAdminPermission = _h.sent();
                    if (doWeHaveAdminPermission === false) {
                        return [2 /*return*/, commandReturnData];
                    }
                    guildData = new GuildData_1.default({ dataBase: discordUser.dataBase, id: commandData.guild.id, name: commandData.guild.name, memberCount: commandData.guild.memberCount });
                    return [4 /*yield*/, guildData.getFromDataBase()];
                case 3:
                    _h.sent();
                    userMentionRegExp = /.{2,3}\d{18}>/;
                    idRegExp = /\d{18}/;
                    whatAreWeDoing = '';
                    trackedUserID = '';
                    if (!(commandData.args[0] !== undefined && (commandData.args[0].toLowerCase() !== 'add' && commandData.args[0].toLowerCase() !== 'remove'))) return [3 /*break*/, 6];
                    msgString = "------\n**Please enter either add or remove for the first argument! (!trackuser = ADDorREMOVE, @USERMENTION, or just !trackuser)**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Missing Or Invalid Arguments:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 4:
                    msg = _h.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 5:
                    _h.sent();
                    return [2 /*return*/, commandReturnData];
                case 6:
                    if (!(commandData.args[0] !== undefined && (commandData.args[1] === undefined || (!userMentionRegExp.test(commandData.args[1]) && !idRegExp.test(commandData.args[1]))))) return [3 /*break*/, 9];
                    msgString = "------\n**Please enter a valud usermention! (!trackuser = ADDorREMOVE, @USERMENTION, or just !trackuser)**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Missing Or Invalid Arguments:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 7:
                    msg = _h.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 8:
                    _h.sent();
                    return [2 /*return*/, commandReturnData];
                case 9:
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
                    if (!(guildData.trackedUsers !== undefined)) return [3 /*break*/, 15];
                    x = 0;
                    _h.label = 10;
                case 10:
                    if (!(x < guildData.trackedUsers.length)) return [3 /*break*/, 15];
                    isUserFound = false;
                    currentGuild_1 = commandData.guild;
                    if (currentGuild_1 != null) {
                        currentUser = currentGuild_1.members.resolve(guildData.trackedUsers[x].userID);
                        if (currentUser != null) {
                            isUserFound = true;
                            return [3 /*break*/, 14];
                        }
                    }
                    if (!(isUserFound === false)) return [3 /*break*/, 14];
                    msgString = "------\n**Removing user <@!" + guildData.trackedUsers[x].userID + "> (" + ((_a = guildData.trackedUsers[x]) === null || _a === void 0 ? void 0 : _a.userName) + ") from the list of tracked users!**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Missing User(s):**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 11:
                    msg = _h.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    guildData.trackedUsers.splice(x, 1);
                    return [4 /*yield*/, guildData.writeToDataBase()];
                case 12:
                    _h.sent();
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 13:
                    _h.sent();
                    _h.label = 14;
                case 14:
                    x += 1;
                    return [3 /*break*/, 10];
                case 15:
                    currentGuild = commandData.guild;
                    currentTextChannel = commandData.fromTextChannel;
                    return [4 /*yield*/, currentGuild.members.fetch(trackedUserID)];
                case 16:
                    currentGuildMember = _h.sent();
                    if (!(whatAreWeDoing === 'add')) return [3 /*break*/, 28];
                    _h.label = 17;
                case 17:
                    _h.trys.push([17, 24, , 27]);
                    currentIndex = -1;
                    for (x = 0; x < guildData.trackedUsers.length; x += 1) {
                        if (trackedUserID === ((_b = guildData.trackedUsers[x]) === null || _b === void 0 ? void 0 : _b.userID)) {
                            currentIndex = x;
                            break;
                        }
                    }
                    if (!(currentIndex === -1)) return [3 /*break*/, 20];
                    trackedUser = {
                        userName: currentGuildMember.user.username,
                        userID: currentGuildMember.user.id.trim(),
                        channelID: commandData.fromTextChannel.id
                    };
                    guildData.trackedUsers.push(trackedUser);
                    return [4 /*yield*/, guildData.writeToDataBase()];
                case 18:
                    _h.sent();
                    msgString = "" + '------\n__**User:**__ <@!' + currentGuildMember.id.toString() + "> (" + currentGuildMember.user.username + ")\n__** Tracking Channel:**__  <#" + currentTextChannel.id + "> (" + currentTextChannel.name.toString() + ")\n------";
                    messageEmbed = new Discord.MessageEmbed()
                        .setTimestamp(Date())
                        .setTitle('__**New Tracked User:**__')
                        .setDescription(msgString)
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setThumbnail(currentGuildMember.user.avatarURL())
                        .setColor(guildData.borderColor);
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, messageEmbed)];
                case 19:
                    _h.sent();
                    return [3 /*break*/, 23];
                case 20:
                    if (!(currentIndex >= 0)) return [3 /*break*/, 23];
                    currentIndex_1 = -1;
                    for (x = 0; x < guildData.trackedUsers.length; x += 1) {
                        if (trackedUserID === guildData.trackedUsers[x].userID) {
                            currentIndex_1 = x;
                            break;
                        }
                    }
                    guildData.trackedUsers[currentIndex_1].channelID = commandData.fromTextChannel.id;
                    msgString = "------\n**That user is already being tracked! I will update their tracking channel though!**\n------\n__**Tracked User:**__ <@!" + currentGuildMember.id + "> (" + currentGuildMember.user.username + ")\n                        __**Tracking Channel:**__ <#" + ((_c = guildData.trackedUsers[currentIndex_1]) === null || _c === void 0 ? void 0 : _c.channelID) + ">\n------";
                    msgEmbed = new Discord.MessageEmbed();
                    msgEmbed
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle("__**User Already Added:**__");
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 21:
                    _h.sent();
                    return [4 /*yield*/, guildData.writeToDataBase()];
                case 22:
                    _h.sent();
                    _h.label = 23;
                case 23: return [3 /*break*/, 27];
                case 24:
                    error_1 = _h.sent();
                    console.log(error_1);
                    msgString = "------\n**Sorry, but the specified user could not be found!**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**User Issue:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 25:
                    msg = _h.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 26:
                    _h.sent();
                    return [3 /*break*/, 27];
                case 27: return [2 /*return*/, commandReturnData];
                case 28:
                    if (!(whatAreWeDoing === 'remove')) return [3 /*break*/, 43];
                    _h.label = 29;
                case 29:
                    _h.trys.push([29, 39, , 42]);
                    if (!(commandData.args[0].toLowerCase() === 'remove' && guildData.trackedUsers.length >= 1)) return [3 /*break*/, 36];
                    currentIndex = -1;
                    for (x = 0; x < guildData.trackedUsers.length; x += 1) {
                        if (trackedUserID === ((_d = guildData.trackedUsers[x]) === null || _d === void 0 ? void 0 : _d.userID)) {
                            currentIndex = x;
                            break;
                        }
                    }
                    if (!(currentIndex >= 0)) return [3 /*break*/, 32];
                    guildData.trackedUsers.splice(currentIndex, 1);
                    return [4 /*yield*/, guildData.writeToDataBase()];
                case 30:
                    _h.sent();
                    msgString = "------\n__**Tracked User:**__ <@!" + currentGuildMember.id + "> (" + currentGuildMember.user.username + ")\n------";
                    if (guildData.trackedUsers.length === 0) {
                        msgString += '\nNo more users are being tracked!\n------';
                    }
                    messageEmbed = new Discord.MessageEmbed()
                        .setTimestamp(Date())
                        .setTitle('__**Removed Tracked User:**__')
                        .setDescription(msgString)
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor);
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, messageEmbed)];
                case 31:
                    _h.sent();
                    return [3 /*break*/, 35];
                case 32:
                    if (!(currentIndex === -1)) return [3 /*break*/, 35];
                    msgString = "------\n**There is noone by that ID being tracked!**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**User Issue:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 33:
                    msg = _h.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 34:
                    _h.sent();
                    _h.label = 35;
                case 35: return [3 /*break*/, 38];
                case 36:
                    if (!(commandData.args[0].toLowerCase() === 'remove' && guildData.trackedUsers.length === 0)) return [3 /*break*/, 38];
                    msgString = '------\n**There is noone to remove from the tracked users!**\n------';
                    messageEmbed = new Discord.MessageEmbed()
                        .setTimestamp(Date())
                        .setTitle('__**No Tracked Users:**__')
                        .setDescription(msgString)
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor);
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, messageEmbed)];
                case 37:
                    _h.sent();
                    _h.label = 38;
                case 38: return [3 /*break*/, 42];
                case 39:
                    error_2 = _h.sent();
                    msgString = "------\n**Sorry, but the specified user could not be found!**\n------";
                    messageEmbed = new Discord.MessageEmbed()
                        .setTimestamp(Date())
                        .setTitle('__**User Issue:**__')
                        .setDescription(msgString)
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor);
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, messageEmbed)];
                case 40:
                    msg = _h.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 41:
                    _h.sent();
                    return [3 /*break*/, 42];
                case 42: return [2 /*return*/, commandReturnData];
                case 43:
                    if (!(commandData.args[0] === undefined)) return [3 /*break*/, 45];
                    msgString = '';
                    if (guildData.trackedUsers.length > 0) {
                        for (x = 0; x < guildData.trackedUsers.length; x += 1) {
                            if (x === 0) {
                                msgString = '------\n';
                            }
                            trackedChannelName = commandData.guild.client.channels
                                .resolve(guildData.trackedUsers[x].channelID).name;
                            msgString += "__**Tracked User Name #" + (x + 1) + ":**__ <@!" + ((_e = guildData.trackedUsers[x]) === null || _e === void 0 ? void 0 : _e.userID) + "> (" + ((_f = guildData.trackedUsers[x]) === null || _f === void 0 ? void 0 : _f.userName) + ")\n";
                            msgString += "__**In Channel:**__ <#" + ((_g = guildData.trackedUsers[x]) === null || _g === void 0 ? void 0 : _g.channelID) + "> (" + trackedChannelName + ")\n------";
                            if (x < guildData.trackedUsers.length - 1) {
                                msgString += '\n';
                            }
                        }
                    }
                    else {
                        msgString += '------\n**Noone is being tracked, currently!**\n------';
                    }
                    messageEmbed = new Discord.MessageEmbed()
                        .setTitle('__**Tracked Users:**__')
                        .setTimestamp(Date())
                        .setDescription(msgString)
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([254, 254, 254]);
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, messageEmbed)];
                case 44:
                    _h.sent();
                    return [2 /*return*/, commandReturnData];
                case 45: return [2 /*return*/, commandReturnData];
                case 46:
                    error_3 = _h.sent();
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            reject(error_3);
                        })];
                case 47: return [2 /*return*/];
            }
        });
    });
}
command.function = execute;
exports.default = command;
