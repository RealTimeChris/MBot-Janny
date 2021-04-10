// help.ts - Module for my help command.
// Jan 29, 2021
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
const HelperFunctions_1 = __importDefault(require("../HelperFunctions"));
const CommandIndex_1 = __importDefault(require("../CommandIndex"));
const command = {
    name: 'help',
    description: 'Help Usage: !help, or !help = COMMANDNAME, in order to get help with a specific COMMAND.',
    function: Function()
};
/**
 * Returns a menu of helping information for the various commands I have.
 */
function execute(commandData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const commandReturnData = {
                commandName: command.name
            };
            const commandFiles = CommandIndex_1.default;
            if (commandData.args[0] === undefined) {
                const commandNames = [];
                let currentIndex = 0;
                let msgString = '';
                msgString += '!help = COMMANDNAMEHERE\n\n__**List of command names:**__ ';
                commandFiles.forEach((value, key) => {
                    commandNames[key] = value.name;
                    msgString += commandNames[key];
                    currentIndex += 1;
                    if (currentIndex < commandFiles.size) {
                        msgString += ', ';
                    }
                });
                const messageEmbed = new Discord.MessageEmbed();
                if (commandData.guildMember instanceof Discord.GuildMember) {
                    messageEmbed
                        .setImage(commandData.guildMember.client.user.avatarURL().toString())
                        .setTimestamp(Date())
                        .setAuthor(commandData.guildMember.client.user.username, commandData.guildMember.client.user.avatarURL())
                        .setTitle(`__**${commandData.guildMember.user.username} Help:**__`)
                        .setDescription(msgString)
                        .setColor([254, 254, 254]);
                }
                else if (commandData.guildMember instanceof Discord.User) {
                    messageEmbed
                        .setImage(commandData.guildMember.client.user.avatarURL().toString())
                        .setTimestamp(Date())
                        .setAuthor(commandData.guildMember.username, commandData.guildMember.avatarURL())
                        .setTitle(`__**${commandData.guildMember.username} Help:**__`)
                        .setDescription(msgString)
                        .setColor([254, 254, 254]);
                }
                if (commandData.guildMember instanceof Discord.User) {
                    yield HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, messageEmbed);
                }
                else if (commandData.guildMember instanceof Discord.GuildMember) {
                    const dmChannel = yield commandData.guildMember.user.createDM();
                    yield dmChannel.send(messageEmbed);
                    const msgString = `------\n**I've sent you help info, via a message!**\n------`;
                    let msgEmbed = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([254, 254, 255])
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Help:**__');
                    yield HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed);
                }
                return commandReturnData;
            }
            let isFound = false;
            let commandDescription;
            let commandName = '';
            commandFiles.forEach((value) => {
                if (commandData.args[0] === value.name) {
                    isFound = true;
                    commandDescription = value.description;
                    commandName = value.name;
                }
            });
            if (isFound === false) {
                const msgString = `------\n**Sorry, but that command was not found!**\n------`;
                let msgEmbed = new Discord.MessageEmbed()
                    .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                    .setColor([254, 254, 254])
                    .setDescription(msgString)
                    .setTimestamp(Date())
                    .setTitle('__**Command Issue:**__');
                yield HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed);
                return commandReturnData;
            }
            if (commandDescription instanceof Discord.MessageEmbed) {
                commandDescription
                    .setAuthor(commandData.guildMember.client.user.username, commandData.guildMember.client.user.avatarURL())
                    .setColor([254, 254, 254])
                    .setTitle(`__**${commandName.charAt(0).toUpperCase() + commandName.slice(1)} Help:**__`)
                    .setTimestamp(Date());
                yield HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, commandDescription);
            }
            else {
                const messageEmbed = new Discord.MessageEmbed();
                if (commandData.guildMember instanceof Discord.GuildMember) {
                    messageEmbed
                        .setDescription(commandDescription)
                        .setTimestamp(Date())
                        .setAuthor(commandData.guildMember.client.user.username, commandData.guildMember.client.user.avatarURL())
                        .setTitle(`__**${commandName.charAt(0).toUpperCase() + commandName.slice(1)} Help:**__`)
                        .setColor([254, 254, 254]);
                }
                else if (commandData.guildMember instanceof Discord.User) {
                    messageEmbed
                        .setDescription(commandDescription)
                        .setTimestamp(Date())
                        .setAuthor(commandData.guildMember.username, commandData.guildMember.avatarURL())
                        .setTitle(`__**${commandName.charAt(0).toUpperCase() + commandName.slice(1)} Help:**__`)
                        .setColor([254, 254, 254]);
                }
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
