//  setverificationsystem.ts - Module for my "set verification system" command!.
// Feb 26, 2021
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
var Discord = require("discord.js");
var DiscordStuff = require("../DiscordStuff");
var command = new DiscordStuff.BotCommand();
command.name = 'setverificationsystem';
command.description = '!setverificationsystem = ENABLE, VERIFICATIONMESSAGE, REACTIONEMOJI, in the channel you would like to use for your verification channel!\nAlso, !setverificationsystem = DISABLE.';
function execute(commandData, discordUser) {
    return __awaiter(this, void 0, void 0, function () {
        var commandReturnData, areWeInADM, doWeHaveAdminPermission, guildData, whatAreWeDoing, emojiRegExp, msgString_1, msgEmbed, msg, msgString_2, msgEmbed, msg, msgString_3, msgEmbed, msg, msgString, messageManager, newMessage, error_1, msgEmbed_1, msgEmbed, currentChannel, msgString_4, msgEmbed_2, msg, messageManager, msgEmbed, msgString_5, msgEmbed_3, msg, msgEmbed2, newMessage, argTwo, msgEmbed, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 41, , 42]);
                    commandReturnData = new DiscordStuff.CommandReturnData();
                    commandReturnData.commandName = command.name;
                    return [4 /*yield*/, DiscordStuff.areWeInADM(commandData)];
                case 1:
                    areWeInADM = _a.sent();
                    if (areWeInADM === true) {
                        return [2 /*return*/, commandReturnData];
                    }
                    return [4 /*yield*/, discordUser.doWeHaveAdminPermission(commandData)];
                case 2:
                    doWeHaveAdminPermission = _a.sent();
                    if (doWeHaveAdminPermission === false) {
                        return [2 /*return*/, commandReturnData];
                    }
                    return [4 /*yield*/, discordUser.getGuildDataFromDB(commandData.guild)];
                case 3:
                    guildData = _a.sent();
                    whatAreWeDoing = void 0;
                    emojiRegExp = /.{1,26}/;
                    if (!(commandData.args[0] === undefined)) return [3 /*break*/, 4];
                    whatAreWeDoing = 'viewing';
                    return [3 /*break*/, 14];
                case 4:
                    if (!(commandData.args[0].toLowerCase() !== 'enable' && commandData.args[0].toLowerCase() !== 'disable')) return [3 /*break*/, 7];
                    msgString_1 = "------\n**Please enter either 'enable' or 'disable' as the first argument! (!setverificationsystem = ENABLE, VERIFICATIONMESSAGE, REACTIONEMOJI, or !setverificationsystem = DISABLE)**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString_1)
                        .setTimestamp(Date())
                        .setTitle('__**Missing Or Invalid Arguments:**__');
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 5:
                    msg = _a.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 6:
                    _a.sent();
                    return [2 /*return*/, commandReturnData];
                case 7:
                    if (!(commandData.args[0].toLowerCase() === 'enable' && commandData.args[1] === undefined)) return [3 /*break*/, 10];
                    msgString_2 = '------\n**Please, enter a greeting message for the verification system!**\n------';
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString_2)
                        .setTimestamp(Date())
                        .setTitle('__**Missing Or Invalid Arguments:**__');
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 8:
                    msg = _a.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 9:
                    _a.sent();
                    return [2 /*return*/, commandReturnData];
                case 10:
                    if (!(commandData.args[0].toLowerCase() === 'enable' && (commandData.args[2] === undefined || !emojiRegExp.test(commandData.args[2])))) return [3 /*break*/, 13];
                    msgString_3 = '------\n**Please, enter a valid emoji for them to react with!**\n------';
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString_3)
                        .setTimestamp(Date())
                        .setTitle('__**Missing Or Invalid Arguments:**__');
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 11:
                    msg = _a.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 12:
                    _a.sent();
                    return [2 /*return*/, commandReturnData];
                case 13:
                    if (commandData.args[0].toLowerCase() === 'enable') {
                        whatAreWeDoing = 'enable';
                    }
                    else if (commandData.args[0].toLowerCase() === 'disable') {
                        whatAreWeDoing = 'disable';
                    }
                    _a.label = 14;
                case 14:
                    msgString = '';
                    if (!(whatAreWeDoing === 'viewing')) return [3 /*break*/, 25];
                    if (!(guildData.verificationSystem.messageID !== '')) return [3 /*break*/, 21];
                    _a.label = 15;
                case 15:
                    _a.trys.push([15, 17, , 20]);
                    messageManager = new Discord.MessageManager(commandData.guildMember.client.channels.resolve(guildData.verificationSystem.channelID));
                    return [4 /*yield*/, messageManager.fetch(guildData.verificationSystem.messageID)];
                case 16:
                    newMessage = _a.sent();
                    msgString = "------\n__**Channel:**__ <#" + guildData.verificationSystem.channelID + ">\n";
                    msgString += "__**Message Content:**__ " + newMessage.embeds[0].description + "\n";
                    msgString += "__**Emoji:**__ " + guildData.verificationSystem.emoji + "\n------";
                    return [3 /*break*/, 20];
                case 17:
                    error_1 = _a.sent();
                    console.log(error_1);
                    msgString = '------\n__The verification system is currently disabled.__\n------\n';
                    guildData.verificationSystem.channelID = '';
                    guildData.verificationSystem.messageID = '';
                    guildData.verificationSystem.emoji = '';
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 18:
                    _a.sent();
                    msgEmbed_1 = new Discord.MessageEmbed();
                    msgEmbed_1
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setTimestamp(Date())
                        .setTitle('__**Verification System:**__')
                        .setDescription(msgString);
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed_1)];
                case 19:
                    _a.sent();
                    return [2 /*return*/, commandReturnData];
                case 20: return [3 /*break*/, 23];
                case 21:
                    msgString = '------\n__The verification system is currently disabled.__\n------\n';
                    guildData.verificationSystem.channelID = '';
                    guildData.verificationSystem.messageID = '';
                    guildData.verificationSystem.emoji = '';
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 22:
                    _a.sent();
                    _a.label = 23;
                case 23:
                    msgEmbed = new Discord.MessageEmbed();
                    msgEmbed
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setTimestamp(Date())
                        .setTitle('__**Verification System:**__')
                        .setDescription(msgString);
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 24:
                    _a.sent();
                    return [2 /*return*/, commandReturnData];
                case 25:
                    if (!(whatAreWeDoing === 'disable')) return [3 /*break*/, 33];
                    currentChannel = commandData.guildMember.client.channels
                        .resolve(guildData.verificationSystem.channelID);
                    if (!(guildData.verificationSystem.channelID == '' || currentChannel === null)) return [3 /*break*/, 29];
                    msgString_4 = '------\n**Sorry, it looks as though it is already disabled!**\n------';
                    msgEmbed_2 = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString_4)
                        .setTimestamp(Date())
                        .setTitle('__**Existence Issue:**__');
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed_2)];
                case 26:
                    msg = _a.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 27:
                    _a.sent();
                    guildData.verificationSystem.channelID = '';
                    guildData.verificationSystem.messageID = '';
                    guildData.verificationSystem.emoji = '';
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 28:
                    _a.sent();
                    return [2 /*return*/, commandReturnData];
                case 29:
                    messageManager = new Discord.MessageManager(currentChannel);
                    return [4 /*yield*/, messageManager.delete(guildData.verificationSystem.messageID)];
                case 30:
                    _a.sent();
                    guildData.verificationSystem.channelID = '';
                    guildData.verificationSystem.messageID = '';
                    guildData.verificationSystem.emoji = '';
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 31:
                    _a.sent();
                    msgString = "__**Nicely done! You've disabled the verification system for this server!**__";
                    msgEmbed = new Discord.MessageEmbed();
                    msgEmbed
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setTimestamp(Date())
                        .setTitle('__**Set Verification System:**__')
                        .setDescription(msgString);
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 32:
                    _a.sent();
                    return [2 /*return*/, commandReturnData];
                case 33:
                    if (!(whatAreWeDoing === 'enable')) return [3 /*break*/, 40];
                    if (!(guildData.defaultRoleIDs.length === 0)) return [3 /*break*/, 36];
                    msgString_5 = '------\n**Please, first set a default role to be applied to the new member! Using !setdefaultrole.**\n------';
                    msgEmbed_3 = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString_5)
                        .setTimestamp(Date())
                        .setTitle('__**Role Issue:**__');
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed_3)];
                case 34:
                    msg = _a.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 35:
                    _a.sent();
                    return [2 /*return*/, commandReturnData];
                case 36:
                    msgEmbed2 = new Discord.MessageEmbed()
                        .setColor(guildData.borderColor)
                        .setDescription(commandData.args[1])
                        .setTimestamp(Date());
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed2)];
                case 37:
                    newMessage = _a.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        newMessage = new Discord.Message(commandData.guild.client, newMessage, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, newMessage.react(commandData.args[2])];
                case 38:
                    _a.sent();
                    guildData.verificationSystem.channelID = commandData.fromTextChannel.id;
                    guildData.verificationSystem.messageID = newMessage.id;
                    argTwo = commandData.args[2];
                    guildData.verificationSystem.emoji = argTwo;
                    discordUser.updateGuildDataInDB(guildData);
                    msgString = "__**Nicely done! You've enabled the verification system for this server!**__";
                    msgEmbed = new Discord.MessageEmbed();
                    msgEmbed
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setTimestamp(Date())
                        .setTitle('__**Set Verification System:**__')
                        .setDescription(msgString);
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 39:
                    _a.sent();
                    return [2 /*return*/, commandReturnData];
                case 40: return [2 /*return*/, commandReturnData];
                case 41:
                    error_2 = _a.sent();
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            reject(error_2);
                        })];
                case 42: return [2 /*return*/];
            }
        });
    });
}
command.function = execute;
exports.default = command;
