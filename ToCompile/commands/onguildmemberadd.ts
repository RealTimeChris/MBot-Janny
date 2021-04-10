// onguildmemberadd.ts - Module for my "on guild member add" command.
// Mar 12, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

import Discord = require('discord.js');
import FoundationClasses from '../FoundationClasses';
import DiscordUser from '../DiscordUser';
import GuildData from '../GuildData';
import HelperFunctions from '../HelperFunctions';

const command: FoundationClasses.BotCommand = {
    name: 'onguildmemberadd',
    description: " It's an automatic one!",
    function: Function()
};

async function execute(client: Discord.Client, guildMember: Discord.GuildMember,
    discordUser: DiscordUser): Promise<FoundationClasses.CommandReturnData> {
    try {
        const commandReturnData: FoundationClasses.CommandReturnData = {
            commandName: command.name
        };
		
        if (!(guildMember instanceof Discord.GuildMember)) {
            return commandReturnData;
        }

        const guildData = new GuildData({dataBase: discordUser.dataBase, id: guildMember.guild.id, name: guildMember.guild.name, memberCount: guildMember.guild.memberCount});
        await guildData.getFromDataBase();

        await HelperFunctions.applyDefaultRoles(guildData, guildMember);

        let logs: FoundationClasses.Log;
        for (let x = 0; x < guildData.logs.length; x += 1) {
            if (guildData.logs[x]!.nameSmall === 'guildmemberadd') {
                logs = guildData.logs[x]!;
                break;
            }
        }

        if (guildData.verificationSystem.channelID === null) {
            const roleManager = new Discord.GuildMemberRoleManager(guildMember);
            for (let x = 0; x < guildData.defaultRoleIDs.length; x += 1) {
                await roleManager.add(guildData.defaultRoleIDs[x]!);
            }
        }

        if (logs!.enabled === true) {
            const textChannel = await client.channels.fetch(logs!.loggingChannelID) as Discord.TextChannel;

            const currentGuild = await client.guilds.fetch(guildMember.guild.id);
    
            const msgEmbed = new Discord.MessageEmbed();
            let msgString = `__**Time Joined:**__ ${guildMember.joinedAt}\n`;
            msgString += `__**Member Count**__: ${currentGuild.memberCount}\n`;
            msgString += `__**User:**__ <@!${guildMember.id}>\n`;
            msgString += `__**User Tag:**__ ${guildMember.user.tag}\n`;
            msgString += `__**Username:**__ ${guildMember.user.username}\n`;
            msgString += `__**User ID:**__ ${guildMember.id}\n`;
    
            msgEmbed
                .setColor(guildMember.displayColor)
                .setDescription(msgString)
                .setThumbnail(guildMember.user.avatarURL()!)
                .setTimestamp(Date() as unknown as Date)
                .setTitle('__**New Guild Member:**__');
    
            await textChannel.send(msgEmbed);
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
