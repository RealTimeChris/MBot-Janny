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
        var commandReturnData, areWeInADM, areWeAnAdmin, guildData, fields, x, field, field, msgEmbed, msgString, msgString, _a, x, msgEmbed_1, msgString_1, x, msgEmbed_2, msgString_2, x, msgEmbed_3, msgString_3, x, msgEmbed_4, msgString_4, x, msgEmbed_5, msgString_5, x, msgEmbed_6, msgString_6, x, msgEmbed_7, msgString_7, x, msgEmbed_8, msgString_8, x, msgEmbed_9, msgString_9, x, msgEmbed_10, msgString_10, x, msgEmbed_11, msgString_11, x, msgEmbed_12, msgString_12, x, msgEmbed_13, msgString_13, x, msgEmbed_14, msgString_14, x, msgEmbed_15, msgString_15, x, msgEmbed_16, msgString_16, x, msgEmbed_17, msgString_17, x, msgEmbed_18, msgString_18, x, msgEmbed_19, msgString_19, x, msgEmbed_20, msgString_20, x, msgEmbed_21, msgString_21, x, msgEmbed_22, msgString_22, x, msgEmbed_23, msgString_23, x, msgEmbed_24, msgString_24, x, msgEmbed_25, msgString_25, x, msgEmbed_26, msgString_26, x, msgEmbed_27, msgString_27, x, msgEmbed_28, msgString_28, msgString, msgEmbed, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 179, , 180]);
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
                    return [3 /*break*/, 178];
                case 5:
                    if (!(commandData.args[0].toString().toLowerCase() !== 'enable' && commandData.args[0].toString().toLowerCase() !== 'disable')) return [3 /*break*/, 7];
                    msgString = "Please, enter enable or disable for the second argument of this command! \n            (!managelogs = <enable/disable>, <logname>)";
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgString)];
                case 6:
                    _b.sent();
                    return [2 /*return*/, commandReturnData];
                case 7:
                    _a = commandData.args[1].toLowerCase();
                    switch (_a) {
                        case 'guildbanadd': return [3 /*break*/, 8];
                        case 'guildbanremove': return [3 /*break*/, 20];
                        case 'guildmemberadd': return [3 /*break*/, 32];
                        case 'guildmemberremove': return [3 /*break*/, 44];
                        case 'displaynamechange': return [3 /*break*/, 56];
                        case 'nicknamechange': return [3 /*break*/, 68];
                        case 'roleaddorremove': return [3 /*break*/, 80];
                        case 'invitecreate': return [3 /*break*/, 92];
                        case 'messagedelete': return [3 /*break*/, 104];
                        case 'messagedeletebulk': return [3 /*break*/, 116];
                        case 'messageupdate': return [3 /*break*/, 128];
                        case 'rolecreate': return [3 /*break*/, 140];
                        case 'roledelete': return [3 /*break*/, 152];
                        case 'usernamechange': return [3 /*break*/, 164];
                    }
                    return [3 /*break*/, 176];
                case 8:
                    if (!(commandData.args[0].toString().toLowerCase() === 'enable')) return [3 /*break*/, 14];
                    x = 0;
                    _b.label = 9;
                case 9:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 13];
                    if (!(commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 12];
                    guildData.logs[x].loggingChannelID = commandData.permsChannel.id;
                    guildData.logs[x].loggingChannelName = commandData.permsChannel.name;
                    guildData.logs[x].enabled = true;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 10:
                    _b.sent();
                    msgEmbed_1 = new Discord.MessageEmbed();
                    msgString_1 = "------\n**Nicely done! You've enabled logging for '" + guildData.logs[x].name + "'.\nIn channel <#" + guildData.logs[x].loggingChannelID + ">.**\n------";
                    msgEmbed_1
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString_1)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Enabled:**__');
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed_1)];
                case 11:
                    _b.sent();
                    return [3 /*break*/, 13];
                case 12:
                    x += 1;
                    return [3 /*break*/, 9];
                case 13: return [3 /*break*/, 19];
                case 14:
                    if (!(commandData.args[0].toString().toLowerCase() === 'disable')) return [3 /*break*/, 19];
                    x = 0;
                    _b.label = 15;
                case 15:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 19];
                    if (!(commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 18];
                    guildData.logs[x].loggingChannelID = '';
                    guildData.logs[x].loggingChannelName = '';
                    guildData.logs[x].enabled = false;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 16:
                    _b.sent();
                    msgEmbed_2 = new Discord.MessageEmbed();
                    msgString_2 = "------\n**Nicely done! You've disabled logging for '" + guildData.logs[x].name + "'.**\n------";
                    msgEmbed_2
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString_2)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Disabled:**__');
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed_2)];
                case 17:
                    _b.sent();
                    return [3 /*break*/, 19];
                case 18:
                    x += 1;
                    return [3 /*break*/, 15];
                case 19: return [3 /*break*/, 178];
                case 20:
                    if (!(commandData.args[0].toString().toLowerCase() === 'enable')) return [3 /*break*/, 26];
                    x = 0;
                    _b.label = 21;
                case 21:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 25];
                    if (!(commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 24];
                    guildData.logs[x].loggingChannelID = commandData.permsChannel.id;
                    guildData.logs[x].loggingChannelName = commandData.permsChannel.name;
                    guildData.logs[x].enabled = true;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 22:
                    _b.sent();
                    msgEmbed_3 = new Discord.MessageEmbed();
                    msgString_3 = "------\n**Nicely done! You've enabled logging for '" + guildData.logs[x].name + "'.\nIn channel <#" + guildData.logs[x].loggingChannelID + ">.**\n------";
                    msgEmbed_3
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString_3)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Enabled:**__');
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed_3)];
                case 23:
                    _b.sent();
                    return [3 /*break*/, 25];
                case 24:
                    x += 1;
                    return [3 /*break*/, 21];
                case 25: return [3 /*break*/, 31];
                case 26:
                    if (!(commandData.args[0].toString().toLowerCase() === 'disable')) return [3 /*break*/, 31];
                    x = 0;
                    _b.label = 27;
                case 27:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 31];
                    if (!(commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 30];
                    guildData.logs[x].loggingChannelID = '';
                    guildData.logs[x].loggingChannelName = '';
                    guildData.logs[x].enabled = false;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 28:
                    _b.sent();
                    msgEmbed_4 = new Discord.MessageEmbed();
                    msgString_4 = "------\n**Nicely done! You've disabled logging for '" + guildData.logs[x].name + "'.**\n------";
                    msgEmbed_4
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString_4)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Disabled:**__');
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed_4)];
                case 29:
                    _b.sent();
                    return [3 /*break*/, 31];
                case 30:
                    x += 1;
                    return [3 /*break*/, 27];
                case 31: return [3 /*break*/, 178];
                case 32:
                    if (!(commandData.args[0].toString().toLowerCase() === 'enable')) return [3 /*break*/, 38];
                    x = 0;
                    _b.label = 33;
                case 33:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 37];
                    if (!(commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 36];
                    guildData.logs[x].loggingChannelID = commandData.permsChannel.id;
                    guildData.logs[x].loggingChannelName = commandData.permsChannel.name;
                    guildData.logs[x].enabled = true;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 34:
                    _b.sent();
                    msgEmbed_5 = new Discord.MessageEmbed();
                    msgString_5 = "------\n**Nicely done! You've enabled logging for '" + guildData.logs[x].name + "'.\nIn channel <#" + guildData.logs[x].loggingChannelID + ">.**\n------";
                    msgEmbed_5
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString_5)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Enabled:**__');
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed_5)];
                case 35:
                    _b.sent();
                    return [3 /*break*/, 37];
                case 36:
                    x += 1;
                    return [3 /*break*/, 33];
                case 37: return [3 /*break*/, 43];
                case 38:
                    if (!(commandData.args[0].toString().toLowerCase() === 'disable')) return [3 /*break*/, 43];
                    x = 0;
                    _b.label = 39;
                case 39:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 43];
                    if (!(commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 42];
                    guildData.logs[x].loggingChannelID = '';
                    guildData.logs[x].loggingChannelName = '';
                    guildData.logs[x].enabled = false;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 40:
                    _b.sent();
                    msgEmbed_6 = new Discord.MessageEmbed();
                    msgString_6 = "------\n**Nicely done! You've disabled logging for '" + guildData.logs[x].name + "'.**\n------";
                    msgEmbed_6
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString_6)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Disabled:**__');
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed_6)];
                case 41:
                    _b.sent();
                    return [3 /*break*/, 43];
                case 42:
                    x += 1;
                    return [3 /*break*/, 39];
                case 43: return [3 /*break*/, 178];
                case 44:
                    if (!(commandData.args[0].toString().toLowerCase() === 'enable')) return [3 /*break*/, 50];
                    x = 0;
                    _b.label = 45;
                case 45:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 49];
                    if (!(commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 48];
                    guildData.logs[x].loggingChannelID = commandData.permsChannel.id;
                    guildData.logs[x].loggingChannelName = commandData.permsChannel.name;
                    guildData.logs[x].enabled = true;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 46:
                    _b.sent();
                    msgEmbed_7 = new Discord.MessageEmbed();
                    msgString_7 = "------\n**Nicely done! You've enabled logging for '" + guildData.logs[x].name + "' in channel <#" + guildData.logs[x].loggingChannelID + ">.**\n------'";
                    msgEmbed_7
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString_7)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Enabled:**__');
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed_7)];
                case 47:
                    _b.sent();
                    return [3 /*break*/, 49];
                case 48:
                    x += 1;
                    return [3 /*break*/, 45];
                case 49: return [3 /*break*/, 55];
                case 50:
                    if (!(commandData.args[0].toString().toLowerCase() === 'disable')) return [3 /*break*/, 55];
                    x = 0;
                    _b.label = 51;
                case 51:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 55];
                    if (!(commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 54];
                    guildData.logs[x].loggingChannelID = '';
                    guildData.logs[x].loggingChannelName = '';
                    guildData.logs[x].enabled = false;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 52:
                    _b.sent();
                    msgEmbed_8 = new Discord.MessageEmbed();
                    msgString_8 = "------\n**Nicely done! You've disabled logging for '" + guildData.logs[x].name + "'.**\n------";
                    msgEmbed_8
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString_8)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Disabled:**__');
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed_8)];
                case 53:
                    _b.sent();
                    return [3 /*break*/, 55];
                case 54:
                    x += 1;
                    return [3 /*break*/, 51];
                case 55: return [3 /*break*/, 178];
                case 56:
                    if (!(commandData.args[0].toString().toLowerCase() === 'enable')) return [3 /*break*/, 62];
                    x = 0;
                    _b.label = 57;
                case 57:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 61];
                    if (!(commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 60];
                    guildData.logs[x].loggingChannelID = commandData.permsChannel.id;
                    guildData.logs[x].loggingChannelName = commandData.permsChannel.name;
                    guildData.logs[x].enabled = true;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 58:
                    _b.sent();
                    msgEmbed_9 = new Discord.MessageEmbed();
                    msgString_9 = "------\n**Nicely done! You've enabled logging for '" + guildData.logs[x].name + "'.\nIn channel <#" + guildData.logs[x].loggingChannelID + ">.**\n------";
                    msgEmbed_9
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString_9)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Enabled:**__');
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed_9)];
                case 59:
                    _b.sent();
                    return [3 /*break*/, 61];
                case 60:
                    x += 1;
                    return [3 /*break*/, 57];
                case 61: return [3 /*break*/, 67];
                case 62:
                    if (!(commandData.args[0].toString().toLowerCase() === 'disable')) return [3 /*break*/, 67];
                    x = 0;
                    _b.label = 63;
                case 63:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 67];
                    if (!(commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 66];
                    guildData.logs[x].loggingChannelID = '';
                    guildData.logs[x].loggingChannelName = '';
                    guildData.logs[x].enabled = false;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 64:
                    _b.sent();
                    msgEmbed_10 = new Discord.MessageEmbed();
                    msgString_10 = "------\n**Nicely done! You've disabled logging for '" + guildData.logs[x].name + "'.**\n------";
                    msgEmbed_10
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString_10)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Disabled:**__');
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed_10)];
                case 65:
                    _b.sent();
                    return [3 /*break*/, 67];
                case 66:
                    x += 1;
                    return [3 /*break*/, 63];
                case 67: return [3 /*break*/, 178];
                case 68:
                    if (!(commandData.args[0].toString().toLowerCase() === 'enable')) return [3 /*break*/, 74];
                    x = 0;
                    _b.label = 69;
                case 69:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 73];
                    if (!(commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 72];
                    guildData.logs[x].loggingChannelID = commandData.permsChannel.id;
                    guildData.logs[x].loggingChannelName = commandData.permsChannel.name;
                    guildData.logs[x].enabled = true;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 70:
                    _b.sent();
                    msgEmbed_11 = new Discord.MessageEmbed();
                    msgString_11 = "------\n**Nicely done! You've enabled logging for '" + guildData.logs[x].name + "'.\nIn channel <#" + guildData.logs[x].loggingChannelID + ">.**\n------";
                    msgEmbed_11
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString_11)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Enabled:**__');
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed_11)];
                case 71:
                    _b.sent();
                    return [3 /*break*/, 73];
                case 72:
                    x += 1;
                    return [3 /*break*/, 69];
                case 73: return [3 /*break*/, 79];
                case 74:
                    if (!(commandData.args[0].toString().toLowerCase() === 'disable')) return [3 /*break*/, 79];
                    x = 0;
                    _b.label = 75;
                case 75:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 79];
                    if (!(commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 78];
                    guildData.logs[x].loggingChannelID = '';
                    guildData.logs[x].loggingChannelName = '';
                    guildData.logs[x].enabled = false;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 76:
                    _b.sent();
                    msgEmbed_12 = new Discord.MessageEmbed();
                    msgString_12 = "------\n**Nicely done! You've disabled logging for '" + guildData.logs[x].name + "'.**\n------";
                    msgEmbed_12
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString_12)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Disabled:**__');
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed_12)];
                case 77:
                    _b.sent();
                    return [3 /*break*/, 79];
                case 78:
                    x += 1;
                    return [3 /*break*/, 75];
                case 79: return [3 /*break*/, 178];
                case 80:
                    if (!(commandData.args[0].toString().toLowerCase() === 'enable')) return [3 /*break*/, 86];
                    x = 0;
                    _b.label = 81;
                case 81:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 85];
                    if (!(commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 84];
                    guildData.logs[x].loggingChannelID = commandData.permsChannel.id;
                    guildData.logs[x].loggingChannelName = commandData.permsChannel.name;
                    guildData.logs[x].enabled = true;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 82:
                    _b.sent();
                    msgEmbed_13 = new Discord.MessageEmbed();
                    msgString_13 = "------\n**Nicely done! You've enabled logging for '" + guildData.logs[x].name + "'.\nIn channel <#" + guildData.logs[x].loggingChannelID + ">.**\n------";
                    msgEmbed_13
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString_13)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Enabled:**__');
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed_13)];
                case 83:
                    _b.sent();
                    return [3 /*break*/, 85];
                case 84:
                    x += 1;
                    return [3 /*break*/, 81];
                case 85: return [3 /*break*/, 91];
                case 86:
                    if (!(commandData.args[0].toString().toLowerCase() === 'disable')) return [3 /*break*/, 91];
                    x = 0;
                    _b.label = 87;
                case 87:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 91];
                    if (!(commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 90];
                    guildData.logs[x].loggingChannelID = '';
                    guildData.logs[x].loggingChannelName = '';
                    guildData.logs[x].enabled = false;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 88:
                    _b.sent();
                    msgEmbed_14 = new Discord.MessageEmbed();
                    msgString_14 = "------\n**Nicely done! You've disabled logging for '" + guildData.logs[x].name + "'.**\n------";
                    msgEmbed_14
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString_14)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Disabled:**__');
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed_14)];
                case 89:
                    _b.sent();
                    return [3 /*break*/, 91];
                case 90:
                    x += 1;
                    return [3 /*break*/, 87];
                case 91: return [3 /*break*/, 178];
                case 92:
                    if (!(commandData.args[0].toString().toLowerCase() === 'enable')) return [3 /*break*/, 98];
                    x = 0;
                    _b.label = 93;
                case 93:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 97];
                    if (!(commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 96];
                    guildData.logs[x].loggingChannelID = commandData.permsChannel.id;
                    guildData.logs[x].loggingChannelName = commandData.permsChannel.name;
                    guildData.logs[x].enabled = true;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 94:
                    _b.sent();
                    msgEmbed_15 = new Discord.MessageEmbed();
                    msgString_15 = "------\n**Nicely done! You've enabled logging for '" + guildData.logs[x].name + "'.\nIn channel <#" + guildData.logs[x].loggingChannelID + ">.**\n------";
                    msgEmbed_15
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString_15)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Enabled:**__');
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed_15)];
                case 95:
                    _b.sent();
                    return [3 /*break*/, 97];
                case 96:
                    x += 1;
                    return [3 /*break*/, 93];
                case 97: return [3 /*break*/, 103];
                case 98:
                    if (!(commandData.args[0].toString().toLowerCase() === 'disable')) return [3 /*break*/, 103];
                    x = 0;
                    _b.label = 99;
                case 99:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 103];
                    if (!(commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 102];
                    guildData.logs[x].loggingChannelID = '';
                    guildData.logs[x].loggingChannelName = '';
                    guildData.logs[x].enabled = false;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 100:
                    _b.sent();
                    msgEmbed_16 = new Discord.MessageEmbed();
                    msgString_16 = "------\n**Nicely done! You've disabled logging for '" + guildData.logs[x].name + "'.**\n------";
                    msgEmbed_16
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString_16)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Disabled:**__');
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed_16)];
                case 101:
                    _b.sent();
                    return [3 /*break*/, 103];
                case 102:
                    x += 1;
                    return [3 /*break*/, 99];
                case 103: return [3 /*break*/, 178];
                case 104:
                    if (!(commandData.args[0].toString().toLowerCase() === 'enable')) return [3 /*break*/, 110];
                    x = 0;
                    _b.label = 105;
                case 105:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 109];
                    if (!(commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 108];
                    guildData.logs[x].loggingChannelID = commandData.permsChannel.id;
                    guildData.logs[x].loggingChannelName = commandData.permsChannel.name;
                    guildData.logs[x].enabled = true;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 106:
                    _b.sent();
                    msgEmbed_17 = new Discord.MessageEmbed();
                    msgString_17 = "------\n**Nicely done! You've enabled logging for '" + guildData.logs[x].name + "'.\nIn channel <#" + guildData.logs[x].loggingChannelID + ">.**\n------";
                    msgEmbed_17
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString_17)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Enabled:**__');
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed_17)];
                case 107:
                    _b.sent();
                    return [3 /*break*/, 109];
                case 108:
                    x += 1;
                    return [3 /*break*/, 105];
                case 109: return [3 /*break*/, 115];
                case 110:
                    if (!(commandData.args[0].toString().toLowerCase() === 'disable')) return [3 /*break*/, 115];
                    x = 0;
                    _b.label = 111;
                case 111:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 115];
                    if (!(commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 114];
                    guildData.logs[x].loggingChannelID = '';
                    guildData.logs[x].loggingChannelName = '';
                    guildData.logs[x].enabled = false;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 112:
                    _b.sent();
                    msgEmbed_18 = new Discord.MessageEmbed();
                    msgString_18 = "------\n**Nicely done! You've disabled logging for '" + guildData.logs[x].name + "'.**\n------";
                    msgEmbed_18
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString_18)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Disabled:**__');
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed_18)];
                case 113:
                    _b.sent();
                    return [3 /*break*/, 115];
                case 114:
                    x += 1;
                    return [3 /*break*/, 111];
                case 115: return [3 /*break*/, 178];
                case 116:
                    if (!(commandData.args[0].toString().toLowerCase() === 'enable')) return [3 /*break*/, 122];
                    x = 0;
                    _b.label = 117;
                case 117:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 121];
                    if (!(commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 120];
                    guildData.logs[x].loggingChannelID = commandData.permsChannel.id;
                    guildData.logs[x].loggingChannelName = commandData.permsChannel.name;
                    guildData.logs[x].enabled = true;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 118:
                    _b.sent();
                    msgEmbed_19 = new Discord.MessageEmbed();
                    msgString_19 = "------\n**Nicely done! You've enabled logging for '" + guildData.logs[x].name + "'.\nIn channel <#" + guildData.logs[x].loggingChannelID + ">.**\n------";
                    msgEmbed_19
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString_19)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Enabled:**__');
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed_19)];
                case 119:
                    _b.sent();
                    return [3 /*break*/, 121];
                case 120:
                    x += 1;
                    return [3 /*break*/, 117];
                case 121: return [3 /*break*/, 127];
                case 122:
                    if (!(commandData.args[0].toString().toLowerCase() === 'disable')) return [3 /*break*/, 127];
                    x = 0;
                    _b.label = 123;
                case 123:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 127];
                    if (!(commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 126];
                    guildData.logs[x].loggingChannelID = '';
                    guildData.logs[x].loggingChannelName = '';
                    guildData.logs[x].enabled = false;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 124:
                    _b.sent();
                    msgEmbed_20 = new Discord.MessageEmbed();
                    msgString_20 = "------\n**Nicely done! You've disabled logging for '" + guildData.logs[x].name + "'.**\n------";
                    msgEmbed_20
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString_20)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Disabled:**__');
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed_20)];
                case 125:
                    _b.sent();
                    return [3 /*break*/, 127];
                case 126:
                    x += 1;
                    return [3 /*break*/, 123];
                case 127: return [3 /*break*/, 178];
                case 128:
                    if (!(commandData.args[0].toString().toLowerCase() === 'enable')) return [3 /*break*/, 134];
                    x = 0;
                    _b.label = 129;
                case 129:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 133];
                    if (!(commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 132];
                    guildData.logs[x].loggingChannelID = commandData.permsChannel.id;
                    guildData.logs[x].loggingChannelName = commandData.permsChannel.name;
                    guildData.logs[x].enabled = true;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 130:
                    _b.sent();
                    msgEmbed_21 = new Discord.MessageEmbed();
                    msgString_21 = "------\n**Nicely done! You've enabled logging for '" + guildData.logs[x].name + "'.\nIn channel <#" + guildData.logs[x].loggingChannelID + ">.**\n------";
                    msgEmbed_21
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString_21)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Enabled:**__');
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed_21)];
                case 131:
                    _b.sent();
                    return [3 /*break*/, 133];
                case 132:
                    x += 1;
                    return [3 /*break*/, 129];
                case 133: return [3 /*break*/, 139];
                case 134:
                    if (!(commandData.args[0].toString().toLowerCase() === 'disable')) return [3 /*break*/, 139];
                    x = 0;
                    _b.label = 135;
                case 135:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 139];
                    if (!(commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 138];
                    guildData.logs[x].loggingChannelID = '';
                    guildData.logs[x].loggingChannelName = '';
                    guildData.logs[x].enabled = false;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 136:
                    _b.sent();
                    msgEmbed_22 = new Discord.MessageEmbed();
                    msgString_22 = "------\n**Nicely done! You've disabled logging for '" + guildData.logs[x].name + "'.**\n------";
                    msgEmbed_22
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString_22)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Disabled:**__');
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed_22)];
                case 137:
                    _b.sent();
                    return [3 /*break*/, 139];
                case 138:
                    x += 1;
                    return [3 /*break*/, 135];
                case 139: return [3 /*break*/, 178];
                case 140:
                    if (!(commandData.args[0].toString().toLowerCase() === 'enable')) return [3 /*break*/, 146];
                    x = 0;
                    _b.label = 141;
                case 141:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 145];
                    if (!(commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 144];
                    guildData.logs[x].loggingChannelID = commandData.permsChannel.id;
                    guildData.logs[x].loggingChannelName = commandData.permsChannel.name;
                    guildData.logs[x].enabled = true;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 142:
                    _b.sent();
                    msgEmbed_23 = new Discord.MessageEmbed();
                    msgString_23 = "------\n**Nicely done! You've enabled logging for '" + guildData.logs[x].name + "'.\nIn channel <#" + guildData.logs[x].loggingChannelID + ">.**\n------";
                    msgEmbed_23
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString_23)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Enabled:**__');
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed_23)];
                case 143:
                    _b.sent();
                    return [3 /*break*/, 145];
                case 144:
                    x += 1;
                    return [3 /*break*/, 141];
                case 145: return [3 /*break*/, 151];
                case 146:
                    if (!(commandData.args[0].toString().toLowerCase() === 'disable')) return [3 /*break*/, 151];
                    x = 0;
                    _b.label = 147;
                case 147:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 151];
                    if (!(commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 150];
                    guildData.logs[x].loggingChannelID = '';
                    guildData.logs[x].loggingChannelName = '';
                    guildData.logs[x].enabled = false;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 148:
                    _b.sent();
                    msgEmbed_24 = new Discord.MessageEmbed();
                    msgString_24 = "------\n**Nicely done! You've disabled logging for '" + guildData.logs[x].name + "'.**\n------";
                    msgEmbed_24
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString_24)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Disabled:**__');
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed_24)];
                case 149:
                    _b.sent();
                    return [3 /*break*/, 151];
                case 150:
                    x += 1;
                    return [3 /*break*/, 147];
                case 151: return [3 /*break*/, 178];
                case 152:
                    if (!(commandData.args[0].toString().toLowerCase() === 'enable')) return [3 /*break*/, 158];
                    x = 0;
                    _b.label = 153;
                case 153:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 157];
                    if (!(commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 156];
                    guildData.logs[x].loggingChannelID = commandData.permsChannel.id;
                    guildData.logs[x].loggingChannelName = commandData.permsChannel.name;
                    guildData.logs[x].enabled = true;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 154:
                    _b.sent();
                    msgEmbed_25 = new Discord.MessageEmbed();
                    msgString_25 = "------\n**Nicely done! You've enabled logging for '" + guildData.logs[x].name + "'.\nIn channel <#" + guildData.logs[x].loggingChannelID + ">.**\n------";
                    msgEmbed_25
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString_25)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Enabled:**__');
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed_25)];
                case 155:
                    _b.sent();
                    return [3 /*break*/, 157];
                case 156:
                    x += 1;
                    return [3 /*break*/, 153];
                case 157: return [3 /*break*/, 163];
                case 158:
                    if (!(commandData.args[0].toString().toLowerCase() === 'disable')) return [3 /*break*/, 163];
                    x = 0;
                    _b.label = 159;
                case 159:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 163];
                    if (!(commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 162];
                    guildData.logs[x].loggingChannelID = '';
                    guildData.logs[x].loggingChannelName = '';
                    guildData.logs[x].enabled = false;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 160:
                    _b.sent();
                    msgEmbed_26 = new Discord.MessageEmbed();
                    msgString_26 = "------\n**Nicely done! You've disabled logging for '" + guildData.logs[x].name + "'.**\n------";
                    msgEmbed_26
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString_26)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Disabled:**__');
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed_26)];
                case 161:
                    _b.sent();
                    return [3 /*break*/, 163];
                case 162:
                    x += 1;
                    return [3 /*break*/, 159];
                case 163: return [3 /*break*/, 178];
                case 164:
                    if (!(commandData.args[0].toString().toLowerCase() === 'enable')) return [3 /*break*/, 170];
                    x = 0;
                    _b.label = 165;
                case 165:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 169];
                    if (!(commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 168];
                    guildData.logs[x].loggingChannelID = commandData.permsChannel.id;
                    guildData.logs[x].loggingChannelName = commandData.permsChannel.name;
                    guildData.logs[x].enabled = true;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 166:
                    _b.sent();
                    msgEmbed_27 = new Discord.MessageEmbed();
                    msgString_27 = "------\n**Nicely done! You've enabled logging for '" + guildData.logs[x].name + "'.\nIn channel <#" + guildData.logs[x].loggingChannelID + ">.**\n------";
                    msgEmbed_27
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString_27)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Enabled:**__');
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed_27)];
                case 167:
                    _b.sent();
                    return [3 /*break*/, 169];
                case 168:
                    x += 1;
                    return [3 /*break*/, 165];
                case 169: return [3 /*break*/, 175];
                case 170:
                    if (!(commandData.args[0].toString().toLowerCase() === 'disable')) return [3 /*break*/, 175];
                    x = 0;
                    _b.label = 171;
                case 171:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 175];
                    if (!(commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 174];
                    guildData.logs[x].loggingChannelID = '';
                    guildData.logs[x].loggingChannelName = '';
                    guildData.logs[x].enabled = false;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 172:
                    _b.sent();
                    msgEmbed_28 = new Discord.MessageEmbed();
                    msgString_28 = "------\n**Nicely done! You've disabled logging for '" + guildData.logs[x].name + "'.**\n------";
                    msgEmbed_28
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString_28)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Disabled:**__');
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed_28)];
                case 173:
                    _b.sent();
                    return [3 /*break*/, 175];
                case 174:
                    x += 1;
                    return [3 /*break*/, 171];
                case 175: return [3 /*break*/, 178];
                case 176:
                    msgString = 'Please enter a proper log name!';
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Disabled:**__');
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 177:
                    _b.sent();
                    return [2 /*return*/, commandReturnData];
                case 178: return [2 /*return*/, commandReturnData];
                case 179:
                    error_1 = _b.sent();
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            reject(error_1);
                        })];
                case 180: return [2 /*return*/];
            }
        });
    });
}
exports.execute = execute;
command.function = execute;
exports.default = command;
