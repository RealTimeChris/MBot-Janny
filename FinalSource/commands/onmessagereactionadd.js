// onmessagereactionadd.js - Module for my "on message reaction add" command.
// Feb 28, 2021
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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Discord = require("discord.js");
var GuildData_1 = __importDefault(require("../GuildData"));
var command = {
    name: 'onmessagereactionadd',
    description: "It's an automatic one!",
    function: Function()
};
function execute(messageReaction, client, args, discordUser) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function () {
        var commandReturnData, guildData, userID, x, currentGuild, currentGuildMember, currentGuildMemberRoleManager, y, error_1, error_2;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 15, , 16]);
                    commandReturnData = {
                        commandName: command.name
                    };
                    guildData = new GuildData_1.default({ dataBase: discordUser.dataBase, id: messageReaction.message.guild.id,
                        memberCount: messageReaction.message.guild.memberCount, name: messageReaction.message.guild.name });
                    return [4 /*yield*/, guildData.getFromDataBase()];
                case 1:
                    _c.sent();
                    if (!(messageReaction instanceof Discord.MessageReaction)) {
                        return [2 /*return*/, commandReturnData];
                    }
                    userID = (messageReaction.users.cache.array()[messageReaction.users.cache.array().length - 1]).id;
                    x = 0;
                    _c.label = 2;
                case 2:
                    if (!(x < GuildData_1.default.guildsData.size)) return [3 /*break*/, 14];
                    if (messageReaction.message.guild.id !== guildData.id) {
                        if (x === GuildData_1.default.guildsData.size - 1) {
                            return [3 /*break*/, 14];
                        }
                        return [3 /*break*/, 13];
                    }
                    if (messageReaction.message.channel.id !== guildData.verificationSystem.channelID) {
                        if (x === GuildData_1.default.guildsData.size - 1) {
                            return [3 /*break*/, 14];
                        }
                        return [3 /*break*/, 13];
                    }
                    if (messageReaction.message.id !== guildData.verificationSystem.messageID) {
                        if (x === GuildData_1.default.guildsData.size - 1) {
                            return [3 /*break*/, 14];
                        }
                        return [3 /*break*/, 13];
                    }
                    if (!(messageReaction.emoji.name === guildData.verificationSystem.emoji && userID !== client.user.id)) return [3 /*break*/, 11];
                    return [4 /*yield*/, client.guilds.fetch(guildData.id)];
                case 3:
                    currentGuild = _c.sent();
                    currentGuildMember = currentGuild.members.resolve(userID);
                    currentGuildMemberRoleManager = new Discord
                        .GuildMemberRoleManager(currentGuildMember);
                    y = 0;
                    _c.label = 4;
                case 4:
                    if (!(y < guildData.defaultRoleIDs.length)) return [3 /*break*/, 10];
                    return [4 /*yield*/, currentGuildMemberRoleManager.add(guildData.defaultRoleIDs[y])];
                case 5:
                    _c.sent();
                    _c.label = 6;
                case 6:
                    _c.trys.push([6, 8, , 9]);
                    return [4 /*yield*/, messageReaction.users.remove(userID)];
                case 7:
                    _c.sent();
                    return [3 /*break*/, 9];
                case 8:
                    error_1 = _c.sent();
                    if (!((_b = (_a = client.guilds.resolve(guildData.id)) === null || _a === void 0 ? void 0 : _a.members.resolve(discordUser.userData.userID)) === null || _b === void 0 ? void 0 : _b.permissionsIn(messageReaction.message.channel).has('MANAGE_EMOJIS'))) {
                        console.log('I\'M MISSING PERMISSIONS REQUIRED FOR DOING THAT!');
                    }
                    return [3 /*break*/, 9];
                case 9:
                    y += 1;
                    return [3 /*break*/, 4];
                case 10: return [3 /*break*/, 13];
                case 11:
                    if (!(userID !== client.user.id)) return [3 /*break*/, 13];
                    return [4 /*yield*/, messageReaction.users.remove(userID)];
                case 12:
                    _c.sent();
                    _c.label = 13;
                case 13:
                    x += 1;
                    return [3 /*break*/, 2];
                case 14: return [2 /*return*/, commandReturnData];
                case 15:
                    error_2 = _c.sent();
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            reject(error_2);
                        })];
                case 16: return [2 /*return*/];
            }
        });
    });
}
command.function = execute;
exports.default = command;
