// serverinfo.ts - Module file for my display server info command.
// Jan 29, 2021
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
    name: 'serverinfo',
    description: '!serverinfo to get info about the current server!\n!serverinfo = SERVERID to display info about that server!',
    function: Function()
};
/**
 * Displays the info of a chosen server./
 */
function execute(commandData, discordUser) {
    return __awaiter(this, void 0, void 0, function () {
        var commandReturnData, idRegExp, currentServerID, msgString, msgEmbed, msg, guildData, msgString, messageEmbed_1, msg, msg, msgString, messageEmbed_2, msg, msg, argZero, serverArray, currentServer, x, msgString, messageEmbed_3, msg, msg, categoryCount, voiceChannelCount, textChannelCount, x, fields, field1, field2, field3, field4, field5, field6, field7, field8, field9, field10, field11, messageEmbed, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 30, , 31]);
                    commandReturnData = {
                        commandName: command.name
                    };
                    idRegExp = /\d{18}/;
                    currentServerID = void 0;
                    if (!(commandData.guildMember instanceof Discord.User && commandData.args[0] === undefined)) return [3 /*break*/, 3];
                    msgString = "------\n**Please, enter a server ID if you're going to DM this command!**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.username, commandData.guildMember.avatarURL())
                        .setColor([254, 254, 254])
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Missing Or Invalid Arguments:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 1:
                    msg = _a.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guildMember.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 2:
                    _a.sent();
                    return [2 /*return*/, commandReturnData];
                case 3:
                    guildData = void 0;
                    if (!(commandData.guildMember instanceof Discord.GuildMember)) return [3 /*break*/, 5];
                    guildData = new GuildData_1.default({ dataBase: discordUser.dataBase, id: commandData.guild.id, name: commandData.guild.name, memberCount: commandData.guild.memberCount });
                    return [4 /*yield*/, guildData.getFromDataBase()];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5:
                    if (!(commandData.args[0] === undefined && commandData.permsChannel.type !== 'dm')) return [3 /*break*/, 6];
                    currentServerID = commandData.guild.id;
                    return [3 /*break*/, 21];
                case 6:
                    if (!(commandData.args[0] === undefined && commandData.permsChannel.type === 'dm')) return [3 /*break*/, 13];
                    msgString = '------\n**Please enter a valid server ID! (!displayserverinfo = SERVERID)**\n------';
                    messageEmbed_1 = new Discord.MessageEmbed();
                    if (!(commandData.guildMember instanceof Discord.User)) return [3 /*break*/, 9];
                    messageEmbed_1
                        .setDescription(msgString)
                        .setTitle('__**Missing Or Invalid Arguments:**__')
                        .setTimestamp(Date())
                        .setAuthor(commandData.guildMember.username, commandData.guildMember.avatarURL())
                        .setColor([254, 254, 254]);
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, messageEmbed_1)];
                case 7:
                    msg = _a.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guildMember.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 8:
                    _a.sent();
                    return [3 /*break*/, 12];
                case 9:
                    if (!(commandData.guildMember instanceof Discord.GuildMember)) return [3 /*break*/, 12];
                    messageEmbed_1
                        .setDescription(msgString)
                        .setTitle('__**Missing Or Invalid Arguments:**__')
                        .setTimestamp(Date())
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor);
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, messageEmbed_1)];
                case 10:
                    msg = _a.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 11:
                    _a.sent();
                    _a.label = 12;
                case 12: return [2 /*return*/, commandReturnData];
                case 13:
                    if (!!idRegExp.test(commandData.args[0])) return [3 /*break*/, 20];
                    msgString = '------\n**Please enter a valid server ID! (!displayserverinfo = SERVERID)**\n------';
                    messageEmbed_2 = new Discord.MessageEmbed();
                    if (!(commandData.guildMember instanceof Discord.User)) return [3 /*break*/, 16];
                    messageEmbed_2
                        .setDescription(msgString)
                        .setTitle('__**Missing Or Invalid Arguments:**__')
                        .setTimestamp(Date())
                        .setAuthor(commandData.guildMember.username, commandData.guildMember.avatarURL())
                        .setColor([254, 254, 254]);
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, messageEmbed_2)];
                case 14:
                    msg = _a.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guildMember.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 15:
                    _a.sent();
                    return [3 /*break*/, 19];
                case 16:
                    if (!(commandData.guildMember instanceof Discord.GuildMember)) return [3 /*break*/, 19];
                    messageEmbed_2
                        .setDescription(msgString)
                        .setTitle('__**Missing Or Invalid Arguments:**__')
                        .setTimestamp(Date())
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor);
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, messageEmbed_2)];
                case 17:
                    msg = _a.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 18:
                    _a.sent();
                    _a.label = 19;
                case 19: return [2 /*return*/, commandReturnData];
                case 20:
                    argZero = commandData.args[0];
                    currentServerID = argZero;
                    _a.label = 21;
                case 21:
                    serverArray = commandData.guildMember.client.guilds.cache.array().sort();
                    currentServer = null;
                    for (x = 0; x < serverArray.length; x += 1) {
                        if (currentServerID === serverArray[x].id) {
                            currentServer = serverArray[x];
                        }
                    }
                    if (!(currentServer == null)) return [3 /*break*/, 28];
                    msgString = '------\n**Sorry! No matching servers were found!**\n------';
                    messageEmbed_3 = new Discord.MessageEmbed();
                    if (!(commandData.guildMember instanceof Discord.User)) return [3 /*break*/, 24];
                    messageEmbed_3
                        .setDescription(msgString)
                        .setTitle('__**Server Issue:**__')
                        .setTimestamp(Date())
                        .setAuthor(commandData.guildMember.username, commandData.guildMember.avatarURL())
                        .setColor([254, 254, 254]);
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, messageEmbed_3)];
                case 22:
                    msg = _a.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guildMember.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 23:
                    _a.sent();
                    return [3 /*break*/, 27];
                case 24:
                    if (!(commandData.guildMember instanceof Discord.GuildMember)) return [3 /*break*/, 27];
                    messageEmbed_3
                        .setDescription(msgString)
                        .setTitle('__**Server Issue:**__')
                        .setTimestamp(Date())
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor);
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, messageEmbed_3)];
                case 25:
                    msg = _a.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 26:
                    _a.sent();
                    _a.label = 27;
                case 27: return [2 /*return*/, commandReturnData];
                case 28:
                    categoryCount = 0;
                    voiceChannelCount = 0;
                    textChannelCount = 0;
                    for (x = 0; x < currentServer.channels.cache.size; x += 1) {
                        if (currentServer.channels.cache.array()[x].type === 'voice') {
                            voiceChannelCount += 1;
                        }
                        if (currentServer.channels.cache.array()[x].type === 'text') {
                            textChannelCount += 1;
                        }
                        if (currentServer.channels.cache.array()[x].type === 'category') {
                            categoryCount += 1;
                        }
                    }
                    fields = [];
                    field1 = { name: '__Server Name:__', value: currentServer.name, inline: true };
                    fields.push(field1);
                    field2 = { name: '__Server ID:__', value: currentServer.id, inline: true };
                    fields.push(field2);
                    field3 = { name: '__Server Member Count:__', value: currentServer.memberCount, inline: true };
                    fields.push(field3);
                    field4 = { name: '__Server Owner:__', value: "<@!" + currentServer.owner.user.id + "> \n        (" + currentServer.owner.user.tag + ")", inline: true };
                    fields.push(field4);
                    field5 = { name: '__Server Owner ID:__', value: currentServer.ownerID, inline: true };
                    fields.push(field5);
                    field6 = { name: '__Role Count:__', value: currentServer.roles.cache.size, inline: true };
                    fields.push(field6);
                    field7 = { name: '__Channel Category Count:__', value: categoryCount, inline: true };
                    fields.push(field7);
                    field8 = { name: '__Text Channel Count:__', value: textChannelCount, inline: true };
                    fields.push(field8);
                    field9 = { name: '__Voice Channel Count:__', value: voiceChannelCount, inline: true };
                    fields.push(field9);
                    field10 = { name: '__Created At:__', value: currentServer.createdAt, inline: true };
                    fields.push(field10);
                    field11 = { name: '__Region:__', value: currentServer.region, inline: true };
                    fields.push(field11);
                    messageEmbed = new Discord.MessageEmbed();
                    if (commandData.guildMember instanceof Discord.User) {
                        messageEmbed
                            .setImage(currentServer.iconURL())
                            .setTitle('__**Server Info:**__')
                            .setTimestamp(Date())
                            .setAuthor(commandData.guildMember.username, commandData.guildMember.avatarURL())
                            .setColor([254, 254, 254]);
                        messageEmbed.fields = fields;
                    }
                    else if (commandData.guildMember instanceof Discord.GuildMember) {
                        messageEmbed
                            .setImage(currentServer.iconURL())
                            .setTitle('__**Server Info:**__')
                            .setTimestamp(Date())
                            .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                            .setColor(guildData.borderColor);
                        messageEmbed.fields = fields;
                    }
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, messageEmbed)];
                case 29:
                    _a.sent();
                    return [2 /*return*/, commandReturnData];
                case 30:
                    error_1 = _a.sent();
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            reject(error_1);
                        })];
                case 31: return [2 /*return*/];
            }
        });
    });
}
command.function = execute;
exports.default = command;
