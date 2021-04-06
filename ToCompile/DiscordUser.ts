// DiscordUser.ts - Module for my "discord user" class.
// Apr 4, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

import Discord = require('discord.js');
import Level from 'level-ts';
import GuildData from './GuildData';
import GuildMemberData from './GuildMemberData';
import HelperFunctions from './HelperFunctions';
import config = require('./config.json');

/**
 * Class representing a single instance of "Discord".
 */
export interface DiscordUserData {
    userID: string;
    userName: string;
    publicKey: string;
    clientID: string;
    guildCount: number;
    botToken: string;
    msBetweenCacheBackup: number;
    currencyName: string;
    timeOfLastUpdateAndSave: number;
    prefix: string;
    dataBaseFilePath: string;
    msBetweenRecordUpdates: number;
    timeOfLastRecordUpdate: number;
    msBetweenInvites: number;
    timeOfLastInvite: number;
    msBetweenMessageDeletion: number;
    startupCall: boolean;
    activeInviteGuilds: string[];
    botCommanders: string[];
}

/**
 *  Class representing an entire instance of Discord, from the perspective of a given bot.
 */
export class DiscordUser {
    userData: DiscordUserData = {userID: '', userName: '', publicKey:'', clientID: '', guildCount: 0, botToken: '',
        msBetweenCacheBackup: 0, currencyName: '', timeOfLastInvite: 0, prefix: '', dataBaseFilePath: '', msBetweenRecordUpdates: 0,
        timeOfLastRecordUpdate: 0, msBetweenInvites: 0, timeOfLastUpdateAndSave: 0, startupCall: true, activeInviteGuilds: [], botCommanders: [], msBetweenMessageDeletion: 0};
    guildsData = new Map<string, GuildData>();
    guildMembersData = new Map<string, GuildMemberData>();
    dataBase: any;

    /**
    * Initializes the instance of Discord, within the DiscordUser class.
    */
    async initializeInstance(client: Discord.Client): Promise<void> {
        try {
            const dataBaseFilePath = `${config.dataBaseFilePath} + ${client.user!.id}`;
            this.dataBase = new Level(dataBaseFilePath) as Level;
            this.userData = await this.getUserDataFromDB(client);
            this.userData.dataBaseFilePath = dataBaseFilePath;
            this.userData.startupCall = true;
            await this.updateUserDataInDB(this.userData);
            console.log(`Logged in as ${client.user!.tag}!`);
            await this.updateDataCacheAndSaveToFile(client);
            await HelperFunctions.cacheMessagesForVerification(client, this);
            return new Promise((resolve, reject) => {
                resolve();
            });
        } catch (error) {
            return new Promise((resolve, reject) => {
                reject(error);
            });
        }
    }

    /**
    * Collects user data from the database, or alternatively, from the live objects.
    */
    async getUserDataFromDB(client: Discord.Client): Promise<DiscordUserData> {
        try {
            console.log('Loading user data from the database!');
            const userData = await this.dataBase.get((client.user as Discord.User).id);
            return new Promise((resolve, reject) => {
                resolve(userData);
            });
        } catch (error) {
            if (error.type === 'NotFoundError'){
                console.log("Adding new entry for the current user's data!");
                const userData: DiscordUserData = {
                    botToken: config.botToken,
                    botCommanders: config.botCommanders,
                    msBetweenRecordUpdates: config.msBetweenRecordUpdates,
                    msBetweenInvites: config.msBetweenInvites,
                    msBetweenMessageDeletion: config.msBetweenMessageDeletion,
                    currencyName: config.currencyName,
                    publicKey: config.publicKey,
                    clientID: client.user!.id,
                    timeOfLastInvite: 0,
                    activeInviteGuilds: [],
                    timeOfLastRecordUpdate: 0,
                    dataBaseFilePath: config.dataBaseFilePath,
                    startupCall: true,
                    guildCount: client.guilds.cache.array().length,
                    msBetweenCacheBackup: config.msBetweenCacheBackup,
                    prefix: config.prefix,
                    timeOfLastUpdateAndSave: 0,
                    userID: client.user!.id,
                    userName:  client.user!.username
                };
                return new Promise((resolve, reject) => {
                    resolve(userData);
                });
            }
            return new Promise((resolve, reject) => {
                reject(error);
            });
        }
    }

    /**
    * Updates the user data within the database.
    */
    async updateUserDataInDB(newUserData: DiscordUserData): Promise<void> {
        try {
            this.userData = newUserData;
            await this.dataBase.put(this.userData.userID, this.userData);
            const userData = await this.dataBase.get(this.userData.userID);
            console.log('New User Cache:');
            console.log(userData);
            return new Promise((resolve, reject) => {
                resolve();
            });
        } catch (error) {
            return new Promise((resolve, reject) => {
                reject(error);
            });
        }
    }

    /**
    * * Updates the cache of user data.
    */
    private async updateUserData(client: Discord.Client): Promise<void> {
        try {
            const userData = await this.getUserDataFromDB(client);
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
            userData.userID = client.user!.id;
            userData.userName = client.user!.username;
            await this.updateUserDataInDB(userData);
            return new Promise((resolve, reject) => {
                resolve();
            });
        } catch (error) {
            return new Promise((resolve, reject) => {
                reject(error);
            });
        }
    }

    /**
    * Updates the cache of guild data.}
    */
     private async updateGuildsData(client: Discord.Client): Promise<void> {
        try {
            let liveDataGuildArray = [new Discord.Guild(client, {})];
            liveDataGuildArray.length = client.guilds.cache.array().length;
            liveDataGuildArray = client.guilds.cache.array().sort();

            for (let x = 0; x < liveDataGuildArray.length; x += 1) {
                console.log(`Updating the guild data, for guild number ${x}!`);
                const guildData = new GuildData({dataBase: this.dataBase, id: liveDataGuildArray[x]!.id, memberCount: liveDataGuildArray[x]!.memberCount, name: liveDataGuildArray[x]!.name});
                await guildData.getFromDataBase();
                await guildData.writeToDataBase();
                this.guildsData.set(liveDataGuildArray[x]!.id, guildData);
            }
            return new Promise((resolve, reject) => {
                resolve();
            });
        } catch (error) {
            return new Promise((resolve, reject) => {
                reject(error);
            });
        }
    }

    /**
        * Function for updating all of the guild member's data caches,
        */
    private async updateGuildMembersData(client: Discord.Client): Promise<void> {
        try {
            const liveDataGuildArray = client.guilds.cache.array();
            for (let x = 0; x < liveDataGuildArray.length; x += 1) {
                const liveDataGuildMemberArray = (await liveDataGuildArray[x]!.members.fetch()).array();

                for (let y = 0; y < liveDataGuildMemberArray.length; y += 1) {
                    try {
                        const guildMemberData = new GuildMemberData({dataBase: this.dataBase, id: liveDataGuildMemberArray[y]!.id, guildId: liveDataGuildArray[x]!.id,
                            userName: liveDataGuildMemberArray[y]!.user.username, displayName: liveDataGuildMemberArray[y]!.displayName});
                        await guildMemberData.getFromDataBase();
                        await guildMemberData.writeToDataBase();
                        this.guildMembersData.set(liveDataGuildArray[x]!.id + ' + ' + liveDataGuildMemberArray[y]!.id, guildMemberData);
                    }
                    catch(error){
                        console.log(error);
                    }
                }
            }
            const userData = await this.getUserDataFromDB(client);
            userData.timeOfLastUpdateAndSave = new Date().getTime();
            userData.startupCall = false;
            await this.updateUserDataInDB(userData);
            return new Promise((resolve, reject) => {
                resolve();
            });
        } catch (error) {
            return new Promise((resolve, reject) => {
                reject(error);
            });
        }
    }

    /**
    * Updates the current data cache from live objects,
    * and the,JSON data file, and saves it to the JSON file.
    */
    private async updateDataCacheAndSaveToFile(client: Discord.Client): Promise<void> {
        try {
            await this.updateUserData(client);
            await this.updateGuildsData(client);
            await this.updateGuildMembersData(client);
            return new Promise((resolve, reject) => {
                resolve();
            });
        } catch (error) {
            return new Promise((resolve, reject) => {
                reject(error);
            });
        }
    }

    /**
    * Function that updates the data cache and saves it to disk,
    * if a certain amount of time has passed since it was last done.
    */
    async saveCacheIfTimeHasPassed(client: Discord.Client): Promise<void> {
        try {
            const currentTime = new Date().getTime();
            const msPassed = currentTime - this.userData.timeOfLastUpdateAndSave;
            if (msPassed >= this.userData.msBetweenCacheBackup) {
                await this.updateDataCacheAndSaveToFile(client);
            } else {
                const timeLeft = this.userData.msBetweenCacheBackup - msPassed;
                console.log(`Time until next cache update and backup: ${timeLeft}ms`);
            }
            return new Promise((resolve, reject) => {
                resolve();
            });
        } catch (error) {
            return new Promise((resolve, reject) => {
                reject(error);
            });
        }
    }
}
