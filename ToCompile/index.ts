// index.js - The main entry point for my Discord Bot!
// Jan 28, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

import Discord = require('discord.js');
import DiscordStuff = require("./DiscordStuff.js");
import config = require('../ToCompile/config.json');
import botCommands from './commandindex';

const discordUser = new DiscordStuff.DiscordUser();
const client = new Discord.Client() as any;
client.ws.on('INTERACTION_CREATE', (interaction: any) => {
	const {name, options} = interaction.data;

	for (const option of options){
		const {name, value} = option;
		console.log(name, value);
	}
	console.log(interaction);
	console.log(options);
	if (name === 'ghost'){
		client.api.interactions(interaction.id, interaction.token).callback().post({
			data: {type: 4,
			data:{content: 'HEY!'
				}
			}
		})
	}
})

client.once('ready', async () => {
	try {
		await discordUser.initializeInstance(client);
		await (client.user as Discord.ClientUser).setPresence({ status: 'online', activity: { name: '!help for commands!', type: 'STREAMING' } });
		return;
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
			console.log(`Command: '${command}' entered by user: ${msg.author.username}`);
			const cmdName = await botCommands.commands.get(command)?.function(msg, args, discordUser);
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
