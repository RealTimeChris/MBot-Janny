import Discord = require('discord.js');
declare module DiscordUser {
    /**
     * Class representing permission overwrites for Discord.
     */
    class PermissionOverwrites {
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
    class UserRecord {
        userID: string;
        lastKnownUsername: string;
        lastKnownUserTag: string;
    }
    /**
     * Class representing some info about a given server.
     */
    class ServerRecord {
        replacementServerInvite: string;
        serverName: string;
        serverID: string;
        userRecords: UserRecord[];
    }
    /**
     * Class representing a single guild/server member.
     */
    class GuildMemberData {
        previousRoleIDs: string[];
        previousPermissionOverwrites: PermissionOverwrites[];
        userID: string;
        userName: string;
        displayName: string;
    }
    /**
     * Class representing an actively-being-pruned channel.
     */
    class DeletionChannel {
        channelID: string;
        numberOfMessagesToSave: number;
        timeOfLastPurge: number;
        currentlyBeingDeleted: boolean;
        deletionMessageID: string;
    }
    /**
     * Class representing a timed message to be sent out.
     */
    class TimedMessage {
        textChannelID: string;
        messageContent: string;
        msBetweenSends: number;
        timeOfLastSend: number;
        name: string;
    }
    /**
     * Class representing a "server-joining verification" system.
     */
    class VerificationSystem {
        channelID: string;
        messageID: string;
        emoji: string;
    }
    /**
     * Class representing a single log for something on a server.
     */
    class Log {
        name: string;
        nameSmall: string;
        enabled: boolean;
        loggingChannelID: string;
        loggingChannelName: string;
    }
    /**
     * Class representing a "tracked user".
     */
    class TrackedUser {
        userID: string;
        channelID: string | undefined;
        userName: string | undefined;
    }
    /**
     * Class representing a single guild/server. *
     */
    class GuildData {
        trackedUsers: TrackedUser[];
        borderColor: number[];
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
    class DiscordUserData {
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
     * Class representing a function/command.
     */
    class BotCommand {
        name: string;
        description: string;
        function: Function;
    }
    /**
     * Class representing the data that goes into a command.
     */
    class CommandData {
        interaction: any;
        guild: Discord.Guild | null;
        guildMember: Discord.GuildMember | Discord.User | null;
        fromTextChannel: Discord.TextChannel | Discord.DMChannel | null;
        fromTextChannelType: string;
        permsChannel: Discord.GuildChannel | null;
        toTextChannel: Discord.WebhookClient | Discord.TextChannel | Discord.DMChannel | null;
        args: string[];
        initialize(client: Discord.Client, fromTextChannelID: string, fromTextChannelType: string, interaction?: any, guildMemberID?: string, guildID?: string): Promise<void>;
    }
    /**
     * Class representing a command' return values.
     */
    class CommandReturnData {
        commandName: string;
    }
    /**
     *  Class representing an entire instance of Discord, from the perspective of a given bot.
     */
    class DiscordUser {
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
    }
}
export default DiscordUser;
