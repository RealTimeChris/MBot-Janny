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
    var _a, _b;
    return __awaiter(this, void 0, void 0, function () {
        var commandReturnData, areWeInADM, areWeAnAdmin, guildData, fields, x, field, field, msgEmbed, msgString, msgString, msgEmbed, msgString, msgEmbed, _c, x, msgEmbed_1, msgString_1, x, msgEmbed_2, msgString_2, x, msgEmbed_3, msgString_3, x, msgEmbed_4, msgString_4, x, msgEmbed_5, msgString_5, x, msgEmbed_6, msgString_6, x, msgEmbed_7, msgString_7, x, msgEmbed_8, msgString_8, x, msgEmbed_9, msgString_9, x, msgEmbed_10, msgString_10, x, msgEmbed_11, msgString_11, x, msgEmbed_12, msgString_12, x, msgEmbed_13, msgString_13, x, msgEmbed_14, msgString_14, x, msgEmbed_15, msgString_15, x, msgEmbed_16, msgString_16, x, msgEmbed_17, msgString_17, x, msgEmbed_18, msgString_18, x, msgEmbed_19, msgString_19, x, msgEmbed_20, msgString_20, x, msgEmbed_21, msgString_21, x, msgEmbed_22, msgString_22, x, msgEmbed_23, msgString_23, x, msgEmbed_24, msgString_24, x, msgEmbed_25, msgString_25, x, msgEmbed_26, msgString_26, x, msgEmbed_27, msgString_27, x, msgEmbed_28, msgString_28, msgString, msgEmbed, error_1;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _d.trys.push([0, 181, , 182]);
                    commandReturnData = new DiscordStuff.CommandReturnData();
                    commandReturnData.commandName = command.name;
                    return [4 /*yield*/, DiscordStuff.areWeInADM(commandData)];
                case 1:
                    areWeInADM = _d.sent();
                    if (areWeInADM === true) {
                        return [2 /*return*/, commandReturnData];
                    }
                    return [4 /*yield*/, discordUser.doWeHaveAdminPermission(commandData)];
                case 2:
                    areWeAnAdmin = _d.sent();
                    if (areWeAnAdmin === false) {
                        return [2 /*return*/, commandReturnData];
                    }
                    return [4 /*yield*/, discordUser.getGuildDataFromDB(commandData.guild)];
                case 3:
                    guildData = _d.sent();
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
                    _d.sent();
                    return [3 /*break*/, 180];
                case 5:
                    if (!(commandData.args[0].toString().toLowerCase() !== 'enable' && commandData.args[0].toString().toLowerCase() !== 'disable')) return [3 /*break*/, 7];
                    msgString = "------\n**Please, enter enable or disable for the first argument of this command! \n            (!managelogs = <enable/disable>, <logname>)**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor((_a = commandData.guildMember) === null || _a === void 0 ? void 0 : _a.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Missing Or Invalid Arguments:**__');
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 6:
                    _d.sent();
                    return [2 /*return*/, commandReturnData];
                case 7:
                    if (!(commandData.args[1] === undefined)) return [3 /*break*/, 9];
                    msgString = "------\n**Please, enter  a log name to disable or enable as the second argument of this command! \n            (!managelogs = <enable/disable>, <logname>)**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor((_b = commandData.guildMember) === null || _b === void 0 ? void 0 : _b.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Missing Or Invalid Arguments:**__');
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 8:
                    _d.sent();
                    return [2 /*return*/, commandReturnData];
                case 9:
                    _c = commandData.args[1].toLowerCase();
                    switch (_c) {
                        case 'guildbanadd': return [3 /*break*/, 10];
                        case 'guildbanremove': return [3 /*break*/, 22];
                        case 'guildmemberadd': return [3 /*break*/, 34];
                        case 'guildmemberremove': return [3 /*break*/, 46];
                        case 'displaynamechange': return [3 /*break*/, 58];
                        case 'nicknamechange': return [3 /*break*/, 70];
                        case 'roleaddorremove': return [3 /*break*/, 82];
                        case 'invitecreate': return [3 /*break*/, 94];
                        case 'messagedelete': return [3 /*break*/, 106];
                        case 'messagedeletebulk': return [3 /*break*/, 118];
                        case 'messageupdate': return [3 /*break*/, 130];
                        case 'rolecreate': return [3 /*break*/, 142];
                        case 'roledelete': return [3 /*break*/, 154];
                        case 'usernamechange': return [3 /*break*/, 166];
                    }
                    return [3 /*break*/, 178];
                case 10:
                    if (!(commandData.args[0].toString().toLowerCase() === 'enable')) return [3 /*break*/, 16];
                    x = 0;
                    _d.label = 11;
                case 11:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 15];
                    if (!(commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 14];
                    guildData.logs[x].loggingChannelID = commandData.permsChannel.id;
                    guildData.logs[x].loggingChannelName = commandData.permsChannel.name;
                    guildData.logs[x].enabled = true;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 12:
                    _d.sent();
                    msgEmbed_1 = new Discord.MessageEmbed();
                    msgString_1 = "------\n**Nicely done! You've enabled logging for '" + guildData.logs[x].name + "'.\nIn channel <#" + guildData.logs[x].loggingChannelID + ">.**\n------";
                    msgEmbed_1
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString_1)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Enabled:**__');
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed_1)];
                case 13:
                    _d.sent();
                    return [3 /*break*/, 15];
                case 14:
                    x += 1;
                    return [3 /*break*/, 11];
                case 15: return [3 /*break*/, 21];
                case 16:
                    if (!(commandData.args[0].toString().toLowerCase() === 'disable')) return [3 /*break*/, 21];
                    x = 0;
                    _d.label = 17;
                case 17:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 21];
                    if (!(commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 20];
                    guildData.logs[x].loggingChannelID = '';
                    guildData.logs[x].loggingChannelName = '';
                    guildData.logs[x].enabled = false;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 18:
                    _d.sent();
                    msgEmbed_2 = new Discord.MessageEmbed();
                    msgString_2 = "------\n**Nicely done! You've disabled logging for '" + guildData.logs[x].name + "'.**\n------";
                    msgEmbed_2
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString_2)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Disabled:**__');
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed_2)];
                case 19:
                    _d.sent();
                    return [3 /*break*/, 21];
                case 20:
                    x += 1;
                    return [3 /*break*/, 17];
                case 21: return [3 /*break*/, 180];
                case 22:
                    if (!(commandData.args[0].toString().toLowerCase() === 'enable')) return [3 /*break*/, 28];
                    x = 0;
                    _d.label = 23;
                case 23:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 27];
                    if (!(commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 26];
                    guildData.logs[x].loggingChannelID = commandData.permsChannel.id;
                    guildData.logs[x].loggingChannelName = commandData.permsChannel.name;
                    guildData.logs[x].enabled = true;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 24:
                    _d.sent();
                    msgEmbed_3 = new Discord.MessageEmbed();
                    msgString_3 = "------\n**Nicely done! You've enabled logging for '" + guildData.logs[x].name + "'.\nIn channel <#" + guildData.logs[x].loggingChannelID + ">.**\n------";
                    msgEmbed_3
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString_3)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Enabled:**__');
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed_3)];
                case 25:
                    _d.sent();
                    return [3 /*break*/, 27];
                case 26:
                    x += 1;
                    return [3 /*break*/, 23];
                case 27: return [3 /*break*/, 33];
                case 28:
                    if (!(commandData.args[0].toString().toLowerCase() === 'disable')) return [3 /*break*/, 33];
                    x = 0;
                    _d.label = 29;
                case 29:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 33];
                    if (!(commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 32];
                    guildData.logs[x].loggingChannelID = '';
                    guildData.logs[x].loggingChannelName = '';
                    guildData.logs[x].enabled = false;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 30:
                    _d.sent();
                    msgEmbed_4 = new Discord.MessageEmbed();
                    msgString_4 = "------\n**Nicely done! You've disabled logging for '" + guildData.logs[x].name + "'.**\n------";
                    msgEmbed_4
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString_4)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Disabled:**__');
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed_4)];
                case 31:
                    _d.sent();
                    return [3 /*break*/, 33];
                case 32:
                    x += 1;
                    return [3 /*break*/, 29];
                case 33: return [3 /*break*/, 180];
                case 34:
                    if (!(commandData.args[0].toString().toLowerCase() === 'enable')) return [3 /*break*/, 40];
                    x = 0;
                    _d.label = 35;
                case 35:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 39];
                    if (!(commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 38];
                    guildData.logs[x].loggingChannelID = commandData.permsChannel.id;
                    guildData.logs[x].loggingChannelName = commandData.permsChannel.name;
                    guildData.logs[x].enabled = true;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 36:
                    _d.sent();
                    msgEmbed_5 = new Discord.MessageEmbed();
                    msgString_5 = "------\n**Nicely done! You've enabled logging for '" + guildData.logs[x].name + "'.\nIn channel <#" + guildData.logs[x].loggingChannelID + ">.**\n------";
                    msgEmbed_5
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString_5)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Enabled:**__');
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed_5)];
                case 37:
                    _d.sent();
                    return [3 /*break*/, 39];
                case 38:
                    x += 1;
                    return [3 /*break*/, 35];
                case 39: return [3 /*break*/, 45];
                case 40:
                    if (!(commandData.args[0].toString().toLowerCase() === 'disable')) return [3 /*break*/, 45];
                    x = 0;
                    _d.label = 41;
                case 41:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 45];
                    if (!(commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 44];
                    guildData.logs[x].loggingChannelID = '';
                    guildData.logs[x].loggingChannelName = '';
                    guildData.logs[x].enabled = false;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 42:
                    _d.sent();
                    msgEmbed_6 = new Discord.MessageEmbed();
                    msgString_6 = "------\n**Nicely done! You've disabled logging for '" + guildData.logs[x].name + "'.**\n------";
                    msgEmbed_6
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString_6)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Disabled:**__');
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed_6)];
                case 43:
                    _d.sent();
                    return [3 /*break*/, 45];
                case 44:
                    x += 1;
                    return [3 /*break*/, 41];
                case 45: return [3 /*break*/, 180];
                case 46:
                    if (!(commandData.args[0].toString().toLowerCase() === 'enable')) return [3 /*break*/, 52];
                    x = 0;
                    _d.label = 47;
                case 47:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 51];
                    if (!(commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 50];
                    guildData.logs[x].loggingChannelID = commandData.permsChannel.id;
                    guildData.logs[x].loggingChannelName = commandData.permsChannel.name;
                    guildData.logs[x].enabled = true;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 48:
                    _d.sent();
                    msgEmbed_7 = new Discord.MessageEmbed();
                    msgString_7 = "------\n**Nicely done! You've enabled logging for '" + guildData.logs[x].name + "' in channel <#" + guildData.logs[x].loggingChannelID + ">.**\n------'";
                    msgEmbed_7
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString_7)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Enabled:**__');
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed_7)];
                case 49:
                    _d.sent();
                    return [3 /*break*/, 51];
                case 50:
                    x += 1;
                    return [3 /*break*/, 47];
                case 51: return [3 /*break*/, 57];
                case 52:
                    if (!(commandData.args[0].toString().toLowerCase() === 'disable')) return [3 /*break*/, 57];
                    x = 0;
                    _d.label = 53;
                case 53:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 57];
                    if (!(commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 56];
                    guildData.logs[x].loggingChannelID = '';
                    guildData.logs[x].loggingChannelName = '';
                    guildData.logs[x].enabled = false;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 54:
                    _d.sent();
                    msgEmbed_8 = new Discord.MessageEmbed();
                    msgString_8 = "------\n**Nicely done! You've disabled logging for '" + guildData.logs[x].name + "'.**\n------";
                    msgEmbed_8
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString_8)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Disabled:**__');
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed_8)];
                case 55:
                    _d.sent();
                    return [3 /*break*/, 57];
                case 56:
                    x += 1;
                    return [3 /*break*/, 53];
                case 57: return [3 /*break*/, 180];
                case 58:
                    if (!(commandData.args[0].toString().toLowerCase() === 'enable')) return [3 /*break*/, 64];
                    x = 0;
                    _d.label = 59;
                case 59:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 63];
                    if (!(commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 62];
                    guildData.logs[x].loggingChannelID = commandData.permsChannel.id;
                    guildData.logs[x].loggingChannelName = commandData.permsChannel.name;
                    guildData.logs[x].enabled = true;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 60:
                    _d.sent();
                    msgEmbed_9 = new Discord.MessageEmbed();
                    msgString_9 = "------\n**Nicely done! You've enabled logging for '" + guildData.logs[x].name + "'.\nIn channel <#" + guildData.logs[x].loggingChannelID + ">.**\n------";
                    msgEmbed_9
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString_9)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Enabled:**__');
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed_9)];
                case 61:
                    _d.sent();
                    return [3 /*break*/, 63];
                case 62:
                    x += 1;
                    return [3 /*break*/, 59];
                case 63: return [3 /*break*/, 69];
                case 64:
                    if (!(commandData.args[0].toString().toLowerCase() === 'disable')) return [3 /*break*/, 69];
                    x = 0;
                    _d.label = 65;
                case 65:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 69];
                    if (!(commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 68];
                    guildData.logs[x].loggingChannelID = '';
                    guildData.logs[x].loggingChannelName = '';
                    guildData.logs[x].enabled = false;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 66:
                    _d.sent();
                    msgEmbed_10 = new Discord.MessageEmbed();
                    msgString_10 = "------\n**Nicely done! You've disabled logging for '" + guildData.logs[x].name + "'.**\n------";
                    msgEmbed_10
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString_10)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Disabled:**__');
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed_10)];
                case 67:
                    _d.sent();
                    return [3 /*break*/, 69];
                case 68:
                    x += 1;
                    return [3 /*break*/, 65];
                case 69: return [3 /*break*/, 180];
                case 70:
                    if (!(commandData.args[0].toString().toLowerCase() === 'enable')) return [3 /*break*/, 76];
                    x = 0;
                    _d.label = 71;
                case 71:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 75];
                    if (!(commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 74];
                    guildData.logs[x].loggingChannelID = commandData.permsChannel.id;
                    guildData.logs[x].loggingChannelName = commandData.permsChannel.name;
                    guildData.logs[x].enabled = true;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 72:
                    _d.sent();
                    msgEmbed_11 = new Discord.MessageEmbed();
                    msgString_11 = "------\n**Nicely done! You've enabled logging for '" + guildData.logs[x].name + "'.\nIn channel <#" + guildData.logs[x].loggingChannelID + ">.**\n------";
                    msgEmbed_11
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString_11)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Enabled:**__');
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed_11)];
                case 73:
                    _d.sent();
                    return [3 /*break*/, 75];
                case 74:
                    x += 1;
                    return [3 /*break*/, 71];
                case 75: return [3 /*break*/, 81];
                case 76:
                    if (!(commandData.args[0].toString().toLowerCase() === 'disable')) return [3 /*break*/, 81];
                    x = 0;
                    _d.label = 77;
                case 77:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 81];
                    if (!(commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 80];
                    guildData.logs[x].loggingChannelID = '';
                    guildData.logs[x].loggingChannelName = '';
                    guildData.logs[x].enabled = false;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 78:
                    _d.sent();
                    msgEmbed_12 = new Discord.MessageEmbed();
                    msgString_12 = "------\n**Nicely done! You've disabled logging for '" + guildData.logs[x].name + "'.**\n------";
                    msgEmbed_12
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString_12)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Disabled:**__');
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed_12)];
                case 79:
                    _d.sent();
                    return [3 /*break*/, 81];
                case 80:
                    x += 1;
                    return [3 /*break*/, 77];
                case 81: return [3 /*break*/, 180];
                case 82:
                    if (!(commandData.args[0].toString().toLowerCase() === 'enable')) return [3 /*break*/, 88];
                    x = 0;
                    _d.label = 83;
                case 83:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 87];
                    if (!(commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 86];
                    guildData.logs[x].loggingChannelID = commandData.permsChannel.id;
                    guildData.logs[x].loggingChannelName = commandData.permsChannel.name;
                    guildData.logs[x].enabled = true;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 84:
                    _d.sent();
                    msgEmbed_13 = new Discord.MessageEmbed();
                    msgString_13 = "------\n**Nicely done! You've enabled logging for '" + guildData.logs[x].name + "'.\nIn channel <#" + guildData.logs[x].loggingChannelID + ">.**\n------";
                    msgEmbed_13
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString_13)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Enabled:**__');
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed_13)];
                case 85:
                    _d.sent();
                    return [3 /*break*/, 87];
                case 86:
                    x += 1;
                    return [3 /*break*/, 83];
                case 87: return [3 /*break*/, 93];
                case 88:
                    if (!(commandData.args[0].toString().toLowerCase() === 'disable')) return [3 /*break*/, 93];
                    x = 0;
                    _d.label = 89;
                case 89:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 93];
                    if (!(commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 92];
                    guildData.logs[x].loggingChannelID = '';
                    guildData.logs[x].loggingChannelName = '';
                    guildData.logs[x].enabled = false;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 90:
                    _d.sent();
                    msgEmbed_14 = new Discord.MessageEmbed();
                    msgString_14 = "------\n**Nicely done! You've disabled logging for '" + guildData.logs[x].name + "'.**\n------";
                    msgEmbed_14
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString_14)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Disabled:**__');
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed_14)];
                case 91:
                    _d.sent();
                    return [3 /*break*/, 93];
                case 92:
                    x += 1;
                    return [3 /*break*/, 89];
                case 93: return [3 /*break*/, 180];
                case 94:
                    if (!(commandData.args[0].toString().toLowerCase() === 'enable')) return [3 /*break*/, 100];
                    x = 0;
                    _d.label = 95;
                case 95:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 99];
                    if (!(commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 98];
                    guildData.logs[x].loggingChannelID = commandData.permsChannel.id;
                    guildData.logs[x].loggingChannelName = commandData.permsChannel.name;
                    guildData.logs[x].enabled = true;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 96:
                    _d.sent();
                    msgEmbed_15 = new Discord.MessageEmbed();
                    msgString_15 = "------\n**Nicely done! You've enabled logging for '" + guildData.logs[x].name + "'.\nIn channel <#" + guildData.logs[x].loggingChannelID + ">.**\n------";
                    msgEmbed_15
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString_15)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Enabled:**__');
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed_15)];
                case 97:
                    _d.sent();
                    return [3 /*break*/, 99];
                case 98:
                    x += 1;
                    return [3 /*break*/, 95];
                case 99: return [3 /*break*/, 105];
                case 100:
                    if (!(commandData.args[0].toString().toLowerCase() === 'disable')) return [3 /*break*/, 105];
                    x = 0;
                    _d.label = 101;
                case 101:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 105];
                    if (!(commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 104];
                    guildData.logs[x].loggingChannelID = '';
                    guildData.logs[x].loggingChannelName = '';
                    guildData.logs[x].enabled = false;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 102:
                    _d.sent();
                    msgEmbed_16 = new Discord.MessageEmbed();
                    msgString_16 = "------\n**Nicely done! You've disabled logging for '" + guildData.logs[x].name + "'.**\n------";
                    msgEmbed_16
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString_16)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Disabled:**__');
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed_16)];
                case 103:
                    _d.sent();
                    return [3 /*break*/, 105];
                case 104:
                    x += 1;
                    return [3 /*break*/, 101];
                case 105: return [3 /*break*/, 180];
                case 106:
                    if (!(commandData.args[0].toString().toLowerCase() === 'enable')) return [3 /*break*/, 112];
                    x = 0;
                    _d.label = 107;
                case 107:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 111];
                    if (!(commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 110];
                    guildData.logs[x].loggingChannelID = commandData.permsChannel.id;
                    guildData.logs[x].loggingChannelName = commandData.permsChannel.name;
                    guildData.logs[x].enabled = true;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 108:
                    _d.sent();
                    msgEmbed_17 = new Discord.MessageEmbed();
                    msgString_17 = "------\n**Nicely done! You've enabled logging for '" + guildData.logs[x].name + "'.\nIn channel <#" + guildData.logs[x].loggingChannelID + ">.**\n------";
                    msgEmbed_17
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString_17)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Enabled:**__');
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed_17)];
                case 109:
                    _d.sent();
                    return [3 /*break*/, 111];
                case 110:
                    x += 1;
                    return [3 /*break*/, 107];
                case 111: return [3 /*break*/, 117];
                case 112:
                    if (!(commandData.args[0].toString().toLowerCase() === 'disable')) return [3 /*break*/, 117];
                    x = 0;
                    _d.label = 113;
                case 113:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 117];
                    if (!(commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 116];
                    guildData.logs[x].loggingChannelID = '';
                    guildData.logs[x].loggingChannelName = '';
                    guildData.logs[x].enabled = false;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 114:
                    _d.sent();
                    msgEmbed_18 = new Discord.MessageEmbed();
                    msgString_18 = "------\n**Nicely done! You've disabled logging for '" + guildData.logs[x].name + "'.**\n------";
                    msgEmbed_18
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString_18)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Disabled:**__');
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed_18)];
                case 115:
                    _d.sent();
                    return [3 /*break*/, 117];
                case 116:
                    x += 1;
                    return [3 /*break*/, 113];
                case 117: return [3 /*break*/, 180];
                case 118:
                    if (!(commandData.args[0].toString().toLowerCase() === 'enable')) return [3 /*break*/, 124];
                    x = 0;
                    _d.label = 119;
                case 119:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 123];
                    if (!(commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 122];
                    guildData.logs[x].loggingChannelID = commandData.permsChannel.id;
                    guildData.logs[x].loggingChannelName = commandData.permsChannel.name;
                    guildData.logs[x].enabled = true;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 120:
                    _d.sent();
                    msgEmbed_19 = new Discord.MessageEmbed();
                    msgString_19 = "------\n**Nicely done! You've enabled logging for '" + guildData.logs[x].name + "'.\nIn channel <#" + guildData.logs[x].loggingChannelID + ">.**\n------";
                    msgEmbed_19
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString_19)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Enabled:**__');
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed_19)];
                case 121:
                    _d.sent();
                    return [3 /*break*/, 123];
                case 122:
                    x += 1;
                    return [3 /*break*/, 119];
                case 123: return [3 /*break*/, 129];
                case 124:
                    if (!(commandData.args[0].toString().toLowerCase() === 'disable')) return [3 /*break*/, 129];
                    x = 0;
                    _d.label = 125;
                case 125:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 129];
                    if (!(commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 128];
                    guildData.logs[x].loggingChannelID = '';
                    guildData.logs[x].loggingChannelName = '';
                    guildData.logs[x].enabled = false;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 126:
                    _d.sent();
                    msgEmbed_20 = new Discord.MessageEmbed();
                    msgString_20 = "------\n**Nicely done! You've disabled logging for '" + guildData.logs[x].name + "'.**\n------";
                    msgEmbed_20
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString_20)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Disabled:**__');
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed_20)];
                case 127:
                    _d.sent();
                    return [3 /*break*/, 129];
                case 128:
                    x += 1;
                    return [3 /*break*/, 125];
                case 129: return [3 /*break*/, 180];
                case 130:
                    if (!(commandData.args[0].toString().toLowerCase() === 'enable')) return [3 /*break*/, 136];
                    x = 0;
                    _d.label = 131;
                case 131:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 135];
                    if (!(commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 134];
                    guildData.logs[x].loggingChannelID = commandData.permsChannel.id;
                    guildData.logs[x].loggingChannelName = commandData.permsChannel.name;
                    guildData.logs[x].enabled = true;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 132:
                    _d.sent();
                    msgEmbed_21 = new Discord.MessageEmbed();
                    msgString_21 = "------\n**Nicely done! You've enabled logging for '" + guildData.logs[x].name + "'.\nIn channel <#" + guildData.logs[x].loggingChannelID + ">.**\n------";
                    msgEmbed_21
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString_21)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Enabled:**__');
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed_21)];
                case 133:
                    _d.sent();
                    return [3 /*break*/, 135];
                case 134:
                    x += 1;
                    return [3 /*break*/, 131];
                case 135: return [3 /*break*/, 141];
                case 136:
                    if (!(commandData.args[0].toString().toLowerCase() === 'disable')) return [3 /*break*/, 141];
                    x = 0;
                    _d.label = 137;
                case 137:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 141];
                    if (!(commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 140];
                    guildData.logs[x].loggingChannelID = '';
                    guildData.logs[x].loggingChannelName = '';
                    guildData.logs[x].enabled = false;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 138:
                    _d.sent();
                    msgEmbed_22 = new Discord.MessageEmbed();
                    msgString_22 = "------\n**Nicely done! You've disabled logging for '" + guildData.logs[x].name + "'.**\n------";
                    msgEmbed_22
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString_22)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Disabled:**__');
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed_22)];
                case 139:
                    _d.sent();
                    return [3 /*break*/, 141];
                case 140:
                    x += 1;
                    return [3 /*break*/, 137];
                case 141: return [3 /*break*/, 180];
                case 142:
                    if (!(commandData.args[0].toString().toLowerCase() === 'enable')) return [3 /*break*/, 148];
                    x = 0;
                    _d.label = 143;
                case 143:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 147];
                    if (!(commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 146];
                    guildData.logs[x].loggingChannelID = commandData.permsChannel.id;
                    guildData.logs[x].loggingChannelName = commandData.permsChannel.name;
                    guildData.logs[x].enabled = true;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 144:
                    _d.sent();
                    msgEmbed_23 = new Discord.MessageEmbed();
                    msgString_23 = "------\n**Nicely done! You've enabled logging for '" + guildData.logs[x].name + "'.\nIn channel <#" + guildData.logs[x].loggingChannelID + ">.**\n------";
                    msgEmbed_23
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString_23)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Enabled:**__');
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed_23)];
                case 145:
                    _d.sent();
                    return [3 /*break*/, 147];
                case 146:
                    x += 1;
                    return [3 /*break*/, 143];
                case 147: return [3 /*break*/, 153];
                case 148:
                    if (!(commandData.args[0].toString().toLowerCase() === 'disable')) return [3 /*break*/, 153];
                    x = 0;
                    _d.label = 149;
                case 149:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 153];
                    if (!(commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 152];
                    guildData.logs[x].loggingChannelID = '';
                    guildData.logs[x].loggingChannelName = '';
                    guildData.logs[x].enabled = false;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 150:
                    _d.sent();
                    msgEmbed_24 = new Discord.MessageEmbed();
                    msgString_24 = "------\n**Nicely done! You've disabled logging for '" + guildData.logs[x].name + "'.**\n------";
                    msgEmbed_24
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString_24)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Disabled:**__');
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed_24)];
                case 151:
                    _d.sent();
                    return [3 /*break*/, 153];
                case 152:
                    x += 1;
                    return [3 /*break*/, 149];
                case 153: return [3 /*break*/, 180];
                case 154:
                    if (!(commandData.args[0].toString().toLowerCase() === 'enable')) return [3 /*break*/, 160];
                    x = 0;
                    _d.label = 155;
                case 155:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 159];
                    if (!(commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 158];
                    guildData.logs[x].loggingChannelID = commandData.permsChannel.id;
                    guildData.logs[x].loggingChannelName = commandData.permsChannel.name;
                    guildData.logs[x].enabled = true;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 156:
                    _d.sent();
                    msgEmbed_25 = new Discord.MessageEmbed();
                    msgString_25 = "------\n**Nicely done! You've enabled logging for '" + guildData.logs[x].name + "'.\nIn channel <#" + guildData.logs[x].loggingChannelID + ">.**\n------";
                    msgEmbed_25
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString_25)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Enabled:**__');
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed_25)];
                case 157:
                    _d.sent();
                    return [3 /*break*/, 159];
                case 158:
                    x += 1;
                    return [3 /*break*/, 155];
                case 159: return [3 /*break*/, 165];
                case 160:
                    if (!(commandData.args[0].toString().toLowerCase() === 'disable')) return [3 /*break*/, 165];
                    x = 0;
                    _d.label = 161;
                case 161:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 165];
                    if (!(commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 164];
                    guildData.logs[x].loggingChannelID = '';
                    guildData.logs[x].loggingChannelName = '';
                    guildData.logs[x].enabled = false;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 162:
                    _d.sent();
                    msgEmbed_26 = new Discord.MessageEmbed();
                    msgString_26 = "------\n**Nicely done! You've disabled logging for '" + guildData.logs[x].name + "'.**\n------";
                    msgEmbed_26
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString_26)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Disabled:**__');
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed_26)];
                case 163:
                    _d.sent();
                    return [3 /*break*/, 165];
                case 164:
                    x += 1;
                    return [3 /*break*/, 161];
                case 165: return [3 /*break*/, 180];
                case 166:
                    if (!(commandData.args[0].toString().toLowerCase() === 'enable')) return [3 /*break*/, 172];
                    x = 0;
                    _d.label = 167;
                case 167:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 171];
                    if (!(commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 170];
                    guildData.logs[x].loggingChannelID = commandData.permsChannel.id;
                    guildData.logs[x].loggingChannelName = commandData.permsChannel.name;
                    guildData.logs[x].enabled = true;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 168:
                    _d.sent();
                    msgEmbed_27 = new Discord.MessageEmbed();
                    msgString_27 = "------\n**Nicely done! You've enabled logging for '" + guildData.logs[x].name + "'.\nIn channel <#" + guildData.logs[x].loggingChannelID + ">.**\n------";
                    msgEmbed_27
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString_27)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Enabled:**__');
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed_27)];
                case 169:
                    _d.sent();
                    return [3 /*break*/, 171];
                case 170:
                    x += 1;
                    return [3 /*break*/, 167];
                case 171: return [3 /*break*/, 177];
                case 172:
                    if (!(commandData.args[0].toString().toLowerCase() === 'disable')) return [3 /*break*/, 177];
                    x = 0;
                    _d.label = 173;
                case 173:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 177];
                    if (!(commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 176];
                    guildData.logs[x].loggingChannelID = '';
                    guildData.logs[x].loggingChannelName = '';
                    guildData.logs[x].enabled = false;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 174:
                    _d.sent();
                    msgEmbed_28 = new Discord.MessageEmbed();
                    msgString_28 = "------\n**Nicely done! You've disabled logging for '" + guildData.logs[x].name + "'.**\n------";
                    msgEmbed_28
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString_28)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Disabled:**__');
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed_28)];
                case 175:
                    _d.sent();
                    return [3 /*break*/, 177];
                case 176:
                    x += 1;
                    return [3 /*break*/, 173];
                case 177: return [3 /*break*/, 180];
                case 178:
                    msgString = 'Please enter a proper log name!';
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs:**__');
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 179:
                    _d.sent();
                    return [2 /*return*/, commandReturnData];
                case 180: return [2 /*return*/, commandReturnData];
                case 181:
                    error_1 = _d.sent();
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            reject(error_1);
                        })];
                case 182: return [2 /*return*/];
            }
        });
    });
}
exports.execute = execute;
command.function = execute;
exports.default = command;
