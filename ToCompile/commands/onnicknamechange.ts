// onnicknamechange.ts - Module for my "on nickname change" commaand.
// Mar 12, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

import Discord = require('discord.js');
import FoundationClasses from '../FoundationClasses';
import DiscordUser from '../DiscordUser';
import GuildData from '../GuildData';

const command: FoundationClasses.BotCommand = {
    name: 'onnicknamechange',
    description: "It's an automatic one!",
    function: Function()
};

async function execute(client: Discord.Client, oldGuildMember: Discord.GuildMember, newGuildMember: Discord.GuildMember,
    discordUser: DiscordUser): Promise<FoundationClasses.CommandReturnData> {
    try {
        const commandReturnData: FoundationClasses.CommandReturnData = {
            commandName: command.name
        };
		
        if (!(newGuildMember instanceof Discord.GuildMember)) {
            return commandReturnData;
        }

        const guildData = new GuildData({dataBase: discordUser.dataBase, id: newGuildMember.guild!.id,
            name: newGuildMember.guild!.name, memberCount: newGuildMember.guild!.memberCount});
        await guildData.getFromDataBase();

        let logs: FoundationClasses.Log;
        for (let x = 0; x < guildData.logs.length; x += 1) {
            if (guildData.logs[x]!.nameSmall === 'nicknamechange') {
                logs = guildData.logs[x]!;
                break;
            }
        }

        if (logs!.enabled === true) {
            const textChannel = await client.channels.fetch(logs!.loggingChannelID) as Discord.TextChannel;

            let msgString = '';
            msgString = `__**New Nickname:**__ ${newGuildMember.displayName}\n`;
            msgString += `__**Old Nickname:**__ ${oldGuildMember.displayName}\n`;
            msgString += `__**User:**__ <@!${newGuildMember.id}>\n`;
            msgString += `__**User Tag:**__ ${newGuildMember.user.tag}\n`;
            msgString += `__**Username:**__ ${newGuildMember.user.username}\n`;
            msgString += `__**User ID:**__ ${newGuildMember.id}\n`;
    
            const msgEmbed = new Discord.MessageEmbed();
            msgEmbed
                .setColor(newGuildMember.displayColor)
                .setDescription(msgString)
                .setThumbnail(newGuildMember.user.avatarURL()!)
                .setTimestamp(Date() as unknown as Date)
                .setTitle('__**New Nickname:**__');
    
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
