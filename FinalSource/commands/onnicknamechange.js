// onnicknamechange.ts - Module for my "on nickname change" commaand.
// Mar 12, 2021
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
const command = {
    name: 'onnicknamechange',
    description: "It's an automatic one!",
    function: Function()
};
function execute(client, oldGuildMember, newGuildMember, discordUser) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const commandReturnData = {
                commandName: command.name
            };
            if (!(newGuildMember instanceof Discord.GuildMember)) {
                return commandReturnData;
            }
            const guildData = new GuildData_1.default({ dataBase: discordUser.dataBase, id: newGuildMember.guild.id,
                name: newGuildMember.guild.name, memberCount: newGuildMember.guild.memberCount });
            yield guildData.getFromDataBase();
            let logs;
            for (let x = 0; x < guildData.logs.length; x += 1) {
                if (guildData.logs[x].nameSmall === 'nicknamechange') {
                    logs = guildData.logs[x];
                    break;
                }
            }
            if (logs.enabled === true) {
                const textChannel = yield client.channels.fetch(logs.loggingChannelID);
                let msgString = '';
                msgString = `__**New Nickname:**__ ${newGuildMember.displayName}\n`;
                msgString += `__**Old Nickname:**__ ${oldGuildMember.displayName}\n`;
                msgString += `__**User:**__ <@!${newGuildMember.id}>\n`;
                msgString += `__**User Tag:**__ ${newGuildMember.user.tag}\n`;
                msgString += `__**Username:**__ ${newGuildMember.user.username}\n`;
                msgString += `__**User ID:**__ ${newGuildMember.id}\n`;
                const msgEmbed = new Discord.MessageEmbed();
                msgEmbed
                    .setColor(newGuildMember.displayColor)
                    .setDescription(msgString)
                    .setThumbnail(newGuildMember.user.avatarURL())
                    .setTimestamp(Date())
                    .setTitle('__**New Nickname:**__');
                yield textChannel.send(msgEmbed);
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
