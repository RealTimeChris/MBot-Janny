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
Object.defineProperty(exports, "__esModule", { value: true });
var Discord = require("discord.js");
var DiscordStuff = require("../DiscordStuff");
var command = new DiscordStuff.BotCommand;
command.name = 'ghost';
command.description = ' THIS WILL COMPLETELY SILENCE AND MUTE THE USER ACROSS THE SERVER!\n!ghost to display a list of all currently ghosted users.\n!ghost = add, REASON, '
    + '@USERMENTION to ghost a new user.\n!ghost = remove, @USERMENTION to unghost a user.';
function execute(commandData, discordUser) {
    var _a, _b, _c, _d, _e, _f, _g;
    return __awaiter(this, void 0, void 0, function () {
        var returnData, areWeInADM, doWeHaveAdminPerms, whatAreWeDoing, userMentionRegExp, userIDRegExp, ghostReason, userID, msgString, msgEmbed, msgString, msgEmbed, msgString, msgEmbed, msgString, msgEmbed, msgString, msgEmbed, msgString, msgEmbed, argOne, argTwo, userIDRaw, argOne, userIDRaw, guildData, currentGuildMember, guildMemberData, channelsArray, roleManager, ghostedRole, memberRoleManager, memberRoleManagerBot, x, voicePermissionOptions, textPermissionOptions, currentChannel, isItFound, currentChannelPerms, y, currentOverwritesArray, currentChannel, isItFound1, isItFound2, currentChannelPerms, y, argOne, currentOverwritesArray, ghostedUserArray, x, msgString, x, msgEmbed, x, msgString_1, msgEmbed_1, x, x, error_1, x, currentChannel, currentChannelOverwritesArray, y, permOWs, msgString, msgEmbed, dmChannel, msgString2, msgEmbed2, isItFound, x, x, error_2, x, currentChannel, currentChannelOverwritesArray, z, msgString, msgEmbed, dmChannel, msgString2, msgEmbed2, error_3;
        return __generator(this, function (_h) {
            switch (_h.label) {
                case 0:
                    returnData = new DiscordStuff.CommandReturnData();
                    returnData.commandName = command.name;
                    _h.label = 1;
                case 1:
                    _h.trys.push([1, 71, , 74]);
                    return [4 /*yield*/, DiscordStuff.areWeInADM(commandData)];
                case 2:
                    areWeInADM = _h.sent();
                    if (areWeInADM) {
                        return [2 /*return*/, returnData];
                    }
                    return [4 /*yield*/, discordUser.doWeHaveAdminPermission(commandData)];
                case 3:
                    doWeHaveAdminPerms = _h.sent();
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
                    return [3 /*break*/, 17];
                case 4:
                    if (!(commandData.args[0] !== undefined && commandData.args[0].toString().toLowerCase() !== 'add' && commandData.args[0].toString().toLowerCase() !== 'remove')) return [3 /*break*/, 6];
                    msgString = "------\n**Please, enter a proper first argument! (!ghost = add, REASON, @USERMENTION to \n                ghost a new user, !ghost = remove, @USERMENTION to unghost a user)**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor((_a = commandData.guildMember) === null || _a === void 0 ? void 0 : _a.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Missing Or Invalid Arguments:**__');
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 5:
                    _h.sent();
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            resolve(returnData);
                        })];
                case 6:
                    if (!(commandData.args[0] !== undefined && commandData.args[0].toString().toLowerCase() === 'add' && commandData.args[1] === undefined)) return [3 /*break*/, 8];
                    msgString = "------\n**Please, enter a reason for this ghosting! (!ghost = add, REASON, @USERMENTION to \n                ghost a new user, !ghost = remove, @USERMENTION to unghost a user)**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor((_b = commandData.guildMember) === null || _b === void 0 ? void 0 : _b.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Missing Or Invalid Arguments:**__');
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 7:
                    _h.sent();
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            resolve(returnData);
                        })];
                case 8:
                    if (!(commandData.args[0] !== undefined && commandData.args[0].toString().toLowerCase() === 'add' && commandData.args[2] === undefined)) return [3 /*break*/, 10];
                    msgString = "------\n**Please, enter a usermention to select the target to ghost! (!ghost = add, REASON, \n                @USERMENTION to ghost a new user, !ghost = remove, @USERMENTION to unghost a user)**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor((_c = commandData.guildMember) === null || _c === void 0 ? void 0 : _c.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Missing Or Invalid Arguments:**__');
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 9:
                    _h.sent();
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            resolve(returnData);
                        })];
                case 10:
                    if (!(commandData.args[0] !== undefined && commandData.args[0].toString().toLowerCase() === 'remove' && commandData.args[1] === undefined)) return [3 /*break*/, 12];
                    msgString = "------\n**Please, enter a usermention to select the target to de-ghost!\n                (!ghost = remove, @USERMENTION to unghost a user)**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor((_d = commandData.guildMember) === null || _d === void 0 ? void 0 : _d.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Missing Or Invalid Arguments:**__');
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 11:
                    _h.sent();
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            resolve(returnData);
                        })];
                case 12:
                    if (!(commandData.args[0] !== undefined && commandData.args[0].toString().toLowerCase() === 'add' && !userMentionRegExp.test((commandData.args[2])) && !userIDRegExp.test(commandData.args[2]))) return [3 /*break*/, 14];
                    msgString = "------\n**Please, enter a usermention to select the target to ghost! (!ghost = add, REASON, \n                @USERMENTION to ghost a new user, !ghost = remove, @USERMENTION to unghost a user)**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor((_e = commandData.guildMember) === null || _e === void 0 ? void 0 : _e.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Missing Or Invalid Arguments:**__');
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 13:
                    _h.sent();
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            resolve(returnData);
                        })];
                case 14:
                    if (!(commandData.args[0] !== undefined && commandData.args[0].toString().toLowerCase() === 'remove' && !userMentionRegExp.test((commandData.args[1])) && !userIDRegExp.test(commandData.args[1]))) return [3 /*break*/, 16];
                    msgString = "------\n**Please, enter a proper usermention to select the target to de-ghost! \n                (!ghost = remove, @USERMENTION to unghost a user)**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor((_f = commandData.guildMember) === null || _f === void 0 ? void 0 : _f.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Missing Or Invalid Arguments:**__');
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 15:
                    _h.sent();
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            resolve(returnData);
                        })];
                case 16:
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
                    _h.label = 17;
                case 17: return [4 /*yield*/, discordUser.getGuildDataFromDB(commandData.guild)];
                case 18:
                    guildData = _h.sent();
                    return [4 /*yield*/, commandData.guild.members.fetch(userID)];
                case 19:
                    currentGuildMember = _h.sent();
                    return [4 /*yield*/, discordUser.getGuildMemberDataFromDB(currentGuildMember)];
                case 20:
                    guildMemberData = _h.sent();
                    channelsArray = commandData.guild.channels.cache.array();
                    roleManager = new Discord.RoleManager(commandData.guild);
                    return [4 /*yield*/, roleManager.fetch(guildData.ghostedRoleID)];
                case 21:
                    ghostedRole = _h.sent();
                    memberRoleManager = new Discord.GuildMemberRoleManager(currentGuildMember);
                    memberRoleManagerBot = new Discord.GuildMemberRoleManager(commandData.guildMember);
                    if (!!(ghostedRole instanceof Discord.Role)) return [3 /*break*/, 24];
                    return [4 /*yield*/, roleManager.create({
                            data: {
                                position: memberRoleManagerBot.highest.position - 1, color: 'FF3333', mentionable: true, name: 'Ghosted',
                            },
                        })];
                case 22:
                    ghostedRole = _h.sent();
                    guildData.ghostedRoleID = ghostedRole.id;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 23:
                    _h.sent();
                    _h.label = 24;
                case 24:
                    if (!(whatAreWeDoing === 'add' || whatAreWeDoing === 'remove')) return [3 /*break*/, 30];
                    x = 0;
                    _h.label = 25;
                case 25:
                    if (!(x < channelsArray.length)) return [3 /*break*/, 30];
                    voicePermissionOptions = new DiscordStuff.PermissionOverwrites(commandData.guild);
                    voicePermissionOptions.channel = null;
                    voicePermissionOptions.id = guildData.ghostedRoleID;
                    voicePermissionOptions.type = 'role';
                    voicePermissionOptions.allow = ['VIEW_CHANNEL'];
                    voicePermissionOptions.deny = ['ADMINISTRATOR', 'CREATE_INSTANT_INVITE', 'KICK_MEMBERS', 'BAN_MEMBERS',
                        'MANAGE_CHANNELS', 'MANAGE_GUILD', 'VIEW_AUDIT_LOG', 'PRIORITY_SPEAKER', 'STREAM', 'VIEW_GUILD_INSIGHTS',
                        'CONNECT', 'SPEAK', 'MUTE_MEMBERS', 'DEAFEN_MEMBERS', 'MOVE_MEMBERS', 'USE_VAD', 'CHANGE_NICKNAME', 'MANAGE_NICKNAMES',
                        'MANAGE_ROLES', 'MANAGE_WEBHOOKS', 'MANAGE_EMOJIS'];
                    textPermissionOptions = new DiscordStuff.PermissionOverwrites(commandData.guild);
                    textPermissionOptions.channel = null;
                    textPermissionOptions.id = guildData.ghostedRoleID;
                    textPermissionOptions.type = 'role';
                    textPermissionOptions.allow = ['VIEW_CHANNEL', 'READ_MESSAGE_HISTORY'];
                    textPermissionOptions.deny = ['ADMINISTRATOR', 'CREATE_INSTANT_INVITE', 'KICK_MEMBERS', 'BAN_MEMBERS',
                        'MANAGE_CHANNELS', 'MANAGE_GUILD', 'ADD_REACTIONS', 'VIEW_AUDIT_LOG', 'SEND_MESSAGES',
                        'SEND_TTS_MESSAGES', 'MANAGE_MESSAGES', 'EMBED_LINKS', 'ATTACH_FILES', 'MENTION_EVERYONE', 'USE_EXTERNAL_EMOJIS',
                        'VIEW_GUILD_INSIGHTS', 'CHANGE_NICKNAME', 'MANAGE_NICKNAMES', 'MANAGE_ROLES',
                        'MANAGE_WEBHOOKS', 'MANAGE_EMOJIS'];
                    if (!(channelsArray[x].type === 'voice')) return [3 /*break*/, 27];
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
                case 26:
                    _h.sent();
                    return [3 /*break*/, 29];
                case 27:
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
                case 28:
                    _h.sent();
                    _h.label = 29;
                case 29:
                    x += 1;
                    return [3 /*break*/, 25];
                case 30:
                    ghostedUserArray = [];
                    for (x = 0; x < ghostedRole.members.array().length; x += 1) {
                        ghostedUserArray.push(ghostedRole.members.array()[x]);
                    }
                    if (!(whatAreWeDoing === 'viewing')) return [3 /*break*/, 32];
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
                        .setColor([0, 0, 255])
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Currently Ghosted Members:**__');
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 31:
                    _h.sent();
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            resolve(returnData);
                        })];
                case 32:
                    if (!(whatAreWeDoing === 'add')) return [3 /*break*/, 53];
                    x = 0;
                    _h.label = 33;
                case 33:
                    if (!(x < ghostedUserArray.length)) return [3 /*break*/, 36];
                    if (!(currentGuildMember.id === ghostedUserArray[x].id)) return [3 /*break*/, 35];
                    msgString_1 = "------\n**They are already ghosted!**\n------";
                    msgEmbed_1 = new Discord.MessageEmbed()
                        .setAuthor((_g = commandData.guildMember) === null || _g === void 0 ? void 0 : _g.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString_1)
                        .setTimestamp(Date())
                        .setTitle('__**Already Ghosted:**__');
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed_1)];
                case 34:
                    _h.sent();
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            resolve(returnData);
                        })];
                case 35:
                    x += 1;
                    return [3 /*break*/, 33];
                case 36:
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
                    _h.label = 37;
                case 37:
                    if (!(x < guildMemberData.previousRoleIDs.length)) return [3 /*break*/, 42];
                    _h.label = 38;
                case 38:
                    _h.trys.push([38, 40, , 41]);
                    return [4 /*yield*/, memberRoleManager.remove(guildMemberData.previousRoleIDs[x])];
                case 39:
                    _h.sent();
                    return [3 /*break*/, 41];
                case 40:
                    error_1 = _h.sent();
                    if (error_1.message === 'Missing Permissions') {
                        console.log('Missing Permissions');
                        return [3 /*break*/, 41];
                    }
                    else {
                        console.log(error_1);
                        return [3 /*break*/, 41];
                    }
                    return [3 /*break*/, 41];
                case 41:
                    x += 1;
                    return [3 /*break*/, 37];
                case 42:
                    x = 0;
                    _h.label = 43;
                case 43:
                    if (!(x < channelsArray.length)) return [3 /*break*/, 48];
                    currentChannel = channelsArray[x];
                    currentChannelOverwritesArray = currentChannel.permissionOverwrites.array();
                    y = 0;
                    _h.label = 44;
                case 44:
                    if (!(y < currentChannelOverwritesArray.length)) return [3 /*break*/, 47];
                    if (!(currentChannelOverwritesArray[y].id === currentGuildMember.id)) return [3 /*break*/, 46];
                    permOWs = new DiscordStuff
                        .PermissionOverwrites(commandData.guild);
                    permOWs.allow = currentChannelOverwritesArray[y].allow.toArray();
                    permOWs.deny = currentChannelOverwritesArray[y].deny.toArray();
                    permOWs.id = currentGuildMember.id;
                    permOWs.type = 'member';
                    permOWs.channel = currentChannel;
                    guildMemberData.previousPermissionOverwrites
                        .push(permOWs);
                    return [4 /*yield*/, currentChannelOverwritesArray[y].delete()];
                case 45:
                    _h.sent();
                    _h.label = 46;
                case 46:
                    y += 1;
                    return [3 /*break*/, 44];
                case 47:
                    x += 1;
                    return [3 /*break*/, 43];
                case 48: return [4 /*yield*/, discordUser.updateGuildMemberDataInDB(guildMemberData, guildData.guildID)];
                case 49:
                    _h.sent();
                    if (currentGuildMember.voice.channel) {
                        currentGuildMember.voice.kick();
                    }
                    return [4 /*yield*/, memberRoleManager.add(ghostedRole.id)];
                case 50:
                    _h.sent();
                    msgString = "------\n**Hello! You've been REDACTED, on the server " + commandData.guild.name + ",\n            for the following reason(s):\t" + ghostReason + "\n Please, contact a moderator or admin to clear this issue up! Thanks!**\n------";
                    msgEmbed = new Discord.MessageEmbed();
                    msgEmbed
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**You\'ve been ghosted:**__');
                    return [4 /*yield*/, currentGuildMember.createDM(true)];
                case 51:
                    dmChannel = _h.sent();
                    dmChannel.send(msgEmbed);
                    msgString2 = "------\n__Hello! You've ghosted the following member__: <@!" + guildMemberData.userID + "> (" + guildMemberData.userName + ")\n------";
                    msgEmbed2 = new Discord.MessageEmbed();
                    msgEmbed2
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString2)
                        .setTimestamp(Date())
                        .setTitle('__**New Server Member Ghosted:**__');
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed2)];
                case 52:
                    _h.sent();
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            resolve(returnData);
                        })];
                case 53:
                    if (!(whatAreWeDoing === 'remove')) return [3 /*break*/, 70];
                    isItFound = false;
                    for (x = 0; x < ghostedUserArray.length; x += 1) {
                        if (currentGuildMember.id === ghostedUserArray[x].id) {
                            isItFound = true;
                            break;
                        }
                    }
                    if (!(isItFound === false)) return [3 /*break*/, 55];
                    return [4 /*yield*/, commandData.permsChannel.send];
                case 54:
                    (_h.sent()) ? ("<@!" + commandData.guildMember.id + "> Sorry, but that user is not currently ghosted!") : Discord.Message;
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            resolve(returnData);
                        })];
                case 55:
                    x = 0;
                    _h.label = 56;
                case 56:
                    if (!(x < guildMemberData.previousRoleIDs.length)) return [3 /*break*/, 61];
                    _h.label = 57;
                case 57:
                    _h.trys.push([57, 59, , 60]);
                    return [4 /*yield*/, memberRoleManager.add(guildMemberData.previousRoleIDs[x])];
                case 58:
                    _h.sent();
                    return [3 /*break*/, 60];
                case 59:
                    error_2 = _h.sent();
                    if (error_2.message === 'Missing Permissions') {
                        return [3 /*break*/, 60];
                    }
                    return [3 /*break*/, 60];
                case 60:
                    x += 1;
                    return [3 /*break*/, 56];
                case 61:
                    x = 0;
                    _h.label = 62;
                case 62:
                    if (!(x < channelsArray.length)) return [3 /*break*/, 65];
                    currentChannel = channelsArray[x];
                    currentChannelOverwritesArray = currentChannel.permissionOverwrites.array();
                    for (z = 0; z < guildMemberData.previousPermissionOverwrites.length; z += 1) {
                        if (guildMemberData.previousPermissionOverwrites[z]
                            .channel.id === channelsArray[x].id) {
                            currentChannelOverwritesArray.push(guildMemberData.previousPermissionOverwrites[z]);
                        }
                    }
                    return [4 /*yield*/, currentChannel.overwritePermissions(currentChannelOverwritesArray)];
                case 63:
                    _h.sent();
                    _h.label = 64;
                case 64:
                    x += 1;
                    return [3 /*break*/, 62];
                case 65:
                    guildMemberData.previousPermissionOverwrites = [];
                    guildMemberData.previousRoleIDs = [];
                    return [4 /*yield*/, discordUser.updateGuildMemberDataInDB(guildMemberData, guildData.guildID)];
                case 66:
                    _h.sent();
                    return [4 /*yield*/, memberRoleManager.remove(ghostedRole.id)];
                case 67:
                    _h.sent();
                    msgString = '------\n**Hello! You\'ve had your redacted status removed! Have a great day!**\n------';
                    msgEmbed = new Discord.MessageEmbed();
                    msgEmbed
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**You\'ve been un-ghosted:**__');
                    return [4 /*yield*/, currentGuildMember.createDM(true)];
                case 68:
                    dmChannel = _h.sent();
                    dmChannel.send(msgEmbed);
                    msgString2 = "------\n__Hello! You've un-ghosted the following member__: <@!" + guildMemberData.userID + "> (" + guildMemberData.userName + ")\n------";
                    msgEmbed2 = new Discord.MessageEmbed();
                    msgEmbed2
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString2)
                        .setTimestamp(Date())
                        .setTitle('__**New Server Member Un-Ghosted:**__');
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed2)];
                case 69:
                    _h.sent();
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            resolve(returnData);
                        })];
                case 70: return [2 /*return*/, new Promise(function (resolve, reject) {
                        resolve(returnData);
                    })];
                case 71:
                    error_3 = _h.sent();
                    if (!(error_3.message === 'Missing Permissions')) return [3 /*break*/, 73];
                    return [4 /*yield*/, commandData.permsChannel.send("<@!" + commandData.guildMember.id + "> I need more permissions! Please promote my role rank in the server options!")];
                case 72:
                    _h.sent();
                    console.log(error_3);
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            resolve(returnData);
                        })];
                case 73: return [2 /*return*/, new Promise(function (resolve, reject) {
                        reject(error_3);
                    })];
                case 74: return [2 /*return*/];
            }
        });
    });
}
command.function = execute;
exports.default = command;
