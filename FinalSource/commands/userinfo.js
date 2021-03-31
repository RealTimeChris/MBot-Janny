// userinfo.ts - Module for my user info command.
// Jan 29, 2021
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
command.name = 'userinfo';
command.description = '!userinfo to display your own info!\nOr !userinfo = @USERMENTION, to display the info of another user!';
/**
 * Displays info about a selected user.
 */
function execute(commandData, discordUser) {
    return __awaiter(this, void 0, void 0, function () {
        var commandReturnData, areWeInADM, userID, userMentionRegExp, userIDRegExp, msgString_1, argZero, userIDOne, guildMemberManager, guildMember, error_1, msgString_2, fields, field, field1, field2, field3, field4, field5, field6, permissionsArray, msgString, x, field7, field8, messageEmbed, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 12, , 13]);
                    commandReturnData = new DiscordStuff.CommandReturnData();
                    commandReturnData.commandName = command.name;
                    return [4 /*yield*/, DiscordStuff.areWeInADM(commandData)];
                case 1:
                    areWeInADM = _a.sent();
                    if (areWeInADM === true) {
                        return [2 /*return*/, commandReturnData];
                    }
                    userID = '';
                    userMentionRegExp = /.{2,3}\d{18}>/;
                    userIDRegExp = /\d{18}/;
                    if (!(commandData.args[0] === undefined)) return [3 /*break*/, 2];
                    userID = commandData.guildMember.id;
                    return [3 /*break*/, 5];
                case 2:
                    if (!(commandData.args[0].match(userIDRegExp)[0] === null
                        && commandData.args[0].match(userMentionRegExp)[0] === null)) return [3 /*break*/, 4];
                    msgString_1 = 'Please enter a valid user ID or user mention! (!displayuserinfo = @USERMENTION)';
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgString_1)];
                case 3:
                    _a.sent();
                    return [2 /*return*/, commandReturnData];
                case 4:
                    if (commandData.args[0].match(userMentionRegExp) != null) {
                        userID = commandData.args[0].substring(3, commandData.args[0].length - 1);
                    }
                    else if (commandData.args[0].match(userIDRegExp)[0] != null) {
                        argZero = commandData.args[0];
                        userIDOne = argZero.match(userIDRegExp)[0];
                        userID = userIDOne;
                    }
                    _a.label = 5;
                case 5:
                    guildMemberManager = new Discord.GuildMemberManager(commandData.guild);
                    guildMember = void 0;
                    _a.label = 6;
                case 6:
                    _a.trys.push([6, 8, , 10]);
                    return [4 /*yield*/, guildMemberManager.fetch(userID)];
                case 7:
                    guildMember = _a.sent();
                    return [3 /*break*/, 10];
                case 8:
                    error_1 = _a.sent();
                    msgString_2 = 'Sorry, but that user could not be found!';
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgString_2)];
                case 9:
                    _a.sent();
                    return [2 /*return*/, commandReturnData];
                case 10:
                    fields = [];
                    field = { name: '__User Tag:__', value: guildMember.user.tag, inline: true };
                    fields.push(field);
                    field1 = { name: '__User Name:__', value: guildMember.user.username, inline: true };
                    fields.push(field1);
                    field2 = { name: '__Display Name:__', value: guildMember.displayName, inline: true };
                    fields.push(field2);
                    field3 = { name: '__User ID:__', value: guildMember.id, inline: true };
                    fields.push(field3);
                    field4 = { name: '__Status:__', value: guildMember.presence.status, inline: true };
                    fields.push(field4);
                    field5 = { name: '__Joined:__', value: guildMember.joinedAt, inline: true };
                    fields.push(field5);
                    field6 = { name: '__Created At:__', value: guildMember.user.createdAt, inline: true };
                    fields.push(field6);
                    permissionsArray = guildMember.permissions.toArray();
                    msgString = String();
                    for (x = 0; x < permissionsArray.length; x += 1) {
                        if (permissionsArray[x].split('_')[2] !== undefined) {
                            msgString += "" + permissionsArray[x].split('_')[0].substr(0, 1) + permissionsArray[x]
                                .split('_')[0].substr(1).toLowerCase() + " " + permissionsArray[x]
                                .split('_')[1].substr(0, 1) + permissionsArray[x].split('_')[1].substr(1).toLowerCase() + " " + permissionsArray[x].split('_')[2]
                                .substr(0, 1) + permissionsArray[x].split('_')[2].substr(1).toLowerCase();
                        }
                        else if (permissionsArray[x].split('_')[1] !== undefined) {
                            msgString += "" + permissionsArray[x].split('_')[0].substr(0, 1) + permissionsArray[x].split('_')[0]
                                .substr(1).toLowerCase() + "\t" + permissionsArray[x]
                                .split('_')[1].substr(0, 1) + permissionsArray[x].split('_')[1].substr(1).toLowerCase();
                        }
                        else {
                            msgString += "" + permissionsArray[x].split('_')[0].substr(0, 1) + permissionsArray[x]
                                .split('_')[0].substr(1).toLowerCase();
                        }
                        if (x < permissionsArray.length - 1) {
                            msgString += ', ';
                        }
                    }
                    field7 = { name: '__Roles:__', value: "" + guildMember.roles.cache.array(), inline: false };
                    fields.push(field7);
                    field8 = { name: '__Permissions:__', value: msgString, inline: false };
                    fields.push(field8);
                    messageEmbed = new Discord.MessageEmbed();
                    messageEmbed
                        .setColor(guildMember.displayColor)
                        .setTimestamp(Date())
                        .setTitle('__**User Info:**__')
                        .setImage(guildMember.user.avatarURL())
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL());
                    messageEmbed.fields = fields;
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, messageEmbed)];
                case 11:
                    _a.sent();
                    return [2 /*return*/, commandReturnData];
                case 12:
                    error_2 = _a.sent();
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            reject(error_2);
                        })];
                case 13: return [2 /*return*/];
            }
        });
    });
}
exports.execute = execute;
command.function = execute;
exports.default = command;
