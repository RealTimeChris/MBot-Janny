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
function execute(message, args, discordUser) {
    return __awaiter(this, void 0, void 0, function () {
        var commandReturnData, areWeInADM, doWeHaveAdminPermission, guildData, whatAreWeDoing, emojiRegExp, msgString, newMessage, msgEmbed, currentChannel, messageManager, msgEmbed, msgEmbed2, newMessage, argTwo, msgEmbed, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 44, , 45]);
                    commandReturnData = new DiscordStuff.CommandReturnData();
                    commandReturnData.commandName = command.name;
                    return [4 /*yield*/, DiscordStuff.areWeInADM(message)];
                case 1:
                    areWeInADM = _a.sent();
                    if (areWeInADM === true) {
                        return [2 /*return*/, command.name];
                    }
                    return [4 /*yield*/, discordUser.doWeHaveAdminPermission(message)];
                case 2:
                    doWeHaveAdminPermission = _a.sent();
                    if (doWeHaveAdminPermission === false) {
                        return [2 /*return*/, command.name];
                    }
                    return [4 /*yield*/, discordUser.getGuildDataFromDB(message.guild)];
                case 3:
                    guildData = _a.sent();
                    whatAreWeDoing = void 0;
                    emojiRegExp = /.{1,26}/;
                    if (!(args[0] === undefined)) return [3 /*break*/, 4];
                    whatAreWeDoing = 'viewing';
                    return [3 /*break*/, 17];
                case 4:
                    if (!(args[0].toLowerCase() !== 'enable' && args[0].toLowerCase() !== 'disable')) return [3 /*break*/, 8];
                    return [4 /*yield*/, message.reply("Please enter either 'enable' or 'disable' as the first argument! (!setverificationsystem = ENABLE, VERIFICATIONMESSAGE, REACTIONEMOJI, or !setverificationsystem = DISABLE)")];
                case 5:
                    _a.sent();
                    if (!message.deletable) return [3 /*break*/, 7];
                    return [4 /*yield*/, message.delete()];
                case 6:
                    _a.sent();
                    _a.label = 7;
                case 7: return [2 /*return*/, command.name];
                case 8:
                    if (!(args[0].toLowerCase() === 'enable' && args[1] === undefined)) return [3 /*break*/, 12];
                    return [4 /*yield*/, message.reply('Please, enter a greeting message for the verification system!')];
                case 9:
                    _a.sent();
                    if (!message.deletable) return [3 /*break*/, 11];
                    return [4 /*yield*/, message.delete()];
                case 10:
                    _a.sent();
                    _a.label = 11;
                case 11: return [2 /*return*/, command.name];
                case 12:
                    if (!(args[0].toLowerCase() === 'enable' && (args[2] === undefined || !emojiRegExp.test(args[2])))) return [3 /*break*/, 16];
                    return [4 /*yield*/, message.reply('Please, enter a valid emoji for them to react with!')];
                case 13:
                    _a.sent();
                    if (!message.deletable) return [3 /*break*/, 15];
                    return [4 /*yield*/, message.delete()];
                case 14:
                    _a.sent();
                    _a.label = 15;
                case 15: return [2 /*return*/, command.name];
                case 16:
                    if (args[0].toLowerCase() === 'enable') {
                        whatAreWeDoing = 'enable';
                    }
                    else if (args[0].toLowerCase() === 'disable') {
                        whatAreWeDoing = 'disable';
                    }
                    _a.label = 17;
                case 17:
                    msgString = '';
                    if (!(whatAreWeDoing === 'viewing')) return [3 /*break*/, 24];
                    if (!(guildData.verificationSystem.channelID === '')) return [3 /*break*/, 18];
                    msgString = '------\n__The verification system is currently disabled.__\n------\n';
                    return [3 /*break*/, 20];
                case 18: return [4 /*yield*/, message.fetch()];
                case 19:
                    newMessage = _a.sent();
                    msgString = "------\n__**Channel:**__ <#" + guildData.verificationSystem.channelID + ">\n";
                    msgString += "__**Message Content:**__ " + newMessage.embeds[0].description + "\n";
                    msgString += "__**Emoji:**__ " + guildData.verificationSystem.emoji + "\n------";
                    _a.label = 20;
                case 20:
                    msgEmbed = new Discord.MessageEmbed();
                    msgEmbed
                        .setAuthor(message.author.username, message.author.avatarURL())
                        .setColor([0, 0, 255])
                        .setTimestamp(Date())
                        .setTitle('__**Verification System:**__')
                        .setDescription(msgString);
                    return [4 /*yield*/, message.channel.send(msgEmbed)];
                case 21:
                    _a.sent();
                    if (!message.deletable) return [3 /*break*/, 23];
                    return [4 /*yield*/, message.delete()];
                case 22:
                    _a.sent();
                    _a.label = 23;
                case 23: return [2 /*return*/, command.name];
                case 24:
                    if (!(whatAreWeDoing === 'disable')) return [3 /*break*/, 33];
                    if (!(guildData.verificationSystem.channelID == null)) return [3 /*break*/, 28];
                    return [4 /*yield*/, message.reply('Sorry, it looks as though it is already disabled!')];
                case 25:
                    _a.sent();
                    if (!message.deletable) return [3 /*break*/, 27];
                    return [4 /*yield*/, message.delete()];
                case 26:
                    _a.sent();
                    _a.label = 27;
                case 27: return [2 /*return*/, command.name];
                case 28:
                    currentChannel = message.client.channels
                        .resolve(guildData.verificationSystem.channelID);
                    messageManager = new Discord.MessageManager(currentChannel);
                    return [4 /*yield*/, messageManager.delete(guildData.verificationSystem.messageID)];
                case 29:
                    _a.sent();
                    guildData.verificationSystem.channelID = '';
                    guildData.verificationSystem.messageID = '';
                    msgString = "__**Nicely done! You've disabled the verification system for this server!**__";
                    msgEmbed = new Discord.MessageEmbed();
                    msgEmbed
                        .setAuthor(message.author.username, message.author.avatarURL())
                        .setColor([0, 0, 255])
                        .setTimestamp(Date())
                        .setTitle('__**Set Verification System:**__')
                        .setDescription(msgString);
                    return [4 /*yield*/, message.channel.send(msgEmbed)];
                case 30:
                    _a.sent();
                    if (!message.deletable) return [3 /*break*/, 32];
                    return [4 /*yield*/, message.delete()];
                case 31:
                    _a.sent();
                    _a.label = 32;
                case 32: return [2 /*return*/, command.name];
                case 33:
                    if (!(whatAreWeDoing === 'enable')) return [3 /*break*/, 43];
                    if (!(guildData.defaultRoleIDs.length === 0)) return [3 /*break*/, 37];
                    return [4 /*yield*/, message.reply('Please, first set a default role to be applied to the new member! Using !setdefaultrole.')];
                case 34:
                    _a.sent();
                    if (!message.deletable) return [3 /*break*/, 36];
                    return [4 /*yield*/, message.delete()];
                case 35:
                    _a.sent();
                    _a.label = 36;
                case 36: return [2 /*return*/, command.name];
                case 37:
                    msgEmbed2 = new Discord.MessageEmbed()
                        .setColor([0, 0, 255])
                        .setDescription(args[1])
                        .setTimestamp(Date());
                    return [4 /*yield*/, message.channel.send(msgEmbed2)];
                case 38:
                    newMessage = _a.sent();
                    return [4 /*yield*/, newMessage.react(args[2])];
                case 39:
                    _a.sent();
                    guildData.verificationSystem.channelID = message.channel.id;
                    guildData.verificationSystem.messageID = newMessage.id;
                    argTwo = args[2];
                    guildData.verificationSystem.emoji = argTwo;
                    discordUser.updateGuildDataInDB(guildData);
                    msgString = "__**Nicely done! You've enabled the verification system for this server!**__";
                    msgEmbed = new Discord.MessageEmbed();
                    msgEmbed
                        .setAuthor(message.author.username, message.author.avatarURL())
                        .setColor([0, 0, 255])
                        .setTimestamp(Date())
                        .setTitle('__**Set Verification System:**__')
                        .setDescription(msgString);
                    return [4 /*yield*/, message.channel.send(msgEmbed)];
                case 40:
                    _a.sent();
                    if (!message.deletable) return [3 /*break*/, 42];
                    return [4 /*yield*/, message.delete()];
                case 41:
                    _a.sent();
                    _a.label = 42;
                case 42: return [2 /*return*/, command.name];
                case 43: return [2 /*return*/, command.name];
                case 44:
                    error_1 = _a.sent();
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            reject(error_1);
                        })];
                case 45: return [2 /*return*/];
            }
        });
    });
}
exports.execute = execute;
command.function = execute;
exports.default = command;
