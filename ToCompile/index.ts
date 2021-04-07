// Index.ts - The main entry point for my Discord Bot!
// Jan 28, 2021
// Chris M.s
// https://github.com/RealTimeChris

'use strict';

import Discord = require('discord.js');
import IndexFunctions from './IndexFunctions';
import DiscordUser from './DiscordUser';
import config = require('./config.json');

const discordUser = new DiscordUser();
const client = new Discord.Client() as any;

client.once('ready', async () => {
	IndexFunctions.onReady(client, discordUser);
});

client.on('message', async (msg: Discord.Message) => {
	IndexFunctions.onMessage(msg, client, discordUser);
});

client.ws.on('INTERACTION_CREATE', async (interaction: any) => {
	IndexFunctions.onInteractionCreate(interaction, client, discordUser);
});

client.on('messageReactionAdd', async (messageReaction: Discord.MessageReaction, user: Discord.User) => {
	IndexFunctions.onMessageReactionAdd(messageReaction, user, client, discordUser);
});

client.on('guildDelete', async (guild: Discord.Guild) => {
	IndexFunctions.onGuildDete(guild, discordUser);
});

client.on('guildBanAdd', async (guild: Discord.Guild, user: Discord.User) => {
	IndexFunctions.onGuildBanAdd(guild, user, client, discordUser);
});

client.on('guildBanRemove', async (guild: Discord.Guild, user: Discord.User) => {
	IndexFunctions.onGuildBanRemove(guild, user, client, discordUser);
});

client.on('guildMemberAdd', async (member: Discord.GuildMember) => {
	IndexFunctions.onGuildMemberAdd(member, client, discordUser);
});

client.on('guildMemberRemove', async (member: Discord.GuildMember) => {
	IndexFunctions.onGuildMemberRemove(member, client, discordUser);
});

client.on('guildMemberUpdate', async (oldGuildMember: Discord.GuildMember, newGuildMember: Discord.GuildMember) => {
	IndexFunctions.onGuildMemberUpdate(oldGuildMember, newGuildMember, client, discordUser);
});

client.on('inviteCreate', async (invite: Discord.Invite) => {
	IndexFunctions.onInviteCreate(invite, client, discordUser);
});

client.on('messageDelete', async (message: Discord.Message) => {
	IndexFunctions.onMessageDelete(message, client, discordUser);
});

client.on('messageDeleteBulk', async (collection: Discord.Collection<string, Discord.Message>) => {
	IndexFunctions.onMessageDeleteBulk(collection, client, discordUser);
});

client.on('roleCreate', async (role: Discord.Role) => {
	IndexFunctions.onRoleCreate(role, client, discordUser);
});

client.on('roleDelete', async (role: Discord.Role) => {
	IndexFunctions.onRoleDelete(role, client, discordUser);
});

client.on('userUpdate', async (oldUser: Discord.User, newUser: Discord.User) => {
	IndexFunctions.onUserUpdate(oldUser, newUser, client, discordUser);
});

client.login(config.botToken);
