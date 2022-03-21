// FoundationClasses.ts - Module for my "builder classes".
// Apr 5, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

import Discord = require('discord.js');

module FoundationClasses{
    /**
     * Class representing permission overwrites for Discord.
     */
    export interface PermissionOverwrites {
        allow: string[];
        channel: Discord.GuildChannel | null;
        deny: string[];
        id: string;
        type: string;
    }

    /**
     * Class representing some info about a given user.
     */
    export interface UserRecord {
        lastKnownUsername: string;
        lastKnownUserTag: string;
        userID: string;
    }

    /**
     * Class representing some info about a given server.
     */
    export interface ServerRecord {
        replacementServerInvite: string;
        serverID: string;
        serverName: string;
        userRecords: UserRecord[];
    }

    /**
     * Class representing an actively-being-pruned channel.
     */
    export interface DeletionChannel {
        channelID: string;
        currentlyBeingDeleted: boolean;
        deletionMessageID: string;
        numberOfMessagesToSave: number;
    }

    /**
     * Class representing a timed message to be sent out.
     */
    export interface TimedMessage {
        messageContent: string;
        msBetweenSends: number;
        name: string;
        textChannelID: string;
        timeOfLastSend: number;
    }

    /**
     * Class representing a "server-joining verification" system.
     */
    export interface VerificationSystem {
        channelID: string;
        emoji: string;
        messageID: string;
    }

    /**
     * Class representing a single log for something on a server.
     */
    export interface Log {
        enabled: boolean;
        name: string;
        nameSmall: string;
        loggingChannelID: string;
        loggingChannelName: string;
    }

    /**
     * Class representing a "tracked user".
     */
    export interface TrackedUser{
        channelID: string | undefined;
        userID: string;
        userName: string | undefined;
    }

    /**
     * Class representing a function/command.
     */
    export interface BotCommand {
        description: string | Discord.MessageEmbed;
        function: Function;
        name: string;
    }

    /**
     * Class representing a command' return values.
     */
    export interface CommandReturnData {
        commandName: string;
    }

    /**
    * Base abstract class for Discord classes.
    */
    export abstract class DiscordEntity {
        public readonly abstract id: string = '';
        public abstract getFromDataBase(): Promise<void>;
        public abstract writeToDataBase(): Promise<void>;
    }

    /**
    * Class representing the data that goes into a command.
    */
     export class CommandData {
        public args: string[] = [];
        public fromTextChannel: Discord.TextChannel | Discord.DMChannel | null = null;
        public fromTextChannelType: string = '';
        public guild: Discord.Guild | null = null;
        public guildMember: Discord.GuildMember | Discord.User | null = null;
        public interaction: any = null;
        public permsChannel: Discord.GuildChannel | null = null;
        public toTextChannel: Discord.WebhookClient | Discord.TextChannel | Discord.DMChannel |  null = null;
    
        public async initialize(client: Discord.Client, fromTextChannelID: string, fromTextChannelType: string, interaction: any = null, guildMemberID: string = '', guildID: string = ''): Promise<void>{
            try{
                this.fromTextChannelType = fromTextChannelType;
                this.fromTextChannel = await client.channels.fetch(fromTextChannelID) as Discord.TextChannel | Discord.DMChannel;
                if (interaction !== null) {
                    this.interaction = interaction;
                }
                if (guildID !== '') {
                    this.guild  = await client.guilds.fetch(guildID);
                }
                if (guildMemberID !== '' && guildID !== '') {
                    this.guildMember = await this.guild!.members.fetch(guildMemberID);
                }
                else{
                    this.guildMember = await client.users.fetch(guildMemberID);
                }
                if (interaction !== null && fromTextChannelType !== 'dm') {
                    this.toTextChannel = new Discord.WebhookClient(client.user!.id, this.interaction.token);
                    this.permsChannel = new Discord.GuildChannel(this.guild!, this.fromTextChannel);
                }
                if (interaction === null && fromTextChannelType !== 'dm') {
                    this.toTextChannel = await client.channels.fetch(fromTextChannelID) as Discord.TextChannel;
                    this.permsChannel = await client.channels.fetch(fromTextChannelID) as Discord.GuildChannel;
                }
                if (interaction !== null && fromTextChannelType === 'dm') {
                    this.toTextChannel = new Discord.WebhookClient(client.user!.id, this.interaction.token);
                    this.permsChannel = await client.channels.fetch(fromTextChannelID) as Discord.GuildChannel;
                }
                if (interaction === null && fromTextChannelType === 'dm') {
                    this.toTextChannel = await this.guildMember.createDM(true);
                    this.permsChannel = await client.channels.fetch(fromTextChannelID) as Discord.GuildChannel;
                }
                return;
            }
            catch(error) {
                return new Promise((resolve, reject) => {
                    reject(error);
                })
            }
        }
    }
}
export default FoundationClasses;
