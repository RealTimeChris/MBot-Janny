// setdeletionstatus.ts - Module for my "set deletion status" command.
// Feb 25, 2021
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
    name: 'setdeletionstatus',
    description: 'Use this to enable/disable message deletion/pruning in a given channel.\nIn the desired channel, type !setdeletionstatus = ENABLE/DISABLE, AMOUNTOFMESSAGESTOSAVE,'
        + ' enter nothing for AMOUNTOFMESSAGESTOSAVE to save none!\nAlso simply enter !setdeletionstatus to view the current list of channels being purged on the current server!',
    function: Function()
};
function execute(commandData, discordUser) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const commandReturnData = {
                commandName: command.name
            };
            const areWeInADM = yield HelperFunctions_1.default.areWeInADM(commandData);
            if (areWeInADM === true) {
                return commandReturnData;
            }
            const doWeHaveAdminPerms = yield HelperFunctions_1.default.doWeHaveAdminPermission(commandData, discordUser);
            if (doWeHaveAdminPerms === false) {
                return commandReturnData;
            }
            const guildData = new GuildData_1.default({ dataBase: discordUser.dataBase, id: commandData.guild.id, name: commandData.guild.name, memberCount: commandData.guild.memberCount });
            yield guildData.getFromDataBase();
            let whatAreWeDoing = '';
            const messageCountRegExp = /\d{1,18}/;
            let howManyBack = 0;
            if (commandData.args[0] === undefined) {
                whatAreWeDoing = 'viewing';
            }
            else if ((commandData.args[0] !== undefined && commandData.args[0].toLowerCase() !== 'enable' && commandData.args[0].toLowerCase() !== 'disable')) {
                const msgString = "------\n**Please enter either 'enable' or 'disable'! (!setdeletionstatus = ENABLE/DISABLE, AMOUNTOFMESSAGESTOSAVE, or just !setdeletionstatus = ENABLE/DISABLE)**\n------";
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
            else if (commandData.args[0].toLowerCase() === 'enable' && commandData.args[1] !== undefined && (!messageCountRegExp.test(commandData.args[1]) || parseInt(commandData.args[1], 10) < 0 || parseInt(commandData.args[1], 10) > 10000)) {
                const msgString = '------\n**Please enter a valid number of messages back to save! (0 to 10000) (!setdeletionstatus = ENABLE/DISABLE, AMOUNTOFMESSAGESTOSAVE, or just !setdeletionstatus = ENABLE/DISABLE)**\n------';
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
            else if (commandData.args[1] !== undefined) {
                whatAreWeDoing = commandData.args[0].toLowerCase();
                howManyBack = parseInt(commandData.args[1].toString().match(messageCountRegExp)[0], 10);
            }
            else if (commandData.args[1] === undefined) {
                whatAreWeDoing = commandData.args[0].toLowerCase();
                howManyBack = 0;
            }
            let currentDeletionChannel = {
                numberOfMessagesToSave: howManyBack,
                channelID: commandData.fromTextChannel.id,
                currentlyBeingDeleted: false,
                deletionMessageID: ''
            };
            if (whatAreWeDoing === 'viewing') {
                let msgString = '\n------\n';
                if (guildData.deletionChannels.length > 0) {
                    for (let x = 0; x < guildData.deletionChannels.length; x += 1) {
                        const currentChannel = (_a = commandData.guild) === null || _a === void 0 ? void 0 : _a.channels.resolve((_b = guildData.deletionChannels[x]) === null || _b === void 0 ? void 0 : _b.channelID);
                        if (currentChannel === null) {
                            guildData.deletionChannels.splice(x, 1);
                            continue;
                        }
                        msgString += `__**Channel:**__ <#${guildData.deletionChannels[x].channelID}>, __**Messages To Save:**__ ` +
                            `${guildData.deletionChannels[x].numberOfMessagesToSave}\n`;
                    }
                }
                else {
                    msgString = "------\n__There's no channels to display, currently!__\n";
                }
                msgString += '------';
                const msgEmbed = new Discord.MessageEmbed();
                msgEmbed
                    .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                    .setColor(guildData.borderColor)
                    .setDescription(msgString)
                    .setTimestamp(Date())
                    .setTitle('__**Current Deletion Channels:**__');
                yield HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed);
                return commandReturnData;
            }
            if (whatAreWeDoing === 'enable') {
                let isItFound = false;
                let deletionChannelIndex;
                for (let x = 0; x < guildData.deletionChannels.length; x += 1) {
                    if (commandData.fromTextChannel.id === guildData.deletionChannels[x].channelID) {
                        currentDeletionChannel = guildData.deletionChannels[x];
                        currentDeletionChannel.currentlyBeingDeleted = false;
                        currentDeletionChannel.numberOfMessagesToSave = howManyBack;
                        isItFound = true;
                        deletionChannelIndex = x;
                    }
                }
                if (isItFound === true) {
                    const msgString = '------\n**This channel has already been added! I will update your number of saved messages though!**\n------';
                    let msgEmbed = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Channel Re-Added:**__');
                    let message = yield HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed);
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        message = new Discord.Message(commandData.guildMember.client, message, commandData.fromTextChannel);
                    }
                    message.delete({ timeout: 20000 });
                    try {
                        const previousMessage = yield commandData.fromTextChannel.messages.fetch(currentDeletionChannel.deletionMessageID);
                        if (previousMessage.deletable === true) {
                            yield previousMessage.delete();
                        }
                    }
                    catch (error) {
                        if (error.message === 'Unknown Message') {
                            currentDeletionChannel.deletionMessageID = '';
                        }
                    }
                }
                const msgString = `__**Messages beyond message number ${currentDeletionChannel.numberOfMessagesToSave} are being purged, in this channel.**__`;
                const messageEmbed = new Discord.MessageEmbed();
                messageEmbed
                    .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                    .setColor(guildData.borderColor)
                    .setDescription(msgString)
                    .setTimestamp(Date())
                    .setTitle('__**Enabled Channel Purging:**__');
                let pinMessage = yield HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, messageEmbed);
                if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                    pinMessage = new Discord.Message(commandData.guildMember.client, pinMessage, commandData.fromTextChannel);
                }
                yield pinMessage.pin();
                currentDeletionChannel.deletionMessageID = pinMessage.id;
                if (isItFound === true) {
                    guildData.deletionChannels[deletionChannelIndex] = currentDeletionChannel;
                }
                else {
                    guildData.deletionChannels.push(currentDeletionChannel);
                }
                yield guildData.writeToDataBase();
                return commandReturnData;
            }
            if (whatAreWeDoing === 'disable') {
                let isItFound = false;
                let deletionChannelIndex;
                for (let x = 0; x < guildData.deletionChannels.length; x += 1) {
                    if (commandData.fromTextChannel.id === guildData.deletionChannels[x].channelID) {
                        isItFound = true;
                        deletionChannelIndex = x;
                    }
                }
                if (isItFound === false) {
                    const msgString = '------\n**Sorry, but this channel could not be found in the list of active deletion channels!**\n------';
                    let msgEmbed = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Channel Issue:**__');
                    let msg = yield HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed);
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    yield msg.delete({ timeout: 20000 });
                    return commandReturnData;
                }
                guildData.deletionChannels.splice(deletionChannelIndex, 1);
                yield guildData.writeToDataBase();
                const msgString = `${'\n------\n__**Channel Name:**__ <#'}${currentDeletionChannel.channelID}>\n------`;
                const messageEmbed = new Discord.MessageEmbed();
                messageEmbed
                    .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                    .setColor(guildData.borderColor)
                    .setDescription(msgString)
                    .setTimestamp(Date())
                    .setTitle('__**Disabled Channel Purging:**__');
                yield HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, messageEmbed);
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
