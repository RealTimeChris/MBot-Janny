// onmessageupdate.ts - Module for my "on message update" command.
// Mar 12, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

import Discord = require('discord.js');
import DiscordStuff = require('../DiscordStuff');

const command = new DiscordStuff.BotCommand();
command.name = 'onmessageupdate';
command.description = "It's an automatic one!";

/**
 * @param {Discord.Client}              client
 * @param {Discord.Message}             oldMessage
 * @param {Discord.Message}             newMessage
 * @param {DiscordStuff.DiscordUser}    discordUser
 * @returns {Promise<string>}
 */
export async function execute(client: Discord.Client, oldMessage: Discord.Message, newMessage: Discord.Message,
    discordUser: DiscordStuff.DiscordUser): Promise<string> {
    try {
        if (!(newMessage instanceof Discord.Message)) {
            return command.name;
        }

        const guildData = await discordUser.getGuildDataFromDB(newMessage.guild as Discord.Guild);

        let logs = new DiscordStuff.Log();
        for (let x = 0; x < guildData.logs.length; x += 1) {
            if ((guildData.logs[x] as DiscordStuff.Log).nameSmall === 'messageupdate') {
                logs = guildData.logs[x] as DiscordStuff.Log;
                break;
            }
        }

        const textChannel = await client.channels.fetch(logs.loggingChannelID) as Discord.TextChannel;

        const msgEmbed = new Discord.MessageEmbed();
        let msgString = String('');
        msgString = `__**Message Author:**__ <@!${newMessage.author.id}> (${newMessage.author.tag})\n`;
        msgString += `__**Message ID:**__ ${newMessage.id}\n`;
        msgString += `__**Old Content:**__ \n${oldMessage.content}\n`;
        msgString += `__**New Content:**__ ${newMessage.content}`;

        msgEmbed.setTitle('__**Message Updated:**__').setTimestamp((Date() as unknown) as Date).setDescription(msgString).setColor([0, 0, 255]);
        await textChannel.send(msgEmbed);

        for (let x = 0; x < newMessage.embeds.length; x += 1) {
            const msgEmbed2 = newMessage.embeds[0];
            await textChannel.send('Message Content!', { embed: msgEmbed2 });
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
