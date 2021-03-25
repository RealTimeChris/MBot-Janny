// trackuser.js - Module for my track user command.
// Jan 30, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

const Discord = require('discord.js');
const DiscordStuff = require('../DiscordStuff');

module.exports = {
	name: 'trackuser',
	description: '!trackuser = ADD, @USERMENTION to track the user within the current text channel.\n\t!trackuser = REMOVE, @USERMENTION to stop tracking the user\n\t!trackuser to display all of the currently tracked users.',
	/**
     * Deals with the setting of a user's tracking status.
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

			const doWeHaveAdminPermission = await DiscordStuff
			 .doWeHaveAdminPermission(message, discordUser);

			if (doWeHaveAdminPermission === false) {
				return this.name;
			}

			const userMentionRegExp = /.{2,3}\d{18}>/;
			const idRegExp = /\d{18}/;
			let whatAreWeDoing = String('');
			let trackedUserID = String('');
			if (args[0] !== undefined && (args[0].toLowerCase() !== 'add' && args[0].toLowerCase() !== 'remove')) {
				await message.reply('Please enter either add or remove for the first argument! (!trackuser = ADDorREMOVE, @USERMENTION, or just !trackuser)');
				await message.delete();
				return this.name;
			}
			if (args[0] !== undefined && (args[1] === undefined || !userMentionRegExp.test(args[1]))) {
				await message.reply('Please enter a valud usermention! (!trackuser = ADDorREMOVE, @USERMENTION, or just !trackuser)');
				await message.delete();
				return this.name;
			}

			if (args[0] !== undefined) {
				whatAreWeDoing = args[0].toLowerCase();
			} else {
				whatAreWeDoing = undefined;
			}

			if (args[1] !== undefined) {
				const argOne = args[1];
				const trackedUserIDOne = argOne.match(idRegExp)[0];
				trackedUserID = trackedUserIDOne;
			}

			const userData = await discordUser.getUserDataFromDB(message.client);
			if (userData.trackedUserIDs !== undefined) {
				for (let x = 0; x < userData.trackedUserIDs.length; x += 1) {
					let isUserFound = false;
					for (let y = 0; y < message.client.guilds.cache.size; y += 1) {
						const currentGuild = message.client.guilds.resolve(userData.trackingGuildIDs[x]);
						if (currentGuild != null) {
							for (let z = 0; z < currentGuild.memberCount; z += 1) {
								const currentUser = currentGuild.members.resolve(userData.trackedUserIDs[x]);
								if (currentUser != null) {
									isUserFound = true;
								}
							}
						}
					}
					if (isUserFound === false) {
						await message.reply(`Removing user ${userData.trackedUserNames[x]} from the list of tracked users!`);
						userData.trackedUserIDs.splice(x, 1);
						userData.trackedUserNames.splice(x, 1);
						userData.trackingChannelIDs.splice(x, 1);
						userData.trackingGuildIDs.splice(x, 1);
						discordUser.updateUserDataInDB(userData, message.client);
					}
				}
			}

			const guildData = {};
			let currentGuild = new Discord.Guild(message.client, guildData);
			currentGuild = message.client.guilds.resolve(message.guild.id);

			const currentTextChannelData = {};
			let currentTextChannel = new Discord.TextChannel(currentGuild, currentTextChannelData);
			currentTextChannel = message.client.channels.resolve(message.channel.id);

			if (whatAreWeDoing === 'add') {
				try {
					const currentGuildMember = await currentGuild.members.fetch(trackedUserID);

					if (userData.trackedUserIDs.indexOf(trackedUserID) === -1) {
						userData.trackedUserIDs.length += 1;
						userData.trackedUserIDs[userData.trackedUserIDs.length - 1] = currentGuildMember
							.user.id;

						userData.trackedUserNames.length += 1;
						userData.trackedUserNames[userData.trackedUserNames.length - 1] = currentGuildMember
							.user.username;

						userData.trackingChannelIDs.length += 1;
						userData.trackingChannelIDs[userData.trackingChannelIDs.length - 1] = message
							.channel.id;

						userData.trackingGuildIDs.length += 1;
						userData.trackingGuildIDs[userData.trackingGuildIDs.length - 1] = message.guild.id;

						discordUser.updateUserDataInDB(userData, message.client);

						const msgString = `${'User <@!'}${currentGuildMember.id.toString()}> is now being tracked, in channel ${
							currentTextChannel.name.toString()}.`;

						const messageEmbed = new Discord.MessageEmbed().setTimestamp(Date()).setTitle('__**New Tracked User:**__')
							.setDescription(msgString)
							.setAuthor(message.author.username, message.author.avatarURL())
							.setThumbnail(currentGuildMember.user.avatarURL())
							.setColor([254, 254, 254]);
						await currentTextChannel.send(`<@!${message.author.id}>, attention!`, { embed: messageEmbed }, { split: true });
					} else if (userData.trackedUserIDs.indexOf(trackedUserID) >= 0) {
						await message.reply('That user is already being tracked! I will update their tracking channel though!');

						const currentIndex = userData.trackedUserIDs.indexOf(trackedUserID);

						userData.trackingGuildIDs[currentIndex] = message.guild.id;
						userData.trackingChannelIDs[currentIndex] = message.channel.id;

						discordUser.updateUserDataInDB(userData, message.client);
					}
				} catch (error) {
					await message.reply('Sorry, but the specified user could not be found!');
				}
				await message.delete();
				return this.name;
			}
			if (whatAreWeDoing === 'remove') {
				try {
					const currentGuildMember = await currentGuild.members.fetch(trackedUserID);

					if (args[0].toLowerCase() === 'remove' && userData.trackedUserIDs.length >= 1) {
						const currentIndex = userData.trackedUserIDs.indexOf(trackedUserID);

						if (currentIndex >= 0) {
							userData.trackedUserIDs.splice(currentIndex, 1);
							userData.trackedUserNames.splice(currentIndex, 1);
							userData.trackingGuildIDs.splice(currentIndex, 1);
							userData.trackingChannelIDs.splice(currentIndex, 1);
							discordUser.updateUserDataInDB(userData, message.client);

							let msgString = `User #${currentIndex.toString()} is no longer being tracked! Their name is: ${currentGuildMember.user.username}.\n`;

							if (userData.trackedUserIDs.length === 0) {
								msgString += '------\nNo more users are being tracked!\n';
							}

							const messageEmbed = new Discord.MessageEmbed().setTimestamp(Date()).setTitle('__**Removed Tracked User:**__')
								.setDescription(msgString)
								.setAuthor(message.author.username, message.author.avatarURL())
								.setColor([254, 254, 254]);
							await currentTextChannel.send(`<@!${message.author.id}>, attention!`, { embed: messageEmbed }, { split: true });
						} else if (currentIndex === -1) {
							await message.reply('There is noone by that ID being tracked!');
						}
					} else if (args[0].toLowerCase() === 'remove' && userData.trackedUserIDs.length === 0) {
						const msgString = 'There is noone to remove from the tracked users!';

						const messageEmbed = new Discord.MessageEmbed().setTimestamp(Date()).setTitle('__**No Tracked Users:**__')
							.setDescription(msgString)
							.setAuthor(message.author.username, message.author.avatarURL())
							.setColor([254, 254, 254]);
						await currentTextChannel.send(`<@!${message.author.id}>, attention!`, { embed: messageEmbed }, { split: true });
					}
				} catch (error) {
					await message.reply('Sorry, but the specified user could not be found!');
				}
				await message.delete();
				return this.name;
			}
			if (args[0] === undefined) {
				let msgString = String('');

				if (userData.trackedUserIDs.length > 0) {
					for (let x = 0; x < userData.trackedUserIDs.length; x += 1) {
						if (userData.trackingGuildIDs[x] === message.guild.id) {
							const trackedGuildName = message.client.guilds
								.resolve(userData.trackingGuildIDs[x]).name;

							const trackedChannelName = message.client.channels
								.resolve(userData.trackingChannelIDs[x]).name;

							msgString += `__**Tracked User Name #${x.toString()}:**__ ${userData.trackedUserNames[x].toString()}\n`;
							msgString += `In channel ${trackedChannelName} of the server ${trackedGuildName}\n`;
						}
					}
				} else {
					msgString += 'Noone is being tracked, currently!';
				}

				const messageEmbed = new Discord.MessageEmbed().setTitle('__**Tracked Users:**__').setTimestamp(Date())
					.setDescription(msgString)
					.setAuthor(message.author.username, message.author.avatarURL())
					.setColor([254, 254, 254]);
				await currentTextChannel.send(messageEmbed);
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
