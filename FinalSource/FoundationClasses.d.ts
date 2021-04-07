import Discord = require('discord.js');
declare module FoundationClasses {
    /**
     * Class representing permission overwrites for Discord.
     */
    interface PermissionOverwrites {
        deny: string[];
        allow: string[];
        id: string;
        channel: Discord.GuildChannel | null;
        type: string;
    }
    /**
     * Class representing some info about a given user.
     */
    interface UserRecord {
        userID: string;
        lastKnownUsername: string;
        lastKnownUserTag: string;
    }
    /**
     * Class representing some info about a given server.
     */
    interface ServerRecord {
        replacementServerInvite: string;
        serverName: string;
        serverID: string;
        userRecords: UserRecord[];
    }
    /**
     * Class representing an actively-being-pruned channel.
     */
    interface DeletionChannel {
        channelID: string;
        numberOfMessagesToSave: number;
        timeOfLastPurge: number;
        currentlyBeingDeleted: boolean;
        deletionMessageID: string;
    }
    /**
     * Class representing a timed message to be sent out.
     */
    interface TimedMessage {
        textChannelID: string;
        messageContent: string;
        msBetweenSends: number;
        timeOfLastSend: number;
        name: string;
    }
    /**
     * Class representing a "server-joining verification" system.
     */
    interface VerificationSystem {
        channelID: string;
        messageID: string;
        emoji: string;
    }
    /**
     * Class representing a single log for something on a server.
     */
    interface Log {
        name: string;
        nameSmall: string;
        enabled: boolean;
        loggingChannelID: string;
        loggingChannelName: string;
    }
    /**
     * Class representing a "tracked user".
     */
    interface TrackedUser {
        userID: string;
        channelID: string | undefined;
        userName: string | undefined;
    }
    /**
    * Base abstract class for Discord classes.
    */
    abstract class DiscordEntity {
        abstract id: string;
        abstract getFromDataBase(): Promise<void>;
        abstract writeToDataBase(): Promise<void>;
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
     * Class representing a function/command.
     */
    interface BotCommand {
        name: string;
        description: string;
        function: Function;
    }
    /**
     * Class representing a command's return values.
     */
    interface CommandReturnData {
        commandName: string;
    }
}
export default FoundationClasses;
