// ghost.ts - Module for my "ghost" command.
// Mar 18, 2021
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
var GuildMemberData_1 = __importDefault(require("../GuildMemberData"));
var HelperFunctions_1 = __importDefault(require("../HelperFunctions"));
var command = {
    name: 'ghost',
    description: ' THIS WILL COMPLETELY SILENCE AND MUTE THE USER ACROSS THE SERVER!\n!ghost to display a list of all currently ghosted users.\n!ghost = add, REASON, '
        + '@USERMENTION to ghost a new user.\n!ghost = remove, @USERMENTION to unghost a user.',
    function: Function()
};
function execute(commandData, discordUser) {
    return __awaiter(this, void 0, void 0, function () {
        var returnData, guildData, areWeInADM, doWeHaveAdminPerms, whatAreWeDoing, userMentionRegExp, userIDRegExp, ghostReason, userID, msgString, msgEmbed, msg, msgString, msgEmbed, msg, msgString, msgEmbed, msg, msgString, msgEmbed, msg, msgString, msgEmbed, msg, msgString, msgEmbed, msg, argOne, argTwo, userIDRaw, argOne, userIDRaw, currentGuildMember, guildMemberData, channelsArray, roleManager, ghostedRole, memberRoleManager, memberRoleManagerBot, x, voicePermissionOptions, textPermissionOptions, currentChannel, isItFound, currentChannelPerms, y, currentOverwritesArray, currentChannel, isItFound1, isItFound2, currentChannelPerms, y, argOne, currentOverwritesArray, ghostedUserArray, x, msgString, x, msgEmbed, x, msgString_1, msgEmbed_1, msg, x, x, error_1, x, currentChannel, currentChannelOverwritesArray, y, permOWs, msgString, msgEmbed, dmChannel, msgString2, msgEmbed2, isItFound, x, msgString_2, msgEmbed_2, msg, x, error_2, x, currentChannel, currentChannelOverwritesArray, z, msgString, msgEmbed, dmChannel, msgString2, msgEmbed2, error_3, msgString, msgEmbed;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    returnData = {
                        commandName: command.name
                    };
                    returnData.commandName = command.name;
                    guildData = new GuildData_1.default({ dataBase: discordUser.dataBase, id: commandData.guild.id, name: commandData.guild.name, memberCount: commandData.guild.memberCount });
                    return [4 /*yield*/, guildData.getFromDataBase()];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 79, , 82]);
                    return [4 /*yield*/, HelperFunctions_1.default.areWeInADM(commandData)];
                case 3:
                    areWeInADM = _a.sent();
                    if (areWeInADM) {
                        return [2 /*return*/, returnData];
                    }
                    return [4 /*yield*/, HelperFunctions_1.default.doWeHaveAdminPermission(commandData, discordUser)];
                case 4:
                    doWeHaveAdminPerms = _a.sent();
                    if (!doWeHaveAdminPerms) {
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                resolve(returnData);
                            })];
                    }
                    whatAreWeDoing = void 0;
                    userMentionRegExp = /<@!\d{18}>/;
                    userIDRegExp = /\d{18}/;
                    ghostReason = void 0;
                    userID = void 0;
                    if (!(commandData.args[0] === '' || commandData.args[0] === undefined)) return [3 /*break*/, 5];
                    whatAreWeDoing = 'viewing';
                    userID = commandData.guildMember.id;
                    return [3 /*break*/, 24];
                case 5:
                    if (!(commandData.args[0] !== undefined && commandData.args[0].toString().toLowerCase() !== 'add' && commandData.args[0].toString().toLowerCase() !== 'remove')) return [3 /*break*/, 8];
                    msgString = "------\n**Please, enter a proper first argument! (!ghost = add, REASON, @USERMENTION to \n                ghost a new user, !ghost = remove, @USERMENTION to unghost a user)**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Missing Or Invalid Arguments:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 6:
                    msg = _a.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 7:
                    _a.sent();
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            resolve(returnData);
                        })];
                case 8:
                    if (!(commandData.args[0] !== undefined && commandData.args[0].toString().toLowerCase() === 'add' && commandData.args[1] === undefined)) return [3 /*break*/, 11];
                    msgString = "------\n**Please, enter a reason for this ghosting! (!ghost = add, REASON, @USERMENTION to \n                ghost a new user, !ghost = remove, @USERMENTION to unghost a user)**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Missing Or Invalid Arguments:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 9:
                    msg = _a.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 10:
                    _a.sent();
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            resolve(returnData);
                        })];
                case 11:
                    if (!(commandData.args[0] !== undefined && commandData.args[0].toString().toLowerCase() === 'add' && commandData.args[2] === undefined)) return [3 /*break*/, 14];
                    msgString = "------\n**Please, enter a usermention to select the target to ghost! (!ghost = add, REASON, \n                @USERMENTION to ghost a new user, !ghost = remove, @USERMENTION to unghost a user)**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Missing Or Invalid Arguments:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 12:
                    msg = _a.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 13:
                    _a.sent();
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            resolve(returnData);
                        })];
                case 14:
                    if (!(commandData.args[0] !== undefined && commandData.args[0].toString().toLowerCase() === 'remove' && commandData.args[1] === undefined)) return [3 /*break*/, 17];
                    msgString = "------\n**Please, enter a usermention to select the target to de-ghost!\n                (!ghost = remove, @USERMENTION to unghost a user)**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Missing Or Invalid Arguments:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 15:
                    msg = _a.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 16:
                    _a.sent();
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            resolve(returnData);
                        })];
                case 17:
                    if (!(commandData.args[0] !== undefined && commandData.args[0].toString().toLowerCase() === 'add' && !userMentionRegExp.test(commandData.args[2]) && !userIDRegExp.test(commandData.args[2]))) return [3 /*break*/, 20];
                    msgString = "------\n**Please, enter a usermention to select the target to ghost! (!ghost = add, REASON, \n                @USERMENTION to ghost a new user, !ghost = remove, @USERMENTION to unghost a user)**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Missing Or Invalid Arguments:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 18:
                    msg = _a.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 19:
                    _a.sent();
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            resolve(returnData);
                        })];
                case 20:
                    if (!(commandData.args[0] !== undefined && commandData.args[0].toString().toLowerCase() === 'remove' && !userMentionRegExp.test(commandData.args[1]) && !userIDRegExp.test(commandData.args[1]))) return [3 /*break*/, 23];
                    msgString = "------\n**Please, enter a proper usermention to select the target to de-ghost! \n                (!ghost = remove, @USERMENTION to unghost a user)**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Missing Or Invalid Arguments:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 21:
                    msg = _a.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 22:
                    _a.sent();
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            resolve(returnData);
                        })];
                case 23:
                    if (commandData.args[0] !== undefined && commandData.args[0].toString().toLowerCase() === 'add') {
                        whatAreWeDoing = 'add';
                        argOne = commandData.args[1];
                        ghostReason = argOne;
                        argTwo = commandData.args[2];
                        userIDRaw = argTwo.match(/\d{18}/)[0];
                        userID = userIDRaw;
                    }
                    else if (commandData.args[0] !== undefined && commandData.args[0].toString().toLowerCase() === 'remove') {
                        whatAreWeDoing = 'remove';
                        argOne = commandData.args[1];
                        userIDRaw = argOne.match(/\d{18}/)[0];
                        userID = userIDRaw;
                    }
                    _a.label = 24;
                case 24: return [4 /*yield*/, commandData.guild.members.fetch(userID)];
                case 25:
                    currentGuildMember = _a.sent();
                    guildMemberData = new GuildMemberData_1.default({ dataBase: discordUser.dataBase, displayName: currentGuildMember.displayName,
                        id: currentGuildMember.id, guildId: commandData.guild.id, userName: currentGuildMember.user.username });
                    return [4 /*yield*/, guildMemberData.getFromDataBase()];
                case 26:
                    _a.sent();
                    channelsArray = commandData.guild.channels.cache.array();
                    roleManager = new Discord.RoleManager(commandData.guild);
                    return [4 /*yield*/, roleManager.fetch(guildData.ghostedRoleID)];
                case 27:
                    ghostedRole = _a.sent();
                    memberRoleManager = new Discord.GuildMemberRoleManager(currentGuildMember);
                    memberRoleManagerBot = new Discord.GuildMemberRoleManager(commandData.guildMember);
                    if (!!(ghostedRole instanceof Discord.Role)) return [3 /*break*/, 30];
                    return [4 /*yield*/, roleManager.create({
                            data: {
                                position: memberRoleManagerBot.highest.position - 1, color: 'FF3333', mentionable: true, name: 'Ghosted',
                            },
                        })];
                case 28:
                    ghostedRole = _a.sent();
                    guildData.ghostedRoleID = ghostedRole.id;
                    return [4 /*yield*/, guildData.writeToDataBase()];
                case 29:
                    _a.sent();
                    _a.label = 30;
                case 30:
                    if (!(whatAreWeDoing === 'add' || whatAreWeDoing === 'remove')) return [3 /*break*/, 36];
                    x = 0;
                    _a.label = 31;
                case 31:
                    if (!(x < channelsArray.length)) return [3 /*break*/, 36];
                    voicePermissionOptions = {
                        channel: null,
                        id: guildData.ghostedRoleID,
                        type: 'role',
                        allow: ['VIEW_CHANNEL'],
                        deny: ['ADMINISTRATOR', 'CREATE_INSTANT_INVITE', 'KICK_MEMBERS', 'BAN_MEMBERS',
                            'MANAGE_CHANNELS', 'MANAGE_GUILD', 'VIEW_AUDIT_LOG', 'PRIORITY_SPEAKER', 'STREAM', 'VIEW_GUILD_INSIGHTS',
                            'CONNECT', 'SPEAK', 'MUTE_MEMBERS', 'DEAFEN_MEMBERS', 'MOVE_MEMBERS', 'USE_VAD', 'CHANGE_NICKNAME', 'MANAGE_NICKNAMES',
                            'MANAGE_ROLES', 'MANAGE_WEBHOOKS', 'MANAGE_EMOJIS']
                    };
                    textPermissionOptions = {
                        channel: null,
                        id: guildData.ghostedRoleID,
                        type: 'role',
                        allow: ['VIEW_CHANNEL', 'READ_MESSAGE_HISTORY'],
                        deny: ['ADMINISTRATOR', 'CREATE_INSTANT_INVITE', 'KICK_MEMBERS', 'BAN_MEMBERS',
                            'MANAGE_CHANNELS', 'MANAGE_GUILD', 'ADD_REACTIONS', 'VIEW_AUDIT_LOG', 'SEND_MESSAGES',
                            'SEND_TTS_MESSAGES', 'MANAGE_MESSAGES', 'EMBED_LINKS', 'ATTACH_FILES', 'MENTION_EVERYONE', 'USE_EXTERNAL_EMOJIS',
                            'VIEW_GUILD_INSIGHTS', 'CHANGE_NICKNAME', 'MANAGE_NICKNAMES', 'MANAGE_ROLES',
                            'MANAGE_WEBHOOKS', 'MANAGE_EMOJIS']
                    };
                    if (!(channelsArray[x].type === 'voice')) return [3 /*break*/, 33];
                    currentChannel = new Discord.VoiceChannel(commandData.guild, {});
                    currentChannel = channelsArray[x];
                    isItFound = false;
                    currentChannelPerms = void 0;
                    for (y = 0; y < memberRoleManager.cache.array().length; y += 1) {
                        if (guildData.verificationSystem.channelID !== null) {
                            if (memberRoleManager.cache.array()[y].name === '@everyone') {
                                continue;
                            }
                        }
                        currentChannelPerms = currentChannel
                            .permissionsFor(memberRoleManager.cache.array()[y]);
                        if (currentChannelPerms.has('VIEW_CHANNEL')) {
                            isItFound = true;
                        }
                    }
                    currentChannelPerms = currentChannel.permissionsFor(currentGuildMember);
                    if (currentChannelPerms.has('VIEW_CHANNEL')) {
                        isItFound = true;
                    }
                    if (isItFound === false) {
                        voicePermissionOptions.allow.splice(0, 1);
                        voicePermissionOptions.deny.push('VIEW_CHANNEL');
                    }
                    currentOverwritesArray = currentChannel.permissionOverwrites.array();
                    voicePermissionOptions.channel = currentChannel;
                    currentOverwritesArray.push(voicePermissionOptions);
                    return [4 /*yield*/, currentChannel.overwritePermissions(currentOverwritesArray)];
                case 32:
                    _a.sent();
                    return [3 /*break*/, 35];
                case 33:
                    currentChannel = new Discord.GuildChannel(commandData.guild, {});
                    currentChannel = channelsArray[x];
                    isItFound1 = false;
                    isItFound2 = false;
                    currentChannelPerms = void 0;
                    for (y = 0; y < memberRoleManager.cache.array().length; y += 1) {
                        if (guildData.verificationSystem.channelID !== null) {
                            if (memberRoleManager.cache.array()[y].name === '@everyone') {
                                continue;
                            }
                        }
                        currentChannelPerms = currentChannel
                            .permissionsFor(memberRoleManager.cache.array()[y]);
                        if (currentChannelPerms.has('VIEW_CHANNEL')) {
                            isItFound1 = true;
                        }
                        if (currentChannelPerms.has('READ_MESSAGE_HISTORY')) {
                            isItFound2 = true;
                        }
                    }
                    currentChannelPerms = currentChannel.permissionsFor(currentGuildMember);
                    if (currentChannelPerms.has('VIEW_CHANNEL')) {
                        isItFound1 = true;
                    }
                    if (currentChannelPerms.has('READ_MESSAGE_HISTORY')) {
                        isItFound2 = true;
                    }
                    if (isItFound1 === false) {
                        argOne = textPermissionOptions.allow[1];
                        textPermissionOptions.allow[0] = argOne;
                        textPermissionOptions.allow.splice(1, 1);
                        textPermissionOptions.deny.push('VIEW_CHANNEL');
                    }
                    if (isItFound2 === false && isItFound1 === false) {
                        textPermissionOptions.allow.splice(0, 1);
                        textPermissionOptions.deny.push('READ_MESSAGE_HISTORY');
                    }
                    if (isItFound2 === false) {
                        textPermissionOptions.allow.splice(1, 1);
                        textPermissionOptions.deny.push('READ_MESSAGE_HISTORY');
                    }
                    currentOverwritesArray = currentChannel.permissionOverwrites.array();
                    textPermissionOptions.channel = currentChannel;
                    currentOverwritesArray.push(textPermissionOptions);
                    return [4 /*yield*/, currentChannel.overwritePermissions(currentOverwritesArray)];
                case 34:
                    _a.sent();
                    _a.label = 35;
                case 35:
                    x += 1;
                    return [3 /*break*/, 31];
                case 36:
                    ghostedUserArray = [];
                    for (x = 0; x < ghostedRole.members.array().length; x += 1) {
                        ghostedUserArray.push(ghostedRole.members.array()[x]);
                    }
                    if (!(whatAreWeDoing === 'viewing')) return [3 /*break*/, 38];
                    msgString = void 0;
                    if (ghostedUserArray.length === 0) {
                        msgString = '------\n__**Great! There\'s nobody in "ghost" mode on your server!**__';
                    }
                    else {
                        msgString = '------\n__**These are your server\'s currently "ghosted" members:**__\n------\n';
                        for (x = 0; x < ghostedUserArray.length; x += 1) {
                            if (x % 5 === 0 && x > 1) {
                                msgString += '\n';
                            }
                            msgString += "<@!" + ghostedUserArray[x].id + ">";
                            if (x < ghostedUserArray.length - 1) {
                                msgString += ', ';
                            }
                        }
                    }
                    msgString += '\n------';
                    msgEmbed = new Discord.MessageEmbed();
                    msgEmbed
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Currently Ghosted Members:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 37:
                    _a.sent();
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            resolve(returnData);
                        })];
                case 38:
                    if (!(whatAreWeDoing === 'add')) return [3 /*break*/, 60];
                    x = 0;
                    _a.label = 39;
                case 39:
                    if (!(x < ghostedUserArray.length)) return [3 /*break*/, 43];
                    if (!(currentGuildMember.id === ghostedUserArray[x].id)) return [3 /*break*/, 42];
                    msgString_1 = "------\n**They are already ghosted!**\n------";
                    msgEmbed_1 = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString_1)
                        .setTimestamp(Date())
                        .setTitle('__**Already Ghosted:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed_1)];
                case 40:
                    msg = _a.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 41:
                    _a.sent();
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            resolve(returnData);
                        })];
                case 42:
                    x += 1;
                    return [3 /*break*/, 39];
                case 43:
                    guildMemberData.previousRoleIDs.push(memberRoleManager.highest.id);
                    for (x = 0; x < memberRoleManager.cache.array().length; x += 1) {
                        if (memberRoleManager.cache.array()[x].id === memberRoleManager.highest.id) {
                            continue;
                        }
                        if (memberRoleManager.cache.array()[x].name !== '@everyone' && memberRoleManager.cache.array()[x].name !== 'general'
                            && memberRoleManager.cache.array()[x].id !== memberRoleManager.highest.id) {
                            guildMemberData.previousRoleIDs.push(memberRoleManager.cache.array()[x].id);
                        }
                    }
                    x = 0;
                    _a.label = 44;
                case 44:
                    if (!(x < guildMemberData.previousRoleIDs.length)) return [3 /*break*/, 49];
                    _a.label = 45;
                case 45:
                    _a.trys.push([45, 47, , 48]);
                    return [4 /*yield*/, memberRoleManager.remove(guildMemberData.previousRoleIDs[x])];
                case 46:
                    _a.sent();
                    return [3 /*break*/, 48];
                case 47:
                    error_1 = _a.sent();
                    if (error_1.message === 'Missing Permissions') {
                        console.log('Missing Permissions');
                        return [3 /*break*/, 48];
                    }
                    else {
                        console.log(error_1);
                        return [3 /*break*/, 48];
                    }
                    return [3 /*break*/, 48];
                case 48:
                    x += 1;
                    return [3 /*break*/, 44];
                case 49:
                    x = 0;
                    _a.label = 50;
                case 50:
                    if (!(x < channelsArray.length)) return [3 /*break*/, 55];
                    currentChannel = channelsArray[x];
                    currentChannelOverwritesArray = currentChannel.permissionOverwrites.array();
                    y = 0;
                    _a.label = 51;
                case 51:
                    if (!(y < currentChannelOverwritesArray.length)) return [3 /*break*/, 54];
                    if (!(currentChannelOverwritesArray[y].id === currentGuildMember.id)) return [3 /*break*/, 53];
                    permOWs = {
                        channel: currentChannel,
                        type: 'member',
                        id: currentGuildMember.id,
                        allow: currentChannelOverwritesArray[y].allow.toArray(),
                        deny: currentChannelOverwritesArray[y].deny.toArray()
                    };
                    guildMemberData.previousPermissionOverwrites
                        .push(permOWs);
                    return [4 /*yield*/, currentChannelOverwritesArray[y].delete()];
                case 52:
                    _a.sent();
                    _a.label = 53;
                case 53:
                    y += 1;
                    return [3 /*break*/, 51];
                case 54:
                    x += 1;
                    return [3 /*break*/, 50];
                case 55: return [4 /*yield*/, guildMemberData.writeToDataBase()];
                case 56:
                    _a.sent();
                    if (currentGuildMember.voice.channel) {
                        currentGuildMember.voice.kick();
                    }
                    return [4 /*yield*/, memberRoleManager.add(ghostedRole.id)];
                case 57:
                    _a.sent();
                    msgString = "------\n**Hello! You've been REDACTED, on the server " + commandData.guild.name + ",\n            for the following reason(s):\t" + ghostReason + "\n Please, contact a moderator or admin to clear this issue up! Thanks!**\n------";
                    msgEmbed = new Discord.MessageEmbed();
                    msgEmbed
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**You\'ve been ghosted:**__');
                    return [4 /*yield*/, currentGuildMember.createDM(true)];
                case 58:
                    dmChannel = _a.sent();
                    dmChannel.send(msgEmbed);
                    msgString2 = "------\n__Hello! You've ghosted the following member__: <@!" + currentGuildMember.id + "> (" + currentGuildMember.user.username + ")\n------";
                    msgEmbed2 = new Discord.MessageEmbed();
                    msgEmbed2
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString2)
                        .setTimestamp(Date())
                        .setTitle('__**New Server Member Ghosted:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed2)];
                case 59:
                    _a.sent();
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            resolve(returnData);
                        })];
                case 60:
                    if (!(whatAreWeDoing === 'remove')) return [3 /*break*/, 78];
                    isItFound = false;
                    for (x = 0; x < ghostedUserArray.length; x += 1) {
                        if (currentGuildMember.id === ghostedUserArray[x].id) {
                            isItFound = true;
                            break;
                        }
                    }
                    if (!(isItFound === false)) return [3 /*break*/, 63];
                    msgString_2 = "-------\n**Sorry, but that user is not currently ghosted!**\n------";
                    msgEmbed_2 = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString_2)
                        .setTimestamp(Date())
                        .setTitle('__**Not Ghosted:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed_2)];
                case 61:
                    msg = _a.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 62:
                    _a.sent();
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            resolve(returnData);
                        })];
                case 63:
                    x = 0;
                    _a.label = 64;
                case 64:
                    if (!(x < guildMemberData.previousRoleIDs.length)) return [3 /*break*/, 69];
                    _a.label = 65;
                case 65:
                    _a.trys.push([65, 67, , 68]);
                    return [4 /*yield*/, memberRoleManager.add(guildMemberData.previousRoleIDs[x])];
                case 66:
                    _a.sent();
                    return [3 /*break*/, 68];
                case 67:
                    error_2 = _a.sent();
                    if (error_2.message === 'Missing Permissions') {
                        return [3 /*break*/, 68];
                    }
                    return [3 /*break*/, 68];
                case 68:
                    x += 1;
                    return [3 /*break*/, 64];
                case 69:
                    x = 0;
                    _a.label = 70;
                case 70:
                    if (!(x < channelsArray.length)) return [3 /*break*/, 73];
                    currentChannel = channelsArray[x];
                    currentChannelOverwritesArray = currentChannel.permissionOverwrites.array();
                    for (z = 0; z < guildMemberData.previousPermissionOverwrites.length; z += 1) {
                        if ((guildMemberData.previousPermissionOverwrites[z])
                            .channel.id === channelsArray[x].id) {
                            currentChannelOverwritesArray.push(guildMemberData.previousPermissionOverwrites[z]);
                        }
                    }
                    return [4 /*yield*/, currentChannel.overwritePermissions(currentChannelOverwritesArray)];
                case 71:
                    _a.sent();
                    _a.label = 72;
                case 72:
                    x += 1;
                    return [3 /*break*/, 70];
                case 73:
                    guildMemberData.previousPermissionOverwrites = [];
                    guildMemberData.previousRoleIDs = [];
                    return [4 /*yield*/, guildMemberData.writeToDataBase()];
                case 74:
                    _a.sent();
                    return [4 /*yield*/, memberRoleManager.remove(ghostedRole.id)];
                case 75:
                    _a.sent();
                    msgString = '------\n**Hello! You\'ve had your redacted status removed! Have a great day!**\n------';
                    msgEmbed = new Discord.MessageEmbed();
                    msgEmbed
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**You\'ve been un-ghosted:**__');
                    return [4 /*yield*/, currentGuildMember.createDM(true)];
                case 76:
                    dmChannel = _a.sent();
                    dmChannel.send(msgEmbed);
                    msgString2 = "------\n__Hello! You've un-ghosted the following member__: <@!" + currentGuildMember.id + "> (" + currentGuildMember.user.username + ")\n------";
                    msgEmbed2 = new Discord.MessageEmbed();
                    msgEmbed2
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString2)
                        .setTimestamp(Date())
                        .setTitle('__**New Server Member Un-Ghosted:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed2)];
                case 77:
                    _a.sent();
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            resolve(returnData);
                        })];
                case 78: return [2 /*return*/, new Promise(function (resolve, reject) {
                        resolve(returnData);
                    })];
                case 79:
                    error_3 = _a.sent();
                    if (!(error_3.message === 'Missing Permissions')) return [3 /*break*/, 81];
                    msgString = "------\n**I need more permissions! Please promote my role rank in the server options!**\n------";
                    msgEmbed = new Discord.MessageEmbed();
                    msgEmbed
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Permissions Issue:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 80:
                    _a.sent();
                    console.log(error_3);
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            resolve(returnData);
                        })];
                case 81: return [2 /*return*/, new Promise(function (resolve, reject) {
                        reject(error_3);
                    })];
                case 82: return [2 /*return*/];
            }
        });
    });
}
command.function = execute;
exports.default = command;
