// displayguildsdata.ts - Module for my displayguildsdata command.
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
    name: 'displayguildsdata',
    description: '!displayguildsdata = BOTNAME, to display the guild info of the bots in chat!',
    function: Function()
};
/**
 * Displays all of the data for all of the guilds, either in console or in chat.
 */
function execute(commandData, discordUser) {
    var _a, _b, _c, _d, _e, _f;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const commandReturnData = {
                commandName: command.name
            };
            if (((_a = commandData.args[0]) === null || _a === void 0 ? void 0 : _a.toLowerCase()) !== 'janny' && ((_b = commandData.args[0]) === null || _b === void 0 ? void 0 : _b.toLowerCase()) !== 'musichouse' && ((_c = commandData.args[0]) === null || _c === void 0 ? void 0 : _c.toLowerCase()) !== 'gamehouse') {
                const msgString = '------\n**Please, enter the name of a bot as the first argument! (!displayguildsdata = BOTNAME)**\n------';
                const msgEmbed = new Discord.MessageEmbed();
                msgEmbed
                    .setAuthor(discordUser.userData.userName, (_e = (_d = commandData.guildMember) === null || _d === void 0 ? void 0 : _d.client.users.resolve(discordUser.userData.userID)) === null || _e === void 0 ? void 0 : _e.avatarURL())
                    .setColor([254, 254, 254])
                    .setDescription(msgString)
                    .setTimestamp(Date())
                    .setTitle("__**Invalid Or Missing Arguments:**__");
                let msg = yield HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed);
                if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                    msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                }
                yield msg.delete({ timeout: 20000 });
            }
            if (((_f = commandData.args[0]) === null || _f === void 0 ? void 0 : _f.toLowerCase()) !== 'janny') {
                return commandReturnData;
            }
            let currentCount = 0;
            GuildData_1.default.guildsData.forEach(guild => {
                var _a;
                let msgString = '';
                msgString += `__Guild Name:__ ${guild.guildName}\n`;
                msgString += `__Guild ID:__ ${guild.id}\n`;
                msgString += `__Member Count:__ ${guild.memberCount}\n`;
                (_a = commandData.guildMember) === null || _a === void 0 ? void 0 : _a.client.guilds.fetch(guild.id).then(guild => {
                    msgString += `__Created:__ ${guild.createdAt}\n`;
                    msgString += `__Guild Owner:__ <@!${guild.owner.id}> (${guild.owner.user.tag})\n`;
                    const messageEmbed = new Discord.MessageEmbed()
                        .setColor([254, 254, 254])
                        .setThumbnail(guild.iconURL())
                        .setTitle(`__**Guild Data ${currentCount + 1} of ${GuildData_1.default.guildsData.size}:**__`)
                        .setTimestamp(Date())
                        .setDescription(msgString);
                    HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, messageEmbed);
                    currentCount += 1;
                });
            });
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
