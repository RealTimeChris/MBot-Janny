// onguildmemberremove.ts - Module for my "on guild member remove" command.
// Mar 12, 2021
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
const command = {
    name: 'onguildmemberremove',
    description: "It's an automatic one!",
    function: Function()
};
function execute(client, guildMember, discordUser) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const commandReturnData = {
                commandName: command.name
            };
            if (!(guildMember instanceof Discord.GuildMember)) {
                return commandReturnData;
            }
            const guildData = new GuildData_1.default({ dataBase: discordUser.dataBase, id: guildMember.guild.id, name: guildMember.guild.name, memberCount: guildMember.guild.memberCount });
            yield guildData.getFromDataBase();
            let logs;
            for (let x = 0; x < guildData.logs.length; x += 1) {
                if (guildData.logs[x].nameSmall === 'guildmemberremove') {
                    logs = guildData.logs[x];
                    break;
                }
            }
            if (logs.enabled === true) {
                const textChannel = yield client.channels.fetch(logs.loggingChannelID);
                const currentGuild = yield client.guilds.fetch(guildMember.guild.id);
                const auditLog = yield guildMember.guild.fetchAuditLogs({ type: 'MEMBER_KICK', limit: 1 });
                const augitLogEntry = auditLog.entries
                    .find(auditLogs => Date.now() - auditLogs.createdTimestamp < 5000);
                const msgEmbed = new Discord.MessageEmbed();
                if (augitLogEntry !== undefined) {
                    let msgString = `__**Kicked By:**__ <@!${augitLogEntry.executor.id}> (${augitLogEntry.executor.tag})\n`;
                    msgString += `__**Member Count**__: ${currentGuild.memberCount}\n`;
                    msgString += `__**User:**__ <@!${guildMember.id}>\n`;
                    msgString += `__**User Tag:**__ ${guildMember.user.tag}\n`;
                    msgString += `__**Username:**__ ${guildMember.user.username}\n`;
                    msgString += `__**User ID:**__ ${guildMember.id}\n`;
                    msgEmbed
                        .setColor(guildMember.displayColor)
                        .setDescription(msgString)
                        .setThumbnail(guildMember.user.avatarURL())
                        .setTimestamp(Date())
                        .setTitle('__**Guild Member Kicked:**__');
                    yield textChannel.send(msgEmbed);
                }
                else {
                    let msgString = `__**Member Count**__: ${currentGuild.memberCount}\n`;
                    msgString += `__**User:**__ <@!${guildMember.id}>\n`;
                    msgString += `__**User Tag:**__ ${guildMember.user.tag}\n`;
                    msgString += `__**Username:**__ ${guildMember.user.username}\n`;
                    msgString += `__**User ID:**__ ${guildMember.id}\n`;
                    msgEmbed
                        .setColor(guildMember.displayColor)
                        .setDescription(msgString)
                        .setThumbnail(guildMember.user.avatarURL())
                        .setTimestamp(Date())
                        .setTitle('__**Guild Member Left:**__');
                    yield textChannel.send(msgEmbed);
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
