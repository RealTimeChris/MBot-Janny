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
var Discord = require("discord.js");
var HelperFunctions_1 = __importDefault(require("./HelperFunctions"));
var level_ts_1 = __importDefault(require("level-ts"));
var config = require("./config.json");
var DiscordUser;
(function (DiscordUser_1) {
    /**
     * Class representing permission overwrites for Discord.
     */
    var PermissionOverwrites = /** @class */ (function () {
        function PermissionOverwrites(guild) {
            this.deny = [];
            this.allow = [];
            this.id = '';
            this.type = '';
            this.channel = new Discord.GuildChannel(guild, {});
        }
        return PermissionOverwrites;
    }());
    DiscordUser_1.PermissionOverwrites = PermissionOverwrites;
    /**
     * Class representing some info about a given user.
     */
    var UserRecord = /** @class */ (function () {
        function UserRecord() {
            this.userID = '';
            this.lastKnownUsername = '';
            this.lastKnownUserTag = '';
        }
        return UserRecord;
    }());
    DiscordUser_1.UserRecord = UserRecord;
    /**
     * Class representing some info about a given server.
     */
    var ServerRecord = /** @class */ (function () {
        function ServerRecord() {
            this.replacementServerInvite = '';
            this.serverName = '';
            this.serverID = '';
            this.userRecords = [];
        }
        return ServerRecord;
    }());
    DiscordUser_1.ServerRecord = ServerRecord;
    /**
     * Class representing a single guild/server member.
     */
    var GuildMemberData = /** @class */ (function () {
        function GuildMemberData() {
            this.previousRoleIDs = [];
            this.previousPermissionOverwrites = [];
            this.userID = '';
            this.userName = '';
            this.displayName = '';
        }
        return GuildMemberData;
    }());
    DiscordUser_1.GuildMemberData = GuildMemberData;
    /**
     * Class representing an actively-being-pruned channel.
     */
    var DeletionChannel = /** @class */ (function () {
        function DeletionChannel() {
            this.channelID = '';
            this.numberOfMessagesToSave = 0;
            this.timeOfLastPurge = 0;
            this.currentlyBeingDeleted = false;
            this.deletionMessageID = '';
        }
        return DeletionChannel;
    }());
    DiscordUser_1.DeletionChannel = DeletionChannel;
    /**
     * Class representing a timed message to be sent out.
     */
    var TimedMessage = /** @class */ (function () {
        function TimedMessage() {
            this.textChannelID = '';
            this.messageContent = '';
            this.msBetweenSends = 0;
            this.timeOfLastSend = 0;
            this.name = '';
        }
        return TimedMessage;
    }());
    DiscordUser_1.TimedMessage = TimedMessage;
    /**
     * Class representing a "server-joining verification" system.
     */
    var VerificationSystem = /** @class */ (function () {
        function VerificationSystem() {
            this.channelID = '';
            this.messageID = '';
            this.emoji = '';
        }
        return VerificationSystem;
    }());
    DiscordUser_1.VerificationSystem = VerificationSystem;
    /**
     * Class representing a single log for something on a server.
     */
    var Log = /** @class */ (function () {
        function Log() {
            this.name = '';
            this.nameSmall = '';
            this.enabled = false;
            this.loggingChannelID = '';
            this.loggingChannelName = '';
        }
        return Log;
    }());
    DiscordUser_1.Log = Log;
    /**
     * Class representing a "tracked user".
     */
    var TrackedUser = /** @class */ (function () {
        function TrackedUser() {
            this.userID = '';
            this.channelID = '';
            this.userName = '';
        }
        return TrackedUser;
    }());
    DiscordUser_1.TrackedUser = TrackedUser;
    /**
     * Class representing a single guild/server. *
     */
    var GuildData = /** @class */ (function () {
        function GuildData() {
            this.trackedUsers = [];
            this.borderColor = [0, 0, 255];
            this.ghostedRoleID = '';
            this.timedMessages = [];
            this.guildID = '';
            this.guildName = '';
            this.guildMemberCount = 0;
            this.logs = [];
            this.verificationSystem = new VerificationSystem();
            this.deletionChannels = [];
            this.defaultRoleIDs = [];
            this.logs[0] = new Log();
            this.logs[0].name = 'Guild Ban Add';
            this.logs[0].nameSmall = 'guildbanadd';
            this.logs[1] = new Log();
            this.logs[1].name = 'Guild Ban Remove';
            this.logs[1].nameSmall = 'guildbanremove';
            this.logs[2] = new Log();
            this.logs[2].name = 'Guild Member Add';
            this.logs[2].nameSmall = 'guildmemberadd';
            this.logs[3] = new Log();
            this.logs[3].name = 'Guild Member Remove';
            this.logs[3].nameSmall = 'guildmemberremove';
            this.logs[4] = new Log();
            this.logs[4].name = 'Display Name Change';
            this.logs[4].nameSmall = 'displaynamechange';
            this.logs[5] = new Log();
            this.logs[5].name = 'Nickname Change';
            this.logs[5].nameSmall = 'nicknamechange';
            this.logs[6] = new Log();
            this.logs[6].name = 'Role Add Or Remove';
            this.logs[6].nameSmall = 'roleaddorremove';
            this.logs[7] = new Log();
            this.logs[7].name = 'Invite Create';
            this.logs[7].nameSmall = 'invitecreate';
            this.logs[8] = new Log();
            this.logs[8].name = 'Message Delete';
            this.logs[8].nameSmall = 'messagedelete';
            this.logs[9] = new Log();
            this.logs[9].name = 'Message Delete Bulk';
            this.logs[9].nameSmall = 'messagedeletebulk';
            this.logs[10] = new Log();
            this.logs[10].name = 'Role Create';
            this.logs[10].nameSmall = 'rolecreate';
            this.logs[11] = new Log();
            this.logs[11].name = 'Role Delete';
            this.logs[11].nameSmall = 'roledelete';
            this.logs[12] = new Log();
            this.logs[12].name = 'Username Change';
            this.logs[12].nameSmall = 'usernamechange';
        }
        return GuildData;
    }());
    DiscordUser_1.GuildData = GuildData;
    /**
     * Class representing a single instance of "Discord".
     */
    var DiscordUserData = /** @class */ (function () {
        function DiscordUserData() {
            this.userID = '';
            this.userName = '';
            this.publicKey = '';
            this.clientID = '';
            this.guildCount = 0;
            this.botToken = '';
            this.msBetweenCacheBackup = 0;
            this.currencyName = '';
            this.timeOfLastUpdateAndSave = 0;
            this.prefix = '';
            this.dataBaseFilePath = '';
            this.msBetweenRecordUpdates = 0;
            this.timeOfLastRecordUpdate = 0;
            this.msBetweenInvites = 0;
            this.timeOfLastInvite = 0;
            this.msBetweenMessageDeletion = 0;
            this.startupCall = true;
            this.activeInviteGuilds = [];
            this.botCommanders = [];
        }
        return DiscordUserData;
    }());
    DiscordUser_1.DiscordUserData = DiscordUserData;
    /**
     * Class representing a function/command.
     */
    var BotCommand = /** @class */ (function () {
        function BotCommand() {
            this.name = '';
            this.description = '';
            this.function = new Function();
        }
        return BotCommand;
    }());
    DiscordUser_1.BotCommand = BotCommand;
    /**
     * Class representing the data that goes into a command.
     */
    var CommandData = /** @class */ (function () {
        function CommandData() {
            this.interaction = null;
            this.guild = null;
            this.guildMember = null;
            this.fromTextChannel = null;
            this.fromTextChannelType = '';
            this.permsChannel = null;
            this.toTextChannel = null;
            this.args = [];
        }
        CommandData.prototype.initialize = function (client, fromTextChannelID, fromTextChannelType, interaction, guildMemberID, guildID) {
            if (interaction === void 0) { interaction = null; }
            if (guildMemberID === void 0) { guildMemberID = ''; }
            if (guildID === void 0) { guildID = ''; }
            return __awaiter(this, void 0, void 0, function () {
                var _a, _b, _c, _d, _e, _f, _g, _h, _j, error_1;
                return __generator(this, function (_k) {
                    switch (_k.label) {
                        case 0:
                            _k.trys.push([0, 16, , 17]);
                            this.fromTextChannelType = fromTextChannelType;
                            _a = this;
                            return [4 /*yield*/, client.channels.fetch(fromTextChannelID)];
                        case 1:
                            _a.fromTextChannel = (_k.sent());
                            if (interaction !== null) {
                                this.interaction = interaction;
                            }
                            if (!(guildID !== '')) return [3 /*break*/, 3];
                            _b = this;
                            return [4 /*yield*/, client.guilds.fetch(guildID)];
                        case 2:
                            _b.guild = _k.sent();
                            _k.label = 3;
                        case 3:
                            if (!(guildMemberID !== '' && guildID !== '')) return [3 /*break*/, 5];
                            _c = this;
                            return [4 /*yield*/, this.guild.members.fetch(guildMemberID)];
                        case 4:
                            _c.guildMember = _k.sent();
                            return [3 /*break*/, 7];
                        case 5:
                            _d = this;
                            return [4 /*yield*/, client.users.fetch(guildMemberID)];
                        case 6:
                            _d.guildMember = _k.sent();
                            _k.label = 7;
                        case 7:
                            if (interaction !== null && fromTextChannelType !== 'dm') {
                                this.toTextChannel = new Discord.WebhookClient(client.user.id, this.interaction.token);
                                this.permsChannel = new Discord.GuildChannel(this.guild, this.fromTextChannel);
                            }
                            if (!(interaction === null && fromTextChannelType !== 'dm')) return [3 /*break*/, 10];
                            _e = this;
                            return [4 /*yield*/, client.channels.fetch(fromTextChannelID)];
                        case 8:
                            _e.toTextChannel = (_k.sent());
                            _f = this;
                            return [4 /*yield*/, client.channels.fetch(fromTextChannelID)];
                        case 9:
                            _f.permsChannel = (_k.sent());
                            _k.label = 10;
                        case 10:
                            if (!(interaction !== null && fromTextChannelType === 'dm')) return [3 /*break*/, 12];
                            this.toTextChannel = new Discord.WebhookClient(client.user.id, this.interaction.token);
                            _g = this;
                            return [4 /*yield*/, client.channels.fetch(fromTextChannelID)];
                        case 11:
                            _g.permsChannel = (_k.sent());
                            _k.label = 12;
                        case 12:
                            if (!(interaction === null && fromTextChannelType === 'dm')) return [3 /*break*/, 15];
                            _h = this;
                            return [4 /*yield*/, this.guildMember.createDM(true)];
                        case 13:
                            _h.toTextChannel = _k.sent();
                            _j = this;
                            return [4 /*yield*/, client.channels.fetch(fromTextChannelID)];
                        case 14:
                            _j.permsChannel = (_k.sent());
                            _k.label = 15;
                        case 15: return [3 /*break*/, 17];
                        case 16:
                            error_1 = _k.sent();
                            return [2 /*return*/, new Promise(function (resolve, reject) {
                                    reject(error_1);
                                })];
                        case 17: return [2 /*return*/];
                    }
                });
            });
        };
        return CommandData;
    }());
    DiscordUser_1.CommandData = CommandData;
    /**
     * Class representing a command' return values.
     */
    var CommandReturnData = /** @class */ (function () {
        function CommandReturnData() {
            this.commandName = '';
        }
        return CommandReturnData;
    }());
    DiscordUser_1.CommandReturnData = CommandReturnData;
    /**
     *  Class representing an entire instance of Discord, from the perspective of a given bot.
     */
    var DiscordUser = /** @class */ (function () {
        function DiscordUser() {
            this.userData = new DiscordUserData();
            this.guildsData = new Map();
            this.guildMembersData = new Map();
        }
        /**
        * Initializes the instance of Discord, within the DiscordUser class.
        */
        DiscordUser.prototype.initializeInstance = function (client) {
            return __awaiter(this, void 0, void 0, function () {
                var dataBaseFilePath, _a, error_2;
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
                            error_2 = _b.sent();
                            return [2 /*return*/, new Promise(function (resolve, reject) {
                                    reject(error_2);
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
                var userData_1, error_3, userData_2;
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
                            error_3 = _a.sent();
                            if (error_3.type === 'NotFoundError') {
                                console.log("Adding new entry for the current user's data!");
                                userData_2 = new DiscordUserData();
                                userData_2.botToken = config.botToken;
                                userData_2.botCommanders = config.botCommanders;
                                userData_2.msBetweenRecordUpdates = config.msBetweenRecordUpdates;
                                userData_2.msBetweenInvites = config.msBetweenInvites;
                                userData_2.msBetweenMessageDeletion = config.msBetweenMessageDeletion;
                                userData_2.currencyName = config.currencyName;
                                userData_2.publicKey = config.publicKey;
                                userData_2.clientID = config.clientID;
                                userData_2.timeOfLastInvite = 0;
                                userData_2.activeInviteGuilds = [];
                                userData_2.timeOfLastRecordUpdate = 0;
                                userData_2.guildCount = client.guilds.cache.array().length;
                                userData_2.msBetweenCacheBackup = config.msBetweenCacheBackup;
                                userData_2.prefix = config.prefix;
                                userData_2.timeOfLastUpdateAndSave = new Date().getTime();
                                userData_2.userID = client.user.id;
                                userData_2.userName = client.user.username;
                                return [2 /*return*/, new Promise(function (resolve, reject) {
                                        resolve(userData_2);
                                    })];
                            }
                            return [2 /*return*/, new Promise(function (resolve, reject) {
                                    reject(error_3);
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
                var userData, error_4;
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
        * * Updates the cache of user data.
        */
        DiscordUser.prototype.updateUserData = function (client) {
            return __awaiter(this, void 0, void 0, function () {
                var userData, error_5;
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
                            userData.clientID = config.clientID;
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
                            error_5 = _a.sent();
                            return [2 /*return*/, new Promise(function (resolve, reject) {
                                    reject(error_5);
                                })];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        /**
        * Collects the data for a single guild, from the database.
        */
        DiscordUser.prototype.getGuildDataFromDB = function (guild) {
            return __awaiter(this, void 0, void 0, function () {
                var guildData_1, error_6, guildData_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            console.log('Loading guild data from the database!');
                            return [4 /*yield*/, this.dataBase.get(guild.id)];
                        case 1:
                            guildData_1 = _a.sent();
                            return [2 /*return*/, new Promise(function (resolve, reject) {
                                    resolve(guildData_1);
                                })];
                        case 2:
                            error_6 = _a.sent();
                            if (error_6.type === 'NotFoundError') {
                                console.log("Adding new entry for guild data! For guild: " + guild.name);
                                guildData_2 = new GuildData();
                                guildData_2.defaultRoleIDs = [];
                                guildData_2.deletionChannels = [];
                                guildData_2.ghostedRoleID = '';
                                guildData_2.guildID = guild.id;
                                guildData_2.guildMemberCount = guild.memberCount;
                                guildData_2.guildName = guild.name;
                                guildData_2.timedMessages = [];
                                guildData_2.trackedUsers = [];
                                guildData_2.verificationSystem = new VerificationSystem();
                                return [2 /*return*/, new Promise(function (resolve, reject) {
                                        resolve(guildData_2);
                                    })];
                            }
                            return [2 /*return*/, new Promise(function (resolve, reject) {
                                    reject(error_6);
                                })];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        /**
        * Updates a given guild's data in the database.
        */
        DiscordUser.prototype.updateGuildDataInDB = function (guildData) {
            return __awaiter(this, void 0, void 0, function () {
                var newGuildData, error_7;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 3, , 4]);
                            this.guildsData.set(guildData.guildID, guildData);
                            newGuildData = this.guildsData.get(guildData.guildID);
                            return [4 /*yield*/, this.dataBase.put(guildData.guildID, newGuildData)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, this.dataBase.get(guildData.guildID)];
                        case 2:
                            newGuildData = _a.sent();
                            console.log('New Guild Cache:');
                            console.log(newGuildData);
                            return [2 /*return*/, new Promise(function (resolve, reject) {
                                    resolve();
                                })];
                        case 3:
                            error_7 = _a.sent();
                            return [2 /*return*/, new Promise(function (resolve, reject) {
                                    reject(error_7);
                                })];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        /**
        * Updates the cache of guild data.
        */
        DiscordUser.prototype.updateGuildsData = function (client) {
            return __awaiter(this, void 0, void 0, function () {
                var liveDataGuildArray, x, guildData, y, error_8;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 6, , 7]);
                            liveDataGuildArray = [new Discord.Guild(client, {})];
                            liveDataGuildArray.length = client.guilds.cache.array().length;
                            liveDataGuildArray = client.guilds.cache.array().sort();
                            x = 0;
                            _a.label = 1;
                        case 1:
                            if (!(x < liveDataGuildArray.length)) return [3 /*break*/, 5];
                            return [4 /*yield*/, this.getGuildDataFromDB(liveDataGuildArray[x])];
                        case 2:
                            guildData = _a.sent();
                            console.log("Updating the guild data, for guild number " + x + "!");
                            if (this.guildsData.get(liveDataGuildArray[x].id) !== undefined) {
                                guildData = this.guildsData.get(liveDataGuildArray[x].id);
                            }
                            if (this.userData.startupCall === true) {
                                for (y = 0; y < guildData.deletionChannels.length; y += 1) {
                                    guildData.deletionChannels[y].currentlyBeingDeleted = false;
                                    guildData.deletionChannels[y].timeOfLastPurge = 0;
                                }
                            }
                            guildData.guildID = liveDataGuildArray[x].id;
                            guildData.guildMemberCount = liveDataGuildArray[x].memberCount;
                            guildData.guildName = liveDataGuildArray[x].name;
                            return [4 /*yield*/, this.updateGuildDataInDB(guildData)];
                        case 3:
                            _a.sent();
                            _a.label = 4;
                        case 4:
                            x += 1;
                            return [3 /*break*/, 1];
                        case 5: return [2 /*return*/, new Promise(function (resolve, reject) {
                                resolve();
                            })];
                        case 6:
                            error_8 = _a.sent();
                            return [2 /*return*/, new Promise(function (resolve, reject) {
                                    reject(error_8);
                                })];
                        case 7: return [2 /*return*/];
                    }
                });
            });
        };
        /**
        * Retrieves a guild member's data from the database, or returnds fresh data.
        */
        DiscordUser.prototype.getGuildMemberDataFromDB = function (guildMember) {
            return __awaiter(this, void 0, void 0, function () {
                var guildMemberData_1, error_9, guildMemberData_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.dataBase.get(guildMember.guild.id + " + " + guildMember.id)];
                        case 1:
                            guildMemberData_1 = _a.sent();
                            return [2 /*return*/, new Promise(function (resolve, reject) {
                                    resolve(guildMemberData_1);
                                })];
                        case 2:
                            error_9 = _a.sent();
                            if (error_9.type === 'NotFoundError') {
                                console.log("Adding new entry for guild member data! For member: " + guildMember.user.username);
                                guildMemberData_2 = new GuildMemberData();
                                guildMemberData_2.displayName = guildMember.displayName;
                                guildMemberData_2.userID = guildMember.id;
                                guildMemberData_2.userName = guildMember.user.username;
                                return [2 /*return*/, new Promise(function (resolve, reject) {
                                        resolve(guildMemberData_2);
                                    })];
                            }
                            return [2 /*return*/, new Promise(function (resolve, reject) {
                                    reject(error_9);
                                })];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        /**
        * Updates a given guild member's data in the database.
        */
        DiscordUser.prototype.updateGuildMemberDataInDB = function (guildMemberData, guildID) {
            return __awaiter(this, void 0, void 0, function () {
                var guildMemberDataNew, error_10;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            this.guildMembersData.set(guildID + " + " + guildMemberData.userID, guildMemberData);
                            guildMemberDataNew = this.guildMembersData.get(guildID + " + " + guildMemberData.userID);
                            return [4 /*yield*/, this.dataBase.put(guildID + " + " + guildMemberData.userID, guildMemberDataNew)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, new Promise(function (resolve, reject) {
                                    resolve();
                                })];
                        case 2:
                            error_10 = _a.sent();
                            return [2 /*return*/, new Promise(function (resolve, reject) {
                                    reject(error_10);
                                })];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        /**
        * Function for updating all of the guild member's data caches,
        */
        DiscordUser.prototype.updateGuildMembersData = function (client) {
            return __awaiter(this, void 0, void 0, function () {
                var liveDataGuildArray, x, liveDataGuildMemberArray, y, guildMemberData, userData, error_11;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 11, , 12]);
                            liveDataGuildArray = client.guilds.cache.array();
                            x = 0;
                            _a.label = 1;
                        case 1:
                            if (!(x < liveDataGuildArray.length)) return [3 /*break*/, 8];
                            return [4 /*yield*/, liveDataGuildArray[x].members.fetch()];
                        case 2:
                            liveDataGuildMemberArray = (_a.sent()).array();
                            y = 0;
                            _a.label = 3;
                        case 3:
                            if (!(y < liveDataGuildMemberArray.length)) return [3 /*break*/, 7];
                            return [4 /*yield*/, this.getGuildMemberDataFromDB(liveDataGuildMemberArray[y])];
                        case 4:
                            guildMemberData = _a.sent();
                            if (this.guildMembersData.get(liveDataGuildArray[x].id + " + " + liveDataGuildMemberArray[y].id) !== undefined) {
                                guildMemberData = this.guildMembersData.get(liveDataGuildArray[x].id + " + " + liveDataGuildMemberArray[y].id);
                            }
                            guildMemberData.displayName = liveDataGuildMemberArray[y].displayName;
                            guildMemberData.userID = liveDataGuildMemberArray[y].id;
                            guildMemberData.userName = liveDataGuildMemberArray[y].user.username;
                            return [4 /*yield*/, this.updateGuildMemberDataInDB(guildMemberData, liveDataGuildArray[x].id)];
                        case 5:
                            _a.sent();
                            _a.label = 6;
                        case 6:
                            y += 1;
                            return [3 /*break*/, 3];
                        case 7:
                            x += 1;
                            return [3 /*break*/, 1];
                        case 8: return [4 /*yield*/, this.getUserDataFromDB(client)];
                        case 9:
                            userData = _a.sent();
                            userData.timeOfLastUpdateAndSave = new Date().getTime();
                            userData.startupCall = false;
                            return [4 /*yield*/, this.updateUserDataInDB(userData)];
                        case 10:
                            _a.sent();
                            return [2 /*return*/, new Promise(function (resolve, reject) {
                                    resolve();
                                })];
                        case 11:
                            error_11 = _a.sent();
                            return [2 /*return*/, new Promise(function (resolve, reject) {
                                    reject(error_11);
                                })];
                        case 12: return [2 /*return*/];
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
                var error_12;
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
                            error_12 = _a.sent();
                            return [2 /*return*/, new Promise(function (resolve, reject) {
                                    reject(error_12);
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
                var currentTime, msPassed, timeLeft, error_13;
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
                            error_13 = _a.sent();
                            return [2 /*return*/, new Promise(function (resolve, reject) {
                                    reject(error_13);
                                })];
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        return DiscordUser;
    }());
    DiscordUser_1.DiscordUser = DiscordUser;
})(DiscordUser || (DiscordUser = {}));
exports.default = DiscordUser;
