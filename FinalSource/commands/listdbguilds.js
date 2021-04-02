// listdbguilds.ts - Module for my "list db guilds" command.
// Mar 21, 2021
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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = void 0;
var Discord = require("discord.js");
var DiscordStuff = require("../DiscordStuff");
var command = new DiscordStuff.BotCommand();
command.name = 'listdbguilds';
command.description = '!listdbguilds, to list guilds that this bot is no longer in!';
function execute(commandData, discordUser) {
    var e_1, _a;
    var _b, _c, _d;
    return __awaiter(this, void 0, void 0, function () {
        var commandReturnData, areWeInADM, areWeAnAdmin, msgString_1, msgEmbed, msgString_2, msgEmbed, guildsArray, iterator, areAnyFound, msgString, iterator_1, iterator_1_1, _e, key, value, isItFound, x, newValue, e_1_1, msgEmbed, msgEmbed, error_1;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    _f.trys.push([0, 24, , 25]);
                    commandReturnData = new DiscordStuff.CommandReturnData();
                    commandReturnData.commandName = command.name;
                    return [4 /*yield*/, DiscordStuff.areWeInADM(commandData)];
                case 1:
                    areWeInADM = _f.sent();
                    if (areWeInADM) {
                        return [2 /*return*/, commandReturnData];
                    }
                    return [4 /*yield*/, discordUser.doWeHaveAdminPermission(commandData)];
                case 2:
                    areWeAnAdmin = _f.sent();
                    if (!areWeAnAdmin) {
                        return [2 /*return*/, commandReturnData];
                    }
                    if (!(commandData.args[0] === undefined)) return [3 /*break*/, 4];
                    msgString_1 = '------\n**Please, enter a bot to list the keys from! (!listdbguilds = BOTNAME)**\n------';
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor((_b = commandData.guildMember) === null || _b === void 0 ? void 0 : _b.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString_1)
                        .setTimestamp(Date())
                        .setTitle('__**Missing Or Invalid Arguments:**__');
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 3:
                    _f.sent();
                    return [2 /*return*/, commandReturnData];
                case 4:
                    if (!(commandData.args[0].toLowerCase() !== 'janny' && commandData.args[0].toLowerCase() !== 'musichouse' && commandData.args[0].toLowerCase() !== 'gamehouse')) return [3 /*break*/, 6];
                    msgString_2 = '------\n**Please, enter a bot to list the keys from! (!listdbguilds = BOTNAME)**\n------';
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor((_c = commandData.guildMember) === null || _c === void 0 ? void 0 : _c.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString_2)
                        .setTimestamp(Date())
                        .setTitle('__**Missing Or Invalid Arguments:**__');
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 5:
                    _f.sent();
                    return [2 /*return*/, commandReturnData];
                case 6:
                    if (commandData.args[0].toLowerCase() !== 'janny') {
                        return [2 /*return*/, commandReturnData];
                    }
                    guildsArray = commandData.guildMember.client.guilds.cache.array();
                    iterator = discordUser.dataBase.iterate({});
                    areAnyFound = false;
                    msgString = '------\n';
                    _f.label = 7;
                case 7:
                    _f.trys.push([7, 12, 13, 18]);
                    iterator_1 = __asyncValues(iterator);
                    _f.label = 8;
                case 8: return [4 /*yield*/, iterator_1.next()];
                case 9:
                    if (!(iterator_1_1 = _f.sent(), !iterator_1_1.done)) return [3 /*break*/, 11];
                    _e = iterator_1_1.value, key = _e.key, value = _e.value;
                    if (key.length === 18 && key !== discordUser.userData.userID) {
                        isItFound = false;
                        for (x = 0; x < guildsArray.length; x += 1) {
                            if (key === guildsArray[x].id) {
                                isItFound = true;
                            }
                        }
                        newValue = value;
                        if (isItFound === false) {
                            areAnyFound = true;
                            msgString += "__**Key:**__ " + key + " __**Guild ID:**__ " + newValue.guildID + " __**Guild Name:**__ " + newValue.guildName + "\n";
                        }
                    }
                    _f.label = 10;
                case 10: return [3 /*break*/, 8];
                case 11: return [3 /*break*/, 18];
                case 12:
                    e_1_1 = _f.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 18];
                case 13:
                    _f.trys.push([13, , 16, 17]);
                    if (!(iterator_1_1 && !iterator_1_1.done && (_a = iterator_1.return))) return [3 /*break*/, 15];
                    return [4 /*yield*/, _a.call(iterator_1)];
                case 14:
                    _f.sent();
                    _f.label = 15;
                case 15: return [3 /*break*/, 17];
                case 16:
                    if (e_1) throw e_1.error;
                    return [7 /*endfinally*/];
                case 17: return [7 /*endfinally*/];
                case 18:
                    if (!areAnyFound) return [3 /*break*/, 21];
                    msgString += '\n------';
                    return [4 /*yield*/, iterator.end()];
                case 19:
                    _f.sent();
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor((_d = commandData.guildMember) === null || _d === void 0 ? void 0 : _d.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Depracated Database Entries:**__');
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 20:
                    _f.sent();
                    _f.label = 21;
                case 21:
                    if (!!areAnyFound) return [3 /*break*/, 23];
                    msgEmbed = new Discord.MessageEmbed();
                    msgEmbed
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor([0, 0, 255])
                        .setDescription("------\n__**Looks like there's no unused database entries!**__\n------")
                        .setTimestamp(Date())
                        .setTitle("__**No Spare Database Entries:**__");
                    return [4 /*yield*/, DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 22:
                    _f.sent();
                    _f.label = 23;
                case 23: return [2 /*return*/, commandReturnData];
                case 24:
                    error_1 = _f.sent();
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            reject(error_1);
                        })];
                case 25: return [2 /*return*/];
            }
        });
    });
}
exports.execute = execute;
command.function = execute;
exports.default = command;
