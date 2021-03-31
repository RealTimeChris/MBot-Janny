// DiscordStuff.js - Implementation for my Discord bots.
// Jan 28, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

import Discord = require('discord.js');
import Level from 'level-ts';
import config = require('./config.json');

/**
 * Functino for sending out a message, using the appropriate channel.
 */
export async function sendMessageWithCorrectChannel(commandData: CommandData, messageContents: string | Discord.MessageEmbed): Promise<Discord.Message>{
	try{
		let returnMessage: Discord.Message;
		console.log(commandData.toTextChannel instanceof Discord.WebhookClient);
		console.log((commandData.toTextChannel as Discord.WebhookClient).token);
		if (commandData.toTextChannel instanceof Discord.WebhookClient){
			returnMessage = await commandData.toTextChannel.send(messageContents as Discord.WebhookMessageOptions) as Discord.Message;
		}
		else{
			returnMessage = await (commandData.toTextChannel as Discord.TextChannel).send(messageContents) as Discord.Message;
		}

		return new Promise((resolve, reject) => {
			resolve(returnMessage as Discord.Message);
		});
	}
	catch(error){
		return new Promise((resolve, reject) => {
			reject(error);
		 })
	}
}

/**
 * Checks a user ID against an array of user IDs to see if it is present.
 */
export function checkForBotCommanderStatus(userID: string, commanderIDs: string[]): boolean {
	let isCommander = false;
	for (let x = 0; x < commanderIDs.length; x += 1) {
		if (userID === commanderIDs[x]) {
			isCommander = true;
			break;
		}
	}
	return isCommander;
}

/**
 * Recurses through a succession of messages.
 */
export async function recurseThroughMessagePages(userID: string, message: Discord.Message,
	currentPageIndex: number, messageEmbeds: Discord.MessageEmbed[], deleteAfter: boolean): Promise<void> {
	let newCurrentPageIndex = currentPageIndex;
	try {
		message.react('◀️');
		message.react('▶️');
		message.react('❌');
		const filter = (reaction: Discord.MessageReaction, user: Discord.User) => (reaction.emoji.name === '◀️' || reaction.emoji.name === '▶️' || reaction.emoji.name === '❌') && user.id === userID;
		const reactionCollector = message.createReactionCollector(filter, { time: 120000 });
		reactionCollector.on('collect', async (reaction) => {
			reactionCollector.resetTimer({ time: 120000 });
			if (reaction.emoji.name === '❌') {
				reactionCollector.stop('User exited.');
			} else if (reaction.emoji.name === '▶️' && (newCurrentPageIndex === (messageEmbeds.length - 1))) {
				reaction.users.remove(userID);
				newCurrentPageIndex = 0;
				const messageEmbed = messageEmbeds[newCurrentPageIndex] as Discord.MessageEmbed;
				await message.edit(messageEmbed);
			} else if (reaction.emoji.name === '▶️' && (newCurrentPageIndex < messageEmbeds.length)) {
				reaction.users.remove(userID);
				newCurrentPageIndex += 1;
				const messageEmbed = messageEmbeds[newCurrentPageIndex] as Discord.MessageEmbed;
				await message.edit(messageEmbed);
			} else if (reaction.emoji.name === '◀️' && (newCurrentPageIndex > 0)) {
				reaction.users.remove(userID);
				newCurrentPageIndex -= 1;
				const messageEmbed = messageEmbeds[newCurrentPageIndex] as Discord.MessageEmbed;
				await message.edit(messageEmbed);
			} else if (reaction.emoji.name === '◀️' && (newCurrentPageIndex === 0)) {
				reaction.users.remove(userID);
				newCurrentPageIndex = messageEmbeds.length - 1;
				const messageEmbed = messageEmbeds[newCurrentPageIndex] as Discord.MessageEmbed;
				await message.edit(messageEmbed);
			}
		});

		reactionCollector.on('end', async () => {
			if (deleteAfter === true) {
				if (message.deletable){
					await message.delete();
				}
				await message.delete();
			} else {
				await message.reactions.removeAll();
			}
		});
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
 * Checks to see if we're in a DM channel, and sends a warning message if so.
 */
export async function areWeInADM(commandData: CommandData): Promise<boolean> {
	try { 
		const currentChannelType = commandData.fromTextChannelType;

		if (currentChannelType === 'dm') {
			const msgContents = `Sorry, but we can't do that in a direct message!`;
			await sendMessageWithCorrectChannel(commandData, msgContents);
			
			return new Promise((resolve, reject) => {
				resolve(true);
			});
		}
		return new Promise((resolve, reject) => {
			resolve(false);
		});
	} catch (error) {
		return new Promise((resolve, reject) => {
			reject(error);
		});
	}
}

/**
* Applies default roles to a new guild member.
*/
export async function applyDefaultRoles(guildData: GuildData, guildMember: Discord.GuildMember): Promise<void> {
	let currentIndex = 0;
	try {
		if (guildData.verificationSystem.channelID === null) {
			const guildMemberRoleManager = new Discord.GuildMemberRoleManager(guildMember);

			for (let x = 0; x < guildData.defaultRoleIDs.length; x += 1) {
				currentIndex = x;
				await guildMemberRoleManager.add((guildData.defaultRoleIDs[x] as string));
			}
		}
		return new Promise((resolve, reject) => {
			resolve();
		});
	} catch (error) {
		guildData.defaultRoleIDs.splice(currentIndex, 1);
		applyDefaultRoles(guildData, guildMember);
		return new Promise((resolve, reject) => {
			reject(error);
		});
	}
}

/**
* Takes a server record and a live guild object and either updates or adds it to the records.
*/
export async function recurseThroughServerRecords(dataBase: Level, liveGuildArray: Discord.Guild[], keyNames: string[], y = 0): Promise<void> {
	try {
		if (keyNames.length === 0) {
			return new Promise((resolve, reject) => {
				resolve();
			});
		}
		let yNew = y;
		const fileObject = await dataBase.get(keyNames[0] as string) as ServerRecord;
		
		keyNames.splice(0, 1);

		fileObject.serverName = liveGuildArray[y]?.name as string;
		fileObject.serverID = liveGuildArray[y]?.id as string;
		console.log(`Updating Server Record Info For Server #${y}: ${fileObject.serverName}`);

		const guildMembersCollection = await (liveGuildArray[y] as Discord.Guild).members.fetch();

		const membersArray = guildMembersCollection.array().sort();

		for (let z = 0; z < membersArray.length; z += 1) {
			let areTheyFoundInFile = false;
			for (let w = 0; w < fileObject.userRecords.length; w += 1) {
				if ((membersArray[z] as Discord.GuildMember).id === (fileObject.userRecords[w] as UserRecord).userID) {
					areTheyFoundInFile = true;
					(fileObject.userRecords[w] as UserRecord).userID = (membersArray[z] as Discord.GuildMember).user.id;
					(fileObject.userRecords[w] as UserRecord).lastKnownUserTag = (membersArray[z] as Discord.GuildMember).user.tag;
					(fileObject.userRecords[w] as UserRecord).lastKnownUsername = (membersArray[z] as Discord.GuildMember).user.username;
				}
			}
			if (areTheyFoundInFile === false) {
				const userRecord = new UserRecord();
				userRecord.lastKnownUserTag = (membersArray[z] as Discord.GuildMember).user.tag;
				userRecord.lastKnownUsername = (membersArray[z] as Discord.GuildMember).user.username;
				userRecord.userID = (membersArray[z] as Discord.GuildMember).id;
				fileObject.userRecords.push(userRecord);
				console.log(`Adding New User Record: ${userRecord.lastKnownUserTag} of server: ${fileObject.serverName}`);
			}
		}
		const serverRecordKey = `${(liveGuildArray[y] as Discord.Guild).id} + Record`;
		dataBase.put(serverRecordKey, fileObject);
		console.log(fileObject);
		yNew += 1;
		await recurseThroughServerRecords(dataBase, liveGuildArray, keyNames, yNew);
		return new Promise((resolve, reject) => {
			resolve();
		});
	} catch (error) {
		if (error.type === 'NotFoundError') {
			const serverRecord = new ServerRecord();
			serverRecord.serverName = (liveGuildArray[y] as Discord.Guild).name;
			serverRecord.serverID = (liveGuildArray[y] as Discord.Guild).id;
			serverRecord.replacementServerInvite = String();
			serverRecord.userRecords = [];
			console.log(`Adding New Server Record: ${serverRecord.serverName}`);
			console.log(`Saving the JSON file for this Discord server for the first time: ${serverRecord.serverName}`);

			const guildMembersCollection = await (liveGuildArray[y] as Discord.Guild).members.fetch();

			const membersArray = guildMembersCollection.array().sort();

			for (let z = 0; z < membersArray.length; z += 1) {
				const userRecord = new UserRecord();
				userRecord.lastKnownUserTag = (membersArray[z] as Discord.GuildMember).user.tag;
				userRecord.lastKnownUsername = (membersArray[z] as Discord.GuildMember).user.username;
				userRecord.userID = (membersArray[z] as Discord.GuildMember).id;
				serverRecord.userRecords.push(userRecord as UserRecord);
				console.log(`Adding New User Record: ${userRecord.lastKnownUserTag} of server: ${serverRecord.serverName}`);
			}
			const serverRecordKey = `${(liveGuildArray[y] as Discord.Guild).id} + Record`;
			await dataBase.put(serverRecordKey, serverRecord);
			console.log(serverRecord);
			await recurseThroughServerRecords(dataBase, liveGuildArray, keyNames, y);
			return new Promise((resolve, reject) => {
				resolve();
			});
		}
		return new Promise((resolve, reject) => {
			reject(error);
		});
	}
}

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
 * Class representing a single guild/server. * 
 */
export class GuildData {
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
	trackingGuildIDs: string[] = [];
	trackingChannelIDs: string[] = [];
	trackedUserIDs: string[] = [];
	trackedUserNames: string[] = [];
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
				this.guild  = (await client.guilds.fetch(guildID) as Discord.Guild);
			}
			if (guildMemberID !== '' && guildID !== ''){
				this.guildMember = (await (this.guild as Discord.Guild).members.fetch(guildMemberID) as Discord.GuildMember);
			}
			else{
				this.guildMember = await client.users.fetch(guildMemberID) as Discord.User;
			}
			if (interaction !== null && fromTextChannelType !== 'dm'){
				this.toTextChannel = new Discord.WebhookClient((client.user as Discord.User).id, this.interaction.token) as Discord.WebhookClient;
				this.permsChannel = new Discord.GuildChannel(this.guild as Discord.Guild, this.fromTextChannel);
			}
			if (interaction === null && fromTextChannelType !== 'dm'){
				this.toTextChannel = await client.channels.fetch(fromTextChannelID) as Discord.TextChannel;
				this.permsChannel = new Discord.GuildChannel(this.guild as Discord.Guild, this.fromTextChannel);
			}
			if (fromTextChannelType === 'dm'){
				this.toTextChannel = new Discord.WebhookClient((client.user as Discord.User).id, this.interaction.token) as Discord.WebhookClient;
				this.permsChannel = (await client.channels.fetch(fromTextChannelID) as Discord.GuildChannel);
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
			const dataBaseFilePath = `${config.dataBaseFilePath} + ${(client.user as Discord.User).id}`;
			this.dataBase = new Level(dataBaseFilePath) as Level;
			this.userData = await this.getUserDataFromDB(client) as DiscordUserData;
			this.userData.dataBaseFilePath = dataBaseFilePath;
			this.userData.startupCall = true;
			await this.updateUserDataInDB(this.userData);
			console.log(`Logged in as ${(client.user as Discord.User).tag}!`);
			await this.updateDataCacheAndSaveToFile(client);
			await this.cacheMessagesForVerification(client);
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
				userData.trackedUserIDs = [];
				userData.trackedUserNames = [];
				userData.trackingChannelIDs = [];
				userData.trackingGuildIDs = [];
				userData.userID = (client.user as Discord.User).id;
				userData.userName = (client.user as Discord.User).username;
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
			if (userData.trackedUserIDs === undefined){ 
				userData.trackedUserIDs = [];
				userData.trackedUserNames = [];
				userData.trackingChannelIDs = [];
				userData.trackingGuildIDs = [];
			}
			userData.userID = (client.user as Discord.User).id;
			userData.userName = (client.user as Discord.User).username;
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
				guildData.ghostedRoleID = String();
				guildData.guildID = guild.id;
				guildData.guildMemberCount = guild.memberCount;
				guildData.guildName = guild.name;
				guildData.timedMessages = [];
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
			this.guildsData.set((guildData.guildID as string), guildData);
			let newGuildData = this.guildsData.get((guildData.guildID as string))
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
				let guildData = await this.getGuildDataFromDB(liveDataGuildArray[x] as Discord.Guild) as GuildData;
				console.log(`Updating the guild data, for guild number ${x}!`);
				if (this.guildsData.get((liveDataGuildArray[x] as Discord.Guild).id) !== undefined) {
					guildData = this.guildsData.get((liveDataGuildArray[x] as Discord.Guild).id) as GuildData;
				}
				if (this.userData.startupCall === true) {
					for (let y = 0; y < guildData.deletionChannels.length; y += 1) {
						(guildData.deletionChannels[y] as DeletionChannel).currentlyBeingDeleted = false;
						(guildData.deletionChannels[y] as DeletionChannel).timeOfLastPurge = 0;
					}
				}
				guildData.guildID = (liveDataGuildArray[x] as Discord.Guild).id;
				guildData.guildMemberCount = (liveDataGuildArray[x] as Discord.Guild).memberCount;
				guildData.guildName = (liveDataGuildArray[x] as Discord.Guild).name;
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
				console.log(error);
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
				const liveDataGuildMemberArray = (await (liveDataGuildArray[x] as Discord.Guild).members.fetch()).array();
				
				for (let y = 0; y < liveDataGuildMemberArray.length; y += 1) {
					let guildMemberData = await this.getGuildMemberDataFromDB(liveDataGuildMemberArray[y] as Discord.GuildMember) as GuildMemberData;
					if (this.guildMembersData.get(`${(liveDataGuildArray[x] as Discord.Guild).id} + ${(liveDataGuildMemberArray[y] as Discord.GuildMember).id}`) !== undefined) {
						guildMemberData = this.guildMembersData.get(`${(liveDataGuildArray[x] as Discord.Guild).id} + ${(liveDataGuildMemberArray[y] as Discord.GuildMember).id}`) as GuildMemberData;
					}
					guildMemberData.displayName = (liveDataGuildMemberArray[y] as Discord.GuildMember).displayName;
					guildMemberData.userID = (liveDataGuildMemberArray[y] as Discord.GuildMember).id;
					guildMemberData.userName = (liveDataGuildMemberArray[y] as Discord.GuildMember).user.username;
					await this.updateGuildMemberDataInDB(guildMemberData, (liveDataGuildArray[x] as Discord.Guild).id);
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

	/**
	 * Checks if we have admin permissions in the current channel.
	 */
	async doWeHaveAdminPermission(commandData: CommandData): Promise<boolean> {
		try {
			const currentChannelPermissions = (commandData.guildMember as Discord.GuildMember).permissionsIn(commandData.permsChannel as Discord.GuildChannel);

			const permissionStrings = ['ADMINISTRATOR'] as Discord.PermissionString[];

			const areTheyAnAdmin = currentChannelPermissions.has(permissionStrings);

			const areTheyACommander = checkForBotCommanderStatus((commandData.guildMember as Discord.GuildMember).id,
				this.userData.botCommanders);

			if (areTheyAnAdmin === true || areTheyACommander === true) {
				return new Promise((resolve, reject) => {
					resolve(true);
				});
			}

			await (commandData.permsChannel as Discord.TextChannel).send(`<@!${(commandData.guildMember as Discord.GuildMember).id}> Sorry, but you don't have the permissions required for that!`);
			return new Promise((resolve, reject) => {
				resolve(false);
			});
		} catch (error) {
			return new Promise((resolve, reject) => {
				reject(error);
			});
		}
	}
	/**
	* Updates and saves the Discord record, which contains user information.
	*/
	async updateAndSaveDiscordRecordIfTimeHasPassed(client: Discord.Client): Promise<void> {
		try {
			const currentTime = new Date().getTime();

			const timeDifference = currentTime - this.userData.timeOfLastRecordUpdate;

			if (timeDifference >= this.userData.msBetweenRecordUpdates) {
				const liveGuildArray = client.guilds.cache.array();

				const keyNames = [];
				for (let x = 0; x < liveGuildArray.length; x += 1) {
					const keyname = `${(liveGuildArray[x] as Discord.Guild).id} + Record`;
					keyNames.push(keyname);
				}

				await recurseThroughServerRecords(this.dataBase, liveGuildArray, keyNames);
				this.userData.timeOfLastRecordUpdate = new Date().getTime();
				await this.updateUserDataInDB(this.userData);
			} else {
				console.log(`Time until next record update and backup: ${this.userData.msBetweenRecordUpdates - timeDifference}ms`);
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
	* Sends out an invite to a user from a selected list of users,
	* if the server has been nuked/deleted.
	*/
	async sendInviteIfTimeHasPassedAndGuildIsActive(client: Discord.Client): Promise<void> {
		try {
			if (this.userData.activeInviteGuilds.length === 0) {
				return new Promise((resolve, reject) => {
					resolve();
				});
			}

			const currentTime = new Date().getTime();

			const timeDifference = currentTime - this.userData.timeOfLastInvite;

			if (timeDifference < this.userData.msBetweenInvites) {
				const timeRemaining = this.userData.msBetweenInvites - timeDifference;
				console.log(`Time until next invite can be sent out: ${timeRemaining}ms`);
				return new Promise((resolve, reject) => {
					resolve();
				});
			}

			for (let x = 0; x < this.userData.activeInviteGuilds.length; x += 1) {
				let fileKey: string = String();

				fileKey = `${this.userData.activeInviteGuilds[x]} + Record`;

				let currentFileObject: ServerRecord;
				try {
					currentFileObject = await this.dataBase.get(fileKey) as ServerRecord;
				} catch (error) {
					if (error.type === 'NotFoundError') {
						this.userData.activeInviteGuilds.splice(x, 1);
						console.log("Splicing the 'active invite guild'!");
						return new Promise((resolve, reject) => {
							resolve();
						});
					}
					return new Promise((resolve, reject) => {
						reject(error);
					});
				}

				const { userID } = currentFileObject.userRecords[0] as UserRecord;
				const guildName = currentFileObject.serverName;
				const inviteLink = currentFileObject.replacementServerInvite;
				const inviteString = `Hello, it is my understanding that you were a member of ${guildName
				}.\nIf you would like to continue along with us, then please go ahead and join this new server! Enjoy!\n${inviteLink}`;

				const currentUser = client.users.resolve(userID);
				let wereTheyAvailable = false;

				try {
					const dmChannel = await (currentUser as Discord.User).createDM();
					await dmChannel.send(inviteString);
					wereTheyAvailable = true;
				} catch (error) {
					console.log(`Sorry, but the user ${(currentFileObject.userRecords[0] as UserRecord).lastKnownUsername} could not be found!`);
				}

				if (wereTheyAvailable === true) {
					const savedUser = new UserRecord();
					savedUser.userID = (currentFileObject.userRecords[0] as UserRecord).userID;
					savedUser.lastKnownUserTag = (currentFileObject.userRecords[0] as UserRecord).lastKnownUserTag;
					savedUser.lastKnownUsername = (currentFileObject.userRecords[0] as UserRecord).lastKnownUsername;
					currentFileObject.userRecords.splice(0, 1);

					if (currentFileObject.userRecords.length === 0) {
						this.dataBase.del(fileKey);
					} else {
						await this.dataBase.put(fileKey, currentFileObject);
					}

					const availableFileKey = `${fileKey} + Available`;

					let availableFileString: string = String();
					try {
						const availableFileObject = await this.dataBase.get(availableFileKey) as ServerRecord;

						availableFileObject.userRecords.push(savedUser);

						availableFileString = JSON.stringify(availableFileObject);

						await this.dataBase.put(availableFileKey, availableFileString);
					} catch (error) {
						const serverRecord = new ServerRecord();
						serverRecord.replacementServerInvite = currentFileObject.replacementServerInvite;
						serverRecord.serverID = currentFileObject.serverID;
						serverRecord.serverName = currentFileObject.serverName;
						serverRecord.userRecords.push(savedUser);

						availableFileString = JSON.stringify(serverRecord);

						await this.dataBase.put(availableFileKey, availableFileString);
						return new Promise((resolve, reject) => {
							resolve();
						});
					}
				} else {
					const deletedUser = new UserRecord();
					deletedUser.userID = (currentFileObject.userRecords[0]as UserRecord).userID;
					deletedUser.lastKnownUserTag = (currentFileObject.userRecords[0] as UserRecord).lastKnownUserTag;
					deletedUser.lastKnownUsername = (currentFileObject.userRecords[0]as UserRecord).lastKnownUsername;
					currentFileObject.userRecords.splice(0, 1);

					if (currentFileObject.userRecords.length === 0) {
						this.dataBase.del(fileKey);
					} else {
						await this.dataBase.put(fileKey, currentFileObject);
					}

					const notAvailableFileKey = `${fileKey} +  NotAvailable`;

					let notAvailableFileString: string = String();
					try {
						const notAvailableFileObject = await this.dataBase.get(notAvailableFileKey);

						notAvailableFileObject.userRecords.push(deletedUser);

						await this.dataBase.put(notAvailableFileKey, notAvailableFileObject);
					} catch (error) {
						const serverRecord = new ServerRecord();
						serverRecord.replacementServerInvite = currentFileObject.replacementServerInvite;
						serverRecord.serverID = currentFileObject.serverID;
						serverRecord.serverName = currentFileObject.serverName;
						serverRecord.userRecords.push(deletedUser);

						this.dataBase.put(notAvailableFileKey, serverRecord);
						return new Promise((resolve, reject) => {
							resolve();
						});
					}
				}
				this.userData.timeOfLastInvite = new Date().getTime();
				await this.updateUserDataInDB(this.userData);
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
	* Purges all of the selected messages within the given channels,
	* of each of the instance's guilds.
	*/
	private async deleteMessagesIfTimeHasPassed(client: Discord.Client, guild: GuildData, channelIndex: number): Promise<void> {
		try {
			const { numberOfMessagesToSave } = guild.deletionChannels[channelIndex] as DeletionChannel;
			const { channelID } = guild.deletionChannels[channelIndex] as DeletionChannel;
			const newGuild = guild;
			let currentChannel = new Discord.TextChannel(client.guilds
				.resolve(newGuild.guildID) as Discord.Guild, {});
			try {
				currentChannel = await client.channels.fetch(channelID) as Discord.TextChannel;
			} catch (error) {
				newGuild.deletionChannels.splice(channelIndex, 1);
				console.log('Removing an "unknown channel" from list of deletion channels!');
				await this.updateGuildDataInDB(newGuild);
				return new Promise(resolve => {
					resolve();
				});
			}

			const currentTime = new Date().getTime();
			const timeDifference = currentTime -(newGuild.deletionChannels[channelIndex] as DeletionChannel).timeOfLastPurge;
			if ((newGuild.deletionChannels[channelIndex] as DeletionChannel).currentlyBeingDeleted === true) {
				console.log(`Nope! Still being deleted! Channel: ${currentChannel.name}`);
				return new Promise(resolve => {
					resolve();
				});
			}
			if (timeDifference < this.userData.msBetweenMessageDeletion) {
				console.log(`Nope! Still ${this.userData.msBetweenMessageDeletion - timeDifference}ms left until we can purge! Channel: ${currentChannel.name}`);
				return new Promise(resolve => {
					resolve();
				});
			}

			console.log(`Checking for messages to delete in channel: ${currentChannel.name}`);

			(newGuild.deletionChannels[channelIndex] as DeletionChannel).currentlyBeingDeleted = true;

			if (numberOfMessagesToSave > 0) {
				let startingMessage;
				for (let x = (Math.trunc(numberOfMessagesToSave / 100)); x >= 0; x -= 1) {
					let currentMessageLimit = 0;
					if (x > 0) {
						currentMessageLimit = 100;
						if (x === (Math.trunc(numberOfMessagesToSave / 100))) {
							const arrayOfMessagesToSave = (await currentChannel.messages
								.fetch({ limit: currentMessageLimit })).array();
							if (arrayOfMessagesToSave.length === 0) {
								break;
							}
							startingMessage = arrayOfMessagesToSave[arrayOfMessagesToSave.length - 1];
						} else {
							const arrayOfMessagesToSave = (await currentChannel.messages
								.fetch({ limit: currentMessageLimit, before: (startingMessage as Discord.Message).id })).array() as Discord.Message[];
							if (arrayOfMessagesToSave.length === 0) {
								break;
							}
							startingMessage = arrayOfMessagesToSave[arrayOfMessagesToSave.length - 1];
						}
					} else {
						currentMessageLimit = (numberOfMessagesToSave % 100) + 1;
						if (x === (Math.trunc(numberOfMessagesToSave / 100))) {
							const arrayOfMessagesToSave = (await currentChannel.messages
								.fetch({ limit: currentMessageLimit })).array();
							arrayOfMessagesToSave.splice(arrayOfMessagesToSave.length - 1, 1);
							if (arrayOfMessagesToSave.length === 0) {
								break;
							}
							startingMessage = arrayOfMessagesToSave[arrayOfMessagesToSave.length - 1];
						} else {
							const arrayOfMessagesToSave = (await currentChannel.messages
								.fetch({ limit: currentMessageLimit })).array();
							arrayOfMessagesToSave.splice(arrayOfMessagesToSave.length - 1, 1);
							if (arrayOfMessagesToSave.length === 0) {
								break;
							}
							startingMessage = arrayOfMessagesToSave[arrayOfMessagesToSave.length - 1];
						}
					}
				}
				let x = 1;
				const arrayOfMessageArrays = [];
				while (x !== 0) {
					const arrayOfMessages = (await currentChannel.messages
						.fetch({ limit: 100, before: (startingMessage as Discord.Message).id })).array() as Discord.Message[];
					x = arrayOfMessages.length;
					if (arrayOfMessages !== undefined && startingMessage !== undefined && x > 0) {
						startingMessage = arrayOfMessages[arrayOfMessages.length - 1];
						arrayOfMessageArrays.push(arrayOfMessages);
					} else {
						break;
					}
				}
				let totalMessageCount = 0;
				for (let y = 0; y < arrayOfMessageArrays.length; y += 1) {
					for (let z = 0; z < (arrayOfMessageArrays[y] as Discord.Message[]).length; z += 1) {
						if (((arrayOfMessageArrays[y] as Discord.Message[])[z] as Discord.Message).pinned === true
			|| ((arrayOfMessageArrays[y] as Discord.Message[])[z] as Discord.Message).deleted === true) {
							(arrayOfMessageArrays[y] as Discord.Message[]).splice(z, 1);
						} else {
							totalMessageCount += 1;
						}
					}
				}
				console.log(`Total of ${totalMessageCount} in channel: ${currentChannel.name}`);
				if (arrayOfMessageArrays[0] === undefined || arrayOfMessageArrays[0].length === 0) {
					(newGuild.deletionChannels[channelIndex] as DeletionChannel).currentlyBeingDeleted = false;
					return new Promise(resolve => {
						resolve();
					});
				}
				for (let y = arrayOfMessageArrays.length - 1; y >= 0; y -= 1) {
					for (let z = (arrayOfMessageArrays[y] as Discord.Message[]).length - 1; z >= 0; z -= 1) {
						if ((newGuild.deletionChannels[channelIndex] as DeletionChannel).currentlyBeingDeleted === false) {
							return new Promise(resolve => {
								resolve();
							});
						}
						if (!((arrayOfMessageArrays[y] as Discord.Message[])[z] as Discord.Message).pinned) {
							await ((arrayOfMessageArrays[y] as Discord.Message[])[z] as Discord.Message).delete();
							console.log(`Deleting Message Number: ${totalMessageCount - (y * 100 + z)} of ${totalMessageCount} in channel ${currentChannel.name}.`);
						}
					}
				}
			} else {
				let x = 1;
				let y = 0;
				const arrayOfMessageArrays = [];
				let startingMessage;
				while (x !== 0) {
					let arrayOfMessages;
					if (y === 0) {
						arrayOfMessages = (await currentChannel.messages.fetch({ limit: 100 })).array();
					} else {
						arrayOfMessages = (await currentChannel.messages
							.fetch({ limit: 100, })).array();
					}

					x = arrayOfMessages.length;
					if (arrayOfMessages !== undefined && x > 0) {
						startingMessage = arrayOfMessages[arrayOfMessages.length - 1];
						arrayOfMessageArrays.push(arrayOfMessages);
						y += 1;
					} else {
						break;
					}
				}
				let totalMessageCount = 0;
				for (let w = 0; w < arrayOfMessageArrays.length; w += 1) {
					for (let z = 0; z < (arrayOfMessageArrays[w] as Discord.Message[]).length; z += 1) {
						if (((arrayOfMessageArrays[w] as Discord.Message[])[z] as Discord.Message).pinned === true
			|| ((arrayOfMessageArrays[w] as Discord.Message[])[z] as Discord.Message).deleted === true) {
							(arrayOfMessageArrays[w] as Discord.Message[]).splice(z, 1);
						} else {
							totalMessageCount += 1;
						}
					}
				}
				console.log(`Total of ${totalMessageCount} in channel: ${currentChannel.name}`);
				if (arrayOfMessageArrays[0] === undefined || arrayOfMessageArrays[0].length === 0) {
					(newGuild.deletionChannels[channelIndex] as DeletionChannel).currentlyBeingDeleted = false;
					return new Promise(resolve => {
						resolve();
					});
				}
				for (let w = arrayOfMessageArrays.length - 1; w >= 0; w -= 1) {
					for (let z = (arrayOfMessageArrays[w] as Discord.Message[]).length - 1; z >= 0; z -= 1) {
						if ((newGuild.deletionChannels[channelIndex] as DeletionChannel).currentlyBeingDeleted === false) {
							return new Promise(resolve => {
								resolve();
							});
						}
						if (!((arrayOfMessageArrays[w] as Discord.Message[])[z] as Discord.Message).pinned) {
							await ((arrayOfMessageArrays[w] as Discord.Message[])[z] as Discord.Message).delete();
							console.log(`Deleting Message Number: ${totalMessageCount - (w * 100 + z)} of ${totalMessageCount} in channel ${currentChannel.name}.`);
						}
					}
				}
			}
			(newGuild.deletionChannels[channelIndex] as DeletionChannel).timeOfLastPurge = new Date().getTime();
			(newGuild.deletionChannels[channelIndex] as DeletionChannel).currentlyBeingDeleted = false;
			await this.updateGuildDataInDB(newGuild);
			return new Promise(resolve => {
				resolve();
			});
		} catch (error) {
			return new Promise((resolve, reject) => {
				reject(error);
			});
		}
	}

	/**
	* Purges the actively-being-purged text channels, if enough time has passed.
	*/
	async purgeMessageChannelsIfTimeHasPassed(client: Discord.Client): Promise<void> {
		try {
			this.guildsData.forEach(async guild => {
				if (guild.deletionChannels.length > 0) {
					for (let y = 0; y < guild.deletionChannels.length; y += 1) {
						this.deleteMessagesIfTimeHasPassed(client, guild, y).catch(error => {
							console.log(error);
						});
					}
				}
			});
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
	* Sends out the timed messages within each server, if enough time has passed.
	*/
	async sendTimedMessagesIfTimeHasPassed(client: Discord.Client): Promise<void> {
		try {
			this.guildsData.forEach(async guildData => {
				for (let y = 0; y < guildData.timedMessages.length; y += 1) {
					const newGuildData = guildData;
					const currentTime = new Date().getTime();
					if ((currentTime - (newGuildData.timedMessages[y] as TimedMessage).timeOfLastSend)
						> (newGuildData.timedMessages[y] as TimedMessage).msBetweenSends) {
						const guild = client.guilds.resolve(newGuildData.guildID);
						let textChannel = new Discord.TextChannel(guild as Discord.Guild, {});
						textChannel = await client.channels.fetch((newGuildData.timedMessages[y] as TimedMessage).textChannelID) as Discord.TextChannel;
						await textChannel.send((newGuildData.timedMessages[y] as TimedMessage).messageContent);
						(newGuildData.timedMessages[y] as TimedMessage).timeOfLastSend = new Date().getTime();
						await this.updateGuildDataInDB(newGuildData);
						break;
					} else {
						const timeDifference = currentTime - (newGuildData.timedMessages[y] as TimedMessage).timeOfLastSend;
						const timeRemaining = (newGuildData.timedMessages[y] as TimedMessage).msBetweenSends - timeDifference;
						console.log(`${(newGuildData.timedMessages[y] as TimedMessage).name} has ${timeRemaining}ms left until it can be sent!`);
					}
				}
			});
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
	* Caches messages for each of the guilds that have an active "verification" system.
	*/
	private async cacheMessagesForVerification(client: Discord.Client): Promise<void> {
		this.guildsData.forEach(async guildData => {
			const newGuildData = guildData;
			try {
				if (newGuildData.verificationSystem.channelID != '') {
					const currentGuild = await client.guilds.fetch((newGuildData.guildID as string));
					const currentChannel = currentGuild.channels
						.resolve(newGuildData.verificationSystem.channelID) as Discord.TextChannel;
					if (currentChannel === null){
						console.log('null Channel! Purging from the values! For Guild: ' + newGuildData.guildName);
						newGuildData.verificationSystem.channelID = '';
						newGuildData.verificationSystem.messageID = '';
						newGuildData.verificationSystem.emoji = '';
						await this.updateGuildDataInDB(newGuildData);
						return new Promise((resolve, reject) => {
							resolve();
						})
					}
					const msgManager = new Discord.MessageManager(currentChannel);
					const oldVerificationMessage = await msgManager
						.fetch(newGuildData.verificationSystem.messageID);
					const newMsgEmbed = oldVerificationMessage.embeds[0];
					const newVerificationMessage = await currentChannel.send(newMsgEmbed as Discord.MessageEmbed);
					newGuildData.verificationSystem.messageID = newVerificationMessage.id;
					await this.updateGuildDataInDB(newGuildData);
					await newVerificationMessage
						.react((oldVerificationMessage.reactions.cache.first() as Discord.MessageReaction).emoji.name);
					await oldVerificationMessage.delete();
					return new Promise((resolve, reject) => {
						resolve();
					});
				}
				return this.userData.userID;
			} catch (error) {
				console.log('Looks like the channel or the message no longer exists! Purging the verification system values!');
				newGuildData.verificationSystem.channelID = '';
				newGuildData.verificationSystem.messageID = '';
				newGuildData.verificationSystem.emoji = '';
				await this.updateGuildDataInDB(newGuildData);
				return new Promise((resolve, reject) => {
					reject(error);
				});
			}
		});
	}
}

