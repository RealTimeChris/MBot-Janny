import Discord = require('discord.js');
import GuildData from './GuildData';
import GuildMemberData from './GuildMemberData';
/**
 * Class representing a single instance of "Discord".
 */
export interface DiscordUserData {
    userID: string;
    userName: string;
    publicKey: string;
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
export default class DiscordUser {
    userData: DiscordUserData;
    guildsData: Map<string, GuildData>;
    guildMembersData: Map<string, GuildMemberData>;
    dataBase: any;
    /**
    * Initializes the instance of Discord, within the DiscordUser class.
    */
    initializeInstance(client: Discord.Client): Promise<void>;
    /**
    * Collects user data from the database, or alternatively, from the live objects.
    */
    getUserDataFromDB(client: Discord.Client): Promise<DiscordUserData>;
    /**
    * Updates the user data within the database.
    */
    updateUserDataInDB(newUserData: DiscordUserData): Promise<void>;
    /**
    * * Updates the cache of user data.
    */
    private updateUserData;
    /**
    * Updates the cache of guild data.}
    */
    private updateGuildsData;
    /**
    * Function for updating all of the guild member's data caches,
    */
    private updateGuildMembersData;
    /**
    * Updates the current data cache from live objects,
    * and the,JSON data file, and saves it to the JSON file.
    */
    private updateDataCacheAndSaveToFile;
    /**
    * Function that updates the data cache and saves it to disk,
    * if a certain amount of time has passed since it was last done.
    */
    saveCacheIfTimeHasPassed(client: Discord.Client): Promise<void>;
}
