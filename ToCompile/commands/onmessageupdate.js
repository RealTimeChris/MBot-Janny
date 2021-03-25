// onmessageupdate.js - Module for my "on message update" command.
// Mar 12, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

const Discord = require('discord.js');
const DiscordStuff = require('../DiscordStuff');

module.exports = {
	name: 'onmessageupdate',
	description: "It's an automatic one!",
	/**
     * @param {Discord.Client}              client
     * @param {Discord.Message}             oldMessage
     * @param {Discord.Message}             newMessage
     * @param {DiscordStuff.DiscordUser}    discordUser
     * @returns {String}
     */
	async execute(client, oldMessage, newMessage, discordUser) {
		try {
			if (!(newMessage instanceof Discord.Message)) {
				return this.name;
			}

			const guildData = await discordUser.getGuildDataFromDB(newMessage.guild);

			let logs = new DiscordStuff.Log();
			for (let x = 0; x < guildData.logs.length; x += 1) {
				if (guildData.logs[x].nameSmall === 'messageupdate') {
					logs = guildData.logs[x];
					break;
				}
			}

			let textChannel = new Discord.TextChannel(newMessage.guild, {});
			textChannel = await client.channels.fetch(logs.loggingChannelID);

			const msgEmbed = new Discord.MessageEmbed();
			let msgString = String('');
			msgString = `__**Message Author:**__ <@!${newMessage.author.id}> (${newMessage.author.tag})\n`;
			msgString += `__**Message ID:**__ ${newMessage.id}\n`;
			msgString += `__**Old Content:**__ \n${oldMessage.content}\n`;
			msgString += `__**New Content:**__ ${newMessage.content}`;

			msgEmbed.setTitle('__**Message Updated:**__').setTimestamp(Date()).setDescription(msgString).setColor([0, 0, 255]);
			await textChannel.send(msgEmbed);

			for (let x = 0; x < newMessage.embeds.length; x += 1) {
				const msgEmbed2 = newMessage.embeds[0];
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
