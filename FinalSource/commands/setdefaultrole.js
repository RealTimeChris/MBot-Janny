// setdefaultrole.ts - Module for my "set default role" command.
// Feb 24, 2021
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
command.name = 'setdefaultrole';
command.description = 'Just enter !setdefaultrole to view the current list of default roles!\nEnter !setdefaultrole = ADD, ROLENAME, to add a '
    + 'role as a default for when someone new joins the server.\n!setdefaultrole = REMOVE, ROLENAME to remove a role from the list.';
function execute(commandData, discordUser) {
    return __awaiter(this, void 0, void 0, function () {
        var commandReturnData, areWeInADM, doWeHaveAdminPerms, whatAreWeDoing, msgString, msgString, roleName_1, guildData_1, roleArray_1, _loop_1, x, msgString_1, messageEmbed, currentRole_1, isItFound_1, msgString, x, msgString_2, msgString, messageEmbed, x, msgString_3, msgString, messageEmbed, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 29, , 30]);
                    commandReturnData = new DiscordStuff.CommandReturnData();
                    commandReturnData.commandName = command.name;
                    return [4 /*yield*/, DiscordStuff.areWeInADM(commandData)];
                case 1:
                    areWeInADM = _a.sent();
                    if (areWeInADM === true) {
                        return [2 /*return*/, commandReturnData];
                    }
                    return [4 /*yield*/, discordUser.doWeHaveAdminPermission(commandData)];
                case 2:
                    doWeHaveAdminPerms = _a.sent();
                    if (doWeHaveAdminPerms === false) {
                        return [2 /*return*/, commandReturnData];
                    }
                    whatAreWeDoing = '';
                    if (!(commandData.args[0] === undefined)) return [3 /*break*/, 3];
                    whatAreWeDoing = 'view';
                    return [3 /*break*/, 8];
                case 3:
                    if (!(commandData.args[0] !== undefined && commandData.args[0].toLowerCase() !== 'add' && commandData.args[0].toLowerCase() !== 'remove')) return [3 /*break*/, 5];
                    msgString = "Please, only enter either 'add' or 'remove' as a first argument! (!setdefaultrole = ADDorREMOVE, ROLENAME, or just !setdefaultrol)";
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgString)];
                case 4:
                    _a.sent();
                    return [2 /*return*/, commandReturnData];
                case 5:
                    if (!(commandData.args[1] === undefined)) return [3 /*break*/, 7];
                    msgString = 'Please, enter the name of a server role! (!setdefaultrole = ADDorREMOVE, ROLENAME, or just !setdefaultrol)';
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgString)];
                case 6:
                    _a.sent();
                    return [2 /*return*/, commandReturnData];
                case 7:
                    if (commandData.args[0].toLowerCase() === 'add') {
                        whatAreWeDoing = 'add';
                    }
                    else if (commandData.args[0].toLowerCase() === 'remove') {
                        whatAreWeDoing = 'remove';
                    }
                    _a.label = 8;
                case 8:
                    roleName_1 = commandData.args[1];
                    return [4 /*yield*/, discordUser.getGuildDataFromDB(commandData.guild)];
                case 9:
                    guildData_1 = _a.sent();
                    roleArray_1 = commandData.guild.roles.cache.array().sort();
                    _loop_1 = function (x) {
                        var isItFoundReal = roleArray_1.map(function (role) {
                            var isItFound = false;
                            if (role.id === guildData_1.defaultRoleIDs[x]) {
                                isItFound = true;
                                return isItFound;
                            }
                            return isItFound;
                        });
                        var isItFoundFinal = false;
                        for (var y = 0; y < isItFoundReal.length; y += 1) {
                            if (isItFoundReal[y] === true) {
                                isItFoundFinal = true;
                            }
                        }
                        if (isItFoundFinal === false) {
                            console.log('Removing a missing guild role from the list of defaults.');
                            guildData_1.defaultRoleIDs.splice(x, 1);
                            discordUser.updateGuildDataInDB(guildData_1);
                        }
                    };
                    for (x = 0; x < guildData_1.defaultRoleIDs.length; x += 1) {
                        _loop_1(x);
                    }
                    if (!(whatAreWeDoing === 'view')) return [3 /*break*/, 11];
                    msgString_1 = '';
                    if (guildData_1.defaultRoleIDs.length > 0) {
                        msgString_1 = '\n------\n';
                        guildData_1.defaultRoleIDs.map(function (roleID) {
                            roleArray_1.map(function (role) {
                                if (roleID === role.id) {
                                    msgString_1 += "<@&" + role.id + ">\n";
                                }
                                return role;
                            });
                            return roleID;
                        });
                        msgString_1 += '------';
                    }
                    else {
                        msgString_1 = "------\n__You don't have any default roles!__\n------";
                    }
                    messageEmbed = new Discord.MessageEmbed();
                    messageEmbed
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setTitle('__**Default Roles:**__')
                        .setTimestamp(Date())
                        .setDescription(msgString_1);
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, messageEmbed)];
                case 10:
                    _a.sent();
                    return [2 /*return*/, commandReturnData];
                case 11:
                    currentRole_1 = new Discord.Role(commandData.guildMember.client, {}, commandData.guildMember.client.guilds.resolve(guildData_1.guildID));
                    isItFound_1 = false;
                    roleArray_1.map(function (role) {
                        if (role.name === roleName_1) {
                            currentRole_1 = role;
                            isItFound_1 = true;
                        }
                        return role;
                    });
                    if (!(isItFound_1 === false)) return [3 /*break*/, 13];
                    msgString = 'Sorry, but the role you entered could not be found! Check spelling and case!';
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgString)];
                case 12:
                    _a.sent();
                    return [2 /*return*/, commandReturnData];
                case 13:
                    if (!(whatAreWeDoing === 'add')) return [3 /*break*/, 20];
                    x = 0;
                    _a.label = 14;
                case 14:
                    if (!(x < guildData_1.defaultRoleIDs.length)) return [3 /*break*/, 17];
                    if (!(currentRole_1.id === guildData_1.defaultRoleIDs[x])) return [3 /*break*/, 16];
                    msgString_2 = "Hey! It looks like you've already added that role!";
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgString_2)];
                case 15:
                    _a.sent();
                    return [2 /*return*/, commandReturnData];
                case 16:
                    x += 1;
                    return [3 /*break*/, 14];
                case 17:
                    guildData_1.defaultRoleIDs.push(currentRole_1.id);
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData_1)];
                case 18:
                    _a.sent();
                    msgString = "\n------\n__**Role:**__ <@&" + currentRole_1.id + ">\n------";
                    messageEmbed = new Discord.MessageEmbed();
                    messageEmbed
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setTitle('__**New Default Role Added:**__')
                        .setTimestamp(Date())
                        .setDescription(msgString);
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, messageEmbed)];
                case 19:
                    _a.sent();
                    return [2 /*return*/, commandReturnData];
                case 20:
                    if (!(whatAreWeDoing === 'remove')) return [3 /*break*/, 28];
                    isItFound_1 = false;
                    x = 0;
                    _a.label = 21;
                case 21:
                    if (!(x < guildData_1.defaultRoleIDs.length)) return [3 /*break*/, 24];
                    if (!(currentRole_1.id === guildData_1.defaultRoleIDs[x])) return [3 /*break*/, 23];
                    guildData_1.defaultRoleIDs.splice(x, 1);
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData_1)];
                case 22:
                    _a.sent();
                    isItFound_1 = true;
                    _a.label = 23;
                case 23:
                    x += 1;
                    return [3 /*break*/, 21];
                case 24:
                    if (!(isItFound_1 === false)) return [3 /*break*/, 26];
                    msgString_3 = 'Sorry, but the role you entered could not be found! Check spelling and case!';
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgString_3)];
                case 25:
                    _a.sent();
                    return [2 /*return*/, commandReturnData];
                case 26:
                    msgString = "" + '\n------\n__**Role**__: <@&' + currentRole_1.id + ">\n------";
                    messageEmbed = new Discord.MessageEmbed();
                    messageEmbed
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setTitle('__**Default Role Removed:**__')
                        .setTimestamp(Date())
                        .setDescription(msgString);
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, messageEmbed)];
                case 27:
                    _a.sent();
                    return [2 /*return*/, commandReturnData];
                case 28: return [2 /*return*/, commandReturnData];
                case 29:
                    error_1 = _a.sent();
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            reject(error_1);
                        })];
                case 30: return [2 /*return*/];
            }
        });
    });
}
exports.execute = execute;
command.function = execute;
exports.default = command;
