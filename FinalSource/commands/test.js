// test.ts - Module for my testing stuff.
// Feb 4, 2021
// Chris M.
// https://github.com/RealTimeChriss
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
const HelperFunctions_1 = __importDefault(require("../HelperFunctions"));
const command = {
    name: 'test',
    description: '!test',
    function: Function()
};
function execute(commandData, discordUser) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const commandReturnData = {
                commandName: command.name
            };
            if (commandData.guildMember instanceof Discord.User) {
                const msgString = '------\n**TEST!**\n------';
                let msgEmbed = new Discord.MessageEmbed()
                    .setAuthor(commandData.guildMember.username, commandData.guildMember.avatarURL())
                    .setColor([254, 254, 254])
                    .setDescription(msgString)
                    .setTimestamp(Date())
                    .setTitle('__**Test:**__');
                yield HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed);
            }
            else {
                const msgString = '------\n**TEST!**\n------';
                let msgEmbed = new Discord.MessageEmbed()
                    .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                    .setColor([254, 254, 254])
                    .setDescription(msgString)
                    .setTimestamp(Date())
                    .setTitle('__**Test:**__');
                yield HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed);
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
