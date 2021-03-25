// onmessagereactionadd.js - Module for my "on message reaction add" command.
// Feb 28, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

const Discord = require('discord.js');

module.exports = {
	name: 'onmessagereactionadd',
	description: "It's an automatic one!",
	/**
     * @param   {Discord.MessageReaction}       messageReaction
     * @param   {String[]}                      args
     * @param   {Discord.Client}                client
     * @param   {DiscordStuff.DiscordUser}      discordUser
     * @returns {String}
     */
	async execute(messageReaction, client, args, discordUser) {
		try {
			const guildData = await discordUser.getGuildDataFromDB(messageReaction.message.guild);

			if (messageReaction instanceof Discord.MessageReaction === false) {
				return this.name;
			}
			const userID = messageReaction.users.cache
				.array()[messageReaction.users.cache.array().length - 1].id;
			for (let x = 0; x < discordUser.guildsData.size; x += 1) {
				if (messageReaction.message.guild.id !== guildData.guildID) {
					if (x === discordUser.guildsData.size - 1) {
						break;
					}
					continue;
				}
				if (messageReaction.message.channel.id !== guildData.verificationSystem.channelID) {
					if (x === discordUser.guildsData.size - 1) {
						break;
					}
					continue;
				}
				if (messageReaction.message.id !== guildData.verificationSystem.messageID) {
					if (x === discordUser.guildsData.size - 1) {
						break;
					}
					continue;
				}
				if (messageReaction.emoji.name === guildData
					.verificationSystem.emoji && userID !== client.user.id) {
					const currentGuild = await client.guilds.fetch(guildData.guildID);
					const currentGuildMember = currentGuild.members.resolve(userID);
					const currentGuildMemberRoleManager = new Discord
						.GuildMemberRoleManager(currentGuildMember);

					for (let y = 0; y < guildData.defaultRoleIDs.length; y += 1) {
						await currentGuildMemberRoleManager.add(guildData.defaultRoleIDs[y]);
						await messageReaction.users.remove(userID);
					}
				} else if (userID !== client.user.id) {
					await messageReaction.users.remove(userID);
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
