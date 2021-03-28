// onusernamechange.ts - Module for my "on username change" commaand.
// Mar 12, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

import Discord = require('discord.js');
import DiscordStuff = require('../DiscordStuff');

const command = new DiscordStuff.BotCommand();
command.name = 'onusernamechange';
command.description = "It's an automatic one!";

export async function execute(client: Discord.Client, oldUser: Discord.User, newUser: Discord.User, guild: Discord.Guild,
    discordUser: DiscordStuff.DiscordUser): Promise<string> {
    try {
        if (!(oldUser instanceof Discord.User)) {
            return command.name;
        }

        const guildData = await discordUser.getGuildDataFromDB(guild);

        let logs = new DiscordStuff.Log();
        for (let x = 0; x < guildData.logs.length; x += 1) {
            if ((guildData.logs[x] as DiscordStuff.Log).nameSmall === 'usernamechange') {
                logs = guildData.logs[x] as DiscordStuff.Log;
                break;
            }
        }

        const textChannel = await client.channels.fetch(logs.loggingChannelID) as Discord.TextChannel;

        let msgString = '';
        msgString = `__**New Username:**__ ${newUser.username}\n`;
        msgString += `__**Old Username:**__ ${oldUser.username}\n`;
        msgString += `__**User:**__ <@!${newUser.id}>\n`;
        msgString += `__**User Tag:**__ ${newUser.tag}\n`;
        msgString += `__**Username:**__ ${newUser.username}\n`;
        msgString += `__**User ID:**__ ${newUser.id}\n`;

        const msgEmbed = new Discord.MessageEmbed();
        msgEmbed
            .setColor([0, 0, 255])
            .setDescription(msgString)
            .setThumbnail(newUser.avatarURL() as string)
            .setTimestamp((Date() as unknown) as Date)
            .setTitle('__**New Username:**__');

        await textChannel.send(msgEmbed);
        return command.name;
    } catch (error) {
        return new Promise((resolve, reject) => {
            reject(error);
        });
    }
}
command.function = execute;
export default command as DiscordStuff.BotCommand;
