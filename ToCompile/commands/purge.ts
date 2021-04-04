// purge.ts - Module for my purge messages command.
// Jan 30, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

import Discord = require('discord.js');
import DiscordStuff = require('../DiscordStuff');

const command = new DiscordStuff.BotCommand();
command.name = 'purge';
command.description = '!purge = AMOUNTTODELETE, between 1 and 100 messages!';

/**
 * Purges up to 100 messages from a given channel at a time.
 */
async function execute(commandData: DiscordStuff.CommandData, discordUser: DiscordStuff.DiscordUser): Promise<DiscordStuff.CommandReturnData> {
	try {
		const commandReturnData = new DiscordStuff.CommandReturnData();
		commandReturnData.commandName = command.name;
		const areWeInADM = await DiscordStuff.areWeInADM(commandData);

		if (areWeInADM === true) {
			return commandReturnData;
		}

		const doWeHaveAdminPerms = await discordUser.doWeHaveAdminPermission(commandData);

		if (doWeHaveAdminPerms === false) {
			return commandReturnData;
		}

		const guildData = await discordUser.getGuildDataFromDB(commandData.guild!);

		const regExp = new RegExp(/\d{1,3}/);
		if (commandData.args[0] === undefined || !regExp.test(commandData.args[0])
		|| parseInt(commandData.args[0], 10) <= 0 || parseInt(commandData.args[0], 10) > 100) {
			const msgString = '------\n**Please enter a valid number of messages you would like to delete (1, to 100)! (!purge = AMOUNTTODELETE)**\n------';
			let msgEmbed = new Discord.MessageEmbed()
				.setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
				.setColor(guildData.borderColor as [number, number, number])
				.setDescription(msgString)
				.setTimestamp(Date() as unknown as Date)
				.setTitle('__**Missing Or Invalid Arguments:**__')
			let msg = await DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed);
			if (commandData.toTextChannel instanceof Discord.WebhookClient){
				msg = new Discord.Message(commandData.guild!.client, msg, commandData.fromTextChannel!);
			}
			await msg.delete({timeout: 20000});
			return commandReturnData;
		}
		const deleteCount = parseInt(commandData.args[0].toString().match(regExp)![0]!, 10);
		let currentChannel = await commandData.guildMember!.client.channels.fetch(commandData.fromTextChannel!.id) as Discord.TextChannel;
        await currentChannel.bulkDelete(deleteCount, true);
		const msgString = `<@!${commandData.guildMember!.id}> I've just deleted ${deleteCount} messages from this channel!`;
		let msgEmbed = new Discord.MessageEmbed()
				.setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
				.setColor(guildData.borderColor as [number, number, number])
				.setDescription(msgString)
				.setTimestamp(Date() as unknown as Date)
				.setTitle('__**Messages Purged:**__');
		const newMessage = await DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed);
		await newMessage.delete({timeout: 5000});
		return commandReturnData;
	} catch (error) {
		return new Promise((resolve, reject) => {
			reject(error);
		});
	}
}
command.function = execute;
export default command as DiscordStuff.BotCommand
