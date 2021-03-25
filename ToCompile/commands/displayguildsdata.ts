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
     * @param   {Discord.Message}             message
     * @param   {String[]}                    args
     * @param   {DiscordStuff.DiscordUser}    discordUser
     * @returns {Promise<string>}
     */
 export async function execute(message: Discord.Message, args: string[], discordUser: DiscordStuff.DiscordUser): Promise<string> {
	try {
		let currentCount = 0;
		discordUser.guildsData.forEach(guild => {
			let msgString = String('');
			msgString += `__Guild Name:__ ${guild.guildName}\n`;
			msgString += `__Guild ID:__ ${guild.guildID}\n`;
			msgString += `__Member Count:__ ${guild.guildMemberCount}\n`;

			const { guildID } = guild;
			let currentGuild = new Discord.Guild(message.client, {});

			currentGuild = message.client.guilds.resolve(guildID as Discord.GuildResolvable) as Discord.Guild;

			msgString += `__Created:__ ${currentGuild.createdAt}\n`;
			msgString += `__Guild Owner:__ <@!${(currentGuild.owner as Discord.GuildMember).id}> (${(currentGuild.owner as Discord.GuildMember).user.tag})\n`;

			console.log(msgString);
			const messageEmbed = new Discord.MessageEmbed()
				.setThumbnail(currentGuild.iconURL() as string)
				.setTitle(`__**Guild Data ${currentCount + 1} of ${discordUser.guildsData.size}:**__`)
				.setTimestamp((Date() as unknown) as Date)
				.setDescription(msgString);

			message.channel.send(messageEmbed);
			currentCount += 1;
		});

		if (message.channel.type !== 'dm') {
			await message.delete();
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
