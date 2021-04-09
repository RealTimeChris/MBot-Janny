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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Discord = require("discord.js");
var GuildData_1 = __importDefault(require("../GuildData"));
var HelperFunctions_1 = __importDefault(require("../HelperFunctions"));
var command = {
    name: 'setreplacementinvite',
    description: '!setreplacementinvite = REPLACEMENTINVITELINK\nBe sure to call this from within the chosen server, before it gets nuked!',
    function: Function()
};
function execute(commandData, discordUser) {
    return __awaiter(this, void 0, void 0, function () {
        var commandReturnData, areWeInADM, doWeHaveAdminPerms, guildData, guildData_1, error_1, msgString, msgEmbed, msg, inviteRegExp, whatAreWeDoing, msgString, msgEmbed, msg, inviteLink, serverRecordKey, serverRecordObject, inviteLink2, msgString, messageEmbed, serverRecordKey, serverRecordObject, msgString, messageEmbed, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    commandReturnData = {
                        commandName: command.name
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 21, , 22]);
                    return [4 /*yield*/, HelperFunctions_1.default.areWeInADM(commandData)];
                case 2:
                    areWeInADM = _a.sent();
                    if (areWeInADM === true) {
                        return [2 /*return*/, commandReturnData];
                    }
                    return [4 /*yield*/, HelperFunctions_1.default.doWeHaveAdminPermission(commandData, discordUser)];
                case 3:
                    doWeHaveAdminPerms = _a.sent();
                    if (doWeHaveAdminPerms === false) {
                        return [2 /*return*/, commandReturnData];
                    }
                    guildData = void 0;
                    _a.label = 4;
                case 4:
                    _a.trys.push([4, 6, , 10]);
                    guildData_1 = new GuildData_1.default({ dataBase: discordUser.dataBase, id: commandData.guild.id, name: commandData.guild.name, memberCount: commandData.guild.memberCount });
                    return [4 /*yield*/, guildData_1.getFromDataBase()];
                case 5:
                    _a.sent();
                    return [3 /*break*/, 10];
                case 6:
                    error_1 = _a.sent();
                    if (!(error_1.type === 'NotFoundError')) return [3 /*break*/, 9];
                    msgString = '------\n**Sorry, but your current guild could not be found!**\n------';
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Server Issue:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 7:
                    msg = _a.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 8:
                    _a.sent();
                    return [2 /*return*/, commandReturnData];
                case 9: return [3 /*break*/, 10];
                case 10:
                    inviteRegExp = /https:\/\/discord.gg\/\w{1,26}/;
                    whatAreWeDoing = '';
                    if (!(commandData.args[0] !== undefined && !inviteRegExp.test(commandData.args[0]))) return [3 /*break*/, 13];
                    msgString = '------\n**Please, enter a valid new server invite link! (!setreplacementinvite = REPLACEMENTINVITELINK)**\n------';
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Missing Or Invalid Arguments:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
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
                    if (commandData.args[0] === undefined) {
                        whatAreWeDoing = 'viewing';
                    }
                    else if (commandData.args[0] !== undefined && inviteRegExp.test(commandData.args[0])) {
                        whatAreWeDoing = 'adding';
                    }
                    inviteLink = commandData.args[0];
                    if (!(whatAreWeDoing === 'viewing')) return [3 /*break*/, 16];
                    serverRecordKey = commandData.guild.id + " + Record";
                    return [4 /*yield*/, discordUser.dataBase.get(serverRecordKey)];
                case 14:
                    serverRecordObject = _a.sent();
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
                        .setColor(guildData.borderColor)
                        .setTimestamp(Date())
                        .setTitle('__**Replacement Invite Link:**__')
                        .setDescription(msgString);
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, messageEmbed)];
                case 15:
                    _a.sent();
                    return [2 /*return*/, commandReturnData];
                case 16:
                    if (!(whatAreWeDoing === 'adding')) return [3 /*break*/, 20];
                    serverRecordKey = commandData.guild.id + " + Record";
                    return [4 /*yield*/, discordUser.dataBase.get(serverRecordKey)];
                case 17:
                    serverRecordObject = _a.sent();
                    serverRecordObject.replacementServerInvite = inviteLink;
                    console.log(serverRecordObject);
                    return [4 /*yield*/, discordUser.dataBase.put(serverRecordKey, serverRecordObject)];
                case 18:
                    _a.sent();
                    msgString = "Great! You've updated the guild " + serverRecordObject.serverName + "'s replacement invite link!"
                        + ("\n------\n__**Link:**__ " + serverRecordObject.replacementServerInvite + "\n------");
                    messageEmbed = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setTimestamp(Date())
                        .setTitle('__**Replacement Invite Link Updated:**__')
                        .setDescription(msgString);
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, messageEmbed)];
                case 19:
                    _a.sent();
                    return [2 /*return*/, commandReturnData];
                case 20: return [2 /*return*/, commandReturnData];
                case 21:
                    error_2 = _a.sent();
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            reject(error_2);
                        })];
                case 22: return [2 /*return*/];
            }
        });
    });
}
command.function = execute;
exports.default = command;
