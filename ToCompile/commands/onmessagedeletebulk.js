// onmessagedeletebulk.js - Module for my "on message delete bulk" command.
// Mar 12, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

const Discord = require('discord.js');
const DiscordStuff = require('../DiscordStuff');

module.exports = {
	name: 'onmessagedeletebulk',
	description: "It's an automatic one!",
	/**
     * @param {Discord.Client}                              client
     * @param {Discord.Collection<String, Discord.Message>} collection
     * @param {DiscordStuff.DiscordUser}                    discordUser
     * @returns {String}
     */
	async execute(client, collection, discordUser) {
		try {
			if (!(collection instanceof Discord.Collection)) {
				return this.name;
			}

			const guildData = await discordUser.getGuildDataFromDB(collection.first().guild);

			let logs = new DiscordStuff.Log();
			for (let x = 0; x < guildData.logs.length; x += 1) {
				if (guildData.logs[x].nameSmall === 'messagedeletebulk') {
					logs = guildData.logs[x];
					break;
				}
			}

			let textChannel = new Discord.TextChannel(collection.first().guild, {});
			textChannel = await client.channels.fetch(logs.loggingChannelID);

			const msgEmbed = new Discord.MessageEmbed();
			let msgString = String('');
			msgString = `__**Number of Messages:**__ ${collection.size}\n`;

			msgEmbed.setTitle('__**Messages Bulk Deleted:**__').setTimestamp(Date()).setDescription(msgString).setColor([0, 0, 255]);
			await textChannel.send(msgEmbed);

			const keyArray = collection.keyArray();
			for (let x = 0; x < keyArray.length; x += 1) {
				const currentMessage = collection.get(keyArray[x]);
				if (currentMessage.content !== '') {
					let msgString2 = `__**Message Author:**__ <@!${currentMessage.author.id}> (${currentMessage.author.tag})\n`;
					msgString2 += `__**Message Id:**__ ${currentMessage.id}\n`;
					msgString2 += `__**Message Content:**__ ${currentMessage.content}`;
					msgEmbed.setTitle(`__**Deleted Message: ${x + 1} of ${keyArray.length}**__`).setTimestamp(Date()).setDescription(msgString2).setColor([0, 0, 255]);
					await textChannel.send(msgEmbed);
				}
				if (currentMessage.embeds.length > 0) {
					const msgEmbed2 = currentMessage.embeds[0];
					await textChannel.send(`Message Content: ${x + 1} of ${keyArray.length}`, { embed: msgEmbed2 });
				}
			}

			return this.name;
		} catch (error) {
			return new Promise((resolve, reject) => {
				reject(error);
			});
		}
	},
};
