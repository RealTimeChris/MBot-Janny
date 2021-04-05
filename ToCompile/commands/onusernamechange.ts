// onusernamechange.ts - Module for my "on username change" commaand.
// Mar 12, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

import Discord = require('discord.js');
import DiscordUser from '../DiscordUser';
import HelperFunctions from '../HelperFunctions';

const command = new DiscordUser.BotCommand();
command.name = 'onusernamechange';
command.description = "It's an automatic one!";

async function execute(client: Discord.Client, oldUser: Discord.User, newUser: Discord.User, guild: Discord.Guild,
    discordUser: DiscordUser.DiscordUser): Promise<string> {
    try {
        const commandReturnData = new DiscordUser.CommandReturnData();
		commandReturnData.commandName = command.name;
        if (!(oldUser instanceof Discord.User)) {
            return command.name;
        }

        const guildData = await discordUser.getGuildDataFromDB(guild);

        let logs = new DiscordUser.Log();
        for (let x = 0; x < guildData.logs.length; x += 1) {
            if (guildData.logs[x]!.nameSmall === 'usernamechange') {
                logs = guildData.logs[x]!;
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
            .setColor(guildData.borderColor as [number, number, number])
            .setDescription(msgString)
            .setThumbnail(newUser.avatarURL()!)
            .setTimestamp(Date() as unknown as Date)
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
export default command as DiscordUser.BotCommand;
