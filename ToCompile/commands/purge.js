// purge.js - Module for my purge messages command.
// Jan 30, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

const DiscordStuff = require('../DiscordStuff');

module.exports = {
	name: 'purge',
	description: '!purge = AMOUNTTODELETE, between 1 and 100 messages!',
	/**
     * Purges up to 100 messages from a given channel at a time.
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

			const doWeHaveAdminPerms = await DiscordStuff.doWeHaveAdminPermission(message, discordUser);

			if (doWeHaveAdminPerms === false) {
				return this.name;
			}

			const regExp = new RegExp(/\d{1,3}/);

			if (args[0] === undefined || !regExp.test(args[0])
			|| parseInt(args[0], 10) <= 0 || parseInt(args[0], 10) > 100) {
				await message.reply('Please enter a valid number of messages you would like to delete (1, to 100)! (!purge = AMOUNTTODELETE)');
				await message.delete();
				return this.name;
			}
			const deleteCount = parseInt(args[0].match(regExp)[0], 10);
			message.channel.bulkDelete(deleteCount, true);
			const newMessage = await message.reply(`Deleted ${deleteCount.toString()} messages!`);
			newMessage.delete({ timeout: 5000 });
			return this.name;
		} catch (error) {
			return new Promise((resolve, reject) => {
				reject(error);
			});
		}
	},
};
