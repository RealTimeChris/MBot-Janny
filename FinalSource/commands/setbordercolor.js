// setbordercolor.ts - Module for my "set border color" command.
// Apr 3, 2021
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
    name: 'setbordercolor',
    description: '__**Set Border Color Usage:**__ Sets the default color of the borders of the chat messages sent out by this bot! ' +
        '!setbordercolor = BOTNAME, BOTCOLORREDCHANNEL, BOTCOLORGREENCHANNEL, BOTCOLORBLUECHANNEL where botcolor is an array of 3 color values between 0 and 255.',
    function: Function()
};
function execute(commandData, discordUser) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const commandReturnData = {
                commandName: command.name
            };
            let areWeInADM = yield HelperFunctions_1.default.areWeInADM(commandData);
            if (areWeInADM) {
                return commandReturnData;
            }
            const guildData = new GuildData_1.default({ dataBase: discordUser.dataBase, id: commandData.guild.id, name: commandData.guild.name, memberCount: commandData.guild.memberCount });
            yield guildData.getFromDataBase();
            const borderColor = [];
            if (commandData.args[0] === undefined || (commandData.args[0].toLowerCase() !== 'janny' && commandData.args[0].toLowerCase() !== 'gamehouse' && commandData.args[0] !== 'musichouse')) {
                const msgString = `------\n**Please, enter a bot's name as the first argument to this command! (!setbordercolor = BOTNAME, BOTCOLORREDCHANNEL, BOTCOLORGREENCHANNEL, BOTCOLORBLUECHANNEL)**\n------`;
                const msgEmbed = new Discord.MessageEmbed();
                msgEmbed
                    .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                    .setColor(guildData.borderColor)
                    .setDescription(msgString)
                    .setTimestamp(Date())
                    .setTitle("__**Missing Or Invalid Arguments:**__");
                yield HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed);
                return commandReturnData;
            }
            else if (commandData.args[0].toLowerCase() !== 'janny') {
                return commandReturnData;
            }
            if (parseInt(commandData.args[1], 10) > 255 || parseInt(commandData.args[1]) < 0 || commandData.args[1] === undefined) {
                const msgString = `------\n**Please, enter a red-channel value between 0 and 255! (!setbordercolor = BOTNAME, BOTCOLORREDCHANNEL, BOTCOLORGREENCHANNEL, BOTCOLORBLUECHANNEL)**\n------`;
                const msgEmbed = new Discord.MessageEmbed();
                msgEmbed
                    .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                    .setColor(guildData.borderColor)
                    .setDescription(msgString)
                    .setTimestamp(Date())
                    .setTitle("__**Missing Or Invalid Arguments:**__");
                yield HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed);
                return commandReturnData;
            }
            else if (parseInt(commandData.args[2], 10) > 255 || parseInt(commandData.args[2]) < 0 || commandData.args[2] === undefined) {
                const msgString = `------\n**Please, enter a green-channel value between 0 and 255! (!setbordercolor = BOTNAME, BOTCOLORREDCHANNEL, BOTCOLORGREENCHANNEL, BOTCOLORBLUECHANNEL)**\n------`;
                const msgEmbed = new Discord.MessageEmbed();
                msgEmbed
                    .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                    .setColor(guildData.borderColor)
                    .setDescription(msgString)
                    .setTimestamp(Date())
                    .setTitle("__**Missing Or Invalid Arguments:**__");
                yield HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed);
                return commandReturnData;
            }
            else if (parseInt(commandData.args[3], 10) > 255 || parseInt(commandData.args[3]) < 0 || commandData.args[3] === undefined) {
                const msgString = `------\n**Please, enter a green-channel value between 0 and 255! (!setbordercolor = BOTNAME, BOTCOLORREDCHANNEL, BOTCOLORGREENCHANNEL, BOTCOLORBLUECHANNEL)**\n------`;
                const msgEmbed = new Discord.MessageEmbed();
                msgEmbed
                    .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                    .setColor(guildData.borderColor)
                    .setDescription(msgString)
                    .setTimestamp(Date())
                    .setTitle("__**Missing Or Invalid Arguments:**__");
                yield HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed);
                return commandReturnData;
            }
            else {
                borderColor[0] = parseInt(commandData.args[1], 10);
                if (borderColor[0] === 255) {
                    borderColor[0] = 254;
                }
                borderColor[1] = parseInt(commandData.args[2], 10);
                if (borderColor[1] === 255) {
                    borderColor[1] = 254;
                }
                borderColor[2] = parseInt(commandData.args[3], 10);
                if (borderColor[2] === 255) {
                    borderColor[2] = 254;
                }
            }
            guildData.borderColor = borderColor;
            yield guildData.writeToDataBase();
            const msgEmbed = new Discord.MessageEmbed();
            msgEmbed
                .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                .setColor(guildData.borderColor)
                .setDescription(`Nicely done, you've updated the default border color for this bot!\n------\n__**Border Color Values:**__ ${guildData.borderColor}\n------`)
                .setTimestamp(Date())
                .setTitle('__**Updated Border Color:**__');
            yield HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed);
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
