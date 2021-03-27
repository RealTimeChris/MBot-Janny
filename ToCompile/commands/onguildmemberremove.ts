// onguildmemberremove.ts - Module for my "on guild member remove" command.
// Mar 12, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

import Discord = require('discord.js');
import DiscordStuff = require('../DiscordStuff');

const command = new DiscordStuff.BotCommand();
command.name = 'onguildmemberremove';
command.description = "It's an automatic one!";

 export async function execute(client: Discord.Client, guildMember: Discord.GuildMember,
    discordUser: DiscordStuff.DiscordUser) : Promise<string> {
    try {
        if (!(guildMember instanceof Discord.GuildMember)) {
            return command.name;
        }

        const guildData = await discordUser.getGuildDataFromDB(guildMember.guild);

        let logs = new DiscordStuff.Log();
        for (let x = 0; x < guildData.logs.length; x += 1) {
            if ((guildData.logs[x] as DiscordStuff.Log).nameSmall === 'guildmemberremove') {
                logs = guildData.logs[x] as DiscordStuff.Log;
                break;
            }
        }

        const textChannel = await client.channels.fetch(logs.loggingChannelID) as Discord.TextChannel;

        const currentGuild = await client.guilds.fetch(guildMember.guild.id);

        const auditLog = await guildMember.guild.fetchAuditLogs({ type: 'MEMBER_KICK', limit: 1 });
        const augitLogEntry = auditLog.entries
            .find(auditLogs => Date.now() - auditLogs.createdTimestamp < 5000);
        const msgEmbed = new Discord.MessageEmbed();
        if (augitLogEntry !== undefined) {
            let msgString = `__**Kicked By:**__ <@!${augitLogEntry.executor.id}> (${augitLogEntry.executor.tag})\n`;
            msgString += `__**Member Count**__: ${currentGuild.memberCount}\n`;
            msgString += `__**User:**__ <@!${guildMember.id}>\n`;
            msgString += `__**User Tag:**__ ${guildMember.user.tag}\n`;
            msgString += `__**Username:**__ ${guildMember.user.username}\n`;
            msgString += `__**User ID:**__ ${guildMember.id}\n`;

            msgEmbed.setAuthor(guildMember.user.username, (guildMember.user as Discord.User)
                .avatarURL() as string).setColor(guildMember.displayColor).setDescription(msgString)
                .setThumbnail((guildMember.user as Discord.User).avatarURL() as string)
                .setTimestamp((Date() as unknown) as Date)
                .setTitle('__**Guild Member Kicked:**__');

            await textChannel.send(msgEmbed);
        } else {
            let msgString = `__**Member Count**__: ${currentGuild.memberCount}\n`;
            msgString += `__**User:**__ <@!${guildMember.id}>\n`;
            msgString += `__**User Tag:**__ ${guildMember.user.tag}\n`;
            msgString += `__**Username:**__ ${guildMember.user.username}\n`;
            msgString += `__**User ID:**__ ${guildMember.id}\n`

            msgEmbed.setColor(guildMember.displayColor)
                .setDescription(msgString)
                .setThumbnail((guildMember.user as Discord.User).avatarURL() as string)
                .setTimestamp((Date() as unknown) as Date)
                .setTitle('__**Guild Member Left:**__');

            await textChannel.send(msgEmbed);
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