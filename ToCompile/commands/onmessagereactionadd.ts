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
    discordUser: DiscordUser): Promise<FoundationClasses.CommandReturnData> {
	try {
		const commandReturnData: FoundationClasses.CommandReturnData = {
			commandName: command.name
		};
		
		const guildData = new GuildData({dataBase: discordUser.dataBase, id: messageReaction.message.guild!.id,
            memberCount: messageReaction.message.guild!.memberCount, name: messageReaction.message.guild!.name});
		await guildData.getFromDataBase();

		if (!(messageReaction instanceof Discord.MessageReaction)) {
			return commandReturnData;
		}
		const userID = (messageReaction.users.cache.array()[messageReaction.users.cache.array().length - 1]!).id;
		for (let x = 0; x < GuildData.guildsData.size; x += 1) {
			if (messageReaction.message.guild!.id !== guildData.id) {
				if (x === GuildData.guildsData.size - 1) {
					break;
				}
				continue;
			}
			if (messageReaction.message.channel.id !== guildData.verificationSystem.channelID) {
				if (x === GuildData.guildsData.size - 1) {
					break;
				}
				continue;
			}
			if (messageReaction.message.id !== guildData.verificationSystem.messageID) {
				if (x === GuildData.guildsData.size - 1) {
					break;
				}
				continue;
			}
			if (messageReaction.emoji.name === guildData.verificationSystem!.emoji && userID !== client.user!.id) {
				const currentGuild = await client.guilds.fetch(guildData.id!);
				const currentGuildMember = currentGuild.members.resolve(userID);
				const currentGuildMemberRoleManager = new Discord
					.GuildMemberRoleManager(currentGuildMember!);

				for (let y = 0; y < guildData.defaultRoleIDs.length; y += 1) {
					await currentGuildMemberRoleManager.add(guildData.defaultRoleIDs[y]!);
					try{
						await messageReaction.users.remove(userID);
					}
					catch(error) {
						if (!(client.guilds.resolve(guildData.id)?.members.resolve(discordUser.userData.userID)?.permissionsIn(messageReaction.message.channel).has('MANAGE_EMOJIS'))) {
							console.log('I\'M MISSING PERMISSIONS REQUIRED FOR DOING THAT!');
						}
					}
					
				}
			} else if (userID !== client.user!.id) {
				await messageReaction.users.remove(userID);
			}
		}
		return commandReturnData;
	} catch (error) {
		return new Promise((resolve, reject) => {
			reject(error);
		});
	}
}
command.function = execute;
export default command as FoundationClasses.BotCommand;
