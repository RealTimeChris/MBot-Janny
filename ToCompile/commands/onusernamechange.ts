// onusernamechange.ts - Module for my "on username change" commaand.
// Mar 12, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

import Discord = require('discord.js');
import FoundationClasses from '../FoundationClasses';
import DiscordUser from '../DiscordUser';
import GuildData from '../GuildData';

const command: FoundationClasses.BotCommand = {
    name: 'onusernamechange',
    description: "It's an automatic one!",
    function: Function()
};

async function execute(client: Discord.Client, oldUser: Discord.User, newUser: Discord.User, guild: Discord.Guild,
    discordUser: DiscordUser): Promise<string> {
    try {
        const commandReturnData: FoundationClasses.CommandReturnData = {
            commandName: command.name
        };
		commandReturnData.commandName = command.name;
        if (!(oldUser instanceof Discord.User)) {
            return command.name;
        }

        const guildData = new GuildData({dataBase: discordUser.dataBase, id: guild.id,
            name: guild.name, memberCount: guild.memberCount});
        await guildData.getFromDataBase();

        let logs: FoundationClasses.Log;
        for (let x = 0; x < guildData.logs.length; x += 1) {
            if (guildData.logs[x]!.nameSmall === 'usernamechange') {
                logs = guildData.logs[x]!;
                break;
            }
        }

        const textChannel = await client.channels.fetch(logs!.loggingChannelID) as Discord.TextChannel;

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
export default command as FoundationClasses.BotCommand;
