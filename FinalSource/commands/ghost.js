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
exports.execute = void 0;
var Discord = require("discord.js");
var DiscordStuff = require("../DiscordStuff");
var command = new DiscordStuff.BotCommand;
command.name = 'ghost';
command.description = ' THIS WILL COMPLETELY SILENCE AND MUTE THE USER ACROSS THE SERVER!\n!ghost to display a list of all currently ghosted users.\n!ghost = add, REASON, '
    + '@USERMENTION to ghost a new user.\n!ghost = remove, @USERMENTION to unghost a user.';
/**
 * @param {Discord.Message} 			message
 * @param {String[]} 					args
 * @param {DiscordStuff.DiscordUser}	discordUser
 * @returns {Prmoise<string>}
 */
function execute(message, args, discordUser) {
    return __awaiter(this, void 0, void 0, function () {
        var doWeHaveAdminPerms, whatAreWeDoing, userIDRegExp, ghostReason, userID, argOne, argTwo, userIDRaw, argOne, userIDRaw, guildData, currentGuildMember, guildMemberData, channelsArray, roleManager, ghostedRole, memberRoleManager, memberRoleManagerBot, x, voicePermissionOptions, textPermissionOptions, currentChannel, isItFound, currentChannelPerms, y, currentOverwritesArray, currentChannel, isItFound1, isItFound2, currentChannelPerms, y, argOne, currentOverwritesArray, ghostedUserArray, x, msgString, x, msgEmbed, x, x, x, error_1, x, currentChannel, currentChannelOverwritesArray, y, permOWs, msgString, msgEmbed, dmChannel, msgString2, msgEmbed2, isItFound, x, x, error_2, x, currentChannel, currentChannelOverwritesArray, z, msgString, msgEmbed, dmChannel, msgString2, msgEmbed2, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 82, , 87]);
                    return [4 /*yield*/, DiscordStuff.doWeHaveAdminPermission(message, discordUser)];
                case 1:
                    doWeHaveAdminPerms = _a.sent();
                    if (!doWeHaveAdminPerms) {
                        return [2 /*return*/, command.name];
                    }
                    whatAreWeDoing = void 0;
                    userIDRegExp = /<@!\d{18}>/;
                    ghostReason = void 0;
                    userID = void 0;
                    if (!(args[0] === undefined)) return [3 /*break*/, 2];
                    whatAreWeDoing = 'viewing';
                    userID = message.member.id;
                    return [3 /*break*/, 21];
                case 2:
                    if (!(args[0] !== undefined && args[0].toLowerCase() !== 'add' && args[0].toLowerCase() !== 'remove')) return [3 /*break*/, 5];
                    return [4 /*yield*/, message.reply('Please, enter a proper first argument! (!ghost = add, REASON, @USERMENTION to'
                            + 'ghost a new user, !ghost = remove, @USERMENTION to unghost a user)')];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, message.delete()];
                case 4:
                    _a.sent();
                    return [2 /*return*/, command.name];
                case 5:
                    if (!(args[0] !== undefined && args[0].toLowerCase() === 'add' && args[1] === undefined)) return [3 /*break*/, 8];
                    return [4 /*yield*/, message.reply('Please, enter a reason for this ghosting! (!ghost = add, REASON, @USERMENTION to'
                            + 'ghost a new user, !ghost = remove, @USERMENTION to unghost a user)')];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, message.delete()];
                case 7:
                    _a.sent();
                    return [2 /*return*/, command.name];
                case 8:
                    if (!(args[0] !== undefined && args[0].toLowerCase() === 'add' && args[2] === undefined)) return [3 /*break*/, 11];
                    return [4 /*yield*/, message.reply('Please, enter a usermention to select the target to ghost! (!ghost = add, REASON,'
                            + '@USERMENTION to ghost a new user, !ghost = remove, @USERMENTION to unghost a user)')];
                case 9:
                    _a.sent();
                    return [4 /*yield*/, message.delete()];
                case 10:
                    _a.sent();
                    return [2 /*return*/, command.name];
                case 11:
                    if (!(args[0] !== undefined && args[0].toLowerCase() === 'remove' && args[1] === undefined)) return [3 /*break*/, 14];
                    return [4 /*yield*/, message.reply('Please, enter a usermention to select the target to de-ghost! (!ghost = add, REASON,'
                            + '@USERMENTION to ghost a new user, !ghost = remove, @USERMENTION to unghost a user)')];
                case 12:
                    _a.sent();
                    return [4 /*yield*/, message.delete()];
                case 13:
                    _a.sent();
                    return [2 /*return*/, command.name];
                case 14:
                    if (!(args[0] !== undefined && args[0].toLowerCase() === 'add' && !userIDRegExp.test((args[2])))) return [3 /*break*/, 17];
                    return [4 /*yield*/, message.reply('Please, enter a proper usermention to select the target to ghost! (!ghost = add, REASON,'
                            + '@USERMENTION to ghost a new user, !ghost = remove, @USERMENTION to unghost a user)')];
                case 15:
                    _a.sent();
                    return [4 /*yield*/, message.delete()];
                case 16:
                    _a.sent();
                    return [2 /*return*/, command.name];
                case 17:
                    if (!(args[0] !== undefined && args[0].toLowerCase() === 'remove' && !userIDRegExp.test((args[1])))) return [3 /*break*/, 20];
                    return [4 /*yield*/, message.reply('Please, enter a proper usermention to select the target to de-ghost! (!ghost = add, REASON,'
                            + '@USERMENTION to ghost a new user, !ghost = remove, @USERMENTION to unghost a user)')];
                case 18:
                    _a.sent();
                    return [4 /*yield*/, message.delete()];
                case 19:
                    _a.sent();
                    return [2 /*return*/, command.name];
                case 20:
                    if (args[0] !== undefined && args[0].toLowerCase() === 'add') {
                        whatAreWeDoing = 'add';
                        argOne = args[1];
                        ghostReason = argOne;
                        argTwo = args[2];
                        userIDRaw = argTwo.match(/\d{18}/)[0];
                        userID = userIDRaw;
                    }
                    else if (args[0] !== undefined && args[0].toLowerCase() === 'remove') {
                        whatAreWeDoing = 'remove';
                        argOne = args[1];
                        userIDRaw = argOne.match(/\d{18}/)[0];
                        userID = userIDRaw;
                    }
                    _a.label = 21;
                case 21: return [4 /*yield*/, discordUser.getGuildDataFromDB(message.guild)];
                case 22:
                    guildData = _a.sent();
                    return [4 /*yield*/, message.guild.members.fetch(userID)];
                case 23:
                    currentGuildMember = _a.sent();
                    return [4 /*yield*/, discordUser.getGuildMemberDataFromDB(currentGuildMember)];
                case 24:
                    guildMemberData = _a.sent();
                    return [4 /*yield*/, message.client.guilds.fetch(message.guild.id)];
                case 25:
                    channelsArray = (_a.sent())
                        .channels.cache.array();
                    roleManager = new Discord.RoleManager(message.guild);
                    return [4 /*yield*/, roleManager.fetch(guildData.ghostedRoleID)];
                case 26:
                    ghostedRole = _a.sent();
                    memberRoleManager = new Discord.GuildMemberRoleManager(currentGuildMember);
                    memberRoleManagerBot = new Discord.GuildMemberRoleManager(message.client
                        .guilds.resolve(guildData.guildID).members.resolve(message.client.user.id));
                    if (!!(ghostedRole instanceof Discord.Role)) return [3 /*break*/, 29];
                    return [4 /*yield*/, roleManager.create({
                            data: {
                                position: memberRoleManagerBot.highest.position, color: 'FF3333', mentionable: true, name: 'Ghosted',
                            },
                        })];
                case 27:
                    ghostedRole = _a.sent();
                    guildData.ghostedRoleID = ghostedRole.id;
                    return [4 /*yield*/, discordUser.updateGuildDataInDB(guildData)];
                case 28:
                    _a.sent();
                    _a.label = 29;
                case 29:
                    if (!(whatAreWeDoing === 'add' || whatAreWeDoing === 'remove')) return [3 /*break*/, 35];
                    x = 0;
                    _a.label = 30;
                case 30:
                    if (!(x < channelsArray.length)) return [3 /*break*/, 35];
                    voicePermissionOptions = new DiscordStuff.PermissionOverwrites(message
                        .client.guilds.resolve(guildData.guildID));
                    voicePermissionOptions.channel = null;
                    voicePermissionOptions.id = guildData.ghostedRoleID;
                    voicePermissionOptions.type = 'role';
                    voicePermissionOptions.allow = ['VIEW_CHANNEL'];
                    voicePermissionOptions.deny = ['ADMINISTRATOR', 'CREATE_INSTANT_INVITE', 'KICK_MEMBERS', 'BAN_MEMBERS',
                        'MANAGE_CHANNELS', 'MANAGE_GUILD', 'VIEW_AUDIT_LOG', 'PRIORITY_SPEAKER', 'STREAM', 'VIEW_GUILD_INSIGHTS',
                        'CONNECT', 'SPEAK', 'MUTE_MEMBERS', 'DEAFEN_MEMBERS', 'MOVE_MEMBERS', 'USE_VAD', 'CHANGE_NICKNAME', 'MANAGE_NICKNAMES',
                        'MANAGE_ROLES', 'MANAGE_WEBHOOKS', 'MANAGE_EMOJIS'];
                    textPermissionOptions = new DiscordStuff.PermissionOverwrites(message
                        .client.guilds.resolve(guildData.guildID));
                    textPermissionOptions.channel = null;
                    textPermissionOptions.id = guildData.ghostedRoleID;
                    textPermissionOptions.type = 'role';
                    textPermissionOptions.allow = ['VIEW_CHANNEL', 'READ_MESSAGE_HISTORY'];
                    textPermissionOptions.deny = ['ADMINISTRATOR', 'CREATE_INSTANT_INVITE', 'KICK_MEMBERS', 'BAN_MEMBERS',
                        'MANAGE_CHANNELS', 'MANAGE_GUILD', 'ADD_REACTIONS', 'VIEW_AUDIT_LOG', 'SEND_MESSAGES',
                        'SEND_TTS_MESSAGES', 'MANAGE_MESSAGES', 'EMBED_LINKS', 'ATTACH_FILES', 'MENTION_EVERYONE', 'USE_EXTERNAL_EMOJIS',
                        'VIEW_GUILD_INSIGHTS', 'CHANGE_NICKNAME', 'MANAGE_NICKNAMES', 'MANAGE_ROLES',
                        'MANAGE_WEBHOOKS', 'MANAGE_EMOJIS'];
                    if (!(channelsArray[x].type === 'voice')) return [3 /*break*/, 32];
                    currentChannel = new Discord.VoiceChannel(message.guild, {});
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
                case 31:
                    _a.sent();
                    return [3 /*break*/, 34];
                case 32:
                    currentChannel = new Discord.GuildChannel(message.guild, {});
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
                case 33:
                    _a.sent();
                    _a.label = 34;
                case 34:
                    x += 1;
                    return [3 /*break*/, 30];
                case 35:
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
                    msgEmbed.setAuthor(message.author.username, message.author.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Currently Ghosted Members:**__');
                    return [4 /*yield*/, message.channel.send(msgEmbed)];
                case 36:
                    _a.sent();
                    return [4 /*yield*/, message.delete()];
                case 37:
                    _a.sent();
                    return [2 /*return*/, command.name];
                case 38:
                    if (!(whatAreWeDoing === 'add')) return [3 /*break*/, 61];
                    x = 0;
                    _a.label = 39;
                case 39:
                    if (!(x < ghostedUserArray.length)) return [3 /*break*/, 43];
                    if (!(currentGuildMember.id === ghostedUserArray[x].id)) return [3 /*break*/, 42];
                    return [4 /*yield*/, message.reply('They are already ghosted!')];
                case 40:
                    _a.sent();
                    return [4 /*yield*/, message.delete()];
                case 41:
                    _a.sent();
                    return [2 /*return*/, command.name];
                case 42:
                    x += 1;
                    return [3 /*break*/, 39];
                case 43: return [4 /*yield*/, message.delete()];
                case 44:
                    _a.sent();
                    guildMemberData.previousRoleIDs.push(memberRoleManager.highest.id);
                    for (x = 0; x < memberRoleManager.cache.array().length; x += 1) {
                        if (memberRoleManager.cache.array()[x].id === memberRoleManager.highest.id) {
                            continue;
                        }
                        if (memberRoleManager.cache.array()[x].name !== '@everyone' && memberRoleManager.cache.array()[x].id !== memberRoleManager.highest.id) {
                            guildMemberData.previousRoleIDs.push(memberRoleManager.cache.array()[x].id);
                        }
                    }
                    x = 0;
                    _a.label = 45;
                case 45:
                    if (!(x < guildMemberData.previousRoleIDs.length)) return [3 /*break*/, 50];
                    _a.label = 46;
                case 46:
                    _a.trys.push([46, 48, , 49]);
                    return [4 /*yield*/, memberRoleManager.remove(guildMemberData.previousRoleIDs[x])];
                case 47:
                    _a.sent();
                    return [3 /*break*/, 49];
                case 48:
                    error_1 = _a.sent();
                    if (error_1.message === 'Missing Permissions') {
                        console.log('Missing Permissions');
                        return [3 /*break*/, 49];
                    }
                    else {
                        console.log(error_1);
                        return [3 /*break*/, 49];
                    }
                    return [3 /*break*/, 49];
                case 49:
                    x += 1;
                    return [3 /*break*/, 45];
                case 50:
                    x = 0;
                    _a.label = 51;
                case 51:
                    if (!(x < channelsArray.length)) return [3 /*break*/, 56];
                    currentChannel = channelsArray[x];
                    currentChannelOverwritesArray = currentChannel.permissionOverwrites.array();
                    y = 0;
                    _a.label = 52;
                case 52:
                    if (!(y < currentChannelOverwritesArray.length)) return [3 /*break*/, 55];
                    if (!(currentChannelOverwritesArray[y].id === currentGuildMember.id)) return [3 /*break*/, 54];
                    permOWs = new DiscordStuff
                        .PermissionOverwrites(message.client.guilds.resolve(guildData.guildID));
                    permOWs.allow = currentChannelOverwritesArray[y].allow.toArray();
                    permOWs.deny = currentChannelOverwritesArray[y].deny.toArray();
                    permOWs.id = currentGuildMember.id;
                    permOWs.type = 'member';
                    permOWs.channel = currentChannel;
                    guildMemberData.previousPermissionOverwrites
                        .push(permOWs);
                    return [4 /*yield*/, currentChannelOverwritesArray[y].delete()];
                case 53:
                    _a.sent();
                    _a.label = 54;
                case 54:
                    y += 1;
                    return [3 /*break*/, 52];
                case 55:
                    x += 1;
                    return [3 /*break*/, 51];
                case 56: return [4 /*yield*/, discordUser.updateGuildMemberDataInDB(guildMemberData, guildData.guildID)];
                case 57:
                    _a.sent();
                    if (currentGuildMember.voice.channel) {
                        currentGuildMember.voice.kick();
                    }
                    return [4 /*yield*/, memberRoleManager.add(ghostedRole.id)];
                case 58:
                    _a.sent();
                    msgString = "------\n**Hello! You've been REDACTED, on the server " + message.guild.name + ",\n            for the following reason(s):\t" + ghostReason + "\n Please, contact a moderator or admin to clear this issue up! Thanks!**\n------";
                    msgEmbed = new Discord.MessageEmbed();
                    msgEmbed.setAuthor(message.client.user.username, message.client.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**You\'ve been ghosted:**__');
                    return [4 /*yield*/, currentGuildMember.createDM(true)];
                case 59:
                    dmChannel = _a.sent();
                    dmChannel.send(msgEmbed);
                    msgString2 = "------\n__Hello! You've ghosted the following member__: <@!" + guildMemberData.userID + "> (" + guildMemberData.userName + ")\n------";
                    msgEmbed2 = new Discord.MessageEmbed();
                    msgEmbed2.setAuthor(message.client.user.username, message.client.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString2)
                        .setTimestamp(Date())
                        .setTitle('__**New Server Member Ghosted:**__');
                    return [4 /*yield*/, message.channel.send(msgEmbed2)];
                case 60:
                    _a.sent();
                    return [2 /*return*/, command.name];
                case 61:
                    if (!(whatAreWeDoing === 'remove')) return [3 /*break*/, 81];
                    isItFound = false;
                    for (x = 0; x < ghostedUserArray.length; x += 1) {
                        if (currentGuildMember.id === ghostedUserArray[x].id) {
                            isItFound = true;
                            break;
                        }
                    }
                    if (!(isItFound === false)) return [3 /*break*/, 65];
                    return [4 /*yield*/, message.reply('Sorry, but that user is not currently ghosted!')];
                case 62:
                    _a.sent();
                    if (!message.deletable) return [3 /*break*/, 64];
                    return [4 /*yield*/, message.delete()];
                case 63:
                    _a.sent();
                    _a.label = 64;
                case 64: return [2 /*return*/, command.name];
                case 65: return [4 /*yield*/, message.delete()];
                case 66:
                    _a.sent();
                    x = 0;
                    _a.label = 67;
                case 67:
                    if (!(x < guildMemberData.previousRoleIDs.length)) return [3 /*break*/, 72];
                    _a.label = 68;
                case 68:
                    _a.trys.push([68, 70, , 71]);
                    return [4 /*yield*/, memberRoleManager.add(guildMemberData.previousRoleIDs[x])];
                case 69:
                    _a.sent();
                    return [3 /*break*/, 71];
                case 70:
                    error_2 = _a.sent();
                    if (error_2.message === 'Missing Permissions') {
                        return [3 /*break*/, 71];
                    }
                    return [3 /*break*/, 71];
                case 71:
                    x += 1;
                    return [3 /*break*/, 67];
                case 72:
                    x = 0;
                    _a.label = 73;
                case 73:
                    if (!(x < channelsArray.length)) return [3 /*break*/, 76];
                    currentChannel = channelsArray[x];
                    currentChannelOverwritesArray = currentChannel.permissionOverwrites.array();
                    for (z = 0; z < guildMemberData.previousPermissionOverwrites.length; z += 1) {
                        if (guildMemberData.previousPermissionOverwrites[z]
                            .channel.id === channelsArray[x].id) {
                            currentChannelOverwritesArray.push(guildMemberData.previousPermissionOverwrites[z]);
                        }
                    }
                    return [4 /*yield*/, currentChannel.overwritePermissions(currentChannelOverwritesArray)];
                case 74:
                    _a.sent();
                    _a.label = 75;
                case 75:
                    x += 1;
                    return [3 /*break*/, 73];
                case 76:
                    guildMemberData.previousPermissionOverwrites = [];
                    guildMemberData.previousRoleIDs = [];
                    return [4 /*yield*/, discordUser.updateGuildMemberDataInDB(guildMemberData, guildData.guildID)];
                case 77:
                    _a.sent();
                    return [4 /*yield*/, memberRoleManager.remove(ghostedRole.id)];
                case 78:
                    _a.sent();
                    msgString = '------\n**Hello! You\'ve had your redacted status removed! Have a great day!**\n------';
                    msgEmbed = new Discord.MessageEmbed();
                    msgEmbed.setAuthor(message.client.user.username, message.client.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**You\'ve been un-ghosted:**__');
                    return [4 /*yield*/, currentGuildMember.createDM(true)];
                case 79:
                    dmChannel = _a.sent();
                    dmChannel.send(msgEmbed);
                    msgString2 = "------\n__Hello! You've un-ghosted the following member__: <@!" + guildMemberData.userID + "> (" + guildMemberData.userName + ")\n------";
                    msgEmbed2 = new Discord.MessageEmbed();
                    msgEmbed2.setAuthor(message.client.user.username, message.client.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString2)
                        .setTimestamp(Date())
                        .setTitle('__**New Server Member Un-Ghosted:**__');
                    return [4 /*yield*/, message.channel.send(msgEmbed2)];
                case 80:
                    _a.sent();
                    return [2 /*return*/, command.name];
                case 81: return [2 /*return*/, command.name];
                case 82:
                    error_3 = _a.sent();
                    if (!(error_3.message === 'Missing Permissions')) return [3 /*break*/, 86];
                    return [4 /*yield*/, message.reply('I need more permissions! Please promote my role rank in the server options!')];
                case 83:
                    _a.sent();
                    if (!message.deletable) return [3 /*break*/, 85];
                    return [4 /*yield*/, message.delete()];
                case 84:
                    _a.sent();
                    _a.label = 85;
                case 85: return [2 /*return*/, command.name];
                case 86: return [2 /*return*/, new Promise(function (resolve, reject) {
                        reject(error_3);
                    })];
                case 87: return [2 /*return*/];
            }
        });
    });
}
exports.execute = execute;
command.function = execute;
exports.default = command;
