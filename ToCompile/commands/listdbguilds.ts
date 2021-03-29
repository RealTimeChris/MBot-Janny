// listdbguilds.ts - Module for my "list db guilds" command.
// Mar 21, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

import Discord = require('discord.js');
import DiscordStuff = require('../DiscordStuff');

const command = new DiscordStuff.BotCommand();
command.name = 'listdbguilds';
command.description = '!listdbguilds, to list guilds that this bot is no longer in!';

export async function execute(commandData: DiscordStuff.CommandData, discordUser: DiscordStuff.DiscordUser): Promise<DiscordStuff.CommandReturnData> {
	try {
		const commandReturnData = new DiscordStuff.CommandReturnData();
		commandReturnData.commandName = command.name;
        const areWeInADM = await DiscordStuff.areWeInADM(commandData);

        if (areWeInADM){
            return commandReturnData;
        }

		const areWeAnAdmin = await discordUser.doWeHaveAdminPermission(commandData);

		if (!areWeAnAdmin) {
			return commandReturnData;
		}

		if (commandData.args[0] === undefined) {
			const msgString = 'Please, enter a bot to list the keys from! (!listdbguilds = BOTNAME)';
			await DiscordStuff.sendMessageWithCorrectChannel(commandData, msgString);
			return commandReturnData;
		}
		if (commandData.args[0].toLowerCase() !== 'janny' && commandData.args[0].toLowerCase() !== 'musichouse' && commandData.args[0].toLowerCase() !== 'gamehouse') {
			const msgString = 'Please, enter a bot to list the keys from! (!listdbguilds = BOTNAME)';
			await DiscordStuff.sendMessageWithCorrectChannel(commandData, msgString);
			return commandReturnData;
		}
		if (commandData.args[0].toLowerCase() !== 'janny') {
			return commandReturnData;
		}

		const guildsArray = (commandData.guildMember as Discord.GuildMember).client.guilds.cache.array();

        const iterator = discordUser.dataBase.iterate({});
		let areAnyFound = false;
        for await (const {key, value} of iterator){
            if (key.length === 18 && key !== discordUser.userData.userID) {
                let isItFound = false;
                for (let x = 0; x < guildsArray.length; x += 1) {
                    if (key === (guildsArray[x] as Discord.Guild).id) {
                        isItFound = true;
                    }
                }
				const newValue = value;
                if (isItFound === false) {
					areAnyFound = true;
                    const msgString = `Key: ${key}\nGuild Name: ${newValue.guildName}\nGuild ID: ${newValue.guildID}`;
					await DiscordStuff.sendMessageWithCorrectChannel(commandData, msgString);
                }
            }
        }
        await iterator.end();
        
		if (!areAnyFound){
			const msgEmbed = new Discord.MessageEmbed();
			msgEmbed
				.setAuthor((commandData.guildMember as Discord.User).username, ((commandData.guildMember as Discord.User) as Discord.User).avatarURL()as string)
				.setColor([0, 0, 255])
				.setDescription("------\n__**Looks like there's no unused database entries!**__\n------")
				.setTimestamp((Date() as unknown) as Date)
				.setTitle("__**No Spare Database Entries:**__");
			await DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed);
		}
		return commandReturnData;
	} catch (error) {
		return new Promise((resolve, reject) => {
			reject(error);
		});
	}
}
command.function = execute;
export default command as DiscordStuff.BotCommand;
