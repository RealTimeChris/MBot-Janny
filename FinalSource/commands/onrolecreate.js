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
    name: 'onrolecreate',
    description: "It's an automatic one!",
    function: Function()
};
function execute(client, role, discordUser) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function () {
        var commandReturnData, guildData, logs, x, textChannel, auditLogs, auditLogEntry, currentGuild, msgEmbed, msgString, channelsArray, x, error_1;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 11, , 12]);
                    commandReturnData = {
                        commandName: command.name
                    };
                    if (!(role instanceof Discord.Role)) {
                        return [2 /*return*/, commandReturnData];
                    }
                    guildData = new GuildData_1.default({ dataBase: discordUser.dataBase, id: role.guild.id,
                        name: role.guild.name, memberCount: role.guild.memberCount });
                    return [4 /*yield*/, guildData.getFromDataBase()];
                case 1:
                    _c.sent();
                    logs = void 0;
                    for (x = 0; x < guildData.logs.length; x += 1) {
                        if (guildData.logs[x].nameSmall === 'rolecreate') {
                            logs = guildData.logs[x];
                            break;
                        }
                    }
                    if (!(logs.enabled === true)) return [3 /*break*/, 6];
                    return [4 /*yield*/, client.channels.fetch(logs.loggingChannelID)];
                case 2:
                    textChannel = _c.sent();
                    return [4 /*yield*/, role.guild.fetchAuditLogs({ type: 'ROLE_CREATE', limit: 1 })];
                case 3:
                    auditLogs = _c.sent();
                    auditLogEntry = auditLogs.entries.find(function (entry) { return Date.now() - entry.createdTimestamp < 5000; });
                    return [4 /*yield*/, client.guilds.fetch(role.guild.id)];
                case 4:
                    currentGuild = _c.sent();
                    msgEmbed = new Discord.MessageEmbed();
                    msgString = '';
                    msgString = "__**New Role:**__ <@&" + role.id + "> (" + role.name + ")\n";
                    msgString += "__**Created By:**__ <@!" + auditLogEntry.executor.id + "> (" + auditLogEntry.executor.tag + ")\n";
                    msgString += "__**Role Count:**__ " + currentGuild.roles.cache.size;
                    msgEmbed
                        .setTitle('__**Role Created:**__')
                        .setTimestamp(Date())
                        .setDescription(msgString)
                        .setColor(role.color);
                    return [4 /*yield*/, textChannel.send(msgEmbed)];
                case 5:
                    _c.sent();
                    _c.label = 6;
                case 6:
                    if (!(guildData.verificationSystem.channelID !== '')) return [3 /*break*/, 10];
                    channelsArray = role.guild.channels.cache.array();
                    x = 0;
                    _c.label = 7;
                case 7:
                    if (!(x < channelsArray.length)) return [3 /*break*/, 10];
                    if (!(((_a = channelsArray[x]) === null || _a === void 0 ? void 0 : _a.id) === guildData.verificationSystem.channelID)) return [3 /*break*/, 9];
                    return [4 /*yield*/, ((_b = channelsArray[x]) === null || _b === void 0 ? void 0 : _b.updateOverwrite(role.id, { VIEW_CHANNEL: false }))];
                case 8:
                    _c.sent();
                    _c.label = 9;
                case 9:
                    x += 1;
                    return [3 /*break*/, 7];
                case 10: return [2 /*return*/, commandReturnData];
                case 11:
                    error_1 = _c.sent();
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            reject(error_1);
                        })];
                case 12: return [2 /*return*/];
            }
        });
    });
}
command.function = execute;
exports.default = command;
