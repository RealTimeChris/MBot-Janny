// ping.ts - Module for the "ping - pong" command.
// Jan 29, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

import Discord = require('discord.js');
import DiscordStuff = require('../DiscordStuff.js');

const command = new DiscordStuff.BotCommand();
command.name = 'ping';
command.description = 'Simply enter !ping';

/**
 * A testing function for the early implementation of the command handler.
 */
async function execute(message: Discord.Message): Promise<string> {
    try {
        await message.reply('Pong!');
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