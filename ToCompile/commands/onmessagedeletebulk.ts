// onmessagedeletebulk.ts - Module for my "on message delete bulk" command.
// Mar 12, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

import Discord = require('discord.js');
import DiscordStuff = require('../DiscordStuff');

const command = new DiscordStuff.BotCommand();
command.name = 'onmessagedeletebulk';
command.description = "It's an automatic one!";

/**
 * @param {Discord.Client}                              client
 * @param {Discord.Collection<String, Discord.Message>} collection
 * @param {DiscordStuff.DiscordUser}                    discordUser
 * @returns {Promise<string>}
 */
export async function execute(client: Discord.Client, collection: Discord.Collection<string, Discord.Message>,
    discordUser: DiscordStuff.DiscordUser): Promise<string> {
    try {
        if (!(collection instanceof Discord.Collection)) {
            return command.name;
        }

        const guildData = await discordUser.getGuildDataFromDB((collection.first() as Discord.Message).guild as Discord.Guild);

        let logs = new DiscordStuff.Log();
        for (let x = 0; x < guildData.logs.length; x += 1) {
            if ((guildData.logs[x] as DiscordStuff.Log).nameSmall === 'messagedeletebulk') {
                logs = guildData.logs[x] as DiscordStuff.Log;
                break;
            }
        }

        const textChannel = await client.channels.fetch(logs.loggingChannelID) as Discord.TextChannel;

        const msgEmbed = new Discord.MessageEmbed();
        let msgString = String('');
        msgString = `__**Number of Messages:**__ ${collection.size}\n`;

        msgEmbed.setTitle('__**Messages Bulk Deleted:**__').setTimestamp((Date() as unknown) as Date).setDescription(msgString).setColor([0, 0, 255]);
        await textChannel.send(msgEmbed);

        const keyArray = collection.keyArray();
        for (let x = 0; x < keyArray.length; x += 1) {
            const currentMessage = collection.get(keyArray[x] as string);
            if ((currentMessage as Discord.Message).content !== '') {
                let msgString2 = `__**Message Author:**__ <@!${(currentMessage as Discord.Message).author.id}> (${(currentMessage as Discord.Message).author.tag})\n`;
                msgString2 += `__**Message Id:**__ ${(currentMessage as Discord.Message).id}\n`;
                msgString2 += `__**Message Content:**__ ${(currentMessage as Discord.Message).content}`;
                msgEmbed.setTitle(`__**Deleted Message: ${x + 1} of ${keyArray.length}**__`).setTimestamp((Date() as unknown) as Date).setDescription(msgString2).setColor([0, 0, 255]);
                await textChannel.send(msgEmbed);
            }
            if ((currentMessage as Discord.Message).embeds.length > 0) {
                const msgEmbed2 = (currentMessage as Discord.Message).embeds[0];
                await textChannel.send(`Message Content: ${x + 1} of ${keyArray.length}`, { embed: msgEmbed2 });
            }
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
