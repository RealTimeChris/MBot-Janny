// onguilddelete.js - Module for my "on guild delete" command.
// Feb 22, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

const DiscordStuff = require('../DiscordStuff');

module.exports = {
	name: 'onguilddelete',
	description: "It's an automatic one!",
	/**
     * @param   {Discord.Guild}             guild
     * @param   {DiscordStuff.DiscordUser}  discordUser
     * @returns {String}
     */
	async execute(guild, discordUser) {
		try {
			if (!(discordUser instanceof DiscordStuff.DiscordUser)) {
				return this.name;
			}

			const serverRecordKey = `${guild.id} + Record`;

			const serverRecordString = await discordUser.dataBase.get(serverRecordKey);
			const serverRecordObject = JSON.parse(serverRecordString);

			if (serverRecordObject.replacementServerInvite.length >= 2) {
				discordUser.userData.activeInviteGuilds.push(guild.id);
				discordUser.updateUserDataInDB(discordUser.userData, guild.client);
			}
			return this.name;
		} catch (error) {
			return new Promise((resolve, reject) => {
				reject(error);
			});
		}
	},
};
