// displayguildsdata.ts - Module for my displayguildsdata command.
// Jan 30, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

import Discord = require('discord.js');
import DiscordUser from '../DiscordUser';
import HelperFunctions from '../HelperFunctions';

const command = new DiscordUser.BotCommand;
command.name = 'displayguildsdata';
command.description = '!displayguildsdata to display the guild info of the bots in chat!';

/**
 * Displays all of the data for all of the guilds, either in console or in chat.
 */
async function execute(commandData :DiscordUser.CommandData, discordUser: DiscordUser.DiscordUser): Promise<DiscordUser.CommandReturnData> {
	try {
		const commandReturnData = new DiscordUser.CommandReturnData();
		commandReturnData.commandName = command.name;
		let currentCount = 0;
		discordUser.guildsData.forEach(guild => {
			let msgString = '';
			msgString += `__Guild Name:__ ${guild.guildName}\n`;
			msgString += `__Guild ID:__ ${guild.guildID}\n`;
			msgString += `__Member Count:__ ${guild.guildMemberCount}\n`;

			commandData.guildMember?.client.guilds.fetch(guild.guildID).then(guild => {
				msgString += `__Created:__ ${guild.createdAt}\n`;
				msgString += `__Guild Owner:__ <@!${guild.owner!.id}> (${guild.owner!.user.tag})\n`;
	
				const messageEmbed = new Discord.MessageEmbed()
					.setColor([254, 254, 254])
					.setThumbnail(guild.iconURL()!)
					.setTitle(`__**Guild Data ${currentCount + 1} of ${discordUser.guildsData.size}:**__`)
					.setTimestamp(Date() as unknown as Date)
					.setDescription(msgString);
					
					HelperFunctions.sendMessageWithCorrectChannel(commandData, messageEmbed);
				currentCount += 1;
			});			
		});

		return commandReturnData;
	} catch (error) {
		return new Promise((resolve, reject) => {
			reject(error);
		});
	}
}
command.function = execute;
export default command as DiscordUser.BotCommand;
