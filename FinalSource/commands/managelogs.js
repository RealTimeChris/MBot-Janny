// managelogs.ts - Module for my "manage logs" command.
// Mar 11, 2021
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
const GuildData_1 = __importDefault(require("../GuildData"));
const HelperFunctions_1 = __importDefault(require("../HelperFunctions"));
const command = {
    name: 'managelogs',
    description: '!managelogs, to view an enabled/disabled list of possible logs!',
    function: Function()
};
function execute(commandData, discordUser) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const commandReturnData = {
                commandName: command.name
            };
            const areWeInADM = yield HelperFunctions_1.default.areWeInADM(commandData);
            if (areWeInADM === true) {
                return commandReturnData;
            }
            const areWeAnAdmin = yield HelperFunctions_1.default.doWeHaveAdminPermission(commandData, discordUser);
            if (areWeAnAdmin === false) {
                return commandReturnData;
            }
            const guildData = new GuildData_1.default({ dataBase: discordUser.dataBase, id: commandData.guild.id, name: commandData.guild.name, memberCount: commandData.guild.memberCount });
            yield guildData.getFromDataBase();
            if (commandData.args[0] === undefined) {
                const fields = [];
                for (let x = 0; x < guildData.logs.length; x += 1) {
                    if (commandData.guildMember.client.channels.resolve(guildData.logs[x].loggingChannelID) === null) {
                        guildData.logs[x].loggingChannelID = '';
                        guildData.logs[x].loggingChannelName = '';
                        guildData.logs[x].enabled = false;
                    }
                    if (guildData.logs[x].enabled === false) {
                        const field = { name: `__**${guildData.logs[x].name}**__`, value: '__Enabled:__ ❌', inline: true };
                        fields.push(field);
                    }
                    else if (guildData.logs[x].enabled === true) {
                        const field = { name: `__**${guildData.logs[x].name}**__`, value: `__Enabled:__ ✅
                        \n__Logging Channel:__ <#${guildData.logs[x].loggingChannelID}>`, inline: true };
                        fields.push(field);
                    }
                }
                const msgEmbed = new Discord.MessageEmbed();
                let msgString = '';
                msgString = `**To enable/disable a given log, enter within the text channel where you would like it to be logged: !managelogs = 
                <enable/disable>, <logname>\nFor example, '!managelogs = enable, guildbanadd'.**'`;
                msgEmbed
                    .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                    .setColor(guildData.borderColor)
                    .setDescription(msgString)
                    .setTimestamp(Date())
                    .setTitle('__**Manage Logs:**__').fields = fields;
                yield HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed);
            }
            else if (commandData.args[0].toString().toLowerCase() !== 'enable' && commandData.args[0].toString().toLowerCase() !== 'disable') {
                const msgString = `------\n**Please, enter enable or disable for the first argument of this command! 
            (!managelogs = <enable/disable>, <logname>)**\n------`;
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
            else if (commandData.args[1] === undefined) {
                const msgString = `------\n**Please, enter  a log name to disable or enable as the second argument of this command! 
            (!managelogs = <enable/disable>, <logname>)**\n------`;
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
            else {
                switch (commandData.args[1].toLowerCase()) {
                    case 'guildbanadd':
                        if (commandData.args[0].toString().toLowerCase() === 'enable') {
                            for (let x = 0; x < guildData.logs.length; x += 1) {
                                if (commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall) {
                                    guildData.logs[x].loggingChannelID = commandData.permsChannel.id;
                                    guildData.logs[x].loggingChannelName = commandData.permsChannel.name;
                                    guildData.logs[x].enabled = true;
                                    yield guildData.writeToDataBase();
                                    const msgEmbed = new Discord.MessageEmbed();
                                    const msgString = `------\n**Nicely done! You've enabled logging for '${guildData.logs[x].name}'.\nIn channel <#${guildData.logs[x].loggingChannelID}>.**\n------`;
                                    msgEmbed
                                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                                        .setColor(guildData.borderColor)
                                        .setDescription(msgString)
                                        .setTimestamp(Date())
                                        .setTitle('__**Manage Logs Enabled:**__');
                                    yield HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed);
                                    break;
                                }
                            }
                        }
                        else if (commandData.args[0].toString().toLowerCase() === 'disable') {
                            for (let x = 0; x < guildData.logs.length; x += 1) {
                                if (commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall) {
                                    guildData.logs[x].loggingChannelID = '';
                                    guildData.logs[x].loggingChannelName = '';
                                    guildData.logs[x].enabled = false;
                                    yield guildData.writeToDataBase();
                                    const msgEmbed = new Discord.MessageEmbed();
                                    const msgString = `------\n**Nicely done! You've disabled logging for '${guildData.logs[x].name}'.**\n------`;
                                    msgEmbed
                                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                                        .setColor(guildData.borderColor)
                                        .setDescription(msgString)
                                        .setTimestamp(Date())
                                        .setTitle('__**Manage Logs Disabled:**__');
                                    yield HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed);
                                    break;
                                }
                            }
                        }
                        break;
                    case 'guildbanremove':
                        if (commandData.args[0].toString().toLowerCase() === 'enable') {
                            for (let x = 0; x < guildData.logs.length; x += 1) {
                                if (commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall) {
                                    guildData.logs[x].loggingChannelID = commandData.permsChannel.id;
                                    guildData.logs[x].loggingChannelName = commandData.permsChannel.name;
                                    guildData.logs[x].enabled = true;
                                    yield guildData.writeToDataBase();
                                    const msgEmbed = new Discord.MessageEmbed();
                                    const msgString = `------\n**Nicely done! You've enabled logging for '${guildData.logs[x].name}'.\nIn channel <#${guildData.logs[x].loggingChannelID}>.**\n------`;
                                    msgEmbed
                                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                                        .setColor(guildData.borderColor)
                                        .setDescription(msgString)
                                        .setTimestamp(Date())
                                        .setTitle('__**Manage Logs Enabled:**__');
                                    yield HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed);
                                    break;
                                }
                            }
                        }
                        else if (commandData.args[0].toString().toLowerCase() === 'disable') {
                            for (let x = 0; x < guildData.logs.length; x += 1) {
                                if (commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall) {
                                    guildData.logs[x].loggingChannelID = '';
                                    guildData.logs[x].loggingChannelName = '';
                                    guildData.logs[x].enabled = false;
                                    yield guildData.writeToDataBase();
                                    const msgEmbed = new Discord.MessageEmbed();
                                    const msgString = `------\n**Nicely done! You've disabled logging for '${guildData.logs[x].name}'.**\n------`;
                                    msgEmbed
                                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                                        .setColor(guildData.borderColor)
                                        .setDescription(msgString)
                                        .setTimestamp(Date())
                                        .setTitle('__**Manage Logs Disabled:**__');
                                    yield HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed);
                                    break;
                                }
                            }
                        }
                        break;
                    case 'guildmemberadd':
                        if (commandData.args[0].toString().toLowerCase() === 'enable') {
                            for (let x = 0; x < guildData.logs.length; x += 1) {
                                if (commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall) {
                                    guildData.logs[x].loggingChannelID = commandData.permsChannel.id;
                                    guildData.logs[x].loggingChannelName = commandData.permsChannel.name;
                                    guildData.logs[x].enabled = true;
                                    yield guildData.writeToDataBase();
                                    const msgEmbed = new Discord.MessageEmbed();
                                    const msgString = `------\n**Nicely done! You've enabled logging for '${guildData.logs[x].name}'.\nIn channel <#${guildData.logs[x].loggingChannelID}>.**\n------`;
                                    msgEmbed
                                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                                        .setColor(guildData.borderColor)
                                        .setDescription(msgString)
                                        .setTimestamp(Date())
                                        .setTitle('__**Manage Logs Enabled:**__');
                                    yield HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed);
                                    break;
                                }
                            }
                        }
                        else if (commandData.args[0].toString().toLowerCase() === 'disable') {
                            for (let x = 0; x < guildData.logs.length; x += 1) {
                                if (commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall) {
                                    guildData.logs[x].loggingChannelID = '';
                                    guildData.logs[x].loggingChannelName = '';
                                    guildData.logs[x].enabled = false;
                                    yield guildData.writeToDataBase();
                                    const msgEmbed = new Discord.MessageEmbed();
                                    const msgString = `------\n**Nicely done! You've disabled logging for '${guildData.logs[x].name}'.**\n------`;
                                    msgEmbed
                                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                                        .setColor(guildData.borderColor)
                                        .setDescription(msgString)
                                        .setTimestamp(Date())
                                        .setTitle('__**Manage Logs Disabled:**__');
                                    yield HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed);
                                    break;
                                }
                            }
                        }
                        break;
                    case 'guildmemberremove':
                        if (commandData.args[0].toString().toLowerCase() === 'enable') {
                            for (let x = 0; x < guildData.logs.length; x += 1) {
                                if (commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall) {
                                    guildData.logs[x].loggingChannelID = commandData.permsChannel.id;
                                    guildData.logs[x].loggingChannelName = commandData.permsChannel.name;
                                    guildData.logs[x].enabled = true;
                                    yield guildData.writeToDataBase();
                                    const msgEmbed = new Discord.MessageEmbed();
                                    const msgString = `------\n**Nicely done! You've enabled logging for '${guildData.logs[x].name}' in channel <#${guildData.logs[x].loggingChannelID}>.**\n------'`;
                                    msgEmbed
                                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                                        .setColor(guildData.borderColor)
                                        .setDescription(msgString)
                                        .setTimestamp(Date())
                                        .setTitle('__**Manage Logs Enabled:**__');
                                    yield HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed);
                                    break;
                                }
                            }
                        }
                        else if (commandData.args[0].toString().toLowerCase() === 'disable') {
                            for (let x = 0; x < guildData.logs.length; x += 1) {
                                if (commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall) {
                                    guildData.logs[x].loggingChannelID = '';
                                    guildData.logs[x].loggingChannelName = '';
                                    guildData.logs[x].enabled = false;
                                    yield guildData.writeToDataBase();
                                    const msgEmbed = new Discord.MessageEmbed();
                                    const msgString = `------\n**Nicely done! You've disabled logging for '${guildData.logs[x].name}'.**\n------`;
                                    msgEmbed
                                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                                        .setColor(guildData.borderColor)
                                        .setDescription(msgString)
                                        .setTimestamp(Date())
                                        .setTitle('__**Manage Logs Disabled:**__');
                                    yield HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed);
                                    break;
                                }
                            }
                        }
                        break;
                    case 'displaynamechange':
                        if (commandData.args[0].toString().toLowerCase() === 'enable') {
                            for (let x = 0; x < guildData.logs.length; x += 1) {
                                if (commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall) {
                                    guildData.logs[x].loggingChannelID = commandData.permsChannel.id;
                                    guildData.logs[x].loggingChannelName = commandData.permsChannel.name;
                                    guildData.logs[x].enabled = true;
                                    yield guildData.writeToDataBase();
                                    const msgEmbed = new Discord.MessageEmbed();
                                    const msgString = `------\n**Nicely done! You've enabled logging for '${guildData.logs[x].name}'.\nIn channel <#${guildData.logs[x].loggingChannelID}>.**\n------`;
                                    msgEmbed
                                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                                        .setColor(guildData.borderColor)
                                        .setDescription(msgString)
                                        .setTimestamp(Date())
                                        .setTitle('__**Manage Logs Enabled:**__');
                                    yield HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed);
                                    break;
                                }
                            }
                        }
                        else if (commandData.args[0].toString().toLowerCase() === 'disable') {
                            for (let x = 0; x < guildData.logs.length; x += 1) {
                                if (commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall) {
                                    guildData.logs[x].loggingChannelID = '';
                                    guildData.logs[x].loggingChannelName = '';
                                    guildData.logs[x].enabled = false;
                                    yield guildData.writeToDataBase();
                                    const msgEmbed = new Discord.MessageEmbed();
                                    const msgString = `------\n**Nicely done! You've disabled logging for '${guildData.logs[x].name}'.**\n------`;
                                    msgEmbed
                                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                                        .setColor(guildData.borderColor)
                                        .setDescription(msgString)
                                        .setTimestamp(Date())
                                        .setTitle('__**Manage Logs Disabled:**__');
                                    yield HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed);
                                    break;
                                }
                            }
                        }
                        break;
                    case 'nicknamechange':
                        if (commandData.args[0].toString().toLowerCase() === 'enable') {
                            for (let x = 0; x < guildData.logs.length; x += 1) {
                                if (commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall) {
                                    guildData.logs[x].loggingChannelID = commandData.permsChannel.id;
                                    guildData.logs[x].loggingChannelName = commandData.permsChannel.name;
                                    guildData.logs[x].enabled = true;
                                    yield guildData.writeToDataBase();
                                    const msgEmbed = new Discord.MessageEmbed();
                                    const msgString = `------\n**Nicely done! You've enabled logging for '${guildData.logs[x].name}'.\nIn channel <#${guildData.logs[x].loggingChannelID}>.**\n------`;
                                    msgEmbed
                                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                                        .setColor(guildData.borderColor)
                                        .setDescription(msgString)
                                        .setTimestamp(Date())
                                        .setTitle('__**Manage Logs Enabled:**__');
                                    yield HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed);
                                    break;
                                }
                            }
                        }
                        else if (commandData.args[0].toString().toLowerCase() === 'disable') {
                            for (let x = 0; x < guildData.logs.length; x += 1) {
                                if (commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall) {
                                    guildData.logs[x].loggingChannelID = '';
                                    guildData.logs[x].loggingChannelName = '';
                                    guildData.logs[x].enabled = false;
                                    yield guildData.writeToDataBase();
                                    const msgEmbed = new Discord.MessageEmbed();
                                    const msgString = `------\n**Nicely done! You've disabled logging for '${guildData.logs[x].name}'.**\n------`;
                                    msgEmbed
                                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                                        .setColor(guildData.borderColor)
                                        .setDescription(msgString)
                                        .setTimestamp(Date())
                                        .setTitle('__**Manage Logs Disabled:**__');
                                    yield HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed);
                                    break;
                                }
                            }
                        }
                        break;
                    case 'roleaddorremove':
                        if (commandData.args[0].toString().toLowerCase() === 'enable') {
                            for (let x = 0; x < guildData.logs.length; x += 1) {
                                if (commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall) {
                                    guildData.logs[x].loggingChannelID = commandData.permsChannel.id;
                                    guildData.logs[x].loggingChannelName = commandData.permsChannel.name;
                                    guildData.logs[x].enabled = true;
                                    yield guildData.writeToDataBase();
                                    const msgEmbed = new Discord.MessageEmbed();
                                    const msgString = `------\n**Nicely done! You've enabled logging for '${guildData.logs[x].name}'.\nIn channel <#${guildData.logs[x].loggingChannelID}>.**\n------`;
                                    msgEmbed
                                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                                        .setColor(guildData.borderColor)
                                        .setDescription(msgString)
                                        .setTimestamp(Date())
                                        .setTitle('__**Manage Logs Enabled:**__');
                                    yield HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed);
                                    break;
                                }
                            }
                        }
                        else if (commandData.args[0].toString().toLowerCase() === 'disable') {
                            for (let x = 0; x < guildData.logs.length; x += 1) {
                                if (commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall) {
                                    guildData.logs[x].loggingChannelID = '';
                                    guildData.logs[x].loggingChannelName = '';
                                    guildData.logs[x].enabled = false;
                                    yield guildData.writeToDataBase();
                                    const msgEmbed = new Discord.MessageEmbed();
                                    const msgString = `------\n**Nicely done! You've disabled logging for '${guildData.logs[x].name}'.**\n------`;
                                    msgEmbed
                                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                                        .setColor(guildData.borderColor)
                                        .setDescription(msgString)
                                        .setTimestamp(Date())
                                        .setTitle('__**Manage Logs Disabled:**__');
                                    yield HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed);
                                    break;
                                }
                            }
                        }
                        break;
                    case 'invitecreate':
                        if (commandData.args[0].toString().toLowerCase() === 'enable') {
                            for (let x = 0; x < guildData.logs.length; x += 1) {
                                if (commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall) {
                                    guildData.logs[x].loggingChannelID = commandData.permsChannel.id;
                                    guildData.logs[x].loggingChannelName = commandData.permsChannel.name;
                                    guildData.logs[x].enabled = true;
                                    yield guildData.writeToDataBase();
                                    const msgEmbed = new Discord.MessageEmbed();
                                    const msgString = `------\n**Nicely done! You've enabled logging for '${guildData.logs[x].name}'.\nIn channel <#${guildData.logs[x].loggingChannelID}>.**\n------`;
                                    msgEmbed
                                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                                        .setColor(guildData.borderColor)
                                        .setDescription(msgString)
                                        .setTimestamp(Date())
                                        .setTitle('__**Manage Logs Enabled:**__');
                                    yield HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed);
                                    break;
                                }
                            }
                        }
                        else if (commandData.args[0].toString().toLowerCase() === 'disable') {
                            for (let x = 0; x < guildData.logs.length; x += 1) {
                                if (commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall) {
                                    guildData.logs[x].loggingChannelID = '';
                                    guildData.logs[x].loggingChannelName = '';
                                    guildData.logs[x].enabled = false;
                                    yield guildData.writeToDataBase();
                                    const msgEmbed = new Discord.MessageEmbed();
                                    const msgString = `------\n**Nicely done! You've disabled logging for '${guildData.logs[x].name}'.**\n------`;
                                    msgEmbed
                                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                                        .setColor(guildData.borderColor)
                                        .setDescription(msgString)
                                        .setTimestamp(Date())
                                        .setTitle('__**Manage Logs Disabled:**__');
                                    yield HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed);
                                    break;
                                }
                            }
                        }
                        break;
                    case 'messagedelete':
                        if (commandData.args[0].toString().toLowerCase() === 'enable') {
                            for (let x = 0; x < guildData.logs.length; x += 1) {
                                if (commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall) {
                                    guildData.logs[x].loggingChannelID = commandData.permsChannel.id;
                                    guildData.logs[x].loggingChannelName = commandData.permsChannel.name;
                                    guildData.logs[x].enabled = true;
                                    yield guildData.writeToDataBase();
                                    const msgEmbed = new Discord.MessageEmbed();
                                    const msgString = `------\n**Nicely done! You've enabled logging for '${guildData.logs[x].name}'.\nIn channel <#${guildData.logs[x].loggingChannelID}>.**\n------`;
                                    msgEmbed
                                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                                        .setColor(guildData.borderColor)
                                        .setDescription(msgString)
                                        .setTimestamp(Date())
                                        .setTitle('__**Manage Logs Enabled:**__');
                                    yield HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed);
                                    break;
                                }
                            }
                        }
                        else if (commandData.args[0].toString().toLowerCase() === 'disable') {
                            for (let x = 0; x < guildData.logs.length; x += 1) {
                                if (commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall) {
                                    guildData.logs[x].loggingChannelID = '';
                                    guildData.logs[x].loggingChannelName = '';
                                    guildData.logs[x].enabled = false;
                                    yield guildData.writeToDataBase();
                                    const msgEmbed = new Discord.MessageEmbed();
                                    const msgString = `------\n**Nicely done! You've disabled logging for '${guildData.logs[x].name}'.**\n------`;
                                    msgEmbed
                                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                                        .setColor(guildData.borderColor)
                                        .setDescription(msgString)
                                        .setTimestamp(Date())
                                        .setTitle('__**Manage Logs Disabled:**__');
                                    yield HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed);
                                    break;
                                }
                            }
                        }
                        break;
                    case 'messagedeletebulk':
                        if (commandData.args[0].toString().toLowerCase() === 'enable') {
                            for (let x = 0; x < guildData.logs.length; x += 1) {
                                if (commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall) {
                                    guildData.logs[x].loggingChannelID = commandData.permsChannel.id;
                                    guildData.logs[x].loggingChannelName = commandData.permsChannel.name;
                                    guildData.logs[x].enabled = true;
                                    yield guildData.writeToDataBase();
                                    const msgEmbed = new Discord.MessageEmbed();
                                    const msgString = `------\n**Nicely done! You've enabled logging for '${guildData.logs[x].name}'.\nIn channel <#${guildData.logs[x].loggingChannelID}>.**\n------`;
                                    msgEmbed
                                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                                        .setColor(guildData.borderColor)
                                        .setDescription(msgString)
                                        .setTimestamp(Date())
                                        .setTitle('__**Manage Logs Enabled:**__');
                                    yield HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed);
                                    break;
                                }
                            }
                        }
                        else if (commandData.args[0].toString().toLowerCase() === 'disable') {
                            for (let x = 0; x < guildData.logs.length; x += 1) {
                                if (commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall) {
                                    guildData.logs[x].enabled = true;
                                    guildData.logs[x].loggingChannelName = '';
                                    guildData.logs[x].enabled = false;
                                    yield guildData.writeToDataBase();
                                    const msgEmbed = new Discord.MessageEmbed();
                                    const msgString = `------\n**Nicely done! You've disabled logging for '${guildData.logs[x].name}'.**\n------`;
                                    msgEmbed
                                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                                        .setColor(guildData.borderColor)
                                        .setDescription(msgString)
                                        .setTimestamp(Date())
                                        .setTitle('__**Manage Logs Disabled:**__');
                                    yield HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed);
                                    break;
                                }
                            }
                        }
                        break;
                    case 'messageupdate':
                        if (commandData.args[0].toString().toLowerCase() === 'enable') {
                            for (let x = 0; x < guildData.logs.length; x += 1) {
                                if (commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall) {
                                    guildData.logs[x].loggingChannelID = commandData.permsChannel.id;
                                    guildData.logs[x].loggingChannelName = commandData.permsChannel.name;
                                    guildData.logs[x].enabled = true;
                                    yield guildData.writeToDataBase();
                                    const msgEmbed = new Discord.MessageEmbed();
                                    const msgString = `------\n**Nicely done! You've enabled logging for '${guildData.logs[x].name}'.\nIn channel <#${guildData.logs[x].loggingChannelID}>.**\n------`;
                                    msgEmbed
                                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                                        .setColor(guildData.borderColor)
                                        .setDescription(msgString)
                                        .setTimestamp(Date())
                                        .setTitle('__**Manage Logs Enabled:**__');
                                    yield HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed);
                                    break;
                                }
                            }
                        }
                        else if (commandData.args[0].toString().toLowerCase() === 'disable') {
                            for (let x = 0; x < guildData.logs.length; x += 1) {
                                if (commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall) {
                                    guildData.logs[x].loggingChannelID = '';
                                    guildData.logs[x].loggingChannelName = '';
                                    guildData.logs[x].enabled = false;
                                    yield guildData.writeToDataBase();
                                    const msgEmbed = new Discord.MessageEmbed();
                                    const msgString = `------\n**Nicely done! You've disabled logging for '${guildData.logs[x].name}'.**\n------`;
                                    msgEmbed
                                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                                        .setColor(guildData.borderColor)
                                        .setDescription(msgString)
                                        .setTimestamp(Date())
                                        .setTitle('__**Manage Logs Disabled:**__');
                                    yield HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed);
                                    break;
                                }
                            }
                        }
                        break;
                    case 'rolecreate':
                        if (commandData.args[0].toString().toLowerCase() === 'enable') {
                            for (let x = 0; x < guildData.logs.length; x += 1) {
                                if (commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall) {
                                    guildData.logs[x].loggingChannelID = commandData.permsChannel.id;
                                    guildData.logs[x].loggingChannelName = commandData.permsChannel.name;
                                    guildData.logs[x].enabled = true;
                                    yield guildData.writeToDataBase();
                                    const msgEmbed = new Discord.MessageEmbed();
                                    const msgString = `------\n**Nicely done! You've enabled logging for '${guildData.logs[x].name}'.\nIn channel <#${guildData.logs[x].loggingChannelID}>.**\n------`;
                                    msgEmbed
                                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                                        .setColor(guildData.borderColor)
                                        .setDescription(msgString)
                                        .setTimestamp(Date())
                                        .setTitle('__**Manage Logs Enabled:**__');
                                    yield HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed);
                                    break;
                                }
                            }
                        }
                        else if (commandData.args[0].toString().toLowerCase() === 'disable') {
                            for (let x = 0; x < guildData.logs.length; x += 1) {
                                if (commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall) {
                                    guildData.logs[x].loggingChannelID = '';
                                    guildData.logs[x].loggingChannelName = '';
                                    guildData.logs[x].enabled = false;
                                    yield guildData.writeToDataBase();
                                    const msgEmbed = new Discord.MessageEmbed();
                                    const msgString = `------\n**Nicely done! You've disabled logging for '${guildData.logs[x].name}'.**\n------`;
                                    msgEmbed
                                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                                        .setColor(guildData.borderColor)
                                        .setDescription(msgString)
                                        .setTimestamp(Date())
                                        .setTitle('__**Manage Logs Disabled:**__');
                                    yield HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed);
                                    break;
                                }
                            }
                        }
                        break;
                    case 'roledelete':
                        if (commandData.args[0].toString().toLowerCase() === 'enable') {
                            for (let x = 0; x < guildData.logs.length; x += 1) {
                                if (commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall) {
                                    guildData.logs[x].loggingChannelID = commandData.permsChannel.id;
                                    guildData.logs[x].loggingChannelName = commandData.permsChannel.name;
                                    guildData.logs[x].enabled = true;
                                    yield guildData.writeToDataBase();
                                    const msgEmbed = new Discord.MessageEmbed();
                                    const msgString = `------\n**Nicely done! You've enabled logging for '${guildData.logs[x].name}'.\nIn channel <#${guildData.logs[x].loggingChannelID}>.**\n------`;
                                    msgEmbed
                                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                                        .setColor(guildData.borderColor)
                                        .setDescription(msgString)
                                        .setTimestamp(Date())
                                        .setTitle('__**Manage Logs Enabled:**__');
                                    yield HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed);
                                    break;
                                }
                            }
                        }
                        else if (commandData.args[0].toString().toLowerCase() === 'disable') {
                            for (let x = 0; x < guildData.logs.length; x += 1) {
                                if (commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall) {
                                    guildData.logs[x].loggingChannelID = '';
                                    guildData.logs[x].enabled = false;
                                    guildData.logs[x].enabled = false;
                                    yield guildData.writeToDataBase();
                                    const msgEmbed = new Discord.MessageEmbed();
                                    const msgString = `------\n**Nicely done! You've disabled logging for '${guildData.logs[x].name}'.**\n------`;
                                    msgEmbed
                                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                                        .setColor(guildData.borderColor)
                                        .setDescription(msgString)
                                        .setTimestamp(Date())
                                        .setTitle('__**Manage Logs Disabled:**__');
                                    yield HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed);
                                    break;
                                }
                            }
                        }
                        break;
                    case 'usernamechange':
                        if (commandData.args[0].toString().toLowerCase() === 'enable') {
                            for (let x = 0; x < guildData.logs.length; x += 1) {
                                if (commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall) {
                                    guildData.logs[x].loggingChannelID = commandData.permsChannel.id;
                                    guildData.logs[x].loggingChannelName = commandData.permsChannel.name;
                                    guildData.logs[x].enabled = true;
                                    yield guildData.writeToDataBase();
                                    const msgEmbed = new Discord.MessageEmbed();
                                    const msgString = `------\n**Nicely done! You've enabled logging for '${guildData.logs[x].name}'.\nIn channel <#${guildData.logs[x].loggingChannelID}>.**\n------`;
                                    msgEmbed
                                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                                        .setColor(guildData.borderColor)
                                        .setDescription(msgString)
                                        .setTimestamp(Date())
                                        .setTitle('__**Manage Logs Enabled:**__');
                                    yield HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed);
                                    break;
                                }
                            }
                        }
                        else if (commandData.args[0].toString().toLowerCase() === 'disable') {
                            for (let x = 0; x < guildData.logs.length; x += 1) {
                                if (commandData.args[1].toLowerCase() === guildData.logs[x].nameSmall) {
                                    guildData.logs[x].loggingChannelID = '';
                                    guildData.logs[x].loggingChannelName = '';
                                    guildData.logs[x].enabled = false;
                                    yield guildData.writeToDataBase();
                                    const msgEmbed = new Discord.MessageEmbed();
                                    const msgString = `------\n**Nicely done! You've disabled logging for '${guildData.logs[x].name}'.**\n------`;
                                    msgEmbed
                                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                                        .setColor(guildData.borderColor)
                                        .setDescription(msgString)
                                        .setTimestamp(Date())
                                        .setTitle('__**Manage Logs Disabled:**__');
                                    yield HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed);
                                    break;
                                }
                            }
                        }
                        break;
                    default:
                        const msgString = 'Please enter a proper log name!';
                        let msgEmbed = new Discord.MessageEmbed()
                            .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                            .setColor(guildData.borderColor)
                            .setDescription(msgString)
                            .setTimestamp(Date())
                            .setTitle('__**Manage Logs:**__');
                        let msg = yield HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed);
                        if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                            msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                        }
                        yield msg.delete({ timeout: 20000 });
                        return commandReturnData;
                }
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
