// onmessagedeletebulk.ts - Module for my "on message delete bulk" command.
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
    name: 'onmessagedeletebulk',
    description: "It's an automatic one!",
    function: Function()
};
function execute(client, collection, discordUser) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const commandReturnData = {
                commandName: command.name
            };
            if (!(collection instanceof Discord.Collection)) {
                return commandReturnData;
            }
            const guildData = new GuildData_1.default({ dataBase: discordUser.dataBase, id: collection.first().guild.id,
                name: collection.first().guild.name, memberCount: collection.first().guild.memberCount });
            yield guildData.getFromDataBase();
            let logs;
            for (let x = 0; x < guildData.logs.length; x += 1) {
                if (guildData.logs[x].nameSmall === 'messagedeletebulk') {
                    logs = guildData.logs[x];
                    break;
                }
            }
            if (logs.enabled === true) {
                const textChannel = yield client.channels.fetch(logs.loggingChannelID);
                const msgEmbed = new Discord.MessageEmbed();
                let msgString = '';
                msgString = `__**Number of Messages:**__ ${collection.size}\n`;
                msgEmbed
                    .setTitle('__**Messages Bulk Deleted:**__')
                    .setTimestamp(Date())
                    .setDescription(msgString)
                    .setColor(guildData.borderColor);
                yield textChannel.send(msgEmbed);
                const keyArray = collection.keyArray();
                for (let x = 0; x < keyArray.length; x += 1) {
                    const currentMessage = collection.get(keyArray[x]);
                    if (currentMessage.content !== '') {
                        let msgString2 = `__**Message Author:**__ <@!${currentMessage.author.id}> (${currentMessage.author.tag})\n`;
                        msgString2 += `__**Message Id:**__ ${currentMessage.id}\n`;
                        msgString2 += `__**Message Content:**__ ${currentMessage.content}\n`;
                        msgString2 += `__**Message Channel:**__ ${(currentMessage === null || currentMessage === void 0 ? void 0 : currentMessage.channel).name}`;
                        msgEmbed
                            .setTitle(`__**Deleted Message: ${x + 1} of ${keyArray.length}**__`)
                            .setTimestamp(Date())
                            .setDescription(msgString2)
                            .setColor(guildData.borderColor);
                        yield textChannel.send(msgEmbed);
                    }
                    if (currentMessage.embeds.length > 0) {
                        const msgEmbed2 = currentMessage.embeds[0];
                        yield textChannel.send(`Message Content: ${x + 1} of ${keyArray.length}`, { embed: msgEmbed2 });
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
