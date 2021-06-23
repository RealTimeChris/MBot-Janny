// onguildbanremove.ts - Module for my "on guild ban remove" command.
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
    name: 'onguildbanremove',
    description: "It's an automatic one!",
    function: Function()
};
function execute(client, guild, user, discordUser) {
    return __awaiter(this, void 0, void 0, function () {
        var commandReturnData, guildData, logs, x, textChannel, auditLogs, auditLogEntry, msgString, msgEmbed, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    commandReturnData = {
                        commandName: command.name
                    };
                    if (!(guild instanceof Discord.Guild)) {
                        return [2 /*return*/, commandReturnData];
                    }
                    guildData = new GuildData_1.default({ dataBase: discordUser.dataBase, id: guild.id, name: guild.name, memberCount: guild.memberCount });
                    return [4 /*yield*/, guildData.getFromDataBase()];
                case 1:
                    _a.sent();
                    logs = void 0;
                    for (x = 0; x < guildData.logs.length; x += 1) {
                        if (guildData.logs[x].nameSmall === 'guildbanremove') {
                            logs = guildData.logs[x];
                            break;
                        }
                    }
                    if (!(logs.enabled === true)) return [3 /*break*/, 4];
                    textChannel = guild.channels.resolve(logs.loggingChannelID);
                    return [4 /*yield*/, guild.fetchAuditLogs({ type: 'MEMBER_BAN_REMOVE', limit: 1 })];
                case 2:
                    auditLogs = _a.sent();
                    auditLogEntry = auditLogs.entries.find(function (entry) { return Date.now() - entry.createdTimestamp < 5000; });
                    msgString = '';
                    msgString += "__**Unbanned By:**__ <@!" + auditLogEntry.executor.id + "> \n            (" + auditLogEntry.executor.tag + ")\n";
                    msgString += "__**Time of Unban:**__ " + Date() + "\n";
                    msgString += "__**User:**__ <@!" + user.id + ">\n";
                    msgString += "__**User Tag:**__ " + user.tag + "\n";
                    msgString += "__**Username:**__ " + user.username + "\n";
                    msgString += "__**User ID:**__ " + user.id + "\n";
                    msgEmbed = new Discord.MessageEmbed();
                    msgEmbed
                        .setColor([0, 255, 0])
                        .setThumbnail(user.avatarURL())
                        .setTimestamp(Date())
                        .setTitle('__**User Unbanned:**__')
                        .setDescription(msgString);
                    return [4 /*yield*/, textChannel.send(msgEmbed)];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4: return [2 /*return*/, commandReturnData];
                case 5:
                    error_1 = _a.sent();
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            reject(error_1);
                        })];
                case 6: return [2 /*return*/];
            }
        });
    });
}
command.function = execute;
exports.default = command;
