// deletedbentry.ts - Module for my "delete db entry" command.
// Mar 18, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

import Discord = require('discord.js');
import DiscordStuff = require('../DiscordStuff');

class Data{
	key: string = '';
	value: any;
}

class DeletedCounter {
	deletedCount: number = 0;

	data: Data = new Data();

	setData(key: string, value: any): void {
		const newData = new Data();
		newData.key = key;
		newData.value = value;
		this.data = newData;
	}

	getData(): Data {
		return this.data;
	}

	incrementDeletedCount(): void {
		this.deletedCount += 1;
	}

	returnDeletedCount(): number {
		return this.deletedCount;
	}
}

async function onData(dbKey: string, discordUser: DiscordStuff.DiscordUser, deletedCounter: DeletedCounter): Promise<void> {
	if (deletedCounter.getData() !== undefined && dbKey !== '') {
		if (deletedCounter.getData().key.includes(dbKey)) {
			try{
				console.log(deletedCounter.getData().key, '=', JSON.parse(deletedCounter.getData().value));
				await discordUser.dataBase.del(deletedCounter.getData().key);
				deletedCounter.incrementDeletedCount();
			}
			catch(error){
				if (error.message.includes('Unexpected token')){
					await discordUser.dataBase.del(deletedCounter.getData().key);
					deletedCounter.incrementDeletedCount();
				}
			}
		}
	}
}

const command = new DiscordStuff.BotCommand();
command.name = 'deletedbentry';
command.description = "!deletedbentry = BOTNAME, DBENTRYKEY, where BOTNAME is a bot's name and DBENTRYKEY is the key to a database entry that is stored within the bot!";

/**
	 * @param 	{Discord.Message} 			message
	 * @param 	{String[]} 					args
	 * @param 	{DiscordStuff.DiscordUser}	discordUser
	 * @returns {Promise<strin>}
	 */
 export async function execute(message: Discord.Message, args: string[], discordUser: DiscordStuff.DiscordUser): Promise<string> {
	try {
		const areWeInADM = await DiscordStuff.areWeInADM(message);

		if (areWeInADM){
			return command.name;
		}

		const areWeACommander = await DiscordStuff.doWeHaveAdminPermission(message, discordUser);

		if (!areWeACommander) {
			return command.name;
		}

		if (args[0] === undefined) {
			await message.reply('Please, enter a bot to delete the key from! (!deletedbentry = BOTNAME, DBENTRYKEY)');
			if (message.deletable) {
				await message.delete();
			}
			return command.name;
		}
		if (args[0].toLowerCase() !== 'janny' && args[0].toLowerCase() !== 'musichouse' && args[0].toLowerCase() !== 'gamehouse') {
			await message.reply('Please, enter a bot to delete the key from! (!deletedbentry = BOTNAME, DBENTRYKEY)');
			if (message.deletable) {
				await message.delete();
			}
			return command.name;
		}
		if (args[0].toLowerCase() !== 'gamehouse') {
			return command.name;
		}
		if (args[1] === undefined) {
			await message.reply('Please, enter a DB key to search for!');
			if (message.deletable) {
				await message.delete();
			}
			return command.name;
		}

		let dbKey = String('');
		if (args[1] !== undefined) {
			const argZero = args[1].toString();
			dbKey = argZero;
		}

		const deletedCounter = new DeletedCounter();
		const iterator = discordUser.dataBase.iterate({});
		for await (const {key, value} of iterator){
			console.log(key + ' = ' + value);
            if (key.includes(dbKey)){
				deletedCounter.setData(key, value);
				await onData(dbKey, discordUser, deletedCounter)
			}
        }

		await iterator.end();
		const msgEmbed = new Discord.MessageEmbed();
		msgEmbed.setAuthor(message.author.username, (message.author.avatarURL() as string))
			.setColor([0, 0, 255])
			.setDescription(`------\n__**Number of Deleted Entries**__: ${deletedCounter.returnDeletedCount()}\n------`)
			.setTimestamp(Date.now())
			.setTitle('__**Deleted DB Entries:**__');
		await message.channel.send(msgEmbed);
		
		if (message.deletable) {
			await message.delete();
		}
		return command.name;
	} catch (error) {
		if (message.deletable) {
			await message.delete();
		}
		return new Promise((resolve, reject) => {
			reject(error);
		});
	}
}
command.function = execute;
export default command as DiscordStuff.BotCommand;
