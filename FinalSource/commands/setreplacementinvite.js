// setreplacementinvite.ts - Module for my "set replacement invite" command.
// Feb 22, 2021
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
    name: 'setreplacementinvite',
    description: '!setreplacementinvite = REPLACEMENTINVITELINK\nBe sure to call this from within the chosen server, before it gets nuked!',
    function: Function()
};
function execute(commandData, discordUser) {
    return __awaiter(this, void 0, void 0, function* () {
        const commandReturnData = {
            commandName: command.name
        };
        try {
            const areWeInADM = yield HelperFunctions_1.default.areWeInADM(commandData);
            if (areWeInADM === true) {
                return commandReturnData;
            }
            const doWeHaveAdminPerms = yield HelperFunctions_1.default.doWeHaveAdminPermission(commandData, discordUser);
            if (doWeHaveAdminPerms === false) {
                return commandReturnData;
            }
            let guildData;
            try {
                const guildData = new GuildData_1.default({ dataBase: discordUser.dataBase, id: commandData.guild.id, name: commandData.guild.name, memberCount: commandData.guild.memberCount });
                yield guildData.getFromDataBase();
            }
            catch (error) {
                if (error.type === 'NotFoundError') {
                    const msgString = '------\n**Sorry, but your current guild could not be found!**\n------';
                    let msgEmbed = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Server Issue:**__');
                    let msg = yield HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed);
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    yield msg.delete({ timeout: 20000 });
                    return commandReturnData;
                }
            }
            const inviteRegExp = /https:\/\/discord.gg\/\w{1,26}/;
            let whatAreWeDoing = '';
            if (commandData.args[0] !== undefined && !inviteRegExp.test(commandData.args[0])) {
                const msgString = '------\n**Please, enter a valid new server invite link! (!setreplacementinvite = REPLACEMENTINVITELINK)**\n------';
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
            if (commandData.args[0] === undefined) {
                whatAreWeDoing = 'viewing';
            }
            else if (commandData.args[0] !== undefined && inviteRegExp.test(commandData.args[0])) {
                whatAreWeDoing = 'adding';
            }
            const inviteLink = commandData.args[0];
            if (whatAreWeDoing === 'viewing') {
                const serverRecordKey = `${commandData.guild.id} + Record`;
                const serverRecordObject = yield discordUser.dataBase.get(serverRecordKey);
                const inviteLink2 = serverRecordObject.replacementServerInvite;
                let msgString = '\n------\n';
                if (inviteLink === '') {
                    msgString += "__There's no link to display, currently!__\n------";
                }
                else {
                    msgString += `__**Link:**__ ${inviteLink2}\n------`;
                }
                const messageEmbed = new Discord.MessageEmbed()
                    .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                    .setColor(guildData.borderColor)
                    .setTimestamp(Date())
                    .setTitle('__**Replacement Invite Link:**__')
                    .setDescription(msgString);
                yield HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, messageEmbed);
                return commandReturnData;
            }
            if (whatAreWeDoing === 'adding') {
                const serverRecordKey = `${commandData.guild.id} + Record`;
                const serverRecordObject = yield discordUser.dataBase.get(serverRecordKey);
                serverRecordObject.replacementServerInvite = inviteLink;
                console.log(serverRecordObject);
                yield discordUser.dataBase.put(serverRecordKey, serverRecordObject);
                const msgString = `Great! You've updated the guild ${serverRecordObject.serverName}'s replacement invite link!`
                    + `\n------\n__**Link:**__ ${serverRecordObject.replacementServerInvite}\n------`;
                const messageEmbed = new Discord.MessageEmbed()
                    .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                    .setColor(guildData.borderColor)
                    .setTimestamp(Date())
                    .setTitle('__**Replacement Invite Link Updated:**__')
                    .setDescription(msgString);
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
