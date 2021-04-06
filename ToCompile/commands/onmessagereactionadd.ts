// onmessagereactionadd.js - Module for my "on message reaction add" command.
// Feb 28, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

import Discord = require('discord.js');
import FoundationClasses from '../FoundationClasses';
import DiscordUser from '../DiscordUser';
import GuildData from '../GuildData';

const command: FoundationClasses.BotCommand = {
	name: 'onmessagereactionadd',
	description: "It's an automatic one!",
	function: Function()
};

async function execute(messageReaction: Discord.MessageReaction, client: Discord.Client, args: string[],
    discordUser: DiscordUser): Promise<string> {
	try {
		const commandReturnData: FoundationClasses.CommandReturnData = {
			commandName: command.name
		};
		commandReturnData.commandName = command.name;
		const guildData = new GuildData({dataBase: discordUser.dataBase, id: messageReaction.message.guild!.id,
            name: messageReaction.message.guild!.name, memberCount: messageReaction.message.guild!.memberCount});
		await guildData.getFromDataBase();

		if (messageReaction instanceof Discord.MessageReaction === false) {
			return command.name;
		}
		const userID = (messageReaction.users.cache
			.array()[messageReaction.users.cache.array().length - 1]!).id;
		for (let x = 0; x < discordUser.guildsData.size; x += 1) {
			if (messageReaction.message.guild!.id !== guildData.exposeDataValues().id) {
				if (x === discordUser.guildsData.size - 1) {
					break;
				}
				continue;
			}
			if (messageReaction.message.channel.id !== guildData.exposeDataValues().verificationSystem!.channelID) {
				if (x === discordUser.guildsData.size - 1) {
					break;
				}
				continue;
			}
			if (messageReaction.message.id !== guildData.exposeDataValues().verificationSystem!.messageID) {
				if (x === discordUser.guildsData.size - 1) {
					break;
				}
				continue;
			}
			if (messageReaction.emoji.name === guildData.exposeDataValues()
				.verificationSystem!.emoji && userID !== client.user!.id) {
				const currentGuild = await client.guilds.fetch(guildData.exposeDataValues().id!);
				const currentGuildMember = currentGuild.members.resolve(userID);
				const currentGuildMemberRoleManager = new Discord
					.GuildMemberRoleManager(currentGuildMember!);

				for (let y = 0; y < guildData.exposeDataValues().defaultRoleIDs!.length; y += 1) {
					await currentGuildMemberRoleManager.add(guildData.exposeDataValues().defaultRoleIDs![y]!);
					await messageReaction.users.remove(userID);
				}
			} else if (userID !== client.user!.id) {
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
export default command as FoundationClasses.BotCommand;
