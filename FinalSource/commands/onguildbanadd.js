// onguildbanadd.js - Module for my "on guild ban add" command.
// Mar 9, 2021
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
    name: 'onguildbanadd',
    description: "It's an automatic one!",
    function: Function()
};
function execute(client, guild, user, discordUser) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const commandReturnData = {
                commandName: command.name
            };
            if (!(guild instanceof Discord.Guild)) {
                return commandReturnData;
            }
            const guildData = new GuildData_1.default({ dataBase: discordUser.dataBase, id: guild.id, name: guild.name, memberCount: guild.memberCount });
            yield guildData.getFromDataBase();
            let logs;
            for (let x = 0; x < guildData.logs.length; x += 1) {
                if (guildData.logs[x].nameSmall === 'guildbanadd') {
                    logs = guildData.logs[x];
                    break;
                }
            }
            if (logs.enabled === true) {
                setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                    const textChannel = guild.channels.resolve(logs.loggingChannelID);
                    const auditLogs = yield guild.fetchAuditLogs({ type: 'MEMBER_BAN_ADD', limit: 1 });
                    const auditLogEntry = auditLogs.entries
                        .find((entry) => Date.now() - entry.createdTimestamp < 5000);
                    let msgString = '';
                    msgString += `__**Banned By:**__ <@!${auditLogEntry.executor.id}> 
                    (${auditLogEntry.executor.tag})\n`;
                    msgString += `__**Reason:**__ ${auditLogEntry.reason}\n`;
                    msgString += `__**Time of Ban:**__ ${Date()}\n`;
                    msgString += `__**User:**__ <@!${user.id}>\n`;
                    msgString += `__**User Tag:**__ ${user.tag}\n`;
                    msgString += `__**Username:**__ ${user.username}\n`;
                    msgString += `__**User ID:**__ ${user.id}\n`;
                    const msgEmbed = new Discord.MessageEmbed();
                    msgEmbed
                        .setColor([255, 0, 0])
                        .setThumbnail(user.avatarURL())
                        .setTimestamp(Date())
                        .setTitle('__**User Banned:**__')
                        .setDescription(msgString);
                    yield textChannel.send(msgEmbed);
                }), 500);
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
