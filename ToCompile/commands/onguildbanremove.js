// onguildbanremove.js - Module for my "on guild ban remove" command.
// Mar 9, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

const Discord = require('discord.js');
const DiscordStuff = require('../DiscordStuff');

module.exports = {
	name: 'onguildbanremove',
	description: "It's an automatic one!",
	/**
     * @param   {Discord.Client}            client
     * @param   {Discord.Guild}             guild
     * @param   {Discord.User}              user
     * @param   {DiscordStuff.DiscordUser}  discordUser
     * @returns {String}
     */
	async execute(client, guild, user, discordUser) {
		try {
			if (!(guild instanceof Discord.Guild)) {
				return this.name;
			}

			const guildData = await discordUser.getGuildDataFromDB(guild);

			let logs = new DiscordStuff.Log();
			for (let x = 0; x < guildData.logs.length; x += 1) {
				if (guildData.logs[x].nameSmall === 'guildbanremove') {
					logs = guildData.logs[x];
					break;
				}
			}

			let textChannel = new Discord.TextChannel(guild, {});
			textChannel = guild.channels.resolve(logs.loggingChannelID);

			const auditLogs = await guild.fetchAuditLogs({ type: 'MEMBER_BAN_REMOVE', limit: 1 });
			const auditLogEntry = auditLogs.entries
				.find(entry => Date.now() - entry.createdTimestamp < 5000);

			let msgString = String('');
			msgString += `__**Unbanned By:**__ <@!${auditLogEntry.executor.id}> (${auditLogEntry.executor.tag})\n`;
			msgString += `__**Time of Unban:**__ ${Date()}\n`;
			msgString += `__**User:**__ <@!${user.id}>\n`;
			msgString += `__**User Tag:**__ ${user.tag}\n`;
			msgString += `__**Username:**__ ${user.username}\n`;
			msgString += `__**User ID:**__ ${user.id}\n`;

			const msgEmbed = new Discord.MessageEmbed();

			msgEmbed.setColor([0, 255, 0]).setThumbnail(user.avatarURL()).setTimestamp(Date()).setTitle('__**User Unbanned:**__')
				.setDescription(msgString);

			await textChannel.send(msgEmbed);
			return this.name;
		} catch (error) {
			return new Promise((resolve, reject) => {
				reject(error);
			});
		}
	},
};
