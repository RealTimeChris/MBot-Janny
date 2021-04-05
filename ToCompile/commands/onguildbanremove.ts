// onguildbanremove.ts - Module for my "on guild ban remove" command.
// Mar 9, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

import Discord = require('discord.js');
import DiscordUser from '../DiscordUser';
import HelperFunctions from '../HelperFunctions';

const command = new DiscordUser.BotCommand();
command.name = 'onguildbanremove';
command.description = "It's an automatic one!";

async function execute(client: Discord.Client, guild: Discord.Guild, user: Discord.User,
    discordUser: DiscordUser.DiscordUser): Promise<string> {
    try {
        if (!(guild instanceof Discord.Guild)) {
            return command.name;
        }

        const guildData = await discordUser.getGuildDataFromDB(guild);

        let logs = new DiscordUser.Log();
        for (let x = 0; x < guildData.logs.length; x += 1) {
            if (guildData.logs[x]!.nameSmall === 'guildbanremove') {
                logs = guildData.logs[x]!;
                break;
            }
        }

        const textChannel = guild.channels.resolve(logs.loggingChannelID) as Discord.TextChannel;

        const auditLogs = await guild.fetchAuditLogs({ type: 'MEMBER_BAN_REMOVE', limit: 1 });
        const auditLogEntry = auditLogs.entries
            .find(entry => Date.now() - entry.createdTimestamp < 5000);

        let msgString = '';
        msgString += `__**Unbanned By:**__ <@!${auditLogEntry!.executor.id}> 
        (${auditLogEntry!.executor.tag})\n`;
        msgString += `__**Time of Unban:**__ ${Date()}\n`;
        msgString += `__**User:**__ <@!${user.id}>\n`;
        msgString += `__**User Tag:**__ ${user.tag}\n`;
        msgString += `__**Username:**__ ${user.username}\n`;
        msgString += `__**User ID:**__ ${user.id}\n`;

        const msgEmbed = new Discord.MessageEmbed();

        msgEmbed
            .setColor([0, 255, 0])
            .setThumbnail(user.avatarURL()!)
            .setTimestamp(Date() as unknown as Date)
            .setTitle('__**User Unbanned:**__')
            .setDescription(msgString);

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
