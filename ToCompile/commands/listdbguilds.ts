// listdbguilds.ts - Module for my "list db guilds" command.
// Mar 21, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

import Discord = require('discord.js');
import DiscordStuff = require('../DiscordStuff');
import Level from "level-ts"

const command = new DiscordStuff.BotCommand();
command.name = 'listdbguilds';
command.description = '!listdbguilds, to list guilds that this bot is no longer in!';

/**
 * @param   {Discord.Message}           message
 * @param   {String[]}                  args
 * @param   {DiscordStuff.DiscordUser}  discordUser
 * @returns {Promise<string>}
 */
export async function execute(message: Discord.Message, args: string[], discordUser: DiscordStuff.DiscordUser): Promise<string> {
	try {
        const areWeInADM = await DiscordStuff.areWeInADM(message);

        if (areWeInADM){
            return command.name;
        }

		const areWeAnAdmin = await DiscordStuff.doWeHaveAdminPermission(message, discordUser);

		if (!areWeAnAdmin) {
			return command.name;
		}

		if (args[0] === undefined) {
			await message.reply('Please, enter a bot to list the keys from! (!listdbguilds = BOTNAME)');
			if (message.deletable) {
				await message.delete();
			}
			return command.name;
		}
		if (args[0].toLowerCase() !== 'janny' && args[0].toLowerCase() !== 'musichouse' && args[0].toLowerCase() !== 'gamehouse') {
			await message.reply('Please, enter a bot to list the keys from! (!listdbguilds = BOTNAME)');
			if (message.deletable) {
				await message.delete();
			}
			return command.name;
		}
		if (args[0].toLowerCase() !== 'janny') {
			return command.name;
		}

		const guildsArray = message.client.guilds.cache.array();

        const iterator = discordUser.dataBase.iterate({});

        for await (const {key, value} of iterator){
            if (key.length === 18 && key !== discordUser.userData.userID) {
                let isItFound = false;
                for (let x = 0; x < guildsArray.length; x += 1) {
                    if (key === (guildsArray[x] as Discord.Guild).id) {
                        isItFound = true;
                    }
                }
                if (isItFound === false) {
                    message.reply(`Guild Name: ${value.guildName}\nGuild ID: ${value.guildID}`);
                }
            }
        }
        await iterator.end();
        
		await message.delete();
		return command.name;
	} catch (error) {
		return new Promise((resolve, reject) => {
			reject(error);
		});
	}
}
command.function = execute;
export default command as DiscordStuff.BotCommand;
