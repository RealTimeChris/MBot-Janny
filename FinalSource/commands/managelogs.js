// managelogs.ts - Module for my "manage logs" command.
// Mar 11, 2021
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
command.name = 'managelogs';
command.description = '!managelogs, to view an enabled/disabled list of possible logs!';
function execute(commandData, discordUser) {
    return __awaiter(this, void 0, void 0, function () {
        var commandReturnData, areWeInADM, areWeAnAdmin, guildData, fields, x, field, field, msgEmbed, msgString, msgString, _a, x, msgEmbed, msgString_1, x, msgEmbed, msgString_2, x, msgEmbed, msgString_3, x, msgEmbed, msgString_4, x, msgEmbed, msgString_5, x, msgEmbed, msgString_6, x, msgEmbed, msgString_7, x, msgEmbed, msgString_8, x, msgEmbed, msgString_9, x, msgEmbed, msgString_10, x, msgEmbed, msgString_11, x, msgEmbed, msgString_12, x, msgEmbed, msgString_13, x, msgEmbed, msgString_14, x, msgEmbed, msgString_15, x, msgEmbed, msgString_16, x, msgEmbed, msgString_17, x, msgEmbed, msgString_18, x, msgEmbed, msgString_19, x, msgEmbed, msgString_20, x, msgEmbed, msgString_21, x, msgEmbed, msgString_22, x, msgEmbed, msgString_23, x, msgEmbed, msgString_24, x, msgEmbed, msgString_25, x, msgEmbed, msgString_26, x, msgEmbed, msgString_27, x, msgEmbed, msgString_28, msgString, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 177, , 178]);
                    commandReturnData = new DiscordStuff.CommandReturnData();
                    commandReturnData.commandName = command.name;
                    return [4 /*yield*/, DiscordStuff.areWeInADM(commandData)];
                case 1:
                    areWeInADM = _b.sent();
                    if (areWeInADM === true) {
                        return [2 /*return*/, commandReturnData];
                    }
                    return [4 /*yield*/, discordUser.doWeHaveAdminPermission(commandData)];
                case 2:
                    areWeAnAdmin = _b.sent();
                    if (areWeAnAdmin === false) {
                        return [2 /*return*/, commandReturnData];
                    }
                    return [4 /*yield*/, discordUser.getGuildDataFromDB(commandData.guild)];
                case 3:
                    guildData = _b.sent();
                    if (!(commandData.args[0] === undefined)) return [3 /*break*/, 5];
                    fields = [];
                    for (x = 0; x < guildData.logs.length; x += 1) {
                        if (commandData.guildMember.client.channels.resolve(guildData.logs[x].loggingChannelID) === null) {
                            guildData.logs[x].loggingChannelID = '';
                            guildData.logs[x].loggingChannelName = '';
                            guildData.logs[x].enabled = false;
                        }
                        if (guildData.logs[x].enabled === false) {
                            field = { name: "__**" + guildData.logs[x].name + "**__", value: '__Enabled:__ ❌', inline: true };
                            fields.push(field);
                        }
                        else if (guildData.logs[x].enabled === true) {
                            field = { name: "__**" + guildData.logs[x].name + "**__", value: "__Enabled:__ \u2705\n                        \n__Logging Channel:__ <#" + guildData.logs[x].loggingChannelID + ">", inline: true };
                            fields.push(field);
                        }
                    }
                    msgEmbed = new Discord.MessageEmbed();
                    msgString = '';
                    msgString = "**To enable/disable a given log, enter within the text channel where you would like it to be logged: !managelogs = \n                <enable/disable>, <logname>\nFor example, '!managelogs = enable, guildbanadd'.**'";
                    msgEmbed
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs:**__').fields = fields;
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 4:
                    _b.sent();
                    return [3 /*break*/, 176];
                case 5:
                    if (!(commandData.args[0].toLowerCase() !== 'enable' && commandData.args[0].toLowerCase() !== 'disable')) return [3 /*break*/, 6];
                    msgString = "Please, enter enable or disable for the second argument of this command! \n            (!managelogs = <enable/disable>, <logname>)";
                    DiscordStuff.sendMessageWithCorrectChannel(commandData, msgString);
                    return [2 /*return*/, commandReturnData];
                case 6:
                    _a = commandData.args[1].toLowerCase();
                    switch (_a) {
                        case 'guildbanadd': return [3 /*break*/, 7];
                        case 'guildbanremove': return [3 /*break*/, 19];
                        case 'guildmemberadd': return [3 /*break*/, 31];
                        case 'guildmemberremove': return [3 /*break*/, 43];
                        case 'displaynamechange': return [3 /*break*/, 55];
                        case 'nicknamechange': return [3 /*break*/, 67];
                        case 'roleaddorremove': return [3 /*break*/, 79];
                        case 'invitecreate': return [3 /*break*/, 91];
                        case 'messagedelete': return [3 /*break*/, 103];
                        case 'messagedeletebulk': return [3 /*break*/, 115];
                        case 'messageupdate': return [3 /*break*/, 127];
                        case 'rolecreate': return [3 /*break*/, 139];
                        case 'roledelete': return [3 /*break*/, 151];
                        case 'usernamechange': return [3 /*break*/, 163];
                    }
                    return [3 /*break*/, 175];
                case 7:
                    if (!(commandData.args[0].toLowerCase() === 'enable')) return [3 /*break*/, 13];
                    x = 0;
                    _b.label = 8;
                case 8:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 12];
                    if (!(commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 11];
                    guildData.logs[x].loggingChannelID = commandData.permsChannel.id;
                    guildData.logs[x].loggingChannelName = commandData.permsChannel.name;
                    guildData.logs[x].enabled = true;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 9:
                    _b.sent();
                    msgEmbed = new Discord.MessageEmbed();
                    msgString_1 = "Nicely done! You've enabled logging for '" + guildData.logs[x].name + "', \n                                in channel <#" + guildData.logs[x].loggingChannelID + ">.";
                    msgEmbed
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString_1)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Enabled:**__');
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 10:
                    _b.sent();
                    return [3 /*break*/, 12];
                case 11:
                    x += 1;
                    return [3 /*break*/, 8];
                case 12: return [3 /*break*/, 18];
                case 13:
                    if (!(commandData.args[0].toLowerCase() === 'disable')) return [3 /*break*/, 18];
                    x = 0;
                    _b.label = 14;
                case 14:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 18];
                    if (!(commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 17];
                    guildData.logs[x].loggingChannelID = '';
                    guildData.logs[x].loggingChannelName = '';
                    guildData.logs[x].enabled = false;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 15:
                    _b.sent();
                    msgEmbed = new Discord.MessageEmbed();
                    msgString_2 = "Nicely done! You've disabled logging for '" + guildData.logs[x].name + ".";
                    msgEmbed
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString_2)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Disabled:**__');
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 16:
                    _b.sent();
                    return [3 /*break*/, 18];
                case 17:
                    x += 1;
                    return [3 /*break*/, 14];
                case 18: return [3 /*break*/, 176];
                case 19:
                    if (!(commandData.args[0].toLowerCase() === 'enable')) return [3 /*break*/, 25];
                    x = 0;
                    _b.label = 20;
                case 20:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 24];
                    if (!(commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 23];
                    guildData.logs[x].loggingChannelID = commandData.permsChannel.id;
                    guildData.logs[x].loggingChannelName = commandData.permsChannel.name;
                    guildData.logs[x].enabled = true;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 21:
                    _b.sent();
                    msgEmbed = new Discord.MessageEmbed();
                    msgString_3 = "Nicely done! You've enabled logging for '" + guildData.logs[x].name + "', \n                                in channel <#" + guildData.logs[x].loggingChannelID + ">.";
                    msgEmbed
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString_3)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Enabled:**__');
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 22:
                    _b.sent();
                    return [3 /*break*/, 24];
                case 23:
                    x += 1;
                    return [3 /*break*/, 20];
                case 24: return [3 /*break*/, 30];
                case 25:
                    if (!(commandData.args[0].toLowerCase() === 'disable')) return [3 /*break*/, 30];
                    x = 0;
                    _b.label = 26;
                case 26:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 30];
                    if (!(commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 29];
                    guildData.logs[x].loggingChannelID = '';
                    guildData.logs[x].loggingChannelName = '';
                    guildData.logs[x].enabled = false;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 27:
                    _b.sent();
                    msgEmbed = new Discord.MessageEmbed();
                    msgString_4 = "Nicely done! You've disabled logging for '" + guildData.logs[x].name + ".";
                    msgEmbed
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString_4)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Disabled:**__');
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 28:
                    _b.sent();
                    return [3 /*break*/, 30];
                case 29:
                    x += 1;
                    return [3 /*break*/, 26];
                case 30: return [3 /*break*/, 176];
                case 31:
                    if (!(commandData.args[0].toLowerCase() === 'enable')) return [3 /*break*/, 37];
                    x = 0;
                    _b.label = 32;
                case 32:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 36];
                    if (!(commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 35];
                    guildData.logs[x].loggingChannelID = commandData.permsChannel.id;
                    guildData.logs[x].loggingChannelName = commandData.permsChannel.name;
                    guildData.logs[x].enabled = true;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 33:
                    _b.sent();
                    msgEmbed = new Discord.MessageEmbed();
                    msgString_5 = "Nicely done! You've enabled logging for '" + guildData.logs[x].name + "', \n                                in channel <#" + guildData.logs[x].loggingChannelID + ">.";
                    msgEmbed
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString_5)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Enabled:**__');
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 34:
                    _b.sent();
                    return [3 /*break*/, 36];
                case 35:
                    x += 1;
                    return [3 /*break*/, 32];
                case 36: return [3 /*break*/, 42];
                case 37:
                    if (!(commandData.args[0].toLowerCase() === 'disable')) return [3 /*break*/, 42];
                    x = 0;
                    _b.label = 38;
                case 38:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 42];
                    if (!(commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 41];
                    guildData.logs[x].loggingChannelID = '';
                    guildData.logs[x].loggingChannelName = '';
                    guildData.logs[x].enabled = false;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 39:
                    _b.sent();
                    msgEmbed = new Discord.MessageEmbed();
                    msgString_6 = "Nicely done! You've disabled logging for '" + guildData.logs[x].name + ".";
                    msgEmbed
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString_6)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Disabled:**__');
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 40:
                    _b.sent();
                    return [3 /*break*/, 42];
                case 41:
                    x += 1;
                    return [3 /*break*/, 38];
                case 42: return [3 /*break*/, 176];
                case 43:
                    if (!(commandData.args[0].toLowerCase() === 'enable')) return [3 /*break*/, 49];
                    x = 0;
                    _b.label = 44;
                case 44:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 48];
                    if (!(commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 47];
                    guildData.logs[x].loggingChannelID = commandData.permsChannel.id;
                    guildData.logs[x].loggingChannelName = commandData.permsChannel.name;
                    guildData.logs[x].enabled = true;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 45:
                    _b.sent();
                    msgEmbed = new Discord.MessageEmbed();
                    msgString_7 = "Nicely done! You've enabled logging for '" + guildData.logs[x].name + "', \n                            in channel <#" + guildData.logs[x].loggingChannelID + ">.";
                    msgEmbed
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString_7)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Enabled:**__');
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 46:
                    _b.sent();
                    return [3 /*break*/, 48];
                case 47:
                    x += 1;
                    return [3 /*break*/, 44];
                case 48: return [3 /*break*/, 54];
                case 49:
                    if (!(commandData.args[0].toLowerCase() === 'disable')) return [3 /*break*/, 54];
                    x = 0;
                    _b.label = 50;
                case 50:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 54];
                    if (!(commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 53];
                    guildData.logs[x].loggingChannelID = '';
                    guildData.logs[x].loggingChannelName = '';
                    guildData.logs[x].enabled = false;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 51:
                    _b.sent();
                    msgEmbed = new Discord.MessageEmbed();
                    msgString_8 = "Nicely done! You've disabled logging for '" + guildData.logs[x].name + ".";
                    msgEmbed
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString_8)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Disabled:**__');
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 52:
                    _b.sent();
                    return [3 /*break*/, 54];
                case 53:
                    x += 1;
                    return [3 /*break*/, 50];
                case 54: return [3 /*break*/, 176];
                case 55:
                    if (!(commandData.args[0].toLowerCase() === 'enable')) return [3 /*break*/, 61];
                    x = 0;
                    _b.label = 56;
                case 56:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 60];
                    if (!(commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 59];
                    guildData.logs[x].loggingChannelID = commandData.permsChannel.id;
                    guildData.logs[x].loggingChannelName = commandData.permsChannel.name;
                    guildData.logs[x].enabled = true;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 57:
                    _b.sent();
                    msgEmbed = new Discord.MessageEmbed();
                    msgString_9 = "Nicely done! You've enabled logging for '" + guildData.logs[x].name + "', \n                                in channel <#" + guildData.logs[x].loggingChannelID + ">.";
                    msgEmbed
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString_9)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Enabled:**__');
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 58:
                    _b.sent();
                    return [3 /*break*/, 60];
                case 59:
                    x += 1;
                    return [3 /*break*/, 56];
                case 60: return [3 /*break*/, 66];
                case 61:
                    if (!(commandData.args[0].toLowerCase() === 'disable')) return [3 /*break*/, 66];
                    x = 0;
                    _b.label = 62;
                case 62:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 66];
                    if (!(commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 65];
                    guildData.logs[x].loggingChannelID = '';
                    guildData.logs[x].loggingChannelName = '';
                    guildData.logs[x].enabled = false;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 63:
                    _b.sent();
                    msgEmbed = new Discord.MessageEmbed();
                    msgString_10 = "Nicely done! You've disabled logging for '" + guildData.logs[x].name + ".";
                    msgEmbed
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString_10)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Disabled:**__');
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 64:
                    _b.sent();
                    return [3 /*break*/, 66];
                case 65:
                    x += 1;
                    return [3 /*break*/, 62];
                case 66: return [3 /*break*/, 176];
                case 67:
                    if (!(commandData.args[0].toLowerCase() === 'enable')) return [3 /*break*/, 73];
                    x = 0;
                    _b.label = 68;
                case 68:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 72];
                    if (!(commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 71];
                    guildData.logs[x].loggingChannelID = commandData.permsChannel.id;
                    guildData.logs[x].loggingChannelName = commandData.permsChannel.name;
                    guildData.logs[x].enabled = true;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 69:
                    _b.sent();
                    msgEmbed = new Discord.MessageEmbed();
                    msgString_11 = "Nicely done! You've enabled logging for '" + guildData.logs[x].name + "', \n                                in channel <#" + guildData.logs[x].loggingChannelID + ">.";
                    msgEmbed
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString_11)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Enabled:**__');
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 70:
                    _b.sent();
                    return [3 /*break*/, 72];
                case 71:
                    x += 1;
                    return [3 /*break*/, 68];
                case 72: return [3 /*break*/, 78];
                case 73:
                    if (!(commandData.args[0].toLowerCase() === 'disable')) return [3 /*break*/, 78];
                    x = 0;
                    _b.label = 74;
                case 74:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 78];
                    if (!(commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 77];
                    guildData.logs[x].loggingChannelID = '';
                    guildData.logs[x].loggingChannelName = '';
                    guildData.logs[x].enabled = false;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 75:
                    _b.sent();
                    msgEmbed = new Discord.MessageEmbed();
                    msgString_12 = "Nicely done! You've disabled logging for '" + guildData.logs[x].name + ".";
                    msgEmbed
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString_12)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Disabled:**__');
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 76:
                    _b.sent();
                    return [3 /*break*/, 78];
                case 77:
                    x += 1;
                    return [3 /*break*/, 74];
                case 78: return [3 /*break*/, 176];
                case 79:
                    if (!(commandData.args[0].toLowerCase() === 'enable')) return [3 /*break*/, 85];
                    x = 0;
                    _b.label = 80;
                case 80:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 84];
                    if (!(commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 83];
                    guildData.logs[x].loggingChannelID = commandData.permsChannel.id;
                    guildData.logs[x].loggingChannelName = commandData.permsChannel.name;
                    guildData.logs[x].enabled = true;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 81:
                    _b.sent();
                    msgEmbed = new Discord.MessageEmbed();
                    msgString_13 = "Nicely done! You've enabled logging for '" + guildData.logs[x].name + "', \n                                in channel <#" + guildData.logs[x].loggingChannelID + ">.";
                    msgEmbed
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString_13)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Enabled:**__');
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 82:
                    _b.sent();
                    return [3 /*break*/, 84];
                case 83:
                    x += 1;
                    return [3 /*break*/, 80];
                case 84: return [3 /*break*/, 90];
                case 85:
                    if (!(commandData.args[0].toLowerCase() === 'disable')) return [3 /*break*/, 90];
                    x = 0;
                    _b.label = 86;
                case 86:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 90];
                    if (!(commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 89];
                    guildData.logs[x].loggingChannelID = '';
                    guildData.logs[x].loggingChannelName = '';
                    guildData.logs[x].enabled = false;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 87:
                    _b.sent();
                    msgEmbed = new Discord.MessageEmbed();
                    msgString_14 = "Nicely done! You've disabled logging for '" + guildData.logs[x].name + ".";
                    msgEmbed
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString_14)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Disabled:**__');
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 88:
                    _b.sent();
                    return [3 /*break*/, 90];
                case 89:
                    x += 1;
                    return [3 /*break*/, 86];
                case 90: return [3 /*break*/, 176];
                case 91:
                    if (!(commandData.args[0].toLowerCase() === 'enable')) return [3 /*break*/, 97];
                    x = 0;
                    _b.label = 92;
                case 92:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 96];
                    if (!(commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 95];
                    guildData.logs[x].loggingChannelID = commandData.permsChannel.id;
                    guildData.logs[x].loggingChannelName = commandData.permsChannel.name;
                    guildData.logs[x].enabled = true;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 93:
                    _b.sent();
                    msgEmbed = new Discord.MessageEmbed();
                    msgString_15 = "Nicely done! You've enabled logging for '" + guildData.logs[x].name + "', \n                                in channel <#" + guildData.logs[x].loggingChannelID + ">.";
                    msgEmbed
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString_15)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Enabled:**__');
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 94:
                    _b.sent();
                    return [3 /*break*/, 96];
                case 95:
                    x += 1;
                    return [3 /*break*/, 92];
                case 96: return [3 /*break*/, 102];
                case 97:
                    if (!(commandData.args[0].toLowerCase() === 'disable')) return [3 /*break*/, 102];
                    x = 0;
                    _b.label = 98;
                case 98:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 102];
                    if (!(commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 101];
                    guildData.logs[x].loggingChannelID = '';
                    guildData.logs[x].loggingChannelName = '';
                    guildData.logs[x].enabled = false;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 99:
                    _b.sent();
                    msgEmbed = new Discord.MessageEmbed();
                    msgString_16 = "Nicely done! You've disabled logging for '" + guildData.logs[x].name + ".";
                    msgEmbed
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString_16)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Disabled:**__');
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 100:
                    _b.sent();
                    return [3 /*break*/, 102];
                case 101:
                    x += 1;
                    return [3 /*break*/, 98];
                case 102: return [3 /*break*/, 176];
                case 103:
                    if (!(commandData.args[0].toLowerCase() === 'enable')) return [3 /*break*/, 109];
                    x = 0;
                    _b.label = 104;
                case 104:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 108];
                    if (!(commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 107];
                    guildData.logs[x].loggingChannelID = commandData.permsChannel.id;
                    guildData.logs[x].loggingChannelName = commandData.permsChannel.name;
                    guildData.logs[x].enabled = true;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 105:
                    _b.sent();
                    msgEmbed = new Discord.MessageEmbed();
                    msgString_17 = "Nicely done! You've enabled logging for '" + guildData.logs[x].name + "', \n                                in channel <#" + guildData.logs[x].loggingChannelID + ">.";
                    msgEmbed
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString_17)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Enabled:**__');
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 106:
                    _b.sent();
                    return [3 /*break*/, 108];
                case 107:
                    x += 1;
                    return [3 /*break*/, 104];
                case 108: return [3 /*break*/, 114];
                case 109:
                    if (!(commandData.args[0].toLowerCase() === 'disable')) return [3 /*break*/, 114];
                    x = 0;
                    _b.label = 110;
                case 110:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 114];
                    if (!(commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 113];
                    guildData.logs[x].loggingChannelID = '';
                    guildData.logs[x].loggingChannelName = '';
                    guildData.logs[x].enabled = false;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 111:
                    _b.sent();
                    msgEmbed = new Discord.MessageEmbed();
                    msgString_18 = "Nicely done! You've disabled logging for '" + guildData.logs[x].name + ".";
                    msgEmbed
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString_18)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Disabled:**__');
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 112:
                    _b.sent();
                    return [3 /*break*/, 114];
                case 113:
                    x += 1;
                    return [3 /*break*/, 110];
                case 114: return [3 /*break*/, 176];
                case 115:
                    if (!(commandData.args[0].toLowerCase() === 'enable')) return [3 /*break*/, 121];
                    x = 0;
                    _b.label = 116;
                case 116:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 120];
                    if (!(commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 119];
                    guildData.logs[x].loggingChannelID = commandData.permsChannel.id;
                    guildData.logs[x].loggingChannelName = commandData.permsChannel.name;
                    guildData.logs[x].enabled = true;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 117:
                    _b.sent();
                    msgEmbed = new Discord.MessageEmbed();
                    msgString_19 = "Nicely done! You've enabled logging for '" + guildData.logs[x].name + "', \n                                in channel <#" + guildData.logs[x].loggingChannelID + ">.";
                    msgEmbed
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString_19)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Enabled:**__');
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 118:
                    _b.sent();
                    return [3 /*break*/, 120];
                case 119:
                    x += 1;
                    return [3 /*break*/, 116];
                case 120: return [3 /*break*/, 126];
                case 121:
                    if (!(commandData.args[0].toLowerCase() === 'disable')) return [3 /*break*/, 126];
                    x = 0;
                    _b.label = 122;
                case 122:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 126];
                    if (!(commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 125];
                    guildData.logs[x].loggingChannelID = '';
                    guildData.logs[x].loggingChannelName = '';
                    guildData.logs[x].enabled = false;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 123:
                    _b.sent();
                    msgEmbed = new Discord.MessageEmbed();
                    msgString_20 = "Nicely done! You've disabled logging for '" + guildData.logs[x].name + ".";
                    msgEmbed
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString_20)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Disabled:**__');
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 124:
                    _b.sent();
                    return [3 /*break*/, 126];
                case 125:
                    x += 1;
                    return [3 /*break*/, 122];
                case 126: return [3 /*break*/, 176];
                case 127:
                    if (!(commandData.args[0].toLowerCase() === 'enable')) return [3 /*break*/, 133];
                    x = 0;
                    _b.label = 128;
                case 128:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 132];
                    if (!(commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 131];
                    guildData.logs[x].loggingChannelID = commandData.permsChannel.id;
                    guildData.logs[x].loggingChannelName = commandData.permsChannel.name;
                    guildData.logs[x].enabled = true;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 129:
                    _b.sent();
                    msgEmbed = new Discord.MessageEmbed();
                    msgString_21 = "Nicely done! You've enabled logging for '" + guildData.logs[x].name + "', \n                                in channel <#" + guildData.logs[x].loggingChannelID + ">.";
                    msgEmbed
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString_21)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Enabled:**__');
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 130:
                    _b.sent();
                    return [3 /*break*/, 132];
                case 131:
                    x += 1;
                    return [3 /*break*/, 128];
                case 132: return [3 /*break*/, 138];
                case 133:
                    if (!(commandData.args[0].toLowerCase() === 'disable')) return [3 /*break*/, 138];
                    x = 0;
                    _b.label = 134;
                case 134:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 138];
                    if (!(commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 137];
                    guildData.logs[x].loggingChannelID = '';
                    guildData.logs[x].loggingChannelName = '';
                    guildData.logs[x].enabled = false;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 135:
                    _b.sent();
                    msgEmbed = new Discord.MessageEmbed();
                    msgString_22 = "Nicely done! You've disabled logging for '" + guildData.logs[x].name + ".";
                    msgEmbed
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString_22)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Disabled:**__');
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 136:
                    _b.sent();
                    return [3 /*break*/, 138];
                case 137:
                    x += 1;
                    return [3 /*break*/, 134];
                case 138: return [3 /*break*/, 176];
                case 139:
                    if (!(commandData.args[0].toLowerCase() === 'enable')) return [3 /*break*/, 145];
                    x = 0;
                    _b.label = 140;
                case 140:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 144];
                    if (!(commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 143];
                    guildData.logs[x].loggingChannelID = commandData.permsChannel.id;
                    guildData.logs[x].loggingChannelName = commandData.permsChannel.name;
                    guildData.logs[x].enabled = true;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 141:
                    _b.sent();
                    msgEmbed = new Discord.MessageEmbed();
                    msgString_23 = "Nicely done! You've enabled logging for '" + guildData.logs[x].name + "', \n                                in channel <#" + guildData.logs[x].loggingChannelID + ">.";
                    msgEmbed
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString_23)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Enabled:**__');
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 142:
                    _b.sent();
                    return [3 /*break*/, 144];
                case 143:
                    x += 1;
                    return [3 /*break*/, 140];
                case 144: return [3 /*break*/, 150];
                case 145:
                    if (!(commandData.args[0].toLowerCase() === 'disable')) return [3 /*break*/, 150];
                    x = 0;
                    _b.label = 146;
                case 146:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 150];
                    if (!(commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 149];
                    guildData.logs[x].loggingChannelID = '';
                    guildData.logs[x].loggingChannelName = '';
                    guildData.logs[x].enabled = false;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 147:
                    _b.sent();
                    msgEmbed = new Discord.MessageEmbed();
                    msgString_24 = "Nicely done! You've disabled logging for '" + guildData.logs[x].name + ".";
                    msgEmbed
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString_24)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Disabled:**__');
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 148:
                    _b.sent();
                    return [3 /*break*/, 150];
                case 149:
                    x += 1;
                    return [3 /*break*/, 146];
                case 150: return [3 /*break*/, 176];
                case 151:
                    if (!(commandData.args[0].toLowerCase() === 'enable')) return [3 /*break*/, 157];
                    x = 0;
                    _b.label = 152;
                case 152:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 156];
                    if (!(commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 155];
                    guildData.logs[x].loggingChannelID = commandData.permsChannel.id;
                    guildData.logs[x].loggingChannelName = commandData.permsChannel.name;
                    guildData.logs[x].enabled = true;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 153:
                    _b.sent();
                    msgEmbed = new Discord.MessageEmbed();
                    msgString_25 = "Nicely done! You've enabled logging for '" + guildData.logs[x].name + "', \n                                in channel <#" + guildData.logs[x].loggingChannelID + ">.";
                    msgEmbed
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString_25)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Enabled:**__');
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 154:
                    _b.sent();
                    return [3 /*break*/, 156];
                case 155:
                    x += 1;
                    return [3 /*break*/, 152];
                case 156: return [3 /*break*/, 162];
                case 157:
                    if (!(commandData.args[0].toLowerCase() === 'disable')) return [3 /*break*/, 162];
                    x = 0;
                    _b.label = 158;
                case 158:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 162];
                    if (!(commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 161];
                    guildData.logs[x].loggingChannelID = '';
                    guildData.logs[x].loggingChannelName = '';
                    guildData.logs[x].enabled = false;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 159:
                    _b.sent();
                    msgEmbed = new Discord.MessageEmbed();
                    msgString_26 = "Nicely done! You've disabled logging for '" + guildData.logs[x].name + ".";
                    msgEmbed
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString_26)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Disabled:**__');
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 160:
                    _b.sent();
                    return [3 /*break*/, 162];
                case 161:
                    x += 1;
                    return [3 /*break*/, 158];
                case 162: return [3 /*break*/, 176];
                case 163:
                    if (!(commandData.args[0].toLowerCase() === 'enable')) return [3 /*break*/, 169];
                    x = 0;
                    _b.label = 164;
                case 164:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 168];
                    if (!(commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 167];
                    guildData.logs[x].loggingChannelID = commandData.permsChannel.id;
                    guildData.logs[x].loggingChannelName = commandData.permsChannel.name;
                    guildData.logs[x].enabled = true;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 165:
                    _b.sent();
                    msgEmbed = new Discord.MessageEmbed();
                    msgString_27 = "Nicely done! You've enabled logging for '" + guildData.logs[x].name + "', \n                                in channel <#" + guildData.logs[x].loggingChannelID + ">.";
                    msgEmbed
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString_27)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Enabled:**__');
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 166:
                    _b.sent();
                    return [3 /*break*/, 168];
                case 167:
                    x += 1;
                    return [3 /*break*/, 164];
                case 168: return [3 /*break*/, 174];
                case 169:
                    if (!(commandData.args[0].toLowerCase() === 'disable')) return [3 /*break*/, 174];
                    x = 0;
                    _b.label = 170;
                case 170:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 174];
                    if (!(commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 173];
                    guildData.logs[x].loggingChannelID = '';
                    guildData.logs[x].loggingChannelName = '';
                    guildData.logs[x].enabled = false;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 171:
                    _b.sent();
                    msgEmbed = new Discord.MessageEmbed();
                    msgString_28 = "Nicely done! You've disabled logging for '" + guildData.logs[x].name + ".";
                    msgEmbed
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString_28)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Disabled:**__');
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 172:
                    _b.sent();
                    return [3 /*break*/, 174];
                case 173:
                    x += 1;
                    return [3 /*break*/, 170];
                case 174: return [3 /*break*/, 176];
                case 175:
                    msgString = 'Please enter a proper log name!';
                    DiscordStuff.sendMessageWithCorrectChannel(commandData, msgString);
                    return [2 /*return*/, commandReturnData];
                case 176: return [2 /*return*/, commandReturnData];
                case 177:
                    error_1 = _b.sent();
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            reject(error_1);
                        })];
                case 178: return [2 /*return*/];
            }
        });
    });
}
exports.execute = execute;
command.function = execute;
exports.default = command;
