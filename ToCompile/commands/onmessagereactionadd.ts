// onmessagereactionadd.ts - Module for my "on message reaction add" command.
// Feb 28, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

import Discord = require('discord.js');
import DiscordStuff = require('../DiscordStuff.js');

const command = new DiscordStuff.BotCommand();
command.name = 'onmessagereactionadd';
command.description = "It's an automatic one!";

async function execute(messageReaction: Discord.MessageReaction, client: Discord.Client, args: string[],
    discordUser: DiscordStuff.DiscordUser): Promise<string> {
	try {
		const guildData = await discordUser.getGuildDataFromDB(messageReaction.message.guild as Discord.Guild);

		if (messageReaction instanceof Discord.MessageReaction === false) {
			return command.name;
		}
		const userID = (messageReaction.users.cache
			.array()[messageReaction.users.cache.array().length - 1] as Discord.User).id;
		for (let x = 0; x < discordUser.guildsData.size; x += 1) {
			if ((messageReaction.message.guild as Discord.Guild).id !== guildData.guildID) {
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
				.verificationSystem.emoji && userID !== (client.user as Discord.User).id) {
				const currentGuild = await client.guilds.fetch(guildData.guildID);
				const currentGuildMember = currentGuild.members.resolve(userID);
				const currentGuildMemberRoleManager = new Discord
					.GuildMemberRoleManager(currentGuildMember as Discord.GuildMember);

				for (let y = 0; y < guildData.defaultRoleIDs.length; y += 1) {
					await currentGuildMemberRoleManager.add(guildData.defaultRoleIDs[y] as string);
					await messageReaction.users.remove(userID);
				}
			} else if (userID !== (client.user as Discord.User).id) {
				await messageReaction.users.remove(userID);
			}
		}
		return command.name;
	} catch (error) {
		return new Promise((resolve, reject) => {
			reject(error);
		});
	}
}
command.function = execute;
export default command as DiscordStuff.BotCommand;
