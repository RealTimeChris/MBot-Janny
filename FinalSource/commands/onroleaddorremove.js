// onroleaddorremove.ts - Module for my "on role add or remove" command.
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
    name: 'onroleaddorremove',
    description: "It's an automatic one!",
    function: Function()
};
function execute(client, oldGuildMemberRoleManager, newGuildMemberRoleManager, newGuildMember, collectionSizeDifference, discordUser) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const commandReturnData = {
                commandName: command.name
            };
            if (!(oldGuildMemberRoleManager instanceof Discord.GuildMemberRoleManager)) {
                return commandReturnData;
            }
            const guildData = new GuildData_1.default({ dataBase: discordUser.dataBase, id: newGuildMember.guild.id,
                name: newGuildMember.guild.name, memberCount: newGuildMember.guild.memberCount });
            yield guildData.getFromDataBase();
            let logs;
            for (let x = 0; x < guildData.logs.length; x += 1) {
                if (guildData.logs[x].nameSmall === 'roleaddorremove') {
                    logs = guildData.logs[x];
                    break;
                }
            }
            if (logs.enabled === true) {
                const newRoleCollection = oldGuildMemberRoleManager.cache
                    .difference(newGuildMemberRoleManager.cache);
                const newRole = newRoleCollection.first();
                const textChannel = client.channels.resolve(logs.loggingChannelID);
                const auditLogs = yield newGuildMember.guild.fetchAuditLogs({ type: 'MEMBER_ROLE_UPDATE', limit: 1 });
                const auditLogEntry = auditLogs.entries
                    .find(entry => Date.now() - entry.createdTimestamp < 5000);
                if (collectionSizeDifference > 0) {
                    let finalString = `__**Role Lost:**__ <@&${newRole.id}> (${newRole.name})\n`;
                    finalString += `__**Role Taken By:**__ <@!${auditLogEntry.executor.id}> (${auditLogEntry.executor.tag})\n`;
                    finalString += `__**User:**__ <@!${newGuildMember.user.id}>\n`;
                    finalString += `__**User Tag:**__ ${newGuildMember.user.tag}\n`;
                    finalString += `__**Username:**__ ${newGuildMember.user.username}\n`;
                    finalString += `__**User ID:**__ ${newGuildMember.id}\n`;
                    const messageEmbed = new Discord.MessageEmbed()
                        .setColor(newGuildMember.displayColor)
                        .setTitle('__**Lost Role:**__')
                        .setTimestamp(Date())
                        .setThumbnail(newGuildMember.user.avatarURL())
                        .setDescription(finalString);
                    yield textChannel.send(messageEmbed);
                    return commandReturnData;
                }
                if (collectionSizeDifference < 0) {
                    let finalString = `__**Role Gained:**__ <@&${newRole.id}> (${newRole.name})\n`;
                    finalString += `__**Role Given By:**__ <@!${auditLogEntry.executor.id}> (${auditLogEntry.executor.tag})\n`;
                    finalString += `__**User:**__ <@!${newGuildMember.user.id}>\n`;
                    finalString += `__**User Tag:**__ ${newGuildMember.user.tag}\n`;
                    finalString += `__**Username:**__ ${newGuildMember.user.username}\n`;
                    finalString += `__**User ID:**__ ${newGuildMember.id}\n`;
                    const messageEmbed = new Discord.MessageEmbed()
                        .setColor(newGuildMember.displayColor)
                        .setTitle('__**New Role:**__')
                        .setTimestamp(Date())
                        .setThumbnail(newGuildMember.user.avatarURL())
                        .setDescription(finalString);
                    yield textChannel.send(messageEmbed);
                    return commandReturnData;
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
