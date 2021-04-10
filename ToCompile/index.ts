// Index.ts - The main entry point for my Discord Bot!
// Jan 28, 2021
// Chris M.s
// https://github.com/RealTimeChris

'use strict';

import Discord = require('discord.js');
import EventEmitter from 'events';
import IndexFunctions from './IndexFunctions';
import DiscordUser from './DiscordUser';
import config = require('./config.json');

const discordUser = new DiscordUser();
const client = new Discord.Client() as any;
const eventEmitter = new EventEmitter();

eventEmitter.on('HeartBeat', async () => {
	console.log('HeartBeat emitted and captured!');
	setTimeout(() => {
		eventEmitter.emit('HeartBeat');
	}, 60000);
	await IndexFunctions.onHeartBeat(client, discordUser);
});

client.once('ready', async () => {
	await IndexFunctions.onReady(client, discordUser, eventEmitter);
});

client.on('message', async (msg: Discord.Message) => {
	await IndexFunctions.onMessage(msg, client, discordUser);
});

client.ws.on('INTERACTION_CREATE', async (interaction: any) => {
	await IndexFunctions.onInteractionCreate(interaction, client, discordUser);
});

client.on('channelCreate', async (newChannel: Discord.Channel | Discord.DMChannel | Discord.GuildChannel) => {
	await IndexFunctions.onChannelCreate(newChannel, client, discordUser);
});

client.on('messageReactionAdd', async (messageReaction: Discord.MessageReaction, user: Discord.User) => {
	await IndexFunctions.onMessageReactionAdd(messageReaction, user, client, discordUser);
});

client.on('guildDelete', async (guild: Discord.Guild) => {
	await IndexFunctions.onGuildDete(guild, discordUser);
});

client.on('guildBanAdd', async (guild: Discord.Guild, user: Discord.User) => {
	await IndexFunctions.onGuildBanAdd(guild, client, user, discordUser);
});

client.on('guildBanRemove', async (guild: Discord.Guild, user: Discord.User) => {
	await IndexFunctions.onGuildBanRemove(guild, client, user, discordUser);
});

client.on('guildMemberAdd', async (member: Discord.GuildMember) => {
	await IndexFunctions.onGuildMemberAdd(member, client, discordUser);
});

client.on('guildMemberRemove', async (member: Discord.GuildMember) => {
	await IndexFunctions.onGuildMemberRemove(member, client, discordUser);
});

client.on('guildMemberUpdate', async (oldGuildMember: Discord.GuildMember, newGuildMember: Discord.GuildMember) => {
	await IndexFunctions.onGuildMemberUpdate(oldGuildMember, newGuildMember, client, discordUser);
});

client.on('inviteCreate', async (invite: Discord.Invite) => {
	await IndexFunctions.onInviteCreate(invite, client, discordUser);
});

client.on('messageDelete', async (message: Discord.Message) => {
	await IndexFunctions.onMessageDelete(message, client, discordUser);
});

client.on('messageDeleteBulk', async (collection: Discord.Collection<string, Discord.Message>) => {
	await IndexFunctions.onMessageDeleteBulk(collection, client, discordUser);
});

client.on('roleCreate', async (role: Discord.Role) => {
	await IndexFunctions.onRoleCreate(role, client, discordUser);
});

client.on('roleDelete', async (role: Discord.Role) => {
	await IndexFunctions.onRoleDelete(role, client, discordUser);
});

client.on('userUpdate', async (oldUser: Discord.User, newUser: Discord.User) => {
	await IndexFunctions.onUserUpdate(oldUser, newUser, client, discordUser);
});

client.login(config.botToken);
