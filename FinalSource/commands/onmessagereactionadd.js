// onmessagereactionadd.js - Module for my "on message reaction add" command.
// Feb 28, 2021
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
    name: 'onmessagereactionadd',
    description: "It's an automatic one!",
    function: Function()
};
function execute(messageReaction, client, args, discordUser) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const commandReturnData = {
                commandName: command.name
            };
            const guildData = new GuildData_1.default({ dataBase: discordUser.dataBase, id: messageReaction.message.guild.id,
                memberCount: messageReaction.message.guild.memberCount, name: messageReaction.message.guild.name });
            yield guildData.getFromDataBase();
            if (!(messageReaction instanceof Discord.MessageReaction)) {
                return commandReturnData;
            }
            const userID = (messageReaction.users.cache.array()[messageReaction.users.cache.array().length - 1]).id;
            for (let x = 0; x < GuildData_1.default.guildsData.size; x += 1) {
                if (messageReaction.message.guild.id !== guildData.id) {
                    if (x === GuildData_1.default.guildsData.size - 1) {
                        break;
                    }
                    continue;
                }
                if (messageReaction.message.channel.id !== guildData.verificationSystem.channelID) {
                    if (x === GuildData_1.default.guildsData.size - 1) {
                        break;
                    }
                    continue;
                }
                if (messageReaction.message.id !== guildData.verificationSystem.messageID) {
                    if (x === GuildData_1.default.guildsData.size - 1) {
                        break;
                    }
                    continue;
                }
                if (messageReaction.emoji.name === guildData.verificationSystem.emoji && userID !== client.user.id) {
                    const currentGuild = yield client.guilds.fetch(guildData.id);
                    const currentGuildMember = currentGuild.members.resolve(userID);
                    const currentGuildMemberRoleManager = new Discord
                        .GuildMemberRoleManager(currentGuildMember);
                    for (let y = 0; y < guildData.defaultRoleIDs.length; y += 1) {
                        yield currentGuildMemberRoleManager.add(guildData.defaultRoleIDs[y]);
                        try {
                            yield messageReaction.users.remove(userID);
                        }
                        catch (error) {
                            if (!((_b = (_a = client.guilds.resolve(guildData.id)) === null || _a === void 0 ? void 0 : _a.members.resolve(discordUser.userData.userID)) === null || _b === void 0 ? void 0 : _b.permissionsIn(messageReaction.message.channel).has('MANAGE_EMOJIS'))) {
                                console.log('I\'M MISSING PERMISSIONS REQUIRED FOR DOING THAT!');
                            }
                        }
                    }
                }
                else if (userID !== client.user.id) {
                    yield messageReaction.users.remove(userID);
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
