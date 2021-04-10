// message.ts - Module for my message command.
// Jan 30, 2021
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
    name: 'message',
    description: '__**Message Usage**__: Command executes automatically upon receiving certain messages!.',
    function: Function()
};
function trackIfTrackedUser(message, commandData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (message.guild === undefined || message.guild === null || message.author.bot) {
                return;
            }
            GuildData_1.default.guildsData.forEach((guildData) => {
                var _a, _b;
                let msgStringContent;
                const user = message.author;
                let isItFound = false;
                let index;
                for (let x = 0; x < guildData.trackedUsers.length; x += 1) {
                    if (user.id === ((_a = guildData.trackedUsers[x]) === null || _a === void 0 ? void 0 : _a.userID)) {
                        msgStringContent = `__**Tracked User:**__ <@!${user.id}> (${user.username})\n__**On Server:**__ ${message.guild.name}` +
                            `\n__**In Channel:**__ <#${message.channel.id}> (${message.channel.name})\n__**Message ID**__ ${message.id}\n__**What They Said:**__ ${message.content}`;
                        isItFound = true;
                        index = x;
                    }
                }
                if (isItFound === false) {
                    return;
                }
                else {
                    const msgEmbed = new Discord.MessageEmbed();
                    msgEmbed
                        .setAuthor(user.username, user.avatarURL())
                        .setColor([254, 254, 254])
                        .setDescription(msgStringContent)
                        .setTimestamp(Date())
                        .setTitle("__**Tracked User Message:**__");
                    const currentTextChannel = commandData.guildMember.client.channels.resolve((_b = guildData.trackedUsers[index]) === null || _b === void 0 ? void 0 : _b.channelID);
                    currentTextChannel.send(msgEmbed);
                }
            });
        }
        catch (error) {
            console.log(error);
        }
    });
}
/**
* Selects a chosen chat message and sends it via the appropriate channel,
* upon recieving a trigger phrase or word.
*/
function execute(message, commandData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const commandReturnData = {
                commandName: command.name
            };
            yield trackIfTrackedUser(message, commandData);
            const number = Math.random() * 100;
            if (message.content != null && message.content !== undefined) {
                if (message.content.toLowerCase().includes('hey ') && number <= 15) {
                    yield message.reply("Greetings, what's up fellow Discordee?! Can I offer you some drugs?");
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
