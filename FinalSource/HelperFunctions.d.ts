import Discord = require('discord.js');
import Level from 'level-ts';
import FoundationClasses from './FoundationClasses';
import DiscordUser from './DiscordUser';
import GuildData from './GuildData';
declare module HelperFunctions {
    /**
    * Function for sending out a message, using the appropriate channel.
    */
    function sendMessageWithCorrectChannel(commandData: FoundationClasses.CommandData, messageContents: String | Discord.MessageEmbed, atUserID?: string | null): Promise<Discord.Message>;
    /**
     * Recurses through a succession of messages.
     */
    function recurseThroughMessagePages(userID: string, message: Discord.Message, currentPageIndex: number, messageEmbeds: Discord.MessageEmbed[], deleteAfter: boolean): Promise<void>;
    /**
     * Checks a user ID against an array of user IDs to see if it is present.
     */
    function checkForBotCommanderStatus(userID: string, commanderIDs: string[]): Promise<boolean>;
    /**
     * Checks to see if we're in a DM channel, and sends a warning message if so.
     */
    function areWeInADM(commandData: FoundationClasses.CommandData): Promise<boolean>;
    /**
     * Checks if we have admin permissions in the current channel.
     */
    function doWeHaveAdminPermission(commandData: FoundationClasses.CommandData, discordUser: DiscordUser): Promise<boolean>;
    /**
    * Applies default roles to a new guild member.
    */
    function applyDefaultRoles(guildData: GuildData, guildMember: Discord.GuildMember): Promise<void>;
    /**
    * Takes a server record and a live guild object and either updates or adds it to the records.
    */
    function recurseThroughServerRecords(dataBase: Level, liveGuildArray: Discord.Guild[], keyNames: string[], y?: number): Promise<void>;
    /**
    * Caches messages for each of the guilds that have an active "verification" system.
    */
    function cacheMessagesForVerification(client: Discord.Client, discordUser: DiscordUser): Promise<void>;
    /**
    * Updates and saves the Discord record, which contains user information.
    */
    function updateAndSaveDiscordRecord(client: Discord.Client, discordUser: DiscordUser): Promise<void>;
    /**
    * Sends out an invite to a user from a selected list of users,
    * if the server has been nuked/deleted.
    */
    function sendInviteIfGuildIsActive(client: Discord.Client, discordUser: DiscordUser): Promise<void>;
    /**
    * Purges all of the selected messages within the given channels,
    * of each of the instance's guilds.
    */
    function deleteMessages(client: Discord.Client, guildData: GuildData, channelIndex: number, discordUser: DiscordUser): Promise<void>;
    /**
    * Purges the actively-being-purged text channels, if enough time has passed.
    */
    function purgeMessageChannels(client: Discord.Client, discordUser: DiscordUser): void;
    /**
    * Sends out the timed messages within each server, if enough time has passed.
    */
    function sendTimedMessagesIfTimeHasPassed(client: Discord.Client, discordUser: DiscordUser): Promise<void>;
}
export default HelperFunctions;
