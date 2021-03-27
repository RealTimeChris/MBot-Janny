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
var Discord = require("discord.js");
var DiscordStuff = require("../DiscordStuff");
var command = new DiscordStuff.BotCommand();
command.name = 'setreplacementinvite';
command.description = '!setreplacementinvite = REPLACEMENTINVITELINK\nBe sure to call this from within the chosen server, before it gets nuked!';
function execute(message, args, discordUser) {
    return __awaiter(this, void 0, void 0, function () {
        var areWeInADM, doWeHaveAdminPerms, inviteRegExp, whatAreWeDoing, inviteLink, serverRecordKey, serverRecordString, serverRecordObject, inviteLink2, msgString, messageEmbed, serverRecordKey, serverRecordString, serverRecordObject, msgString, messageEmbed, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 15, , 19]);
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
                    inviteRegExp = /https:\/\/discord.gg\/\w{1,26}/;
                    whatAreWeDoing = String('');
                    if (!(args[0] !== undefined && !inviteRegExp.test(args[0]))) return [3 /*break*/, 5];
                    return [4 /*yield*/, message.reply('Please, enter a valid new server invite link! (!setreplacementinvite = REPLACEMENTINVITELINK)')];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, message.delete()];
                case 4:
                    _a.sent();
                    return [2 /*return*/, command.name];
                case 5:
                    if (args[0] === undefined) {
                        whatAreWeDoing = 'viewing';
                    }
                    else if (args[0] !== undefined && inviteRegExp.test(args[0])) {
                        whatAreWeDoing = 'adding';
                    }
                    inviteLink = args[0];
                    if (!(whatAreWeDoing === 'viewing')) return [3 /*break*/, 9];
                    serverRecordKey = message.guild.id + " + Record";
                    return [4 /*yield*/, discordUser.dataBase.get(serverRecordKey)];
                case 6:
                    serverRecordString = _a.sent();
                    serverRecordObject = JSON.parse(serverRecordString);
                    inviteLink2 = serverRecordObject.replacementServerInvite;
                    msgString = '\n------\n';
                    if (inviteLink === '') {
                        msgString += "__There's no link to display, currently!__\n------";
                    }
                    else {
                        msgString += "__**Link:**__ " + inviteLink2 + "\n------";
                    }
                    messageEmbed = new Discord.MessageEmbed().setAuthor(message.author.username, message.author.avatarURL()).setColor([0, 0, 255]).setTimestamp(Date())
                        .setTitle('__**Replacement Invite Link:**__')
                        .setDescription(msgString);
                    return [4 /*yield*/, message.channel.send(messageEmbed)];
                case 7:
                    _a.sent();
                    return [4 /*yield*/, message.delete()];
                case 8:
                    _a.sent();
                    return [2 /*return*/, command.name];
                case 9:
                    if (!(whatAreWeDoing === 'adding')) return [3 /*break*/, 14];
                    serverRecordKey = message.guild.id + " + Record";
                    return [4 /*yield*/, discordUser.dataBase.get(serverRecordKey)];
                case 10:
                    serverRecordString = _a.sent();
                    serverRecordObject = JSON.parse(serverRecordString);
                    serverRecordObject.replacementServerInvite = inviteLink;
                    console.log(serverRecordObject);
                    serverRecordString = JSON.stringify(serverRecordObject);
                    return [4 /*yield*/, discordUser.dataBase.put(serverRecordKey, serverRecordString)];
                case 11:
                    _a.sent();
                    msgString = "Great! You've updated the guild " + serverRecordObject.serverName + "'s replacement invite link!"
                        + ("\n------\n__**Link:**__ " + serverRecordObject.replacementServerInvite + "\n------");
                    messageEmbed = new Discord.MessageEmbed().setAuthor(message.author.username, message.author.avatarURL()).setColor([0, 0, 254]).setTimestamp(Date())
                        .setTitle('__**Replacement Invite Link Updated:**__')
                        .setDescription(msgString);
                    return [4 /*yield*/, message.channel.send(messageEmbed)];
                case 12:
                    _a.sent();
                    return [4 /*yield*/, message.delete()];
                case 13:
                    _a.sent();
                    return [2 /*return*/, command.name];
                case 14: return [2 /*return*/, command.name];
                case 15:
                    error_1 = _a.sent();
                    if (!(error_1.type === 'NotFoundError')) return [3 /*break*/, 18];
                    return [4 /*yield*/, message.reply('Sorry, but your current guild could not be found!')];
                case 16:
                    _a.sent();
                    return [4 /*yield*/, message.delete()];
                case 17:
                    _a.sent();
                    return [2 /*return*/, command.name];
                case 18: return [2 /*return*/, new Promise(function (resolve, reject) {
                        reject(error_1);
                    })];
                case 19: return [2 /*return*/];
            }
        });
    });
}
command.function = execute;
exports.default = command;
