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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Discord = require("discord.js");
var GuildData_1 = __importDefault(require("../GuildData"));
var HelperFunctions_1 = __importDefault(require("../HelperFunctions"));
var command = {
    name: 'setdeletionstatus',
    description: 'Use this to enable/disable message deletion/pruning in a given channel.\nIn the desired channel, type !setdeletionstatus = ENABLE/DISABLE, AMOUNTOFMESSAGESTOSAVE,'
        + ' enter nothing for AMOUNTOFMESSAGESTOSAVE to save none!\nAlso simply enter !setdeletionstatus to view the current list of channels being purged on the current server!',
    function: Function()
};
function execute(commandData, discordUser) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function () {
        var commandReturnData, areWeInADM, doWeHaveAdminPerms, guildData, whatAreWeDoing, messageCountRegExp, howManyBack, msgString, msgEmbed, msg, msgString, msgEmbed, msg, currentDeletionChannel, msgString, x, currentChannel, msgEmbed, isItFound, deletionChannelIndex, x, msgString_1, msgEmbed, message, previousMessage, error_1, msgString, messageEmbed, pinMessage, isItFound, deletionChannelIndex, x, msgString_2, msgEmbed, msg, msgString, messageEmbed, error_2;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 31, , 32]);
                    commandReturnData = {
                        commandName: command.name
                    };
                    return [4 /*yield*/, HelperFunctions_1.default.areWeInADM(commandData)];
                case 1:
                    areWeInADM = _c.sent();
                    if (areWeInADM === true) {
                        return [2 /*return*/, commandReturnData];
                    }
                    return [4 /*yield*/, HelperFunctions_1.default.doWeHaveAdminPermission(commandData, discordUser)];
                case 2:
                    doWeHaveAdminPerms = _c.sent();
                    if (doWeHaveAdminPerms === false) {
                        return [2 /*return*/, commandReturnData];
                    }
                    guildData = new GuildData_1.default({ dataBase: discordUser.dataBase, id: commandData.guild.id, name: commandData.guild.name, memberCount: commandData.guild.memberCount });
                    return [4 /*yield*/, guildData.getFromDataBase()];
                case 3:
                    _c.sent();
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
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 5:
                    msg = _c.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 6:
                    _c.sent();
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
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 8:
                    msg = _c.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 9:
                    _c.sent();
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
                    _c.label = 11;
                case 11:
                    currentDeletionChannel = {
                        numberOfMessagesToSave: howManyBack,
                        channelID: commandData.fromTextChannel.id,
                        currentlyBeingDeleted: false,
                        deletionMessageID: ''
                    };
                    if (!(whatAreWeDoing === 'viewing')) return [3 /*break*/, 13];
                    msgString = '\n------\n';
                    if (guildData.deletionChannels.length > 0) {
                        for (x = 0; x < guildData.deletionChannels.length; x += 1) {
                            currentChannel = (_a = commandData.guild) === null || _a === void 0 ? void 0 : _a.channels.resolve((_b = guildData.deletionChannels[x]) === null || _b === void 0 ? void 0 : _b.channelID);
                            if (currentChannel === null) {
                                guildData.deletionChannels.splice(x, 1);
                                continue;
                            }
                            msgString += "__**Channel:**__ <#" + guildData.deletionChannels[x].channelID + ">, __**Messages To Save:**__ " +
                                (guildData.deletionChannels[x].numberOfMessagesToSave + "\n");
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
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 12:
                    _c.sent();
                    return [2 /*return*/, commandReturnData];
                case 13:
                    if (!(whatAreWeDoing === 'enable')) return [3 /*break*/, 24];
                    isItFound = false;
                    deletionChannelIndex = void 0;
                    for (x = 0; x < guildData.deletionChannels.length; x += 1) {
                        if (commandData.fromTextChannel.id === guildData.deletionChannels[x].channelID) {
                            currentDeletionChannel = guildData.deletionChannels[x];
                            currentDeletionChannel.currentlyBeingDeleted = false;
                            currentDeletionChannel.numberOfMessagesToSave = howManyBack;
                            isItFound = true;
                            deletionChannelIndex = x;
                        }
                    }
                    if (!(isItFound === true)) return [3 /*break*/, 20];
                    msgString_1 = '------\n**This channel has already been added! I will update your number of saved messages though!**\n------';
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString_1)
                        .setTimestamp(Date())
                        .setTitle('__**Channel Re-Added:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 14:
                    message = _c.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        message = new Discord.Message(commandData.guildMember.client, message, commandData.fromTextChannel);
                    }
                    message.delete({ timeout: 20000 });
                    _c.label = 15;
                case 15:
                    _c.trys.push([15, 19, , 20]);
                    return [4 /*yield*/, commandData.fromTextChannel.messages.fetch(currentDeletionChannel.deletionMessageID)];
                case 16:
                    previousMessage = _c.sent();
                    if (!(previousMessage.deletable === true)) return [3 /*break*/, 18];
                    return [4 /*yield*/, previousMessage.delete()];
                case 17:
                    _c.sent();
                    _c.label = 18;
                case 18: return [3 /*break*/, 20];
                case 19:
                    error_1 = _c.sent();
                    if (error_1.message === 'Unknown Message') {
                        currentDeletionChannel.deletionMessageID = '';
                    }
                    return [3 /*break*/, 20];
                case 20:
                    msgString = "__**Messages beyond message number " + currentDeletionChannel.numberOfMessagesToSave + " are being purged, in this channel.**__";
                    messageEmbed = new Discord.MessageEmbed();
                    messageEmbed
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Enabled Channel Purging:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, messageEmbed)];
                case 21:
                    pinMessage = _c.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        pinMessage = new Discord.Message(commandData.guildMember.client, pinMessage, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, pinMessage.pin()];
                case 22:
                    _c.sent();
                    currentDeletionChannel.deletionMessageID = pinMessage.id;
                    if (isItFound === true) {
                        guildData.deletionChannels[deletionChannelIndex] = currentDeletionChannel;
                    }
                    else {
                        guildData.deletionChannels.push(currentDeletionChannel);
                    }
                    return [4 /*yield*/, guildData.writeToDataBase()];
                case 23:
                    _c.sent();
                    return [2 /*return*/, commandReturnData];
                case 24:
                    if (!(whatAreWeDoing === 'disable')) return [3 /*break*/, 30];
                    isItFound = false;
                    deletionChannelIndex = void 0;
                    for (x = 0; x < guildData.deletionChannels.length; x += 1) {
                        if (commandData.fromTextChannel.id === guildData.deletionChannels[x].channelID) {
                            isItFound = true;
                            deletionChannelIndex = x;
                        }
                    }
                    if (!(isItFound === false)) return [3 /*break*/, 27];
                    msgString_2 = '------\n**Sorry, but this channel could not be found in the list of active deletion channels!**\n------';
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString_2)
                        .setTimestamp(Date())
                        .setTitle('__**Channel Issue:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 25:
                    msg = _c.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 26:
                    _c.sent();
                    return [2 /*return*/, commandReturnData];
                case 27:
                    guildData.deletionChannels.splice(deletionChannelIndex, 1);
                    return [4 /*yield*/, guildData.writeToDataBase()];
                case 28:
                    _c.sent();
                    msgString = "" + '\n------\n__**Channel Name:**__ <#' + currentDeletionChannel.channelID + ">\n------";
                    messageEmbed = new Discord.MessageEmbed();
                    messageEmbed
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Disabled Channel Purging:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, messageEmbed)];
                case 29:
                    _c.sent();
                    _c.label = 30;
                case 30: return [2 /*return*/, commandReturnData];
                case 31:
                    error_2 = _c.sent();
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            reject(error_2);
                        })];
                case 32: return [2 /*return*/];
            }
        });
    });
}
command.function = execute;
exports.default = command;
