//  setverificationsystem.ts - Module for my "set verification system" command!.
// Feb 26, 2021
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
    name: 'setverificationsystem',
    description: '!setverificationsystem = ENABLE, VERIFICATIONMESSAGE, REACTIONEMOJI, in the channel you would like to use for your verification channel!\nAlso, !setverificationsystem = DISABLE.',
    function: Function()
};
function execute(commandData, discordUser) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
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
            let whatAreWeDoing;
            const emojiRegExp = /.{1,26}/;
            if (commandData.args[0] === undefined) {
                whatAreWeDoing = 'viewing';
            }
            else if (commandData.args[0].toLowerCase() !== 'enable' && commandData.args[0].toLowerCase() !== 'disable') {
                const msgString = "------\n**Please enter either 'enable' or 'disable' as the first argument! (!setverificationsystem = ENABLE, VERIFICATIONMESSAGE, REACTIONEMOJI, or !setverificationsystem = DISABLE)**\n------";
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
            else if (commandData.args[0].toLowerCase() === 'enable' && commandData.args[1] === undefined) {
                const msgString = '------\n**Please, enter a greeting message for the verification system!**\n------';
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
            else if (commandData.args[0].toLowerCase() === 'enable' && (commandData.args[2] === undefined || !emojiRegExp.test(commandData.args[2]))) {
                const msgString = '------\n**Please, enter a valid emoji for them to react with!**\n------';
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
            else if (commandData.args[0].toLowerCase() === 'enable') {
                whatAreWeDoing = 'enable';
            }
            else if (commandData.args[0].toLowerCase() === 'disable') {
                whatAreWeDoing = 'disable';
            }
            let msgString = '';
            if (whatAreWeDoing === 'viewing') {
                if (guildData.verificationSystem.messageID !== '') {
                    try {
                        const messageManager = new Discord.MessageManager(commandData.guildMember.client.channels.resolve(guildData.verificationSystem.channelID));
                        const newMessage = yield messageManager.fetch(guildData.verificationSystem.messageID);
                        msgString = `------\n__**Channel:**__ <#${guildData.verificationSystem.channelID}>\n`;
                        msgString += `__**Message Content:**__ ${newMessage.embeds[0].description}\n`;
                        msgString += `__**Emoji:**__ ${guildData.verificationSystem.emoji}\n------`;
                    }
                    catch (error) {
                        console.log(error);
                        msgString = '------\n__The verification system is currently disabled.__\n------\n';
                        guildData.verificationSystem.channelID = '';
                        guildData.verificationSystem.messageID = '';
                        guildData.verificationSystem.emoji = '';
                        yield guildData.writeToDataBase();
                        const msgEmbed = new Discord.MessageEmbed();
                        msgEmbed
                            .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                            .setColor(guildData.borderColor)
                            .setTimestamp(Date())
                            .setTitle('__**Verification System:**__')
                            .setDescription(msgString);
                        yield HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed);
                        return commandReturnData;
                    }
                }
                else {
                    msgString = '------\n__The verification system is currently disabled.__\n------\n';
                    guildData.verificationSystem.channelID = '';
                    guildData.verificationSystem.messageID = '';
                    guildData.verificationSystem.emoji = '';
                    yield guildData.writeToDataBase();
                }
                const msgEmbed = new Discord.MessageEmbed();
                msgEmbed
                    .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                    .setColor(guildData.borderColor)
                    .setTimestamp(Date())
                    .setTitle('__**Verification System:**__')
                    .setDescription(msgString);
                yield HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed);
                return commandReturnData;
            }
            if (whatAreWeDoing === 'disable') {
                const currentChannel = commandData.guildMember.client.channels
                    .resolve(guildData.verificationSystem.channelID);
                if (guildData.verificationSystem.channelID == '' || currentChannel === null) {
                    const msgString = '------\n**Sorry, it looks as though it is already disabled!**\n------';
                    let msgEmbed = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Existence Issue:**__');
                    let msg = yield HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed);
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    yield msg.delete({ timeout: 20000 });
                    guildData.verificationSystem.channelID = '';
                    guildData.verificationSystem.messageID = '';
                    guildData.verificationSystem.emoji = '';
                    yield guildData.writeToDataBase();
                    return commandReturnData;
                }
                const messageManager = new Discord.MessageManager(currentChannel);
                yield messageManager.delete(guildData.verificationSystem.messageID);
                guildData.verificationSystem.channelID = '';
                guildData.verificationSystem.messageID = '';
                guildData.verificationSystem.emoji = '';
                yield guildData.writeToDataBase();
                msgString = "__**Nicely done! You've disabled the verification system for this server!**__";
                const msgEmbed = new Discord.MessageEmbed();
                msgEmbed
                    .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                    .setColor(guildData.borderColor)
                    .setTimestamp(Date())
                    .setTitle('__**Set Verification System:**__')
                    .setDescription(msgString);
                yield HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed);
                return commandReturnData;
            }
            if (whatAreWeDoing === 'enable') {
                if (guildData.defaultRoleIDs.length === 0) {
                    const msgString = '------\n**Please, first set a default role to be applied to the new member! Using !setdefaultrole.**\n------';
                    let msgEmbed = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Role Issue:**__');
                    let msg = yield HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed);
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    yield msg.delete({ timeout: 20000 });
                    return commandReturnData;
                }
                const msgEmbed2 = new Discord.MessageEmbed()
                    .setColor(guildData.borderColor)
                    .setDescription(commandData.args[1])
                    .setTimestamp(Date());
                let newMessage = yield HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed2);
                if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                    newMessage = new Discord.Message(commandData.guild.client, newMessage, commandData.fromTextChannel);
                }
                yield newMessage.react(commandData.args[2]);
                const currentGuild = (_a = commandData.guild) === null || _a === void 0 ? void 0 : _a.client.guilds.resolve(commandData.guild.id);
                const channelsArray = currentGuild.channels.cache.array();
                const currentRolesArray = currentGuild.roles.cache.array();
                let everyoneRoleID;
                for (let x = 0; x < currentRolesArray.length; x += 1) {
                    if (currentRolesArray[x].name === '@everyone') {
                        everyoneRoleID = (_b = currentRolesArray[x]) === null || _b === void 0 ? void 0 : _b.id;
                    }
                }
                for (let x = 0; x < channelsArray.length; x += 1) {
                    const rolesArray = currentGuild.roles.cache.array();
                    if (channelsArray[x].id !== commandData.fromTextChannel.id) {
                        for (let y = 0; y < guildData.defaultRoleIDs.length; y += 1) {
                            if ((_d = (_c = channelsArray[x]) === null || _c === void 0 ? void 0 : _c.permissionsFor(guildData.defaultRoleIDs[y])) === null || _d === void 0 ? void 0 : _d.has('VIEW_CHANNEL')) {
                                yield ((_e = channelsArray[x]) === null || _e === void 0 ? void 0 : _e.updateOverwrite(guildData.defaultRoleIDs[y], { VIEW_CHANNEL: true }));
                            }
                        }
                        yield ((_f = channelsArray[x]) === null || _f === void 0 ? void 0 : _f.updateOverwrite(everyoneRoleID, { VIEW_CHANNEL: false }));
                    }
                    else {
                        yield ((_g = channelsArray[x]) === null || _g === void 0 ? void 0 : _g.updateOverwrite(everyoneRoleID, { VIEW_CHANNEL: true, SEND_MESSAGES: false, ATTACH_FILES: false, EMBED_LINKS: false }));
                        for (let y = 0; y < rolesArray.length; y += 1) {
                            if (((_h = rolesArray[y]) === null || _h === void 0 ? void 0 : _h.id) !== everyoneRoleID) {
                                yield ((_j = channelsArray[x]) === null || _j === void 0 ? void 0 : _j.updateOverwrite(rolesArray[y].id, { VIEW_CHANNEL: false }));
                            }
                        }
                    }
                }
                guildData.verificationSystem.channelID = commandData.fromTextChannel.id;
                guildData.verificationSystem.messageID = newMessage.id;
                const argTwo = commandData.args[2];
                guildData.verificationSystem.emoji = argTwo;
                yield guildData.writeToDataBase();
                msgString = "__**Nicely done! You've enabled the verification system for this server!**__";
                const msgEmbed = new Discord.MessageEmbed();
                msgEmbed
                    .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                    .setColor(guildData.borderColor)
                    .setTimestamp(Date())
                    .setTitle('__**Set Verification System:**__')
                    .setDescription(msgString);
                let msg = yield HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed);
                if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                    msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                }
                yield msg.delete({ timeout: 20000 });
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
