// botinfo.js - Module for my display user data function.
// Jan 30, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

const Discord = require('discord.js');

module.exports = {
	name: 'botinfo',
	description: '!botinfo to display info about this bot in chat!',
	/**
     * Displays the data about the currend user.
     * @param   {Discord.Message}             message
     * @param   {String[]}                    args
     * @param   {DiscordStuff.DiscordUser}    discordUser
     * @returns {String}
     */
	async execute(message, args, discordUser) {
		try {
			const fields = [];
			const field1 = { name: '__Bot Name:__', value: discordUser.userData.userName, inline: true };
			fields.push(field1);
			const field2 = { name: '__Bot ID:__', value: discordUser.userData.userID, inline: true };
			fields.push(field2);
			const field3 = { name: '__Guild Count:__', value: discordUser.userData.guildCount, inline: true };
			fields.push(field3);
			const field4 = { name: '__Currency Name:__', value: discordUser.userData.currencyName, inline: true };
			fields.push(field4);

			const messageEmbed = new Discord.MessageEmbed()
				.setImage(message.client.user.avatarURL())
				.setColor([0, 0, 255])
				.setTitle('__**Bot Info:**__')
				.setTimestamp(Date());
			messageEmbed.fields = fields;
			await message.channel.send(messageEmbed);
			if (message.channel.type !== 'dm') {
				await message.delete();
			}
			return this.name;
		} catch (error) {
			return new Promise((resolve, reject) => {
				reject(error);
			});
		}
	},
};
