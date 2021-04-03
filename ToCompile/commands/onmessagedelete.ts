// onmessagedelete.ts - Module for my "on message delete" command.
// Mar 12, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

import Discord = require('discord.js');
import DiscordStuff = require('../DiscordStuff');

const command = new DiscordStuff.BotCommand();
command.name = 'onmessagedelete';
command.description = "It's an automatic one!";

async function execute(client: Discord.Client, message: Discord.Message, discordUser: DiscordStuff.DiscordUser): Promise<string> {
    try {
        const commandReturnData = new DiscordStuff.CommandReturnData();
		commandReturnData.commandName = command.name;
        if (!(message.deleted)) {
            return command.name;
        }

        const guildData = await discordUser.getGuildDataFromDB(message.guild as Discord.Guild);

        let logs = new DiscordStuff.Log();
        for (let x = 0; x < guildData.logs.length; x += 1) {
            if ((guildData.logs[x] as DiscordStuff.Log).nameSmall === 'messagedelete') {
                logs = guildData.logs[x] as DiscordStuff.Log;
                break;
            }
        }

        const textChannel = await client.channels.fetch(logs.loggingChannelID) as Discord.TextChannel;

        const msgEmbed = new Discord.MessageEmbed();
        let msgString = String('');
        msgString = `__**Message Author:**__ <@!${message.author.id}> (${message.author.tag})\n`;
        msgString += `__**Message ID:**__ ${message.id}\n`;
        msgString += `__**Content:**__ ${message.content}`;

        msgEmbed
            .setTitle('__**Message Deleted:**__')
            .setTimestamp((Date() as unknown) as Date)
            .setDescription(msgString)
            .setColor([0, 0, 255]);
        await textChannel.send(msgEmbed);

        for (let x = 0; x < message.embeds.length; x += 1) {
            const msgEmbed2 = message.embeds[0];
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
