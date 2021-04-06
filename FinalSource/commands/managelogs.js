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
                    _b.trys.push([0, 183, , 184]);
                    commandReturnData = {
                        commandName: command.name
                    };
                    commandReturnData.commandName = command.name;
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
                    if (!(commandData.args[0] === undefined)) return [3 /*break*/, 4];
                    fields = [];
                    for (x = 0; x < guildData.exposeDataValues().logs.length; x += 1) {
                        if (commandData.guildMember.client.channels.resolve(guildData.exposeDataValues().logs[x].loggingChannelID) === null) {
                            guildData.exposeDataValues().logs[x].loggingChannelID = '';
                            guildData.exposeDataValues().logs[x].loggingChannelName = '';
                            guildData.exposeDataValues().logs[x].enabled = false;
                        }
                        if (guildData.exposeDataValues().logs[x].enabled === false) {
                            field = { name: "__**" + guildData.exposeDataValues().logs[x].name + "**__", value: '__Enabled:__ ❌', inline: true };
                            fields.push(field);
                        }
                        else if (guildData.exposeDataValues().logs[x].enabled === true) {
                            field = { name: "__**" + guildData.exposeDataValues().logs[x].name + "**__", value: "__Enabled:__ \u2705\n                        \n__Logging Channel:__ <#" + guildData.exposeDataValues().logs[x].loggingChannelID + ">", inline: true };
                            fields.push(field);
                        }
                    }
                    msgEmbed = new Discord.MessageEmbed();
                    msgString = '';
                    msgString = "**To enable/disable a given log, enter within the text channel where you would like it to be logged: !managelogs = \n                <enable/disable>, <logname>\nFor example, '!managelogs = enable, guildbanadd'.**'";
                    msgEmbed
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.exposeDataValues().borderColor)
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs:**__').fields = fields;
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 3:
                    _b.sent();
                    return [3 /*break*/, 182];
                case 4:
                    if (!(commandData.args[0].toString().toLowerCase() !== 'enable' && commandData.args[0].toString().toLowerCase() !== 'disable')) return [3 /*break*/, 7];
                    msgString = "------\n**Please, enter enable or disable for the first argument of this command! \n            (!managelogs = <enable/disable>, <logname>)**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.exposeDataValues().borderColor)
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Missing Or Invalid Arguments:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 5:
                    msg = _b.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 6:
                    _b.sent();
                    return [2 /*return*/, commandReturnData];
                case 7:
                    if (!(commandData.args[1] === undefined)) return [3 /*break*/, 10];
                    msgString = "------\n**Please, enter  a log name to disable or enable as the second argument of this command! \n            (!managelogs = <enable/disable>, <logname>)**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.exposeDataValues().borderColor)
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Missing Or Invalid Arguments:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 8:
                    msg = _b.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 9:
                    _b.sent();
                    return [2 /*return*/, commandReturnData];
                case 10:
                    _a = commandData.args[1].toLowerCase();
                    switch (_a) {
                        case 'guildbanadd': return [3 /*break*/, 11];
                        case 'guildbanremove': return [3 /*break*/, 23];
                        case 'guildmemberadd': return [3 /*break*/, 35];
                        case 'guildmemberremove': return [3 /*break*/, 47];
                        case 'displaynamechange': return [3 /*break*/, 59];
                        case 'nicknamechange': return [3 /*break*/, 71];
                        case 'roleaddorremove': return [3 /*break*/, 83];
                        case 'invitecreate': return [3 /*break*/, 95];
                        case 'messagedelete': return [3 /*break*/, 107];
                        case 'messagedeletebulk': return [3 /*break*/, 119];
                        case 'messageupdate': return [3 /*break*/, 131];
                        case 'rolecreate': return [3 /*break*/, 143];
                        case 'roledelete': return [3 /*break*/, 155];
                        case 'usernamechange': return [3 /*break*/, 167];
                    }
                    return [3 /*break*/, 179];
                case 11:
                    if (!(commandData.args[0].toString().toLowerCase() === 'enable')) return [3 /*break*/, 17];
                    x = 0;
                    _b.label = 12;
                case 12:
                    if (!(x < guildData.exposeDataValues().logs.length)) return [3 /*break*/, 16];
                    if (!(commandData.args[1].toLowerCase() === guildData.exposeDataValues().logs[x].nameSmall)) return [3 /*break*/, 15];
                    guildData.exposeDataValues().logs[x].loggingChannelID = commandData.permsChannel.id;
                    guildData.exposeDataValues().logs[x].loggingChannelName = commandData.permsChannel.name;
                    guildData.exposeDataValues().logs[x].enabled = true;
                    return [4 /*yield*/, guildData.writeToDataBase()];
                case 13:
                    _b.sent();
                    msgEmbed_1 = new Discord.MessageEmbed();
                    msgString_1 = "------\n**Nicely done! You've enabled logging for '" + guildData.exposeDataValues().logs[x].name + "'.\nIn channel <#" + guildData.exposeDataValues().logs[x].loggingChannelID + ">.**\n------";
                    msgEmbed_1
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.exposeDataValues().borderColor)
                        .setDescription(msgString_1)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Enabled:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed_1)];
                case 14:
                    _b.sent();
                    return [3 /*break*/, 16];
                case 15:
                    x += 1;
                    return [3 /*break*/, 12];
                case 16: return [3 /*break*/, 22];
                case 17:
                    if (!(commandData.args[0].toString().toLowerCase() === 'disable')) return [3 /*break*/, 22];
                    x = 0;
                    _b.label = 18;
                case 18:
                    if (!(x < guildData.exposeDataValues().logs.length)) return [3 /*break*/, 22];
                    if (!(commandData.args[1].toLowerCase() === guildData.exposeDataValues().logs[x].nameSmall)) return [3 /*break*/, 21];
                    guildData.exposeDataValues().logs[x].loggingChannelID = '';
                    guildData.exposeDataValues().logs[x].loggingChannelName = '';
                    guildData.exposeDataValues().logs[x].enabled = false;
                    return [4 /*yield*/, guildData.writeToDataBase()];
                case 19:
                    _b.sent();
                    msgEmbed_2 = new Discord.MessageEmbed();
                    msgString_2 = "------\n**Nicely done! You've disabled logging for '" + guildData.exposeDataValues().logs[x].name + "'.**\n------";
                    msgEmbed_2
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.exposeDataValues().borderColor)
                        .setDescription(msgString_2)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Disabled:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed_2)];
                case 20:
                    _b.sent();
                    return [3 /*break*/, 22];
                case 21:
                    x += 1;
                    return [3 /*break*/, 18];
                case 22: return [3 /*break*/, 182];
                case 23:
                    if (!(commandData.args[0].toString().toLowerCase() === 'enable')) return [3 /*break*/, 29];
                    x = 0;
                    _b.label = 24;
                case 24:
                    if (!(x < guildData.exposeDataValues().logs.length)) return [3 /*break*/, 28];
                    if (!(commandData.args[1].toLowerCase() === guildData.exposeDataValues().logs[x].nameSmall)) return [3 /*break*/, 27];
                    guildData.exposeDataValues().logs[x].loggingChannelID = commandData.permsChannel.id;
                    guildData.exposeDataValues().logs[x].loggingChannelName = commandData.permsChannel.name;
                    guildData.exposeDataValues().logs[x].enabled = true;
                    return [4 /*yield*/, guildData.writeToDataBase()];
                case 25:
                    _b.sent();
                    msgEmbed_3 = new Discord.MessageEmbed();
                    msgString_3 = "------\n**Nicely done! You've enabled logging for '" + guildData.exposeDataValues().logs[x].name + "'.\nIn channel <#" + guildData.exposeDataValues().logs[x].loggingChannelID + ">.**\n------";
                    msgEmbed_3
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.exposeDataValues().borderColor)
                        .setDescription(msgString_3)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Enabled:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed_3)];
                case 26:
                    _b.sent();
                    return [3 /*break*/, 28];
                case 27:
                    x += 1;
                    return [3 /*break*/, 24];
                case 28: return [3 /*break*/, 34];
                case 29:
                    if (!(commandData.args[0].toString().toLowerCase() === 'disable')) return [3 /*break*/, 34];
                    x = 0;
                    _b.label = 30;
                case 30:
                    if (!(x < guildData.exposeDataValues().logs.length)) return [3 /*break*/, 34];
                    if (!(commandData.args[1].toLowerCase() === guildData.exposeDataValues().logs[x].nameSmall)) return [3 /*break*/, 33];
                    guildData.exposeDataValues().logs[x].loggingChannelID = '';
                    guildData.exposeDataValues().logs[x].loggingChannelName = '';
                    guildData.exposeDataValues().logs[x].enabled = false;
                    return [4 /*yield*/, guildData.writeToDataBase()];
                case 31:
                    _b.sent();
                    msgEmbed_4 = new Discord.MessageEmbed();
                    msgString_4 = "------\n**Nicely done! You've disabled logging for '" + guildData.exposeDataValues().logs[x].name + "'.**\n------";
                    msgEmbed_4
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.exposeDataValues().borderColor)
                        .setDescription(msgString_4)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Disabled:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed_4)];
                case 32:
                    _b.sent();
                    return [3 /*break*/, 34];
                case 33:
                    x += 1;
                    return [3 /*break*/, 30];
                case 34: return [3 /*break*/, 182];
                case 35:
                    if (!(commandData.args[0].toString().toLowerCase() === 'enable')) return [3 /*break*/, 41];
                    x = 0;
                    _b.label = 36;
                case 36:
                    if (!(x < guildData.exposeDataValues().logs.length)) return [3 /*break*/, 40];
                    if (!(commandData.args[1].toLowerCase() === guildData.exposeDataValues().logs[x].nameSmall)) return [3 /*break*/, 39];
                    guildData.exposeDataValues().logs[x].loggingChannelID = commandData.permsChannel.id;
                    guildData.exposeDataValues().logs[x].loggingChannelName = commandData.permsChannel.name;
                    guildData.exposeDataValues().logs[x].enabled = true;
                    return [4 /*yield*/, guildData.writeToDataBase()];
                case 37:
                    _b.sent();
                    msgEmbed_5 = new Discord.MessageEmbed();
                    msgString_5 = "------\n**Nicely done! You've enabled logging for '" + guildData.exposeDataValues().logs[x].name + "'.\nIn channel <#" + guildData.exposeDataValues().logs[x].loggingChannelID + ">.**\n------";
                    msgEmbed_5
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.exposeDataValues().borderColor)
                        .setDescription(msgString_5)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Enabled:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed_5)];
                case 38:
                    _b.sent();
                    return [3 /*break*/, 40];
                case 39:
                    x += 1;
                    return [3 /*break*/, 36];
                case 40: return [3 /*break*/, 46];
                case 41:
                    if (!(commandData.args[0].toString().toLowerCase() === 'disable')) return [3 /*break*/, 46];
                    x = 0;
                    _b.label = 42;
                case 42:
                    if (!(x < guildData.exposeDataValues().logs.length)) return [3 /*break*/, 46];
                    if (!(commandData.args[1].toLowerCase() === guildData.exposeDataValues().logs[x].nameSmall)) return [3 /*break*/, 45];
                    guildData.exposeDataValues().logs[x].loggingChannelID = '';
                    guildData.exposeDataValues().logs[x].loggingChannelName = '';
                    guildData.exposeDataValues().logs[x].enabled = false;
                    return [4 /*yield*/, guildData.writeToDataBase()];
                case 43:
                    _b.sent();
                    msgEmbed_6 = new Discord.MessageEmbed();
                    msgString_6 = "------\n**Nicely done! You've disabled logging for '" + guildData.exposeDataValues().logs[x].name + "'.**\n------";
                    msgEmbed_6
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.exposeDataValues().borderColor)
                        .setDescription(msgString_6)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Disabled:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed_6)];
                case 44:
                    _b.sent();
                    return [3 /*break*/, 46];
                case 45:
                    x += 1;
                    return [3 /*break*/, 42];
                case 46: return [3 /*break*/, 182];
                case 47:
                    if (!(commandData.args[0].toString().toLowerCase() === 'enable')) return [3 /*break*/, 53];
                    x = 0;
                    _b.label = 48;
                case 48:
                    if (!(x < guildData.exposeDataValues().logs.length)) return [3 /*break*/, 52];
                    if (!(commandData.args[1].toLowerCase() === guildData.exposeDataValues().logs[x].nameSmall)) return [3 /*break*/, 51];
                    guildData.exposeDataValues().logs[x].loggingChannelID = commandData.permsChannel.id;
                    guildData.exposeDataValues().logs[x].loggingChannelName = commandData.permsChannel.name;
                    guildData.exposeDataValues().logs[x].enabled = true;
                    return [4 /*yield*/, guildData.writeToDataBase()];
                case 49:
                    _b.sent();
                    msgEmbed_7 = new Discord.MessageEmbed();
                    msgString_7 = "------\n**Nicely done! You've enabled logging for '" + guildData.exposeDataValues().logs[x].name + "' in channel <#" + guildData.exposeDataValues().logs[x].loggingChannelID + ">.**\n------'";
                    msgEmbed_7
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.exposeDataValues().borderColor)
                        .setDescription(msgString_7)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Enabled:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed_7)];
                case 50:
                    _b.sent();
                    return [3 /*break*/, 52];
                case 51:
                    x += 1;
                    return [3 /*break*/, 48];
                case 52: return [3 /*break*/, 58];
                case 53:
                    if (!(commandData.args[0].toString().toLowerCase() === 'disable')) return [3 /*break*/, 58];
                    x = 0;
                    _b.label = 54;
                case 54:
                    if (!(x < guildData.exposeDataValues().logs.length)) return [3 /*break*/, 58];
                    if (!(commandData.args[1].toLowerCase() === guildData.exposeDataValues().logs[x].nameSmall)) return [3 /*break*/, 57];
                    guildData.exposeDataValues().logs[x].loggingChannelID = '';
                    guildData.exposeDataValues().logs[x].loggingChannelName = '';
                    guildData.exposeDataValues().logs[x].enabled = false;
                    return [4 /*yield*/, guildData.writeToDataBase()];
                case 55:
                    _b.sent();
                    msgEmbed_8 = new Discord.MessageEmbed();
                    msgString_8 = "------\n**Nicely done! You've disabled logging for '" + guildData.exposeDataValues().logs[x].name + "'.**\n------";
                    msgEmbed_8
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.exposeDataValues().borderColor)
                        .setDescription(msgString_8)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Disabled:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed_8)];
                case 56:
                    _b.sent();
                    return [3 /*break*/, 58];
                case 57:
                    x += 1;
                    return [3 /*break*/, 54];
                case 58: return [3 /*break*/, 182];
                case 59:
                    if (!(commandData.args[0].toString().toLowerCase() === 'enable')) return [3 /*break*/, 65];
                    x = 0;
                    _b.label = 60;
                case 60:
                    if (!(x < guildData.exposeDataValues().logs.length)) return [3 /*break*/, 64];
                    if (!(commandData.args[1].toLowerCase() === guildData.exposeDataValues().logs[x].nameSmall)) return [3 /*break*/, 63];
                    guildData.exposeDataValues().logs[x].loggingChannelID = commandData.permsChannel.id;
                    guildData.exposeDataValues().logs[x].loggingChannelName = commandData.permsChannel.name;
                    guildData.exposeDataValues().logs[x].enabled = true;
                    return [4 /*yield*/, guildData.writeToDataBase()];
                case 61:
                    _b.sent();
                    msgEmbed_9 = new Discord.MessageEmbed();
                    msgString_9 = "------\n**Nicely done! You've enabled logging for '" + guildData.exposeDataValues().logs[x].name + "'.\nIn channel <#" + guildData.exposeDataValues().logs[x].loggingChannelID + ">.**\n------";
                    msgEmbed_9
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.exposeDataValues().borderColor)
                        .setDescription(msgString_9)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Enabled:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed_9)];
                case 62:
                    _b.sent();
                    return [3 /*break*/, 64];
                case 63:
                    x += 1;
                    return [3 /*break*/, 60];
                case 64: return [3 /*break*/, 70];
                case 65:
                    if (!(commandData.args[0].toString().toLowerCase() === 'disable')) return [3 /*break*/, 70];
                    x = 0;
                    _b.label = 66;
                case 66:
                    if (!(x < guildData.exposeDataValues().logs.length)) return [3 /*break*/, 70];
                    if (!(commandData.args[1].toLowerCase() === guildData.exposeDataValues().logs[x].nameSmall)) return [3 /*break*/, 69];
                    guildData.exposeDataValues().logs[x].loggingChannelID = '';
                    guildData.exposeDataValues().logs[x].loggingChannelName = '';
                    guildData.exposeDataValues().logs[x].enabled = false;
                    return [4 /*yield*/, guildData.writeToDataBase()];
                case 67:
                    _b.sent();
                    msgEmbed_10 = new Discord.MessageEmbed();
                    msgString_10 = "------\n**Nicely done! You've disabled logging for '" + guildData.exposeDataValues().logs[x].name + "'.**\n------";
                    msgEmbed_10
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.exposeDataValues().borderColor)
                        .setDescription(msgString_10)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Disabled:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed_10)];
                case 68:
                    _b.sent();
                    return [3 /*break*/, 70];
                case 69:
                    x += 1;
                    return [3 /*break*/, 66];
                case 70: return [3 /*break*/, 182];
                case 71:
                    if (!(commandData.args[0].toString().toLowerCase() === 'enable')) return [3 /*break*/, 77];
                    x = 0;
                    _b.label = 72;
                case 72:
                    if (!(x < guildData.exposeDataValues().logs.length)) return [3 /*break*/, 76];
                    if (!(commandData.args[1].toLowerCase() === guildData.exposeDataValues().logs[x].nameSmall)) return [3 /*break*/, 75];
                    guildData.exposeDataValues().logs[x].loggingChannelID = commandData.permsChannel.id;
                    guildData.exposeDataValues().logs[x].loggingChannelName = commandData.permsChannel.name;
                    guildData.exposeDataValues().logs[x].enabled = true;
                    return [4 /*yield*/, guildData.writeToDataBase()];
                case 73:
                    _b.sent();
                    msgEmbed_11 = new Discord.MessageEmbed();
                    msgString_11 = "------\n**Nicely done! You've enabled logging for '" + guildData.exposeDataValues().logs[x].name + "'.\nIn channel <#" + guildData.exposeDataValues().logs[x].loggingChannelID + ">.**\n------";
                    msgEmbed_11
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.exposeDataValues().borderColor)
                        .setDescription(msgString_11)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Enabled:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed_11)];
                case 74:
                    _b.sent();
                    return [3 /*break*/, 76];
                case 75:
                    x += 1;
                    return [3 /*break*/, 72];
                case 76: return [3 /*break*/, 82];
                case 77:
                    if (!(commandData.args[0].toString().toLowerCase() === 'disable')) return [3 /*break*/, 82];
                    x = 0;
                    _b.label = 78;
                case 78:
                    if (!(x < guildData.exposeDataValues().logs.length)) return [3 /*break*/, 82];
                    if (!(commandData.args[1].toLowerCase() === guildData.exposeDataValues().logs[x].nameSmall)) return [3 /*break*/, 81];
                    guildData.exposeDataValues().logs[x].loggingChannelID = '';
                    guildData.exposeDataValues().logs[x].loggingChannelName = '';
                    guildData.exposeDataValues().logs[x].enabled = false;
                    return [4 /*yield*/, guildData.writeToDataBase()];
                case 79:
                    _b.sent();
                    msgEmbed_12 = new Discord.MessageEmbed();
                    msgString_12 = "------\n**Nicely done! You've disabled logging for '" + guildData.exposeDataValues().logs[x].name + "'.**\n------";
                    msgEmbed_12
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.exposeDataValues().borderColor)
                        .setDescription(msgString_12)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Disabled:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed_12)];
                case 80:
                    _b.sent();
                    return [3 /*break*/, 82];
                case 81:
                    x += 1;
                    return [3 /*break*/, 78];
                case 82: return [3 /*break*/, 182];
                case 83:
                    if (!(commandData.args[0].toString().toLowerCase() === 'enable')) return [3 /*break*/, 89];
                    x = 0;
                    _b.label = 84;
                case 84:
                    if (!(x < guildData.exposeDataValues().logs.length)) return [3 /*break*/, 88];
                    if (!(commandData.args[1].toLowerCase() === guildData.exposeDataValues().logs[x].nameSmall)) return [3 /*break*/, 87];
                    guildData.exposeDataValues().logs[x].loggingChannelID = commandData.permsChannel.id;
                    guildData.exposeDataValues().logs[x].loggingChannelName = commandData.permsChannel.name;
                    guildData.exposeDataValues().logs[x].enabled = true;
                    return [4 /*yield*/, guildData.writeToDataBase()];
                case 85:
                    _b.sent();
                    msgEmbed_13 = new Discord.MessageEmbed();
                    msgString_13 = "------\n**Nicely done! You've enabled logging for '" + guildData.exposeDataValues().logs[x].name + "'.\nIn channel <#" + guildData.exposeDataValues().logs[x].loggingChannelID + ">.**\n------";
                    msgEmbed_13
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.exposeDataValues().borderColor)
                        .setDescription(msgString_13)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Enabled:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed_13)];
                case 86:
                    _b.sent();
                    return [3 /*break*/, 88];
                case 87:
                    x += 1;
                    return [3 /*break*/, 84];
                case 88: return [3 /*break*/, 94];
                case 89:
                    if (!(commandData.args[0].toString().toLowerCase() === 'disable')) return [3 /*break*/, 94];
                    x = 0;
                    _b.label = 90;
                case 90:
                    if (!(x < guildData.exposeDataValues().logs.length)) return [3 /*break*/, 94];
                    if (!(commandData.args[1].toLowerCase() === guildData.exposeDataValues().logs[x].nameSmall)) return [3 /*break*/, 93];
                    guildData.exposeDataValues().logs[x].loggingChannelID = '';
                    guildData.exposeDataValues().logs[x].loggingChannelName = '';
                    guildData.exposeDataValues().logs[x].enabled = false;
                    return [4 /*yield*/, guildData.writeToDataBase()];
                case 91:
                    _b.sent();
                    msgEmbed_14 = new Discord.MessageEmbed();
                    msgString_14 = "------\n**Nicely done! You've disabled logging for '" + guildData.exposeDataValues().logs[x].name + "'.**\n------";
                    msgEmbed_14
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.exposeDataValues().borderColor)
                        .setDescription(msgString_14)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Disabled:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed_14)];
                case 92:
                    _b.sent();
                    return [3 /*break*/, 94];
                case 93:
                    x += 1;
                    return [3 /*break*/, 90];
                case 94: return [3 /*break*/, 182];
                case 95:
                    if (!(commandData.args[0].toString().toLowerCase() === 'enable')) return [3 /*break*/, 101];
                    x = 0;
                    _b.label = 96;
                case 96:
                    if (!(x < guildData.exposeDataValues().logs.length)) return [3 /*break*/, 100];
                    if (!(commandData.args[1].toLowerCase() === guildData.exposeDataValues().logs[x].nameSmall)) return [3 /*break*/, 99];
                    guildData.exposeDataValues().logs[x].loggingChannelID = commandData.permsChannel.id;
                    guildData.exposeDataValues().logs[x].loggingChannelName = commandData.permsChannel.name;
                    guildData.exposeDataValues().logs[x].enabled = true;
                    return [4 /*yield*/, guildData.writeToDataBase()];
                case 97:
                    _b.sent();
                    msgEmbed_15 = new Discord.MessageEmbed();
                    msgString_15 = "------\n**Nicely done! You've enabled logging for '" + guildData.exposeDataValues().logs[x].name + "'.\nIn channel <#" + guildData.exposeDataValues().logs[x].loggingChannelID + ">.**\n------";
                    msgEmbed_15
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.exposeDataValues().borderColor)
                        .setDescription(msgString_15)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Enabled:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed_15)];
                case 98:
                    _b.sent();
                    return [3 /*break*/, 100];
                case 99:
                    x += 1;
                    return [3 /*break*/, 96];
                case 100: return [3 /*break*/, 106];
                case 101:
                    if (!(commandData.args[0].toString().toLowerCase() === 'disable')) return [3 /*break*/, 106];
                    x = 0;
                    _b.label = 102;
                case 102:
                    if (!(x < guildData.exposeDataValues().logs.length)) return [3 /*break*/, 106];
                    if (!(commandData.args[1].toLowerCase() === guildData.exposeDataValues().logs[x].nameSmall)) return [3 /*break*/, 105];
                    guildData.exposeDataValues().logs[x].loggingChannelID = '';
                    guildData.exposeDataValues().logs[x].loggingChannelName = '';
                    guildData.exposeDataValues().logs[x].enabled = false;
                    return [4 /*yield*/, guildData.writeToDataBase()];
                case 103:
                    _b.sent();
                    msgEmbed_16 = new Discord.MessageEmbed();
                    msgString_16 = "------\n**Nicely done! You've disabled logging for '" + guildData.exposeDataValues().logs[x].name + "'.**\n------";
                    msgEmbed_16
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.exposeDataValues().borderColor)
                        .setDescription(msgString_16)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Disabled:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed_16)];
                case 104:
                    _b.sent();
                    return [3 /*break*/, 106];
                case 105:
                    x += 1;
                    return [3 /*break*/, 102];
                case 106: return [3 /*break*/, 182];
                case 107:
                    if (!(commandData.args[0].toString().toLowerCase() === 'enable')) return [3 /*break*/, 113];
                    x = 0;
                    _b.label = 108;
                case 108:
                    if (!(x < guildData.exposeDataValues().logs.length)) return [3 /*break*/, 112];
                    if (!(commandData.args[1].toLowerCase() === guildData.exposeDataValues().logs[x].nameSmall)) return [3 /*break*/, 111];
                    guildData.exposeDataValues().logs[x].loggingChannelID = commandData.permsChannel.id;
                    guildData.exposeDataValues().logs[x].loggingChannelName = commandData.permsChannel.name;
                    guildData.exposeDataValues().logs[x].enabled = true;
                    return [4 /*yield*/, guildData.writeToDataBase()];
                case 109:
                    _b.sent();
                    msgEmbed_17 = new Discord.MessageEmbed();
                    msgString_17 = "------\n**Nicely done! You've enabled logging for '" + guildData.exposeDataValues().logs[x].name + "'.\nIn channel <#" + guildData.exposeDataValues().logs[x].loggingChannelID + ">.**\n------";
                    msgEmbed_17
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.exposeDataValues().borderColor)
                        .setDescription(msgString_17)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Enabled:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed_17)];
                case 110:
                    _b.sent();
                    return [3 /*break*/, 112];
                case 111:
                    x += 1;
                    return [3 /*break*/, 108];
                case 112: return [3 /*break*/, 118];
                case 113:
                    if (!(commandData.args[0].toString().toLowerCase() === 'disable')) return [3 /*break*/, 118];
                    x = 0;
                    _b.label = 114;
                case 114:
                    if (!(x < guildData.exposeDataValues().logs.length)) return [3 /*break*/, 118];
                    if (!(commandData.args[1].toLowerCase() === guildData.exposeDataValues().logs[x].nameSmall)) return [3 /*break*/, 117];
                    guildData.exposeDataValues().logs[x].loggingChannelID = '';
                    guildData.exposeDataValues().logs[x].loggingChannelName = '';
                    guildData.exposeDataValues().logs[x].enabled = false;
                    return [4 /*yield*/, guildData.writeToDataBase()];
                case 115:
                    _b.sent();
                    msgEmbed_18 = new Discord.MessageEmbed();
                    msgString_18 = "------\n**Nicely done! You've disabled logging for '" + guildData.exposeDataValues().logs[x].name + "'.**\n------";
                    msgEmbed_18
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.exposeDataValues().borderColor)
                        .setDescription(msgString_18)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Disabled:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed_18)];
                case 116:
                    _b.sent();
                    return [3 /*break*/, 118];
                case 117:
                    x += 1;
                    return [3 /*break*/, 114];
                case 118: return [3 /*break*/, 182];
                case 119:
                    if (!(commandData.args[0].toString().toLowerCase() === 'enable')) return [3 /*break*/, 125];
                    x = 0;
                    _b.label = 120;
                case 120:
                    if (!(x < guildData.exposeDataValues().logs.length)) return [3 /*break*/, 124];
                    if (!(commandData.args[1].toLowerCase() === guildData.exposeDataValues().logs[x].nameSmall)) return [3 /*break*/, 123];
                    guildData.exposeDataValues().logs[x].loggingChannelID = commandData.permsChannel.id;
                    guildData.exposeDataValues().logs[x].loggingChannelName = commandData.permsChannel.name;
                    guildData.exposeDataValues().logs[x].enabled = true;
                    return [4 /*yield*/, guildData.writeToDataBase()];
                case 121:
                    _b.sent();
                    msgEmbed_19 = new Discord.MessageEmbed();
                    msgString_19 = "------\n**Nicely done! You've enabled logging for '" + guildData.exposeDataValues().logs[x].name + "'.\nIn channel <#" + guildData.exposeDataValues().logs[x].loggingChannelID + ">.**\n------";
                    msgEmbed_19
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.exposeDataValues().borderColor)
                        .setDescription(msgString_19)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Enabled:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed_19)];
                case 122:
                    _b.sent();
                    return [3 /*break*/, 124];
                case 123:
                    x += 1;
                    return [3 /*break*/, 120];
                case 124: return [3 /*break*/, 130];
                case 125:
                    if (!(commandData.args[0].toString().toLowerCase() === 'disable')) return [3 /*break*/, 130];
                    x = 0;
                    _b.label = 126;
                case 126:
                    if (!(x < guildData.exposeDataValues().logs.length)) return [3 /*break*/, 130];
                    if (!(commandData.args[1].toLowerCase() === guildData.exposeDataValues().logs[x].nameSmall)) return [3 /*break*/, 129];
                    guildData.exposeDataValues().logs[x].enabled = true;
                    guildData.exposeDataValues().logs[x].loggingChannelName = '';
                    guildData.exposeDataValues().logs[x].enabled = false;
                    return [4 /*yield*/, guildData.writeToDataBase()];
                case 127:
                    _b.sent();
                    msgEmbed_20 = new Discord.MessageEmbed();
                    msgString_20 = "------\n**Nicely done! You've disabled logging for '" + guildData.exposeDataValues().logs[x].name + "'.**\n------";
                    msgEmbed_20
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.exposeDataValues().borderColor)
                        .setDescription(msgString_20)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Disabled:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed_20)];
                case 128:
                    _b.sent();
                    return [3 /*break*/, 130];
                case 129:
                    x += 1;
                    return [3 /*break*/, 126];
                case 130: return [3 /*break*/, 182];
                case 131:
                    if (!(commandData.args[0].toString().toLowerCase() === 'enable')) return [3 /*break*/, 137];
                    x = 0;
                    _b.label = 132;
                case 132:
                    if (!(x < guildData.exposeDataValues().logs.length)) return [3 /*break*/, 136];
                    if (!(commandData.args[1].toLowerCase() === guildData.exposeDataValues().logs[x].nameSmall)) return [3 /*break*/, 135];
                    guildData.exposeDataValues().logs[x].loggingChannelID = commandData.permsChannel.id;
                    guildData.exposeDataValues().logs[x].loggingChannelName = commandData.permsChannel.name;
                    guildData.exposeDataValues().logs[x].enabled = true;
                    return [4 /*yield*/, guildData.writeToDataBase()];
                case 133:
                    _b.sent();
                    msgEmbed_21 = new Discord.MessageEmbed();
                    msgString_21 = "------\n**Nicely done! You've enabled logging for '" + guildData.exposeDataValues().logs[x].name + "'.\nIn channel <#" + guildData.exposeDataValues().logs[x].loggingChannelID + ">.**\n------";
                    msgEmbed_21
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.exposeDataValues().borderColor)
                        .setDescription(msgString_21)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Enabled:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed_21)];
                case 134:
                    _b.sent();
                    return [3 /*break*/, 136];
                case 135:
                    x += 1;
                    return [3 /*break*/, 132];
                case 136: return [3 /*break*/, 142];
                case 137:
                    if (!(commandData.args[0].toString().toLowerCase() === 'disable')) return [3 /*break*/, 142];
                    x = 0;
                    _b.label = 138;
                case 138:
                    if (!(x < guildData.exposeDataValues().logs.length)) return [3 /*break*/, 142];
                    if (!(commandData.args[1].toLowerCase() === guildData.exposeDataValues().logs[x].nameSmall)) return [3 /*break*/, 141];
                    guildData.exposeDataValues().logs[x].loggingChannelID = '';
                    guildData.exposeDataValues().logs[x].loggingChannelName = '';
                    guildData.exposeDataValues().logs[x].enabled = false;
                    return [4 /*yield*/, guildData.writeToDataBase()];
                case 139:
                    _b.sent();
                    msgEmbed_22 = new Discord.MessageEmbed();
                    msgString_22 = "------\n**Nicely done! You've disabled logging for '" + guildData.exposeDataValues().logs[x].name + "'.**\n------";
                    msgEmbed_22
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.exposeDataValues().borderColor)
                        .setDescription(msgString_22)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Disabled:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed_22)];
                case 140:
                    _b.sent();
                    return [3 /*break*/, 142];
                case 141:
                    x += 1;
                    return [3 /*break*/, 138];
                case 142: return [3 /*break*/, 182];
                case 143:
                    if (!(commandData.args[0].toString().toLowerCase() === 'enable')) return [3 /*break*/, 149];
                    x = 0;
                    _b.label = 144;
                case 144:
                    if (!(x < guildData.exposeDataValues().logs.length)) return [3 /*break*/, 148];
                    if (!(commandData.args[1].toLowerCase() === guildData.exposeDataValues().logs[x].nameSmall)) return [3 /*break*/, 147];
                    guildData.exposeDataValues().logs[x].loggingChannelID = commandData.permsChannel.id;
                    guildData.exposeDataValues().logs[x].loggingChannelName = commandData.permsChannel.name;
                    guildData.exposeDataValues().logs[x].enabled = true;
                    return [4 /*yield*/, guildData.writeToDataBase()];
                case 145:
                    _b.sent();
                    msgEmbed_23 = new Discord.MessageEmbed();
                    msgString_23 = "------\n**Nicely done! You've enabled logging for '" + guildData.exposeDataValues().logs[x].name + "'.\nIn channel <#" + guildData.exposeDataValues().logs[x].loggingChannelID + ">.**\n------";
                    msgEmbed_23
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.exposeDataValues().borderColor)
                        .setDescription(msgString_23)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Enabled:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed_23)];
                case 146:
                    _b.sent();
                    return [3 /*break*/, 148];
                case 147:
                    x += 1;
                    return [3 /*break*/, 144];
                case 148: return [3 /*break*/, 154];
                case 149:
                    if (!(commandData.args[0].toString().toLowerCase() === 'disable')) return [3 /*break*/, 154];
                    x = 0;
                    _b.label = 150;
                case 150:
                    if (!(x < guildData.exposeDataValues().logs.length)) return [3 /*break*/, 154];
                    if (!(commandData.args[1].toLowerCase() === guildData.exposeDataValues().logs[x].nameSmall)) return [3 /*break*/, 153];
                    guildData.exposeDataValues().logs[x].loggingChannelID = '';
                    guildData.exposeDataValues().logs[x].loggingChannelName = '';
                    guildData.exposeDataValues().logs[x].enabled = false;
                    return [4 /*yield*/, guildData.writeToDataBase()];
                case 151:
                    _b.sent();
                    msgEmbed_24 = new Discord.MessageEmbed();
                    msgString_24 = "------\n**Nicely done! You've disabled logging for '" + guildData.exposeDataValues().logs[x].name + "'.**\n------";
                    msgEmbed_24
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.exposeDataValues().borderColor)
                        .setDescription(msgString_24)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Disabled:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed_24)];
                case 152:
                    _b.sent();
                    return [3 /*break*/, 154];
                case 153:
                    x += 1;
                    return [3 /*break*/, 150];
                case 154: return [3 /*break*/, 182];
                case 155:
                    if (!(commandData.args[0].toString().toLowerCase() === 'enable')) return [3 /*break*/, 161];
                    x = 0;
                    _b.label = 156;
                case 156:
                    if (!(x < guildData.exposeDataValues().logs.length)) return [3 /*break*/, 160];
                    if (!(commandData.args[1].toLowerCase() === guildData.exposeDataValues().logs[x].nameSmall)) return [3 /*break*/, 159];
                    guildData.exposeDataValues().logs[x].loggingChannelID = commandData.permsChannel.id;
                    guildData.exposeDataValues().logs[x].loggingChannelName = commandData.permsChannel.name;
                    guildData.exposeDataValues().logs[x].enabled = true;
                    return [4 /*yield*/, guildData.writeToDataBase()];
                case 157:
                    _b.sent();
                    msgEmbed_25 = new Discord.MessageEmbed();
                    msgString_25 = "------\n**Nicely done! You've enabled logging for '" + guildData.exposeDataValues().logs[x].name + "'.\nIn channel <#" + guildData.exposeDataValues().logs[x].loggingChannelID + ">.**\n------";
                    msgEmbed_25
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.exposeDataValues().borderColor)
                        .setDescription(msgString_25)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Enabled:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed_25)];
                case 158:
                    _b.sent();
                    return [3 /*break*/, 160];
                case 159:
                    x += 1;
                    return [3 /*break*/, 156];
                case 160: return [3 /*break*/, 166];
                case 161:
                    if (!(commandData.args[0].toString().toLowerCase() === 'disable')) return [3 /*break*/, 166];
                    x = 0;
                    _b.label = 162;
                case 162:
                    if (!(x < guildData.exposeDataValues().logs.length)) return [3 /*break*/, 166];
                    if (!(commandData.args[1].toLowerCase() === guildData.exposeDataValues().logs[x].nameSmall)) return [3 /*break*/, 165];
                    guildData.exposeDataValues().logs[x].loggingChannelID = '';
                    guildData.exposeDataValues().logs[x].enabled = false;
                    guildData.exposeDataValues().logs[x].enabled = false;
                    return [4 /*yield*/, guildData.writeToDataBase()];
                case 163:
                    _b.sent();
                    msgEmbed_26 = new Discord.MessageEmbed();
                    msgString_26 = "------\n**Nicely done! You've disabled logging for '" + guildData.exposeDataValues().logs[x].name + "'.**\n------";
                    msgEmbed_26
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.exposeDataValues().borderColor)
                        .setDescription(msgString_26)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Disabled:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed_26)];
                case 164:
                    _b.sent();
                    return [3 /*break*/, 166];
                case 165:
                    x += 1;
                    return [3 /*break*/, 162];
                case 166: return [3 /*break*/, 182];
                case 167:
                    if (!(commandData.args[0].toString().toLowerCase() === 'enable')) return [3 /*break*/, 173];
                    x = 0;
                    _b.label = 168;
                case 168:
                    if (!(x < guildData.exposeDataValues().logs.length)) return [3 /*break*/, 172];
                    if (!(commandData.args[1].toLowerCase() === guildData.exposeDataValues().logs[x].nameSmall)) return [3 /*break*/, 171];
                    guildData.exposeDataValues().logs[x].loggingChannelID = commandData.permsChannel.id;
                    guildData.exposeDataValues().logs[x].loggingChannelName = commandData.permsChannel.name;
                    guildData.exposeDataValues().logs[x].enabled = true;
                    return [4 /*yield*/, guildData.writeToDataBase()];
                case 169:
                    _b.sent();
                    msgEmbed_27 = new Discord.MessageEmbed();
                    msgString_27 = "------\n**Nicely done! You've enabled logging for '" + guildData.exposeDataValues().logs[x].name + "'.\nIn channel <#" + guildData.exposeDataValues().logs[x].loggingChannelID + ">.**\n------";
                    msgEmbed_27
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.exposeDataValues().borderColor)
                        .setDescription(msgString_27)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Enabled:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed_27)];
                case 170:
                    _b.sent();
                    return [3 /*break*/, 172];
                case 171:
                    x += 1;
                    return [3 /*break*/, 168];
                case 172: return [3 /*break*/, 178];
                case 173:
                    if (!(commandData.args[0].toString().toLowerCase() === 'disable')) return [3 /*break*/, 178];
                    x = 0;
                    _b.label = 174;
                case 174:
                    if (!(x < guildData.exposeDataValues().logs.length)) return [3 /*break*/, 178];
                    if (!(commandData.args[1].toLowerCase() === guildData.exposeDataValues().logs[x].nameSmall)) return [3 /*break*/, 177];
                    guildData.exposeDataValues().logs[x].loggingChannelID = '';
                    guildData.exposeDataValues().logs[x].loggingChannelName = '';
                    guildData.exposeDataValues().logs[x].enabled = false;
                    return [4 /*yield*/, guildData.writeToDataBase()];
                case 175:
                    _b.sent();
                    msgEmbed_28 = new Discord.MessageEmbed();
                    msgString_28 = "------\n**Nicely done! You've disabled logging for '" + guildData.exposeDataValues().logs[x].name + "'.**\n------";
                    msgEmbed_28
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.exposeDataValues().borderColor)
                        .setDescription(msgString_28)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Disabled:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed_28)];
                case 176:
                    _b.sent();
                    return [3 /*break*/, 178];
                case 177:
                    x += 1;
                    return [3 /*break*/, 174];
                case 178: return [3 /*break*/, 182];
                case 179:
                    msgString = 'Please enter a proper log name!';
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.exposeDataValues().borderColor)
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 180:
                    msg = _b.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 181:
                    _b.sent();
                    return [2 /*return*/, commandReturnData];
                case 182: return [2 /*return*/, commandReturnData];
                case 183:
                    error_1 = _b.sent();
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            reject(error_1);
                        })];
                case 184: return [2 /*return*/];
            }
        });
    });
}
command.function = execute;
exports.default = command;
