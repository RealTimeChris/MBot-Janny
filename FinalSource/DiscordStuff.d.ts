import Discord = require('discord.js');
import Level from 'level-ts';
export declare class PermissionOverwrites {
    deny: number;
    allow: number;
    id: string;
    channel: Discord.GuildChannel;
    type: string;
    /**
    * @param {Discord.Guild} guild
    */
    constructor(guild: Discord.Guild);
}
export declare class UserRecord {
    userID: string;
    lastKnownUsername: string;
    lastKnownUserTag: string;
}
export declare class ServerRecord {
    replacementServerInvite: string;
    serverName: string;
    serverID: string;
    userRecords: UserRecord[];
}
export declare class GuildMemberData {
    previousRoleIDs: string[];
    previousPermissionOverwrites: PermissionOverwrites[];
    userID: string;
    userName: string;
    displayName: string;
}
export declare class DeletionChannel {
    channelID: string;
    numberOfMessagesToSave: number;
    timeOfLastPurge: number;
    currentlyBeingDeleted: boolean;
    deletionMessageID: string;
}
export declare class TimedMessage {
    textChannelID: string;
    messageContent: string;
    msBetweenSends: number;
    timeOfLastSend: number;
    name: string;
}
export declare class VerificationSystem {
    channelID: string;
    messageID: string;
    emoji: string;
}
export declare class Log {
    name: string;
    nameSmall: string;
    enabled: boolean;
    loggingChannelID: string;
    loggingChannelName: string;
}
export declare class GuildData {
    ghostedRoleID: string;
    timedMessages: TimedMessage[];
    guildID: string;
    guildName: string;
    guildMemberCount: number;
    logs: Log[];
    verificationSystem: VerificationSystem;
    deletionChannels: DeletionChannel[];
    defaultRoleIDs: string[];
    constructor();
}
export declare class DiscordUserData {
    userID: string;
    userName: string;
    guildCount: number;
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
    trackingGuildIDs: string[];
    trackingChannelIDs: string[];
    trackedUserIDs: string[];
    trackedUserNames: string[];
}
export declare class BotCommand {
    name: string;
    description: string;
    function: Function;
}
/**
 * Returns that last text channel from a given guild.
 * @param   {Discord.Client}        client
 * @param   {Discord.Guild}         guild
 * @returns {Discord.TextChannel}
 */
export declare function getLastTextChannelInGuild(client: Discord.Client, guild: Discord.Guild, showInfoInConsole?: boolean): Discord.TextChannel;
/**
 * Checks a user ID against an array of user IDs to see if it is present.
 * @param   {String}    userID
 * @param   {String[]}  commanderIDs
 * @returns {boolean}
 */
export declare function checkForBotCommanderStatus(userID: string, commanderIDs: string[]): boolean;
/**
 * Recurses through a succession of messages.
 * @param   {String}                    userID
 * @param   {Discord.Message}           message
 * @param   {Number}                    currentPageIndex
 * @param   {Discord.MessageEmbed[]}    messageEmbeds
 * @param   {Boolean}                   deleteAfter
 * @returns {Promise<void>}
 */
export declare function recurseThroughMessagePages(userID: string, message: Discord.Message, currentPageIndex: number, messageEmbeds: Discord.MessageEmbed[], deleteAfter: boolean): Promise<void>;
/**
 * Checks if we have admin permissions in the current channel.
 * @param   {Discord.Message}   message
 * @param   {DiscordUser}       discordUser
 * @returns {Promise<boolean>}
 */
export declare function doWeHaveAdminPermission(message: Discord.Message, discordUser: DiscordUser): Promise<boolean>;
/**
 * Checks to see if we're in a DM channel, and sends a warning message if so. *
 * @param   {Discord.Message} message
 * @returns {Promise<boolean>}
 */
export declare function areWeInADM(message: Discord.Message): Promise<boolean>;
/**
* Applies default roles to a new guild member.
* @param   {GuildData}             guildData
* @param   {Discord.GuildMember}   guildMember
* @returns {Promise<void>}
*/
export declare function applyDefaultRoles(guildData: GuildData, guildMember: Discord.GuildMember): Promise<void>;
/**
* Sends out the timed messages within each server, if enough time has passed.
* @param   {Discord.Client}    client
* @param   {DiscordUser}    discordUser
* @returns {Promise<void>}
*/
export declare function sendTimedMessagesIfTimeHasPassed(client: Discord.Client, discordUser: DiscordUser): Promise<void>;
/**
* Takes a server record and a live guild object and either updates or adds it to the records.
* @param   {Object}            dataBase
* @param   {Discord.Guild[]}   liveGuildArray
* @param   {String[]}          keyNames
* @param   {Number}            y
* @returns {Promise<void>}
*/
export declare function recurseThroughServerRecords(dataBase: Level, liveGuildArray: Discord.Guild[], keyNames: string[], y?: number): Promise<void>;
export declare class DiscordUser {
    userData: DiscordUserData;
    guildsData: Map<string, GuildData>;
    guildMembersData: Map<string, GuildMemberData>;
    dataBase: any;
    /**
* Initializes the instance of Discord, within the DiscordUser class.
* @param   {Discord.Client} client
* @returns {Promise<void>}
*/
    initializeInstance(client: Discord.Client): Promise<void>;
    /**
* Collects user data from the database, or alternatively, from the live objects.
* @param   {Discord.Client}    client
* @returns {Promise<DiscordUserData>}
*/
    getUserDataFromDB(client: Discord.Client): Promise<DiscordUserData>;
    /**
* Updates the user data within the database.
* @param   {DiscordUserData}           newUserData
* @returns {Promise<void>}
*/
    updateUserDataInDB(newUserData: DiscordUserData): Promise<void>;
    /**
* * Updates the cache of user data.
* @param   {Discord.Client}    client
* @returns {Promise<void>}
*/
    private updateUserData;
    /**
* Collects the data for a single guild, from the database.
* @param   {Discord.Guild}             guild
* @returns {Promise<GuildData>}
*/
    getGuildDataFromDB(guild: Discord.Guild): Promise<GuildData>;
    /**
* Updates a given guild's data in the database.
* @param   {GuildData}       guildData
* @returns {Promise<void>}
*/
    updateGuildDataInDB(guildData: GuildData): Promise<void>;
    /**
* Updates the cache of guild data.
* @param   {Discord.Client}    client
* @returns {Promise<void>}
*/
    private updateGuildsData;
    /**
* Retrieves a guild member's data from the database, or returnds fresh data.
* @param   {Discord.GuildMember}   guildMember
* @returns {Promise<GuildMemberData>}
*/
    getGuildMemberDataFromDB(guildMember: Discord.GuildMember): Promise<GuildMemberData>;
    /**
* Updates a given guild member's data in the database.
* @param   {GuildMemberData}   guildMemberData
* @param   {String}            guildID
* @returns {Promise<void>}
*/
    private updateGuildMemberDataInDB;
    /**
* Function for updating all of the guild member's data caches,
* @param   {Discord.Client} client
* @returns {Promise<void>}
*/
    updateGuildMembersData(client: Discord.Client): Promise<void>;
    /**
* Updates the current data cache from live objects,
* and the,JSON data file, and saves it to the JSON file.
* @param   {Discord.Client}    client
* @returns {Promise<void>}
*/
    private updateDataCacheAndSaveToFile;
    /**
* Function that updates the data cache and saves it to disk,
* if a certain amount of time has passed since it was last done.
* @param   {Discord.Client}    client
* @returns {Promise<void>}
*/
    saveCacheIfTimeHasPassed(client: Discord.Client): Promise<void>;
    /**
* Updates and saves the Discord record, which contains user information.
* @param   {Discord.Client} client
* @returns {Promise<void>}
*/
    updateAndSaveDiscordRecordIfTimeHasPassed(client: Discord.Client): Promise<void>;
    /**
* Sends out an invite to a user from a selected list of users,
* if the server has been nuked/deleted.
* @param   {Discord.Client}    client
* @returns {Promise<void>}
*/
    sendInviteIfTimeHasPassedAndGuildIsActive(client: Discord.Client): Promise<void>;
    /**
* Purges all of the selected messages within the given channels,
* of each of the instance's guilds.
* @param   {Discord.Client}    client
* @param   {GuildData}         guild
* @param   {String}            channelIndex
* @returns {Promise<void>
*/
    private deleteMessagesIfTimeHasPassed;
    /**
* Purges the actively-being-purged text channels, if enough time has passed.
* @param   {Discord.Client} client
* @returns {Promise<void>}
*/
    purgeMessageChannelsIfTimeHasPassed(client: Discord.Client): Promise<void>;
    /**
* Caches messages for each of the guilds that have an active "verification" system.
* @param   {Discord.Client}    client
* @returns {Promise<void>}
*/
    private cacheMessagesForVerification;
}
