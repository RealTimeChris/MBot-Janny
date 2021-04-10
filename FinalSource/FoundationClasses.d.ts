import Discord = require('discord.js');
declare module FoundationClasses {
    /**
     * Class representing permission overwrites for Discord.
     */
    interface PermissionOverwrites {
        allow: string[];
        channel: Discord.GuildChannel | null;
        deny: string[];
        id: string;
        type: string;
    }
    /**
     * Class representing some info about a given user.
     */
    interface UserRecord {
        lastKnownUsername: string;
        lastKnownUserTag: string;
        userID: string;
    }
    /**
     * Class representing some info about a given server.
     */
    interface ServerRecord {
        replacementServerInvite: string;
        serverID: string;
        serverName: string;
        userRecords: UserRecord[];
    }
    /**
     * Class representing an actively-being-pruned channel.
     */
    interface DeletionChannel {
        channelID: string;
        currentlyBeingDeleted: boolean;
        deletionMessageID: string;
        numberOfMessagesToSave: number;
    }
    /**
     * Class representing a timed message to be sent out.
     */
    interface TimedMessage {
        messageContent: string;
        msBetweenSends: number;
        name: string;
        textChannelID: string;
        timeOfLastSend: number;
    }
    /**
     * Class representing a "server-joining verification" system.
     */
    interface VerificationSystem {
        channelID: string;
        emoji: string;
        messageID: string;
    }
    /**
     * Class representing a single log for something on a server.
     */
    interface Log {
        enabled: boolean;
        name: string;
        nameSmall: string;
        loggingChannelID: string;
        loggingChannelName: string;
    }
    /**
     * Class representing a "tracked user".
     */
    interface TrackedUser {
        channelID: string | undefined;
        userID: string;
        userName: string | undefined;
    }
    /**
     * Class representing a function/command.
     */
    interface BotCommand {
        description: string | Discord.MessageEmbed;
        function: Function;
        name: string;
    }
    /**
     * Class representing a command' return values.
     */
    interface CommandReturnData {
        commandName: string;
    }
    /**
    * Base abstract class for Discord classes.
    */
    abstract class DiscordEntity {
        abstract readonly id: string;
        abstract getFromDataBase(): Promise<void>;
        abstract writeToDataBase(): Promise<void>;
    }
    /**
    * Class representing the data that goes into a command.
    */
    class CommandData {
        args: string[];
        fromTextChannel: Discord.TextChannel | Discord.DMChannel | null;
        fromTextChannelType: string;
        guild: Discord.Guild | null;
        guildMember: Discord.GuildMember | Discord.User | null;
        interaction: any;
        permsChannel: Discord.GuildChannel | null;
        toTextChannel: Discord.WebhookClient | Discord.TextChannel | Discord.DMChannel | null;
        initialize(client: Discord.Client, fromTextChannelID: string, fromTextChannelType: string, interaction?: any, guildMemberID?: string, guildID?: string): Promise<void>;
    }
}
export default FoundationClasses;
