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
                    _b.trys.push([0, 210, , 211]);
                    return [4 /*yield*/, DiscordStuff.areWeInADM(message)];
                case 1:
                    areWeInADM = _b.sent();
                    if (areWeInADM === true) {
                        return [2 /*return*/, command.name];
                    }
                    return [4 /*yield*/, DiscordStuff.doWeHaveAdminPermission(message, discordUser)];
                case 2:
                    areWeAnAdmin = _b.sent();
                    if (areWeAnAdmin === false) {
                        return [2 /*return*/, command.name];
                    }
                    return [4 /*yield*/, discordUser.getGuildDataFromDB(message.guild)];
                case 3:
                    guildData = _b.sent();
                    if (!(args[0] === undefined)) return [3 /*break*/, 6];
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
                    return [4 /*yield*/, message.delete()];
                case 5:
                    _b.sent();
                    return [3 /*break*/, 209];
                case 6:
                    if (!(args[0].toLowerCase() !== 'enable' && args[0].toLowerCase() !== 'disable')) return [3 /*break*/, 9];
                    return [4 /*yield*/, message.reply("Please, enter enable or disable for the second argument of this command! \n            (!managelogs = <enable/disable>, <logname>)")];
                case 7:
                    _b.sent();
                    return [4 /*yield*/, message.delete()];
                case 8:
                    _b.sent();
                    return [2 /*return*/, command.name];
                case 9:
                    _a = args[1].toLowerCase();
                    switch (_a) {
                        case 'guildbanadd': return [3 /*break*/, 10];
                        case 'guildbanremove': return [3 /*break*/, 24];
                        case 'guildmemberadd': return [3 /*break*/, 38];
                        case 'guildmemberremove': return [3 /*break*/, 52];
                        case 'displaynamechange': return [3 /*break*/, 66];
                        case 'nicknamechange': return [3 /*break*/, 80];
                        case 'roleaddorremove': return [3 /*break*/, 94];
                        case 'invitecreate': return [3 /*break*/, 108];
                        case 'messagedelete': return [3 /*break*/, 122];
                        case 'messagedeletebulk': return [3 /*break*/, 136];
                        case 'messageupdate': return [3 /*break*/, 150];
                        case 'rolecreate': return [3 /*break*/, 164];
                        case 'roledelete': return [3 /*break*/, 178];
                        case 'usernamechange': return [3 /*break*/, 192];
                    }
                    return [3 /*break*/, 206];
                case 10:
                    if (!(args[0].toLowerCase() === 'enable')) return [3 /*break*/, 17];
                    x = 0;
                    _b.label = 11;
                case 11:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 16];
                    if (!(args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 15];
                    guildData.logs[x].loggingChannelID = message.channel.id;
                    guildData.logs[x].loggingChannelName = message.channel.name;
                    guildData.logs[x].enabled = true;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 12:
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
                case 13:
                    _b.sent();
                    return [4 /*yield*/, message.delete()];
                case 14:
                    _b.sent();
                    return [3 /*break*/, 16];
                case 15:
                    x += 1;
                    return [3 /*break*/, 11];
                case 16: return [3 /*break*/, 23];
                case 17:
                    if (!(args[0].toLowerCase() === 'disable')) return [3 /*break*/, 23];
                    x = 0;
                    _b.label = 18;
                case 18:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 23];
                    if (!(args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 22];
                    guildData.logs[x].loggingChannelID = '';
                    guildData.logs[x].loggingChannelName = '';
                    guildData.logs[x].enabled = false;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 19:
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
                case 20:
                    _b.sent();
                    return [4 /*yield*/, message.delete()];
                case 21:
                    _b.sent();
                    return [3 /*break*/, 23];
                case 22:
                    x += 1;
                    return [3 /*break*/, 18];
                case 23: return [3 /*break*/, 209];
                case 24:
                    if (!(args[0].toLowerCase() === 'enable')) return [3 /*break*/, 31];
                    x = 0;
                    _b.label = 25;
                case 25:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 30];
                    if (!(args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 29];
                    guildData.logs[x].loggingChannelID = message.channel.id;
                    guildData.logs[x].loggingChannelName = message.channel.name;
                    guildData.logs[x].enabled = true;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 26:
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
                case 27:
                    _b.sent();
                    return [4 /*yield*/, message.delete()];
                case 28:
                    _b.sent();
                    return [3 /*break*/, 30];
                case 29:
                    x += 1;
                    return [3 /*break*/, 25];
                case 30: return [3 /*break*/, 37];
                case 31:
                    if (!(args[0].toLowerCase() === 'disable')) return [3 /*break*/, 37];
                    x = 0;
                    _b.label = 32;
                case 32:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 37];
                    if (!(args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 36];
                    guildData.logs[x].loggingChannelID = '';
                    guildData.logs[x].loggingChannelName = '';
                    guildData.logs[x].enabled = false;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 33:
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
                case 34:
                    _b.sent();
                    return [4 /*yield*/, message.delete()];
                case 35:
                    _b.sent();
                    return [3 /*break*/, 37];
                case 36:
                    x += 1;
                    return [3 /*break*/, 32];
                case 37: return [3 /*break*/, 209];
                case 38:
                    if (!(args[0].toLowerCase() === 'enable')) return [3 /*break*/, 45];
                    x = 0;
                    _b.label = 39;
                case 39:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 44];
                    if (!(args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 43];
                    guildData.logs[x].loggingChannelID = message.channel.id;
                    guildData.logs[x].loggingChannelName = message.channel.name;
                    guildData.logs[x].enabled = true;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 40:
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
                case 41:
                    _b.sent();
                    return [4 /*yield*/, message.delete()];
                case 42:
                    _b.sent();
                    return [3 /*break*/, 44];
                case 43:
                    x += 1;
                    return [3 /*break*/, 39];
                case 44: return [3 /*break*/, 51];
                case 45:
                    if (!(args[0].toLowerCase() === 'disable')) return [3 /*break*/, 51];
                    x = 0;
                    _b.label = 46;
                case 46:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 51];
                    if (!(args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 50];
                    guildData.logs[x].loggingChannelID = '';
                    guildData.logs[x].loggingChannelName = '';
                    guildData.logs[x].enabled = false;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 47:
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
                case 48:
                    _b.sent();
                    return [4 /*yield*/, message.delete()];
                case 49:
                    _b.sent();
                    return [3 /*break*/, 51];
                case 50:
                    x += 1;
                    return [3 /*break*/, 46];
                case 51: return [3 /*break*/, 209];
                case 52:
                    if (!(args[0].toLowerCase() === 'enable')) return [3 /*break*/, 59];
                    x = 0;
                    _b.label = 53;
                case 53:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 58];
                    if (!(args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 57];
                    guildData.logs[x].loggingChannelID = message.channel.id;
                    guildData.logs[x].loggingChannelName = message.channel.name;
                    guildData.logs[x].enabled = true;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 54:
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
                case 55:
                    _b.sent();
                    return [4 /*yield*/, message.delete()];
                case 56:
                    _b.sent();
                    return [3 /*break*/, 58];
                case 57:
                    x += 1;
                    return [3 /*break*/, 53];
                case 58: return [3 /*break*/, 65];
                case 59:
                    if (!(args[0].toLowerCase() === 'disable')) return [3 /*break*/, 65];
                    x = 0;
                    _b.label = 60;
                case 60:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 65];
                    if (!(args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 64];
                    guildData.logs[x].loggingChannelID = '';
                    guildData.logs[x].loggingChannelName = '';
                    guildData.logs[x].enabled = false;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 61:
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
                case 62:
                    _b.sent();
                    return [4 /*yield*/, message.delete()];
                case 63:
                    _b.sent();
                    return [3 /*break*/, 65];
                case 64:
                    x += 1;
                    return [3 /*break*/, 60];
                case 65: return [3 /*break*/, 209];
                case 66:
                    if (!(args[0].toLowerCase() === 'enable')) return [3 /*break*/, 73];
                    x = 0;
                    _b.label = 67;
                case 67:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 72];
                    if (!(args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 71];
                    guildData.logs[x].loggingChannelID = message.channel.id;
                    guildData.logs[x].loggingChannelName = message.channel.name;
                    guildData.logs[x].enabled = true;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 68:
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
                case 69:
                    _b.sent();
                    return [4 /*yield*/, message.delete()];
                case 70:
                    _b.sent();
                    return [3 /*break*/, 72];
                case 71:
                    x += 1;
                    return [3 /*break*/, 67];
                case 72: return [3 /*break*/, 79];
                case 73:
                    if (!(args[0].toLowerCase() === 'disable')) return [3 /*break*/, 79];
                    x = 0;
                    _b.label = 74;
                case 74:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 79];
                    if (!(args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 78];
                    guildData.logs[x].loggingChannelID = '';
                    guildData.logs[x].loggingChannelName = '';
                    guildData.logs[x].enabled = false;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 75:
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
                case 76:
                    _b.sent();
                    return [4 /*yield*/, message.delete()];
                case 77:
                    _b.sent();
                    return [3 /*break*/, 79];
                case 78:
                    x += 1;
                    return [3 /*break*/, 74];
                case 79: return [3 /*break*/, 209];
                case 80:
                    if (!(args[0].toLowerCase() === 'enable')) return [3 /*break*/, 87];
                    x = 0;
                    _b.label = 81;
                case 81:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 86];
                    if (!(args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 85];
                    guildData.logs[x].loggingChannelID = message.channel.id;
                    guildData.logs[x].loggingChannelName = message.channel.name;
                    guildData.logs[x].enabled = true;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 82:
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
                case 83:
                    _b.sent();
                    return [4 /*yield*/, message.delete()];
                case 84:
                    _b.sent();
                    return [3 /*break*/, 86];
                case 85:
                    x += 1;
                    return [3 /*break*/, 81];
                case 86: return [3 /*break*/, 93];
                case 87:
                    if (!(args[0].toLowerCase() === 'disable')) return [3 /*break*/, 93];
                    x = 0;
                    _b.label = 88;
                case 88:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 93];
                    if (!(args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 92];
                    guildData.logs[x].loggingChannelID = '';
                    guildData.logs[x].loggingChannelName = '';
                    guildData.logs[x].enabled = false;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 89:
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
                case 90:
                    _b.sent();
                    return [4 /*yield*/, message.delete()];
                case 91:
                    _b.sent();
                    return [3 /*break*/, 93];
                case 92:
                    x += 1;
                    return [3 /*break*/, 88];
                case 93: return [3 /*break*/, 209];
                case 94:
                    if (!(args[0].toLowerCase() === 'enable')) return [3 /*break*/, 101];
                    x = 0;
                    _b.label = 95;
                case 95:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 100];
                    if (!(args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 99];
                    guildData.logs[x].loggingChannelID = message.channel.id;
                    guildData.logs[x].loggingChannelName = message.channel.name;
                    guildData.logs[x].enabled = true;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 96:
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
                case 97:
                    _b.sent();
                    return [4 /*yield*/, message.delete()];
                case 98:
                    _b.sent();
                    return [3 /*break*/, 100];
                case 99:
                    x += 1;
                    return [3 /*break*/, 95];
                case 100: return [3 /*break*/, 107];
                case 101:
                    if (!(args[0].toLowerCase() === 'disable')) return [3 /*break*/, 107];
                    x = 0;
                    _b.label = 102;
                case 102:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 107];
                    if (!(args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 106];
                    guildData.logs[x].loggingChannelID = '';
                    guildData.logs[x].loggingChannelName = '';
                    guildData.logs[x].enabled = false;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 103:
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
                case 104:
                    _b.sent();
                    return [4 /*yield*/, message.delete()];
                case 105:
                    _b.sent();
                    return [3 /*break*/, 107];
                case 106:
                    x += 1;
                    return [3 /*break*/, 102];
                case 107: return [3 /*break*/, 209];
                case 108:
                    if (!(args[0].toLowerCase() === 'enable')) return [3 /*break*/, 115];
                    x = 0;
                    _b.label = 109;
                case 109:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 114];
                    if (!(args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 113];
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
                    return [4 /*yield*/, message.delete()];
                case 112:
                    _b.sent();
                    return [3 /*break*/, 114];
                case 113:
                    x += 1;
                    return [3 /*break*/, 109];
                case 114: return [3 /*break*/, 121];
                case 115:
                    if (!(args[0].toLowerCase() === 'disable')) return [3 /*break*/, 121];
                    x = 0;
                    _b.label = 116;
                case 116:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 121];
                    if (!(args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 120];
                    guildData.logs[x].loggingChannelID = '';
                    guildData.logs[x].loggingChannelName = '';
                    guildData.logs[x].enabled = false;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 117:
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
                case 118:
                    _b.sent();
                    return [4 /*yield*/, message.delete()];
                case 119:
                    _b.sent();
                    return [3 /*break*/, 121];
                case 120:
                    x += 1;
                    return [3 /*break*/, 116];
                case 121: return [3 /*break*/, 209];
                case 122:
                    if (!(args[0].toLowerCase() === 'enable')) return [3 /*break*/, 129];
                    x = 0;
                    _b.label = 123;
                case 123:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 128];
                    if (!(args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 127];
                    guildData.logs[x].loggingChannelID = message.channel.id;
                    guildData.logs[x].loggingChannelName = message.channel.name;
                    guildData.logs[x].enabled = true;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 124:
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
                case 125:
                    _b.sent();
                    return [4 /*yield*/, message.delete()];
                case 126:
                    _b.sent();
                    return [3 /*break*/, 128];
                case 127:
                    x += 1;
                    return [3 /*break*/, 123];
                case 128: return [3 /*break*/, 135];
                case 129:
                    if (!(args[0].toLowerCase() === 'disable')) return [3 /*break*/, 135];
                    x = 0;
                    _b.label = 130;
                case 130:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 135];
                    if (!(args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 134];
                    guildData.logs[x].loggingChannelID = '';
                    guildData.logs[x].loggingChannelName = '';
                    guildData.logs[x].enabled = false;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 131:
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
                case 132:
                    _b.sent();
                    return [4 /*yield*/, message.delete()];
                case 133:
                    _b.sent();
                    return [3 /*break*/, 135];
                case 134:
                    x += 1;
                    return [3 /*break*/, 130];
                case 135: return [3 /*break*/, 209];
                case 136:
                    if (!(args[0].toLowerCase() === 'enable')) return [3 /*break*/, 143];
                    x = 0;
                    _b.label = 137;
                case 137:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 142];
                    if (!(args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 141];
                    guildData.logs[x].loggingChannelID = message.channel.id;
                    guildData.logs[x].loggingChannelName = message.channel.name;
                    guildData.logs[x].enabled = true;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 138:
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
                case 139:
                    _b.sent();
                    return [4 /*yield*/, message.delete()];
                case 140:
                    _b.sent();
                    return [3 /*break*/, 142];
                case 141:
                    x += 1;
                    return [3 /*break*/, 137];
                case 142: return [3 /*break*/, 149];
                case 143:
                    if (!(args[0].toLowerCase() === 'disable')) return [3 /*break*/, 149];
                    x = 0;
                    _b.label = 144;
                case 144:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 149];
                    if (!(args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 148];
                    guildData.logs[x].loggingChannelID = '';
                    guildData.logs[x].loggingChannelName = '';
                    guildData.logs[x].enabled = false;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 145:
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
                case 146:
                    _b.sent();
                    return [4 /*yield*/, message.delete()];
                case 147:
                    _b.sent();
                    return [3 /*break*/, 149];
                case 148:
                    x += 1;
                    return [3 /*break*/, 144];
                case 149: return [3 /*break*/, 209];
                case 150:
                    if (!(args[0].toLowerCase() === 'enable')) return [3 /*break*/, 157];
                    x = 0;
                    _b.label = 151;
                case 151:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 156];
                    if (!(args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 155];
                    guildData.logs[x].loggingChannelID = message.channel.id;
                    guildData.logs[x].loggingChannelName = message.channel.name;
                    guildData.logs[x].enabled = true;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 152:
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
                case 153:
                    _b.sent();
                    return [4 /*yield*/, message.delete()];
                case 154:
                    _b.sent();
                    return [3 /*break*/, 156];
                case 155:
                    x += 1;
                    return [3 /*break*/, 151];
                case 156: return [3 /*break*/, 163];
                case 157:
                    if (!(args[0].toLowerCase() === 'disable')) return [3 /*break*/, 163];
                    x = 0;
                    _b.label = 158;
                case 158:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 163];
                    if (!(args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 162];
                    guildData.logs[x].loggingChannelID = '';
                    guildData.logs[x].loggingChannelName = '';
                    guildData.logs[x].enabled = false;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 159:
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
                case 160:
                    _b.sent();
                    return [4 /*yield*/, message.delete()];
                case 161:
                    _b.sent();
                    return [3 /*break*/, 163];
                case 162:
                    x += 1;
                    return [3 /*break*/, 158];
                case 163: return [3 /*break*/, 209];
                case 164:
                    if (!(args[0].toLowerCase() === 'enable')) return [3 /*break*/, 171];
                    x = 0;
                    _b.label = 165;
                case 165:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 170];
                    if (!(args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 169];
                    guildData.logs[x].loggingChannelID = message.channel.id;
                    guildData.logs[x].loggingChannelName = message.channel.name;
                    guildData.logs[x].enabled = true;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 166:
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
                case 167:
                    _b.sent();
                    return [4 /*yield*/, message.delete()];
                case 168:
                    _b.sent();
                    return [3 /*break*/, 170];
                case 169:
                    x += 1;
                    return [3 /*break*/, 165];
                case 170: return [3 /*break*/, 177];
                case 171:
                    if (!(args[0].toLowerCase() === 'disable')) return [3 /*break*/, 177];
                    x = 0;
                    _b.label = 172;
                case 172:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 177];
                    if (!(args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 176];
                    guildData.logs[x].loggingChannelID = '';
                    guildData.logs[x].loggingChannelName = '';
                    guildData.logs[x].enabled = false;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 173:
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
                case 174:
                    _b.sent();
                    return [4 /*yield*/, message.delete()];
                case 175:
                    _b.sent();
                    return [3 /*break*/, 177];
                case 176:
                    x += 1;
                    return [3 /*break*/, 172];
                case 177: return [3 /*break*/, 209];
                case 178:
                    if (!(args[0].toLowerCase() === 'enable')) return [3 /*break*/, 185];
                    x = 0;
                    _b.label = 179;
                case 179:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 184];
                    if (!(args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 183];
                    guildData.logs[x].loggingChannelID = message.channel.id;
                    guildData.logs[x].loggingChannelName = message.channel.name;
                    guildData.logs[x].enabled = true;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 180:
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
                case 181:
                    _b.sent();
                    return [4 /*yield*/, message.delete()];
                case 182:
                    _b.sent();
                    return [3 /*break*/, 184];
                case 183:
                    x += 1;
                    return [3 /*break*/, 179];
                case 184: return [3 /*break*/, 191];
                case 185:
                    if (!(args[0].toLowerCase() === 'disable')) return [3 /*break*/, 191];
                    x = 0;
                    _b.label = 186;
                case 186:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 191];
                    if (!(args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 190];
                    guildData.logs[x].loggingChannelID = '';
                    guildData.logs[x].loggingChannelName = '';
                    guildData.logs[x].enabled = false;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 187:
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
                case 188:
                    _b.sent();
                    return [4 /*yield*/, message.delete()];
                case 189:
                    _b.sent();
                    return [3 /*break*/, 191];
                case 190:
                    x += 1;
                    return [3 /*break*/, 186];
                case 191: return [3 /*break*/, 209];
                case 192:
                    if (!(args[0].toLowerCase() === 'enable')) return [3 /*break*/, 199];
                    x = 0;
                    _b.label = 193;
                case 193:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 198];
                    if (!(args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 197];
                    guildData.logs[x].loggingChannelID = message.channel.id;
                    guildData.logs[x].loggingChannelName = message.channel.name;
                    guildData.logs[x].enabled = true;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 194:
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
                case 195:
                    _b.sent();
                    return [4 /*yield*/, message.delete()];
                case 196:
                    _b.sent();
                    return [3 /*break*/, 198];
                case 197:
                    x += 1;
                    return [3 /*break*/, 193];
                case 198: return [3 /*break*/, 205];
                case 199:
                    if (!(args[0].toLowerCase() === 'disable')) return [3 /*break*/, 205];
                    x = 0;
                    _b.label = 200;
                case 200:
                    if (!(x < guildData.logs.length)) return [3 /*break*/, 205];
                    if (!(args[1].toLowerCase() === guildData.logs[x].nameSmall)) return [3 /*break*/, 204];
                    guildData.logs[x].loggingChannelID = '';
                    guildData.logs[x].loggingChannelName = '';
                    guildData.logs[x].enabled = false;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 201:
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
                case 202:
                    _b.sent();
                    return [4 /*yield*/, message.delete()];
                case 203:
                    _b.sent();
                    return [3 /*break*/, 205];
                case 204:
                    x += 1;
                    return [3 /*break*/, 200];
                case 205: return [3 /*break*/, 209];
                case 206: return [4 /*yield*/, message.reply('Please enter a proper log name!')];
                case 207:
                    _b.sent();
                    return [4 /*yield*/, message.delete()];
                case 208:
                    _b.sent();
                    return [2 /*return*/, command.name];
                case 209: return [2 /*return*/, command.name];
                case 210:
                    error_1 = _b.sent();
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            reject(error_1);
                        })];
                case 211: return [2 /*return*/];
            }
        });
    });
}
exports.execute = execute;
command.function = execute;
exports.default = command;
