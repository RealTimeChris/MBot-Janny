// setreplacementinvite.ts - Module for my "set replacement invite" command.
// Feb 22, 2021
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
command.name = 'setreplacementinvite';
command.description = '!setreplacementinvite = REPLACEMENTINVITELINK\nBe sure to call this from within the chosen server, before it gets nuked!';
function execute(commandData, discordUser) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function () {
        var commandReturnData, areWeInADM, doWeHaveAdminPerms, inviteRegExp, whatAreWeDoing, msgString, msgEmbed, msg, inviteLink, serverRecordKey, serverRecordObject, inviteLink2, msgString, messageEmbed, serverRecordKey, serverRecordObject, msgString, messageEmbed, error_1, msgString, msgEmbed, msg;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    commandReturnData = new DiscordStuff.CommandReturnData();
                    commandReturnData.commandName = command.name;
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 14, , 18]);
                    return [4 /*yield*/, DiscordStuff.areWeInADM(commandData)];
                case 2:
                    areWeInADM = _c.sent();
                    if (areWeInADM === true) {
                        return [2 /*return*/, commandReturnData];
                    }
                    return [4 /*yield*/, discordUser.doWeHaveAdminPermission(commandData)];
                case 3:
                    doWeHaveAdminPerms = _c.sent();
                    if (doWeHaveAdminPerms === false) {
                        return [2 /*return*/, commandReturnData];
                    }
                    inviteRegExp = /https:\/\/discord.gg\/\w{1,26}/;
                    whatAreWeDoing = '';
                    if (!(commandData.args[0] !== undefined && !inviteRegExp.test(commandData.args[0]))) return [3 /*break*/, 6];
                    msgString = '------\n**Please, enter a valid new server invite link! (!setreplacementinvite = REPLACEMENTINVITELINK)**\n------';
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor((_a = commandData.guildMember) === null || _a === void 0 ? void 0 : _a.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Missing Or Invalid Arguments:**__');
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 4:
                    msg = _c.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 5:
                    _c.sent();
                    return [2 /*return*/, commandReturnData];
                case 6:
                    if (commandData.args[0] === undefined) {
                        whatAreWeDoing = 'viewing';
                    }
                    else if (commandData.args[0] !== undefined && inviteRegExp.test(commandData.args[0])) {
                        whatAreWeDoing = 'adding';
                    }
                    inviteLink = commandData.args[0];
                    if (!(whatAreWeDoing === 'viewing')) return [3 /*break*/, 9];
                    serverRecordKey = commandData.guild.id + " + Record";
                    return [4 /*yield*/, discordUser.dataBase.get(serverRecordKey)];
                case 7:
                    serverRecordObject = _c.sent();
                    inviteLink2 = serverRecordObject.replacementServerInvite;
                    msgString = '\n------\n';
                    if (inviteLink === '') {
                        msgString += "__There's no link to display, currently!__\n------";
                    }
                    else {
                        msgString += "__**Link:**__ " + inviteLink2 + "\n------";
                    }
                    messageEmbed = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setTimestamp(Date())
                        .setTitle('__**Replacement Invite Link:**__')
                        .setDescription(msgString);
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, messageEmbed)];
                case 8:
                    _c.sent();
                    return [2 /*return*/, commandReturnData];
                case 9:
                    if (!(whatAreWeDoing === 'adding')) return [3 /*break*/, 13];
                    serverRecordKey = commandData.guild.id + " + Record";
                    return [4 /*yield*/, discordUser.dataBase.get(serverRecordKey)];
                case 10:
                    serverRecordObject = _c.sent();
                    serverRecordObject.replacementServerInvite = inviteLink;
                    console.log(serverRecordObject);
                    return [4 /*yield*/, discordUser.dataBase.put(serverRecordKey, serverRecordObject)];
                case 11:
                    _c.sent();
                    msgString = "Great! You've updated the guild " + serverRecordObject.serverName + "'s replacement invite link!"
                        + ("\n------\n__**Link:**__ " + serverRecordObject.replacementServerInvite + "\n------");
                    messageEmbed = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([0, 0, 254])
                        .setTimestamp(Date())
                        .setTitle('__**Replacement Invite Link Updated:**__')
                        .setDescription(msgString);
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, messageEmbed)];
                case 12:
                    _c.sent();
                    return [2 /*return*/, commandReturnData];
                case 13: return [2 /*return*/, commandReturnData];
                case 14:
                    error_1 = _c.sent();
                    if (!(error_1.type === 'NotFoundError')) return [3 /*break*/, 17];
                    msgString = '------\n**Sorry, but your current guild could not be found!**\n------';
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor((_b = commandData.guildMember) === null || _b === void 0 ? void 0 : _b.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Server Issue:**__');
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 15:
                    msg = _c.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 16:
                    _c.sent();
                    return [2 /*return*/, commandReturnData];
                case 17: return [2 /*return*/, new Promise(function (resolve, reject) {
                        reject(error_1);
                    })];
                case 18: return [2 /*return*/];
            }
        });
    });
}
exports.execute = execute;
command.function = execute;
exports.default = command;
