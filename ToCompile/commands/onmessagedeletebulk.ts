// onmessagedeletebulk.ts - Module for my "on message delete bulk" command.
// Mar 12, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

import Discord = require('discord.js');
import FoundationClasses from '../FoundationClasses';
import DiscordUser from '../DiscordUser';
import GuildData from '../GuildData';

const command: FoundationClasses.BotCommand = {
    name: 'onmessagedeletebulk',
    description: "It's an automatic one!",
    function: Function()
};

async function execute(client: Discord.Client, collection: Discord.Collection<string, Discord.Message>,
    discordUser: DiscordUser): Promise<FoundationClasses.CommandReturnData> {
    try {
        const commandReturnData: FoundationClasses.CommandReturnData = {
            commandName: command.name
        };
		
        if (!(collection instanceof Discord.Collection)) {
            return commandReturnData;
        }
        
        const guildData = new GuildData({dataBase: discordUser.dataBase, id: collection.first()!.guild!.id,
            name: collection.first()!.guild!.name, memberCount: collection.first()!.guild!.memberCount});
        await guildData.getFromDataBase();

        let logs: FoundationClasses.Log;
        for (let x = 0; x < guildData.logs.length; x += 1) {
            if (guildData.logs[x]!.nameSmall === 'messagedeletebulk') {
                logs = guildData.logs[x]!;
                break;
            }
        }

        if (logs!.enabled === true) {
            const textChannel = await client.channels.fetch(logs!.loggingChannelID) as Discord.TextChannel;

            const msgEmbed = new Discord.MessageEmbed();
            let msgString = '';
            msgString = `__**Number of Messages:**__ ${collection.size}\n`;
    
            msgEmbed
                .setTitle('__**Messages Bulk Deleted:**__')
                .setTimestamp(Date() as unknown as Date)
                .setDescription(msgString)
                .setColor(guildData.borderColor);
            await textChannel.send(msgEmbed);
    
            const keyArray = collection.keyArray();
            for (let x = 0; x < keyArray.length; x += 1) {
                const currentMessage = collection.get(keyArray[x]!);
                if (currentMessage!.content !== '') {
                    let msgString2 = `__**Message Author:**__ <@!${currentMessage!.author.id}> (${currentMessage!.author.tag})\n`;
                    msgString2 += `__**Message Id:**__ ${currentMessage!.id}\n`;
                    msgString2 += `__**Message Content:**__ ${currentMessage!.content}\n`;
                    msgString2 += `__**Message Channel:**__ ${(currentMessage?.channel as Discord.TextChannel).name}`;
                    msgEmbed
                        .setTitle(`__**Deleted Message: ${x + 1} of ${keyArray.length}**__`)
                        .setTimestamp(Date() as unknown as Date)
                        .setDescription(msgString2)
                        .setColor(guildData.borderColor);
                    await textChannel.send(msgEmbed);
                }
                if (currentMessage!.embeds.length > 0) {
                    const msgEmbed2 = currentMessage!.embeds[0];
                    await textChannel.send(`Message Content: ${x + 1} of ${keyArray.length}`, { embed: msgEmbed2 });
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
