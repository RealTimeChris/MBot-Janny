// onrolecreate.js - Module for my "on role create" command.
// Mar 12, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

const Discord = require('discord.js');
const DiscordStuff = require('../DiscordStuff');

module.exports = {
	name: 'onrolecreate',
	description: "It's an automatic one!",
	/**
     * @param {Discord.Client}              client
     * @param {Discord.Role}                role
     * @param {DiscordStuff.DiscordUser}    discordUser
     * @returns {String}
     */
	async execute(client, role, discordUser) {
		try {
			if (!(role instanceof Discord.Role)) {
				return this.name;
			}

			const guildData = await discordUser.getGuildDataFromDB(role.guild);

			let logs = new DiscordStuff.Log();
			for (let x = 0; x < guildData.logs.length; x += 1) {
				if (guildData.logs[x].nameSmall === 'rolecreate') {
					logs = guildData.logs[x];
					break;
				}
			}

			let textChannel = new Discord.TextChannel(role.guild, {});
			textChannel = await client.channels.fetch(logs.loggingChannelID);

			const auditLogs = await role.guild.fetchAuditLogs({ type: 'ROLE_CREATE', limit: 1 });
			const auditLogEntry = auditLogs.entries
				.find(entry => Date.now() - entry.createdTimestamp < 5000);

			const currentGuild = await client.guilds.fetch(role.guild.id);

			const msgEmbed = new Discord.MessageEmbed();
			let msgString = String('');
			msgString = `__**New Role:**__ <@&${role.id}> (${role.name})\n`;
			msgString += `__**Created By:**__ <@!${auditLogEntry.executor.id}> (${auditLogEntry.executor.tag})\n`;
			msgString += `__**Role Count:**__ ${currentGuild.roles.cache.size}`;

			msgEmbed.setTitle('__**Role Created:**__').setTimestamp(Date()).setDescription(msgString).setColor(role.color);
			await textChannel.send(msgEmbed);

			return this.name;
		} catch (error) {
			return new Promise((resolve, reject) => {
				reject(error);
			});
		}
	},
};
