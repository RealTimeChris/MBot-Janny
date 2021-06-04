// onrolecreate.ts - Module for my "on role create" command.
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
    name: 'onrolecreate',
    description: "It's an automatic one!",
    function: Function()
};
function execute(client, role, discordUser) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const commandReturnData = {
                commandName: command.name
            };
            if (!(role instanceof Discord.Role)) {
                return commandReturnData;
            }
            const guildData = new GuildData_1.default({ dataBase: discordUser.dataBase, id: role.guild.id,
                name: role.guild.name, memberCount: role.guild.memberCount });
            yield guildData.getFromDataBase();
            let logs;
            for (let x = 0; x < guildData.logs.length; x += 1) {
                if (guildData.logs[x].nameSmall === 'rolecreate') {
                    logs = guildData.logs[x];
                    break;
                }
            }
            if (logs.enabled === true) {
                const textChannel = yield client.channels.fetch(logs.loggingChannelID);
                const auditLogs = yield role.guild.fetchAuditLogs({ type: 'ROLE_CREATE', limit: 1 });
                const auditLogEntry = auditLogs.entries.find(entry => Date.now() - entry.createdTimestamp < 5000);
                const currentGuild = yield client.guilds.fetch(role.guild.id);
                const msgEmbed = new Discord.MessageEmbed();
                let msgString = '';
                msgString = `__**New Role:**__ <@&${role.id}> (${role.name})\n`;
                msgString += `__**Created By:**__ <@!${auditLogEntry.executor.id}> (${auditLogEntry.executor.tag})\n`;
                msgString += `__**Role Count:**__ ${currentGuild.roles.cache.size}`;
                msgEmbed
                    .setTitle('__**Role Created:**__')
                    .setTimestamp(Date())
                    .setDescription(msgString)
                    .setColor(role.color);
                yield textChannel.send(msgEmbed);
            }
            if (guildData.verificationSystem.channelID !== '') {
                const channelsArray = role.guild.channels.cache.array();
                for (let x = 0; x < channelsArray.length; x += 1) {
                    if (((_a = channelsArray[x]) === null || _a === void 0 ? void 0 : _a.id) === guildData.verificationSystem.channelID) {
                        yield ((_b = channelsArray[x]) === null || _b === void 0 ? void 0 : _b.updateOverwrite(role.id, { VIEW_CHANNEL: false }));
                    }
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
