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
exports.execute = void 0;
var Discord = require("discord.js");
var DiscordStuff = require("../DiscordStuff");
var command = new DiscordStuff.BotCommand();
command.name = 'setverificationsystem';
command.description = '!setverificationsystem = ENABLE, VERIFICATIONMESSAGE, REACTIONEMOJI, in the channel you would like to use for your verification channel!\nAlso, !setverificationsystem = DISABLE.';
function execute(commandData, discordUser) {
    var _a, _b, _c, _d, _e;
    return __awaiter(this, void 0, void 0, function () {
        var commandReturnData, areWeInADM, doWeHaveAdminPermission, guildData, whatAreWeDoing, emojiRegExp, msgString_1, msgEmbed, msgString_2, msgEmbed, msgString_3, msgEmbed, msgString, messageManager, newMessage, _f, msgEmbed_1, msgEmbed_2, msgEmbed, currentChannel, msgString_4, msgEmbed_3, messageManager, msgEmbed, msgString_5, msgEmbed_4, msgEmbed2, newMessage, argTwo, msgEmbed, error_1;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    _g.trys.push([0, 37, , 38]);
                    commandReturnData = new DiscordStuff.CommandReturnData();
                    commandReturnData.commandName = command.name;
                    return [4 /*yield*/, DiscordStuff.areWeInADM(commandData)];
                case 1:
                    areWeInADM = _g.sent();
                    if (areWeInADM === true) {
                        return [2 /*return*/, commandReturnData];
                    }
                    return [4 /*yield*/, discordUser.doWeHaveAdminPermission(commandData)];
                case 2:
                    doWeHaveAdminPermission = _g.sent();
                    if (doWeHaveAdminPermission === false) {
                        return [2 /*return*/, commandReturnData];
                    }
                    return [4 /*yield*/, discordUser.getGuildDataFromDB(commandData.guild)];
                case 3:
                    guildData = _g.sent();
                    whatAreWeDoing = void 0;
                    emojiRegExp = /.{1,26}/;
                    if (!(commandData.args[0] === undefined)) return [3 /*break*/, 4];
                    whatAreWeDoing = 'viewing';
                    return [3 /*break*/, 11];
                case 4:
                    if (!(commandData.args[0].toLowerCase() !== 'enable' && commandData.args[0].toLowerCase() !== 'disable')) return [3 /*break*/, 6];
                    msgString_1 = "------\n**Please enter either 'enable' or 'disable' as the first argument! (!setverificationsystem = ENABLE, VERIFICATIONMESSAGE, REACTIONEMOJI, or !setverificationsystem = DISABLE)**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor((_a = commandData.guildMember) === null || _a === void 0 ? void 0 : _a.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString_1)
                        .setTimestamp(Date())
                        .setTitle('__**Missing Or Invalid Arguments:**__');
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 5:
                    _g.sent();
                    return [2 /*return*/, commandReturnData];
                case 6:
                    if (!(commandData.args[0].toLowerCase() === 'enable' && commandData.args[1] === undefined)) return [3 /*break*/, 8];
                    msgString_2 = '------\n**Please, enter a greeting message for the verification system!**\n------';
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor((_b = commandData.guildMember) === null || _b === void 0 ? void 0 : _b.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString_2)
                        .setTimestamp(Date())
                        .setTitle('__**Missing Or Invalid Arguments:**__');
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 7:
                    _g.sent();
                    return [2 /*return*/, commandReturnData];
                case 8:
                    if (!(commandData.args[0].toLowerCase() === 'enable' && (commandData.args[2] === undefined || !emojiRegExp.test(commandData.args[2])))) return [3 /*break*/, 10];
                    msgString_3 = '------\n**Please, enter a valid emoji for them to react with!**\n------';
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor((_c = commandData.guildMember) === null || _c === void 0 ? void 0 : _c.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString_3)
                        .setTimestamp(Date())
                        .setTitle('__**Missing Or Invalid Arguments:**__');
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 9:
                    _g.sent();
                    return [2 /*return*/, commandReturnData];
                case 10:
                    if (commandData.args[0].toLowerCase() === 'enable') {
                        whatAreWeDoing = 'enable';
                    }
                    else if (commandData.args[0].toLowerCase() === 'disable') {
                        whatAreWeDoing = 'disable';
                    }
                    _g.label = 11;
                case 11:
                    msgString = '';
                    if (!(whatAreWeDoing === 'viewing')) return [3 /*break*/, 23];
                    if (!(guildData.verificationSystem.messageID !== '')) return [3 /*break*/, 18];
                    _g.label = 12;
                case 12:
                    _g.trys.push([12, 14, , 17]);
                    messageManager = new Discord.MessageManager(commandData.fromTextChannel);
                    return [4 /*yield*/, messageManager.fetch(guildData.verificationSystem.messageID)];
                case 13:
                    newMessage = _g.sent();
                    msgString = "------\n__**Channel:**__ <#" + guildData.verificationSystem.channelID + ">\n";
                    msgString += "__**Message Content:**__ " + newMessage.embeds[0].description + "\n";
                    msgString += "__**Emoji:**__ " + guildData.verificationSystem.emoji + "\n------";
                    return [3 /*break*/, 17];
                case 14:
                    _f = _g.sent();
                    msgString = '------\n__The verification system is currently disabled.__\n------\n';
                    guildData.verificationSystem.channelID = '';
                    guildData.verificationSystem.messageID = '';
                    guildData.verificationSystem.emoji = '';
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 15:
                    _g.sent();
                    msgEmbed_1 = new Discord.MessageEmbed();
                    msgEmbed_1
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setTimestamp(Date())
                        .setTitle('__**Verification System:**__')
                        .setDescription(msgString);
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed_1)];
                case 16:
                    _g.sent();
                    return [2 /*return*/, commandReturnData];
                case 17: return [3 /*break*/, 21];
                case 18:
                    msgString = '------\n__The verification system is currently disabled.__\n------\n';
                    guildData.verificationSystem.channelID = '';
                    guildData.verificationSystem.messageID = '';
                    guildData.verificationSystem.emoji = '';
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 19:
                    _g.sent();
                    msgEmbed_2 = new Discord.MessageEmbed();
                    msgEmbed_2
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setTimestamp(Date())
                        .setTitle('__**Verification System:**__')
                        .setDescription(msgString);
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed_2)];
                case 20:
                    _g.sent();
                    return [2 /*return*/, commandReturnData];
                case 21:
                    msgEmbed = new Discord.MessageEmbed();
                    msgEmbed
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setTimestamp(Date())
                        .setTitle('__**Verification System:**__')
                        .setDescription(msgString);
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 22:
                    _g.sent();
                    return [2 /*return*/, commandReturnData];
                case 23:
                    if (!(whatAreWeDoing === 'disable')) return [3 /*break*/, 30];
                    currentChannel = commandData.guildMember.client.channels
                        .resolve(guildData.verificationSystem.channelID);
                    if (!(guildData.verificationSystem.channelID == '' || currentChannel === null)) return [3 /*break*/, 26];
                    msgString_4 = '------\n**Sorry, it looks as though it is already disabled!**\n------';
                    msgEmbed_3 = new Discord.MessageEmbed()
                        .setAuthor((_d = commandData.guildMember) === null || _d === void 0 ? void 0 : _d.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString_4)
                        .setTimestamp(Date())
                        .setTitle('__**Existence Issue:**__');
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed_3)];
                case 24:
                    _g.sent();
                    guildData.verificationSystem.channelID = '';
                    guildData.verificationSystem.messageID = '';
                    guildData.verificationSystem.emoji = '';
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 25:
                    _g.sent();
                    return [2 /*return*/, commandReturnData];
                case 26:
                    messageManager = new Discord.MessageManager(currentChannel);
                    return [4 /*yield*/, messageManager.delete(guildData.verificationSystem.messageID)];
                case 27:
                    _g.sent();
                    guildData.verificationSystem.channelID = '';
                    guildData.verificationSystem.messageID = '';
                    guildData.verificationSystem.emoji = '';
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 28:
                    _g.sent();
                    msgString = "__**Nicely done! You've disabled the verification system for this server!**__";
                    msgEmbed = new Discord.MessageEmbed();
                    msgEmbed
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setTimestamp(Date())
                        .setTitle('__**Set Verification System:**__')
                        .setDescription(msgString);
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 29:
                    _g.sent();
                    return [2 /*return*/, commandReturnData];
                case 30:
                    if (!(whatAreWeDoing === 'enable')) return [3 /*break*/, 36];
                    if (!(guildData.defaultRoleIDs.length === 0)) return [3 /*break*/, 32];
                    msgString_5 = '------\n**Please, first set a default role to be applied to the new member! Using !setdefaultrole.**\n------';
                    msgEmbed_4 = new Discord.MessageEmbed()
                        .setAuthor((_e = commandData.guildMember) === null || _e === void 0 ? void 0 : _e.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString_5)
                        .setTimestamp(Date())
                        .setTitle('__**Role Issue:**__');
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed_4)];
                case 31:
                    _g.sent();
                    return [2 /*return*/, commandReturnData];
                case 32:
                    msgEmbed2 = new Discord.MessageEmbed()
                        .setColor([0, 0, 255])
                        .setDescription(commandData.args[1])
                        .setTimestamp(Date());
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed2)];
                case 33:
                    newMessage = _g.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        newMessage = new Discord.Message(commandData.guild.client, newMessage, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, newMessage.react(commandData.args[2])];
                case 34:
                    _g.sent();
                    guildData.verificationSystem.channelID = commandData.fromTextChannel.id;
                    guildData.verificationSystem.messageID = newMessage.id;
                    argTwo = commandData.args[2];
                    guildData.verificationSystem.emoji = argTwo;
                    discordUser.updateGuildDataInDB(guildData);
                    msgString = "__**Nicely done! You've enabled the verification system for this server!**__";
                    msgEmbed = new Discord.MessageEmbed();
                    msgEmbed
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setTimestamp(Date())
                        .setTitle('__**Set Verification System:**__')
                        .setDescription(msgString);
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 35:
                    _g.sent();
                    return [2 /*return*/, commandReturnData];
                case 36: return [2 /*return*/, commandReturnData];
                case 37:
                    error_1 = _g.sent();
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            reject(error_1);
                        })];
                case 38: return [2 /*return*/];
            }
        });
    });
}
exports.execute = execute;
command.function = execute;
exports.default = command;
