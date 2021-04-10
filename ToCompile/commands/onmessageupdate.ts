// onmessageupdate.ts - Module for my "on message update" command.
// Mar 12, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

import Discord = require('discord.js');
import FoundationClasses from '../FoundationClasses';
import DiscordUser from '../DiscordUser';
import GuildData from '../GuildData';

const command: FoundationClasses.BotCommand = {
    name: 'onmessageupdate',
    description: "It's an automatic one!",
    function: Function()
};

async function execute(client: Discord.Client, oldMessage: Discord.Message, newMessage: Discord.Message,
    discordUser: DiscordUser): Promise<FoundationClasses.CommandReturnData> {
    try {
        const commandReturnData: FoundationClasses.CommandReturnData = {
            commandName: command.name
        };
		
        if (!(newMessage instanceof Discord.Message)) {
            return commandReturnData;
        }

		const guildData = new GuildData({dataBase: discordUser.dataBase, id: newMessage.guild!.id,
            name: newMessage.guild!.name, memberCount: newMessage.guild!.memberCount});
        await guildData.getFromDataBase();

        let logs: FoundationClasses.Log;
        for (let x = 0; x < guildData.logs.length; x += 1) {
            if (guildData.logs[x]!.nameSmall === 'messageupdate') {
                logs = guildData.logs[x]!;
                break;
            }
        }

        if (logs!.enabled === true) {
            const textChannel = await client.channels.fetch(logs!.loggingChannelID) as Discord.TextChannel;
        
            const msgEmbed = new Discord.MessageEmbed();
            let msgString = '';
            msgString = `__**Message Author:**__ <@!${newMessage.author.id}> (${newMessage.author.tag})\n`;
            msgString += `__**Message ID:**__ ${newMessage.id}\n`;
            msgString += `__**Old Content:**__ \n${oldMessage.content}\n`;
            msgString += `__**New Content:**__ ${newMessage.content}`;
    
            msgEmbed
                .setTitle('__**Message Updated:**__')
                .setTimestamp(Date() as unknown as Date)
                .setDescription(msgString)
                .setColor(guildData.borderColor);
            await textChannel.send(msgEmbed);
    
            for (let x = 0; x < newMessage.embeds.length; x += 1) {
                const msgEmbed2 = newMessage.embeds[0];
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
