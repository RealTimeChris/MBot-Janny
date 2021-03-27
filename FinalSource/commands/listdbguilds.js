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
var DiscordStuff = require("../DiscordStuff");
var command = new DiscordStuff.BotCommand();
command.name = 'listdbguilds';
command.description = '!listdbguilds, to list guilds that this bot is no longer in!';
function execute(message, args, discordUser) {
    var e_1, _a;
    return __awaiter(this, void 0, void 0, function () {
        var areWeInADM, areWeAnAdmin, guildsArray, iterator, iterator_1, iterator_1_1, _b, key, value, isItFound, x, newValue, e_1_1, error_1;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 25, , 26]);
                    return [4 /*yield*/, DiscordStuff.areWeInADM(message)];
                case 1:
                    areWeInADM = _c.sent();
                    if (areWeInADM) {
                        return [2 /*return*/, command.name];
                    }
                    return [4 /*yield*/, DiscordStuff.doWeHaveAdminPermission(message, discordUser)];
                case 2:
                    areWeAnAdmin = _c.sent();
                    if (!areWeAnAdmin) {
                        return [2 /*return*/, command.name];
                    }
                    if (!(args[0] === undefined)) return [3 /*break*/, 6];
                    return [4 /*yield*/, message.reply('Please, enter a bot to list the keys from! (!listdbguilds = BOTNAME)')];
                case 3:
                    _c.sent();
                    if (!message.deletable) return [3 /*break*/, 5];
                    return [4 /*yield*/, message.delete()];
                case 4:
                    _c.sent();
                    _c.label = 5;
                case 5: return [2 /*return*/, command.name];
                case 6:
                    if (!(args[0].toLowerCase() !== 'janny' && args[0].toLowerCase() !== 'musichouse' && args[0].toLowerCase() !== 'gamehouse')) return [3 /*break*/, 10];
                    return [4 /*yield*/, message.reply('Please, enter a bot to list the keys from! (!listdbguilds = BOTNAME)')];
                case 7:
                    _c.sent();
                    if (!message.deletable) return [3 /*break*/, 9];
                    return [4 /*yield*/, message.delete()];
                case 8:
                    _c.sent();
                    _c.label = 9;
                case 9: return [2 /*return*/, command.name];
                case 10:
                    if (args[0].toLowerCase() !== 'janny') {
                        return [2 /*return*/, command.name];
                    }
                    guildsArray = message.client.guilds.cache.array();
                    iterator = discordUser.dataBase.iterate({});
                    _c.label = 11;
                case 11:
                    _c.trys.push([11, 16, 17, 22]);
                    iterator_1 = __asyncValues(iterator);
                    _c.label = 12;
                case 12: return [4 /*yield*/, iterator_1.next()];
                case 13:
                    if (!(iterator_1_1 = _c.sent(), !iterator_1_1.done)) return [3 /*break*/, 15];
                    _b = iterator_1_1.value, key = _b.key, value = _b.value;
                    if (key.length === 18 && key !== discordUser.userData.userID) {
                        isItFound = false;
                        for (x = 0; x < guildsArray.length; x += 1) {
                            if (key === guildsArray[x].id) {
                                isItFound = true;
                            }
                        }
                        newValue = JSON.parse(value);
                        if (isItFound === false) {
                            message.reply("Guild Name: " + newValue.guildName + "\nGuild ID: " + newValue.guildID);
                        }
                    }
                    _c.label = 14;
                case 14: return [3 /*break*/, 12];
                case 15: return [3 /*break*/, 22];
                case 16:
                    e_1_1 = _c.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 22];
                case 17:
                    _c.trys.push([17, , 20, 21]);
                    if (!(iterator_1_1 && !iterator_1_1.done && (_a = iterator_1.return))) return [3 /*break*/, 19];
                    return [4 /*yield*/, _a.call(iterator_1)];
                case 18:
                    _c.sent();
                    _c.label = 19;
                case 19: return [3 /*break*/, 21];
                case 20:
                    if (e_1) throw e_1.error;
                    return [7 /*endfinally*/];
                case 21: return [7 /*endfinally*/];
                case 22: return [4 /*yield*/, iterator.end()];
                case 23:
                    _c.sent();
                    return [4 /*yield*/, message.delete()];
                case 24:
                    _c.sent();
                    return [2 /*return*/, command.name];
                case 25:
                    error_1 = _c.sent();
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            reject(error_1);
                        })];
                case 26: return [2 /*return*/];
            }
        });
    });
}
command.function = execute;
exports.default = command;
