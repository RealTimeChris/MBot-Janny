// ondisplaynamechange.ts - Module for my "on display name change" commaand.\
// Mar 12, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

import Discord = require('discord.js');
import DiscordUser from '../DiscordUser';
import HelperFunctions from '../HelperFunctions';

const command = new DiscordUser.BotCommand();
command.name = 'ondisplaynamechange';
command.description = "It's an automatic one!";

async function execute(client: Discord.Client, oldGuildMember: Discord.GuildMember,
    newGuildMember: Discord.GuildMember, discordUser: DiscordUser.DiscordUser): Promise<string> {
    try {
        const commandReturnData = new DiscordUser.CommandReturnData();
		commandReturnData.commandName = command.name;
        if (!(oldGuildMember instanceof Discord.GuildMember)) {
            return command.name;
        }

        const guildData = await discordUser.getGuildDataFromDB(oldGuildMember.guild);

        let logs = new DiscordUser.Log();
        for (let x = 0; x < guildData.logs.length; x += 1) {
            if (guildData.logs[x]!.nameSmall === 'displaynamechange') {
                logs = guildData.logs[x]!;
                break;
            }
        }

        const textChannel = await client.channels.fetch(logs.loggingChannelID) as Discord.TextChannel;

        let msgString = '';
        msgString = `__**New Displayname:**__ ${newGuildMember.displayName}\n`;
        msgString += `__**Old Displayname:**__ ${oldGuildMember.displayName}\n`;
        msgString += `__**User:**__ <@!${newGuildMember.id}>\n`;
        msgString += `__**User Tag:**__ ${newGuildMember.user.tag}\n`;
        msgString += `__**Username:**__ ${newGuildMember.user.username}\n`;
        msgString += `__**User ID:**__ ${oldGuildMember.id}\n`;

        const msgEmbed = new Discord.MessageEmbed();
        msgEmbed
            .setColor(newGuildMember.displayColor)
            .setDescription(msgString)
            .setThumbnail(newGuildMember.user.avatarURL()!)
            .setTimestamp(Date() as unknown as Date)
            .setTitle('__**New Displayname:**__');

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
