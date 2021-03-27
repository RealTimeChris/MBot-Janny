// purge.ts - Module for my purge messages command.
// Jan 30, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

import Discord = require('discord.js');
import DiscordStuff = require('../DiscordStuff');

const command = new DiscordStuff.BotCommand();
command.name = 'purge';
command.description = '!purge = AMOUNTTODELETE, between 1 and 100 messages!';

/**
 * Purges up to 100 messages from a given channel at a time.
 */
async function execute(message: Discord.Message, args: string[], discordUser: DiscordStuff.DiscordUser): Promise<string> {
	try {
		const areWeInADM = await DiscordStuff.areWeInADM(message);

		if (areWeInADM === true) {
			return command.name;
		}

		const doWeHaveAdminPerms = await DiscordStuff.doWeHaveAdminPermission(message, discordUser);

		if (doWeHaveAdminPerms === false) {
			return command.name;
		}

		const regExp = new RegExp(/\d{1,3}/);

		if (args[0] === undefined || !regExp.test(args[0])
		|| parseInt(args[0], 10) <= 0 || parseInt(args[0], 10) > 100) {
			await message.reply('Please enter a valid number of messages you would like to delete (1, to 100)! (!purge = AMOUNTTODELETE)');
			await message.delete();
			return command.name;
		}
		const deleteCount = parseInt(((args[0].match(regExp) as string[])[0]as string), 10);
        const currentChannel = message.channel as Discord.TextChannel;
        currentChannel.bulkDelete(deleteCount, true);
		const newMessage = await message.reply(`Deleted ${deleteCount.toString()} messages!`);
		newMessage.delete({ timeout: 5000 });
		return command.name;
	} catch (error) {
		return new Promise((resolve, reject) => {
			reject(error);
		});
	}
}
command.function = execute;
export default command as DiscordStuff.BotCommand;
