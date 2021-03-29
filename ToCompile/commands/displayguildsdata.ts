// displayguildsdata.ts - Module for my displayguildsdata command.
// Jan 30, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

import Discord = require('discord.js');
import DiscordStuff = require('../DiscordStuff.js');

const command = new DiscordStuff.BotCommand;
command.name = 'displayguildsdata';
command.description = '!displayguildsdata to display the guild info of the bots in chat!';

/**
 * Displays all of the data for all of the guilds, either in console or in chat.
 */
 export async function execute(commandData :DiscordStuff.CommandData, discordUser: DiscordStuff.DiscordUser): Promise<DiscordStuff.CommandReturnData> {
	try {
		const commandReturnData = new DiscordStuff.CommandReturnData();
		commandReturnData.commandName = command.name;
		let currentCount = 0;
		discordUser.guildsData.forEach(async guild => {
			let msgString = '';
			msgString += `__Guild Name:__ ${guild.guildName}\n`;
			msgString += `__Guild ID:__ ${guild.guildID}\n`;
			msgString += `__Member Count:__ ${guild.guildMemberCount}\n`;

			let currentGuild = new Discord.Guild(commandData.guildMember?.client as Discord.Client, {});

			currentGuild = commandData.guild?.client.guilds.resolve(guild.guildID) as Discord.Guild;

			msgString += `__Created:__ ${currentGuild.createdAt}\n`;
			msgString += `__Guild Owner:__ <@!${(currentGuild.owner as Discord.GuildMember).id}> (${(currentGuild.owner as Discord.GuildMember).user.tag})\n`;

			const messageEmbed = new Discord.MessageEmbed()
				.setThumbnail(currentGuild.iconURL() as string)
				.setTitle(`__**Guild Data ${currentCount + 1} of ${discordUser.guildsData.size}:**__`)
				.setTimestamp((Date() as unknown) as Date)
				.setDescription(msgString);
				
				await DiscordStuff.sendMessageWithCorrectChannel(commandData, messageEmbed);
			currentCount += 1;
		});

		return commandReturnData;
	} catch (error) {
		return new Promise((resolve, reject) => {
			reject(error);
		});
	}
}
command.function = execute;
export default command as DiscordStuff.BotCommand;
