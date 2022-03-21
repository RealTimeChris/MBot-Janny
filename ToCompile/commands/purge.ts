// purge.ts - Module for my purge messages command.
// Jan 30, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

import Discord = require('discord.js');
import FoundationClasses from '../FoundationClasses';
import DiscordUser from '../DiscordUser';
import GuildData from '../GuildData';
import HelperFunctions from '../HelperFunctions';

const command: FoundationClasses.BotCommand = {
	name: 'purge',
	description: '!purge = AMOUNTTODELETE, between 1 and 100 messages!',
	function: Function()
};

/**
 * Purges up to 100 messages from a given channel at a time.
 */
async function execute(commandData: FoundationClasses.CommandData, discordUser: DiscordUser): Promise<FoundationClasses.CommandReturnData> {
	try {
		const commandReturnData: FoundationClasses.CommandReturnData = {
			commandName: command.name
		};
		
		const areWeInADM = await HelperFunctions.areWeInADM(commandData);

		if (areWeInADM === true) {
			return commandReturnData;
		}

		const doWeHaveAdminPerms = await HelperFunctions.doWeHaveAdminPermission(commandData, discordUser);

		if (doWeHaveAdminPerms === false) {
			return commandReturnData;
		}

		const guildData = new GuildData({dataBase: discordUser.dataBase, id: commandData.guild!.id, name: commandData.guild!.name, memberCount: commandData.guild!.memberCount});
		await guildData.getFromDataBase();

		const regExp = new RegExp(/\d{1,3}/);
		if (commandData.args[0] === undefined || !regExp.test(commandData.args[0])
		|| parseInt(commandData.args[0], 10) <= 0 || parseInt(commandData.args[0], 10) > 100) {
			const msgString = '------\n**Please enter a valid number of messages you would like to delete (1, to 100)! (!purge = AMOUNTTODELETE)**\n------';
			let msgEmbed = new Discord.MessageEmbed()
				.setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
				.setColor(guildData.borderColor)
				.setDescription(msgString)
				.setTimestamp(Date() as unknown as Date)
				.setTitle('__**Missing Or Invalid Arguments:**__')
			let msg = await HelperFunctions.sendMessageWithCorrectChannel(commandData, msgEmbed);
			if (commandData.toTextChannel instanceof Discord.WebhookClient) {
				msg = new Discord.Message(commandData.guild!.client, msg, commandData.fromTextChannel!);
			}
			msg.delete({timeout: 20000});
			return commandReturnData;
		}
		const deleteCount = parseInt(commandData.args[0].toString().match(regExp)![0]!, 10);
		let currentChannel = await commandData.guildMember!.client.channels.fetch(commandData.fromTextChannel!.id) as Discord.TextChannel;
        currentChannel.bulkDelete(deleteCount, false);
		const msgString = `<@!${commandData.guildMember!.id}> I've just deleted ${deleteCount} messages from this channel!`;
		let msgEmbed = new Discord.MessageEmbed()
				.setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
				.setColor(guildData.borderColor)
				.setDescription(msgString)
				.setTimestamp(Date() as unknown as Date)
				.setTitle('__**Messages Purged:**__');
		let msg = await HelperFunctions.sendMessageWithCorrectChannel(commandData, msgEmbed);
		if (commandData.toTextChannel instanceof Discord.WebhookClient) {
			msg = new Discord.Message(commandData.guild!.client, msg, commandData.fromTextChannel!);
		}
		await msg.delete({timeout: 5000});
		return commandReturnData;
	} catch (error) {
		return new Promise((resolve, reject) => {
			reject(error);
		});
	}
}
command.function = execute;
export default command as FoundationClasses.BotCommand
