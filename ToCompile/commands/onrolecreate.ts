// onrolecreate.ts - Module for my "on role create" command.
// Mar 12, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

import Discord = require('discord.js');
import DiscordStuff = require('../DiscordStuff');

const command = new DiscordStuff.BotCommand();
command.name = 'onrolecreate';
command.description = "It's an automatic one!";

export async function execute(client: Discord.Client, role: Discord.Role,
    discordUser: DiscordStuff.DiscordUser): Promise<string> {
    try {
        if (!(role instanceof Discord.Role)) {
            return command.name;
        }

        const guildData = await discordUser.getGuildDataFromDB(role.guild);

        let logs = new DiscordStuff.Log();
        for (let x = 0; x < guildData.logs.length; x += 1) {
            if ((guildData.logs[x] as DiscordStuff.Log) .nameSmall === 'rolecreate') {
                logs = guildData.logs[x] as DiscordStuff.Log;
                break;
            }
        }

        const textChannel = await client.channels.fetch(logs.loggingChannelID) as Discord.TextChannel;

        const auditLogs = await role.guild.fetchAuditLogs({ type: 'ROLE_CREATE', limit: 1 });
        const auditLogEntry = auditLogs.entries
            .find(entry => Date.now() - entry.createdTimestamp < 5000) as Discord.GuildAuditLogsEntry;

        const currentGuild = await client.guilds.fetch(role.guild.id);

        const msgEmbed = new Discord.MessageEmbed();
        let msgString = String('');
        msgString = `__**New Role:**__ <@&${role.id}> (${role.name})\n`;
        msgString += `__**Created By:**__ <@!${auditLogEntry.executor.id}> (${auditLogEntry.executor.tag})\n`;
        msgString += `__**Role Count:**__ ${currentGuild.roles.cache.size}`;

        msgEmbed.setTitle('__**Role Created:**__').setTimestamp((Date() as unknown) as Date).setDescription(msgString).setColor(role.color);
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
