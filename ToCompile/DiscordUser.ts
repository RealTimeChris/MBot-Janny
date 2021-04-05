// DiscordUser.ts - Module for my "discord user" class.
// Apr 4, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

import Discord = require('discord.js');
import HelperFunctions from './HelperFunctions';
import Level from 'level-ts';
import config = require('./config.json');

module DiscordUser{
    /**
     * Class representing permission overwrites for Discord.
     */
    export class PermissionOverwrites {
        deny: string[] = [];
        allow: string[] = [];
        id: string = '';
        channel: Discord.GuildChannel | null;
        type: string = '';
        constructor(guild: Discord.Guild) {
            this.channel = new Discord.GuildChannel(guild, {});
        }
    }

    /**
     * Class representing some info about a given user.
     */
    export class UserRecord {
        userID: string = '';
        lastKnownUsername: string = '';
        lastKnownUserTag: string = '';
    }

    /**
     * Class representing some info about a given server.
     */
    export class ServerRecord {
        replacementServerInvite: string = '';
        serverName: string = '';
        serverID: string = '';
        userRecords: UserRecord[] = [];
    }

    /**
     * Class representing a single guild/server member.
     */
    export class GuildMemberData {
        previousRoleIDs: string[] = [];
        previousPermissionOverwrites: PermissionOverwrites[] = [];
        userID: string = '';
        userName: string = '';
        displayName: string = '';
    }

    /**
     * Class representing an actively-being-pruned channel.
     */
    export class DeletionChannel {
        channelID: string = '';
        numberOfMessagesToSave: number = 0;
        timeOfLastPurge: number = 0;
        currentlyBeingDeleted: boolean = false;
        deletionMessageID: string = '';
    }

    /**
     * Class representing a timed message to be sent out.
     */
    export class TimedMessage {
        textChannelID: string = '';
        messageContent: string = '';
        msBetweenSends: number = 0;
        timeOfLastSend: number = 0;
        name: string = '';
    }

    /**
     * Class representing a "server-joining verification" system.
     */
    export class VerificationSystem {
        channelID: string = '';
        messageID: string = '';
        emoji: string = '';
    }

    /**
     * Class representing a single log for something on a server.
     */
    export class Log {
        name: string = '';
        nameSmall: string  = '';
        enabled: boolean = false;
        loggingChannelID: string = '';
        loggingChannelName: string = '';
    }

    /**
     * Class representing a "tracked user".
     */
    export class TrackedUser{
        userID: string = '';
        channelID: string | undefined = '';
        userName: string | undefined = '';
    }

    /**
     * Class representing a single guild/server. * 
     */
    export class GuildData {
        trackedUsers: TrackedUser[] = [];
        borderColor: number[] = [0, 0, 255];
        ghostedRoleID: string = '';
        timedMessages: TimedMessage[] = [];
        guildID: string = '';
        guildName: string = '';
        guildMemberCount: number = 0;
        logs: Log[] = [];
        verificationSystem: VerificationSystem = new VerificationSystem();
        deletionChannels: DeletionChannel[] = [];
        defaultRoleIDs: string[] = [];

        constructor() {
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
    }

    /**
     * Class representing a single instance of "Discord".
     */
    export class DiscordUserData {
        userID: string = '';
        userName: string = '';
        publicKey: string = '';
        clientID: string = '';
        guildCount: number = 0;
        botToken: string = '';
        msBetweenCacheBackup: number = 0;
        currencyName: string = '';
        timeOfLastUpdateAndSave: number = 0;
        prefix: string = '';
        dataBaseFilePath: string = '';
        msBetweenRecordUpdates: number = 0;
        timeOfLastRecordUpdate: number = 0;
        msBetweenInvites: number = 0;
        timeOfLastInvite: number = 0;
        msBetweenMessageDeletion: number = 0;
        startupCall: boolean = true;
        activeInviteGuilds: string[] = [];
        botCommanders: string[] = [];
    }

    /**
     * Class representing a function/command.
     */
    export class BotCommand {
        name: string = '';
        description: string = '';
        function: Function = new Function();
    }

    /**
     * Class representing the data that goes into a command.
     */
    export class CommandData{
        interaction: any = null;
        guild: Discord.Guild | null = null;
        guildMember: Discord.GuildMember | Discord.User | null = null;
        fromTextChannel: Discord.TextChannel | Discord.DMChannel | null = null;
        fromTextChannelType: string = '';
        permsChannel: Discord.GuildChannel | null = null;
        toTextChannel: Discord.WebhookClient | Discord.TextChannel | Discord.DMChannel |  null = null;
        args: string[] = [];
        async initialize(client: Discord.Client, fromTextChannelID: string, fromTextChannelType: string, interaction: any = null, guildMemberID: string = '', guildID: string = ''): Promise<void>{
            try{
                this.fromTextChannelType = fromTextChannelType;
                this.fromTextChannel = await client.channels.fetch(fromTextChannelID) as Discord.TextChannel | Discord.DMChannel;
                if (interaction !== null){
                    this.interaction = interaction;
                }
                if (guildID !== ''){
                    this.guild  = await client.guilds.fetch(guildID);
                }
                if (guildMemberID !== '' && guildID !== ''){
                    this.guildMember = await this.guild!.members.fetch(guildMemberID);
                }
                else{
                    this.guildMember = await client.users.fetch(guildMemberID);
                }
                if (interaction !== null && fromTextChannelType !== 'dm'){
                    this.toTextChannel = new Discord.WebhookClient(client.user!.id, this.interaction.token);
                    this.permsChannel = new Discord.GuildChannel(this.guild!, this.fromTextChannel);
                }
                if (interaction === null && fromTextChannelType !== 'dm'){
                    this.toTextChannel = await client.channels.fetch(fromTextChannelID) as Discord.TextChannel;
                    this.permsChannel = await client.channels.fetch(fromTextChannelID) as Discord.GuildChannel;
                }
                if (interaction !== null && fromTextChannelType === 'dm'){
                    this.toTextChannel = new Discord.WebhookClient(client.user!.id, this.interaction.token);
                    this.permsChannel = await client.channels.fetch(fromTextChannelID) as Discord.GuildChannel;
                }
                if (interaction === null && fromTextChannelType === 'dm'){
                    this.toTextChannel = await this.guildMember.createDM(true);
                    this.permsChannel = await client.channels.fetch(fromTextChannelID) as Discord.GuildChannel;
                }
            }
            catch(error){
                return new Promise((resolve, reject) => {
                    reject(error);
                })
            }
        }
    }

    /**
     * Class representing a command' return values.
     */
    export class CommandReturnData{
        commandName: string = '';
    }

    /**
     *  Class representing an entire instance of Discord, from the perspective of a given bot.
     */
    export class DiscordUser {
        userData = new DiscordUserData();
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
                    const userData = new DiscordUserData();
                    userData.botToken = config.botToken;
                    userData.botCommanders = config.botCommanders;
                    userData.msBetweenRecordUpdates = config.msBetweenRecordUpdates;
                    userData.msBetweenInvites = config.msBetweenInvites;
                    userData.msBetweenMessageDeletion = config.msBetweenMessageDeletion;
                    userData.currencyName = config.currencyName;
                    userData.publicKey = config.publicKey;
                    userData.clientID = config.clientID;
                    userData.timeOfLastInvite = 0;
                    userData.activeInviteGuilds = [];
                    userData.timeOfLastRecordUpdate = 0;
                    userData.guildCount = client.guilds.cache.array().length;
                    userData.msBetweenCacheBackup = config.msBetweenCacheBackup;
                    userData.prefix = config.prefix;
                    userData.timeOfLastUpdateAndSave = new Date().getTime();
                    userData.userID = client.user!.id;
                    userData.userName = client.user!.username;
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
        * Collects the data for a single guild, from the database.
        */
        async getGuildDataFromDB(guild: Discord.Guild): Promise<GuildData> {
            try {
                console.log('Loading guild data from the database!');
                const guildData = await this.dataBase.get(guild.id);
                return new Promise((resolve, reject) => {
                    resolve(guildData);
                });
            } catch (error) {
                if (error.type === 'NotFoundError'){
                    console.log(`Adding new entry for guild data! For guild: ${guild.name}`);
                    const guildData = new GuildData();
                    guildData.defaultRoleIDs = [];
                    guildData.deletionChannels = [];
                    guildData.ghostedRoleID = '';
                    guildData.guildID = guild.id;
                    guildData.guildMemberCount = guild.memberCount;
                    guildData.guildName = guild.name;
                    guildData.timedMessages = [];
                    guildData.trackedUsers = [];
                    guildData.verificationSystem = new VerificationSystem();
                    return new Promise((resolve, reject) => {
                        resolve(guildData);
                    });
                }
                return new Promise((resolve, reject) => {
                    reject(error);
                });
            }
        }

        /**
        * Updates a given guild's data in the database.
        */
        async updateGuildDataInDB(guildData: GuildData): Promise<void> {
            try {
                this.guildsData.set(guildData.guildID, guildData);
                let newGuildData = this.guildsData.get(guildData.guildID);
                await this.dataBase.put(guildData.guildID, newGuildData);
                newGuildData = await this.dataBase.get(guildData.guildID);
                console.log('New Guild Cache:');
                console.log(newGuildData);
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
        * Updates the cache of guild data.
        */
        private async updateGuildsData(client: Discord.Client): Promise<void> {
            try {
                let liveDataGuildArray = [new Discord.Guild(client, {})];
                liveDataGuildArray.length = client.guilds.cache.array().length;
                liveDataGuildArray = client.guilds.cache.array().sort();

                for (let x = 0; x < liveDataGuildArray.length; x += 1) {
                    let guildData = await this.getGuildDataFromDB(liveDataGuildArray[x]!);
                    console.log(`Updating the guild data, for guild number ${x}!`);
                    if (this.guildsData.get(liveDataGuildArray[x]!.id) !== undefined) {
                        guildData = this.guildsData.get(liveDataGuildArray[x]!.id)!;
                    }
                    if (this.userData.startupCall === true) {
                        for (let y = 0; y < guildData.deletionChannels.length; y += 1) {
                            guildData.deletionChannels[y]!.currentlyBeingDeleted = false;
                            guildData.deletionChannels[y]!.timeOfLastPurge = 0;
                        }
                    }
                    guildData.guildID = liveDataGuildArray[x]!.id;
                    guildData.guildMemberCount = liveDataGuildArray[x]!.memberCount;
                    guildData.guildName = liveDataGuildArray[x]!.name;
                    await this.updateGuildDataInDB(guildData);
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
        * Retrieves a guild member's data from the database, or returnds fresh data.
        */
        async getGuildMemberDataFromDB(guildMember: Discord.GuildMember): Promise<GuildMemberData> {
            try {
                const guildMemberData = await this.dataBase.get(`${guildMember.guild.id} + ${guildMember.id}`);
                return new Promise((resolve, reject) => {
                    resolve(guildMemberData);
                });
            } catch (error) {
                if (error.type === 'NotFoundError'){
                    console.log(`Adding new entry for guild member data! For member: ${guildMember.user.username}`);
                    const guildMemberData = new GuildMemberData();
                    guildMemberData.displayName = guildMember.displayName;
                    guildMemberData.userID = guildMember.id;
                    guildMemberData.userName = guildMember.user.username;
                    return new Promise((resolve, reject) => {
                        resolve(guildMemberData);
                    });
                }
                return new Promise((resolve, reject) => {
                    reject(error);
                });
            }
        }

        /**
        * Updates a given guild member's data in the database.
        */
        async updateGuildMemberDataInDB(guildMemberData: GuildMemberData, guildID: string): Promise<void> {
            try {
                this.guildMembersData.set(`${guildID} + ${guildMemberData.userID}`, guildMemberData);
                const guildMemberDataNew = this.guildMembersData.get(`${guildID} + ${guildMemberData.userID}`);
                await this.dataBase.put(`${guildID} + ${guildMemberData.userID}`, guildMemberDataNew);
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
                        let guildMemberData = await this.getGuildMemberDataFromDB(liveDataGuildMemberArray[y]!);
                        if (this.guildMembersData.get(`${liveDataGuildArray[x]!.id} + ${liveDataGuildMemberArray[y]!.id}`) !== undefined) {
                            guildMemberData = this.guildMembersData.get(`${liveDataGuildArray[x]!.id} + ${liveDataGuildMemberArray[y]!.id}`)!;
                        }
                        guildMemberData.displayName = liveDataGuildMemberArray[y]!.displayName;
                        guildMemberData.userID = liveDataGuildMemberArray[y]!.id;
                        guildMemberData.userName = liveDataGuildMemberArray[y]!.user.username;
                        await this.updateGuildMemberDataInDB(guildMemberData, liveDataGuildArray[x]!.id);
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
}
export default DiscordUser;