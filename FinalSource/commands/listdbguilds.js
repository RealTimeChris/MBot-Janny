// listdbguilds.js - Module for my "list db guilds" command.
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
var DiscordStuff = require('../DiscordStuff');
module.exports = {
    name: 'listdbguilds',
    descriptions: '!listdbguilds, to list guilds that this bot is no longer in!',
    /**
     * @param {Discord.Message} message
     * @param {String[]} args
     * @param {DiscordStuff.DiscordUser} discordUser
     */
    execute: function (message, args, discordUser) {
        return __awaiter(this, void 0, void 0, function () {
            var areWeAnAdmin, guildsArray_1, error_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 11, , 12]);
                        return [4 /*yield*/, DiscordStuff.doWeHaveAdminPermission(message, discordUser)];
                    case 1:
                        areWeAnAdmin = _a.sent();
                        if (!areWeAnAdmin) {
                            return [2 /*return*/, this.name];
                        }
                        if (!(args[0] === undefined)) return [3 /*break*/, 5];
                        return [4 /*yield*/, message.reply('Please, enter a bot to list the keys from! (!listdbguilds = BOTNAME)')];
                    case 2:
                        _a.sent();
                        if (!message.deletable) return [3 /*break*/, 4];
                        return [4 /*yield*/, message.delete()];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/, this.name];
                    case 5:
                        if (!(args[0].toLowerCase() !== 'janny' && args[0].toLowerCase() !== 'musichouse' && args[0].toLowerCase() !== 'gamehouse')) return [3 /*break*/, 9];
                        return [4 /*yield*/, message.reply('Please, enter a bot to list the keys from! (!listdbguilds = BOTNAME)')];
                    case 6:
                        _a.sent();
                        if (!message.deletable) return [3 /*break*/, 8];
                        return [4 /*yield*/, message.delete()];
                    case 7:
                        _a.sent();
                        _a.label = 8;
                    case 8: return [2 /*return*/, this.name];
                    case 9:
                        if (args[0].toLowerCase() !== 'janny') {
                            return [2 /*return*/, this.name];
                        }
                        guildsArray_1 = message.client.guilds.cache.array();
                        discordUser.dataBase.createReadStream()
                            .on('data', function (data) {
                            if (data.key.length === 18 && data.key !== discordUser.userData.userID) {
                                var isItFound = false;
                                for (var x = 0; x < guildsArray_1.length; x += 1) {
                                    if (data.key === guildsArray_1[x].id) {
                                        isItFound = true;
                                    }
                                }
                                if (isItFound === false) {
                                    message.reply("Guild Name: " + JSON.parse(data.value).guildName + "\nGuild ID: " + JSON.parse(data.value).guildID);
                                }
                            }
                        })
                            .on('error', function (err) {
                            console.log('Oh my!', err);
                        })
                            .on('close', function () {
                            console.log('Stream closed');
                        })
                            .on('end', function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                console.log('Stream ended');
                                return [2 /*return*/];
                            });
                        }); });
                        return [4 /*yield*/, message.delete()];
                    case 10:
                        _a.sent();
                        return [2 /*return*/, this.name];
                    case 11:
                        error_1 = _a.sent();
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                reject(error_1);
                            })];
                    case 12: return [2 /*return*/];
                }
            });
        });
    },
};
