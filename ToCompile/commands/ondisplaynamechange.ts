// ondisplaynamechange.ts - Module for my "on display name change" commaand.\
// Mar 12, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

import Discord = require('discord.js');
import DiscordStuff = require('../DiscordStuff');

const command = new DiscordStuff.BotCommand();
command.name = 'ondisplaynamechange';
command.description = "It's an automatic one!";

async function execute(client: Discord.Client, oldGuildMember: Discord.GuildMember,
    newGuildMember: Discord.GuildMember, discordUser: DiscordStuff.DiscordUser): Promise<string> {
    try {
        if (!(oldGuildMember instanceof Discord.GuildMember)) {
            return command.name;
        }

        const guildData = await discordUser.getGuildDataFromDB(oldGuildMember.guild);

        let logs = new DiscordStuff.Log();
        for (let x = 0; x < guildData.logs.length; x += 1) {
            if ((guildData.logs[x] as DiscordStuff.Log).nameSmall === 'displaynamechange') {
                logs = guildData.logs[x] as DiscordStuff.Log;
                break;
            }
        }

        const textChannel = await client.channels.fetch(logs.loggingChannelID) as Discord.TextChannel;

        let msgString = String('');
        msgString = `__**New Displayname:**__ ${newGuildMember.displayName}\n`;
        msgString += `__**Old Displayname:**__ ${oldGuildMember.displayName}\n`;
        msgString += `__**User:**__ <@!${newGuildMember.id}>\n`;
        msgString += `__**User Tag:**__ ${newGuildMember.user.tag}\n`;
        msgString += `__**Username:**__ ${newGuildMember.user.username}\n`;
        msgString += `__**User ID:**__ ${oldGuildMember.id}\n`;

        const msgEmbed = new Discord.MessageEmbed();
        msgEmbed.setColor(newGuildMember.displayColor)
            .setDescription(msgString).setThumbnail((newGuildMember.user as Discord.User).avatarURL() as string)
            .setTimestamp((Date() as unknown) as Date)
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
export default command as DiscordStuff.BotCommand;
