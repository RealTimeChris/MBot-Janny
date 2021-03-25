// test.ts - Module for my testing stuff.
// Feb 4, 2021
// Chris M.
// https://github.com/RealTimeChriss

'use strict';

import Discord = require('discord.js');
import DiscordStuff = require('../DiscordStuff.js');

const command = new DiscordStuff.BotCommand();
command.name = 'test';
command.description = '!test';

/**
 * @param   {Discord.Message}             message
 * @param   {String[]}                    args
 * @param   {DiscordStuff.DiscordUser}    discordUser
 * @returns {Promise<string>}
 */
 export async function execute(message: Discord.Message): Promise<string> {
    try {
        if (message.deletable) {
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
