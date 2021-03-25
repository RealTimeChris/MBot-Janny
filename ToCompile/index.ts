// index.js - The main entry point for my Discord Bot!
// Jan 28, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

import Discord = require('discord.js');
import fs = require('fs');
import DiscordStuff = require("./DiscordStuff.js");
import config = require('../ToCompile/config.json');
const client = new Discord.Client();

const discordUser = new DiscordStuff.DiscordUser();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const commands = new Discord.Collection();

commandFiles.map(file => {
	const command = require(`./commands/${file}`);
	commands.set(command.name, command);
	return command;
});

client.once('ready', async () => {
	try {
		await discordUser.initializeInstance(client);
		await (client.user as Discord.ClientUser).setPresence({ status: 'online', activity: { name: '!help for commands!', type: 'STREAMING' } });
		return;
	} catch (error) {
		console.log(error);
	}
});

client.on('message', async (msg) => {
	if (msg.member == null && !(msg.channel.type === 'dm')) {
		console.log('HMMM!? NULL MEMBER?! GTFO!');
		return;
	}

	if (msg.author.id === (client.user as Discord.User).id) {
		console.log('Better not track our own messages!');
		return;
	}
	 if (msg.content.startsWith(discordUser.userData.prefix)) {
		let command = String('');
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

		if (!commands.has(command)) {
			return;
		}
		try {
			console.log(`Command: '${command}' entered by user: ${msg.author.username}`);
			const cmdName = await (commands.get(command) as any).execute(msg, args, discordUser);
			console.log(`Completed Command: ${cmdName}`);
			await discordUser.sendInviteIfTimeHasPassedAndGuildIsActive(client);
			await discordUser.updateAndSaveDiscordRecordIfTimeHasPassed(client);
			await discordUser.saveCacheIfTimeHasPassed(client);
			await DiscordStuff.sendTimedMessagesIfTimeHasPassed(client, discordUser);
			discordUser.purgeMessageChannelsIfTimeHasPassed(client).catch((error: Error) => {
				console.log(error);
			});
			return;
		} catch (error) {
			console.log(error);
			msg.reply('There was an error trying to execute that command!');
		}
	} else if (msg.author.id !== (client.user as Discord.User).id) {
		const command = 'message';

		if (!commands.has(command)) {
			return;
		}
		try {
			console.log(`Standard message entered: ${msg.author.username}`);
			const cmdName = await (commands.get(command) as any).execute(msg, discordUser);
			console.log(`Completed Command: ${cmdName}`);
			await discordUser.sendInviteIfTimeHasPassedAndGuildIsActive(client);
			await discordUser.updateAndSaveDiscordRecordIfTimeHasPassed(client);
			await discordUser.saveCacheIfTimeHasPassed(client);
			await DiscordStuff.sendTimedMessagesIfTimeHasPassed(client, discordUser);
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

client.on('messageReactionAdd', async (messageReaction, user) => {
	const command = 'onmessagereactionadd';

	if (!commands.has(command)) {
		return;
	}
	try {
		console.log(`Command: '${command}' entered by system.`);
		const cmdName = await (commands.get(command) as any)
			.execute(messageReaction, client, user, discordUser);
		console.log(`Completed Command: ${cmdName}`);
		return;
	} catch (error) {
		console.log(error);
	}
});

client.on('guildDelete', async guild => {
	const command = 'onguilddelete';

	if (!commands.has(command)) {
		return;
	}
	try {
		console.log(`Command: '${command}' entered by system.`);
		const cmdName = await (commands.get(command) as any).execute(guild, discordUser);
		console.log(`Completed Command: ${cmdName}`);
		return;
	} catch (error) {
		console.log(error);
	}
});

client.on('guildBanAdd', async (guild, user) => {
	const guildData = await discordUser.getGuildDataFromDB(guild) as DiscordStuff.GuildData;
	for (let x = 0; x < guildData.logs.length; x += 1) {
		if ((guildData.logs[x] as DiscordStuff.Log).nameSmall === 'guildbanadd') {
			if ((guildData.logs[x] as DiscordStuff.Log).enabled === false) {
				return;
			}
		}
	}
	const command = 'onguildbanadd';

	if (!commands.has(command)) {
		return;
	}
	try {
		console.log(`Command: '${command}' entered by system.`);
		const cmdName = await (commands.get(command) as any).execute(client, guild, user, discordUser);
		console.log(`Completed Command: ${cmdName}`);
		return;
	} catch (error) {
		console.log(error);
	}
});

client.on('guildBanRemove', async (guild, user) => {
	const guildData = await discordUser.getGuildDataFromDB(guild) as DiscordStuff.GuildData;
	for (let x = 0; x < guildData.logs.length; x += 1) {
		if ((guildData.logs[x] as DiscordStuff.Log).nameSmall === 'guildbanremove') {
			if ((guildData.logs[x] as DiscordStuff.Log).enabled === false) {
				return;
			}
		}
	}
	const command = 'onguildbanremove';

	if (!commands.has(command)) {
		return;
	}
	try {
		console.log(`Command: '${command}' entered by system.`);
		const cmdName = await (commands.get(command) as any).execute(client, guild, user, discordUser);
		console.log(`Completed Command: ${cmdName}`);
		return;
	} catch (error) {
		console.log(error);
	}
});

client.on('guildMemberAdd', async member => {
	const guildData = await discordUser.getGuildDataFromDB(member.guild) as DiscordStuff.GuildData;
	for (let x = 0; x < guildData.logs.length; x += 1) {
		if ((guildData.logs[x] as DiscordStuff.Log).nameSmall === 'guildmemberadd') {
			if ((guildData.logs[x] as DiscordStuff.Log).enabled === false) {
				return;
			}
		}
	}
	const command = 'onguildmemberadd';

	if (!commands.has(command)) {
		return;
	}
	try {
		console.log(`Command: '${command}' entered by system.`);
		const cmdName = await (commands.get(command) as any).execute(client, member, discordUser);
		console.log(`Completed Command: ${cmdName}`);
		return;
	} catch (error) {
		console.log(error);
	}
});

client.on('guildMemberRemove', async member => {
	const guildData = await discordUser.getGuildDataFromDB(member.guild) as DiscordStuff.GuildData;
	for (let x = 0; x < guildData.logs.length; x += 1) {
		if ((guildData.logs[x] as DiscordStuff.Log).nameSmall === 'guildmemberremove') {
			if ((guildData.logs[x] as DiscordStuff.Log).enabled === false) {
				return;
			}
		}
	}
	const command = 'onguildmemberremove';
	if (!commands.has(command)) {
		return;
	}
	try {
		console.log(`Command: '${command}' entered by system.`);
		const cmdName = await (commands.get(command) as any).execute(client, member, discordUser);
		console.log(`Completed Command: ${cmdName}`);
		return;
	} catch (error) {
		console.log(error);
	}
});

client.on('guildMemberUpdate', async (oldGuildMember, newGuildMember) => {
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
		if (!commands.has(command)) {
			return;
		}
		try {
			console.log(`Command: '${command}' entered by system.`);
			const cmdName = await (commands.get(command) as any)
				.execute(client, oldGuildMember, newGuildMember, discordUser);
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
		if (!commands.has(command)) {
			return;
		}
		try {
			console.log(`Command: '${command}' entered by system.`);
			const cmdName = await (commands.get(command) as any)
				.execute(client, oldGuildMember, newGuildMember, discordUser);
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

		if (!commands.has(command)) {
			return;
		}
		try {
			console.log(`Command: '${command}' entered by system.`);
			const cmdName = await (commands.get(command) as any)
				.execute(client, oldGuildMemberRoleManager, newGuildMemberRoleManager,
					newGuildMember, collectionSizeDifference, discordUser);
			console.log(`Completed Command: ${cmdName}`);
			return;
		} catch (error) {
			console.log(error);
		}
	}
});

client.on('inviteCreate', async (invite) => {
	const guildData = await discordUser.getGuildDataFromDB((invite.guild as Discord.Guild)) as DiscordStuff.GuildData;
	for (let x = 0; x < guildData.logs.length; x += 1) {
		if ((guildData.logs[x] as DiscordStuff.Log).nameSmall === 'invitecreate') {
			if ((guildData.logs[x] as DiscordStuff.Log).enabled === false) {
				return;
			}
		}
	}
	const command = 'oninvitecreate';

	if (!commands.has(command)) {
		return;
	}
	try {
		console.log(`Command: '${command}' entered by system.`);
		const cmdName = await (commands.get(command) as any).execute(client, invite, discordUser);
		console.log(`Completed Command: ${cmdName}`);
		return;
	} catch (error) {
		console.log(error);
	}
});

client.on('messageDelete', async (message) => {
	const guildData = await discordUser.getGuildDataFromDB((message.guild as Discord.Guild)) as DiscordStuff.GuildData;
	for (let x = 0; x < guildData.logs.length; x += 1) {
		if ((guildData.logs[x] as DiscordStuff.Log).nameSmall === 'messagedelete') {
			if ((guildData.logs[x] as DiscordStuff.Log).enabled === false) {
				return;
			}
		}
	}
	const command = 'onmessagedelete';

	if (!commands.has(command)) {
		return;
	}
	try {
		console.log(`Command: '${command}' entered by system.`);
		const cmdName = await (commands.get(command) as any).execute(client, message, discordUser);
		console.log(`Completed Command: ${cmdName}`);
		return;
	} catch (error) {
		console.log(error);
	}
});

client.on('messageDeleteBulk', async (collection) => {
	const guildData = await discordUser.getGuildDataFromDB(((collection.first() as Discord.Message).guild as Discord.Guild)) as DiscordStuff.GuildData;
	for (let x = 0; x < guildData.logs.length; x += 1) {
		if ((guildData.logs[x] as DiscordStuff.Log).nameSmall === 'messagedeletebulk') {
			if ((guildData.logs[x] as DiscordStuff.Log).enabled === false) {
				return;
			}
		}
	}
	const command = 'onmessagedeletebulk';

	if (!commands.has(command)) {
		return;
	}
	try {
		console.log(`Command: '${command}' entered by system.`);
		const cmdName = await (commands.get(command) as any).execute(client, collection, discordUser);
		console.log(`Completed Command: ${cmdName}`);
		return;
	} catch (error) {
		console.log(error);
	}
});

client.on('roleCreate', async (role) => {
	const guildData = await discordUser.getGuildDataFromDB(role.guild) as DiscordStuff.GuildData;
	for (let x = 0; x < guildData.logs.length; x += 1) {
		if ((guildData.logs[x] as DiscordStuff.Log).nameSmall === 'rolecreate') {
			if ((guildData.logs[x] as DiscordStuff.Log).enabled === false) {
				return;
			}
		}
	}
	const command = 'onrolecreate';

	if (!commands.has(command)) {
		return;
	}
	try {
		console.log(`Command: '${command}' entered by system.`);
		const cmdName = await (commands.get(command) as any).execute(client, role, discordUser);
		console.log(`Completed Command: ${cmdName}`);
		return;
	} catch (error) {
		console.log(error);
	}
});

client.on('roleDelete', async (role) => {
	const guildData = await discordUser.getGuildDataFromDB(role.guild) as DiscordStuff.GuildData;
	for (let x = 0; x < guildData.logs.length; x += 1) {
		if ((guildData.logs[x] as DiscordStuff.Log).nameSmall === 'roledelete') {
			if ((guildData.logs[x] as DiscordStuff.Log).enabled === false) {
				return;
			}
		}
	}
	const command = 'onroledelete';

	if (!commands.has(command)) {
		return;
	}
	try {
		console.log(`Command: '${command}' entered by system.`);
		const cmdName = await (commands.get(command) as any).execute(client, role, discordUser);
		console.log(`Completed Command: ${cmdName}`);
		return;
	} catch (error) {
		console.log(error);
	}
});

client.on('userUpdate', async (oldUser, newUser) => {
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

								if (!commands.has(command)) {
									return;
								}
								try {
									console.log(`Command: '${command}' entered by system.`);
									const cmdName = await (commands.get(command) as any)
										.execute(client, oldUser, newUser, guildArray[x], discordUser);
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