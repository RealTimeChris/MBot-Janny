// onusernamechange.js - Module for my "on username change" commaand.
// Mar 12, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

const Discord = require('discord.js');
const DiscordStuff = require('../DiscordStuff');

module.exports = {
	name: 'onusernamechange',
	description: "It's an automatic one!",
	/**
     * @param {Discord.Client}              client
     * @param {Discord.User}                oldUser
     * @param {Discord.User}                newUser
     * @param {Discord.Guild}               guild
     * @param {DiscordStuff.DiscordUser}    discordUser
     * @returns {String}
     */
	async execute(client, oldUser, newUser, guild, discordUser) {
		try {
			if (!(oldUser instanceof Discord.User)) {
				return this.name;
			}

			const guildData = await discordUser.getGuildDataFromDB(guild);

			let logs = new DiscordStuff.Log();
			for (let x = 0; x < guildData.logs.length; x += 1) {
				if (guildData.logs[x].nameSmall === 'usernamechange') {
					logs = guildData.logs[x];
					break;
				}
			}

			let textChannel = new Discord.TextChannel(guild, {});
			textChannel = await client.channels.fetch(logs.loggingChannelID);

			let msgString = String('');
			msgString = `__**New Username:**__ ${newUser.username}\n`;
			msgString += `__**Old Username:**__ ${oldUser.username}\n`;
			msgString += `__**User:**__ <@!${newUser.id}>\n`;
			msgString += `__**User Tag:**__ ${newUser.tag}\n`;
			msgString += `__**Username:**__ ${newUser.username}\n`;
			msgString += `__**User ID:**__ ${newUser.id}\n`;

			const msgEmbed = new Discord.MessageEmbed();
			msgEmbed.setColor([0, 0, 255]).setDescription(msgString).setThumbnail(newUser.avatarURL())
				.setTimestamp(Date())
				.setTitle('__**New Username:**__');

			await textChannel.send(msgEmbed);
			return this.name;
		} catch (error) {
			return new Promise((resolve, reject) => {
				reject(error);
			});
		}
	},
};
