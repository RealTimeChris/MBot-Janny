// onguildbanadd.js - Module for my "on guild ban add" command.
// Mar 9, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

const Discord = require('discord.js');
const DiscordStuff = require('../DiscordStuff');

module.exports = {
	name: 'onguildbanadd',
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

			setTimeout(async () => {
				let logs = new DiscordStuff.Log();
				for (let x = 0; x < guildData.logs.length; x += 1) {
					if (guildData.logs[x].nameSmall === 'guildbanadd') {
						logs = guildData.logs[x];
						break;
					}
				}

				let textChannel = new Discord.TextChannel(guild, {});
				textChannel = guild.channels.resolve(logs.loggingChannelID);

				const auditLogs = await guild.fetchAuditLogs({ type: 'MEMBER_BAN_ADD', limit: 1 });
				const auditLogEntry = auditLogs.entries
					.find((entry) => Date.now() - entry.createdTimestamp < 5000);

				let msgString = String('');
				msgString += `__**Banned By:**__ <@!${auditLogEntry.executor.id}> (${auditLogEntry.executor.tag})\n`;
				msgString += `__**Reason:**__ ${auditLogEntry.reason}\n`;
				msgString += `__**Time of Ban:**__ ${Date()}\n`;
				msgString += `__**User:**__ <@!${user.id}>\n`;
				msgString += `__**User Tag:**__ ${user.tag}\n`;
				msgString += `__**Username:**__ ${user.username}\n`;
				msgString += `__**User ID:**__ ${user.id}\n`;

				const msgEmbed = new Discord.MessageEmbed();

				msgEmbed.setColor([255, 0, 0]).setThumbnail(user.avatarURL()).setTimestamp(Date()).setTitle('__**User Banned:**__')
					.setDescription(msgString);

				await textChannel.send(msgEmbed);
			}, 500);

			return this.name;
		} catch (error) {
			return new Promise((resolve, reject) => {
				reject(error);
			});
		}
	},
};
