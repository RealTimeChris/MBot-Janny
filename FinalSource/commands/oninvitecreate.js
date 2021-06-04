// oninvitecreate.ts - Module for my "on invite create" command.
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
    name: 'oninvitecreate',
    description: "It's an automatic one!",
    function: Function()
};
function execute(client, invite, discordUser) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const commandReturnData = {
                commandName: command.name
            };
            if (!(invite instanceof Discord.Invite)) {
                return commandReturnData;
            }
            const guildData = new GuildData_1.default({ dataBase: discordUser.dataBase, id: invite.guild.id, name: invite.guild.name, memberCount: invite.guild.memberCount });
            yield guildData.getFromDataBase();
            let logs;
            for (let x = 0; x < guildData.logs.length; x += 1) {
                if (guildData.logs[x].nameSmall === 'invitecreate') {
                    logs = guildData.logs[x];
                    break;
                }
            }
            if (logs.enabled === true) {
                const textChannel = yield client.channels.fetch(logs.loggingChannelID);
                const msgEmbed = new Discord.MessageEmbed();
                let msgString = '';
                msgString = `__**Max Uses:**__ ${invite.maxUses}\n`;
                msgString += `__**Expires At:**__ ${invite.expiresAt}\n`;
                msgString += `__**URL:**__ ${invite.url}\n`;
                msgString += `__**Created By User:**__ <@!${invite.inviter.id}> (${invite.inviter.tag})`;
                msgEmbed
                    .setTitle('__**New Invite:**__')
                    .setTimestamp(Date())
                    .setDescription(msgString)
                    .setColor(guildData.borderColor);
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
