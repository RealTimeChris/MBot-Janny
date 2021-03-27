import Discord = require('discord.js');
import Level from 'level-ts';
/**
 * Class representing permission overwrites for Discord.
 */
export declare class PermissionOverwrites {
    deny: string[];
    allow: string[];
    id: string;
    channel: Discord.GuildChannel | null;
    type: string;
    constructor(guild: Discord.Guild);
}
/**
 * Class representing some info about a given user.
 */
export declare class UserRecord {
    userID: string;
    lastKnownUsername: string;
    lastKnownUserTag: string;
}
/**
 * Class representing some info about a given server.
 */
export declare class ServerRecord {
    replacementServerInvite: string;
    serverName: string;
    serverID: string;
    userRecords: UserRecord[];
}
/**
 * Class representing a single guild/server member.
 */
export declare class GuildMemberData {
    previousRoleIDs: string[];
    previousPermissionOverwrites: PermissionOverwrites[];
    userID: string;
    userName: string;
    displayName: string;
}
/**
 * Class representing an actively-being-pruned channel.
 */
export declare class DeletionChannel {
    channelID: string;
    numberOfMessagesToSave: number;
    timeOfLastPurge: number;
    currentlyBeingDeleted: boolean;
    deletionMessageID: string;
}
/**
 * Class representing a timed message to be sent out.
 */
export declare class TimedMessage {
    textChannelID: string;
    messageContent: string;
    msBetweenSends: number;
    timeOfLastSend: number;
    name: string;
}
/**
 * Class representing a "server-joining verification" system.
 */
export declare class VerificationSystem {
    channelID: string;
    messageID: string;
    emoji: string;
}
/**
 * Class representing a single log for something on a server.
 */
export declare class Log {
    name: string;
    nameSmall: string;
    enabled: boolean;
    loggingChannelID: string;
    loggingChannelName: string;
}
/**
 * Class representing a single guild/server. *
 */
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
/**
 * Class representing a single instance of "Discord".
 */
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
/**
 * Class representing a function/command.
 */
export declare class BotCommand {
    name: string;
    description: string;
    function: Function;
}
/**
 * Returns that last text channel from a given guild.
 */
export declare function getLastTextChannelInGuild(client: Discord.Client, guild: Discord.Guild, showInfoInConsole?: boolean): Discord.TextChannel;
/**
 * Checks a user ID against an array of user IDs to see if it is present.
 */
export declare function checkForBotCommanderStatus(userID: string, commanderIDs: string[]): boolean;
/**
 * Recurses through a succession of messages.
 */
export declare function recurseThroughMessagePages(userID: string, message: Discord.Message, currentPageIndex: number, messageEmbeds: Discord.MessageEmbed[], deleteAfter: boolean): Promise<void>;
/**
 * Checks if we have admin permissions in the current channel.
 */
export declare function doWeHaveAdminPermission(message: Discord.Message, discordUser: DiscordUser): Promise<boolean>;
/**
 * Checks to see if we're in a DM channel, and sends a warning message if so.
 */
export declare function areWeInADM(message: Discord.Message): Promise<boolean>;
/**
* Applies default roles to a new guild member.
*/
export declare function applyDefaultRoles(guildData: GuildData, guildMember: Discord.GuildMember): Promise<void>;
/**
* Takes a server record and a live guild object and either updates or adds it to the records.
*/
export declare function recurseThroughServerRecords(dataBase: Level, liveGuildArray: Discord.Guild[], keyNames: string[], y?: number): Promise<void>;
/**
 *  Class representing an entire instance of Discord, from the perspective of a given bot.
 */
export declare class DiscordUser {
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
    * Collects the data for a single guild, from the database.
    */
    getGuildDataFromDB(guild: Discord.Guild): Promise<GuildData>;
    /**
    * Updates a given guild's data in the database.
    */
    updateGuildDataInDB(guildData: GuildData): Promise<void>;
    /**
    * Updates the cache of guild data.
    */
    private updateGuildsData;
    /**
    * Retrieves a guild member's data from the database, or returnds fresh data.
    */
    getGuildMemberDataFromDB(guildMember: Discord.GuildMember): Promise<GuildMemberData>;
    /**
    * Updates a given guild member's data in the database.
    */
    updateGuildMemberDataInDB(guildMemberData: GuildMemberData, guildID: string): Promise<void>;
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
    /**
    * Updates and saves the Discord record, which contains user information.
    */
    updateAndSaveDiscordRecordIfTimeHasPassed(client: Discord.Client): Promise<void>;
    /**
    * Sends out an invite to a user from a selected list of users,
    * if the server has been nuked/deleted.
    */
    sendInviteIfTimeHasPassedAndGuildIsActive(client: Discord.Client): Promise<void>;
    /**
    * Purges all of the selected messages within the given channels,
    * of each of the instance's guilds.
    */
    private deleteMessagesIfTimeHasPassed;
    /**
    * Purges the actively-being-purged text channels, if enough time has passed.
    */
    purgeMessageChannelsIfTimeHasPassed(client: Discord.Client): Promise<void>;
    /**
    * Sends out the timed messages within each server, if enough time has passed.
    */
    sendTimedMessagesIfTimeHasPassed(client: Discord.Client, discordUser: DiscordUser): Promise<void>;
    /**
    * Caches messages for each of the guilds that have an active "verification" system.
    */
    private cacheMessagesForVerification;
}
