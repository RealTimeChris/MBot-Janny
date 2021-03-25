// onguildmemberadd.js - Module for my "on guild member add" command.
// Mar 12, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

const Discord = require('discord.js');
const DiscordStuff = require('../DiscordStuff');

module.exports = {
	name: 'onguildmemberadd',
	description: "It's an automatic one!",
	/**
     * @param {Discord.Client}          client
     * @param {Discord.GuildMember}     guildMember
     * @param {DiscordStuff.DiscordUser}discordUser
     * @returns {String}
     */
	async execute(client, guildMember, discordUser) {
		try {
			if (!(guildMember instanceof Discord.GuildMember)) {
				return this.name;
			}

			const guildData = await discordUser.getGuildDataFromDB(guildMember.guild);

			await DiscordStuff.applyDefaultRoles(guildData, guildMember);

			let logs = new DiscordStuff.Log();
			for (let x = 0; x < guildData.logs.length; x += 1) {
				if (guildData.logs[x].nameSmall === 'guildmemberadd') {
					logs = guildData.logs[x];
					break;
				}
			}

			if (guildData.verificationSystem.channelID === null) {
				const roleManager = new Discord.GuildMemberRoleManager(guildMember);
				for (let x = 0; x < guildData.defaultRoleIDs.length; x += 1) {
					await roleManager.add(guildData.defaultRoleIDs[x]);
				}
			}

			if (logs.enabled === false) {
				return this.name;
			}

			let textChannel = new Discord.TextChannel(guildMember.guild, {});
			textChannel = await client.channels.fetch(logs.loggingChannelID);

			const currentGuild = await client.guilds.fetch(guildMember.guild.id);

			const msgEmbed = new Discord.MessageEmbed();
			let msgString = `__**Time Joined:**__ ${guildMember.joinedAt}\n`;
			msgString += `__**Member Count**__: ${currentGuild.memberCount}\n`;
			msgString += `__**User:**__ <@!${guildMember.id}>\n`;
			msgString += `__**User Tag:**__ ${guildMember.user.tag}\n`;
			msgString += `__**Username:**__ ${guildMember.user.username}\n`;
			msgString += `__**User ID:**__ ${guildMember.id}\n`;

			msgEmbed.setColor(guildMember.displayColor)
				.setDescription(msgString).setThumbnail(guildMember.user.avatarURL())
				.setTimestamp(Date())
				.setTitle('__**New Guild Member:**__');

			await textChannel.send(msgEmbed);
			return this.name;
		} catch (error) {
			return new Promise((resolve, reject) => {
				reject(error);
			});
		}
	},
};
