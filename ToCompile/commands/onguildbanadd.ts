// onguildbanadd.js - Module for my "on guild ban add" command.
// Mar 9, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

import Discord = require('discord.js');
import DiscordStuff = require('../DiscordStuff');

const command = new DiscordStuff.BotCommand();
command.name = 'onguildbanadd';
command.description = "It's an automatic one!'";

async function execute(client: Discord.Client, guild: Discord.Guild, user: Discord.User,
    discordUser: DiscordStuff.DiscordUser): Promise<string> {
    try {
        const commandReturnData = new DiscordStuff.CommandReturnData();
		commandReturnData.commandName = command.name;
        if (!(guild instanceof Discord.Guild)) {
            return command.name;
        }

        const guildData = await discordUser.getGuildDataFromDB(guild);

        setTimeout(async () => {
            let logs = new DiscordStuff.Log();
            for (let x = 0; x < guildData.logs.length; x += 1) {
                if ((guildData.logs[x] as DiscordStuff.Log).nameSmall === 'guildbanadd') {
                    logs = guildData.logs[x] as DiscordStuff.Log;
                    break;
                }
            }

            const textChannel = guild.channels.resolve(logs.loggingChannelID) as Discord.TextChannel;

            const auditLogs = await guild.fetchAuditLogs({ type: 'MEMBER_BAN_ADD', limit: 1 });
            const auditLogEntry = auditLogs.entries
                .find((entry) => Date.now() - entry.createdTimestamp < 5000);

            let msgString = '';
            msgString += `__**Banned By:**__ <@!${(auditLogEntry as Discord.GuildAuditLogsEntry).executor.id}> 
                (${(auditLogEntry as Discord.GuildAuditLogsEntry).executor.tag})\n`;
            msgString += `__**Reason:**__ ${(auditLogEntry as Discord.GuildAuditLogsEntry).reason}\n`;
            msgString += `__**Time of Ban:**__ ${Date()}\n`;
            msgString += `__**User:**__ <@!${user.id}>\n`;
            msgString += `__**User Tag:**__ ${user.tag}\n`;
            msgString += `__**Username:**__ ${user.username}\n`;
            msgString += `__**User ID:**__ ${user.id}\n`;

            const msgEmbed = new Discord.MessageEmbed();

            msgEmbed
                .setColor([255, 0, 0])
                .setThumbnail((user.avatarURL() as string))
                .setTimestamp((Date() as unknown) as Date)
                .setTitle('__**User Banned:**__')
                .setDescription(msgString);

            await textChannel.send(msgEmbed);
        }, 500);

        return command.name;
    } catch (error) {
        return new Promise((resolve, reject) => {
            reject(error);
        });
    }
}
command.function = execute;
export default command as DiscordStuff.BotCommand;
