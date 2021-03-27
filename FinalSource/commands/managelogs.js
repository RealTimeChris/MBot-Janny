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
function execute(message, args, discordUser) {
    return __awaiter(this, void 0, void 0, function () {
        var areWeInADM, areWeAnAdmin, guildData, fields, x, field, field, msgEmbed, msgString, _a, x, msgEmbed, msgString, x, msgEmbed, msgString, x, msgEmbed, msgString, x, msgEmbed, msgString, x, msgEmbed, msgString, x, msgEmbed, msgString, x, msgEmbed, msgString, x, msgEmbed, msgString, x, msgEmbed, msgString, x, msgEmbed, msgString, x, msgEmbed, msgString, x, msgEmbed, msgString, x, msgEmbed, msgString, x, msgEmbed, msgString, x, msgEmbed, msgString, x, msgEmbed, msgString, x, msgEmbed, msgString, x, msgEmbed, msgString, x, msgEmbed, msgString, x, msgEmbed, msgString, x, msgEmbed, msgString, x, msgEmbed, msgString, x, msgEmbed, msgString, x, msgEmbed, msgString, x, msgEmbed, msgString, x, msgEmbed, msgString, x, msgEmbed, msgString, x, msgEmbed, msgString, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 241, , 242]);
                    return [4 /*yield*/, DiscordStuff.areWeInADM(message)];
                case 1:
                    areWeInADM = _b.sent();
                    if (areWeInADM === true) {
                        return [2 /*return*/, command.name];
                    }
                    return [4 /*yield*/, discordUser.doWeHaveAdminPermission(message)];
                case 2:
                    areWeAnAdmin = _b.sent();
                    if (areWeAnAdmin === false) {
                        return [2 /*return*/, command.name];
                    }
                    return [4 /*yield*/, discordUser.getGuildDataFromDB(message.guild)];
                case 3:
                    guildData = _b.sent();
                    if (!(args[0] === undefined)) return [3 /*break*/, 7];
                    fields = [];
                    for (x = 0; x < guildData.logs.length; x += 1) {
                        if (message.client.channels.resolve(guildData.logs[x].loggingChannelID) === null) {
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
                    msgString = String('');
                    msgString = "**To enable/disable a given log, enter within the text channel where you would like it to be logged: !managelogs = \n                <enable/disable>, <logname>\nFor example, '!managelogs = enable, guildbanadd'.**'";
                    msgEmbed
                        .setAuthor(message.author.username, message.author.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs:**__').fields = fields;
                    return [4 /*yield*/, message.channel.send(msgEmbed)];
                case 4:
                    _b.sent();
                    if (!message.deletable) return [3 /*break*/, 6];
                    return [4 /*yield*/, message.delete()];
                case 5:
                    _b.sent();
                    _b.label = 6;
                case 6: return [3 /*break*/, 240];
                case 7:
                    if (!(args[0].toLowerCase() !== 'enable' && args[0].toLowerCase() !== 'disable')) return [3 /*break*/, 11];
                    return [4 /*yield*/, message.reply("Please, enter enable or disable for the second argument of this command! \n            (!managelogs = <enable/disable>, <logname>)")];
                case 8:
                    _b.sent();
                    if (!message.deletable) return [3 /*break*/, 10];
                    return [4 /*yield*/, message.delete()];
                case 9:
                    _b.sent();
                    _b.label = 10;
                case 10: return [2 /*return*/, command.name];
                case 11:
                    _a = args[1].toLowerCase();
                    switch (_a) {
                        case 'guildbanadd': return [3 /*break*/, 12];
                        case 'guildbanremove': return [3 /*break*/, 28];
                        case 'guildmemberadd': return [3 /*break*/, 44];
                        case 'guildmemberremove': return [3 /*break*/, 60];
                        case 'displaynamechange': return [3 /*break*/, 76];
                        case 'nicknamechange': return [3 /*break*/, 92];
                        case 'roleaddorremove': return [3 /*break*/, 108];
                        case 'invitecreate': return [3 /*break*/, 124];
                        case 'messagedelete': return [3 /*break*/, 140];
                        case 'messagedeletebulk': return [3 /*break*/, 156];
                        case 'messageupdate': return [3 /*break*/, 172];
                        case 'rolecreate': return [3 /*break*/, 188];
                        case 'roledelete': return [3 /*break*/, 204];
                        case 'usernamechange': return [3 /*break*/, 220];
                    }
                    return [3 /*break*/, 236];
                case 12:
                    if (!(args[0].toLowerCase() === 'enable')) return [3 /*break*/, 20];
                    x = 0;
                    _b.label = 13;
                case 13:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 19];
                    if (!(args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 18];
                    guildData.logs[x].loggingChannelID = message.channel.id;
                    guildData.logs[x].loggingChannelName = message.channel.name;
                    guildData.logs[x].enabled = true;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 14:
                    _b.sent();
                    msgEmbed = new Discord.MessageEmbed();
                    msgString = "Nicely done! You've enabled logging for '" + guildData.logs[x].name + "', \n                                in channel <#" + guildData.logs[x].loggingChannelID + ">.";
                    msgEmbed
                        .setAuthor(message.author.username, message.author.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Enabled:**__');
                    return [4 /*yield*/, message.channel.send(msgEmbed)];
                case 15:
                    _b.sent();
                    if (!message.deletable) return [3 /*break*/, 17];
                    return [4 /*yield*/, message.delete()];
                case 16:
                    _b.sent();
                    _b.label = 17;
                case 17: return [3 /*break*/, 19];
                case 18:
                    x += 1;
                    return [3 /*break*/, 13];
                case 19: return [3 /*break*/, 27];
                case 20:
                    if (!(args[0].toLowerCase() === 'disable')) return [3 /*break*/, 27];
                    x = 0;
                    _b.label = 21;
                case 21:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 27];
                    if (!(args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 26];
                    guildData.logs[x].loggingChannelID = '';
                    guildData.logs[x].loggingChannelName = '';
                    guildData.logs[x].enabled = false;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 22:
                    _b.sent();
                    msgEmbed = new Discord.MessageEmbed();
                    msgString = "Nicely done! You've disabled logging for '" + guildData.logs[x].name + ".";
                    msgEmbed
                        .setAuthor(message.author.username, message.author.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Disabled:**__');
                    return [4 /*yield*/, message.channel.send(msgEmbed)];
                case 23:
                    _b.sent();
                    if (!message.deletable) return [3 /*break*/, 25];
                    return [4 /*yield*/, message.delete()];
                case 24:
                    _b.sent();
                    _b.label = 25;
                case 25: return [3 /*break*/, 27];
                case 26:
                    x += 1;
                    return [3 /*break*/, 21];
                case 27: return [3 /*break*/, 240];
                case 28:
                    if (!(args[0].toLowerCase() === 'enable')) return [3 /*break*/, 36];
                    x = 0;
                    _b.label = 29;
                case 29:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 35];
                    if (!(args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 34];
                    guildData.logs[x].loggingChannelID = message.channel.id;
                    guildData.logs[x].loggingChannelName = message.channel.name;
                    guildData.logs[x].enabled = true;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 30:
                    _b.sent();
                    msgEmbed = new Discord.MessageEmbed();
                    msgString = "Nicely done! You've enabled logging for '" + guildData.logs[x].name + "', \n                                in channel <#" + guildData.logs[x].loggingChannelID + ">.";
                    msgEmbed
                        .setAuthor(message.author.username, message.author.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Enabled:**__');
                    return [4 /*yield*/, message.channel.send(msgEmbed)];
                case 31:
                    _b.sent();
                    if (!message.deletable) return [3 /*break*/, 33];
                    return [4 /*yield*/, message.delete()];
                case 32:
                    _b.sent();
                    _b.label = 33;
                case 33: return [3 /*break*/, 35];
                case 34:
                    x += 1;
                    return [3 /*break*/, 29];
                case 35: return [3 /*break*/, 43];
                case 36:
                    if (!(args[0].toLowerCase() === 'disable')) return [3 /*break*/, 43];
                    x = 0;
                    _b.label = 37;
                case 37:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 43];
                    if (!(args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 42];
                    guildData.logs[x].loggingChannelID = '';
                    guildData.logs[x].loggingChannelName = '';
                    guildData.logs[x].enabled = false;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 38:
                    _b.sent();
                    msgEmbed = new Discord.MessageEmbed();
                    msgString = "Nicely done! You've disabled logging for '" + guildData.logs[x].name + ".";
                    msgEmbed
                        .setAuthor(message.author.username, message.author.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Disabled:**__');
                    return [4 /*yield*/, message.channel.send(msgEmbed)];
                case 39:
                    _b.sent();
                    if (!message.deletable) return [3 /*break*/, 41];
                    return [4 /*yield*/, message.delete()];
                case 40:
                    _b.sent();
                    _b.label = 41;
                case 41: return [3 /*break*/, 43];
                case 42:
                    x += 1;
                    return [3 /*break*/, 37];
                case 43: return [3 /*break*/, 240];
                case 44:
                    if (!(args[0].toLowerCase() === 'enable')) return [3 /*break*/, 52];
                    x = 0;
                    _b.label = 45;
                case 45:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 51];
                    if (!(args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 50];
                    guildData.logs[x].loggingChannelID = message.channel.id;
                    guildData.logs[x].loggingChannelName = message.channel.name;
                    guildData.logs[x].enabled = true;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 46:
                    _b.sent();
                    msgEmbed = new Discord.MessageEmbed();
                    msgString = "Nicely done! You've enabled logging for '" + guildData.logs[x].name + "', \n                                in channel <#" + guildData.logs[x].loggingChannelID + ">.";
                    msgEmbed
                        .setAuthor(message.author.username, message.author.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Enabled:**__');
                    return [4 /*yield*/, message.channel.send(msgEmbed)];
                case 47:
                    _b.sent();
                    if (!message.deletable) return [3 /*break*/, 49];
                    return [4 /*yield*/, message.delete()];
                case 48:
                    _b.sent();
                    _b.label = 49;
                case 49: return [3 /*break*/, 51];
                case 50:
                    x += 1;
                    return [3 /*break*/, 45];
                case 51: return [3 /*break*/, 59];
                case 52:
                    if (!(args[0].toLowerCase() === 'disable')) return [3 /*break*/, 59];
                    x = 0;
                    _b.label = 53;
                case 53:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 59];
                    if (!(args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 58];
                    guildData.logs[x].loggingChannelID = '';
                    guildData.logs[x].loggingChannelName = '';
                    guildData.logs[x].enabled = false;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 54:
                    _b.sent();
                    msgEmbed = new Discord.MessageEmbed();
                    msgString = "Nicely done! You've disabled logging for '" + guildData.logs[x].name + ".";
                    msgEmbed
                        .setAuthor(message.author.username, message.author.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Disabled:**__');
                    return [4 /*yield*/, message.channel.send(msgEmbed)];
                case 55:
                    _b.sent();
                    if (!message.deletable) return [3 /*break*/, 57];
                    return [4 /*yield*/, message.delete()];
                case 56:
                    _b.sent();
                    _b.label = 57;
                case 57: return [3 /*break*/, 59];
                case 58:
                    x += 1;
                    return [3 /*break*/, 53];
                case 59: return [3 /*break*/, 240];
                case 60:
                    if (!(args[0].toLowerCase() === 'enable')) return [3 /*break*/, 68];
                    x = 0;
                    _b.label = 61;
                case 61:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 67];
                    if (!(args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 66];
                    guildData.logs[x].loggingChannelID = message.channel.id;
                    guildData.logs[x].loggingChannelName = message.channel.name;
                    guildData.logs[x].enabled = true;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 62:
                    _b.sent();
                    msgEmbed = new Discord.MessageEmbed();
                    msgString = "Nicely done! You've enabled logging for '" + guildData.logs[x].name + "', \n                            in channel <#" + guildData.logs[x].loggingChannelID + ">.";
                    msgEmbed
                        .setAuthor(message.author.username, message.author.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Enabled:**__');
                    return [4 /*yield*/, message.channel.send(msgEmbed)];
                case 63:
                    _b.sent();
                    if (!message.deletable) return [3 /*break*/, 65];
                    return [4 /*yield*/, message.delete()];
                case 64:
                    _b.sent();
                    _b.label = 65;
                case 65: return [3 /*break*/, 67];
                case 66:
                    x += 1;
                    return [3 /*break*/, 61];
                case 67: return [3 /*break*/, 75];
                case 68:
                    if (!(args[0].toLowerCase() === 'disable')) return [3 /*break*/, 75];
                    x = 0;
                    _b.label = 69;
                case 69:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 75];
                    if (!(args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 74];
                    guildData.logs[x].loggingChannelID = '';
                    guildData.logs[x].loggingChannelName = '';
                    guildData.logs[x].enabled = false;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 70:
                    _b.sent();
                    msgEmbed = new Discord.MessageEmbed();
                    msgString = "Nicely done! You've disabled logging for '" + guildData.logs[x].name + ".";
                    msgEmbed
                        .setAuthor(message.author.username, message.author.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Disabled:**__');
                    return [4 /*yield*/, message.channel.send(msgEmbed)];
                case 71:
                    _b.sent();
                    if (!message.deletable) return [3 /*break*/, 73];
                    return [4 /*yield*/, message.delete()];
                case 72:
                    _b.sent();
                    _b.label = 73;
                case 73: return [3 /*break*/, 75];
                case 74:
                    x += 1;
                    return [3 /*break*/, 69];
                case 75: return [3 /*break*/, 240];
                case 76:
                    if (!(args[0].toLowerCase() === 'enable')) return [3 /*break*/, 84];
                    x = 0;
                    _b.label = 77;
                case 77:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 83];
                    if (!(args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 82];
                    guildData.logs[x].loggingChannelID = message.channel.id;
                    guildData.logs[x].loggingChannelName = message.channel.name;
                    guildData.logs[x].enabled = true;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 78:
                    _b.sent();
                    msgEmbed = new Discord.MessageEmbed();
                    msgString = "Nicely done! You've enabled logging for '" + guildData.logs[x].name + "', \n                                in channel <#" + guildData.logs[x].loggingChannelID + ">.";
                    msgEmbed
                        .setAuthor(message.author.username, message.author.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Enabled:**__');
                    return [4 /*yield*/, message.channel.send(msgEmbed)];
                case 79:
                    _b.sent();
                    if (!message.deletable) return [3 /*break*/, 81];
                    return [4 /*yield*/, message.delete()];
                case 80:
                    _b.sent();
                    _b.label = 81;
                case 81: return [3 /*break*/, 83];
                case 82:
                    x += 1;
                    return [3 /*break*/, 77];
                case 83: return [3 /*break*/, 91];
                case 84:
                    if (!(args[0].toLowerCase() === 'disable')) return [3 /*break*/, 91];
                    x = 0;
                    _b.label = 85;
                case 85:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 91];
                    if (!(args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 90];
                    guildData.logs[x].loggingChannelID = '';
                    guildData.logs[x].loggingChannelName = '';
                    guildData.logs[x].enabled = false;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 86:
                    _b.sent();
                    msgEmbed = new Discord.MessageEmbed();
                    msgString = "Nicely done! You've disabled logging for '" + guildData.logs[x].name + ".";
                    msgEmbed
                        .setAuthor(message.author.username, message.author.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Disabled:**__');
                    return [4 /*yield*/, message.channel.send(msgEmbed)];
                case 87:
                    _b.sent();
                    if (!message.deletable) return [3 /*break*/, 89];
                    return [4 /*yield*/, message.delete()];
                case 88:
                    _b.sent();
                    _b.label = 89;
                case 89: return [3 /*break*/, 91];
                case 90:
                    x += 1;
                    return [3 /*break*/, 85];
                case 91: return [3 /*break*/, 240];
                case 92:
                    if (!(args[0].toLowerCase() === 'enable')) return [3 /*break*/, 100];
                    x = 0;
                    _b.label = 93;
                case 93:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 99];
                    if (!(args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 98];
                    guildData.logs[x].loggingChannelID = message.channel.id;
                    guildData.logs[x].loggingChannelName = message.channel.name;
                    guildData.logs[x].enabled = true;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 94:
                    _b.sent();
                    msgEmbed = new Discord.MessageEmbed();
                    msgString = "Nicely done! You've enabled logging for '" + guildData.logs[x].name + "', \n                                in channel <#" + guildData.logs[x].loggingChannelID + ">.";
                    msgEmbed
                        .setAuthor(message.author.username, message.author.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Enabled:**__');
                    return [4 /*yield*/, message.channel.send(msgEmbed)];
                case 95:
                    _b.sent();
                    if (!message.deletable) return [3 /*break*/, 97];
                    return [4 /*yield*/, message.delete()];
                case 96:
                    _b.sent();
                    _b.label = 97;
                case 97: return [3 /*break*/, 99];
                case 98:
                    x += 1;
                    return [3 /*break*/, 93];
                case 99: return [3 /*break*/, 107];
                case 100:
                    if (!(args[0].toLowerCase() === 'disable')) return [3 /*break*/, 107];
                    x = 0;
                    _b.label = 101;
                case 101:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 107];
                    if (!(args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 106];
                    guildData.logs[x].loggingChannelID = '';
                    guildData.logs[x].loggingChannelName = '';
                    guildData.logs[x].enabled = false;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 102:
                    _b.sent();
                    msgEmbed = new Discord.MessageEmbed();
                    msgString = "Nicely done! You've disabled logging for '" + guildData.logs[x].name + ".";
                    msgEmbed
                        .setAuthor(message.author.username, message.author.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Disabled:**__');
                    return [4 /*yield*/, message.channel.send(msgEmbed)];
                case 103:
                    _b.sent();
                    if (!message.deletable) return [3 /*break*/, 105];
                    return [4 /*yield*/, message.delete()];
                case 104:
                    _b.sent();
                    _b.label = 105;
                case 105: return [3 /*break*/, 107];
                case 106:
                    x += 1;
                    return [3 /*break*/, 101];
                case 107: return [3 /*break*/, 240];
                case 108:
                    if (!(args[0].toLowerCase() === 'enable')) return [3 /*break*/, 116];
                    x = 0;
                    _b.label = 109;
                case 109:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 115];
                    if (!(args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 114];
                    guildData.logs[x].loggingChannelID = message.channel.id;
                    guildData.logs[x].loggingChannelName = message.channel.name;
                    guildData.logs[x].enabled = true;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 110:
                    _b.sent();
                    msgEmbed = new Discord.MessageEmbed();
                    msgString = "Nicely done! You've enabled logging for '" + guildData.logs[x].name + "', \n                                in channel <#" + guildData.logs[x].loggingChannelID + ">.";
                    msgEmbed
                        .setAuthor(message.author.username, message.author.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Enabled:**__');
                    return [4 /*yield*/, message.channel.send(msgEmbed)];
                case 111:
                    _b.sent();
                    if (!message.deletable) return [3 /*break*/, 113];
                    return [4 /*yield*/, message.delete()];
                case 112:
                    _b.sent();
                    _b.label = 113;
                case 113: return [3 /*break*/, 115];
                case 114:
                    x += 1;
                    return [3 /*break*/, 109];
                case 115: return [3 /*break*/, 123];
                case 116:
                    if (!(args[0].toLowerCase() === 'disable')) return [3 /*break*/, 123];
                    x = 0;
                    _b.label = 117;
                case 117:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 123];
                    if (!(args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 122];
                    guildData.logs[x].loggingChannelID = '';
                    guildData.logs[x].loggingChannelName = '';
                    guildData.logs[x].enabled = false;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 118:
                    _b.sent();
                    msgEmbed = new Discord.MessageEmbed();
                    msgString = "Nicely done! You've disabled logging for '" + guildData.logs[x].name + ".";
                    msgEmbed
                        .setAuthor(message.author.username, message.author.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Disabled:**__');
                    return [4 /*yield*/, message.channel.send(msgEmbed)];
                case 119:
                    _b.sent();
                    if (!message.deletable) return [3 /*break*/, 121];
                    return [4 /*yield*/, message.delete()];
                case 120:
                    _b.sent();
                    _b.label = 121;
                case 121: return [3 /*break*/, 123];
                case 122:
                    x += 1;
                    return [3 /*break*/, 117];
                case 123: return [3 /*break*/, 240];
                case 124:
                    if (!(args[0].toLowerCase() === 'enable')) return [3 /*break*/, 132];
                    x = 0;
                    _b.label = 125;
                case 125:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 131];
                    if (!(args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 130];
                    guildData.logs[x].loggingChannelID = message.channel.id;
                    guildData.logs[x].loggingChannelName = message.channel.name;
                    guildData.logs[x].enabled = true;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 126:
                    _b.sent();
                    msgEmbed = new Discord.MessageEmbed();
                    msgString = "Nicely done! You've enabled logging for '" + guildData.logs[x].name + "', \n                                in channel <#" + guildData.logs[x].loggingChannelID + ">.";
                    msgEmbed
                        .setAuthor(message.author.username, message.author.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Enabled:**__');
                    return [4 /*yield*/, message.channel.send(msgEmbed)];
                case 127:
                    _b.sent();
                    if (!message.deletable) return [3 /*break*/, 129];
                    return [4 /*yield*/, message.delete()];
                case 128:
                    _b.sent();
                    _b.label = 129;
                case 129: return [3 /*break*/, 131];
                case 130:
                    x += 1;
                    return [3 /*break*/, 125];
                case 131: return [3 /*break*/, 139];
                case 132:
                    if (!(args[0].toLowerCase() === 'disable')) return [3 /*break*/, 139];
                    x = 0;
                    _b.label = 133;
                case 133:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 139];
                    if (!(args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 138];
                    guildData.logs[x].loggingChannelID = '';
                    guildData.logs[x].loggingChannelName = '';
                    guildData.logs[x].enabled = false;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 134:
                    _b.sent();
                    msgEmbed = new Discord.MessageEmbed();
                    msgString = "Nicely done! You've disabled logging for '" + guildData.logs[x].name + ".";
                    msgEmbed
                        .setAuthor(message.author.username, message.author.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Disabled:**__');
                    return [4 /*yield*/, message.channel.send(msgEmbed)];
                case 135:
                    _b.sent();
                    if (!message.deletable) return [3 /*break*/, 137];
                    return [4 /*yield*/, message.delete()];
                case 136:
                    _b.sent();
                    _b.label = 137;
                case 137: return [3 /*break*/, 139];
                case 138:
                    x += 1;
                    return [3 /*break*/, 133];
                case 139: return [3 /*break*/, 240];
                case 140:
                    if (!(args[0].toLowerCase() === 'enable')) return [3 /*break*/, 148];
                    x = 0;
                    _b.label = 141;
                case 141:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 147];
                    if (!(args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 146];
                    guildData.logs[x].loggingChannelID = message.channel.id;
                    guildData.logs[x].loggingChannelName = message.channel.name;
                    guildData.logs[x].enabled = true;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 142:
                    _b.sent();
                    msgEmbed = new Discord.MessageEmbed();
                    msgString = "Nicely done! You've enabled logging for '" + guildData.logs[x].name + "', \n                                in channel <#" + guildData.logs[x].loggingChannelID + ">.";
                    msgEmbed
                        .setAuthor(message.author.username, message.author.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Enabled:**__');
                    return [4 /*yield*/, message.channel.send(msgEmbed)];
                case 143:
                    _b.sent();
                    if (!message.deletable) return [3 /*break*/, 145];
                    return [4 /*yield*/, message.delete()];
                case 144:
                    _b.sent();
                    _b.label = 145;
                case 145: return [3 /*break*/, 147];
                case 146:
                    x += 1;
                    return [3 /*break*/, 141];
                case 147: return [3 /*break*/, 155];
                case 148:
                    if (!(args[0].toLowerCase() === 'disable')) return [3 /*break*/, 155];
                    x = 0;
                    _b.label = 149;
                case 149:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 155];
                    if (!(args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 154];
                    guildData.logs[x].loggingChannelID = '';
                    guildData.logs[x].loggingChannelName = '';
                    guildData.logs[x].enabled = false;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 150:
                    _b.sent();
                    msgEmbed = new Discord.MessageEmbed();
                    msgString = "Nicely done! You've disabled logging for '" + guildData.logs[x].name + ".";
                    msgEmbed
                        .setAuthor(message.author.username, message.author.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Disabled:**__');
                    return [4 /*yield*/, message.channel.send(msgEmbed)];
                case 151:
                    _b.sent();
                    if (!message.deletable) return [3 /*break*/, 153];
                    return [4 /*yield*/, message.delete()];
                case 152:
                    _b.sent();
                    _b.label = 153;
                case 153: return [3 /*break*/, 155];
                case 154:
                    x += 1;
                    return [3 /*break*/, 149];
                case 155: return [3 /*break*/, 240];
                case 156:
                    if (!(args[0].toLowerCase() === 'enable')) return [3 /*break*/, 164];
                    x = 0;
                    _b.label = 157;
                case 157:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 163];
                    if (!(args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 162];
                    guildData.logs[x].loggingChannelID = message.channel.id;
                    guildData.logs[x].loggingChannelName = message.channel.name;
                    guildData.logs[x].enabled = true;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 158:
                    _b.sent();
                    msgEmbed = new Discord.MessageEmbed();
                    msgString = "Nicely done! You've enabled logging for '" + guildData.logs[x].name + "', \n                                in channel <#" + guildData.logs[x].loggingChannelID + ">.";
                    msgEmbed
                        .setAuthor(message.author.username, message.author.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Enabled:**__');
                    return [4 /*yield*/, message.channel.send(msgEmbed)];
                case 159:
                    _b.sent();
                    if (!message.deletable) return [3 /*break*/, 161];
                    return [4 /*yield*/, message.delete()];
                case 160:
                    _b.sent();
                    _b.label = 161;
                case 161: return [3 /*break*/, 163];
                case 162:
                    x += 1;
                    return [3 /*break*/, 157];
                case 163: return [3 /*break*/, 171];
                case 164:
                    if (!(args[0].toLowerCase() === 'disable')) return [3 /*break*/, 171];
                    x = 0;
                    _b.label = 165;
                case 165:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 171];
                    if (!(args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 170];
                    guildData.logs[x].loggingChannelID = '';
                    guildData.logs[x].loggingChannelName = '';
                    guildData.logs[x].enabled = false;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 166:
                    _b.sent();
                    msgEmbed = new Discord.MessageEmbed();
                    msgString = "Nicely done! You've disabled logging for '" + guildData.logs[x].name + ".";
                    msgEmbed
                        .setAuthor(message.author.username, message.author.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Disabled:**__');
                    return [4 /*yield*/, message.channel.send(msgEmbed)];
                case 167:
                    _b.sent();
                    if (!message.deletable) return [3 /*break*/, 169];
                    return [4 /*yield*/, message.delete()];
                case 168:
                    _b.sent();
                    _b.label = 169;
                case 169: return [3 /*break*/, 171];
                case 170:
                    x += 1;
                    return [3 /*break*/, 165];
                case 171: return [3 /*break*/, 240];
                case 172:
                    if (!(args[0].toLowerCase() === 'enable')) return [3 /*break*/, 180];
                    x = 0;
                    _b.label = 173;
                case 173:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 179];
                    if (!(args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 178];
                    guildData.logs[x].loggingChannelID = message.channel.id;
                    guildData.logs[x].loggingChannelName = message.channel.name;
                    guildData.logs[x].enabled = true;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 174:
                    _b.sent();
                    msgEmbed = new Discord.MessageEmbed();
                    msgString = "Nicely done! You've enabled logging for '" + guildData.logs[x].name + "', \n                                in channel <#" + guildData.logs[x].loggingChannelID + ">.";
                    msgEmbed
                        .setAuthor(message.author.username, message.author.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Enabled:**__');
                    return [4 /*yield*/, message.channel.send(msgEmbed)];
                case 175:
                    _b.sent();
                    if (!message.deletable) return [3 /*break*/, 177];
                    return [4 /*yield*/, message.delete()];
                case 176:
                    _b.sent();
                    _b.label = 177;
                case 177: return [3 /*break*/, 179];
                case 178:
                    x += 1;
                    return [3 /*break*/, 173];
                case 179: return [3 /*break*/, 187];
                case 180:
                    if (!(args[0].toLowerCase() === 'disable')) return [3 /*break*/, 187];
                    x = 0;
                    _b.label = 181;
                case 181:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 187];
                    if (!(args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 186];
                    guildData.logs[x].loggingChannelID = '';
                    guildData.logs[x].loggingChannelName = '';
                    guildData.logs[x].enabled = false;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 182:
                    _b.sent();
                    msgEmbed = new Discord.MessageEmbed();
                    msgString = "Nicely done! You've disabled logging for '" + guildData.logs[x].name + ".";
                    msgEmbed
                        .setAuthor(message.author.username, message.author.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Disabled:**__');
                    return [4 /*yield*/, message.channel.send(msgEmbed)];
                case 183:
                    _b.sent();
                    if (!message.deletable) return [3 /*break*/, 185];
                    return [4 /*yield*/, message.delete()];
                case 184:
                    _b.sent();
                    _b.label = 185;
                case 185: return [3 /*break*/, 187];
                case 186:
                    x += 1;
                    return [3 /*break*/, 181];
                case 187: return [3 /*break*/, 240];
                case 188:
                    if (!(args[0].toLowerCase() === 'enable')) return [3 /*break*/, 196];
                    x = 0;
                    _b.label = 189;
                case 189:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 195];
                    if (!(args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 194];
                    guildData.logs[x].loggingChannelID = message.channel.id;
                    guildData.logs[x].loggingChannelName = message.channel.name;
                    guildData.logs[x].enabled = true;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 190:
                    _b.sent();
                    msgEmbed = new Discord.MessageEmbed();
                    msgString = "Nicely done! You've enabled logging for '" + guildData.logs[x].name + "', \n                                in channel <#" + guildData.logs[x].loggingChannelID + ">.";
                    msgEmbed
                        .setAuthor(message.author.username, message.author.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Enabled:**__');
                    return [4 /*yield*/, message.channel.send(msgEmbed)];
                case 191:
                    _b.sent();
                    if (!message.deletable) return [3 /*break*/, 193];
                    return [4 /*yield*/, message.delete()];
                case 192:
                    _b.sent();
                    _b.label = 193;
                case 193: return [3 /*break*/, 195];
                case 194:
                    x += 1;
                    return [3 /*break*/, 189];
                case 195: return [3 /*break*/, 203];
                case 196:
                    if (!(args[0].toLowerCase() === 'disable')) return [3 /*break*/, 203];
                    x = 0;
                    _b.label = 197;
                case 197:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 203];
                    if (!(args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 202];
                    guildData.logs[x].loggingChannelID = '';
                    guildData.logs[x].loggingChannelName = '';
                    guildData.logs[x].enabled = false;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 198:
                    _b.sent();
                    msgEmbed = new Discord.MessageEmbed();
                    msgString = "Nicely done! You've disabled logging for '" + guildData.logs[x].name + ".";
                    msgEmbed
                        .setAuthor(message.author.username, message.author.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Disabled:**__');
                    return [4 /*yield*/, message.channel.send(msgEmbed)];
                case 199:
                    _b.sent();
                    if (!message.deletable) return [3 /*break*/, 201];
                    return [4 /*yield*/, message.delete()];
                case 200:
                    _b.sent();
                    _b.label = 201;
                case 201: return [3 /*break*/, 203];
                case 202:
                    x += 1;
                    return [3 /*break*/, 197];
                case 203: return [3 /*break*/, 240];
                case 204:
                    if (!(args[0].toLowerCase() === 'enable')) return [3 /*break*/, 212];
                    x = 0;
                    _b.label = 205;
                case 205:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 211];
                    if (!(args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 210];
                    guildData.logs[x].loggingChannelID = message.channel.id;
                    guildData.logs[x].loggingChannelName = message.channel.name;
                    guildData.logs[x].enabled = true;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 206:
                    _b.sent();
                    msgEmbed = new Discord.MessageEmbed();
                    msgString = "Nicely done! You've enabled logging for '" + guildData.logs[x].name + "', \n                                in channel <#" + guildData.logs[x].loggingChannelID + ">.";
                    msgEmbed
                        .setAuthor(message.author.username, message.author.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Enabled:**__');
                    return [4 /*yield*/, message.channel.send(msgEmbed)];
                case 207:
                    _b.sent();
                    if (!message.deletable) return [3 /*break*/, 209];
                    return [4 /*yield*/, message.delete()];
                case 208:
                    _b.sent();
                    _b.label = 209;
                case 209: return [3 /*break*/, 211];
                case 210:
                    x += 1;
                    return [3 /*break*/, 205];
                case 211: return [3 /*break*/, 219];
                case 212:
                    if (!(args[0].toLowerCase() === 'disable')) return [3 /*break*/, 219];
                    x = 0;
                    _b.label = 213;
                case 213:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 219];
                    if (!(args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 218];
                    guildData.logs[x].loggingChannelID = '';
                    guildData.logs[x].loggingChannelName = '';
                    guildData.logs[x].enabled = false;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 214:
                    _b.sent();
                    msgEmbed = new Discord.MessageEmbed();
                    msgString = "Nicely done! You've disabled logging for '" + guildData.logs[x].name + ".";
                    msgEmbed
                        .setAuthor(message.author.username, message.author.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Disabled:**__');
                    return [4 /*yield*/, message.channel.send(msgEmbed)];
                case 215:
                    _b.sent();
                    if (!message.deletable) return [3 /*break*/, 217];
                    return [4 /*yield*/, message.delete()];
                case 216:
                    _b.sent();
                    _b.label = 217;
                case 217: return [3 /*break*/, 219];
                case 218:
                    x += 1;
                    return [3 /*break*/, 213];
                case 219: return [3 /*break*/, 240];
                case 220:
                    if (!(args[0].toLowerCase() === 'enable')) return [3 /*break*/, 228];
                    x = 0;
                    _b.label = 221;
                case 221:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 227];
                    if (!(args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 226];
                    guildData.logs[x].loggingChannelID = message.channel.id;
                    guildData.logs[x].loggingChannelName = message.channel.name;
                    guildData.logs[x].enabled = true;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 222:
                    _b.sent();
                    msgEmbed = new Discord.MessageEmbed();
                    msgString = "Nicely done! You've enabled logging for '" + guildData.logs[x].name + "', \n                                in channel <#" + guildData.logs[x].loggingChannelID + ">.";
                    msgEmbed
                        .setAuthor(message.author.username, message.author.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Enabled:**__');
                    return [4 /*yield*/, message.channel.send(msgEmbed)];
                case 223:
                    _b.sent();
                    if (!message.deletable) return [3 /*break*/, 225];
                    return [4 /*yield*/, message.delete()];
                case 224:
                    _b.sent();
                    _b.label = 225;
                case 225: return [3 /*break*/, 227];
                case 226:
                    x += 1;
                    return [3 /*break*/, 221];
                case 227: return [3 /*break*/, 235];
                case 228:
                    if (!(args[0].toLowerCase() === 'disable')) return [3 /*break*/, 235];
                    x = 0;
                    _b.label = 229;
                case 229:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 235];
                    if (!(args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 234];
                    guildData.logs[x].loggingChannelID = '';
                    guildData.logs[x].loggingChannelName = '';
                    guildData.logs[x].enabled = false;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 230:
                    _b.sent();
                    msgEmbed = new Discord.MessageEmbed();
                    msgString = "Nicely done! You've disabled logging for '" + guildData.logs[x].name + ".";
                    msgEmbed
                        .setAuthor(message.author.username, message.author.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Manage Logs Disabled:**__');
                    return [4 /*yield*/, message.channel.send(msgEmbed)];
                case 231:
                    _b.sent();
                    if (!message.deletable) return [3 /*break*/, 233];
                    return [4 /*yield*/, message.delete()];
                case 232:
                    _b.sent();
                    _b.label = 233;
                case 233: return [3 /*break*/, 235];
                case 234:
                    x += 1;
                    return [3 /*break*/, 229];
                case 235: return [3 /*break*/, 240];
                case 236: return [4 /*yield*/, message.reply('Please enter a proper log name!')];
                case 237:
                    _b.sent();
                    if (!message.deletable) return [3 /*break*/, 239];
                    return [4 /*yield*/, message.delete()];
                case 238:
                    _b.sent();
                    _b.label = 239;
                case 239: return [2 /*return*/, command.name];
                case 240: return [2 /*return*/, command.name];
                case 241:
                    error_1 = _b.sent();
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            reject(error_1);
                        })];
                case 242: return [2 /*return*/];
            }
        });
    });
}
exports.execute = execute;
command.function = execute;
exports.default = command;
