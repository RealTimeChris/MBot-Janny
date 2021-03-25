// deletedbentry.ts - Module for my "delete db entry" command.
// Mar 18, 2021
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = void 0;
var Discord = require("discord.js");
var DiscordStuff = require("../DiscordStuff");
var DeletedCounter = /** @class */ (function () {
    function DeletedCounter() {
        this.deletedCount = 0;
        this.data = undefined;
    }
    DeletedCounter.prototype.setData = function (data) {
        this.data = data;
    };
    DeletedCounter.prototype.getData = function () {
        return this.data;
    };
    DeletedCounter.prototype.incrementDeletedCount = function () {
        this.deletedCount += 1;
    };
    DeletedCounter.prototype.returnDeletedCount = function () {
        return this.deletedCount;
    };
    return DeletedCounter;
}());
function onData(dbKey, discordUser, deletedCounter) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(deletedCounter.getData() !== undefined && dbKey !== '')) return [3 /*break*/, 2];
                    if (!deletedCounter.getData().key.includes(dbKey)) return [3 /*break*/, 2];
                    console.log(deletedCounter.getData().key, '=', JSON.parse(deletedCounter.getData().value));
                    return [4 /*yield*/, discordUser.dataBase.del(deletedCounter.getData().key)];
                case 1:
                    _a.sent();
                    deletedCounter.incrementDeletedCount();
                    _a.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    });
}
var command = new DiscordStuff.BotCommand();
command.name = 'deletedbentry';
command.description = "!deletedbentry = BOTNAME, DBENTRYKEY, where BOTNAME is a bot's name and DBENTRYKEY is the key to a database entry that is stored within the bot!";
/**
     * @param 	{Discord.Message} 			message
     * @param 	{String[]} 					args
     * @param 	{DiscordStuff.DiscordUser}	discordUser
     * @returns {Promise<strin>}
     */
function execute(message, args, discordUser) {
    return __awaiter(this, void 0, void 0, function () {
        var areWeACommander, dbKey_1, argZero, deletedCounter_1, error_1;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 17, , 18]);
                    return [4 /*yield*/, DiscordStuff.doWeHaveAdminPermission(message, discordUser)];
                case 1:
                    areWeACommander = _a.sent();
                    if (!areWeACommander) {
                        return [2 /*return*/, command.name];
                    }
                    if (!(args[0] === undefined)) return [3 /*break*/, 5];
                    return [4 /*yield*/, message.reply('Please, enter a bot to delete the key from! (!deletedbentry = BOTNAME, DBENTRYKEY)')];
                case 2:
                    _a.sent();
                    if (!message.deletable) return [3 /*break*/, 4];
                    return [4 /*yield*/, message.delete()];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4: return [2 /*return*/, command.name];
                case 5:
                    if (!(args[0].toLowerCase() !== 'janny' && args[0].toLowerCase() !== 'musichouse' && args[0].toLowerCase() !== 'gamehouse')) return [3 /*break*/, 9];
                    return [4 /*yield*/, message.reply('Please, enter a bot to delete the key from! (!deletedbentry = BOTNAME, DBENTRYKEY)')];
                case 6:
                    _a.sent();
                    if (!message.deletable) return [3 /*break*/, 8];
                    return [4 /*yield*/, message.delete()];
                case 7:
                    _a.sent();
                    _a.label = 8;
                case 8: return [2 /*return*/, command.name];
                case 9:
                    if (args[0].toLowerCase() !== 'janny') {
                        return [2 /*return*/, command.name];
                    }
                    if (!(args[1] === undefined)) return [3 /*break*/, 13];
                    return [4 /*yield*/, message.reply('Please, enter a DB key to search for!')];
                case 10:
                    _a.sent();
                    if (!message.deletable) return [3 /*break*/, 12];
                    return [4 /*yield*/, message.delete()];
                case 11:
                    _a.sent();
                    _a.label = 12;
                case 12: return [2 /*return*/, command.name];
                case 13:
                    dbKey_1 = String('');
                    if (args[1] !== undefined) {
                        argZero = args[1].toString();
                        dbKey_1 = argZero;
                    }
                    deletedCounter_1 = new DeletedCounter();
                    return [4 /*yield*/, discordUser.dataBase.createReadStream()
                            .on('data', function (data) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!data.key.includes(dbKey_1)) return [3 /*break*/, 2];
                                        deletedCounter_1.setData(data);
                                        return [4 /*yield*/, onData(dbKey_1, discordUser, deletedCounter_1)];
                                    case 1:
                                        _a.sent();
                                        _a.label = 2;
                                    case 2: return [2 /*return*/];
                                }
                            });
                        }); })
                            .on('error', function (err) {
                            console.log('Oh my!', err);
                        })
                            .on('close', function () {
                            console.log('Stream closed');
                        })
                            .on('end', function () { return __awaiter(_this, void 0, void 0, function () {
                            var msgEmbed;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        msgEmbed = new Discord.MessageEmbed();
                                        msgEmbed.setAuthor(message.author.username, message.author.avatarURL())
                                            .setColor([0, 0, 255])
                                            .setDescription("------\n__**Number of Deleted Entries**__: " + deletedCounter_1.returnDeletedCount() + "\n------")
                                            .setTimestamp(Date.now())
                                            .setTitle('__**Deleted DB Entries:**__');
                                        return [4 /*yield*/, message.channel.send(msgEmbed)];
                                    case 1:
                                        _a.sent();
                                        console.log('Stream ended');
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                case 14:
                    _a.sent();
                    if (!message.deletable) return [3 /*break*/, 16];
                    return [4 /*yield*/, message.delete()];
                case 15:
                    _a.sent();
                    _a.label = 16;
                case 16: return [2 /*return*/, command.name];
                case 17:
                    error_1 = _a.sent();
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            reject(error_1);
                        })];
                case 18: return [2 /*return*/];
            }
        });
    });
}
exports.execute = execute;
command.function = execute;
exports.default = command;
