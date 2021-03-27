// timedmessages.ts - Module for my "timed messages" command.
// Mar 13, 2021
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
command.name = 'timedmessages';
command.description = "__**Timed Messages Usage:**__ !timedmessages to view the server's current timed messages.\n"
    + '!timedmessages = ADD, MESSAGENAME, MSBETWEENSENDS, MESSAGECONTENT to add a new message.\nAnd !timedmessages = REMOVE, MESSAGENAME, to remove a timed message!';
function execute(message, args, discordUser) {
    return __awaiter(this, void 0, void 0, function () {
        var areWeInADM, doWeHaveAdminPerms, guildData, whatAreWeDoing, messageName, msBetweenSends, messageContent, argOne, argThreee, argOne, embedFields, x, msPerSecond, secondPerMinute, msPerMinute, minutePerHour, msPerHour, timeRemaining, hoursRemaining, minutesRemaining, secondsRemaining, currentField, currentField, msgEmbed, newTimedMessage, msgEmbed, msgString, isItFound, currentTimedMessageName, x, msgEmbed, msgString, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 27, , 28]);
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
                    return [4 /*yield*/, discordUser.getGuildDataFromDB(message.guild)];
                case 3:
                    guildData = _a.sent();
                    whatAreWeDoing = String('');
                    messageName = String('');
                    msBetweenSends = Number();
                    messageContent = String('');
                    if (!(args[0] === undefined)) return [3 /*break*/, 4];
                    whatAreWeDoing = 'viewing';
                    return [3 /*break*/, 9];
                case 4:
                    if (!(args[0].toLowerCase() === 'add')) return [3 /*break*/, 5];
                    whatAreWeDoing = 'adding';
                    argOne = args[1];
                    messageName = argOne;
                    msBetweenSends = Math.abs(parseInt(args[2], 10));
                    argThreee = args[3];
                    messageContent = argThreee;
                    return [3 /*break*/, 9];
                case 5:
                    if (!(args[0].toLowerCase() === 'remove')) return [3 /*break*/, 6];
                    whatAreWeDoing = 'removing';
                    argOne = args[1];
                    messageName = argOne;
                    return [3 /*break*/, 9];
                case 6: return [4 /*yield*/, message.reply('Please, enter a proper first argument or enter none at all!')];
                case 7:
                    _a.sent();
                    return [4 /*yield*/, message.delete()];
                case 8:
                    _a.sent();
                    return [2 /*return*/, command.name];
                case 9:
                    if (!(whatAreWeDoing === 'viewing')) return [3 /*break*/, 12];
                    embedFields = [];
                    for (x = 0; x < guildData.timedMessages.length; x += 1) {
                        msPerSecond = 1000;
                        secondPerMinute = 60;
                        msPerMinute = msPerSecond * secondPerMinute;
                        minutePerHour = 60;
                        msPerHour = msPerMinute * minutePerHour;
                        timeRemaining = guildData.timedMessages[x]
                            .msBetweenSends - (new Date().getTime() - guildData.timedMessages[x].timeOfLastSend);
                        hoursRemaining = Math.trunc(timeRemaining / msPerHour);
                        minutesRemaining = Math.trunc((timeRemaining % msPerHour) / msPerMinute);
                        secondsRemaining = Math.trunc(((timeRemaining % msPerHour)
                            % msPerMinute) / msPerSecond);
                        currentField = { name: "__**" + guildData.timedMessages[x].name + ":**__", value: "__**ms Between Sends:**__ " + guildData.timedMessages[x].msBetweenSends + "\n", inline: true };
                        currentField.value += "__**In Channel:**__ <#" + guildData.timedMessages[x].textChannelID + ">\n";
                        currentField.value += "__**Content:**__ " + guildData.timedMessages[x].messageContent + "\n";
                        currentField.value += "__**Time Until Next Send:**__ " + hoursRemaining + " Hours, " + minutesRemaining + " Minutes, and " + secondsRemaining + " Seconds.";
                        embedFields.push(currentField);
                    }
                    if (guildData.timedMessages.length === 0) {
                        currentField = { name: '__**Empty:**__', value: 'Sorry, but there are no timed messages!', inline: true };
                        embedFields.push(currentField);
                    }
                    msgEmbed = new Discord.MessageEmbed();
                    msgEmbed.setAuthor(message.author.username, message.author.avatarURL()).setColor([0, 0, 255])
                        .setTimestamp(Date()).setTitle('__**Timed Messages:**__');
                    msgEmbed.fields = embedFields;
                    return [4 /*yield*/, message.channel.send(msgEmbed)];
                case 10:
                    _a.sent();
                    return [4 /*yield*/, message.delete()];
                case 11:
                    _a.sent();
                    return [2 /*return*/, command.name];
                case 12:
                    if (!(whatAreWeDoing === 'adding')) return [3 /*break*/, 16];
                    newTimedMessage = new DiscordStuff.TimedMessage();
                    newTimedMessage.name = messageName;
                    newTimedMessage.msBetweenSends = msBetweenSends;
                    newTimedMessage.textChannelID = message.channel.id;
                    newTimedMessage.timeOfLastSend = 0;
                    newTimedMessage.messageContent = messageContent;
                    guildData.timedMessages.push(newTimedMessage);
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 13:
                    _a.sent();
                    msgEmbed = new Discord.MessageEmbed();
                    msgString = String('');
                    msgString = "Congrats, you've just added a new timed message to your server! It is as follows:\n------\n";
                    msgString += "__**Name:**__ " + newTimedMessage.name + "\n";
                    msgString += "__**ms Between Sends:**__ " + newTimedMessage.msBetweenSends + "\n";
                    msgString += "__**In Channel:**__ <#" + newTimedMessage.textChannelID + ">\n";
                    msgString += "__**Content:**__ " + newTimedMessage.messageContent + "\n------";
                    msgEmbed.setAuthor(message.author.username, message.author.avatarURL()).setColor([0, 0, 255])
                        .setTimestamp(Date()).setTitle('__**Timed Message Added:**__')
                        .setDescription(msgString);
                    return [4 /*yield*/, message.channel.send(msgEmbed)];
                case 14:
                    _a.sent();
                    return [4 /*yield*/, message.delete()];
                case 15:
                    _a.sent();
                    return [2 /*return*/, command.name];
                case 16:
                    if (!(whatAreWeDoing === 'removing')) return [3 /*break*/, 26];
                    isItFound = false;
                    currentTimedMessageName = String('');
                    x = 0;
                    _a.label = 17;
                case 17:
                    if (!(x < guildData.timedMessages.length)) return [3 /*break*/, 20];
                    if (!(messageName === guildData.timedMessages[x].name)) return [3 /*break*/, 19];
                    isItFound = true;
                    currentTimedMessageName = guildData.timedMessages[x].name;
                    guildData.timedMessages.splice(x, 1);
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 18:
                    _a.sent();
                    return [3 /*break*/, 20];
                case 19:
                    x += 1;
                    return [3 /*break*/, 17];
                case 20:
                    if (!(isItFound === false)) return [3 /*break*/, 23];
                    return [4 /*yield*/, message.reply('Sorry, but the timed message you requested could not be found!')];
                case 21:
                    _a.sent();
                    return [4 /*yield*/, message.delete()];
                case 22:
                    _a.sent();
                    return [2 /*return*/, command.name];
                case 23:
                    msgEmbed = new Discord.MessageEmbed();
                    msgString = String('');
                    msgString = "You've just removed a timed message from your server! It is as follows:\n------\n__**Name:**__ " + currentTimedMessageName + "\n------";
                    msgEmbed.setAuthor(message.author.username, message.author.avatarURL()).setColor([0, 0, 255])
                        .setTimestamp(Date()).setTitle('__**Timed Message Removed:**__')
                        .setDescription(msgString);
                    return [4 /*yield*/, message.channel.send(msgEmbed)];
                case 24:
                    _a.sent();
                    return [4 /*yield*/, message.delete()];
                case 25:
                    _a.sent();
                    return [2 /*return*/, command.name];
                case 26: return [2 /*return*/, command.name];
                case 27:
                    error_1 = _a.sent();
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            reject(error_1);
                        })];
                case 28: return [2 /*return*/];
            }
        });
    });
}
exports.execute = execute;
command.function = execute;
exports.default = command;
