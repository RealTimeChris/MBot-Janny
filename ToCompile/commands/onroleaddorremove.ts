// onroleaddorremove.ts - Module for my "on role add or remove" command.
// Mar 12, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

import Discord = require('discord.js');
import DiscordStuff = require('../DiscordStuff');

const command = new DiscordStuff.BotCommand();
command.name = 'onroleaddorremove';
command.description = "It's an automatic one!";

async function execute(client: Discord.Client, oldGuildMemberRoleManager: Discord.GuildMemberRoleManager, newGuildMemberRoleManager: Discord.GuildMemberRoleManager,
    newGuildMember: Discord.GuildMember, collectionSizeDifference: number, discordUser: DiscordStuff.DiscordUser): Promise<string> {
    try {
        if (!(oldGuildMemberRoleManager instanceof Discord.GuildMemberRoleManager)) {
            return command.name;
        }

        const guildData = await discordUser.getGuildDataFromDB(newGuildMember.guild);

        let logs = new DiscordStuff.Log();
        for (let x = 0; x < guildData.logs.length; x += 1) {
            if ((guildData.logs[x] as DiscordStuff.Log).nameSmall === 'roleaddorremove') {
                logs = guildData.logs[x] as DiscordStuff.Log;
                break;
            }
        }

        const newRoleCollection = oldGuildMemberRoleManager.cache
            .difference(newGuildMemberRoleManager.cache);

        const newRole = newRoleCollection.first() as Discord.Role;

        const textChannel = client.channels.resolve(logs.loggingChannelID);

        const auditLogs = await newGuildMember.guild.fetchAuditLogs({ type: 'MEMBER_ROLE_UPDATE', limit: 1 });
        const auditLogEntry = auditLogs.entries
            .find(entry => Date.now() - entry.createdTimestamp < 5000) as Discord.GuildAuditLogsEntry;

        if (collectionSizeDifference > 0) {
            let finalString = `__**Role Lost:**__ <@&${newRole.id}> (${newRole.name})\n`;
            finalString += `__**Role Taken By:**__ <@!${auditLogEntry.executor.id}> (${auditLogEntry.executor.tag})\n`;
            finalString += `__**User:**__ <@!${newGuildMember.user.id}>\n`;
            finalString += `__**User Tag:**__ ${newGuildMember.user.tag}\n`;
            finalString += `__**Username:**__ ${newGuildMember.user.username}\n`;
            finalString += `__**User ID:**__ ${newGuildMember.id}\n`;

            const messageEmbed = new Discord.MessageEmbed().setColor(newGuildMember.displayColor).setTitle('__**Lost Role:**__').setTimestamp((Date() as unknown) as Date)
                .setThumbnail((newGuildMember.user as Discord.User).avatarURL() as string)
                .setDescription(finalString);
            await (textChannel as Discord.TextChannel).send(messageEmbed);
            return command.name;
        }
        if (collectionSizeDifference < 0) {
            let finalString = `__**Role Gained:**__ <@&${newRole.id}> (${newRole.name})\n`;
            finalString += `__**Role Given By:**__ <@!${auditLogEntry.executor.id}> (${auditLogEntry.executor.tag})\n`;
            finalString += `__**User:**__ <@!${newGuildMember.user.id}>\n`;
            finalString += `__**User Tag:**__ ${newGuildMember.user.tag}\n`;
            finalString += `__**Username:**__ ${newGuildMember.user.username}\n`;
            finalString += `__**User ID:**__ ${newGuildMember.id}\n`;

            const messageEmbed = new Discord.MessageEmbed().setColor(newGuildMember.displayColor).setTitle('__**New Role:**__').setTimestamp((Date() as unknown) as Date)
                .setThumbnail((newGuildMember.user as Discord.User).avatarURL() as string)
                .setDescription(finalString);
            await (textChannel as Discord.TextChannel).send(messageEmbed);
            return command.name;
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
