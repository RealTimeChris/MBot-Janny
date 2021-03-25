// message.js - Module for my message command.
// Jan 30, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

module.exports = {
	name: 'message',
	description: 'Command executes automatically upon receiving certain messages!.',
	/**
   * Selects a chosen chat message and sends it via the appropriate channel,
	 * upon recieving a trigger phrase or word.
   * @param   {Discord.Message}           message
   * @param   {String[]}                  args
   * @param   {DiscordStuff.discordUser}  discordUser
   * @returns {String}
   */
	async execute(message) {
		try {
			const number = Math.random() * 100;
			if (message.content != null && message.content !== undefined) {
				if (message.content.toLowerCase().includes('hey ') && number <= 15) {
					await message.reply("Greetings, what's up fellow Discordee?! Can I offer you some drugs?");
				}
			}
			return this.name;
		} catch (error) {
			return new Promise((resolve, reject) => {
				reject(error);
			});
		}
	},
};
