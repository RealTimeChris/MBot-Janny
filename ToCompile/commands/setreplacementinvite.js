// setreplacementinvite.js - Module for my "set replacement invite" command.
// Feb 22, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

const Discord = require('discord.js');
const DiscordStuff = require('../DiscordStuff');

module.exports = {
	name: 'setreplacementinvite',
	description: '!setreplacementinvite = REPLACEMENTINVITELINK\nBe sure to call this from within the chosen server, before it gets nuked!',
	/**
     * @param   {Discord.Message}           message
     * @param   {String[]}                  args
     * @param   {DiscordStuff.DiscordUser}  discordUser
     * @returns {String}
     */
	async execute(message, args, discordUser) {
		try {
			const areWeInADM = await DiscordStuff.areWeInADM(message);

			if (areWeInADM === true) {
				return this.name;
			}

			const doWeHaveAdminPerms = await DiscordStuff.doWeHaveAdminPermission(message, discordUser);

			if (doWeHaveAdminPerms === false) {
				return this.name;
			}

			const inviteRegExp = /https:\/\/discord.gg\/\w{1,26}/;

			let whatAreWeDoing = String('');
			if (args[0] !== undefined && !inviteRegExp.test(args[0])) {
				await message.reply('Please, enter a valid new server invite link! (!setreplacementinvite = REPLACEMENTINVITELINK)');
				await message.delete();
				return this.name;
			}
			if (args[0] === undefined) {
				whatAreWeDoing = 'viewing';
			} else if (args[0] !== undefined && inviteRegExp.test(args[0])) {
				whatAreWeDoing = 'adding';
			}

			const inviteLink = args[0];

			if (whatAreWeDoing === 'viewing') {
				const serverRecordKey = `${message.guild.id} + Record`;
				const serverRecordString = await discordUser.dataBase.get(serverRecordKey);
				const serverRecordObject = JSON.parse(serverRecordString);

				const inviteLink2 = serverRecordObject.replacementServerInvite;

				let msgString = '\n------\n';
				if (inviteLink === '') {
					msgString += "__There's no link to display, currently!__\n------";
				} else {
					msgString += `__**Link:**__ ${inviteLink2}\n------`;
				}

				const messageEmbed = new Discord.MessageEmbed().setAuthor(message.author.username,
					message.author.avatarURL()).setColor([0, 0, 255]).setTimestamp(Date())
					.setTitle('__**Replacement Invite Link:**__')
					.setDescription(msgString);

				await message.channel.send(messageEmbed);
				await message.delete();
				return this.name;
			}
			if (whatAreWeDoing === 'adding') {
				const serverRecordKey = `${message.guild.id} + Record`;
				let serverRecordString = await discordUser.dataBase.get(serverRecordKey);
				const serverRecordObject = JSON.parse(serverRecordString);

				serverRecordObject.replacementServerInvite = inviteLink;

				console.log(serverRecordObject);

				serverRecordString = JSON.stringify(serverRecordObject);

				await discordUser.dataBase.put(serverRecordKey, serverRecordString);

				const msgString = `Great! You've updated the guild ${serverRecordObject.serverName}'s replacement invite link!`
									+ `\n------\n__**Link:**__ ${serverRecordObject.replacementServerInvite}\n------`;

				const messageEmbed = new Discord.MessageEmbed().setAuthor(message.author.username,
					message.author.avatarURL()).setColor([0, 0, 254]).setTimestamp(Date())
					.setTitle('__**Replacement Invite Link Updated:**__')
					.setDescription(msgString);

				await message.channel.send(messageEmbed);
				await message.delete();
				return this.name;
			}
			return this.name;
		} catch (error) {
			if (error.type === 'NotFoundError') {
				await message.reply('Sorry, but your current guild could not be found!');
				await message.delete();
				return this.name;
			}
			return new Promise((resolve, reject) => {
				reject(error);
			});
		}
	},
};
