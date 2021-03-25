// setdeletionstatus.ts - Module for my "set deletion status" command.
// Feb 25, 2021
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
command.name = 'setdeletionstatus';
command.description = 'Use this to enable/disable message deletion/pruning in a given channel.\nIn the desired channel, type !setdeletionstatus = ENABLE/DISABLE, AMOUNTOFMESSAGESTOSAVE,'
    + ' enter nothing for AMOUNTOFMESSAGESTOSAVE to save none!\nAlso simply enter !setdeletionstatus to view the current list of channels being purged on the current server!';
/**
 * @param   {Discord.Message}           message
 * @param   {String[]}                  args
 * @param   {DiscordStuff.DiscordUser}  discordUser
 * @returns {Promise<string>}
 */
function execute(message, args, discordUser) {
    return __awaiter(this, void 0, void 0, function () {
        var areWeInADM, doWeHaveAdminPerms, whatAreWeDoing, messageCountRegExp, howManyBack, guildData, currentDeletionChannel, isItFound, x, msgString, x, msgEmbed, x, previousMessage, error_1, msgString, messageEmbed, pinMessage, deletionChannelIndex, x, msgString, messageEmbed, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 39, , 40]);
                    return [4 /*yield*/, DiscordStuff.areWeInADM(message)];
                case 1:
                    areWeInADM = _a.sent();
                    if (areWeInADM === true) {
                        return [2 /*return*/, command.name];
                    }
                    return [4 /*yield*/, DiscordStuff.doWeHaveAdminPermission(message, discordUser)];
                case 2:
                    doWeHaveAdminPerms = _a.sent();
                    if (doWeHaveAdminPerms === false) {
                        return [2 /*return*/, command.name];
                    }
                    whatAreWeDoing = String('');
                    messageCountRegExp = /\d{1,18}/;
                    howManyBack = Number('');
                    if (!(args[0] === undefined)) return [3 /*break*/, 3];
                    whatAreWeDoing = 'viewing';
                    return [3 /*break*/, 10];
                case 3:
                    if (!(args[0] !== undefined && args[0].toLowerCase() !== 'enable' && args[0].toLowerCase() !== 'disable')) return [3 /*break*/, 6];
                    return [4 /*yield*/, message.reply("Please enter either 'enable' or 'disable'! (!setdeletionstatus = ENABLE/DISABLE, AMOUNTOFMESSAGESTOSAVE, or just !setdeletionstatus = ENABLE/DISABLE)")];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, message.delete()];
                case 5:
                    _a.sent();
                    return [2 /*return*/, command.name];
                case 6:
                    if (!(args[0].toLowerCase() === 'enable' && args[1] !== undefined && (!messageCountRegExp.test(args[1]) || parseInt(args[1], 10) < 0 || parseInt(args[1], 10) > 10000))) return [3 /*break*/, 9];
                    return [4 /*yield*/, message.reply('Please enter a valid number of messages back to save! (0 to 10000) (!setdeletionstatus = ENABLE/DISABLE, AMOUNTOFMESSAGESTOSAVE, or just !setdeletionstatus = ENABLE/DISABLE)')];
                case 7:
                    _a.sent();
                    return [4 /*yield*/, message.delete()];
                case 8:
                    _a.sent();
                    return [2 /*return*/, command.name];
                case 9:
                    if (args[1] !== undefined) {
                        whatAreWeDoing = args[0].toLowerCase();
                        howManyBack = parseInt(args[1].match(messageCountRegExp)[0], 10);
                    }
                    else if (args[1] === undefined) {
                        whatAreWeDoing = args[0].toLowerCase();
                        howManyBack = 0;
                    }
                    _a.label = 10;
                case 10: return [4 /*yield*/, discordUser.getGuildDataFromDB(message.guild)];
                case 11:
                    guildData = _a.sent();
                    currentDeletionChannel = new DiscordStuff.DeletionChannel();
                    isItFound = false;
                    for (x = 0; x < guildData.deletionChannels.length; x += 1) {
                        if (message.channel.id === guildData.deletionChannels[x].channelID) {
                            currentDeletionChannel = guildData.deletionChannels[x];
                            isItFound = true;
                        }
                    }
                    if (isItFound === false) {
                        currentDeletionChannel.numberOfMessagesToSave = howManyBack;
                        currentDeletionChannel.channelID = message.channel.id;
                        currentDeletionChannel.timeOfLastPurge = 0;
                        currentDeletionChannel.currentlyBeingDeleted = false;
                    }
                    if (whatAreWeDoing !== 'viewing') {
                        currentDeletionChannel.numberOfMessagesToSave = howManyBack;
                    }
                    if (!(whatAreWeDoing === 'viewing')) return [3 /*break*/, 15];
                    msgString = String('');
                    msgString = '\n------\n';
                    if (guildData.deletionChannels.length > 0) {
                        for (x = 0; x < guildData.deletionChannels.length; x += 1) {
                            msgString += "__**Channel:**__ <#" + guildData.deletionChannels[x].channelID + ">, __**Messages To Save:**__ \n                    " + guildData.deletionChannels[x].numberOfMessagesToSave + "\n";
                        }
                    }
                    else {
                        msgString = "------\n__There's no channels to display, currently!__\n";
                    }
                    msgString += '------';
                    msgEmbed = new Discord.MessageEmbed();
                    msgEmbed.setAuthor(message.author.username, message.author.avatarURL())
                        .setColor([0, 0, 255]).setDescription(msgString).setTimestamp(Date())
                        .setTitle('__**Current Deletion Channels:**__');
                    return [4 /*yield*/, message.channel.send(msgEmbed)];
                case 12:
                    _a.sent();
                    if (!message.deletable) return [3 /*break*/, 14];
                    return [4 /*yield*/, message.delete()];
                case 13:
                    _a.sent();
                    _a.label = 14;
                case 14: return [2 /*return*/, command.name];
                case 15:
                    if (!(whatAreWeDoing === 'enable')) return [3 /*break*/, 31];
                    isItFound = false;
                    x = 0;
                    _a.label = 16;
                case 16:
                    if (!(x < guildData.deletionChannels.length)) return [3 /*break*/, 25];
                    if (!(guildData.deletionChannels[x].channelID === currentDeletionChannel.channelID)) return [3 /*break*/, 24];
                    return [4 /*yield*/, message.reply('This channel has already been added! I will update your number of saved messages though!')];
                case 17:
                    _a.sent();
                    if (!(currentDeletionChannel.deletionMessageID
                        !== undefined && currentDeletionChannel.deletionMessageID !== '')) return [3 /*break*/, 23];
                    _a.label = 18;
                case 18:
                    _a.trys.push([18, 22, , 23]);
                    return [4 /*yield*/, message.channel.messages
                            .fetch(currentDeletionChannel.deletionMessageID)];
                case 19:
                    previousMessage = _a.sent();
                    if (!(previousMessage.deletable === true)) return [3 /*break*/, 21];
                    return [4 /*yield*/, previousMessage.delete()];
                case 20:
                    _a.sent();
                    _a.label = 21;
                case 21: return [3 /*break*/, 23];
                case 22:
                    error_1 = _a.sent();
                    if (error_1.message === 'Unknown Message') {
                        currentDeletionChannel.deletionMessageID = '';
                    }
                    return [3 /*break*/, 23];
                case 23:
                    guildData.deletionChannels[x] = currentDeletionChannel;
                    isItFound = true;
                    _a.label = 24;
                case 24:
                    x += 1;
                    return [3 /*break*/, 16];
                case 25:
                    msgString = "__**Messages beyond message number " + currentDeletionChannel.numberOfMessagesToSave + " are being purged, in this channel.**__";
                    messageEmbed = new Discord.MessageEmbed();
                    messageEmbed.setAuthor(message.author.username, message.author.avatarURL())
                        .setColor([0, 0, 255]).setDescription(msgString).setTimestamp(Date())
                        .setTitle('__**Enabled Channel Purging:**__');
                    return [4 /*yield*/, message.channel.send(messageEmbed)];
                case 26:
                    pinMessage = _a.sent();
                    return [4 /*yield*/, pinMessage.pin()];
                case 27:
                    _a.sent();
                    currentDeletionChannel.deletionMessageID = pinMessage.id;
                    if (isItFound === false) {
                        guildData.deletionChannels.push(currentDeletionChannel);
                    }
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 28:
                    _a.sent();
                    if (!message.deletable) return [3 /*break*/, 30];
                    return [4 /*yield*/, message.delete()];
                case 29:
                    _a.sent();
                    _a.label = 30;
                case 30: return [2 /*return*/, command.name];
                case 31:
                    if (!(whatAreWeDoing === 'disable')) return [3 /*break*/, 38];
                    isItFound = false;
                    deletionChannelIndex = Number();
                    for (x = 0; x < guildData.deletionChannels.length; x += 1) {
                        if (guildData.deletionChannels[x].channelID === currentDeletionChannel.channelID) {
                            isItFound = true;
                            deletionChannelIndex = x;
                            break;
                        }
                    }
                    if (!(isItFound === false)) return [3 /*break*/, 35];
                    return [4 /*yield*/, message.reply('Sorry, but this channel could not be found in the list of active deletion channels!')];
                case 32:
                    _a.sent();
                    if (!message.deletable) return [3 /*break*/, 34];
                    return [4 /*yield*/, message.delete()];
                case 33:
                    _a.sent();
                    _a.label = 34;
                case 34: return [2 /*return*/, command.name];
                case 35:
                    guildData.deletionChannels.splice(deletionChannelIndex, 1);
                    discordUser.updateGuildDataInDB(guildData);
                    msgString = "" + '\n------\n__**Channel Name:**__ <#' + currentDeletionChannel.channelID + ">\n------";
                    messageEmbed = new Discord.MessageEmbed();
                    messageEmbed.setAuthor(message.author.username, message.author.avatarURL())
                        .setColor([0, 0, 255]).setDescription(msgString).setTimestamp(Date())
                        .setTitle('__**Disabled Channel Purging:**__');
                    return [4 /*yield*/, message.channel.send(messageEmbed)];
                case 36:
                    _a.sent();
                    if (!message.deletable) return [3 /*break*/, 38];
                    return [4 /*yield*/, message.delete()];
                case 37:
                    _a.sent();
                    _a.label = 38;
                case 38: return [2 /*return*/, command.name];
                case 39:
                    error_2 = _a.sent();
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            reject(error_2);
                        })];
                case 40: return [2 /*return*/];
            }
        });
    });
}
exports.execute = execute;
command.function = execute;
exports.default = command;
