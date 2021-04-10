// purge.ts - Module for my purge messages command.
// Jan 30, 2021
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
    name: 'purge',
    description: '!purge = AMOUNTTODELETE, between 1 and 100 messages!',
    function: Function()
};
/**
 * Purges up to 100 messages from a given channel at a time.
 */
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
            const doWeHaveAdminPerms = yield HelperFunctions_1.default.doWeHaveAdminPermission(commandData, discordUser);
            if (doWeHaveAdminPerms === false) {
                return commandReturnData;
            }
            const guildData = new GuildData_1.default({ dataBase: discordUser.dataBase, id: commandData.guild.id, name: commandData.guild.name, memberCount: commandData.guild.memberCount });
            yield guildData.getFromDataBase();
            const regExp = new RegExp(/\d{1,3}/);
            if (commandData.args[0] === undefined || !regExp.test(commandData.args[0])
                || parseInt(commandData.args[0], 10) <= 0 || parseInt(commandData.args[0], 10) > 100) {
                const msgString = '------\n**Please enter a valid number of messages you would like to delete (1, to 100)! (!purge = AMOUNTTODELETE)**\n------';
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
                msg.delete({ timeout: 20000 });
                return commandReturnData;
            }
            const deleteCount = parseInt(commandData.args[0].toString().match(regExp)[0], 10);
            let currentChannel = yield commandData.guildMember.client.channels.fetch(commandData.fromTextChannel.id);
            currentChannel.bulkDelete(deleteCount, false);
            const msgString = `<@!${commandData.guildMember.id}> I've just deleted ${deleteCount} messages from this channel!`;
            let msgEmbed = new Discord.MessageEmbed()
                .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                .setColor(guildData.borderColor)
                .setDescription(msgString)
                .setTimestamp(Date())
                .setTitle('__**Messages Purged:**__');
            let msg = yield HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed);
            if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
            }
            yield msg.delete({ timeout: 5000 });
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
