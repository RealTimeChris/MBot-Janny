// onguildbanadd.js - Module for my "on guild ban add" command.
// Mar 9, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

import Discord = require('discord.js');
import FoundationClasses from '../FoundationClasses';
import DiscordUser from '../DiscordUser';
import GuildData from '../GuildData';

const command: FoundationClasses.BotCommand = {
    name: 'onguildbanadd',
    description: "It's an automatic one!",
    function: Function()
};

async function execute(client: Discord.Client, guild: Discord.Guild, user: Discord.User,
    discordUser: DiscordUser): Promise<FoundationClasses.CommandReturnData> {
    try {
        const commandReturnData: FoundationClasses.CommandReturnData = {
            commandName: command.name
        };
		
        if (!(guild instanceof Discord.Guild)) {
            return commandReturnData;
        }

        const guildData = new GuildData({dataBase: discordUser.dataBase, id: guild.id, name: guild.name, memberCount: guild.memberCount});
        await guildData.getFromDataBase();

        let logs: FoundationClasses.Log;
        for (let x = 0; x < guildData.logs.length; x += 1) {
            if (guildData.logs[x]!.nameSmall === 'guildbanadd') {
                logs = guildData.logs[x]!;
                break;
            }
        }

        if (logs!.enabled === true) {
            setTimeout(async () => {
                const textChannel = guild.channels.resolve(logs!.loggingChannelID) as Discord.TextChannel;
    
                const auditLogs = await guild.fetchAuditLogs({ type: 'MEMBER_BAN_ADD', limit: 1 });
                const auditLogEntry = auditLogs.entries
                    .find((entry) => Date.now() - entry.createdTimestamp < 5000);
    
                let msgString = '';
                msgString += `__**Banned By:**__ <@!${auditLogEntry!.executor.id}> 
                    (${auditLogEntry!.executor.tag})\n`;
                msgString += `__**Reason:**__ ${auditLogEntry!.reason}\n`;
                msgString += `__**Time of Ban:**__ ${Date()}\n`;
                msgString += `__**User:**__ <@!${user.id}>\n`;
                msgString += `__**User Tag:**__ ${user.tag}\n`;
                msgString += `__**Username:**__ ${user.username}\n`;
                msgString += `__**User ID:**__ ${user.id}\n`;
    
                const msgEmbed = new Discord.MessageEmbed();
    
                msgEmbed
                    .setColor([255, 0, 0])
                    .setThumbnail(user.avatarURL()!)
                    .setTimestamp(Date() as unknown as Date)
                    .setTitle('__**User Banned:**__')
                    .setDescription(msgString);
    
                await textChannel.send(msgEmbed);
            }, 500);
        }

        return commandReturnData;
    } catch (error) {
        return new Promise((resolve, reject) => {
            reject(error);
        });
    }
}
command.function = execute;
export default command as FoundationClasses.BotCommand;
