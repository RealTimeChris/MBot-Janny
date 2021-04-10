/// <reference types="node" />
import Discord = require('discord.js');
import EventEmitter from 'events';
import DiscordUser from './DiscordUser';
declare module IndexFunctions {
    function onHeartBeat(client: Discord.Client, discordUser: DiscordUser): Promise<void>;
    function onReady(client: Discord.Client, discordUser: DiscordUser, eventEmitter: EventEmitter): Promise<void>;
    function onMessage(msg: Discord.Message, client: Discord.Client, discordUser: DiscordUser): Promise<void>;
    function onInteractionCreate(interaction: any, client: any, discordUser: DiscordUser): Promise<void>;
    function onChannelCreate(newChannel: Discord.Channel | Discord.DMChannel | Discord.GuildChannel, client: Discord.Client, discordUser: DiscordUser): Promise<void>;
    function onMessageReactionAdd(messageReaction: Discord.MessageReaction, user: Discord.User, client: Discord.Client, discordUser: DiscordUser): Promise<void>;
    function onGuildDete(guild: Discord.Guild, discordUser: DiscordUser): Promise<void>;
    function onGuildBanAdd(guild: Discord.Guild, client: Discord.Client, user: Discord.User, discordUser: DiscordUser): Promise<void>;
    function onGuildBanRemove(guild: Discord.Guild, client: Discord.Client, user: Discord.User, discordUser: DiscordUser): Promise<void>;
    function onGuildMemberAdd(member: Discord.GuildMember, client: Discord.Client, discordUser: DiscordUser): Promise<void>;
    function onGuildMemberRemove(member: Discord.GuildMember, client: Discord.Client, discordUser: DiscordUser): Promise<void>;
    function onGuildMemberUpdate(oldGuildMember: Discord.GuildMember, newGuildMember: Discord.GuildMember, client: Discord.Client, discordUser: DiscordUser): Promise<void>;
    function onInviteCreate(invite: Discord.Invite, client: Discord.Client, discordUser: DiscordUser): Promise<void>;
    function onMessageDelete(message: Discord.Message, client: Discord.Client, discordUser: DiscordUser): Promise<void>;
    function onMessageDeleteBulk(collection: Discord.Collection<string, Discord.Message>, client: Discord.Client, discordUser: DiscordUser): Promise<void>;
    function onRoleCreate(role: Discord.Role, client: Discord.Client, discordUser: DiscordUser): Promise<void>;
    function onRoleDelete(role: Discord.Role, client: Discord.Client, discordUser: DiscordUser): Promise<void>;
    function onUserUpdate(oldUser: Discord.User, newUser: Discord.User, client: Discord.Client, discordUser: DiscordUser): Promise<void>;
}
export default IndexFunctions;
