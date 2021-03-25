//  setverificationsystem.js - Module for my "set verification system" command!.
// Feb 26, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

const Discord = require('discord.js');
const DiscordStuff = require('../DiscordStuff');

module.exports = {
	name: 'setverificationsystem',
	description: '!setverificationsystem = ENABLE, VERIFICATIONMESSAGE, REACTIONEMOJI, in the channel you would like to use for your verification channel!\nAlso, !setverificationsystem = DISABLE.',
	/**
     * @param   {Discord.Message}             message
     * @param   {String[]}                    args
     * @param   {DiscordStuff.DiscordUser}    discordUser
     * @returns {String}
     */
	async execute(message, args, discordUser) {
		try {
			const areWeInADM = await DiscordStuff.areWeInADM(message);

			if (areWeInADM === true) {
				return this.name;
			}

			const doWeHaveAdminPermission = await DiscordStuff
				.doWeHaveAdminPermission(message, discordUser);

			if (doWeHaveAdminPermission === false) {
				return this.name;
			}

			const guildData = await discordUser.getGuildDataFromDB(message.guild);

			let whatAreWeDoing;
			const emojiRegExp = /.{1,26}/;
			if (args[0] === undefined) {
				whatAreWeDoing = 'viewing';
			} else if (args[0].toLowerCase() !== 'enable' && args[0].toLowerCase() !== 'disable') {
				await message.reply("Please enter either 'enable' or 'disable' as the first argument! (!setverificationsystem = ENABLE, VERIFICATIONMESSAGE, REACTIONEMOJI, or !setverificationsystem = DISABLE)");
				await message.delete();
				return this.name;
			} else if (args[0].toLowerCase() === 'enable' && args[1] === undefined) {
				await message.reply('Please, enter a greeting message for the verification system!');
				await message.delete();
				return this.name;
			} else if (args[0].toLowerCase() === 'enable' && (args[2] === undefined || !emojiRegExp.test(args[2]))) {
				await message.reply('Please, enter a valid emoji for them to react with!');
				await message.delete();
				return this.name;
			} else if (args[0].toLowerCase() === 'enable') {
				whatAreWeDoing = 'enable';
			} else if (args[0].toLowerCase() === 'disable') {
				whatAreWeDoing = 'disable';
			}

			let msgString = String('');
			if (whatAreWeDoing === 'viewing') {
				if (guildData.verificationSystem.channelID === null) {
					msgString = '------\n__The verification system is currently disabled.__\n------\n';
				} else {
					const newMessage = await message.fetch(guildData.verificationSystem.messageID);
					msgString = `------\n__**Channel:**__ <#${guildData.verificationSystem.channelID}>\n`;
					msgString += `__**Message Content:**__ ${newMessage.embeds[0].description}\n`;
					msgString += `__**Emoji:**__ ${guildData.verificationSystem.emoji}\n------`;
				}

				const msgEmbed = new Discord.MessageEmbed();
				msgEmbed.setAuthor(message.author.username, message.author
					.avatarURL()).setColor([0, 0, 255]).setTimestamp(Date())
					.setTitle('__**Verification System:**__')
					.setDescription(msgString);
				await message.channel.send(msgEmbed);
				await message.delete();
				return this.name;
			}
			if (whatAreWeDoing === 'disable') {
				if (guildData.verificationSystem.channelID == null) {
					await message.reply('Sorry, it looks as though it is already disabled!');
					await message.delete();
					return this.name;
				}
				const currentChannel = message.client.channels
					.resolve(guildData.verificationSystem.channelID);
				const messageManager = new Discord.MessageManager(currentChannel);

				await messageManager.delete(guildData.verificationSystem.messageID);

				guildData.verificationSystem.channelID = null;
				guildData.verificationSystem.messageID = null;

				msgString = "__**Nicely done! You've disabled the verification system for this server!**__";
				const msgEmbed = new Discord.MessageEmbed();
				msgEmbed.setAuthor(message.author.username, message.author
					.avatarURL()).setColor([0, 0, 255]).setTimestamp(Date())
					.setTitle('__**Set Verification System:**__')
					.setDescription(msgString);
				await message.channel.send(msgEmbed);
				await message.delete();
				return this.name;
			}
			if (whatAreWeDoing === 'enable') {
				if (guildData.defaultRoleIDs.length === 0) {
					await message.reply('Please, first set a default role to be applied to the new member! Using !setdefaultrole.');
					await message.delete();
					return this.name;
				}

				const msgEmbed2 = new Discord.MessageEmbed()
					.setColor([0, 0, 255]).setDescription(args[1]).setTimestamp(Date());
				const newMessage = await message.channel.send(msgEmbed2);
				await newMessage.react(args[2]);

				guildData.verificationSystem.channelID = message.channel.id;
				guildData.verificationSystem.messageID = newMessage.id;
				const argTwo = args[2];
				guildData.verificationSystem.emoji = argTwo;
				discordUser.updateGuildDataInDB(guildData);

				msgString = "__**Nicely done! You've enabled the verification system for this server!**__";
				const msgEmbed = new Discord.MessageEmbed();
				msgEmbed.setAuthor(message.author.username, message.author
					.avatarURL()).setColor([0, 0, 255]).setTimestamp(Date())
					.setTitle('__**Set Verification System:**__')
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
