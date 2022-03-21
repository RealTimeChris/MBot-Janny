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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Discord = require("discord.js");
var GuildData_1 = __importDefault(require("../GuildData"));
var HelperFunctions_1 = __importDefault(require("../HelperFunctions"));
var command = {
    name: 'managelogs',
    description: '!managelogs, to view an enabled/disabled list of possible logs!',
    function: Function()
};
function execute(commandData, discordUser) {
    return __awaiter(this, void 0, void 0, function () {
        var commandReturnData, areWeInADM, areWeAnAdmin, guildData, fields, x, field, field, msgEmbed, msgString, msgString, msgEmbed, msg, msgString, msgEmbed, msg, _a, x, msgEmbed_1, msgString_1, x, msgEmbed_2, msgString_2, x, msgEmbed_3, msgString_3, x, msgEmbed_4, msgString_4, x, msgEmbed_5, msgString_5, x, msgEmbed_6, msgString_6, x, msgEmbed_7, msgString_7, x, msgEmbed_8, msgString_8, x, msgEmbed_9, msgString_9, x, msgEmbed_10, msgString_10, x, msgEmbed_11, msgString_11, x, msgEmbed_12, msgString_12, x, msgEmbed_13, msgString_13, x, msgEmbed_14, msgString_14, x, msgEmbed_15, msgString_15, x, msgEmbed_16, msgString_16, x, msgEmbed_17, msgString_17, x, msgEmbed_18, msgString_18, x, msgEmbed_19, msgString_19, x, msgEmbed_20, msgString_20, x, msgEmbed_21, msgString_21, x, msgEmbed_22, msgString_22, x, msgEmbed_23, msgString_23, x, msgEmbed_24, msgString_24, x, msgEmbed_25, msgString_25, x, msgEmbed_26, msgString_26, x, msgEmbed_27, msgString_27, x, msgEmbed_28, msgString_28, msgString, msgEmbed, msg, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 184, , 185]);
                    commandReturnData = {
                        commandName: command.name
                    };
                    return [4 /*yield*/, HelperFunctions_1.default.areWeInADM(commandData)];
                case 1:
                    areWeInADM = _b.sent();
                    if (areWeInADM === true) {
                        return [2 /*return*/, commandReturnData];
                    }
                    return [4 /*yield*/, HelperFunctions_1.default.doWeHaveAdminPermission(commandData, discordUser)];
                case 2:
                    areWeAnAdmin = _b.sent();
                    if (areWeAnAdmin === false) {
                        return [2 /*return*/, commandReturnData];
                    }
                    guildData = new GuildData_1.default({ dataBase: discordUser.dataBase, id: commandData.guild.id, name: commandData.guild.name, memberCount: commandData.guild.memberCount });
                    return [4 /*yield*/, guildData.getFromDataBase()];
                case 3:
                    _b.sent();
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
                        .setColor(guildData.borderColor)
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs:**__').fields = fields;
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 4:
                    _b.sent();
                    return [3 /*break*/, 183];
                case 5:
                    if (!(commandData.args[0].toString().toLowerCase() !== 'enable' && commandData.args[0].toString().toLowerCase() !== 'disable')) return [3 /*break*/, 8];
                    msgString = "------\n**Please, enter enable or disable for the first argument of this command! \n            (!managelogs = <enable/disable>, <logname>)**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Missing Or Invalid Arguments:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 6:
                    msg = _b.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 7:
                    _b.sent();
                    return [2 /*return*/, commandReturnData];
                case 8:
                    if (!(commandData.args[1] === undefined)) return [3 /*break*/, 11];
                    msgString = "------\n**Please, enter  a log name to disable or enable as the second argument of this command! \n            (!managelogs = <enable/disable>, <logname>)**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Missing Or Invalid Arguments:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 9:
                    msg = _b.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 10:
                    _b.sent();
                    return [2 /*return*/, commandReturnData];
                case 11:
                    _a = commandData.args[1].toLowerCase();
                    switch (_a) {
                        case 'guildbanadd': return [3 /*break*/, 12];
                        case 'guildbanremove': return [3 /*break*/, 24];
                        case 'guildmemberadd': return [3 /*break*/, 36];
                        case 'guildmemberremove': return [3 /*break*/, 48];
                        case 'displaynamechange': return [3 /*break*/, 60];
                        case 'nicknamechange': return [3 /*break*/, 72];
                        case 'roleaddorremove': return [3 /*break*/, 84];
                        case 'invitecreate': return [3 /*break*/, 96];
                        case 'messagedelete': return [3 /*break*/, 108];
                        case 'messagedeletebulk': return [3 /*break*/, 120];
                        case 'messageupdate': return [3 /*break*/, 132];
                        case 'rolecreate': return [3 /*break*/, 144];
                        case 'roledelete': return [3 /*break*/, 156];
                        case 'usernamechange': return [3 /*break*/, 168];
                    }
                    return [3 /*break*/, 180];
                case 12:
                    if (!(commandData.args[0].toString().toLowerCase() === 'enable')) return [3 /*break*/, 18];
                    x = 0;
                    _b.label = 13;
                case 13:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 17];
                    if (!(commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 16];
                    guildData.logs[x].loggingChannelID = commandData.permsChannel.id;
                    guildData.logs[x].loggingChannelName = commandData.permsChannel.name;
                    guildData.logs[x].enabled = true;
                    return [4 /*yield*/, guildData.writeToDataBase()];
                case 14:
                    _b.sent();
                    msgEmbed_1 = new Discord.MessageEmbed();
                    msgString_1 = "------\n**Nicely done! You've enabled logging for '" + guildData.logs[x].name + "'.\nIn channel <#" + guildData.logs[x].loggingChannelID + ">.**\n------";
                    msgEmbed_1
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString_1)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Enabled:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed_1)];
                case 15:
                    _b.sent();
                    return [3 /*break*/, 17];
                case 16:
                    x += 1;
                    return [3 /*break*/, 13];
                case 17: return [3 /*break*/, 23];
                case 18:
                    if (!(commandData.args[0].toString().toLowerCase() === 'disable')) return [3 /*break*/, 23];
                    x = 0;
                    _b.label = 19;
                case 19:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 23];
                    if (!(commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 22];
                    guildData.logs[x].loggingChannelID = '';
                    guildData.logs[x].loggingChannelName = '';
                    guildData.logs[x].enabled = false;
                    return [4 /*yield*/, guildData.writeToDataBase()];
                case 20:
                    _b.sent();
                    msgEmbed_2 = new Discord.MessageEmbed();
                    msgString_2 = "------\n**Nicely done! You've disabled logging for '" + guildData.logs[x].name + "'.**\n------";
                    msgEmbed_2
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString_2)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Disabled:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed_2)];
                case 21:
                    _b.sent();
                    return [3 /*break*/, 23];
                case 22:
                    x += 1;
                    return [3 /*break*/, 19];
                case 23: return [3 /*break*/, 183];
                case 24:
                    if (!(commandData.args[0].toString().toLowerCase() === 'enable')) return [3 /*break*/, 30];
                    x = 0;
                    _b.label = 25;
                case 25:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 29];
                    if (!(commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 28];
                    guildData.logs[x].loggingChannelID = commandData.permsChannel.id;
                    guildData.logs[x].loggingChannelName = commandData.permsChannel.name;
                    guildData.logs[x].enabled = true;
                    return [4 /*yield*/, guildData.writeToDataBase()];
                case 26:
                    _b.sent();
                    msgEmbed_3 = new Discord.MessageEmbed();
                    msgString_3 = "------\n**Nicely done! You've enabled logging for '" + guildData.logs[x].name + "'.\nIn channel <#" + guildData.logs[x].loggingChannelID + ">.**\n------";
                    msgEmbed_3
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString_3)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Enabled:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed_3)];
                case 27:
                    _b.sent();
                    return [3 /*break*/, 29];
                case 28:
                    x += 1;
                    return [3 /*break*/, 25];
                case 29: return [3 /*break*/, 35];
                case 30:
                    if (!(commandData.args[0].toString().toLowerCase() === 'disable')) return [3 /*break*/, 35];
                    x = 0;
                    _b.label = 31;
                case 31:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 35];
                    if (!(commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 34];
                    guildData.logs[x].loggingChannelID = '';
                    guildData.logs[x].loggingChannelName = '';
                    guildData.logs[x].enabled = false;
                    return [4 /*yield*/, guildData.writeToDataBase()];
                case 32:
                    _b.sent();
                    msgEmbed_4 = new Discord.MessageEmbed();
                    msgString_4 = "------\n**Nicely done! You've disabled logging for '" + guildData.logs[x].name + "'.**\n------";
                    msgEmbed_4
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString_4)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Disabled:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed_4)];
                case 33:
                    _b.sent();
                    return [3 /*break*/, 35];
                case 34:
                    x += 1;
                    return [3 /*break*/, 31];
                case 35: return [3 /*break*/, 183];
                case 36:
                    if (!(commandData.args[0].toString().toLowerCase() === 'enable')) return [3 /*break*/, 42];
                    x = 0;
                    _b.label = 37;
                case 37:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 41];
                    if (!(commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 40];
                    guildData.logs[x].loggingChannelID = commandData.permsChannel.id;
                    guildData.logs[x].loggingChannelName = commandData.permsChannel.name;
                    guildData.logs[x].enabled = true;
                    return [4 /*yield*/, guildData.writeToDataBase()];
                case 38:
                    _b.sent();
                    msgEmbed_5 = new Discord.MessageEmbed();
                    msgString_5 = "------\n**Nicely done! You've enabled logging for '" + guildData.logs[x].name + "'.\nIn channel <#" + guildData.logs[x].loggingChannelID + ">.**\n------";
                    msgEmbed_5
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString_5)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Enabled:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed_5)];
                case 39:
                    _b.sent();
                    return [3 /*break*/, 41];
                case 40:
                    x += 1;
                    return [3 /*break*/, 37];
                case 41: return [3 /*break*/, 47];
                case 42:
                    if (!(commandData.args[0].toString().toLowerCase() === 'disable')) return [3 /*break*/, 47];
                    x = 0;
                    _b.label = 43;
                case 43:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 47];
                    if (!(commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 46];
                    guildData.logs[x].loggingChannelID = '';
                    guildData.logs[x].loggingChannelName = '';
                    guildData.logs[x].enabled = false;
                    return [4 /*yield*/, guildData.writeToDataBase()];
                case 44:
                    _b.sent();
                    msgEmbed_6 = new Discord.MessageEmbed();
                    msgString_6 = "------\n**Nicely done! You've disabled logging for '" + guildData.logs[x].name + "'.**\n------";
                    msgEmbed_6
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString_6)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Disabled:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed_6)];
                case 45:
                    _b.sent();
                    return [3 /*break*/, 47];
                case 46:
                    x += 1;
                    return [3 /*break*/, 43];
                case 47: return [3 /*break*/, 183];
                case 48:
                    if (!(commandData.args[0].toString().toLowerCase() === 'enable')) return [3 /*break*/, 54];
                    x = 0;
                    _b.label = 49;
                case 49:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 53];
                    if (!(commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 52];
                    guildData.logs[x].loggingChannelID = commandData.permsChannel.id;
                    guildData.logs[x].loggingChannelName = commandData.permsChannel.name;
                    guildData.logs[x].enabled = true;
                    return [4 /*yield*/, guildData.writeToDataBase()];
                case 50:
                    _b.sent();
                    msgEmbed_7 = new Discord.MessageEmbed();
                    msgString_7 = "------\n**Nicely done! You've enabled logging for '" + guildData.logs[x].name + "' in channel <#" + guildData.logs[x].loggingChannelID + ">.**\n------'";
                    msgEmbed_7
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString_7)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Enabled:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed_7)];
                case 51:
                    _b.sent();
                    return [3 /*break*/, 53];
                case 52:
                    x += 1;
                    return [3 /*break*/, 49];
                case 53: return [3 /*break*/, 59];
                case 54:
                    if (!(commandData.args[0].toString().toLowerCase() === 'disable')) return [3 /*break*/, 59];
                    x = 0;
                    _b.label = 55;
                case 55:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 59];
                    if (!(commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 58];
                    guildData.logs[x].loggingChannelID = '';
                    guildData.logs[x].loggingChannelName = '';
                    guildData.logs[x].enabled = false;
                    return [4 /*yield*/, guildData.writeToDataBase()];
                case 56:
                    _b.sent();
                    msgEmbed_8 = new Discord.MessageEmbed();
                    msgString_8 = "------\n**Nicely done! You've disabled logging for '" + guildData.logs[x].name + "'.**\n------";
                    msgEmbed_8
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString_8)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Disabled:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed_8)];
                case 57:
                    _b.sent();
                    return [3 /*break*/, 59];
                case 58:
                    x += 1;
                    return [3 /*break*/, 55];
                case 59: return [3 /*break*/, 183];
                case 60:
                    if (!(commandData.args[0].toString().toLowerCase() === 'enable')) return [3 /*break*/, 66];
                    x = 0;
                    _b.label = 61;
                case 61:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 65];
                    if (!(commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 64];
                    guildData.logs[x].loggingChannelID = commandData.permsChannel.id;
                    guildData.logs[x].loggingChannelName = commandData.permsChannel.name;
                    guildData.logs[x].enabled = true;
                    return [4 /*yield*/, guildData.writeToDataBase()];
                case 62:
                    _b.sent();
                    msgEmbed_9 = new Discord.MessageEmbed();
                    msgString_9 = "------\n**Nicely done! You've enabled logging for '" + guildData.logs[x].name + "'.\nIn channel <#" + guildData.logs[x].loggingChannelID + ">.**\n------";
                    msgEmbed_9
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString_9)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Enabled:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed_9)];
                case 63:
                    _b.sent();
                    return [3 /*break*/, 65];
                case 64:
                    x += 1;
                    return [3 /*break*/, 61];
                case 65: return [3 /*break*/, 71];
                case 66:
                    if (!(commandData.args[0].toString().toLowerCase() === 'disable')) return [3 /*break*/, 71];
                    x = 0;
                    _b.label = 67;
                case 67:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 71];
                    if (!(commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 70];
                    guildData.logs[x].loggingChannelID = '';
                    guildData.logs[x].loggingChannelName = '';
                    guildData.logs[x].enabled = false;
                    return [4 /*yield*/, guildData.writeToDataBase()];
                case 68:
                    _b.sent();
                    msgEmbed_10 = new Discord.MessageEmbed();
                    msgString_10 = "------\n**Nicely done! You've disabled logging for '" + guildData.logs[x].name + "'.**\n------";
                    msgEmbed_10
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString_10)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Disabled:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed_10)];
                case 69:
                    _b.sent();
                    return [3 /*break*/, 71];
                case 70:
                    x += 1;
                    return [3 /*break*/, 67];
                case 71: return [3 /*break*/, 183];
                case 72:
                    if (!(commandData.args[0].toString().toLowerCase() === 'enable')) return [3 /*break*/, 78];
                    x = 0;
                    _b.label = 73;
                case 73:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 77];
                    if (!(commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 76];
                    guildData.logs[x].loggingChannelID = commandData.permsChannel.id;
                    guildData.logs[x].loggingChannelName = commandData.permsChannel.name;
                    guildData.logs[x].enabled = true;
                    return [4 /*yield*/, guildData.writeToDataBase()];
                case 74:
                    _b.sent();
                    msgEmbed_11 = new Discord.MessageEmbed();
                    msgString_11 = "------\n**Nicely done! You've enabled logging for '" + guildData.logs[x].name + "'.\nIn channel <#" + guildData.logs[x].loggingChannelID + ">.**\n------";
                    msgEmbed_11
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString_11)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Enabled:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed_11)];
                case 75:
                    _b.sent();
                    return [3 /*break*/, 77];
                case 76:
                    x += 1;
                    return [3 /*break*/, 73];
                case 77: return [3 /*break*/, 83];
                case 78:
                    if (!(commandData.args[0].toString().toLowerCase() === 'disable')) return [3 /*break*/, 83];
                    x = 0;
                    _b.label = 79;
                case 79:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 83];
                    if (!(commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 82];
                    guildData.logs[x].loggingChannelID = '';
                    guildData.logs[x].loggingChannelName = '';
                    guildData.logs[x].enabled = false;
                    return [4 /*yield*/, guildData.writeToDataBase()];
                case 80:
                    _b.sent();
                    msgEmbed_12 = new Discord.MessageEmbed();
                    msgString_12 = "------\n**Nicely done! You've disabled logging for '" + guildData.logs[x].name + "'.**\n------";
                    msgEmbed_12
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString_12)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Disabled:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed_12)];
                case 81:
                    _b.sent();
                    return [3 /*break*/, 83];
                case 82:
                    x += 1;
                    return [3 /*break*/, 79];
                case 83: return [3 /*break*/, 183];
                case 84:
                    if (!(commandData.args[0].toString().toLowerCase() === 'enable')) return [3 /*break*/, 90];
                    x = 0;
                    _b.label = 85;
                case 85:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 89];
                    if (!(commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 88];
                    guildData.logs[x].loggingChannelID = commandData.permsChannel.id;
                    guildData.logs[x].loggingChannelName = commandData.permsChannel.name;
                    guildData.logs[x].enabled = true;
                    return [4 /*yield*/, guildData.writeToDataBase()];
                case 86:
                    _b.sent();
                    msgEmbed_13 = new Discord.MessageEmbed();
                    msgString_13 = "------\n**Nicely done! You've enabled logging for '" + guildData.logs[x].name + "'.\nIn channel <#" + guildData.logs[x].loggingChannelID + ">.**\n------";
                    msgEmbed_13
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString_13)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Enabled:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed_13)];
                case 87:
                    _b.sent();
                    return [3 /*break*/, 89];
                case 88:
                    x += 1;
                    return [3 /*break*/, 85];
                case 89: return [3 /*break*/, 95];
                case 90:
                    if (!(commandData.args[0].toString().toLowerCase() === 'disable')) return [3 /*break*/, 95];
                    x = 0;
                    _b.label = 91;
                case 91:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 95];
                    if (!(commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 94];
                    guildData.logs[x].loggingChannelID = '';
                    guildData.logs[x].loggingChannelName = '';
                    guildData.logs[x].enabled = false;
                    return [4 /*yield*/, guildData.writeToDataBase()];
                case 92:
                    _b.sent();
                    msgEmbed_14 = new Discord.MessageEmbed();
                    msgString_14 = "------\n**Nicely done! You've disabled logging for '" + guildData.logs[x].name + "'.**\n------";
                    msgEmbed_14
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString_14)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Disabled:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed_14)];
                case 93:
                    _b.sent();
                    return [3 /*break*/, 95];
                case 94:
                    x += 1;
                    return [3 /*break*/, 91];
                case 95: return [3 /*break*/, 183];
                case 96:
                    if (!(commandData.args[0].toString().toLowerCase() === 'enable')) return [3 /*break*/, 102];
                    x = 0;
                    _b.label = 97;
                case 97:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 101];
                    if (!(commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 100];
                    guildData.logs[x].loggingChannelID = commandData.permsChannel.id;
                    guildData.logs[x].loggingChannelName = commandData.permsChannel.name;
                    guildData.logs[x].enabled = true;
                    return [4 /*yield*/, guildData.writeToDataBase()];
                case 98:
                    _b.sent();
                    msgEmbed_15 = new Discord.MessageEmbed();
                    msgString_15 = "------\n**Nicely done! You've enabled logging for '" + guildData.logs[x].name + "'.\nIn channel <#" + guildData.logs[x].loggingChannelID + ">.**\n------";
                    msgEmbed_15
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString_15)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Enabled:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed_15)];
                case 99:
                    _b.sent();
                    return [3 /*break*/, 101];
                case 100:
                    x += 1;
                    return [3 /*break*/, 97];
                case 101: return [3 /*break*/, 107];
                case 102:
                    if (!(commandData.args[0].toString().toLowerCase() === 'disable')) return [3 /*break*/, 107];
                    x = 0;
                    _b.label = 103;
                case 103:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 107];
                    if (!(commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 106];
                    guildData.logs[x].loggingChannelID = '';
                    guildData.logs[x].loggingChannelName = '';
                    guildData.logs[x].enabled = false;
                    return [4 /*yield*/, guildData.writeToDataBase()];
                case 104:
                    _b.sent();
                    msgEmbed_16 = new Discord.MessageEmbed();
                    msgString_16 = "------\n**Nicely done! You've disabled logging for '" + guildData.logs[x].name + "'.**\n------";
                    msgEmbed_16
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString_16)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Disabled:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed_16)];
                case 105:
                    _b.sent();
                    return [3 /*break*/, 107];
                case 106:
                    x += 1;
                    return [3 /*break*/, 103];
                case 107: return [3 /*break*/, 183];
                case 108:
                    if (!(commandData.args[0].toString().toLowerCase() === 'enable')) return [3 /*break*/, 114];
                    x = 0;
                    _b.label = 109;
                case 109:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 113];
                    if (!(commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 112];
                    guildData.logs[x].loggingChannelID = commandData.permsChannel.id;
                    guildData.logs[x].loggingChannelName = commandData.permsChannel.name;
                    guildData.logs[x].enabled = true;
                    return [4 /*yield*/, guildData.writeToDataBase()];
                case 110:
                    _b.sent();
                    msgEmbed_17 = new Discord.MessageEmbed();
                    msgString_17 = "------\n**Nicely done! You've enabled logging for '" + guildData.logs[x].name + "'.\nIn channel <#" + guildData.logs[x].loggingChannelID + ">.**\n------";
                    msgEmbed_17
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString_17)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Enabled:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed_17)];
                case 111:
                    _b.sent();
                    return [3 /*break*/, 113];
                case 112:
                    x += 1;
                    return [3 /*break*/, 109];
                case 113: return [3 /*break*/, 119];
                case 114:
                    if (!(commandData.args[0].toString().toLowerCase() === 'disable')) return [3 /*break*/, 119];
                    x = 0;
                    _b.label = 115;
                case 115:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 119];
                    if (!(commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 118];
                    guildData.logs[x].loggingChannelID = '';
                    guildData.logs[x].loggingChannelName = '';
                    guildData.logs[x].enabled = false;
                    return [4 /*yield*/, guildData.writeToDataBase()];
                case 116:
                    _b.sent();
                    msgEmbed_18 = new Discord.MessageEmbed();
                    msgString_18 = "------\n**Nicely done! You've disabled logging for '" + guildData.logs[x].name + "'.**\n------";
                    msgEmbed_18
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString_18)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Disabled:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed_18)];
                case 117:
                    _b.sent();
                    return [3 /*break*/, 119];
                case 118:
                    x += 1;
                    return [3 /*break*/, 115];
                case 119: return [3 /*break*/, 183];
                case 120:
                    if (!(commandData.args[0].toString().toLowerCase() === 'enable')) return [3 /*break*/, 126];
                    x = 0;
                    _b.label = 121;
                case 121:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 125];
                    if (!(commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 124];
                    guildData.logs[x].loggingChannelID = commandData.permsChannel.id;
                    guildData.logs[x].loggingChannelName = commandData.permsChannel.name;
                    guildData.logs[x].enabled = true;
                    return [4 /*yield*/, guildData.writeToDataBase()];
                case 122:
                    _b.sent();
                    msgEmbed_19 = new Discord.MessageEmbed();
                    msgString_19 = "------\n**Nicely done! You've enabled logging for '" + guildData.logs[x].name + "'.\nIn channel <#" + guildData.logs[x].loggingChannelID + ">.**\n------";
                    msgEmbed_19
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString_19)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Enabled:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed_19)];
                case 123:
                    _b.sent();
                    return [3 /*break*/, 125];
                case 124:
                    x += 1;
                    return [3 /*break*/, 121];
                case 125: return [3 /*break*/, 131];
                case 126:
                    if (!(commandData.args[0].toString().toLowerCase() === 'disable')) return [3 /*break*/, 131];
                    x = 0;
                    _b.label = 127;
                case 127:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 131];
                    if (!(commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 130];
                    guildData.logs[x].enabled = true;
                    guildData.logs[x].loggingChannelName = '';
                    guildData.logs[x].enabled = false;
                    return [4 /*yield*/, guildData.writeToDataBase()];
                case 128:
                    _b.sent();
                    msgEmbed_20 = new Discord.MessageEmbed();
                    msgString_20 = "------\n**Nicely done! You've disabled logging for '" + guildData.logs[x].name + "'.**\n------";
                    msgEmbed_20
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString_20)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Disabled:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed_20)];
                case 129:
                    _b.sent();
                    return [3 /*break*/, 131];
                case 130:
                    x += 1;
                    return [3 /*break*/, 127];
                case 131: return [3 /*break*/, 183];
                case 132:
                    if (!(commandData.args[0].toString().toLowerCase() === 'enable')) return [3 /*break*/, 138];
                    x = 0;
                    _b.label = 133;
                case 133:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 137];
                    if (!(commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 136];
                    guildData.logs[x].loggingChannelID = commandData.permsChannel.id;
                    guildData.logs[x].loggingChannelName = commandData.permsChannel.name;
                    guildData.logs[x].enabled = true;
                    return [4 /*yield*/, guildData.writeToDataBase()];
                case 134:
                    _b.sent();
                    msgEmbed_21 = new Discord.MessageEmbed();
                    msgString_21 = "------\n**Nicely done! You've enabled logging for '" + guildData.logs[x].name + "'.\nIn channel <#" + guildData.logs[x].loggingChannelID + ">.**\n------";
                    msgEmbed_21
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString_21)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Enabled:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed_21)];
                case 135:
                    _b.sent();
                    return [3 /*break*/, 137];
                case 136:
                    x += 1;
                    return [3 /*break*/, 133];
                case 137: return [3 /*break*/, 143];
                case 138:
                    if (!(commandData.args[0].toString().toLowerCase() === 'disable')) return [3 /*break*/, 143];
                    x = 0;
                    _b.label = 139;
                case 139:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 143];
                    if (!(commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 142];
                    guildData.logs[x].loggingChannelID = '';
                    guildData.logs[x].loggingChannelName = '';
                    guildData.logs[x].enabled = false;
                    return [4 /*yield*/, guildData.writeToDataBase()];
                case 140:
                    _b.sent();
                    msgEmbed_22 = new Discord.MessageEmbed();
                    msgString_22 = "------\n**Nicely done! You've disabled logging for '" + guildData.logs[x].name + "'.**\n------";
                    msgEmbed_22
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString_22)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Disabled:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed_22)];
                case 141:
                    _b.sent();
                    return [3 /*break*/, 143];
                case 142:
                    x += 1;
                    return [3 /*break*/, 139];
                case 143: return [3 /*break*/, 183];
                case 144:
                    if (!(commandData.args[0].toString().toLowerCase() === 'enable')) return [3 /*break*/, 150];
                    x = 0;
                    _b.label = 145;
                case 145:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 149];
                    if (!(commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 148];
                    guildData.logs[x].loggingChannelID = commandData.permsChannel.id;
                    guildData.logs[x].loggingChannelName = commandData.permsChannel.name;
                    guildData.logs[x].enabled = true;
                    return [4 /*yield*/, guildData.writeToDataBase()];
                case 146:
                    _b.sent();
                    msgEmbed_23 = new Discord.MessageEmbed();
                    msgString_23 = "------\n**Nicely done! You've enabled logging for '" + guildData.logs[x].name + "'.\nIn channel <#" + guildData.logs[x].loggingChannelID + ">.**\n------";
                    msgEmbed_23
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString_23)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Enabled:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed_23)];
                case 147:
                    _b.sent();
                    return [3 /*break*/, 149];
                case 148:
                    x += 1;
                    return [3 /*break*/, 145];
                case 149: return [3 /*break*/, 155];
                case 150:
                    if (!(commandData.args[0].toString().toLowerCase() === 'disable')) return [3 /*break*/, 155];
                    x = 0;
                    _b.label = 151;
                case 151:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 155];
                    if (!(commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 154];
                    guildData.logs[x].loggingChannelID = '';
                    guildData.logs[x].loggingChannelName = '';
                    guildData.logs[x].enabled = false;
                    return [4 /*yield*/, guildData.writeToDataBase()];
                case 152:
                    _b.sent();
                    msgEmbed_24 = new Discord.MessageEmbed();
                    msgString_24 = "------\n**Nicely done! You've disabled logging for '" + guildData.logs[x].name + "'.**\n------";
                    msgEmbed_24
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString_24)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Disabled:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed_24)];
                case 153:
                    _b.sent();
                    return [3 /*break*/, 155];
                case 154:
                    x += 1;
                    return [3 /*break*/, 151];
                case 155: return [3 /*break*/, 183];
                case 156:
                    if (!(commandData.args[0].toString().toLowerCase() === 'enable')) return [3 /*break*/, 162];
                    x = 0;
                    _b.label = 157;
                case 157:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 161];
                    if (!(commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 160];
                    guildData.logs[x].loggingChannelID = commandData.permsChannel.id;
                    guildData.logs[x].loggingChannelName = commandData.permsChannel.name;
                    guildData.logs[x].enabled = true;
                    return [4 /*yield*/, guildData.writeToDataBase()];
                case 158:
                    _b.sent();
                    msgEmbed_25 = new Discord.MessageEmbed();
                    msgString_25 = "------\n**Nicely done! You've enabled logging for '" + guildData.logs[x].name + "'.\nIn channel <#" + guildData.logs[x].loggingChannelID + ">.**\n------";
                    msgEmbed_25
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString_25)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Enabled:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed_25)];
                case 159:
                    _b.sent();
                    return [3 /*break*/, 161];
                case 160:
                    x += 1;
                    return [3 /*break*/, 157];
                case 161: return [3 /*break*/, 167];
                case 162:
                    if (!(commandData.args[0].toString().toLowerCase() === 'disable')) return [3 /*break*/, 167];
                    x = 0;
                    _b.label = 163;
                case 163:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 167];
                    if (!(commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 166];
                    guildData.logs[x].loggingChannelID = '';
                    guildData.logs[x].enabled = false;
                    guildData.logs[x].enabled = false;
                    return [4 /*yield*/, guildData.writeToDataBase()];
                case 164:
                    _b.sent();
                    msgEmbed_26 = new Discord.MessageEmbed();
                    msgString_26 = "------\n**Nicely done! You've disabled logging for '" + guildData.logs[x].name + "'.**\n------";
                    msgEmbed_26
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString_26)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Disabled:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed_26)];
                case 165:
                    _b.sent();
                    return [3 /*break*/, 167];
                case 166:
                    x += 1;
                    return [3 /*break*/, 163];
                case 167: return [3 /*break*/, 183];
                case 168:
                    if (!(commandData.args[0].toString().toLowerCase() === 'enable')) return [3 /*break*/, 174];
                    x = 0;
                    _b.label = 169;
                case 169:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 173];
                    if (!(commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 172];
                    guildData.logs[x].loggingChannelID = commandData.permsChannel.id;
                    guildData.logs[x].loggingChannelName = commandData.permsChannel.name;
                    guildData.logs[x].enabled = true;
                    return [4 /*yield*/, guildData.writeToDataBase()];
                case 170:
                    _b.sent();
                    msgEmbed_27 = new Discord.MessageEmbed();
                    msgString_27 = "------\n**Nicely done! You've enabled logging for '" + guildData.logs[x].name + "'.\nIn channel <#" + guildData.logs[x].loggingChannelID + ">.**\n------";
                    msgEmbed_27
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString_27)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Enabled:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed_27)];
                case 171:
                    _b.sent();
                    return [3 /*break*/, 173];
                case 172:
                    x += 1;
                    return [3 /*break*/, 169];
                case 173: return [3 /*break*/, 179];
                case 174:
                    if (!(commandData.args[0].toString().toLowerCase() === 'disable')) return [3 /*break*/, 179];
                    x = 0;
                    _b.label = 175;
                case 175:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 179];
                    if (!(commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 178];
                    guildData.logs[x].loggingChannelID = '';
                    guildData.logs[x].loggingChannelName = '';
                    guildData.logs[x].enabled = false;
                    return [4 /*yield*/, guildData.writeToDataBase()];
                case 176:
                    _b.sent();
                    msgEmbed_28 = new Discord.MessageEmbed();
                    msgString_28 = "------\n**Nicely done! You've disabled logging for '" + guildData.logs[x].name + "'.**\n------";
                    msgEmbed_28
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString_28)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Disabled:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed_28)];
                case 177:
                    _b.sent();
                    return [3 /*break*/, 179];
                case 178:
                    x += 1;
                    return [3 /*break*/, 175];
                case 179: return [3 /*break*/, 183];
                case 180:
                    msgString = 'Please enter a proper log name!';
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 181:
                    msg = _b.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 182:
                    _b.sent();
                    return [2 /*return*/, commandReturnData];
                case 183: return [2 /*return*/, commandReturnData];
                case 184:
                    error_1 = _b.sent();
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            reject(error_1);
                        })];
                case 185: return [2 /*return*/];
            }
        });
    });
}
command.function = execute;
exports.default = command;
