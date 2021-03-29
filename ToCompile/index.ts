// index.js - The main entry point for my Discord Bot!
// Jan 28, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

import Discord = require('discord.js');
import DiscordStuff = require("./DiscordStuff");
import config = require('../ToCompile/config.json');
import botCommands from './commandindex';

const discordUser = new DiscordStuff.DiscordUser();
const client = new Discord.Client() as any;

client.ws.on('INTERACTION_CREATE', async (interaction: any) => {
	const {member:{user:{id}}, guild_id, data:{options, name}, channel_id} = interaction;
	const commandData = new DiscordStuff.CommandData();
	await commandData.initialize(client, guild_id, id, channel_id);
	const nameSolid = name;
	if (name === 'botinfo'){

	}
	if (name === "deletedbentry"){
		const {value:value1} = options[0].options[0];
		const {value:value2} = options[0].options[1];
		commandData.args[0] = value1;
		commandData.args[1] = value2;
		if (commandData.args[0] !== 'janny') {
			console.log('RETURNING!');
			return;
		}
	}
	if (name === "displayguildsdata"){
		
	}
	if (name === 'ghost'){
		let userID;
		let reason;
		const name = options[0].name;
		console.log(name);
		if (name === 'view'){
			commandData.args[0] = '';
			commandData.args[1] = '';
			commandData.args[2] = '';
		}
		else if(name === 'add'){
			userID = options[0].options[0].value;
			reason = options[0].options[1].value;
			commandData.args[0] = 'add';
			commandData.args[1] = reason;
			commandData.args[2] = userID;
		}
		else if (name === 'remove'){
			userID = options[0].options[0].value;
			commandData.args[0] = 'remove';
			commandData.args[1] = userID;
		}
	}
	if (name === 'help'){
		if (options[0].options !==  undefined){
			const {value} = options[0].options[0];
			commandData.args[0] = value;
		}
	}
	await client.api.interactions(interaction.id, interaction.token).callback.post({
		data:{
			type: 5
	}});
	console.log(`Command: '${nameSolid}' entered by user: ${(commandData.guildMember as Discord.GuildMember).displayName}`);
	const returnData = await botCommands.commands.get(nameSolid)?.function(commandData, discordUser) as DiscordStuff.CommandReturnData;
	console.log(`Completed Command: ${returnData.commandName}`);
	if (returnData.returnMessage === ''){
		let newMessage = await new Discord.WebhookClient(client.user.id, interaction.token).send(`<@!${commandData.guildMember?.id}> Finished with your command ${returnData.commandName}!`) as Discord.Message;
		await newMessage.delete( {timeout: 5000} );
	}
	else{
		console.log(returnData.returnMessage.length);
		if (returnData.returnMessage.length > 0){
			for (let x = 0; x < returnData.returnMessage.length; x += 1){
				await new Discord.WebhookClient(client.user.id, interaction.token).send((returnData.returnMessage as Discord.MessageEmbed[])[x] as Discord.MessageEmbed);
			}
		}
		else{
			await new Discord.WebhookClient(client.user.id, interaction.token).send(returnData.returnMessage);
		}
	}
})

client.once('ready', async () => {
	try {
		await discordUser.initializeInstance(client);
		await (client.user as Discord.ClientUser).setPresence({ status: 'online', activity: { name: '!help for commands!', type: 'STREAMING' } })
	} catch (error) {
		console.log(error);
	}
});

client.on('message', async (msg: Discord.Message) => {
	if (msg.member == null && !(msg.channel.type === 'dm')) {
		console.log('HMMM!? NULL MEMBER?! GTFO!');
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
			command = (msg.content.slice(discordUser.userData.prefix.length).split(/ +/, 3)[0] as string).trim().toLowerCase();
		} else {
			command = msg.content.slice(discordUser.userData.prefix.length).substring(0, msg.content.indexOf(' =')).trim().toLowerCase();
			args = msg.content.slice(discordUser.userData.prefix.length).substring(msg.content.indexOf(' =') + 2).split(',');
			for (let x = 0; x < args.length; x += 1) {
				args[x] = (args[x] as string).trim();
			}
		}

		if (!botCommands.commands.has(command)){
			return;
		}
		try {
			console.log((msg.guild as Discord.Guild).id);
			console.log((msg.member as Discord.GuildMember).id);
			console.log(msg.channel.id);
			const commandData = new DiscordStuff.CommandData();
			await commandData.initialize(client, (msg.guild as Discord.Guild).id, (msg.member as Discord.GuildMember).id, msg.channel.id);
			commandData.args = args;

			if (msg.deletable){
				await msg.delete();
			}

			console.log(`Command: '${command}' entered by user: ${msg.author.username}`);
			const cmdReturnData = await botCommands.commands.get(command)?.function(commandData, discordUser) as DiscordStuff.CommandReturnData;
			console.log(`Completed Command: ${cmdReturnData.commandName}`);
			await discordUser.sendInviteIfTimeHasPassedAndGuildIsActive(client);
			await discordUser.updateAndSaveDiscordRecordIfTimeHasPassed(client);
			await discordUser.saveCacheIfTimeHasPassed(client);
			await discordUser.sendTimedMessagesIfTimeHasPassed(client);
			discordUser.purgeMessageChannelsIfTimeHasPassed(client).catch((error: Error) => {
				console.log(error);
			});
			if (cmdReturnData.returnMessage !== ''){
				commandData.textChannel?.send(cmdReturnData.returnMessage);
			}
			return;
		} catch (error) {
			console.log(error);
			msg.reply('There was an error trying to execute that command!');
		}
	} else if (msg.author.id !== (client.user as Discord.User).id) {
		const command = 'message';

		if (!botCommands.commands.has(command)) {
			return;
		}
		try {
			console.log(`Standard message entered: ${msg.author.username}`);
			const cmdName = await botCommands.commands.get(command)?.function(msg);
			console.log(`Completed Command: ${cmdName}`);
			await discordUser.sendInviteIfTimeHasPassedAndGuildIsActive(client);
			await discordUser.updateAndSaveDiscordRecordIfTimeHasPassed(client);
			await discordUser.saveCacheIfTimeHasPassed(client);
			await discordUser.sendTimedMessagesIfTimeHasPassed(client);
			discordUser.purgeMessageChannelsIfTimeHasPassed(client).catch((error: Error) => {
				console.log(error);
			});
			return;
		} catch (error) {
			console.log(error);
			msg.reply('There was an error trying to process that message!');
		}
	}
});

client.on('messageReactionAdd', async (messageReaction: Discord.MessageReaction, user: Discord.User) => {
	const command = 'onmessagereactionadd';

	if (!botCommands.commands.has(command)) {
		return;
	}
	try {
		console.log(`Command: '${command}' entered by system.`);
		const cmdName = await (botCommands.commands.get(command)?.function(messageReaction, client, user, discordUser));
		console.log(`Completed Command: ${cmdName}`);
		return;
	} catch (error) {
		console.log(error);
	}
});

client.on('guildDelete', async (guild: Discord.Guild) => {
	const command = 'onguilddelete';

	if (!botCommands.commands.has(command)) {
		return;
	}
	try {
		console.log(`Command: '${command}' entered by system.`);
		const cmdName = await botCommands.commands.get(command)?.function(guild, discordUser);
		console.log(`Completed Command: ${cmdName}`);
		return;
	} catch (error) {
		console.log(error);
	}
});

client.on('guildBanAdd', async (guild: Discord.Guild, user: Discord.User) => {
	const guildData = await discordUser.getGuildDataFromDB(guild) as DiscordStuff.GuildData;
	for (let x = 0; x < guildData.logs.length; x += 1) {
		if ((guildData.logs[x] as DiscordStuff.Log).nameSmall === 'guildbanadd') {
			if ((guildData.logs[x] as DiscordStuff.Log).enabled === false) {
				return;
			}
		}
	}
	const command = 'onguildbanadd';

	if (!botCommands.commands.has(command)) {
		return;
	}
	try {
		console.log(`Command: '${command}' entered by system.`);
		const cmdName = await botCommands.commands.get(command)?.function(client, guild, user, discordUser);
		console.log(`Completed Command: ${cmdName}`);
		return;
	} catch (error) {
		console.log(error);
	}
});

client.on('guildBanRemove', async (guild: Discord.Guild, user: Discord.User) => {
	const guildData = await discordUser.getGuildDataFromDB(guild) as DiscordStuff.GuildData;
	for (let x = 0; x < guildData.logs.length; x += 1) {
		if ((guildData.logs[x] as DiscordStuff.Log).nameSmall === 'guildbanremove') {
			if ((guildData.logs[x] as DiscordStuff.Log).enabled === false) {
				return;
			}
		}
	}
	const command = 'onguildbanremove';

	if (!botCommands.commands.has(command)) {
		return;
	}
	try {
		console.log(`Command: '${command}' entered by system.`);
		const cmdName = await botCommands.commands.get(command)?.function(client, guild, user, discordUser);
		console.log(`Completed Command: ${cmdName}`);
		return;
	} catch (error) {
		console.log(error);
	}
});

client.on('guildMemberAdd', async (member: Discord.GuildMember) => {
	const guildData = await discordUser.getGuildDataFromDB(member.guild) as DiscordStuff.GuildData;
	for (let x = 0; x < guildData.logs.length; x += 1) {
		if ((guildData.logs[x] as DiscordStuff.Log).nameSmall === 'guildmemberadd') {
			if ((guildData.logs[x] as DiscordStuff.Log).enabled === false) {
				return;
			}
		}
	}
	const command = 'onguildmemberadd';

	if (!botCommands.commands.has(command)) {
		return;
	}
	try {
		console.log(`Command: '${command}' entered by system.`);
		const cmdName = await botCommands.commands.get(command)?.function(client, member, discordUser);
		console.log(`Completed Command: ${cmdName}`);
		return;
	} catch (error) {
		console.log(error);
	}
});

client.on('guildMemberRemove', async (member: Discord.GuildMember) => {
	const guildData = await discordUser.getGuildDataFromDB(member.guild) as DiscordStuff.GuildData;
	for (let x = 0; x < guildData.logs.length; x += 1) {
		if ((guildData.logs[x] as DiscordStuff.Log).nameSmall === 'guildmemberremove') {
			if ((guildData.logs[x] as DiscordStuff.Log).enabled === false) {
				return;
			}
		}
	}
	const command = 'onguildmemberremove';
	if (!botCommands.commands.has(command)) {
		return;
	}
	try {
		console.log(`Command: '${command}' entered by system.`);
		const cmdName = await botCommands.commands.get(command)?.function(client, member, discordUser);
		console.log(`Completed Command: ${cmdName}`);
		return;
	} catch (error) {
		console.log(error);
	}
});

client.on('guildMemberUpdate', async (oldGuildMember: Discord.GuildMember, newGuildMember: Discord.GuildMember) => {
	if (oldGuildMember.displayName !== newGuildMember.displayName) {
		const guildData = await discordUser.getGuildDataFromDB(oldGuildMember.guild) as DiscordStuff.GuildData;
		for (let x = 0; x < guildData.logs.length; x += 1) {
			if ((guildData.logs[x] as DiscordStuff.Log).nameSmall === 'displaynamechange') {
				if ((guildData.logs[x] as DiscordStuff.Log).enabled === false) {
					return;
				}
			}
		}
		const command = 'ondisplaynamechange';
		if (!botCommands.commands.has(command)) {
			return;
		}
		try {
			console.log(`Command: '${command}' entered by system.`);
			const cmdName = await (botCommands.commands.get(command)?.function(client, oldGuildMember,
				newGuildMember, discordUser));
			console.log(`Completed Command: ${cmdName}`);
			return;
		} catch (error) {
			return;
		}
	}
	if (oldGuildMember.nickname !== newGuildMember.nickname) {
		const guildData = await discordUser.getGuildDataFromDB(oldGuildMember.guild) as DiscordStuff.GuildData;
		for (let x = 0; x < guildData.logs.length; x += 1) {
			if ((guildData.logs[x] as DiscordStuff.Log).nameSmall === 'nicknamechange') {
				if ((guildData.logs[x] as DiscordStuff.Log).enabled === false) {
					return;
				}
			}
		}
		const command = 'onnicknamechange';
		if (!botCommands.commands.has(command)) {
			return;
		}
		try {
			console.log(`Command: '${command}' entered by system.`);
			const cmdName = await (botCommands.commands.get(command)?.function(client, oldGuildMember,
				newGuildMember, discordUser));
			console.log(`Completed Command: ${cmdName}`);
			return;
		} catch (error) {
			return;
		}
	}
	const oldGuildMemberRoleManager = new Discord.GuildMemberRoleManager(oldGuildMember as Discord.GuildMember);
	const newGuildMemberRoleManager = new Discord.GuildMemberRoleManager(newGuildMember);

	oldGuildMemberRoleManager.cache.sort();
	newGuildMemberRoleManager.cache.sort();

	const collectionSizeDifference = oldGuildMemberRoleManager
		.cache.size - newGuildMemberRoleManager.cache.size;

	if (collectionSizeDifference !== 0) {
		const guildData = await discordUser.getGuildDataFromDB(newGuildMember.guild) as DiscordStuff.GuildData;
		for (let x = 0; x < guildData.logs.length; x += 1) {
			if ((guildData.logs[x] as DiscordStuff.Log).nameSmall === 'roleaddorremove') {
				if ((guildData.logs[x] as DiscordStuff.Log).enabled === false) {
					return;
				}
			}
		}
		const command = 'onroleaddorremove';

		if (!botCommands.commands.has(command)) {
			return;
		}
		try {
			console.log(`Command: '${command}' entered by system.`);
			const cmdName = await (botCommands.commands.get(command)?.function(client, oldGuildMemberRoleManager, newGuildMemberRoleManager,
					newGuildMember, collectionSizeDifference, discordUser));
			console.log(`Completed Command: ${cmdName}`);
			return;
		} catch (error) {
			console.log(error);
		}
	}
});

client.on('inviteCreate', async (invite: Discord.Invite) => {
	const guildData = await discordUser.getGuildDataFromDB((invite.guild as Discord.Guild)) as DiscordStuff.GuildData;
	for (let x = 0; x < guildData.logs.length; x += 1) {
		if ((guildData.logs[x] as DiscordStuff.Log).nameSmall === 'invitecreate') {
			if ((guildData.logs[x] as DiscordStuff.Log).enabled === false) {
				return;
			}
		}
	}
	const command = 'oninvitecreate';

	if (!botCommands.commands.has(command)) {
		return;
	}
	try {
		console.log(`Command: '${command}' entered by system.`);
		const cmdName = await botCommands.commands.get(command)?.function(client, invite, discordUser);
		console.log(`Completed Command: ${cmdName}`);
		return;
	} catch (error) {
		console.log(error);
	}
});

client.on('messageDelete', async (message: Discord.Message) => {
	const guildData = await discordUser.getGuildDataFromDB((message.guild as Discord.Guild)) as DiscordStuff.GuildData;
	for (let x = 0; x < guildData.logs.length; x += 1) {
		if ((guildData.logs[x] as DiscordStuff.Log).nameSmall === 'messagedelete') {
			if ((guildData.logs[x] as DiscordStuff.Log).enabled === false) {
				return;
			}
		}
	}
	const command = 'onmessagedelete';

	if (!botCommands.commands.has(command)) {
		return;
	}
	try {
		console.log(`Command: '${command}' entered by system.`);
		const cmdName = await botCommands.commands.get(command)?.function(client, message, discordUser);
		console.log(`Completed Command: ${cmdName}`);
		return;
	} catch (error) {
		console.log(error);
	}
});

client.on('messageDeleteBulk', async (collection: Discord.Collection<string, Discord.Message>) => {
	const guildData = await discordUser.getGuildDataFromDB(((collection.first() as Discord.Message).guild as Discord.Guild)) as DiscordStuff.GuildData;
	for (let x = 0; x < guildData.logs.length; x += 1) {
		if ((guildData.logs[x] as DiscordStuff.Log).nameSmall === 'messagedeletebulk') {
			if ((guildData.logs[x] as DiscordStuff.Log).enabled === false) {
				return;
			}
		}
	}
	const command = 'onmessagedeletebulk';

	if (!botCommands.commands.has(command)) {
		return;
	}
	try {
		console.log(`Command: '${command}' entered by system.`);
		const cmdName = await botCommands.commands.get(command)?.function(client, collection, discordUser);
		console.log(`Completed Command: ${cmdName}`);
		return;
	} catch (error) {
		console.log(error);
	}
});

client.on('roleCreate', async (role: Discord.Role) => {
	const guildData = await discordUser.getGuildDataFromDB(role.guild) as DiscordStuff.GuildData;
	for (let x = 0; x < guildData.logs.length; x += 1) {
		if ((guildData.logs[x] as DiscordStuff.Log).nameSmall === 'rolecreate') {
			if ((guildData.logs[x] as DiscordStuff.Log).enabled === false) {
				return;
			}
		}
	}
	const command = 'onrolecreate';

	if (!botCommands.commands.has(command)) {
		return;
	}
	try {
		console.log(`Command: '${command}' entered by system.`);
		const cmdName = await botCommands.commands.get(command)?.function(client, role, discordUser);
		console.log(`Completed Command: ${cmdName}`);
		return;
	} catch (error) {
		console.log(error);
	}
});

client.on('roleDelete', async (role: Discord.Role) => {
	const guildData = await discordUser.getGuildDataFromDB(role.guild) as DiscordStuff.GuildData;
	for (let x = 0; x < guildData.logs.length; x += 1) {
		if ((guildData.logs[x] as DiscordStuff.Log).nameSmall === 'roledelete') {
			if ((guildData.logs[x] as DiscordStuff.Log).enabled === false) {
				return;
			}
		}
	}
	const command = 'onroledelete';

	if (!botCommands.commands.has(command)) {
		return;
	}
	try {
		console.log(`Command: '${command}' entered by system.`);
		const cmdName = await botCommands.commands.get(command)?.function(client, role, discordUser);
		console.log(`Completed Command: ${cmdName}`);
		return;
	} catch (error) {
		console.log(error);
	}
});

client.on('userUpdate', async (oldUser: Discord.User, newUser: Discord.User) => {
	if (oldUser.username !== newUser.username) {
		const guildArray = client.guilds.cache.array();
		for (let x = 0; x < guildArray.length; x += 1) {
			const guildMembersArray = (await (guildArray[x] as Discord.Guild).members.fetch()).array();
			for (let y = 0; y < guildMembersArray.length; y += 1) {
				if ((guildMembersArray[y] as Discord.GuildMember).id === oldUser.id) {
					const guildData = await discordUser.getGuildDataFromDB((guildArray[x] as Discord.Guild)) as DiscordStuff.GuildData;
					for (let z = 0; z < guildData.logs.length; z += 1) {
						if ((guildData.logs[z] as DiscordStuff.Log).nameSmall === 'usernamechange') {
							if ((guildData.logs[z] as DiscordStuff.Log).enabled === false) {
								break;
							} else {
								const command = 'onusernamechange';

								if (!botCommands.commands.has(command)) {
									return;
								}
								try {
									console.log(`Command: '${command}' entered by system.`);
									const cmdName = await (botCommands.commands.get(command)?.function(client, oldUser,
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
