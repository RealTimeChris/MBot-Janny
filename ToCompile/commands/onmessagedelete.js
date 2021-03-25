// onmessagedelete.js - Module for my "on message delete" command.
// Mar 12, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

const Discord = require('discord.js');
const DiscordStuff = require('../DiscordStuff');

module.exports = {
	name: 'onmessagedelete',
	description: "It's an automatic one!",
	/**
     * @param {Discord.Client}              client
     * @param {Discord.Message}             message
     * @param {DiscordStuff.DiscordUser}    discordUser
     * @returns {String}
     */
	async execute(client, message, discordUser) {
		try {
			if (!(message.deleted)) {
				return this.name;
			}

			const guildData = await discordUser.getGuildDataFromDB(message.guild);

			let logs = new DiscordStuff.Log();
			for (let x = 0; x < guildData.logs.length; x += 1) {
				if (guildData.logs[x].nameSmall === 'messagedelete') {
					logs = guildData.logs[x];
					break;
				}
			}

			let textChannel = new Discord.TextChannel(message.guild, {});
			textChannel = await client.channels.fetch(logs.loggingChannelID);

			const msgEmbed = new Discord.MessageEmbed();
			let msgString = String('');
			msgString = `__**Message Author:**__ <@!${message.author.id}> (${message.author.tag})\n`;
			msgString += `__**Message ID:**__ ${message.id}\n`;
			msgString += `__**Content:**__ ${message.content}`;

			msgEmbed.setTitle('__**Message Deleted:**__').setTimestamp(Date()).setDescription(msgString).setColor([0, 0, 255]);
			await textChannel.send(msgEmbed);

			for (let x = 0; x < message.embeds.length; x += 1) {
				const msgEmbed2 = message.embeds[0];
				await textChannel.send('Message Content!', { embed: msgEmbed2 });
			}

			return this.name;
		} catch (error) {
			return new Promise((resolve, reject) => {
				reject(error);
			});
		}
	},
};
