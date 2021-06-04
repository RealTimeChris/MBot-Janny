// trackuser.ts - Module for my track user command.
// Jan 30, 2021
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Discord = require("discord.js");
const GuildData_1 = __importDefault(require("../GuildData"));
const HelperFunctions_1 = __importDefault(require("../HelperFunctions"));
const command = {
    name: 'trackuser',
    description: '!trackuser = ADD, @USERMENTION to track the user within the current text channel.\n\t!trackuser = REMOVE, @USERMENTION to stop tracking the user\n\t!trackuser to display all of the currently tracked users.',
    function: Function()
};
/**
 * Deals with the setting of a user's tracking status.
 */
function execute(commandData, discordUser) {
    var _a, _b, _c, _d, _e, _f, _g;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const commandReturnData = {
                commandName: command.name
            };
            const areWeInADM = yield HelperFunctions_1.default.areWeInADM(commandData);
            if (areWeInADM === true) {
                return commandReturnData;
            }
            const doWeHaveAdminPermission = yield HelperFunctions_1.default.doWeHaveAdminPermission(commandData, discordUser);
            if (doWeHaveAdminPermission === false) {
                return commandReturnData;
            }
            const guildData = new GuildData_1.default({ dataBase: discordUser.dataBase, id: commandData.guild.id, name: commandData.guild.name, memberCount: commandData.guild.memberCount });
            yield guildData.getFromDataBase();
            const userMentionRegExp = /.{2,3}\d{18}>/;
            const idRegExp = /\d{18}/;
            let whatAreWeDoing = '';
            let trackedUserID = '';
            if (commandData.args[0] !== undefined && (commandData.args[0].toLowerCase() !== 'add' && commandData.args[0].toLowerCase() !== 'remove')) {
                const msgString = `------\n**Please enter either add or remove for the first argument! (!trackuser = ADDorREMOVE, @USERMENTION, or just !trackuser)**\n------`;
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
                return commandReturnData;
            }
            if (commandData.args[0] !== undefined && (commandData.args[1] === undefined || (!userMentionRegExp.test(commandData.args[1]) && !idRegExp.test(commandData.args[1])))) {
                const msgString = `------\n**Please enter a valud usermention! (!trackuser = ADDorREMOVE, @USERMENTION, or just !trackuser)**\n------`;
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
                return commandReturnData;
            }
            if (commandData.args[0] !== undefined) {
                whatAreWeDoing = commandData.args[0].toLowerCase();
            }
            else {
                whatAreWeDoing = '';
            }
            if (commandData.args[1] !== undefined) {
                const argOne = commandData.args[1];
                const trackedUserIDOne = argOne.match(idRegExp)[0];
                trackedUserID = trackedUserIDOne;
            }
            if (guildData.trackedUsers !== undefined) {
                for (let x = 0; x < guildData.trackedUsers.length; x += 1) {
                    let isUserFound = false;
                    const currentGuild = commandData.guild;
                    if (currentGuild != null) {
                        const currentUser = currentGuild.members.resolve(guildData.trackedUsers[x].userID);
                        if (currentUser != null) {
                            isUserFound = true;
                            continue;
                        }
                    }
                    if (isUserFound === false) {
                        const msgString = `------\n**Removing user <@!${guildData.trackedUsers[x].userID}> (${(_a = guildData.trackedUsers[x]) === null || _a === void 0 ? void 0 : _a.userName}) from the list of tracked users!**\n------`;
                        let msgEmbed = new Discord.MessageEmbed()
                            .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                            .setColor(guildData.borderColor)
                            .setDescription(msgString)
                            .setTimestamp(Date())
                            .setTitle('__**Missing User(s):**__');
                        let msg = yield HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed);
                        if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                            msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                        }
                        guildData.trackedUsers.splice(x, 1);
                        yield guildData.writeToDataBase();
                        yield msg.delete({ timeout: 20000 });
                    }
                }
            }
            const currentGuild = commandData.guild;
            const currentTextChannel = commandData.fromTextChannel;
            const currentGuildMember = yield currentGuild.members.fetch(trackedUserID);
            if (whatAreWeDoing === 'add') {
                try {
                    let currentIndex = -1;
                    for (let x = 0; x < guildData.trackedUsers.length; x += 1) {
                        if (trackedUserID === ((_b = guildData.trackedUsers[x]) === null || _b === void 0 ? void 0 : _b.userID)) {
                            currentIndex = x;
                            break;
                        }
                    }
                    if (currentIndex === -1) {
                        let trackedUser = {
                            userName: currentGuildMember.user.username,
                            userID: currentGuildMember.user.id.trim(),
                            channelID: commandData.fromTextChannel.id
                        };
                        guildData.trackedUsers.push(trackedUser);
                        yield guildData.writeToDataBase();
                        const msgString = `${'------\n__**User:**__ <@!'}${currentGuildMember.id.toString()}> (${currentGuildMember.user.username})\n__** Tracking Channel:**__  <#${currentTextChannel.id}> (${currentTextChannel.name.toString()})\n------`;
                        const messageEmbed = new Discord.MessageEmbed()
                            .setTimestamp(Date())
                            .setTitle('__**New Tracked User:**__')
                            .setDescription(msgString)
                            .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                            .setThumbnail(currentGuildMember.user.avatarURL())
                            .setColor(guildData.borderColor);
                        yield HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, messageEmbed);
                    }
                    else if (currentIndex >= 0) {
                        let currentIndex = -1;
                        for (let x = 0; x < guildData.trackedUsers.length; x += 1) {
                            if (trackedUserID === guildData.trackedUsers[x].userID) {
                                currentIndex = x;
                                break;
                            }
                        }
                        guildData.trackedUsers[currentIndex].channelID = commandData.fromTextChannel.id;
                        const msgString = `------\n**That user is already being tracked! I will update their tracking channel though!**\n------\n__**Tracked User:**__ <@!${currentGuildMember.id}> (${currentGuildMember.user.username})
                        __**Tracking Channel:**__ <#${(_c = guildData.trackedUsers[currentIndex]) === null || _c === void 0 ? void 0 : _c.channelID}>\n------`;
                        const msgEmbed = new Discord.MessageEmbed();
                        msgEmbed
                            .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                            .setColor(guildData.borderColor)
                            .setDescription(msgString)
                            .setTimestamp(Date())
                            .setTitle("__**User Already Added:**__");
                        yield HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed);
                        yield guildData.writeToDataBase();
                    }
                }
                catch (error) {
                    console.log(error);
                    const msgString = `------\n**Sorry, but the specified user could not be found!**\n------`;
                    let msgEmbed = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**User Issue:**__');
                    let msg = yield HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed);
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    yield msg.delete({ timeout: 20000 });
                }
                return commandReturnData;
            }
            if (whatAreWeDoing === 'remove') {
                try {
                    if (commandData.args[0].toLowerCase() === 'remove' && guildData.trackedUsers.length >= 1) {
                        let currentIndex = -1;
                        for (let x = 0; x < guildData.trackedUsers.length; x += 1) {
                            if (trackedUserID === ((_d = guildData.trackedUsers[x]) === null || _d === void 0 ? void 0 : _d.userID)) {
                                currentIndex = x;
                                break;
                            }
                        }
                        if (currentIndex >= 0) {
                            guildData.trackedUsers.splice(currentIndex, 1);
                            yield guildData.writeToDataBase();
                            let msgString = `------\n__**Tracked User:**__ <@!${currentGuildMember.id}> (${currentGuildMember.user.username})\n------`;
                            if (guildData.trackedUsers.length === 0) {
                                msgString += '\nNo more users are being tracked!\n------';
                            }
                            const messageEmbed = new Discord.MessageEmbed()
                                .setTimestamp(Date())
                                .setTitle('__**Removed Tracked User:**__')
                                .setDescription(msgString)
                                .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                                .setColor(guildData.borderColor);
                            yield HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, messageEmbed);
                        }
                        else if (currentIndex === -1) {
                            const msgString = `------\n**There is noone by that ID being tracked!**\n------`;
                            let msgEmbed = new Discord.MessageEmbed()
                                .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                                .setColor(guildData.borderColor)
                                .setDescription(msgString)
                                .setTimestamp(Date())
                                .setTitle('__**User Issue:**__');
                            let msg = yield HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed);
                            if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                                msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                            }
                            yield msg.delete({ timeout: 20000 });
                        }
                    }
                    else if (commandData.args[0].toLowerCase() === 'remove' && guildData.trackedUsers.length === 0) {
                        const msgString = '------\n**There is noone to remove from the tracked users!**\n------';
                        const messageEmbed = new Discord.MessageEmbed()
                            .setTimestamp(Date())
                            .setTitle('__**No Tracked Users:**__')
                            .setDescription(msgString)
                            .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                            .setColor(guildData.borderColor);
                        yield HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, messageEmbed);
                    }
                }
                catch (error) {
                    const msgString = `------\n**Sorry, but the specified user could not be found!**\n------`;
                    const messageEmbed = new Discord.MessageEmbed()
                        .setTimestamp(Date())
                        .setTitle('__**User Issue:**__')
                        .setDescription(msgString)
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor);
                    let msg = yield HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, messageEmbed);
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    yield msg.delete({ timeout: 20000 });
                }
                return commandReturnData;
            }
            if (commandData.args[0] === undefined) {
                let msgString = '';
                if (guildData.trackedUsers.length > 0) {
                    for (let x = 0; x < guildData.trackedUsers.length; x += 1) {
                        if (x === 0) {
                            msgString = '------\n';
                        }
                        const trackedChannelName = commandData.guild.client.channels
                            .resolve(guildData.trackedUsers[x].channelID).name;
                        msgString += `__**Tracked User Name #${x + 1}:**__ <@!${(_e = guildData.trackedUsers[x]) === null || _e === void 0 ? void 0 : _e.userID}> (${(_f = guildData.trackedUsers[x]) === null || _f === void 0 ? void 0 : _f.userName})\n`;
                        msgString += `__**In Channel:**__ <#${(_g = guildData.trackedUsers[x]) === null || _g === void 0 ? void 0 : _g.channelID}> (${trackedChannelName})\n------`;
                        if (x < guildData.trackedUsers.length - 1) {
                            msgString += '\n';
                        }
                    }
                }
                else {
                    msgString += '------\n**Noone is being tracked, currently!**\n------';
                }
                const messageEmbed = new Discord.MessageEmbed()
                    .setTitle('__**Tracked Users:**__')
                    .setTimestamp(Date())
                    .setDescription(msgString)
                    .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                    .setColor([254, 254, 254]);
                yield HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, messageEmbed);
                return commandReturnData;
            }
            return commandReturnData;
        }
        catch (error) {
            return new Promise((resolve, reject) => {
                reject(error);
            });
        }
    });
}
command.function = execute;
exports.default = command;
