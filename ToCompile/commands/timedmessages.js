// timedmessages.js - Module for my "timed messages" command.
// Mar 13, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

const Discord = require('discord.js');
const DiscordStuff = require('../DiscordStuff');

module.exports = {
	name: 'timedmessages',
	description: "__**Timed Messages Usage:**__ !timedmessages to view the server's current timed messages.\n"
    + '!timedmessages = ADD, MESSAGENAME, MSBETWEENSENDS, MESSAGECONTENT to add a new message.\nAnd !timedmessages = REMOVE, MESSAGENAME, to remove a timed message!',
	/**
     * @param {Discord.Message}             message
     * @param {String[]}                    args
     * @param {DiscordStuff.DiscordUser}    discordUser
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

			const guildData = await discordUser.getGuildDataFromDB(message.guild);

			let whatAreWeDoing = String('');
			let messageName = String('');
			let msBetweenSends = Number();
			let messageContent = String('');

			if (args[0] === undefined) {
				whatAreWeDoing = 'viewing';
			} else if (args[0].toLowerCase() === 'add') {
				whatAreWeDoing = 'adding';
				const argOne = args[1];
				messageName = argOne;
				msBetweenSends = Math.abs(parseInt(args[2], 10));
				const argThreee = args[3];
				messageContent = argThreee;
			} else if (args[0].toLowerCase() === 'remove') {
				whatAreWeDoing = 'removing';
				const argOne = args[1];
				messageName = argOne;
			} else {
				await message.reply('Please, enter a proper first argument or enter none at all!');
				await message.delete();
				return this.name;
			}

			if (whatAreWeDoing === 'viewing') {
				const embedFields = [];

				for (let x = 0; x < guildData.timedMessages.length; x += 1) {
					const msPerSecond = 1000;
					const secondPerMinute = 60;
					const msPerMinute = msPerSecond * secondPerMinute;
					const minutePerHour = 60;
					const msPerHour = msPerMinute * minutePerHour;

					const timeRemaining = guildData.timedMessages[x]
						.msBetweenSends - (new Date().getTime() - guildData.timedMessages[x].timeOfLastSend);

					const hoursRemaining = Math.trunc(timeRemaining / msPerHour);
					const minutesRemaining = Math.trunc((timeRemaining % msPerHour) / msPerMinute);
					const secondsRemaining = Math.trunc(((timeRemaining % msPerHour)
					% msPerMinute) / msPerSecond);

					const currentField = { name: `__**${guildData.timedMessages[x].name}:**__`, value: `__**ms Between Sends:**__ ${guildData.timedMessages[x].msBetweenSends}\n`, inline: true };
					currentField.value += `__**In Channel:**__ <#${guildData.timedMessages[x].textChannelID}>\n`;
					currentField.value += `__**Content:**__ ${guildData.timedMessages[x].messageContent}\n`;
					currentField.value += `__**Time Until Next Send:**__ ${hoursRemaining} Hours, ${minutesRemaining} Minutes, and ${secondsRemaining} Seconds.`;
					embedFields.push(currentField);
				}

				if (guildData.timedMessages.length === 0) {
					const currentField = { name: '__**Empty:**__', value: 'Sorry, but there are no timed messages!', inline: true };
					embedFields.push(currentField);
				}

				const msgEmbed = new Discord.MessageEmbed();
				msgEmbed.setAuthor(message.author.username, message.author.avatarURL()).setColor([0, 0, 255]).setTimestamp(Date()).setTitle('__**Timed Messages:**__');
				msgEmbed.fields = embedFields;

				await message.channel.send(msgEmbed);
				await message.delete();
				return this.name;
			}
			if (whatAreWeDoing === 'adding') {
				const newTimedMessage = new DiscordStuff.TimedMessage();
				newTimedMessage.name = messageName;
				newTimedMessage.msBetweenSends = msBetweenSends;
				newTimedMessage.textChannelID = message.channel.id;
				newTimedMessage.timeOfLastSend = 0;
				newTimedMessage.messageContent = messageContent;

				guildData.timedMessages.push(newTimedMessage);
				await discordUser.updateGuildDataInDB(guildData);

				const msgEmbed = new Discord.MessageEmbed();
				let msgString = String('');
				msgString = "Congrats, you've just added a new timed message to your server! It is as follows:\n------\n";
				msgString += `__**Name:**__ ${newTimedMessage.name}\n`;
				msgString += `__**ms Between Sends:**__ ${newTimedMessage.msBetweenSends}\n`;
				msgString += `__**In Channel:**__ <#${newTimedMessage.textChannelID}>\n`;
				msgString += `__**Content:**__ ${newTimedMessage.messageContent}\n------`;
				msgEmbed.setAuthor(message.author.username, message.author.avatarURL()).setColor([0, 0, 255]).setTimestamp(Date()).setTitle('__**Timed Message Added:**__')
					.setDescription(msgString);

				await message.channel.send(msgEmbed);
				await message.delete();
				return this.name;
			}
			if (whatAreWeDoing === 'removing') {
				let isItFound = false;
				let currentTimedMessageName = String('');
				for (let x = 0; x < guildData.timedMessages.length; x += 1) {
					if (messageName === guildData.timedMessages[x].name) {
						isItFound = true;
						currentTimedMessageName = guildData.timedMessages[x].name;
						guildData.timedMessages.splice(x, 1);
						await discordUser.updateGuildDataInDB(guildData);
						break;
					}
				}

				if (isItFound === false) {
					await message.reply('Sorry, but the timed message you requested could not be found!');
					await message.delete();
					return this.name;
				}

				const msgEmbed = new Discord.MessageEmbed();
				let msgString = String('');
				msgString = `You've just removed a timed message from your server! It is as follows:\n------\n__**Name:**__ ${currentTimedMessageName}\n------`;
				msgEmbed.setAuthor(message.author.username, message.author.avatarURL()).setColor([0, 0, 255]).setTimestamp(Date()).setTitle('__**Timed Message Removed:**__')
					.setDescription(msgString);

				await message.channel.send(msgEmbed);
				await message.delete();
				return this.name;
			}

			return this.name;
		} catch (error) {
			return new Promise((resolve, reject) => {
				reject(error);
			});
		}
	},
};
