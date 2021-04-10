// onrolecreate.ts - Module for my "on role create" command.
// Mar 12, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

import Discord = require('discord.js');
import FoundationClasses from '../FoundationClasses';
import DiscordUser from '../DiscordUser';
import GuildData from '../GuildData';

const command: FoundationClasses.BotCommand = {
    name: 'onrolecreate',
    description: "It's an automatic one!",
    function: Function()
};

async function execute(client: Discord.Client, role: Discord.Role,
    discordUser: DiscordUser): Promise<FoundationClasses.CommandReturnData> {
    try {
        const commandReturnData: FoundationClasses.CommandReturnData = {
            commandName: command.name
        };
		
        if (!(role instanceof Discord.Role)) {
            return commandReturnData;
        }

        const guildData = new GuildData({dataBase: discordUser.dataBase, id: role.guild!.id,
            name: role.guild!.name, memberCount: role.guild!.memberCount});
        await guildData.getFromDataBase();

        let logs: FoundationClasses.Log;
        for (let x = 0; x < guildData.logs.length; x += 1) {
            if (guildData.logs[x]!.nameSmall === 'rolecreate') {
                logs = guildData.logs[x]!;
                break;
            }
        }

        if (logs!.enabled === true) {
            const textChannel = await client.channels.fetch(logs!.loggingChannelID) as Discord.TextChannel;

            const auditLogs = await role.guild.fetchAuditLogs({ type: 'ROLE_CREATE', limit: 1 });
            const auditLogEntry = auditLogs.entries.find(entry => Date.now() - entry.createdTimestamp < 5000)!;
    
            const currentGuild = await client.guilds.fetch(role.guild.id);
    
            const msgEmbed = new Discord.MessageEmbed();
            let msgString = '';
            msgString = `__**New Role:**__ <@&${role.id}> (${role.name})\n`;
            msgString += `__**Created By:**__ <@!${auditLogEntry.executor.id}> (${auditLogEntry.executor.tag})\n`;
            msgString += `__**Role Count:**__ ${currentGuild.roles.cache.size}`;
    
            msgEmbed
                .setTitle('__**Role Created:**__')
                .setTimestamp(Date() as unknown as Date)
                .setDescription(msgString)
                .setColor(role.color);
            await textChannel.send(msgEmbed);
        }
        
        if (guildData.verificationSystem.channelID !== '') {
            const channelsArray = role.guild.channels.cache.array();
            for (let x = 0; x < channelsArray.length; x += 1) {
                if (channelsArray[x]?.id === guildData.verificationSystem.channelID) {
                    await channelsArray[x]?.updateOverwrite(role.id, {VIEW_CHANNEL: false});
                }
            }
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
