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
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var returnData, guildData, areWeInADM, doWeHaveAdminPerms, whatAreWeDoing, userMentionRegExp, userIDRegExp, ghostReason, userID, msgString, msgEmbed, msg, msgString, msgEmbed, msg, msgString, msgEmbed, msg, msgString, msgEmbed, msg, msgString, msgEmbed, msg, msgString, msgEmbed, msg, argOne, argTwo, userIDRaw, argOne, userIDRaw, currentGuildMember, guildMemberData, channelsArray, roleManager, ghostedRole, memberRoleManager, memberRoleManagerBot, x, voicePermissionOptions, textPermissionOptions, currentChannel, isItFound, currentChannelPerms, y, currentOverwritesArray, currentChannel, isItFound1, isItFound2, currentChannelPerms, y, argOne, currentOverwritesArray, ghostedUserArray, x, msgString, x, msgEmbed, x, msgString_1, msgEmbed_1, msg, x, x, error_1, x, currentChannel, currentChannelOverwritesArray, y, permOWs, msgString, msgEmbed, dmChannel, msgString2, msgEmbed2, isItFound, x, msgString_2, msgEmbed_2, msg, x, error_2, x, currentChannel, currentChannelOverwritesArray, z, msgString, msgEmbed, dmChannel, msgString2, msgEmbed2, error_3, msgString, msgEmbed;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    returnData = {
                        commandName: command.name
                    };
                    returnData.commandName = command.name;
                    guildData = new GuildData_1.default({ dataBase: discordUser.dataBase, id: commandData.guild.id, name: commandData.guild.name, memberCount: commandData.guild.memberCount });
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 77, , 80]);
                    return [4 /*yield*/, HelperFunctions_1.default.areWeInADM(commandData)];
                case 2:
                    areWeInADM = _b.sent();
                    if (areWeInADM) {
                        return [2 /*return*/, returnData];
                    }
                    return [4 /*yield*/, HelperFunctions_1.default.doWeHaveAdminPermission(commandData, discordUser)];
                case 3:
                    doWeHaveAdminPerms = _b.sent();
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
                    if (!(commandData.args[0] === '' || commandData.args[0] === undefined)) return [3 /*break*/, 4];
                    whatAreWeDoing = 'viewing';
                    userID = commandData.guildMember.id;
                    return [3 /*break*/, 23];
                case 4:
                    if (!(commandData.args[0] !== undefined && commandData.args[0].toString().toLowerCase() !== 'add' && commandData.args[0].toString().toLowerCase() !== 'remove')) return [3 /*break*/, 7];
                    msgString = "------\n**Please, enter a proper first argument! (!ghost = add, REASON, @USERMENTION to \n                ghost a new user, !ghost = remove, @USERMENTION to unghost a user)**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.exposeDataValues().borderColor)
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Missing Or Invalid Arguments:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 5:
                    msg = _b.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 6:
                    _b.sent();
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            resolve(returnData);
                        })];
                case 7:
                    if (!(commandData.args[0] !== undefined && commandData.args[0].toString().toLowerCase() === 'add' && commandData.args[1] === undefined)) return [3 /*break*/, 10];
                    msgString = "------\n**Please, enter a reason for this ghosting! (!ghost = add, REASON, @USERMENTION to \n                ghost a new user, !ghost = remove, @USERMENTION to unghost a user)**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.exposeDataValues().borderColor)
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Missing Or Invalid Arguments:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 8:
                    msg = _b.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 9:
                    _b.sent();
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            resolve(returnData);
                        })];
                case 10:
                    if (!(commandData.args[0] !== undefined && commandData.args[0].toString().toLowerCase() === 'add' && commandData.args[2] === undefined)) return [3 /*break*/, 13];
                    msgString = "------\n**Please, enter a usermention to select the target to ghost! (!ghost = add, REASON, \n                @USERMENTION to ghost a new user, !ghost = remove, @USERMENTION to unghost a user)**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.exposeDataValues().borderColor)
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Missing Or Invalid Arguments:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 11:
                    msg = _b.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 12:
                    _b.sent();
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            resolve(returnData);
                        })];
                case 13:
                    if (!(commandData.args[0] !== undefined && commandData.args[0].toString().toLowerCase() === 'remove' && commandData.args[1] === undefined)) return [3 /*break*/, 16];
                    msgString = "------\n**Please, enter a usermention to select the target to de-ghost!\n                (!ghost = remove, @USERMENTION to unghost a user)**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.exposeDataValues().borderColor)
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Missing Or Invalid Arguments:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 14:
                    msg = _b.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 15:
                    _b.sent();
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            resolve(returnData);
                        })];
                case 16:
                    if (!(commandData.args[0] !== undefined && commandData.args[0].toString().toLowerCase() === 'add' && !userMentionRegExp.test(commandData.args[2]) && !userIDRegExp.test(commandData.args[2]))) return [3 /*break*/, 19];
                    msgString = "------\n**Please, enter a usermention to select the target to ghost! (!ghost = add, REASON, \n                @USERMENTION to ghost a new user, !ghost = remove, @USERMENTION to unghost a user)**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.exposeDataValues().borderColor)
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Missing Or Invalid Arguments:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 17:
                    msg = _b.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 18:
                    _b.sent();
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            resolve(returnData);
                        })];
                case 19:
                    if (!(commandData.args[0] !== undefined && commandData.args[0].toString().toLowerCase() === 'remove' && !userMentionRegExp.test(commandData.args[1]) && !userIDRegExp.test(commandData.args[1]))) return [3 /*break*/, 22];
                    msgString = "------\n**Please, enter a proper usermention to select the target to de-ghost! \n                (!ghost = remove, @USERMENTION to unghost a user)**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.exposeDataValues().borderColor)
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Missing Or Invalid Arguments:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 20:
                    msg = _b.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 21:
                    _b.sent();
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            resolve(returnData);
                        })];
                case 22:
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
                    _b.label = 23;
                case 23: return [4 /*yield*/, commandData.guild.members.fetch(userID)];
                case 24:
                    currentGuildMember = _b.sent();
                    guildMemberData = new GuildMemberData_1.default({ dataBase: discordUser.dataBase, displayName: commandData.guildMember.displayName,
                        id: (_a = commandData.guildMember) === null || _a === void 0 ? void 0 : _a.id, guildId: commandData.guild.id, userName: commandData.guildMember.user.username });
                    channelsArray = commandData.guild.channels.cache.array();
                    roleManager = new Discord.RoleManager(commandData.guild);
                    return [4 /*yield*/, roleManager.fetch(guildData.exposeDataValues().ghostedRoleID)];
                case 25:
                    ghostedRole = _b.sent();
                    memberRoleManager = new Discord.GuildMemberRoleManager(currentGuildMember);
                    memberRoleManagerBot = new Discord.GuildMemberRoleManager(commandData.guildMember);
                    if (!!(ghostedRole instanceof Discord.Role)) return [3 /*break*/, 28];
                    return [4 /*yield*/, roleManager.create({
                            data: {
                                position: memberRoleManagerBot.highest.position - 1, color: 'FF3333', mentionable: true, name: 'Ghosted',
                            },
                        })];
                case 26:
                    ghostedRole = _b.sent();
                    guildData.exposeDataValues().ghostedRoleID = ghostedRole.id;
                    return [4 /*yield*/, guildData.writeToDataBase()];
                case 27:
                    _b.sent();
                    _b.label = 28;
                case 28:
                    if (!(whatAreWeDoing === 'add' || whatAreWeDoing === 'remove')) return [3 /*break*/, 34];
                    x = 0;
                    _b.label = 29;
                case 29:
                    if (!(x < channelsArray.length)) return [3 /*break*/, 34];
                    voicePermissionOptions = {
                        channel: null,
                        id: guildData.exposeDataValues().ghostedRoleID,
                        type: 'role',
                        allow: ['VIEW_CHANNEL'],
                        deny: ['ADMINISTRATOR', 'CREATE_INSTANT_INVITE', 'KICK_MEMBERS', 'BAN_MEMBERS',
                            'MANAGE_CHANNELS', 'MANAGE_GUILD', 'VIEW_AUDIT_LOG', 'PRIORITY_SPEAKER', 'STREAM', 'VIEW_GUILD_INSIGHTS',
                            'CONNECT', 'SPEAK', 'MUTE_MEMBERS', 'DEAFEN_MEMBERS', 'MOVE_MEMBERS', 'USE_VAD', 'CHANGE_NICKNAME', 'MANAGE_NICKNAMES',
                            'MANAGE_ROLES', 'MANAGE_WEBHOOKS', 'MANAGE_EMOJIS']
                    };
                    textPermissionOptions = {
                        channel: null,
                        id: guildData.exposeDataValues().ghostedRoleID,
                        type: 'role',
                        allow: ['VIEW_CHANNEL', 'READ_MESSAGE_HISTORY'],
                        deny: ['ADMINISTRATOR', 'CREATE_INSTANT_INVITE', 'KICK_MEMBERS', 'BAN_MEMBERS',
                            'MANAGE_CHANNELS', 'MANAGE_GUILD', 'ADD_REACTIONS', 'VIEW_AUDIT_LOG', 'SEND_MESSAGES',
                            'SEND_TTS_MESSAGES', 'MANAGE_MESSAGES', 'EMBED_LINKS', 'ATTACH_FILES', 'MENTION_EVERYONE', 'USE_EXTERNAL_EMOJIS',
                            'VIEW_GUILD_INSIGHTS', 'CHANGE_NICKNAME', 'MANAGE_NICKNAMES', 'MANAGE_ROLES',
                            'MANAGE_WEBHOOKS', 'MANAGE_EMOJIS']
                    };
                    if (!(channelsArray[x].type === 'voice')) return [3 /*break*/, 31];
                    currentChannel = new Discord.VoiceChannel(commandData.guild, {});
                    currentChannel = channelsArray[x];
                    isItFound = false;
                    currentChannelPerms = void 0;
                    for (y = 0; y < memberRoleManager.cache.array().length; y += 1) {
                        if (guildData.exposeDataValues().verificationSystem.channelID !== null) {
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
                case 30:
                    _b.sent();
                    return [3 /*break*/, 33];
                case 31:
                    currentChannel = new Discord.GuildChannel(commandData.guild, {});
                    currentChannel = channelsArray[x];
                    isItFound1 = false;
                    isItFound2 = false;
                    currentChannelPerms = void 0;
                    for (y = 0; y < memberRoleManager.cache.array().length; y += 1) {
                        if (guildData.exposeDataValues().verificationSystem.channelID !== null) {
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
                case 32:
                    _b.sent();
                    _b.label = 33;
                case 33:
                    x += 1;
                    return [3 /*break*/, 29];
                case 34:
                    ghostedUserArray = [];
                    for (x = 0; x < ghostedRole.members.array().length; x += 1) {
                        ghostedUserArray.push(ghostedRole.members.array()[x]);
                    }
                    if (!(whatAreWeDoing === 'viewing')) return [3 /*break*/, 36];
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
                        .setColor(guildData.exposeDataValues().borderColor)
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Currently Ghosted Members:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 35:
                    _b.sent();
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            resolve(returnData);
                        })];
                case 36:
                    if (!(whatAreWeDoing === 'add')) return [3 /*break*/, 58];
                    x = 0;
                    _b.label = 37;
                case 37:
                    if (!(x < ghostedUserArray.length)) return [3 /*break*/, 41];
                    if (!(currentGuildMember.id === ghostedUserArray[x].id)) return [3 /*break*/, 40];
                    msgString_1 = "------\n**They are already ghosted!**\n------";
                    msgEmbed_1 = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.exposeDataValues().borderColor)
                        .setDescription(msgString_1)
                        .setTimestamp(Date())
                        .setTitle('__**Already Ghosted:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed_1)];
                case 38:
                    msg = _b.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 39:
                    _b.sent();
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            resolve(returnData);
                        })];
                case 40:
                    x += 1;
                    return [3 /*break*/, 37];
                case 41:
                    guildMemberData.exposeDataValues().previousRoleIDs.push(memberRoleManager.highest.id);
                    for (x = 0; x < memberRoleManager.cache.array().length; x += 1) {
                        if (memberRoleManager.cache.array()[x].id === memberRoleManager.highest.id) {
                            continue;
                        }
                        if (memberRoleManager.cache.array()[x].name !== '@everyone' && memberRoleManager.cache.array()[x].name !== 'general'
                            && memberRoleManager.cache.array()[x].id !== memberRoleManager.highest.id) {
                            guildMemberData.exposeDataValues().previousRoleIDs.push(memberRoleManager.cache.array()[x].id);
                        }
                    }
                    x = 0;
                    _b.label = 42;
                case 42:
                    if (!(x < guildMemberData.exposeDataValues().previousRoleIDs.length)) return [3 /*break*/, 47];
                    _b.label = 43;
                case 43:
                    _b.trys.push([43, 45, , 46]);
                    return [4 /*yield*/, memberRoleManager.remove(guildMemberData.exposeDataValues().previousRoleIDs[x])];
                case 44:
                    _b.sent();
                    return [3 /*break*/, 46];
                case 45:
                    error_1 = _b.sent();
                    if (error_1.message === 'Missing Permissions') {
                        console.log('Missing Permissions');
                        return [3 /*break*/, 46];
                    }
                    else {
                        console.log(error_1);
                        return [3 /*break*/, 46];
                    }
                    return [3 /*break*/, 46];
                case 46:
                    x += 1;
                    return [3 /*break*/, 42];
                case 47:
                    x = 0;
                    _b.label = 48;
                case 48:
                    if (!(x < channelsArray.length)) return [3 /*break*/, 53];
                    currentChannel = channelsArray[x];
                    currentChannelOverwritesArray = currentChannel.permissionOverwrites.array();
                    y = 0;
                    _b.label = 49;
                case 49:
                    if (!(y < currentChannelOverwritesArray.length)) return [3 /*break*/, 52];
                    if (!(currentChannelOverwritesArray[y].id === currentGuildMember.id)) return [3 /*break*/, 51];
                    permOWs = {
                        channel: currentChannel,
                        type: 'member',
                        id: currentGuildMember.id,
                        allow: currentChannelOverwritesArray[y].allow.toArray(),
                        deny: currentChannelOverwritesArray[y].deny.toArray()
                    };
                    guildMemberData.exposeDataValues().previousPermissionOverwrites
                        .push(permOWs);
                    return [4 /*yield*/, currentChannelOverwritesArray[y].delete()];
                case 50:
                    _b.sent();
                    _b.label = 51;
                case 51:
                    y += 1;
                    return [3 /*break*/, 49];
                case 52:
                    x += 1;
                    return [3 /*break*/, 48];
                case 53: return [4 /*yield*/, guildMemberData.writeToDataBase()];
                case 54:
                    _b.sent();
                    if (currentGuildMember.voice.channel) {
                        currentGuildMember.voice.kick();
                    }
                    return [4 /*yield*/, memberRoleManager.add(ghostedRole.id)];
                case 55:
                    _b.sent();
                    msgString = "------\n**Hello! You've been REDACTED, on the server " + commandData.guild.name + ",\n            for the following reason(s):\t" + ghostReason + "\n Please, contact a moderator or admin to clear this issue up! Thanks!**\n------";
                    msgEmbed = new Discord.MessageEmbed();
                    msgEmbed
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.exposeDataValues().borderColor)
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**You\'ve been ghosted:**__');
                    return [4 /*yield*/, currentGuildMember.createDM(true)];
                case 56:
                    dmChannel = _b.sent();
                    dmChannel.send(msgEmbed);
                    msgString2 = "------\n__Hello! You've ghosted the following member__: <@!" + guildMemberData.exposeDataValues().id + "> (" + guildMemberData.exposeDataValues().userName + ")\n------";
                    msgEmbed2 = new Discord.MessageEmbed();
                    msgEmbed2
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.exposeDataValues().borderColor)
                        .setDescription(msgString2)
                        .setTimestamp(Date())
                        .setTitle('__**New Server Member Ghosted:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed2)];
                case 57:
                    _b.sent();
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            resolve(returnData);
                        })];
                case 58:
                    if (!(whatAreWeDoing === 'remove')) return [3 /*break*/, 76];
                    isItFound = false;
                    for (x = 0; x < ghostedUserArray.length; x += 1) {
                        if (currentGuildMember.id === ghostedUserArray[x].id) {
                            isItFound = true;
                            break;
                        }
                    }
                    if (!(isItFound === false)) return [3 /*break*/, 61];
                    msgString_2 = "-------\n**Sorry, but that user is not currently ghosted!**\n------";
                    msgEmbed_2 = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.exposeDataValues().borderColor)
                        .setDescription(msgString_2)
                        .setTimestamp(Date())
                        .setTitle('__**Not Ghosted:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed_2)];
                case 59:
                    msg = _b.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 60:
                    _b.sent();
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            resolve(returnData);
                        })];
                case 61:
                    x = 0;
                    _b.label = 62;
                case 62:
                    if (!(x < guildMemberData.exposeDataValues().previousRoleIDs.length)) return [3 /*break*/, 67];
                    _b.label = 63;
                case 63:
                    _b.trys.push([63, 65, , 66]);
                    return [4 /*yield*/, memberRoleManager.add(guildMemberData.exposeDataValues().previousRoleIDs[x])];
                case 64:
                    _b.sent();
                    return [3 /*break*/, 66];
                case 65:
                    error_2 = _b.sent();
                    if (error_2.message === 'Missing Permissions') {
                        return [3 /*break*/, 66];
                    }
                    return [3 /*break*/, 66];
                case 66:
                    x += 1;
                    return [3 /*break*/, 62];
                case 67:
                    x = 0;
                    _b.label = 68;
                case 68:
                    if (!(x < channelsArray.length)) return [3 /*break*/, 71];
                    currentChannel = channelsArray[x];
                    currentChannelOverwritesArray = currentChannel.permissionOverwrites.array();
                    for (z = 0; z < guildMemberData.exposeDataValues().previousPermissionOverwrites.length; z += 1) {
                        if ((guildMemberData.exposeDataValues().previousPermissionOverwrites[z])
                            .channel.id === channelsArray[x].id) {
                            currentChannelOverwritesArray.push(guildMemberData.exposeDataValues().previousPermissionOverwrites[z]);
                        }
                    }
                    return [4 /*yield*/, currentChannel.overwritePermissions(currentChannelOverwritesArray)];
                case 69:
                    _b.sent();
                    _b.label = 70;
                case 70:
                    x += 1;
                    return [3 /*break*/, 68];
                case 71:
                    guildMemberData.exposeDataValues().previousPermissionOverwrites = [];
                    guildMemberData.exposeDataValues().previousRoleIDs = [];
                    return [4 /*yield*/, guildMemberData.writeToDataBase()];
                case 72:
                    _b.sent();
                    return [4 /*yield*/, memberRoleManager.remove(ghostedRole.id)];
                case 73:
                    _b.sent();
                    msgString = '------\n**Hello! You\'ve had your redacted status removed! Have a great day!**\n------';
                    msgEmbed = new Discord.MessageEmbed();
                    msgEmbed
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.exposeDataValues().borderColor)
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**You\'ve been un-ghosted:**__');
                    return [4 /*yield*/, currentGuildMember.createDM(true)];
                case 74:
                    dmChannel = _b.sent();
                    dmChannel.send(msgEmbed);
                    msgString2 = "------\n__Hello! You've un-ghosted the following member__: <@!" + guildMemberData.exposeDataValues().id + "> (" + guildMemberData.exposeDataValues().userName + ")\n------";
                    msgEmbed2 = new Discord.MessageEmbed();
                    msgEmbed2
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.exposeDataValues().borderColor)
                        .setDescription(msgString2)
                        .setTimestamp(Date())
                        .setTitle('__**New Server Member Un-Ghosted:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed2)];
                case 75:
                    _b.sent();
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            resolve(returnData);
                        })];
                case 76: return [2 /*return*/, new Promise(function (resolve, reject) {
                        resolve(returnData);
                    })];
                case 77:
                    error_3 = _b.sent();
                    if (!(error_3.message === 'Missing Permissions')) return [3 /*break*/, 79];
                    msgString = "------\n**I need more permissions! Please promote my role rank in the server options!**\n------";
                    msgEmbed = new Discord.MessageEmbed();
                    msgEmbed
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.exposeDataValues().borderColor)
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Permissions Issue:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 78:
                    _b.sent();
                    console.log(error_3);
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            resolve(returnData);
                        })];
                case 79: return [2 /*return*/, new Promise(function (resolve, reject) {
                        reject(error_3);
                    })];
                case 80: return [2 /*return*/];
            }
        });
    });
}
command.function = execute;
exports.default = command;
