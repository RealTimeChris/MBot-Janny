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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const level_ts_1 = __importDefault(require("level-ts"));
const GuildData_1 = __importDefault(require("./GuildData"));
const GuildMemberData_1 = __importDefault(require("./GuildMemberData"));
const HelperFunctions_1 = __importDefault(require("./HelperFunctions"));
const config = require("./config.json");
/**
 *  Class representing an entire instance of Discord, from the perspective of a given bot.
 */
class DiscordUser {
    constructor() {
        this.userData = { activeInviteGuilds: [], botCommanders: [], botToken: '', currencyName: '', dataBaseFilePath: '',
            guildCount: 0, prefix: '', publicKey: '', startupCall: true, userID: '', userName: '' };
    }
    /**
    * Initializes the instance of Discord, within the DiscordUser class.
    */
    initializeInstance(client) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dataBaseFilePath = `${config.dataBaseFilePath} + ${client.user.id}`;
                this.dataBase = new level_ts_1.default(dataBaseFilePath);
                this.userData = yield this.getUserDataFromDB(client);
                this.userData.dataBaseFilePath = dataBaseFilePath;
                this.userData.startupCall = true;
                console.log(`Logged in as ${client.user.tag}!`);
                yield this.updateDataCacheAndSaveToFile(client);
                yield HelperFunctions_1.default.cacheMessagesForVerification(client, this);
                return;
            }
            catch (error) {
                return new Promise((resolve, reject) => {
                    reject(error);
                });
            }
        });
    }
    /**
    * Collects user data from the database, or alternatively, from the live objects.
    */
    getUserDataFromDB(client) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('Loading user data from the database!');
                const userData = yield this.dataBase.get(client.user.id);
                return userData;
            }
            catch (error) {
                if (error.type === 'NotFoundError') {
                    console.log("Adding new entry for the current user's data!");
                    const userData = {
                        activeInviteGuilds: [],
                        botCommanders: config.botCommanders,
                        botToken: config.botToken,
                        currencyName: config.currencyName,
                        dataBaseFilePath: this.userData.dataBaseFilePath,
                        guildCount: client.guilds.cache.size,
                        prefix: config.prefix,
                        publicKey: config.publicKey,
                        startupCall: true,
                        userID: client.user.id,
                        userName: client.user.username
                    };
                    return userData;
                }
                return new Promise((resolve, reject) => {
                    reject(error);
                });
            }
        });
    }
    /**
     * Updates the user data within the database.
     */
    updateUserDataInDB(newUserData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.userData = newUserData;
                yield this.dataBase.put(this.userData.userID, this.userData);
                this.userData = yield this.dataBase.get(this.userData.userID);
                console.log('New User Cache:');
                console.log(this.userData);
                return;
            }
            catch (error) {
                return new Promise((resolve, reject) => {
                    reject(error);
                });
            }
        });
    }
    /**
    * * Updates the cache of user data.
    */
    updateUserData(client) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userData = yield this.getUserDataFromDB(client);
                console.log('Updating the user data!');
                const newUserData = {
                    activeInviteGuilds: userData.activeInviteGuilds,
                    botCommanders: config.botCommanders,
                    botToken: config.botToken,
                    currencyName: config.currencyName,
                    dataBaseFilePath: this.userData.dataBaseFilePath,
                    guildCount: client.guilds.cache.size,
                    prefix: config.prefix,
                    publicKey: config.publicKey,
                    startupCall: this.userData.startupCall,
                    userID: client.user.id,
                    userName: client.user.username,
                };
                yield this.updateUserDataInDB(newUserData);
                return;
            }
            catch (error) {
                return new Promise((resolve, reject) => {
                    reject(error);
                });
            }
        });
    }
    /**
    * Updates the cache of guild data.}
    */
    updateGuildsData(client) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const liveDataGuildArray = client.guilds.cache.array().sort();
                for (let x = 0; x < liveDataGuildArray.length; x += 1) {
                    const guildData = new GuildData_1.default({ dataBase: this.dataBase, id: liveDataGuildArray[x].id, memberCount: liveDataGuildArray[x].memberCount, name: liveDataGuildArray[x].name });
                    yield guildData.getFromDataBase();
                    if (this.userData.startupCall === true) {
                        for (let x = 0; x < guildData.deletionChannels.length; x += 1) {
                            guildData.deletionChannels[x].currentlyBeingDeleted = false;
                        }
                    }
                    yield guildData.writeToDataBase();
                }
                return;
            }
            catch (error) {
                return new Promise((resolve, reject) => {
                    reject(error);
                });
            }
        });
    }
    /**
    * Function for updating all of the guild member's data caches,
    */
    updateGuildMembersData(client) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const liveDataGuildArray = client.guilds.cache.array();
                for (let x = 0; x < liveDataGuildArray.length; x += 1) {
                    const liveDataGuildMemberArray = (yield liveDataGuildArray[x].members.fetch()).array();
                    for (let y = 0; y < liveDataGuildMemberArray.length; y += 1) {
                        const guildMemberData = new GuildMemberData_1.default({ dataBase: this.dataBase, id: liveDataGuildMemberArray[y].id, guildId: liveDataGuildArray[x].id,
                            userName: liveDataGuildMemberArray[y].user.username, displayName: liveDataGuildMemberArray[y].displayName });
                        yield guildMemberData.getFromDataBase();
                        yield guildMemberData.writeToDataBase();
                    }
                }
                this.userData.startupCall = false;
                yield this.updateUserDataInDB(this.userData);
                return;
            }
            catch (error) {
                return new Promise((resolve, reject) => {
                    reject(error);
                });
            }
        });
    }
    /**
    * Updates the current data cache from live objects,
    * and the,JSON data file, and saves it to the JSON file.
    */
    updateDataCacheAndSaveToFile(client) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.updateUserData(client);
                yield this.updateGuildsData(client);
                yield this.updateGuildMembersData(client);
                return;
            }
            catch (error) {
                return new Promise((resolve, reject) => {
                    reject(error);
                });
            }
        });
    }
}
exports.default = DiscordUser;
