// ping.js - Module for the "ping - pong" command.
// Jan 29, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

module.exports = {
	name: 'ping',
	description: 'Simply enter !ping',
	/**
     * A testing function for the early implementation of the command handler.
     * @param   {Discord.Message}             message
     * @param   {String[]}                    args
     * @param   {DiscordStuff.DiscordUser}    discordUser
     * @returns {String}
     */
	async execute(message) {
		try {
			await message.reply('Pong!');
			if (message.channel.type !== 'dm') {
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
