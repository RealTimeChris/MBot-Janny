// onmessageupdate.ts - Module for my "on message update" command.
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
    name: 'onmessageupdate',
    description: "It's an automatic one!",
    function: Function()
};
function execute(client, oldMessage, newMessage, discordUser) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const commandReturnData = {
                commandName: command.name
            };
            if (!(newMessage instanceof Discord.Message)) {
                return commandReturnData;
            }
            const guildData = new GuildData_1.default({ dataBase: discordUser.dataBase, id: newMessage.guild.id,
                name: newMessage.guild.name, memberCount: newMessage.guild.memberCount });
            yield guildData.getFromDataBase();
            let logs;
            for (let x = 0; x < guildData.logs.length; x += 1) {
                if (guildData.logs[x].nameSmall === 'messageupdate') {
                    logs = guildData.logs[x];
                    break;
                }
            }
            if (logs.enabled === true) {
                const textChannel = yield client.channels.fetch(logs.loggingChannelID);
                const msgEmbed = new Discord.MessageEmbed();
                let msgString = '';
                msgString = `__**Message Author:**__ <@!${newMessage.author.id}> (${newMessage.author.tag})\n`;
                msgString += `__**Message ID:**__ ${newMessage.id}\n`;
                msgString += `__**Old Content:**__ \n${oldMessage.content}\n`;
                msgString += `__**New Content:**__ ${newMessage.content}`;
                msgEmbed
                    .setTitle('__**Message Updated:**__')
                    .setTimestamp(Date())
                    .setDescription(msgString)
                    .setColor(guildData.borderColor);
                yield textChannel.send(msgEmbed);
                for (let x = 0; x < newMessage.embeds.length; x += 1) {
                    const msgEmbed2 = newMessage.embeds[0];
                    yield textChannel.send('Message Content!', { embed: msgEmbed2 });
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
