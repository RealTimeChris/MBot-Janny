// listdbguilds.js - Module for my "list db guilds" command.
// Mar 21, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

const DiscordStuff = require('../DiscordStuff');

module.exports = {
	name: 'listdbguilds',
	descriptions: '!listdbguilds, to list guilds that this bot is no longer in!',
	/**
	 * @param {Discord.Message} message
	 * @param {String[]} args
	 * @param {DiscordStuff.DiscordUser} discordUser
	 */
	async execute(message, args, discordUser) {
		try {
			const areWeAnAdmin = await DiscordStuff.doWeHaveAdminPermission(message, discordUser);

			if (!areWeAnAdmin) {
				return this.name;
			}

			if (args[0] === undefined) {
				await message.reply('Please, enter a bot to list the keys from! (!listdbguilds = BOTNAME)');
				if (message.deletable) {
					await message.delete();
				}
				return this.name;
			}
			if (args[0].toLowerCase() !== 'janny' && args[0].toLowerCase() !== 'musichouse' && args[0].toLowerCase() !== 'gamehouse') {
				await message.reply('Please, enter a bot to list the keys from! (!listdbguilds = BOTNAME)');
				if (message.deletable) {
					await message.delete();
				}
				return this.name;
			}
			if (args[0].toLowerCase() !== 'janny') {
				return this.name;
			}

			const guildsArray = message.client.guilds.cache.array();

			discordUser.dataBase.createReadStream()
				.on('data', (data) => {
					if (data.key.length === 18 && data.key !== discordUser.userData.userID) {
						let isItFound = false;
						for (let x = 0; x < guildsArray.length; x += 1) {
							if (data.key === guildsArray[x].id) {
								isItFound = true;
							}
						}
						if (isItFound === false) {
							message.reply(`Guild Name: ${JSON.parse(data.value).guildName}\nGuild ID: ${JSON.parse(data.value).guildID}`);
						}
					}
				})
				.on('error', (err) => {
					console.log('Oh my!', err);
				})
				.on('close', () => {
					console.log('Stream closed');
				})
				.on('end', async () => {
					console.log('Stream ended');
				});

			await message.delete();
			return this.name;
		} catch (error) {
			return new Promise((resolve, reject) => {
				reject(error);
			});
		}
	},
};
