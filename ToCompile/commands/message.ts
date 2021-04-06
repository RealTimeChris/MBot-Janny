// message.ts - Module for my message command.
// Jan 30, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

import Discord = require('discord.js');
import FoundationClasses = require('../FoundationClasses');
import DiscordUser = require('../DiscordUser');

const command: FoundationClasses.BotCommand = {
    name: 'message',
    description: '__**Message Usage**__: Command executes automatically upon receiving certain messages!.',
    function: Function()
};

async function trackIfTrackedUser(message: Discord.Message, commandData: FoundationClasses.CommandData, discordUser: DiscordUser.DiscordUser): Promise<void> {
    try{
        if (message.guild === undefined || message.guild === null){
            return;
        }
        discordUser.guildsData.forEach(async (guildData) => {
            for (let x = 0; x < guildData.exposeDataValues().trackedUsers!.length; x += 1){
                const user = message.author;
                let msgStringContent;
                let isItFound = false;
                let index;
                    if (user.id === guildData.exposeDataValues().trackedUsers![x]?.userID){
                        msgStringContent = `__**Tracked User:**__ <@!${user.id}> (${user.username})\n__**On Server:**__ ${message.guild!.name}
                            \n__**In Channel:**__ <#${message.channel.id}> (${(message.channel as Discord.TextChannel).name})\n__**Message ID**__ ${message.id}\n__**What They Said:**__ ${message.content}`;
                        isItFound = true;
                        index = x;
                    }
                if (isItFound === false){
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
                    const currentTextChannel = await commandData.guildMember!.client.channels.fetch(guildData.exposeDataValues().trackedUsers![index as number]?.channelID!) as Discord.TextChannel;
                    await currentTextChannel.send(msgEmbed);
                }
            }
        });
    }
    catch(error){
        return new Promise((resolve, reject) => {
            reject(error);
        });
    }
}

/**
* Selects a chosen chat message and sends it via the appropriate channel,
* upon recieving a trigger phrase or word.
*/
async function execute(message: Discord.Message, commandData: FoundationClasses.CommandData, discordUser: DiscordUser.DiscordUser): Promise<string> {
    try {
        await trackIfTrackedUser(message, commandData, discordUser);

        const number = Math.random() * 100;
        if (message.content != null && message.content !== undefined) {
            if (message.content.toLowerCase().includes('hey ') && number <= 15) {
                await message.reply("Greetings, what's up fellow Discordee?! Can I offer you some drugs?");
            }
        }
        return command.name;
    } catch (error) {
        return new Promise((resolve, reject) => {
            reject(error);
        });
    }
}
command.function = execute;
export default command as FoundationClasses.BotCommand;
