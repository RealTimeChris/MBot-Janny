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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Discord = require("discord.js");
var GuildData_1 = __importDefault(require("../GuildData"));
var HelperFunctions_1 = __importDefault(require("../HelperFunctions"));
var command = {
    name: 'setdefaultrole',
    description: 'Just enter !setdefaultrole to view the current list of default roles!\nEnter !setdefaultrole = ADD, ROLENAME, to add a '
        + 'role as a default for when someone new joins the server.\n!setdefaultrole = REMOVE, ROLENAME to remove a role from the list.',
    function: Function()
};
function execute(commandData, discordUser) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function () {
        var commandReturnData, areWeInADM, doWeHaveAdminPerms, guildData_1, roleMemberManager, currentDiscordRole, whatAreWeDoing, roleMentionRegExp, idRegExp, msgString, msgEmbed, msg, msgString, msgEmbed, msg, roleID, roleName_1, roleArray_1, _loop_1, x, msgString_1, messageEmbed, currentRole_1, isItFound_1, msgString, msgEmbed, msg, x, msgString_2, msgEmbed, msg, msgString, messageEmbed, x, msgString_3, msgEmbed, msg, msgString, messageEmbed, error_1;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 41, , 42]);
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
                    guildData_1 = new GuildData_1.default({ dataBase: discordUser.dataBase, id: commandData.guild.id, name: commandData.guild.name, memberCount: commandData.guild.memberCount });
                    return [4 /*yield*/, guildData_1.getFromDataBase()];
                case 3:
                    _c.sent();
                    roleMemberManager = void 0;
                    currentDiscordRole = void 0;
                    whatAreWeDoing = '';
                    roleMentionRegExp = /<@&\d{18}>/;
                    idRegExp = /\d{18}/;
                    if (!(commandData.args[0] === undefined)) return [3 /*break*/, 4];
                    whatAreWeDoing = 'view';
                    return [3 /*break*/, 14];
                case 4:
                    if (!(commandData.args[0] !== undefined && commandData.args[0].toLowerCase() !== 'add' && commandData.args[0].toLowerCase() !== 'remove')) return [3 /*break*/, 7];
                    msgString = "------\n**Please, only enter either 'add' or 'remove' as a first argument! (!setdefaultrole = ADDorREMOVE, ROLENAME, or just !setdefaultrol)**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData_1.borderColor)
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
                    if (!(commandData.args[1] === undefined)) return [3 /*break*/, 10];
                    msgString = "------\n**Please, enter the name of a server role! (!setdefaultrole = ADDorREMOVE, ROLENAME, or just !setdefaultrol)**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData_1.borderColor)
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
                    if (!roleMentionRegExp.test(commandData.args[1])) return [3 /*break*/, 12];
                    roleID = commandData.args[1].match(idRegExp)[0];
                    roleMemberManager = new Discord.RoleManager(commandData.guild);
                    return [4 /*yield*/, roleMemberManager.fetch(roleID)];
                case 11:
                    currentDiscordRole = (_c.sent());
                    commandData.args[1] = currentDiscordRole.name;
                    return [3 /*break*/, 14];
                case 12:
                    if (!idRegExp.test(commandData.args[1])) return [3 /*break*/, 14];
                    roleMemberManager = new Discord.RoleManager(commandData.guild);
                    return [4 /*yield*/, roleMemberManager.fetch(commandData.args[1])];
                case 13:
                    currentDiscordRole = (_c.sent());
                    commandData.args[1] = currentDiscordRole.name;
                    _c.label = 14;
                case 14:
                    if (((_a = commandData.args[0]) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === 'add') {
                        whatAreWeDoing = 'add';
                    }
                    else if (((_b = commandData.args[0]) === null || _b === void 0 ? void 0 : _b.toLowerCase()) === 'remove') {
                        whatAreWeDoing = 'remove';
                    }
                    roleName_1 = commandData.args[1];
                    roleArray_1 = commandData.guild.roles.cache.array().sort();
                    _loop_1 = function (x) {
                        var isItFoundReal, isItFoundFinal, y;
                        return __generator(this, function (_d) {
                            switch (_d.label) {
                                case 0:
                                    isItFoundReal = roleArray_1.map(function (role) {
                                        var isItFound = false;
                                        if (role.id === guildData_1.defaultRoleIDs[x]) {
                                            isItFound = true;
                                            return isItFound;
                                        }
                                        return isItFound;
                                    });
                                    isItFoundFinal = false;
                                    for (y = 0; y < isItFoundReal.length; y += 1) {
                                        if (isItFoundReal[y] === true) {
                                            isItFoundFinal = true;
                                        }
                                    }
                                    if (!(isItFoundFinal === false)) return [3 /*break*/, 2];
                                    console.log('Removing a missing guild role from the list of defaults.');
                                    guildData_1.defaultRoleIDs.splice(x, 1);
                                    return [4 /*yield*/, guildData_1.writeToDataBase()];
                                case 1:
                                    _d.sent();
                                    _d.label = 2;
                                case 2: return [2 /*return*/];
                            }
                        });
                    };
                    x = 0;
                    _c.label = 15;
                case 15:
                    if (!(x < guildData_1.defaultRoleIDs.length)) return [3 /*break*/, 18];
                    return [5 /*yield**/, _loop_1(x)];
                case 16:
                    _c.sent();
                    _c.label = 17;
                case 17:
                    x += 1;
                    return [3 /*break*/, 15];
                case 18:
                    if (!(whatAreWeDoing === 'view')) return [3 /*break*/, 20];
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
                        .setColor(guildData_1.borderColor)
                        .setTitle('__**Default Roles:**__')
                        .setTimestamp(Date())
                        .setDescription(msgString_1);
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, messageEmbed)];
                case 19:
                    _c.sent();
                    return [2 /*return*/, commandReturnData];
                case 20:
                    currentRole_1 = new Discord.Role(commandData.guildMember.client, {}, commandData.guildMember.client.guilds.resolve(guildData_1.id));
                    isItFound_1 = false;
                    roleArray_1.map(function (role) {
                        if (role.name === roleName_1) {
                            currentRole_1 = role;
                            isItFound_1 = true;
                        }
                        return role;
                    });
                    if (!(isItFound_1 === false)) return [3 /*break*/, 23];
                    msgString = "------\n**Sorry, but the role you entered could not be found! Check spelling and case!**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData_1.borderColor)
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Role Issue:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 21:
                    msg = _c.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 22:
                    _c.sent();
                    return [2 /*return*/, commandReturnData];
                case 23:
                    if (!(whatAreWeDoing === 'add')) return [3 /*break*/, 31];
                    x = 0;
                    _c.label = 24;
                case 24:
                    if (!(x < guildData_1.defaultRoleIDs.length)) return [3 /*break*/, 28];
                    if (!(currentRole_1.id === guildData_1.defaultRoleIDs[x])) return [3 /*break*/, 27];
                    msgString_2 = "------\n**Hey! It looks like you've already added that role!**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData_1.borderColor)
                        .setDescription(msgString_2)
                        .setTimestamp(Date())
                        .setTitle('__**Role Issue:**__');
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
                    x += 1;
                    return [3 /*break*/, 24];
                case 28:
                    guildData_1.defaultRoleIDs.push(currentRole_1.id);
                    return [4 /*yield*/, guildData_1.writeToDataBase()];
                case 29:
                    _c.sent();
                    msgString = "\n------\n__**Role:**__ <@&" + currentRole_1.id + ">\n------";
                    messageEmbed = new Discord.MessageEmbed();
                    messageEmbed
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData_1.borderColor)
                        .setTitle('__**New Default Role Added:**__')
                        .setTimestamp(Date())
                        .setDescription(msgString);
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, messageEmbed)];
                case 30:
                    _c.sent();
                    return [2 /*return*/, commandReturnData];
                case 31:
                    if (!(whatAreWeDoing === 'remove')) return [3 /*break*/, 40];
                    isItFound_1 = false;
                    x = 0;
                    _c.label = 32;
                case 32:
                    if (!(x < guildData_1.defaultRoleIDs.length)) return [3 /*break*/, 35];
                    if (!(currentRole_1.id === guildData_1.defaultRoleIDs[x])) return [3 /*break*/, 34];
                    guildData_1.defaultRoleIDs.splice(x, 1);
                    return [4 /*yield*/, guildData_1.writeToDataBase()];
                case 33:
                    _c.sent();
                    isItFound_1 = true;
                    _c.label = 34;
                case 34:
                    x += 1;
                    return [3 /*break*/, 32];
                case 35:
                    if (!(isItFound_1 === false)) return [3 /*break*/, 38];
                    msgString_3 = "------\n**Sorry, but the role you entered could not be found! Check spelling and case!**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData_1.borderColor)
                        .setDescription(msgString_3)
                        .setTimestamp(Date())
                        .setTitle('__**Missing Or Invalid Arguments:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 36:
                    msg = _c.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 37:
                    _c.sent();
                    return [2 /*return*/, commandReturnData];
                case 38:
                    msgString = "" + '\n------\n__**Role**__: <@&' + currentRole_1.id + ">\n------";
                    messageEmbed = new Discord.MessageEmbed();
                    messageEmbed
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData_1.borderColor)
                        .setTitle('__**Default Role Removed:**__')
                        .setTimestamp(Date())
                        .setDescription(msgString);
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, messageEmbed)];
                case 39:
                    _c.sent();
                    return [2 /*return*/, commandReturnData];
                case 40: return [2 /*return*/, commandReturnData];
                case 41:
                    error_1 = _c.sent();
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            reject(error_1);
                        })];
                case 42: return [2 /*return*/];
            }
        });
    });
}
command.function = execute;
exports.default = command;
