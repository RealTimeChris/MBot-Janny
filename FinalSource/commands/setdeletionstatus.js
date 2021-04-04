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
var Discord = require("discord.js");
var DiscordStuff = require("../DiscordStuff");
var command = new DiscordStuff.BotCommand();
command.name = 'setdeletionstatus';
command.description = 'Use this to enable/disable message deletion/pruning in a given channel.\nIn the desired channel, type !setdeletionstatus = ENABLE/DISABLE, AMOUNTOFMESSAGESTOSAVE,'
    + ' enter nothing for AMOUNTOFMESSAGESTOSAVE to save none!\nAlso simply enter !setdeletionstatus to view the current list of channels being purged on the current server!';
function execute(commandData, discordUser) {
    return __awaiter(this, void 0, void 0, function () {
        var commandReturnData, areWeInADM, doWeHaveAdminPerms, guildData, whatAreWeDoing, messageCountRegExp, howManyBack, msgString, msgEmbed, msg, msgString, msgEmbed, msg, currentDeletionChannel, isItFound, x, msgString, x, msgEmbed, x, msgString_1, msgEmbed, previousMessage, error_1, msgString, messageEmbed, pinMessage, _a, _b, _c, deletionChannelIndex, x, msgString_2, msgEmbed, msg, msgString, messageEmbed, error_2;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _d.trys.push([0, 35, , 36]);
                    commandReturnData = new DiscordStuff.CommandReturnData();
                    commandReturnData.commandName = command.name;
                    return [4 /*yield*/, DiscordStuff.areWeInADM(commandData)];
                case 1:
                    areWeInADM = _d.sent();
                    if (areWeInADM === true) {
                        return [2 /*return*/, commandReturnData];
                    }
                    return [4 /*yield*/, discordUser.doWeHaveAdminPermission(commandData)];
                case 2:
                    doWeHaveAdminPerms = _d.sent();
                    if (doWeHaveAdminPerms === false) {
                        return [2 /*return*/, commandReturnData];
                    }
                    return [4 /*yield*/, discordUser.getGuildDataFromDB(commandData.guild)];
                case 3:
                    guildData = _d.sent();
                    whatAreWeDoing = '';
                    messageCountRegExp = /\d{1,18}/;
                    howManyBack = 0;
                    if (!(commandData.args[0] === undefined)) return [3 /*break*/, 4];
                    whatAreWeDoing = 'viewing';
                    return [3 /*break*/, 11];
                case 4:
                    if (!(commandData.args[0] !== undefined && commandData.args[0].toLowerCase() !== 'enable' && commandData.args[0].toLowerCase() !== 'disable')) return [3 /*break*/, 7];
                    msgString = "------\n**Please enter either 'enable' or 'disable'! (!setdeletionstatus = ENABLE/DISABLE, AMOUNTOFMESSAGESTOSAVE, or just !setdeletionstatus = ENABLE/DISABLE)**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Missing Or Invalid Arguments:**__');
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 5:
                    msg = _d.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 6:
                    _d.sent();
                    return [2 /*return*/, commandReturnData];
                case 7:
                    if (!(commandData.args[0].toLowerCase() === 'enable' && commandData.args[1] !== undefined && (!messageCountRegExp.test(commandData.args[1]) || parseInt(commandData.args[1], 10) < 0 || parseInt(commandData.args[1], 10) > 10000))) return [3 /*break*/, 10];
                    msgString = '------\n**Please enter a valid number of messages back to save! (0 to 10000) (!setdeletionstatus = ENABLE/DISABLE, AMOUNTOFMESSAGESTOSAVE, or just !setdeletionstatus = ENABLE/DISABLE)**\n------';
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Missing Or Invalid Arguments:**__');
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 8:
                    msg = _d.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 9:
                    _d.sent();
                    return [2 /*return*/, commandReturnData];
                case 10:
                    if (commandData.args[1] !== undefined) {
                        whatAreWeDoing = commandData.args[0].toLowerCase();
                        howManyBack = parseInt(commandData.args[1].toString().match(messageCountRegExp)[0], 10);
                    }
                    else if (commandData.args[1] === undefined) {
                        whatAreWeDoing = commandData.args[0].toLowerCase();
                        howManyBack = 0;
                    }
                    _d.label = 11;
                case 11:
                    currentDeletionChannel = new DiscordStuff.DeletionChannel();
                    isItFound = false;
                    for (x = 0; x < guildData.deletionChannels.length; x += 1) {
                        if (commandData.permsChannel.id === guildData.deletionChannels[x].channelID) {
                            currentDeletionChannel = guildData.deletionChannels[x];
                            isItFound = true;
                        }
                    }
                    if (isItFound === false) {
                        currentDeletionChannel.numberOfMessagesToSave = howManyBack;
                        currentDeletionChannel.channelID = commandData.permsChannel.id;
                        currentDeletionChannel.timeOfLastPurge = 0;
                        currentDeletionChannel.currentlyBeingDeleted = false;
                    }
                    if (whatAreWeDoing !== 'viewing') {
                        currentDeletionChannel.numberOfMessagesToSave = howManyBack;
                    }
                    if (!(whatAreWeDoing === 'viewing')) return [3 /*break*/, 13];
                    msgString = '';
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
                    msgEmbed
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Current Deletion Channels:**__');
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 12:
                    _d.sent();
                    return [2 /*return*/, commandReturnData];
                case 13:
                    if (!(whatAreWeDoing === 'enable')) return [3 /*break*/, 29];
                    isItFound = false;
                    x = 0;
                    _d.label = 14;
                case 14:
                    if (!(x < guildData.deletionChannels.length)) return [3 /*break*/, 23];
                    if (!(guildData.deletionChannels[x].channelID === currentDeletionChannel.channelID)) return [3 /*break*/, 22];
                    msgString_1 = '------\n**This channel has already been added! I will update your number of saved messages though!**\n------';
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString_1)
                        .setTimestamp(Date())
                        .setTitle('__**Channel Re-Added:**__');
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 15:
                    _d.sent();
                    if (!(currentDeletionChannel.deletionMessageID
                        !== undefined && currentDeletionChannel.deletionMessageID !== '')) return [3 /*break*/, 21];
                    _d.label = 16;
                case 16:
                    _d.trys.push([16, 20, , 21]);
                    return [4 /*yield*/, commandData.fromTextChannel.messages
                            .fetch(currentDeletionChannel.deletionMessageID)];
                case 17:
                    previousMessage = _d.sent();
                    if (!(previousMessage.deletable === true)) return [3 /*break*/, 19];
                    return [4 /*yield*/, previousMessage.delete()];
                case 18:
                    _d.sent();
                    _d.label = 19;
                case 19: return [3 /*break*/, 21];
                case 20:
                    error_1 = _d.sent();
                    if (error_1.message === 'Unknown Message') {
                        currentDeletionChannel.deletionMessageID = '';
                    }
                    return [3 /*break*/, 21];
                case 21:
                    guildData.deletionChannels[x] = currentDeletionChannel;
                    isItFound = true;
                    _d.label = 22;
                case 22:
                    x += 1;
                    return [3 /*break*/, 14];
                case 23:
                    msgString = "__**Messages beyond message number " + currentDeletionChannel.numberOfMessagesToSave + " are being purged, in this channel.**__";
                    messageEmbed = new Discord.MessageEmbed();
                    messageEmbed
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Enabled Channel Purging:**__');
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, messageEmbed)];
                case 24:
                    pinMessage = _d.sent();
                    if (!(commandData.toTextChannel instanceof Discord.WebhookClient)) return [3 /*break*/, 26];
                    _b = (_a = Discord.Message).bind;
                    _c = [void 0, commandData.guildMember.client];
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, messageEmbed)];
                case 25:
                    pinMessage = new (_b.apply(_a, _c.concat([_d.sent(), commandData.fromTextChannel])))();
                    _d.label = 26;
                case 26: return [4 /*yield*/, pinMessage.pin()];
                case 27:
                    _d.sent();
                    currentDeletionChannel.deletionMessageID = pinMessage.id;
                    if (isItFound === false) {
                        guildData.deletionChannels.push(currentDeletionChannel);
                    }
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 28:
                    _d.sent();
                    return [2 /*return*/, commandReturnData];
                case 29:
                    if (!(whatAreWeDoing === 'disable')) return [3 /*break*/, 34];
                    isItFound = false;
                    deletionChannelIndex = 0;
                    for (x = 0; x < guildData.deletionChannels.length; x += 1) {
                        if (guildData.deletionChannels[x].channelID === currentDeletionChannel.channelID) {
                            isItFound = true;
                            deletionChannelIndex = x;
                            break;
                        }
                    }
                    if (!(isItFound === false)) return [3 /*break*/, 32];
                    msgString_2 = '------\n**Sorry, but this channel could not be found in the list of active deletion channels!**\n------';
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString_2)
                        .setTimestamp(Date())
                        .setTitle('__**Channel Issue:**__');
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 30:
                    msg = _d.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 31:
                    _d.sent();
                    return [2 /*return*/, commandReturnData];
                case 32:
                    guildData.deletionChannels.splice(deletionChannelIndex, 1);
                    discordUser.updateGuildDataInDB(guildData);
                    msgString = "" + '\n------\n__**Channel Name:**__ <#' + currentDeletionChannel.channelID + ">\n------";
                    messageEmbed = new Discord.MessageEmbed();
                    messageEmbed
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Disabled Channel Purging:**__');
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, messageEmbed)];
                case 33:
                    _d.sent();
                    _d.label = 34;
                case 34: return [2 /*return*/, commandReturnData];
                case 35:
                    error_2 = _d.sent();
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            reject(error_2);
                        })];
                case 36: return [2 /*return*/];
            }
        });
    });
}
command.function = execute;
exports.default = command;
