// onroleaddorremove.js - Module for my "on role add or remove" command.
// Mar 12, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

const Discord = require('discord.js');
const DiscordStuff = require('../DiscordStuff');

module.exports = {
	name: 'onroleaddorremove',
	description: "It's an automatic one!",
	/**
     * @param   {Discord.Client}                    client
     * @param   {Discord.GuildMemberRoleManager}    oldGuildMemberRoleManager
     * @param   {Discord.GuildMemberRoleManager}    newGuildMemberRoleManager
     * @param   {Discord.GuildMember}               newGuildMember
     * @param   {Number}                            collectionSizeDifference
     * @param   {DiscordStuff.DiscordUser}          discordUser
     * @returns {String}
     */
	async execute(client, oldGuildMemberRoleManager, newGuildMemberRoleManager,
		newGuildMember, collectionSizeDifference, discordUser) {
		try {
			if (!(oldGuildMemberRoleManager instanceof Discord.GuildMemberRoleManager)) {
				return this.name;
			}

			const guildData = await discordUser.getGuildDataFromDB(newGuildMember.guild);

			let logs = new DiscordStuff.Log();
			for (let x = 0; x < guildData.logs.length; x += 1) {
				if (guildData.logs[x].nameSmall === 'roleaddorremove') {
					logs = guildData.logs[x];
					break;
				}
			}

			let newRole = new Discord.Role(client, {}, newGuildMember.guild);

			const newRoleCollection = oldGuildMemberRoleManager.cache
				.difference(newGuildMemberRoleManager.cache);

			newRole = newRoleCollection.first();

			let textChannel = new Discord.TextChannel(newGuildMember.guild, {});
			textChannel = client.channels.resolve(logs.loggingChannelID);

			const auditLogs = await newGuildMember.guild.fetchAuditLogs({ type: 'MEMBER_ROLE_UPDATE', limit: 1 });
			const auditLogEntry = auditLogs.entries
				.find(entry => Date.now() - entry.createdTimestamp < 5000);

			if (collectionSizeDifference > 0) {
				let finalString = `__**Role Lost:**__ <@&${newRole.id}> (${newRole.name})\n`;
				finalString += `__**Role Taken By:**__ <@!${auditLogEntry.executor.id}> (${auditLogEntry.executor.tag})\n`;
				finalString += `__**User:**__ <@!${newGuildMember.user.id}>\n`;
				finalString += `__**User Tag:**__ ${newGuildMember.user.tag}\n`;
				finalString += `__**Username:**__ ${newGuildMember.user.username}\n`;
				finalString += `__**User ID:**__ ${newGuildMember.id}\n`;

				const messageEmbed = new Discord.MessageEmbed().setColor(newGuildMember.displayColor).setTitle('__**Lost Role:**__').setTimestamp(Date())
					.setThumbnail(newGuildMember.user.avatarURL())
					.setDescription(finalString);
				await textChannel.send(messageEmbed);
				return this.name;
			}
			if (collectionSizeDifference < 0) {
				let finalString = `__**Role Gained:**__ <@&${newRole.id}> (${newRole.name})\n`;
				finalString += `__**Role Given By:**__ <@!${auditLogEntry.executor.id}> (${auditLogEntry.executor.tag})\n`;
				finalString += `__**User:**__ <@!${newGuildMember.user.id}>\n`;
				finalString += `__**User Tag:**__ ${newGuildMember.user.tag}\n`;
				finalString += `__**Username:**__ ${newGuildMember.user.username}\n`;
				finalString += `__**User ID:**__ ${newGuildMember.id}\n`;

				const messageEmbed = new Discord.MessageEmbed().setColor(newGuildMember.displayColor).setTitle('__**New Role:**__').setTimestamp(Date())
					.setThumbnail(newGuildMember.user.avatarURL())
					.setDescription(finalString);
				await textChannel.send(messageEmbed);
				return this.name;
			}

			return this.name;
		} catch (error) {
			return new Promise((resolve, reject) => {
				reject(error);
			});
		}
	},
};
