// onmessagedelete.ts - Module for my "on message delete" command.
// Mar 12, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

import Discord = require('discord.js');
import FoundationClasses from '../FoundationClasses';
import DiscordUser from '../DiscordUser';
import GuildData from '../GuildData';

const command: FoundationClasses.BotCommand = {
    name: 'onmessagedelete',
    description: "It's an automatic one!",
    function: Function()
};

async function execute(client: Discord.Client, message: Discord.Message, discordUser: DiscordUser): Promise<FoundationClasses.CommandReturnData> {
    try {
        const commandReturnData: FoundationClasses.CommandReturnData = {
            commandName: command.name
        };
		
        if (!(message.deleted)) {
            return commandReturnData;
        }

        const guildData = new GuildData({dataBase: discordUser.dataBase, id: message.guild!.id, name: message.guild!.name, memberCount: message.guild!.memberCount});
        await guildData.getFromDataBase();

        let logs: FoundationClasses.Log;
        for (let x = 0; x < guildData.logs.length; x += 1) {
            if (guildData.logs[x]!.nameSmall === 'messagedelete') {
                logs = guildData.logs[x]!;
                break;
            }
        }

        if (logs!.enabled === true) {
            const textChannel = await client.channels.fetch(logs!.loggingChannelID) as Discord.TextChannel;

            const msgEmbed = new Discord.MessageEmbed();
            let msgString = '';
            msgString = `__**Message Author:**__ <@!${message.author.id}> (${message.author.tag})\n`;
            msgString += `__**Message ID:**__ ${message.id}\n`;
            msgString += `__**Content:**__ ${message.content}`;
    
            msgEmbed
                .setTitle('__**Message Deleted:**__')
                .setTimestamp(Date() as unknown as Date)
                .setDescription(msgString)
                .setColor([0, 0, 255]);
            await textChannel.send(msgEmbed);
    
            for (let x = 0; x < message.embeds.length; x += 1) {
                const msgEmbed2 = message.embeds[0];
                await textChannel.send('Message Content!', { embed: msgEmbed2 });
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
