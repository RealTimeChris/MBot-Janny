// DiscordUser.ts - Module for my "discord user" class.
// Apr 4, 2021
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
var level_ts_1 = __importDefault(require("level-ts"));
var GuildData_1 = __importDefault(require("./GuildData"));
var GuildMemberData_1 = __importDefault(require("./GuildMemberData"));
var HelperFunctions_1 = __importDefault(require("./HelperFunctions"));
var config = require("./config.json");
/**
 *  Class representing an entire instance of Discord, from the perspective of a given bot.
 */
var DiscordUser = /** @class */ (function () {
    function DiscordUser() {
        this.userData = { userID: '', userName: '', publicKey: '', guildCount: 0, botToken: '',
            msBetweenCacheBackup: 0, currencyName: '', timeOfLastInvite: 0, prefix: '', dataBaseFilePath: '', msBetweenRecordUpdates: 0,
            timeOfLastRecordUpdate: 0, msBetweenInvites: 0, timeOfLastUpdateAndSave: 0, startupCall: true, activeInviteGuilds: [], botCommanders: [], msBetweenMessageDeletion: 0 };
        this.guildsData = new Map();
        this.guildMembersData = new Map();
    }
    /**
    * Initializes the instance of Discord, within the DiscordUser class.
    */
    DiscordUser.prototype.initializeInstance = function (client) {
        return __awaiter(this, void 0, void 0, function () {
            var dataBaseFilePath, _a, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 5, , 6]);
                        dataBaseFilePath = config.dataBaseFilePath + " + " + client.user.id;
                        this.dataBase = new level_ts_1.default(dataBaseFilePath);
                        _a = this;
                        return [4 /*yield*/, this.getUserDataFromDB(client)];
                    case 1:
                        _a.userData = _b.sent();
                        this.userData.dataBaseFilePath = dataBaseFilePath;
                        this.userData.startupCall = true;
                        return [4 /*yield*/, this.updateUserDataInDB(this.userData)];
                    case 2:
                        _b.sent();
                        console.log("Logged in as " + client.user.tag + "!");
                        return [4 /*yield*/, this.updateDataCacheAndSaveToFile(client)];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, HelperFunctions_1.default.cacheMessagesForVerification(client, this)];
                    case 4:
                        _b.sent();
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                resolve();
                            })];
                    case 5:
                        error_1 = _b.sent();
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                reject(error_1);
                            })];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    /**
    * Collects user data from the database, or alternatively, from the live objects.
    */
    DiscordUser.prototype.getUserDataFromDB = function (client) {
        return __awaiter(this, void 0, void 0, function () {
            var userData_1, error_2, userData_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        console.log('Loading user data from the database!');
                        return [4 /*yield*/, this.dataBase.get(client.user.id)];
                    case 1:
                        userData_1 = _a.sent();
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                resolve(userData_1);
                            })];
                    case 2:
                        error_2 = _a.sent();
                        if (error_2.type === 'NotFoundError') {
                            console.log("Adding new entry for the current user's data!");
                            userData_2 = {
                                botToken: config.botToken,
                                botCommanders: config.botCommanders,
                                msBetweenRecordUpdates: config.msBetweenRecordUpdates,
                                msBetweenInvites: config.msBetweenInvites,
                                msBetweenMessageDeletion: config.msBetweenMessageDeletion,
                                currencyName: config.currencyName,
                                publicKey: config.publicKey,
                                timeOfLastInvite: 0,
                                activeInviteGuilds: [],
                                timeOfLastRecordUpdate: 0,
                                dataBaseFilePath: config.dataBaseFilePath,
                                startupCall: true,
                                guildCount: client.guilds.cache.array().length,
                                msBetweenCacheBackup: config.msBetweenCacheBackup,
                                prefix: config.prefix,
                                timeOfLastUpdateAndSave: 0,
                                userID: client.user.id,
                                userName: client.user.username
                            };
                            return [2 /*return*/, new Promise(function (resolve, reject) {
                                    resolve(userData_2);
                                })];
                        }
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                reject(error_2);
                            })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
    * Updates the user data within the database.
    */
    DiscordUser.prototype.updateUserDataInDB = function (newUserData) {
        return __awaiter(this, void 0, void 0, function () {
            var userData, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        this.userData = newUserData;
                        return [4 /*yield*/, this.dataBase.put(this.userData.userID, this.userData)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.dataBase.get(this.userData.userID)];
                    case 2:
                        userData = _a.sent();
                        console.log('New User Cache:');
                        console.log(userData);
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                resolve();
                            })];
                    case 3:
                        error_3 = _a.sent();
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                reject(error_3);
                            })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
    * * Updates the cache of user data.
    */
    DiscordUser.prototype.updateUserData = function (client) {
        return __awaiter(this, void 0, void 0, function () {
            var userData, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.getUserDataFromDB(client)];
                    case 1:
                        userData = _a.sent();
                        console.log('Updating the user data!');
                        userData.botToken = config.botToken;
                        userData.botCommanders = config.botCommanders;
                        userData.msBetweenRecordUpdates = config.msBetweenRecordUpdates;
                        userData.msBetweenInvites = config.msBetweenInvites;
                        userData.msBetweenMessageDeletion = config.msBetweenMessageDeletion;
                        userData.currencyName = config.currencyName;
                        userData.publicKey = config.publicKey;
                        userData.guildCount = client.guilds.cache.array().length;
                        userData.msBetweenCacheBackup = config.msBetweenCacheBackup;
                        userData.prefix = config.prefix;
                        userData.timeOfLastUpdateAndSave = new Date().getTime();
                        userData.userID = client.user.id;
                        userData.userName = client.user.username;
                        return [4 /*yield*/, this.updateUserDataInDB(userData)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                resolve();
                            })];
                    case 3:
                        error_4 = _a.sent();
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                reject(error_4);
                            })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
    * Updates the cache of guild data.}
    */
    DiscordUser.prototype.updateGuildsData = function (client) {
        return __awaiter(this, void 0, void 0, function () {
            var liveDataGuildArray, x, guildData, x_1, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        liveDataGuildArray = client.guilds.cache.array().sort();
                        x = 0;
                        _a.label = 1;
                    case 1:
                        if (!(x < liveDataGuildArray.length)) return [3 /*break*/, 5];
                        console.log("Updating the guild data, for guild number " + x + "!");
                        guildData = new GuildData_1.default({ dataBase: this.dataBase, id: liveDataGuildArray[x].id, memberCount: liveDataGuildArray[x].memberCount, name: liveDataGuildArray[x].name });
                        return [4 /*yield*/, guildData.getFromDataBase()];
                    case 2:
                        _a.sent();
                        for (x_1 = 0; x_1 < guildData.exposeDataValues().deletionChannels.length; x_1 += 1) {
                            guildData.exposeDataValues().deletionChannels[x_1].currentlyBeingDeleted = false;
                            guildData.exposeDataValues().deletionChannels[x_1].timeOfLastPurge = 0;
                        }
                        return [4 /*yield*/, guildData.writeToDataBase()];
                    case 3:
                        _a.sent();
                        this.guildsData.set(liveDataGuildArray[x].id, guildData);
                        _a.label = 4;
                    case 4:
                        x += 1;
                        return [3 /*break*/, 1];
                    case 5: return [2 /*return*/, new Promise(function (resolve, reject) {
                            resolve();
                        })];
                    case 6:
                        error_5 = _a.sent();
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                reject(error_5);
                            })];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    /**
        * Function for updating all of the guild member's data caches,
        */
    DiscordUser.prototype.updateGuildMembersData = function (client) {
        return __awaiter(this, void 0, void 0, function () {
            var liveDataGuildArray, x, liveDataGuildMemberArray, y, guildMemberData, error_6, userData, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 13, , 14]);
                        liveDataGuildArray = client.guilds.cache.array();
                        x = 0;
                        _a.label = 1;
                    case 1:
                        if (!(x < liveDataGuildArray.length)) return [3 /*break*/, 10];
                        return [4 /*yield*/, liveDataGuildArray[x].members.fetch()];
                    case 2:
                        liveDataGuildMemberArray = (_a.sent()).array();
                        y = 0;
                        _a.label = 3;
                    case 3:
                        if (!(y < liveDataGuildMemberArray.length)) return [3 /*break*/, 9];
                        _a.label = 4;
                    case 4:
                        _a.trys.push([4, 7, , 8]);
                        guildMemberData = new GuildMemberData_1.default({ dataBase: this.dataBase, id: liveDataGuildMemberArray[y].id, guildId: liveDataGuildArray[x].id,
                            userName: liveDataGuildMemberArray[y].user.username, displayName: liveDataGuildMemberArray[y].displayName });
                        return [4 /*yield*/, guildMemberData.getFromDataBase()];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, guildMemberData.writeToDataBase()];
                    case 6:
                        _a.sent();
                        this.guildMembersData.set(liveDataGuildArray[x].id + ' + ' + liveDataGuildMemberArray[y].id, guildMemberData);
                        return [3 /*break*/, 8];
                    case 7:
                        error_6 = _a.sent();
                        console.log(error_6);
                        return [3 /*break*/, 8];
                    case 8:
                        y += 1;
                        return [3 /*break*/, 3];
                    case 9:
                        x += 1;
                        return [3 /*break*/, 1];
                    case 10: return [4 /*yield*/, this.getUserDataFromDB(client)];
                    case 11:
                        userData = _a.sent();
                        userData.timeOfLastUpdateAndSave = new Date().getTime();
                        userData.startupCall = false;
                        return [4 /*yield*/, this.updateUserDataInDB(userData)];
                    case 12:
                        _a.sent();
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                resolve();
                            })];
                    case 13:
                        error_7 = _a.sent();
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                reject(error_7);
                            })];
                    case 14: return [2 /*return*/];
                }
            });
        });
    };
    /**
    * Updates the current data cache from live objects,
    * and the,JSON data file, and saves it to the JSON file.
    */
    DiscordUser.prototype.updateDataCacheAndSaveToFile = function (client) {
        return __awaiter(this, void 0, void 0, function () {
            var error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, this.updateUserData(client)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.updateGuildsData(client)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.updateGuildMembersData(client)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                resolve();
                            })];
                    case 4:
                        error_8 = _a.sent();
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                reject(error_8);
                            })];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
    * Function that updates the data cache and saves it to disk,
    * if a certain amount of time has passed since it was last done.
    */
    DiscordUser.prototype.saveCacheIfTimeHasPassed = function (client) {
        return __awaiter(this, void 0, void 0, function () {
            var currentTime, msPassed, timeLeft, error_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        currentTime = new Date().getTime();
                        msPassed = currentTime - this.userData.timeOfLastUpdateAndSave;
                        if (!(msPassed >= this.userData.msBetweenCacheBackup)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.updateDataCacheAndSaveToFile(client)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        timeLeft = this.userData.msBetweenCacheBackup - msPassed;
                        console.log("Time until next cache update and backup: " + timeLeft + "ms");
                        _a.label = 3;
                    case 3: return [2 /*return*/, new Promise(function (resolve, reject) {
                            resolve();
                        })];
                    case 4:
                        error_9 = _a.sent();
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                reject(error_9);
                            })];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return DiscordUser;
}());
exports.default = DiscordUser;
