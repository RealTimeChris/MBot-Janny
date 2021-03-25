// deletedbentry.js - Module for my "delete db entry" command.
// Mar 18, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

const Discord = require('discord.js');
const DiscordStuff = require('../DiscordStuff');

class DeletedCounter {
	deletedCount = 0;

	data = undefined;

	setData(data) {
		this.data = data;
	}

	getData() {
		return this.data;
	}

	incrementDeletedCount() {
		this.deletedCount += 1;
	}

	returnDeletedCount() {
		return this.deletedCount;
	}
}

async function onData(dbKey, discordUser, deletedCounter) {
	if (deletedCounter.getData() !== undefined && dbKey !== '') {
		if (deletedCounter.getData().key.includes(dbKey)) {
			console.log(deletedCounter.getData().key, '=', JSON.parse(deletedCounter.getData().value));
			await discordUser.dataBase.del(deletedCounter.getData().key);
			deletedCounter.incrementDeletedCount();
		}
	}
}

module.exports = {
	name: 'deletedbentry',
	description: "!deletedbentry = BOTNAME, DBENTRYKEY, where BOTNAME is a bot's name and DBENTRYKEY is the key to a database entry that is stored within the bot!",
	/**
	 * @param 	{Discord.Message} 				message
	 * @param 	{String[]} 								args
	 * @param 	{DiscordStuff.DiscordUser}discordUser
	 * @returns {String}
	 */
	async execute(message, args, discordUser) {
		try {
			const areWeACommander = await DiscordStuff.doWeHaveAdminPermission(message, discordUser);

			if (!areWeACommander) {
				return this.name;
			}

			if (args[0] === undefined) {
				await message.reply('Please, enter a bot to delete the key from! (!deletedbentry = BOTNAME, DBENTRYKEY)');
				if (message.deletable) {
					await message.delete();
				}
				return this.name;
			}
			if (args[0].toLowerCase() !== 'janny' && args[0].toLowerCase() !== 'musichouse' && args[0].toLowerCase() !== 'gamehouse') {
				await message.reply('Please, enter a bot to delete the key from! (!deletedbentry = BOTNAME, DBENTRYKEY)');
				if (message.deletable) {
					await message.delete();
				}
				return this.name;
			}
			if (args[0].toLowerCase() !== 'janny') {
				return this.name;
			}
			if (args[1] === undefined) {
				await message.reply('Please, enter a DB key to search for!');
				if (message.deletable) {
					await message.delete();
				}
				return this.name;
			}

			let dbKey = String('');
			if (args[1] !== undefined) {
				const argZero = args[1].toString();
				dbKey = argZero;
			}

			const deletedCounter = new DeletedCounter();
			await discordUser.dataBase.createReadStream()
				.on('data', async (data) => {
					if (data.key.includes(dbKey)) {
						deletedCounter.setData(data);
						await onData(dbKey, discordUser, deletedCounter);
					}
				})
				.on('error', (err) => {
					console.log('Oh my!', err);
				})
				.on('close', () => {
					console.log('Stream closed');
				})
				.on('end', async () => {
					const msgEmbed = new Discord.MessageEmbed();
					msgEmbed.setAuthor(message.author.username, message.author.avatarURL())
						.setColor([0, 0, 255])
						.setDescription(`------\n__**Number of Deleted Entries**__: ${deletedCounter.returnDeletedCount()}\n------`)
						.setTimestamp(Date.now())
						.setTitle('__**Deleted DB Entries:**__');
					await message.channel.send(msgEmbed);
					console.log('Stream ended');
				});

			if (message.deletable) {
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
