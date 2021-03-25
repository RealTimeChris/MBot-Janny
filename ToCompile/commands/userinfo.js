// userinfo.js - Module for my user info command.
// Jan 29, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

const Discord = require('discord.js');
const DiscordStuff = require('../DiscordStuff');

module.exports = {
	name: 'userinfo',
	description: '!userinfo to display your own info!\nOr !userinfo = @USERMENTION, to display the info of another user!',
	/**
	 * Displays info about a selected user.
	 * @param   {Discord.Message}           message
	 * @param   {String[]}                  args
	 * @param   {DiscordStuff.DiscordUser}  discordUser
	 * @returns {String}
	 */
	async execute(message, args) {
		try {
			const areWeInADM = await DiscordStuff.areWeInADM(message);

			if (areWeInADM === true) {
				return this.name;
			}

			let userID = String('');
			const userMentionRegExp = /.{2,3}\d{18}>/;
			const userIDRegExp = /\d{18}/;
			if (args[0] === undefined) {
				userID = message.author.id;
			} else if (args[0].match(userIDRegExp)[0] === null
				&& args[0].match(userMentionRegExp)[0] === null) {
				await message.reply('Please enter a valid user ID or user mention! (!displayuserinfo = @USERMENTION)');
				await message.delete();
				return this.name;
			} else if (args[0].match(userMentionRegExp) != null) {
				userID = args[0].substring(3, args[0].length - 1);
			} else if (args[0].match(userIDRegExp)[0] != null) {
				const argZero = args[0];
				const userIDOne = argZero.match(userIDRegExp)[0];
				userID = userIDOne;
			}

			const guildMemberManager = new Discord.GuildMemberManager(message.guild);

			let guildMember;
			try {
				guildMember = await guildMemberManager.fetch(userID);
			} catch (error) {
				await message.reply('Sorry, but that user could not be found!');
				await message.delete();
				return this.name;
			}

			const fields = [];
			const field = { name: '__User Tag:__', value: guildMember.user.tag, inline: true };
			fields.push(field);
			const field1 = { name: '__User Name:__', value: guildMember.user.username, inline: true };
			fields.push(field1);
			const field2 = { name: '__Display Name:__', value: guildMember.displayName, inline: true };
			fields.push(field2);
			const field3 = { name: '__User ID:__', value: guildMember.id, inline: true };
			fields.push(field3);
			const field4 = { name: '__Status:__', value: guildMember.presence.status, inline: true };
			fields.push(field4);
			const field5 = { name: '__Joined:__', value: guildMember.joinedAt, inline: true };
			fields.push(field5);
			const permissionsArray = guildMember.permissions.toArray();
			let msgString = String();
			for (let x = 0; x < permissionsArray.length; x += 1) {
				if (permissionsArray[x].split('_')[2] !== undefined) {
					msgString += `${permissionsArray[x].split('_')[0].substr(0, 1)}${permissionsArray[x].split('_')[0].substr(1).toLowerCase()} ${permissionsArray[x]
						.split('_')[1].substr(0, 1)}${permissionsArray[x].split('_')[1].substr(1).toLowerCase()} ${permissionsArray[x].split('_')[2]
						.substr(0, 1)}${permissionsArray[x].split('_')[2].substr(1).toLowerCase()}`;
				} else if (permissionsArray[x].split('_')[1] !== undefined) {
					msgString += `${permissionsArray[x].split('_')[0].substr(0, 1)}${permissionsArray[x].split('_')[0].substr(1).toLowerCase()}	${permissionsArray[x]
						.split('_')[1].substr(0, 1)}${permissionsArray[x].split('_')[1].substr(1).toLowerCase()}`;
				} else {
					msgString += `${permissionsArray[x].split('_')[0].substr(0, 1)}${permissionsArray[x].split('_')[0].substr(1).toLowerCase()}`;
				}
				if (x < permissionsArray.length - 1) {
					msgString += ', ';
				}
			}
			const field6 = { name: '__Roles:__', value: `${guildMember.roles.cache.array()}`, inline: false };
			fields.push(field6);
			const field7 = { name: '__Permissions:__', value: msgString, inline: false };
			fields.push(field7);

			const messageEmbed = new Discord.MessageEmbed();
			messageEmbed
				.setColor(guildMember.displayColor)
				.setTimestamp(Date())
				.setTitle('__**User Info:**__')
				.setImage(guildMember.user.avatarURL())
				.setAuthor(message.author.username, message.author.avatarURL());
			messageEmbed.fields = fields;
			await message.channel.send(messageEmbed);
			await message.delete();
			return this.name;
		} catch (error) {
			return new Promise((resolve, reject) => {
				reject(error);
			});
		}
	},
};
