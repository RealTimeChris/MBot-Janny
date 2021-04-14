// ghostworker.ts - Module for my "ghost" command - the worker side.
// Mar 18, 2021
// Chris M.
// https://github.com/RealTimeChris
'use strict';
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Discord = __importStar(require("discord.js"));
const worker_threads_1 = require("worker_threads");
const GuildData_1 = __importDefault(require("../GuildData"));
const GuildMemberData_1 = __importDefault(require("../GuildMemberData"));
const HelperFunctions_1 = __importDefault(require("../HelperFunctions"));
const command = {
    name: 'ghost',
    description: ' THIS WILL COMPLETELY SILENCE AND MUTE THE USER ACROSS THE SERVER!\n!ghost to display a list of all currently ghosted users.\n!ghost = add, REASON, '
        + '@USERMENTION to ghost a new user.\n!ghost = remove, @USERMENTION to unghost a user.',
    function: Function()
};
function execute(commandData, discordUser) {
    return __awaiter(this, void 0, void 0, function* () {
        const returnData = {
            commandName: command.name
        };
        returnData.commandName = command.name;
        const guildData = new GuildData_1.default({ dataBase: discordUser.dataBase, id: commandData.guild.id, name: commandData.guild.name, memberCount: commandData.guild.memberCount });
        yield guildData.getFromDataBase();
        try {
            const areWeInADM = yield HelperFunctions_1.default.areWeInADM(commandData);
            if (areWeInADM) {
                return returnData;
            }
            const doWeHaveAdminPerms = yield HelperFunctions_1.default.doWeHaveAdminPermission(commandData, discordUser);
            if (!doWeHaveAdminPerms) {
                return new Promise((resolve, reject) => {
                    resolve(returnData);
                });
            }
            let whatAreWeDoing;
            const userMentionRegExp = /<@!\d{18}>/;
            const userIDRegExp = /\d{18}/;
            let ghostReason;
            let userID;
            if (commandData.args[0] === '' || commandData.args[0] === undefined) {
                whatAreWeDoing = 'viewing';
                userID = commandData.guildMember.id;
            }
            else if (commandData.args[0] !== undefined && commandData.args[0].toString().toLowerCase() !== 'add' && commandData.args[0].toString().toLowerCase() !== 'remove') {
                const msgString = `------\n**Please, enter a proper first argument! (!ghost = add, REASON, @USERMENTION to 
                ghost a new user, !ghost = remove, @USERMENTION to unghost a user)**\n------`;
                let msgEmbed = new Discord.MessageEmbed()
                    .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                    .setColor(guildData.borderColor)
                    .setDescription(msgString)
                    .setTimestamp(Date())
                    .setTitle('__**Missing Or Invalid Arguments:**__');
                let msg = yield HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed);
                if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                    msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                }
                yield msg.delete({ timeout: 20000 });
                return new Promise((resolve, reject) => {
                    resolve(returnData);
                });
            }
            else if (commandData.args[0] !== undefined && commandData.args[0].toString().toLowerCase() === 'add' && commandData.args[1] === undefined) {
                const msgString = `------\n**Please, enter a reason for this ghosting! (!ghost = add, REASON, @USERMENTION to 
                ghost a new user, !ghost = remove, @USERMENTION to unghost a user)**\n------`;
                let msgEmbed = new Discord.MessageEmbed()
                    .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                    .setColor(guildData.borderColor)
                    .setDescription(msgString)
                    .setTimestamp(Date())
                    .setTitle('__**Missing Or Invalid Arguments:**__');
                let msg = yield HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed);
                if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                    msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                }
                yield msg.delete({ timeout: 20000 });
                return new Promise((resolve, reject) => {
                    resolve(returnData);
                });
            }
            else if (commandData.args[0] !== undefined && commandData.args[0].toString().toLowerCase() === 'add' && commandData.args[2] === undefined) {
                const msgString = `------\n**Please, enter a usermention to select the target to ghost! (!ghost = add, REASON, 
                @USERMENTION to ghost a new user, !ghost = remove, @USERMENTION to unghost a user)**\n------`;
                let msgEmbed = new Discord.MessageEmbed()
                    .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                    .setColor(guildData.borderColor)
                    .setDescription(msgString)
                    .setTimestamp(Date())
                    .setTitle('__**Missing Or Invalid Arguments:**__');
                let msg = yield HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed);
                if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                    msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                }
                yield msg.delete({ timeout: 20000 });
                return new Promise((resolve, reject) => {
                    resolve(returnData);
                });
            }
            else if (commandData.args[0] !== undefined && commandData.args[0].toString().toLowerCase() === 'remove' && commandData.args[1] === undefined) {
                const msgString = `------\n**Please, enter a usermention to select the target to de-ghost!
                (!ghost = remove, @USERMENTION to unghost a user)**\n------`;
                let msgEmbed = new Discord.MessageEmbed()
                    .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                    .setColor(guildData.borderColor)
                    .setDescription(msgString)
                    .setTimestamp(Date())
                    .setTitle('__**Missing Or Invalid Arguments:**__');
                let msg = yield HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed);
                if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                    msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                }
                yield msg.delete({ timeout: 20000 });
                return new Promise((resolve, reject) => {
                    resolve(returnData);
                });
            }
            else if (commandData.args[0] !== undefined && commandData.args[0].toString().toLowerCase() === 'add' && !userMentionRegExp.test(commandData.args[2]) && !userIDRegExp.test(commandData.args[2])) {
                const msgString = `------\n**Please, enter a usermention to select the target to ghost! (!ghost = add, REASON, 
                @USERMENTION to ghost a new user, !ghost = remove, @USERMENTION to unghost a user)**\n------`;
                let msgEmbed = new Discord.MessageEmbed()
                    .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                    .setColor(guildData.borderColor)
                    .setDescription(msgString)
                    .setTimestamp(Date())
                    .setTitle('__**Missing Or Invalid Arguments:**__');
                let msg = yield HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed);
                if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                    msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                }
                yield msg.delete({ timeout: 20000 });
                return new Promise((resolve, reject) => {
                    resolve(returnData);
                });
            }
            else if (commandData.args[0] !== undefined && commandData.args[0].toString().toLowerCase() === 'remove' && !userMentionRegExp.test(commandData.args[1]) && !userIDRegExp.test(commandData.args[1])) {
                const msgString = `------\n**Please, enter a proper usermention to select the target to de-ghost! 
                (!ghost = remove, @USERMENTION to unghost a user)**\n------`;
                let msgEmbed = new Discord.MessageEmbed()
                    .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                    .setColor(guildData.borderColor)
                    .setDescription(msgString)
                    .setTimestamp(Date())
                    .setTitle('__**Missing Or Invalid Arguments:**__');
                let msg = yield HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed);
                if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                    msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                }
                yield msg.delete({ timeout: 20000 });
                return new Promise((resolve, reject) => {
                    resolve(returnData);
                });
            }
            else if (commandData.args[0] !== undefined && commandData.args[0].toString().toLowerCase() === 'add') {
                whatAreWeDoing = 'add';
                const argOne = commandData.args[1];
                ghostReason = argOne;
                const argTwo = commandData.args[2];
                const userIDRaw = argTwo.match(/\d{18}/)[0];
                userID = userIDRaw;
            }
            else if (commandData.args[0] !== undefined && commandData.args[0].toString().toLowerCase() === 'remove') {
                whatAreWeDoing = 'remove';
                const argOne = commandData.args[1];
                const userIDRaw = argOne.match(/\d{18}/)[0];
                userID = userIDRaw;
            }
            const currentGuildMember = yield commandData.guild.members.fetch(userID);
            const guildMemberData = new GuildMemberData_1.default({ dataBase: discordUser.dataBase, displayName: currentGuildMember.displayName,
                id: currentGuildMember.id, guildId: commandData.guild.id, userName: currentGuildMember.user.username });
            yield guildMemberData.getFromDataBase();
            const channelsArray = commandData.guild.channels.cache.array();
            const roleManager = new Discord.RoleManager(commandData.guild);
            let ghostedRole = yield roleManager.fetch(guildData.ghostedRoleID);
            const memberRoleManager = new Discord.GuildMemberRoleManager(currentGuildMember);
            const memberRoleManagerBot = new Discord.GuildMemberRoleManager(commandData.guildMember);
            if (!(ghostedRole instanceof Discord.Role)) {
                ghostedRole = yield roleManager.create({
                    data: {
                        position: memberRoleManagerBot.highest.position - 1, color: 'FF3333', mentionable: true, name: 'Ghosted',
                    },
                });
                guildData.ghostedRoleID = ghostedRole.id;
                yield guildData.writeToDataBase();
            }
            if (whatAreWeDoing === 'add' || whatAreWeDoing === 'remove') {
                for (let x = 0; x < channelsArray.length; x += 1) {
                    const voicePermissionOptions = {
                        channel: null,
                        id: guildData.ghostedRoleID,
                        type: 'role',
                        allow: ['VIEW_CHANNEL'],
                        deny: ['ADMINISTRATOR', 'CREATE_INSTANT_INVITE', 'KICK_MEMBERS', 'BAN_MEMBERS',
                            'MANAGE_CHANNELS', 'MANAGE_GUILD', 'VIEW_AUDIT_LOG', 'PRIORITY_SPEAKER', 'STREAM', 'VIEW_GUILD_INSIGHTS',
                            'CONNECT', 'SPEAK', 'MUTE_MEMBERS', 'DEAFEN_MEMBERS', 'MOVE_MEMBERS', 'USE_VAD', 'CHANGE_NICKNAME', 'MANAGE_NICKNAMES',
                            'MANAGE_ROLES', 'MANAGE_WEBHOOKS', 'MANAGE_EMOJIS']
                    };
                    const textPermissionOptions = {
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
                    if (channelsArray[x].type === 'voice') {
                        let currentChannel = new Discord.VoiceChannel(commandData.guild, {});
                        currentChannel = channelsArray[x];
                        let isItFound = false;
                        let currentChannelPerms;
                        for (let y = 0; y < memberRoleManager.cache.array().length; y += 1) {
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
                        const currentOverwritesArray = currentChannel.permissionOverwrites.array();
                        voicePermissionOptions.channel = currentChannel;
                        currentOverwritesArray.push(voicePermissionOptions);
                        yield currentChannel.overwritePermissions(currentOverwritesArray);
                    }
                    else {
                        let currentChannel = new Discord.GuildChannel(commandData.guild, {});
                        currentChannel = channelsArray[x];
                        let isItFound1 = false;
                        let isItFound2 = false;
                        let currentChannelPerms;
                        for (let y = 0; y < memberRoleManager.cache.array().length; y += 1) {
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
                            const argOne = textPermissionOptions.allow[1];
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
                        const currentOverwritesArray = currentChannel.permissionOverwrites.array();
                        textPermissionOptions.channel = currentChannel;
                        currentOverwritesArray.push(textPermissionOptions);
                        yield currentChannel.overwritePermissions(currentOverwritesArray);
                    }
                }
            }
            const ghostedUserArray = [];
            for (let x = 0; x < ghostedRole.members.array().length; x += 1) {
                ghostedUserArray.push(ghostedRole.members.array()[x]);
            }
            if (whatAreWeDoing === 'viewing') {
                let msgString;
                if (ghostedUserArray.length === 0) {
                    msgString = '------\n__**Great! There\'s nobody in "ghost" mode on your server!**__';
                }
                else {
                    msgString = '------\n__**These are your server\'s currently "ghosted" members:**__\n------\n';
                    for (let x = 0; x < ghostedUserArray.length; x += 1) {
                        if (x % 5 === 0 && x > 1) {
                            msgString += '\n';
                        }
                        msgString += `<@!${ghostedUserArray[x].id}>`;
                        if (x < ghostedUserArray.length - 1) {
                            msgString += ', ';
                        }
                    }
                }
                msgString += '\n------';
                const msgEmbed = new Discord.MessageEmbed();
                msgEmbed
                    .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                    .setColor(guildData.borderColor)
                    .setDescription(msgString)
                    .setTimestamp(Date())
                    .setTitle('__**Currently Ghosted Members:**__');
                yield HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed);
                return new Promise((resolve, reject) => {
                    resolve(returnData);
                });
            }
            if (whatAreWeDoing === 'add') {
                for (let x = 0; x < ghostedUserArray.length; x += 1) {
                    if (currentGuildMember.id === ghostedUserArray[x].id) {
                        const msgString = `------\n**They are already ghosted!**\n------`;
                        let msgEmbed = new Discord.MessageEmbed()
                            .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                            .setColor(guildData.borderColor)
                            .setDescription(msgString)
                            .setTimestamp(Date())
                            .setTitle('__**Already Ghosted:**__');
                        let msg = yield HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed);
                        if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                            msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                        }
                        yield msg.delete({ timeout: 20000 });
                        return new Promise((resolve, reject) => {
                            resolve(returnData);
                        });
                    }
                }
                guildMemberData.previousRoleIDs.push(memberRoleManager.highest.id);
                for (let x = 0; x < memberRoleManager.cache.array().length; x += 1) {
                    if (memberRoleManager.cache.array()[x].id === memberRoleManager.highest.id) {
                        continue;
                    }
                    if (memberRoleManager.cache.array()[x].name !== '@everyone' && memberRoleManager.cache.array()[x].name !== 'general'
                        && memberRoleManager.cache.array()[x].id !== memberRoleManager.highest.id) {
                        guildMemberData.previousRoleIDs.push(memberRoleManager.cache.array()[x].id);
                    }
                }
                for (let x = 0; x < guildMemberData.previousRoleIDs.length; x += 1) {
                    try {
                        yield memberRoleManager.remove(guildMemberData.previousRoleIDs[x]);
                    }
                    catch (error) {
                        if (error.message === 'Missing Permissions') {
                            console.log('Missing Permissions');
                            continue;
                        }
                        else {
                            console.log(error);
                            continue;
                        }
                    }
                }
                for (let x = 0; x < channelsArray.length; x += 1) {
                    const currentChannel = channelsArray[x];
                    const currentChannelOverwritesArray = currentChannel.permissionOverwrites.array();
                    for (let y = 0; y < currentChannelOverwritesArray.length; y += 1) {
                        if (currentChannelOverwritesArray[y].id === currentGuildMember.id) {
                            const permOWs = {
                                channel: currentChannel,
                                type: 'member',
                                id: currentGuildMember.id,
                                allow: currentChannelOverwritesArray[y].allow.toArray(),
                                deny: currentChannelOverwritesArray[y].deny.toArray()
                            };
                            guildMemberData.previousPermissionOverwrites
                                .push(permOWs);
                            yield currentChannelOverwritesArray[y].delete();
                        }
                    }
                }
                yield guildMemberData.writeToDataBase();
                if (currentGuildMember.voice.channel) {
                    currentGuildMember.voice.kick();
                }
                yield memberRoleManager.add(ghostedRole.id);
                const msgString = `------\n**Hello! You've been REDACTED, on the server ${commandData.guild.name},
            for the following reason(s):	${ghostReason}\n Please, contact a moderator or admin to clear this issue up! Thanks!**\n------`;
                const msgEmbed = new Discord.MessageEmbed();
                msgEmbed
                    .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                    .setColor(guildData.borderColor)
                    .setDescription(msgString)
                    .setTimestamp(Date())
                    .setTitle('__**You\'ve been ghosted:**__');
                const dmChannel = yield currentGuildMember.createDM(true);
                dmChannel.send(msgEmbed);
                const msgString2 = `------\n__Hello! You've ghosted the following member__: <@!${currentGuildMember.id}> (${currentGuildMember.user.username})\n------`;
                const msgEmbed2 = new Discord.MessageEmbed();
                msgEmbed2
                    .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                    .setColor(guildData.borderColor)
                    .setDescription(msgString2)
                    .setTimestamp(Date())
                    .setTitle('__**New Server Member Ghosted:**__');
                yield HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed2);
                return new Promise((resolve, reject) => {
                    resolve(returnData);
                });
            }
            if (whatAreWeDoing === 'remove') {
                let isItFound = false;
                for (let x = 0; x < ghostedUserArray.length; x += 1) {
                    if (currentGuildMember.id === ghostedUserArray[x].id) {
                        isItFound = true;
                        break;
                    }
                }
                if (isItFound === false) {
                    const msgString = `-------\n**Sorry, but that user is not currently ghosted!**\n------`;
                    let msgEmbed = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Not Ghosted:**__');
                    let msg = yield HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed);
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    yield msg.delete({ timeout: 20000 });
                    return new Promise((resolve, reject) => {
                        resolve(returnData);
                    });
                }
                for (let x = 0; x < guildMemberData.previousRoleIDs.length; x += 1) {
                    try {
                        yield memberRoleManager.add(guildMemberData.previousRoleIDs[x]);
                    }
                    catch (error) {
                        if (error.message === 'Missing Permissions') {
                            continue;
                        }
                    }
                }
                for (let x = 0; x < channelsArray.length; x += 1) {
                    const currentChannel = channelsArray[x];
                    const currentChannelOverwritesArray = currentChannel.permissionOverwrites.array();
                    for (let z = 0; z < guildMemberData.previousPermissionOverwrites.length; z += 1) {
                        if ((guildMemberData.previousPermissionOverwrites[z])
                            .channel.id === channelsArray[x].id) {
                            currentChannelOverwritesArray.push(guildMemberData.previousPermissionOverwrites[z]);
                        }
                    }
                    yield currentChannel.overwritePermissions(currentChannelOverwritesArray);
                }
                guildMemberData.previousPermissionOverwrites = [];
                guildMemberData.previousRoleIDs = [];
                yield guildMemberData.writeToDataBase();
                yield memberRoleManager.remove(ghostedRole.id);
                const msgString = '------\n**Hello! You\'ve had your redacted status removed! Have a great day!**\n------';
                const msgEmbed = new Discord.MessageEmbed();
                msgEmbed
                    .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                    .setColor(guildData.borderColor)
                    .setDescription(msgString)
                    .setTimestamp(Date())
                    .setTitle('__**You\'ve been un-ghosted:**__');
                const dmChannel = yield currentGuildMember.createDM(true);
                dmChannel.send(msgEmbed);
                const msgString2 = `------\n__Hello! You've un-ghosted the following member__: <@!${currentGuildMember.id}> (${currentGuildMember.user.username})\n------`;
                const msgEmbed2 = new Discord.MessageEmbed();
                msgEmbed2
                    .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                    .setColor(guildData.borderColor)
                    .setDescription(msgString2)
                    .setTimestamp(Date())
                    .setTitle('__**New Server Member Un-Ghosted:**__');
                yield HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed2);
                return new Promise((resolve, reject) => {
                    resolve(returnData);
                });
            }
            return new Promise((resolve, reject) => {
                resolve(returnData);
            });
        }
        catch (error) {
            if (error.message === 'Missing Permissions') {
                const msgString = `------\n**I need more permissions! Please promote my role rank in the server options!**\n------`;
                const msgEmbed = new Discord.MessageEmbed();
                msgEmbed
                    .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                    .setColor(guildData.borderColor)
                    .setDescription(msgString)
                    .setTimestamp(Date())
                    .setTitle('__**Permissions Issue:**__');
                yield HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed);
                console.log(error);
                return new Promise((resolve, reject) => {
                    resolve(returnData);
                });
            }
            return new Promise((resolve, reject) => {
                reject(error);
            });
        }
    });
}
command.function = execute;
exports.default = command;
const worker = new worker_threads_1.Worker('./commands/ghostworker.js');
let messageArgs;
// addEventListener is directly accessible in worker file
worker.addListener("message", (value) => __awaiter(void 0, void 0, void 0, function* () {
    // extract person passed from main thread from event object
    let commandData = value[0];
    let discordUser = value[1];
    const commandReturnData = yield execute(commandData, discordUser);
    console.log('TESTING MULTITHREADING!');
    process.exit();
}));
