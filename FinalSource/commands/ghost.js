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
    return __awaiter(this, void 0, void 0, function () {
        var returnData, doWeHaveAdminPerms, whatAreWeDoing, userMentionRegExp, userIDRegExp, ghostReason, userID, argOne, argTwo, userIDRaw, argOne, userIDRaw, guildData, currentGuildMember, guildMemberData, channelsArray, roleManager, ghostedRole, memberRoleManager, memberRoleManagerBot, x, voicePermissionOptions, textPermissionOptions, currentChannel, isItFound, currentChannelPerms, y, currentOverwritesArray, currentChannel, isItFound1, isItFound2, currentChannelPerms, y, argOne, currentOverwritesArray, ghostedUserArray, x, msgString, x, msgEmbed, x, x, x, error_1, x, currentChannel, currentChannelOverwritesArray, y, permOWs, msgString, msgEmbed, dmChannel, msgString2, msgEmbed2, isItFound, x, x, error_2, x, currentChannel, currentChannelOverwritesArray, z, msgString, msgEmbed, dmChannel, msgString2, msgEmbed2, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    returnData = new DiscordStuff.CommandReturnData();
                    returnData.commandName = command.name;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 46, , 49]);
                    return [4 /*yield*/, discordUser.doWeHaveAdminPermission(commandData.guildMember, commandData.textChannel)];
                case 2:
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
                    if (commandData.args[0] === '' || commandData.args[0] === undefined) {
                        whatAreWeDoing = 'viewing';
                        userID = commandData.guildMember.id;
                    }
                    else if (commandData.args[0] !== undefined && commandData.args[0].toString().toLowerCase() !== 'add' && commandData.args[0].toString().toLowerCase() !== 'remove') {
                        returnData.returnMessage = "<@!" + commandData.guildMember.id + ">1 Please, enter a proper first argument! (!ghost = add, REASON, @USERMENTION to \n                ghost a new user, !ghost = remove, @USERMENTION to unghost a user)";
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                resolve(returnData);
                            })];
                    }
                    else if (commandData.args[0] !== undefined && commandData.args[0].toString().toLowerCase() === 'add' && commandData.args[1] === undefined) {
                        returnData.returnMessage = "<@!" + commandData.guildMember.id + "> 2Please, enter a reason for this ghosting! (!ghost = add, REASON, @USERMENTION to \n                ghost a new user, !ghost = remove, @USERMENTION to unghost a user)";
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                resolve(returnData);
                            })];
                    }
                    else if (commandData.args[0] !== undefined && commandData.args[0].toString().toLowerCase() === 'add' && commandData.args[2] === undefined) {
                        returnData.returnMessage = "<@!" + commandData.guildMember.id + "> 3Please, enter a usermention to select the target to ghost! (!ghost = add, REASON, \n                @USERMENTION to ghost a new user, !ghost = remove, @USERMENTION to unghost a user)";
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                resolve(returnData);
                            })];
                    }
                    else if (commandData.args[0] !== undefined && commandData.args[0].toString().toLowerCase() === 'remove' && commandData.args[1] === undefined) {
                        returnData.returnMessage = "<@!" + commandData.guildMember.id + "> 4Please, enter a usermention to select the target to de-ghost! (!ghost = remove, @USERMENTION to unghost a user)";
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                resolve(returnData);
                            })];
                    }
                    else if (commandData.args[0] !== undefined && commandData.args[0].toString().toLowerCase() === 'add' && !userMentionRegExp.test((commandData.args[2])) && !userIDRegExp.test(commandData.args[2])) {
                        returnData.returnMessage = "<@!" + commandData.guildMember.id + "> 5Please, enter a usermention to select the target to ghost! (!ghost = add, REASON, \n                @USERMENTION to ghost a new user, !ghost = remove, @USERMENTION to unghost a user)";
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                resolve(returnData);
                            })];
                    }
                    else if (commandData.args[0] !== undefined && commandData.args[0].toString().toLowerCase() === 'remove' && !userMentionRegExp.test((commandData.args[1])) && !userIDRegExp.test(commandData.args[1])) {
                        returnData.returnMessage = "<@!" + commandData.guildMember.id + "> 6Please, enter a proper usermention to select the target to de-ghost! (!ghost = remove, @USERMENTION to unghost a user)";
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                resolve(returnData);
                            })];
                    }
                    else if (commandData.args[0] !== undefined && commandData.args[0].toString().toLowerCase() === 'add') {
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
                    return [4 /*yield*/, discordUser.getGuildDataFromDB(commandData.guild)];
                case 3:
                    guildData = _a.sent();
                    return [4 /*yield*/, commandData.guild.members.fetch(userID)];
                case 4:
                    currentGuildMember = _a.sent();
                    return [4 /*yield*/, discordUser.getGuildMemberDataFromDB(currentGuildMember)];
                case 5:
                    guildMemberData = _a.sent();
                    channelsArray = commandData.guild.channels.cache.array();
                    roleManager = new Discord.RoleManager(commandData.guild);
                    return [4 /*yield*/, roleManager.fetch(guildData.ghostedRoleID)];
                case 6:
                    ghostedRole = _a.sent();
                    memberRoleManager = new Discord.GuildMemberRoleManager(currentGuildMember);
                    memberRoleManagerBot = new Discord.GuildMemberRoleManager(commandData.guildMember);
                    if (!!(ghostedRole instanceof Discord.Role)) return [3 /*break*/, 9];
                    return [4 /*yield*/, roleManager.create({
                            data: {
                                position: memberRoleManagerBot.highest.position - 1, color: 'FF3333', mentionable: true, name: 'Ghosted',
                            },
                        })];
                case 7:
                    ghostedRole = _a.sent();
                    guildData.ghostedRoleID = ghostedRole.id;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 8:
                    _a.sent();
                    _a.label = 9;
                case 9:
                    if (!(whatAreWeDoing === 'add' || whatAreWeDoing === 'remove')) return [3 /*break*/, 15];
                    x = 0;
                    _a.label = 10;
                case 10:
                    if (!(x < channelsArray.length)) return [3 /*break*/, 15];
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
                    if (!(channelsArray[x].type === 'voice')) return [3 /*break*/, 12];
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
                case 11:
                    _a.sent();
                    return [3 /*break*/, 14];
                case 12:
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
                case 13:
                    _a.sent();
                    _a.label = 14;
                case 14:
                    x += 1;
                    return [3 /*break*/, 10];
                case 15:
                    ghostedUserArray = [];
                    for (x = 0; x < ghostedRole.members.array().length; x += 1) {
                        ghostedUserArray.push(ghostedRole.members.array()[x]);
                    }
                    if (whatAreWeDoing === 'viewing') {
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
                        returnData.returnMessage = msgEmbed;
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                resolve(returnData);
                            })];
                    }
                    if (!(whatAreWeDoing === 'add')) return [3 /*break*/, 31];
                    for (x = 0; x < ghostedUserArray.length; x += 1) {
                        if (currentGuildMember.id === ghostedUserArray[x].id) {
                            returnData.returnMessage = "<@!" + commandData.guildMember.id + "> They are already ghosted!";
                            return [2 /*return*/, new Promise(function (resolve, reject) {
                                    resolve(returnData);
                                })];
                        }
                    }
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
                    _a.label = 16;
                case 16:
                    if (!(x < guildMemberData.previousRoleIDs.length)) return [3 /*break*/, 21];
                    _a.label = 17;
                case 17:
                    _a.trys.push([17, 19, , 20]);
                    return [4 /*yield*/, memberRoleManager.remove(guildMemberData.previousRoleIDs[x])];
                case 18:
                    _a.sent();
                    return [3 /*break*/, 20];
                case 19:
                    error_1 = _a.sent();
                    if (error_1.message === 'Missing Permissions') {
                        console.log('Missing Permissions');
                        return [3 /*break*/, 20];
                    }
                    else {
                        console.log(error_1);
                        return [3 /*break*/, 20];
                    }
                    return [3 /*break*/, 20];
                case 20:
                    x += 1;
                    return [3 /*break*/, 16];
                case 21:
                    x = 0;
                    _a.label = 22;
                case 22:
                    if (!(x < channelsArray.length)) return [3 /*break*/, 27];
                    currentChannel = channelsArray[x];
                    currentChannelOverwritesArray = currentChannel.permissionOverwrites.array();
                    y = 0;
                    _a.label = 23;
                case 23:
                    if (!(y < currentChannelOverwritesArray.length)) return [3 /*break*/, 26];
                    if (!(currentChannelOverwritesArray[y].id === currentGuildMember.id)) return [3 /*break*/, 25];
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
                case 24:
                    _a.sent();
                    _a.label = 25;
                case 25:
                    y += 1;
                    return [3 /*break*/, 23];
                case 26:
                    x += 1;
                    return [3 /*break*/, 22];
                case 27: return [4 /*yield*/, discordUser.updateGuildMemberDataInDB(guildMemberData, guildData.guildID)];
                case 28:
                    _a.sent();
                    if (currentGuildMember.voice.channel) {
                        currentGuildMember.voice.kick();
                    }
                    return [4 /*yield*/, memberRoleManager.add(ghostedRole.id)];
                case 29:
                    _a.sent();
                    msgString = "------\n**Hello! You've been REDACTED, on the server " + commandData.guild.name + ",\n            for the following reason(s):\t" + ghostReason + "\n Please, contact a moderator or admin to clear this issue up! Thanks!**\n------";
                    msgEmbed = new Discord.MessageEmbed();
                    msgEmbed
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**You\'ve been ghosted:**__');
                    return [4 /*yield*/, currentGuildMember.createDM(true)];
                case 30:
                    dmChannel = _a.sent();
                    dmChannel.send(msgEmbed);
                    msgString2 = "------\n__Hello! You've ghosted the following member__: <@!" + guildMemberData.userID + "> (" + guildMemberData.userName + ")\n------";
                    msgEmbed2 = new Discord.MessageEmbed();
                    msgEmbed2
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString2)
                        .setTimestamp(Date())
                        .setTitle('__**New Server Member Ghosted:**__');
                    //await (commandData.textChannel as Discord.TextChannel).send(msgEmbed2);
                    returnData.returnMessage = msgEmbed2;
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            resolve(returnData);
                        })];
                case 31:
                    if (!(whatAreWeDoing === 'remove')) return [3 /*break*/, 45];
                    isItFound = false;
                    for (x = 0; x < ghostedUserArray.length; x += 1) {
                        if (currentGuildMember.id === ghostedUserArray[x].id) {
                            isItFound = true;
                            break;
                        }
                    }
                    if (isItFound === false) {
                        returnData.returnMessage = "<@!" + commandData.guildMember.id + "> Sorry, but that user is not currently ghosted!";
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                resolve(returnData);
                            })];
                    }
                    x = 0;
                    _a.label = 32;
                case 32:
                    if (!(x < guildMemberData.previousRoleIDs.length)) return [3 /*break*/, 37];
                    _a.label = 33;
                case 33:
                    _a.trys.push([33, 35, , 36]);
                    return [4 /*yield*/, memberRoleManager.add(guildMemberData.previousRoleIDs[x])];
                case 34:
                    _a.sent();
                    return [3 /*break*/, 36];
                case 35:
                    error_2 = _a.sent();
                    if (error_2.message === 'Missing Permissions') {
                        return [3 /*break*/, 36];
                    }
                    return [3 /*break*/, 36];
                case 36:
                    x += 1;
                    return [3 /*break*/, 32];
                case 37:
                    x = 0;
                    _a.label = 38;
                case 38:
                    if (!(x < channelsArray.length)) return [3 /*break*/, 41];
                    currentChannel = channelsArray[x];
                    currentChannelOverwritesArray = currentChannel.permissionOverwrites.array();
                    for (z = 0; z < guildMemberData.previousPermissionOverwrites.length; z += 1) {
                        if (guildMemberData.previousPermissionOverwrites[z]
                            .channel.id === channelsArray[x].id) {
                            currentChannelOverwritesArray.push(guildMemberData.previousPermissionOverwrites[z]);
                        }
                    }
                    return [4 /*yield*/, currentChannel.overwritePermissions(currentChannelOverwritesArray)];
                case 39:
                    _a.sent();
                    _a.label = 40;
                case 40:
                    x += 1;
                    return [3 /*break*/, 38];
                case 41:
                    guildMemberData.previousPermissionOverwrites = [];
                    guildMemberData.previousRoleIDs = [];
                    return [4 /*yield*/, discordUser.updateGuildMemberDataInDB(guildMemberData, guildData.guildID)];
                case 42:
                    _a.sent();
                    return [4 /*yield*/, memberRoleManager.remove(ghostedRole.id)];
                case 43:
                    _a.sent();
                    msgString = '------\n**Hello! You\'ve had your redacted status removed! Have a great day!**\n------';
                    msgEmbed = new Discord.MessageEmbed();
                    msgEmbed
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**You\'ve been un-ghosted:**__');
                    return [4 /*yield*/, currentGuildMember.createDM(true)];
                case 44:
                    dmChannel = _a.sent();
                    dmChannel.send(msgEmbed);
                    msgString2 = "------\n__Hello! You've un-ghosted the following member__: <@!" + guildMemberData.userID + "> (" + guildMemberData.userName + ")\n------";
                    msgEmbed2 = new Discord.MessageEmbed();
                    msgEmbed2
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString2)
                        .setTimestamp(Date())
                        .setTitle('__**New Server Member Un-Ghosted:**__');
                    //await (commandData.textChannel as Discord.TextChannel).send(msgEmbed2);
                    returnData.returnMessage = msgEmbed2;
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            resolve(returnData);
                        })];
                case 45: return [2 /*return*/, new Promise(function (resolve, reject) {
                        resolve(returnData);
                    })];
                case 46:
                    error_3 = _a.sent();
                    if (!(error_3.message === 'Missing Permissions')) return [3 /*break*/, 48];
                    return [4 /*yield*/, commandData.textChannel.send("<@!" + commandData.guildMember.id + "> I need more permissions! Please promote my role rank in the server options!")];
                case 47:
                    _a.sent();
                    console.log(error_3);
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            resolve(returnData);
                        })];
                case 48: return [2 /*return*/, new Promise(function (resolve, reject) {
                        reject(error_3);
                    })];
                case 49: return [2 /*return*/];
            }
        });
    });
}
command.function = execute;
exports.default = command;
