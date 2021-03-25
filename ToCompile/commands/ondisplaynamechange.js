// ondisplaynamechange.js - Module for my "on display name change" commaand.\
// Mar 12, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

const Discord = require('discord.js');
const DiscordStuff = require('../DiscordStuff');

module.exports = {
	name: 'ondisplaynamechange',
	description: "It's an automatic one!",
	/**
     * @param {Discord.Client}          client
     * @param {Discord.GuildMember}     oldGuildMember
     * @param {Discord.GuildMember}     newGuildMember
     * @param {DiscordStuff.DiscordUser}discordUser
     * @returns {String}
     */
	async execute(client, oldGuildMember, newGuildMember, discordUser) {
		try {
			if (!(oldGuildMember instanceof Discord.GuildMember)) {
				return this.name;
			}

			const guildData = await discordUser.getGuildDataFromDB(oldGuildMember.guild);

			let logs = new DiscordStuff.Log();
			for (let x = 0; x < guildData.logs.length; x += 1) {
				if (guildData.logs[x].nameSmall === 'displaynamechange') {
					logs = guildData.logs[x];
					break;
				}
			}

			let textChannel = new Discord.TextChannel(oldGuildMember.guild, {});
			textChannel = await client.channels.fetch(logs.loggingChannelID);

			let msgString = String('');
			msgString = `__**New Displayname:**__ ${newGuildMember.displayName}\n`;
			msgString += `__**Old Displayname:**__ ${oldGuildMember.displayName}\n`;
			msgString += `__**User:**__ <@!${newGuildMember.id}>\n`;
			msgString += `__**User Tag:**__ ${newGuildMember.user.tag}\n`;
			msgString += `__**Username:**__ ${newGuildMember.user.username}\n`;
			msgString += `__**User ID:**__ ${oldGuildMember.id}\n`;

			const msgEmbed = new Discord.MessageEmbed();
			msgEmbed.setColor(newGuildMember.displayColor)
				.setDescription(msgString).setThumbnail(newGuildMember.user.avatarURL())
				.setTimestamp(Date())
				.setTitle('__**New Displayname:**__');

			await textChannel.send(msgEmbed);
			return this.name;
		} catch (error) {
			return new Promise((resolve, reject) => {
				reject(error);
			});
		}
	},
};
