// serverinfo.js - Module file for my display server info command.
// Jan 29, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

const Discord = require('discord.js');

module.exports = {
	name: 'serverinfo',
	description: '!serverinfo to get info about the current server!\n!serverinfo = SERVERID to display info about that server!',
	/**
     * Displays the info of a chosen server.
     * @param {Discord.Message}             message
     * @param {String[]}                    args
     * @param {DiscordStuff.DiscordUser}    discordUser
     * @returns {String}
     */
	async execute(message, args) {
		try {
			const idRegExp = /\d{18}/;

			let currentServerID;

			if (args[0] === undefined && message.channel.type !== 'dm') {
				currentServerID = message.guild.id;
			} else if (args[0] === undefined && message.channel.type === 'dm') {
				await message.reply('Please enter a valid server ID! (!displayserverinfo = SERVERID)');
				return this.name;
			}	else if (!idRegExp.test(args[0])) {
				await message.reply('Please enter a valid server ID! (!displayserverinfo = SERVERID)');
				if (message.channel.type !== 'dm') {
					await message.delete();
				}
				return this.name;
			}	else {
				const argZero = args[0];
				currentServerID = argZero;
			}

			let serverArray = [new Discord.Guild()];
			serverArray = message.client.guilds.cache.array().sort();

			let currentServer = null;
			for (let x = 0; x < serverArray.length; x += 1) {
				if (currentServerID === serverArray[x].id) {
					currentServer = serverArray[x];
				}
			}

			if (currentServer == null) {
				await message.reply('Sorry! No matching servers were found!');
				if (message.channel.type !== 'dm') {
					await message.delete();
				}
				return this.name;
			}

			let categoryCount = 0;
			let voiceChannelCount = 0;
			let textChannelCount = 0;
			for (let x = 0; x < currentServer.channels.cache.size; x += 1) {
				if (currentServer.channels.cache.array()[x].type === 'voice') {
					voiceChannelCount += 1;
				}
				if (currentServer.channels.cache.array()[x].type === 'text') {
					textChannelCount += 1;
				}
				if (currentServer.channels.cache.array()[x].type === 'category') {
					categoryCount += 1;
				}
			}

			const fields = [];
			const field1 = { name: '__Server Name:__', value: currentServer.name, inline: true };
			fields.push(field1);
			const field2 = { name: '__Server ID:__', value: currentServer.id, inline: true };
			fields.push(field2);
			const field3 = { name: '__Server Member Count:__', value: currentServer.memberCount, inline: true };
			fields.push(field3);
			const field4 = { name: '__Server Owner:__', value: `<@!${currentServer.owner.user.id}> (${currentServer.owner.user.tag})`, inline: true };
			fields.push(field4);
			const field5 = { name: '__Server Owner ID:__', value: currentServer.ownerID, inline: true };
			fields.push(field5);
			const field6 = { name: '__Role Count:__', value: currentServer.roles.cache.size, inline: true };
			fields.push(field6);
			const field7 = { name: '__Channel Category Count:__', value: categoryCount, inline: true };
			fields.push(field7);
			const field8 = { name: '__Text Channel Count:__', value: textChannelCount, inline: true };
			fields.push(field8);
			const field9 = { name: '__Voice Channel Count:__', value: voiceChannelCount, inline: true };
			fields.push(field9);
			const field10 = { name: '__Created At:__', value: currentServer.createdAt, inline: true };
			fields.push(field10);
			const field11 = { name: '__Region:__', value: currentServer.region, inline: true };
			fields.push(field11);

			const messageEmbed = new Discord.MessageEmbed()
				.setImage(currentServer.iconURL())
				.setTitle('__**Server Info:**__')
				.setTimestamp(Date())
				.setAuthor(message.author.username, message.author.avatarURL())
				.setColor([0, 0, 255]);
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
