// oninvitecreate.js - Module for my "on invite create" command.
// Mar 12, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

const Discord = require('discord.js');
const DiscordStuff = require('../DiscordStuff');

module.exports = {
	name: 'oninvitecreate',
	description: "It's an automatic one!",
	/**
     * @param {Discord.Client}              client
     * @param {Discord.Invite}              invite
     * @param {DiscordStuff.DiscordUser}    discordUser
     * @returns {String}
     */
	async execute(client, invite, discordUser) {
		try {
			if (!(invite instanceof Discord.Invite)) {
				return this.name;
			}

			const guildData = await discordUser.getGuildDataFromDB(invite.guild);

			let logs = new DiscordStuff.Log();
			for (let x = 0; x < guildData.logs.length; x += 1) {
				if (guildData.logs[x].nameSmall === 'invitecreate') {
					logs = guildData.logs[x];
					break;
				}
			}

			let textChannel = new Discord.TextChannel(invite.guild, {});
			textChannel = await client.channels.fetch(logs.loggingChannelID);

			const msgEmbed = new Discord.MessageEmbed();
			let msgString = String('');
			msgString = `__**Max Uses:**__ ${invite.maxUses}\n`;
			msgString += `__**Expires At:**__ ${invite.expiresAt}\n`;
			msgString += `__**URL:**__ ${invite.url}\n`;
			msgString += `__**Created By User:**__ <@!${invite.inviter.id}> (${invite.inviter.tag})`;

			msgEmbed.setTitle('__**New Invite:**__').setTimestamp(Date()).setDescription(msgString).setColor([0, 0, 255]);
			await textChannel.send(msgEmbed);
			return this.name;
		} catch (error) {
			return new Promise((resolve, reject) => {
				reject(error);
			});
		}
	},
};
