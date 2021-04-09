// message.ts - Module for my message command.
// Jan 30, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

import Discord = require('discord.js');
import FoundationClasses from '../FoundationClasses';
import GuildData from '../GuildData';

const command: FoundationClasses.BotCommand = {
    name: 'message',
    description: '__**Message Usage**__: Command executes automatically upon receiving certain messages!.',
    function: Function()
};

async function trackIfTrackedUser(message: Discord.Message, commandData: FoundationClasses.CommandData): Promise<void> {
    try{
        if (message.guild === undefined || message.guild === null || message.author.bot) {
            return;
        }
        GuildData.guildsData.forEach((guildData) => {
            let msgStringContent;
            const user = message.author;
            let isItFound = false;
            let index;
            for (let x = 0; x < guildData.trackedUsers.length; x += 1) {
                if (user.id === guildData.trackedUsers[x]?.userID) {
                    msgStringContent = `__**Tracked User:**__ <@!${user.id}> (${user.username})\n__**On Server:**__ ${message.guild!.name}`+
                        `\n__**In Channel:**__ <#${message.channel.id}> (${(message.channel as Discord.TextChannel).name})\n__**Message ID**__ ${message.id}\n__**What They Said:**__ ${message.content}`;
                    isItFound = true;
                    index = x;
                }   
            }
            if (isItFound === false) {
                return;
            }
            else {
                const msgEmbed = new Discord.MessageEmbed()
                msgEmbed
                    .setAuthor(user.username, user.avatarURL()!)
                    .setColor([254, 254, 254])
                    .setDescription(msgStringContent)
                    .setTimestamp(Date() as unknown as Date)
                    .setTitle("__**Tracked User Message:**__");
                const currentTextChannel = commandData.guildMember!.client.channels.resolve(guildData.trackedUsers[index as number]?.channelID!) as Discord.TextChannel;
                currentTextChannel.send(msgEmbed);
            }
        });
    }
    catch(error) {
        console.log(error);
    }
}

/**
* Selects a chosen chat message and sends it via the appropriate channel,
* upon recieving a trigger phrase or word.
*/
async function execute(message: Discord.Message, commandData: FoundationClasses.CommandData): Promise<FoundationClasses.CommandReturnData> {
    try {
        const commandReturnData: FoundationClasses.CommandReturnData = {
            commandName: command.name
        }
        await trackIfTrackedUser(message, commandData);

        const number = Math.random() * 100;
        if (message.content != null && message.content !== undefined) {
            if (message.content.toLowerCase().includes('hey ') && number <= 15) {
                await message.reply("Greetings, what's up fellow Discordee?! Can I offer you some drugs?");
            }
        }
        return commandReturnData;
    } catch (error) {
        return new Promise((resolve, reject) => {
            reject(error);
        })
    }
}
command.function = execute;
export default command as FoundationClasses.BotCommand;
