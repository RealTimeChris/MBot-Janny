// Index.ts - The main entry point for my Discord Bot!
// Jan 28, 2021
// Chris M.s
// https://github.com/RealTimeChris

'use strict';

import Discord = require('discord.js');
import FoundationClasses from './FoundationClasses';
import DiscordUser from './DiscordUser';
import GuildData from './GuildData';
import botCommands from './CommandIndex';
import HelperFunctions from './HelperFunctions';
import config = require('../ToCompile/config.json');

const discordUser = new DiscordUser();
const client = new Discord.Client() as any;

client.ws.on('INTERACTION_CREATE', async (interaction: any) => {
	const {channel_id} = interaction;
	const channel = await client.channels.fetch(channel_id);
	let id_full, guild_id_full, options_full, name_full;
	const commandData = new FoundationClasses.CommandData();
	if (await channel.type === 'dm'){
		let {user:{id}, guild_id, data:{options, name}} = interaction;
		id_full = id;
		guild_id_full = guild_id;
		options_full = options;
		name_full = name;
		await commandData.initialize(client, channel_id, channel.type, interaction, id_full);
	}
	else {
		let {member:{user:{id}}, guild_id, data:{options, name}} = interaction;
		id_full = id;
		guild_id_full = guild_id;
		options_full = options;
		name_full = name;
		await commandData.initialize(client, channel_id, channel.type, interaction, id_full, guild_id_full);
	}
	const nameSolid = name_full;
	if (name_full === 'botinfo'){
		const name = 'janny';
		commandData.args[0] = name;
	}
	if (name_full === "deletedbentry"){
		const {value:value1} = options_full[0];
		commandData.args[0] = 'janny';
		commandData.args[1] = value1;
	}
	if (name_full === "displayguildsdata"){
		const name = 'janny';
		commandData.args[0] = name;
	}
	if (name_full === 'ghost'){
		let userID;
		let reason;
		const name_full = options_full[0].name;
		if (name_full === 'view'){
			const viewOrNot = options_full[0].options[0].value;
			commandData.args[1] = '';
			commandData.args[2] = '';
			if (!viewOrNot){
				return;
			}
		}
		else if(name_full === 'add'){
			userID = options_full[0].options[0].value;
			reason = options_full[0].options[1].value;
			commandData.args[0] = 'add';
			commandData.args[1] = reason;
			commandData.args[2] = userID;
		}
		else if (name_full === 'remove'){
			userID = options_full[0].options[0].value;
			commandData.args[0] = 'remove';
			commandData.args[1] = userID;
		}
	}
	if (name_full === 'help'){
		if (options_full[0].options !==  undefined){
			const {value} = options_full[0].options[0];
			commandData.args[0] = value;
		}
	}
	if (name_full === 'jannyoptinos'){
		
	}
	if (name_full === 'listdbguilds'){
		commandData.args[0] = 'janny';
	}
	if (name_full === "managelogs"){
		name_full = options_full[0].name;
		if (name_full === 'display'){

		}
		else if (name_full = "group1" || "group2"){
			const logname = options_full[0].options[0].value;
			let enableOrDisable;
			if (options_full[0].options[1].value === true){
				enableOrDisable = 'enable';
			}
			else {
				enableOrDisable = 'disable';
			}
			commandData.args[1] = logname;
			commandData.args[0] = enableOrDisable;
		}
	}
	if (name_full === 'ping'){
		
	}
	if (name_full === 'purge'){
		const msgCountToPurge = options_full[0].value;
		commandData.args[0] = msgCountToPurge;
	}
	if (name_full === 'serverinfo'){
		if (options_full !== undefined){
			const {value:value1} = options_full[0];
			commandData.args[0] = value1;
		}		
	}
	if (name_full === 'setbordercolor'){
		commandData.args[0] = 'janny';
		const redChannelValue = options_full[0].value;
		const greenChannelValue = options_full[1].value;
		const blueChannelValue = options_full[2].value;
		commandData.args[1] = redChannelValue.toString();
		commandData.args[2] = greenChannelValue.toString();
		commandData.args[3] = blueChannelValue.toString();
	}
	if (name_full === 'setdefaultrole'){
		const name_full = options_full[0].name;
		if (name_full === 'add'){
			let role = options_full[0].options[0].value;
			commandData.args[0] = 'add';
			commandData.args[1] = role;
		}
		else if (name_full === 'remove'){
			let role = options_full[0].options[0].value;
			commandData.args[0] = 'remove';
			commandData.args[1] = role;
		}
		else{

		}
	}
	if (name_full === 'setdeletionstatus'){
		let quantity;
		if (options_full[0].options !== undefined){
			quantity = options_full[0].options[0].value;
		}
		const name_full = options_full[0].name;
		if (name_full == 'view'){

		}
		else if (name_full === 'enable'){
			commandData.args[0] = 'enable';
			commandData.args[1] = quantity;
		}
		else if (name_full === 'disable'){
			commandData.args[0] = 'disable';
		}
	}
	if (name_full === 'setreplacementinvite'){
		const inviteLink = options_full[0].value
		commandData.args[0] = inviteLink;
	}
	if (name_full === 'setverificationsystem'){
		name_full = options_full[0].name;
		if (name_full === "display"){

		}
		else if (name_full === 'disable'){
			commandData.args[0] = 'disable';
		}
		else if (name_full === 'enable'){
			const message = options_full[0].options[0].value;
			const emoji = options_full[0].options[1].value;
			commandData.args[0] = 'enable';
			commandData.args[1] = message;
			commandData.args[2] = emoji;
		}
	}
	if (name_full === 'slashcommands'){
		
	}
	if (name_full === 'test'){

	}
	if (name_full === 'timedmessages'){
		name_full = options_full[0].name;
		if (name_full === 'display'){

		}
		else if (name_full === 'disable'){
			const msgName = options_full[0].options[0].value;
			commandData.args[0] = 'remove';
			commandData.args[1] = msgName;
		}
		else if (name_full === 'enable'){
			const msgName = options_full[0].options[0].value;
			const msgContents = options_full[0].options[1].value;
			const msgInterval = options_full[0].options[2].value;
			commandData.args[0] = 'add';
			commandData.args[1] = msgName;
			commandData.args[2] = msgInterval;
			commandData.args[3] = msgContents;
		}
	}
	if (name_full === 'trackuser'){
		name_full = options_full[0].name;
		if (name_full === "display"){

		}
		else if (name_full === 'enable'){
			const userID = options_full[0].options[0].value;
			commandData.args[0] = 'add';
			commandData.args[1] = userID;
		}
		else if (name_full === 'disable'){
			const userID = options_full[0].options[0].value;
			commandData.args[0] = 'remove';
			commandData.args[1] = userID;
		}
	}
	if (name_full === 'userinfo'){
		const user = options_full[0].value;
		commandData.args[0] = user;
	}
	await client.api.interactions(interaction.id, interaction.token).callback.post({
		data:{
			type: 5
		}
	});
	if (commandData.guildMember instanceof Discord.GuildMember){
		console.log(`Command: '${nameSolid}' entered by user: ${commandData.guildMember.user.username}`);
	}
	else if (commandData.guildMember instanceof Discord.User){
		console.log(`Command: '${nameSolid}' entered by user: ${commandData.guildMember.username}`);
	}
	const returnData = await botCommands.get(nameSolid)?.function(commandData, discordUser) as FoundationClasses.CommandReturnData;
	console.log(`Completed Command: ${returnData.commandName}`);
});

client.once('ready', async () => {
	try {
		await discordUser.initializeInstance(client);
		await client.user.setPresence({ status: 'online', activity: { name: '!help for commands!', type: 'STREAMING' } });
	} catch (error) {
		console.log(error);
	}
});

client.on('message', async (msg: Discord.Message) => {
	if (client.users.resolve(msg.author.id) === null) {
		console.log('Non-found user! Better escape!');
		return;
	}
	if (msg.author.id === (client.user as Discord.User).id) {
		console.log('Better not track our own messages!');
		return;
	}
	 if (msg.content.startsWith(discordUser.userData.prefix)) {
		let command = '';
		let args: string[] = [];
		if (msg.content.indexOf(' =') === -1) {
			command = msg.content.slice(discordUser.userData.prefix.length).split(/ +/, 3)[0]!.trim().toLowerCase();
		} else {
			command = msg.content.slice(discordUser.userData.prefix.length).substring(0, msg.content.indexOf(' =')).trim().toLowerCase();
			args = msg.content.slice(discordUser.userData.prefix.length).substring(msg.content.indexOf(' =') + 2).split(',');
			for (let x = 0; x < args.length; x += 1) {
				args[x] = args[x]!.trim();
			}
		}

		if (!botCommands.has(command)){
			return;
		}

		try{
			const commandData = new FoundationClasses.CommandData();
			if (msg.channel.type !== 'dm' && msg.member !== null){
				await commandData.initialize(client, msg.channel.id, msg.channel.type, null, msg.member.id, msg.guild!.id);
			}
			else{
				await commandData.initialize(client, msg.channel.id, msg.channel.type, null, msg.author.id);
			}
			commandData.args = args;

			if (msg.deletable){
				await msg.delete();
			}

			try {	
				console.log(`Command: '${command}' entered by user: ${msg.author.username}`);
				const cmdReturnData = await botCommands.get(command)?.function(commandData, discordUser) as FoundationClasses.CommandReturnData;
				console.log(`Completed Command: ${cmdReturnData.commandName}`);
			} catch (error) {
				console.log(error);
				const newMsg = await msg.reply('There was an error trying to process that message!');
				newMsg.delete({timeout: 20000});
			}
			await HelperFunctions.sendInviteIfTimeHasPassedAndGuildIsActive(client, discordUser);
			await HelperFunctions.updateAndSaveDiscordRecordIfTimeHasPassed(client, discordUser);
			await discordUser.saveCacheIfTimeHasPassed(client);
			await HelperFunctions.sendTimedMessagesIfTimeHasPassed(client, discordUser);
			HelperFunctions.purgeMessageChannelsIfTimeHasPassed(client, discordUser).catch((error: Error) => {
				console.log(error);
			});
			return;
		}
		catch(error){
			console.log(error);
		}
	} else if (msg.author.id !== client.user.id) {
		const command = 'message';
		if (!botCommands.has(command)) {
			return;
		}
		try{
			try {
				const commandData = new FoundationClasses.CommandData();
				if (msg.channel.type !== 'dm' && msg.member !== null){
					await commandData.initialize(client, msg.channel.id, msg.channel.type, null, msg.member.id, msg.guild!.id);
				}
				else {
					await commandData.initialize(client, msg.channel.id, msg.channel.type, null, msg.author.id);
				}

				console.log(`Standard message entered: ${msg.author.username}`);
				const cmdName = await botCommands.get(command)?.function(msg, commandData);
				console.log(`Completed Command: ${cmdName}`);
			} catch (error) {
				console.log(error);
				const newMsg = await msg.reply('There was an error trying to process that message!');
				newMsg.delete({timeout: 20000});
			}
			await HelperFunctions.sendInviteIfTimeHasPassedAndGuildIsActive(client, discordUser);
			await HelperFunctions.updateAndSaveDiscordRecordIfTimeHasPassed(client, discordUser);
			await discordUser.saveCacheIfTimeHasPassed(client);
			await HelperFunctions.sendTimedMessagesIfTimeHasPassed(client, discordUser);
			HelperFunctions.purgeMessageChannelsIfTimeHasPassed(client, discordUser).catch((error: Error) => {
				console.log(error);
			});
			return;
		}
		catch(error){
			console.log(error);
		}
	}
});

client.on('messageReactionAdd', async (messageReaction: Discord.MessageReaction, user: Discord.User) => {
	const command = 'onmessagereactionadd';

	if (!botCommands.has(command)) {
		return;
	}
	try {
		console.log(`Command: '${command}' entered by system.`);
		const cmdName = await (botCommands.get(command)?.function(messageReaction, client, user, discordUser));
		console.log(`Completed Command: ${cmdName}`);
		return;
	} catch (error) {
		console.log(error);
	}
});

client.on('guildDelete', async (guild: Discord.Guild) => {
	const command = 'onguilddelete';

	if (!botCommands.has(command)) {
		return;
	}
	try {
		console.log(`Command: '${command}' entered by system.`);
		const cmdName = await botCommands.get(command)?.function(guild, discordUser);
		console.log(`Completed Command: ${cmdName}`);
		return;
	} catch (error) {
		console.log(error);
	}
});

client.on('guildBanAdd', async (guild: Discord.Guild, user: Discord.User) => {
	const guildData = new GuildData({dataBase: discordUser.dataBase, id: guild.id, name: guild.name, memberCount: guild.memberCount});
	await guildData.getFromDataBase();
	for (let x = 0; x < guildData.logs.length; x += 1) {
		if (guildData.logs[x]!.nameSmall === 'guildbanadd') {
			if (guildData.logs[x]!.enabled === false) {
				return;
			}
		}
	}
	const command = 'onguildbanadd';

	if (!botCommands.has(command)) {
		return;
	}
	try {
		console.log(`Command: '${command}' entered by system.`);
		const cmdName = await botCommands.get(command)?.function(client, guild, user, discordUser);
		console.log(`Completed Command: ${cmdName}`);
		return;
	} catch (error) {
		console.log(error);
	}
});

client.on('guildBanRemove', async (guild: Discord.Guild, user: Discord.User) => {
	const guildData = new GuildData({dataBase: discordUser.dataBase, id: guild.id, name: guild.name, memberCount: guild.memberCount});
	await guildData.getFromDataBase();
	for (let x = 0; x < guildData.logs.length; x += 1) {
		if (guildData.logs[x]!.nameSmall === 'guildbanremove') {
			if (guildData.logs[x]!.enabled === false) {
				return;
			}
		}
	}
	const command = 'onguildbanremove';

	if (!botCommands.has(command)) {
		return;
	}
	try {
		console.log(`Command: '${command}' entered by system.`);
		const cmdName = await botCommands.get(command)?.function(client, guild, user, discordUser);
		console.log(`Completed Command: ${cmdName}`);
		return;
	} catch (error) {
		console.log(error);
	}
});

client.on('guildMemberAdd', async (member: Discord.GuildMember) => {
	const guildData = new GuildData({dataBase: discordUser.dataBase, id: member.guild.id, name: member.guild.name, memberCount: member.guild.memberCount});
	await guildData.getFromDataBase();
	for (let x = 0; x < guildData.logs.length; x += 1) {
		if (guildData.logs[x]!.nameSmall === 'guildmemberadd') {
			if (guildData.logs[x]!.enabled === false) {
				return;
			}
		}
	}
	const command = 'onguildmemberadd';

	if (!botCommands.has(command)) {
		return;
	}
	try {
		console.log(`Command: '${command}' entered by system.`);
		const cmdName = await botCommands.get(command)?.function(client, member, discordUser);
		console.log(`Completed Command: ${cmdName}`);
		return;
	} catch (error) {
		console.log(error);
	}
});

client.on('guildMemberRemove', async (member: Discord.GuildMember) => {
	const guildData = new GuildData({dataBase: discordUser.dataBase, id: member.guild.id, name: member.guild.name, memberCount: member.guild.memberCount});
	await guildData.getFromDataBase();
	for (let x = 0; x < guildData.logs.length; x += 1) {
		if (guildData.logs[x]!.nameSmall === 'guildmemberremove') {
			if (guildData.logs[x]!.enabled === false) {
				return;
			}
		}
	}
	const command = 'onguildmemberremove';
	if (!botCommands.has(command)) {
		return;
	}
	try {
		console.log(`Command: '${command}' entered by system.`);
		const cmdName = await botCommands.get(command)?.function(client, member, discordUser);
		console.log(`Completed Command: ${cmdName}`);
		return;
	} catch (error) {
		console.log(error);
	}
});

client.on('guildMemberUpdate', async (oldGuildMember: Discord.GuildMember, newGuildMember: Discord.GuildMember) => {
	if (oldGuildMember.displayName !== newGuildMember.displayName) {
		const guildData = new GuildData({dataBase: discordUser.dataBase, id: oldGuildMember.guild.id, name: oldGuildMember.guild.name, memberCount: oldGuildMember.guild.memberCount});
		await guildData.getFromDataBase();
		for (let x = 0; x < guildData.logs.length; x += 1) {
			if (guildData.logs[x]!.nameSmall === 'guildmemberupdate') {
				if (guildData.logs[x]!.enabled === false) {
					return;
				}
			}
		}
		const command = 'ondisplaynamechange';
		if (!botCommands.has(command)) {
			return;
		}
		try {
			console.log(`Command: '${command}' entered by system.`);
			const cmdName = await (botCommands.get(command)?.function(client, oldGuildMember,
				newGuildMember, discordUser));
			console.log(`Completed Command: ${cmdName}`);
			return;
		} catch (error) {
			return;
		}
	}
	if (oldGuildMember.nickname !== newGuildMember.nickname) {
		const guildData = new GuildData({dataBase: discordUser.dataBase, id: oldGuildMember.guild.id, name: oldGuildMember.guild.name, memberCount: oldGuildMember.guild.memberCount});
		await guildData.getFromDataBase();
		for (let x = 0; x < guildData.logs.length; x += 1) {
			if (guildData.logs[x]!.nameSmall === 'nicknamechange') {
				if (guildData.logs[x]!.enabled === false) {
					return;
				}
			}
		}
		const command = 'onnicknamechange';
		if (!botCommands.has(command)) {
			return;
		}
		try {
			console.log(`Command: '${command}' entered by system.`);
			const cmdName = await (botCommands.get(command)?.function(client, oldGuildMember,
				newGuildMember, discordUser));
			console.log(`Completed Command: ${cmdName}`);
			return;
		} catch (error) {
			return;
		}
	}
	const oldGuildMemberRoleManager = new Discord.GuildMemberRoleManager(oldGuildMember);
	const newGuildMemberRoleManager = new Discord.GuildMemberRoleManager(newGuildMember);

	oldGuildMemberRoleManager.cache.sort();
	newGuildMemberRoleManager.cache.sort();

	const collectionSizeDifference = oldGuildMemberRoleManager
		.cache.size - newGuildMemberRoleManager.cache.size;

	if (collectionSizeDifference !== 0) {
		const guildData = new GuildData({dataBase: discordUser.dataBase, id: newGuildMember.guild.id, name: newGuildMember.guild.name, memberCount: newGuildMember.guild.memberCount});
		await guildData.getFromDataBase();
		console.log(guildData.logs);
		for (let x = 0; x < guildData.logs.length; x += 1) {
			if (guildData.logs[x]!.nameSmall === 'roleaddorremove') {
				if (guildData.logs[x]!.enabled === false) {
					return;
				}
			}
		}
		const command = 'onroleaddorremove';

		if (!botCommands.has(command)) {
			return;
		}
		try {
			console.log(`Command: '${command}' entered by system.`);
			const cmdName = await (botCommands.get(command)?.function(client, oldGuildMemberRoleManager, newGuildMemberRoleManager,
					newGuildMember, collectionSizeDifference, discordUser));
			console.log(`Completed Command: ${cmdName}`);
			return;
		} catch (error) {
			console.log(error);
		}
	}
});

client.on('inviteCreate', async (invite: Discord.Invite) => {
	const guildData = new GuildData({dataBase: discordUser.dataBase, id: invite.guild!.id, name: invite.guild!.name, memberCount: invite.guild!.memberCount});
	await guildData.getFromDataBase();
	for (let x = 0; x < guildData.logs.length; x += 1) {
		if (guildData.logs[x]!.nameSmall === 'invitecreate') {
			if (guildData.logs[x]!.enabled === false) {
				return;
			}
		}
	}
	const command = 'oninvitecreate';

	if (!botCommands.has(command)) {
		return;
	}
	try {
		console.log(`Command: '${command}' entered by system.`);
		const cmdName = await botCommands.get(command)?.function(client, invite, discordUser);
		console.log(`Completed Command: ${cmdName}`);
		return;
	} catch (error) {
		console.log(error);
	}
});

client.on('messageDelete', async (message: Discord.Message) => {
	if (message.channel.type !== 'dm'){
		const guildData = new GuildData({dataBase: discordUser.dataBase, id: message.guild!.id, name: message.guild!.name, memberCount: message.guild!.memberCount});
		await guildData.getFromDataBase();
		for (let x = 0; x < guildData.logs.length; x += 1) {
			if (guildData.logs[x]!.nameSmall === 'messagedelete') {
				if (guildData.logs[x]!.enabled === false) {
					return;
				}
			}
		}
		const command = 'onmessagedelete';
	
		if (!botCommands.has(command)) {
			return;
		}
		try {
			console.log(`Command: '${command}' entered by system.`);
			const cmdName = await botCommands.get(command)?.function(client, message, discordUser);
			console.log(`Completed Command: ${cmdName}`);
			return;
		} catch (error) {
			console.log(error);
		}
	}
});

client.on('messageDeleteBulk', async (collection: Discord.Collection<string, Discord.Message>) => {
	const guildData = new GuildData({dataBase: discordUser.dataBase, id: collection.first()!.guild!.id, name: collection.first()!.guild!.name, memberCount: collection.first()!.guild!.memberCount});
	await guildData.getFromDataBase();
	for (let x = 0; x < guildData.logs.length; x += 1) {
		if (guildData.logs[x]!.nameSmall === 'messagedeletebulk') {
			if (guildData.logs[x]!.enabled === false) {
				return;
			}
		}
	}
	const command = 'onmessagedeletebulk';

	if (!botCommands.has(command)) {
		return;
	}
	try {
		console.log(`Command: '${command}' entered by system.`);
		const cmdName = await botCommands.get(command)?.function(client, collection, discordUser);
		console.log(`Completed Command: ${cmdName}`);
		return;
	} catch (error) {
		console.log(error);
	}
});

client.on('roleCreate', async (role: Discord.Role) => {
	const guildData = new GuildData({dataBase: discordUser.dataBase, id: role.guild.id, name: role.guild.name, memberCount: role.guild.memberCount});
	await guildData.getFromDataBase();
	for (let x = 0; x < guildData.logs.length; x += 1) {
		if (guildData.logs[x]!.nameSmall === 'rolecreate') {
			if (guildData.logs[x]!.enabled === false) {
				return;
			}
		}
	}
	const command = 'onrolecreate';

	if (!botCommands.has(command)) {
		return;
	}
	try {
		console.log(`Command: '${command}' entered by system.`);
		const cmdName = await botCommands.get(command)?.function(client, role, discordUser);
		console.log(`Completed Command: ${cmdName}`);
		return;
	} catch (error) {
		console.log(error);
	}
});

client.on('roleDelete', async (role: Discord.Role) => {
	const guildData = new GuildData({dataBase: discordUser.dataBase, id: role.guild.id, name: role.guild.name, memberCount: role.guild.memberCount});
	await guildData.getFromDataBase();
	for (let x = 0; x < guildData.logs.length; x += 1) {
		if (guildData.logs[x]!.nameSmall === 'roledelete') {
			if (guildData.logs[x]!.enabled === false) {
				return;
			}
		}
	}
	const command = 'onroledelete';

	if (!botCommands.has(command)) {
		return;
	}
	try {
		console.log(`Command: '${command}' entered by system.`);
		const cmdName = await botCommands.get(command)?.function(client, role, discordUser);
		console.log(`Completed Command: ${cmdName}`);
		return;
	} catch (error) {
		console.log(error);
	}
});

client.on('userUpdate', async (oldUser: Discord.User, newUser: Discord.User) => {
	if (oldUser.username !== newUser.username) {
		const guildArray = client.guilds.cache.array() as Discord.Guild[];
		for (let x = 0; x < guildArray.length; x += 1) {
			const guildMembersArray = (await guildArray[x]!.members.fetch()).array();
			for (let y = 0; y < guildMembersArray.length; y += 1) {
				if (guildMembersArray[y]!.id === oldUser.id) {
					const guildData = new GuildData({dataBase: discordUser.dataBase, id: guildArray[x]!.id, name: guildArray[x]!.name, memberCount: guildArray[x]!.memberCount});
					await guildData.getFromDataBase();
					for (let z = 0; z < guildData.logs.length; z += 1) {
						if (guildData.logs[z]!.nameSmall === 'userupdate') {
							if (guildData.logs[z]!.enabled === false) {
								return;
							} else {
								const command = 'onusernamechange';

								if (!botCommands.has(command)) {
									return;
								}
								try {
									console.log(`Command: '${command}' entered by system.`);
									const cmdName = await (botCommands.get(command)?.function(client, oldUser,
										newUser, guildArray[x], discordUser));
									console.log(`Completed Command: ${cmdName}`);
									break;
								} catch (error) {
									console.log(error);
									return;
								}
							}
						}
					}
				}
			}
		}
	}
});

client.login(config.botToken);
