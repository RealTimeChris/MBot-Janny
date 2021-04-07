// message.ts - Module for my message command.
// Jan 30, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

import Discord = require('discord.js');
import FoundationClasses from '../FoundationClasses';
import DiscordUser from '../DiscordUser';

const command: FoundationClasses.BotCommand = {
    name: 'message',
    description: '__**Message Usage**__: Command executes automatically upon receiving certain messages!.',
    function: Function()
};

async function trackIfTrackedUser(message: Discord.Message, commandData: FoundationClasses.CommandData, discordUser: DiscordUser): Promise<void> {
    try{
        if (message.guild === undefined || message.guild === null || message.author.bot){
            return;
        }
        discordUser.guildsData.forEach(async (guildData) => {
            console.log("WE'RE HERE WE'RE HERE!");
            for (let x = 0; x < guildData.trackedUsers.length; x += 1){
                console.log("LOOK WE'RE ALSO HERE!");
                const user = message.author;
                let msgStringContent;
                let isItFound = false;
                let index;
                console.log(user.id);
                console.log(guildData.trackedUsers[x]?.userID);
                    if (user.id === guildData.trackedUsers[x]?.userID){
                        console.log("FINALLY WE'RE HERE TOO!");
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
                    const currentTextChannel = await commandData.guildMember!.client.channels.fetch(guildData.trackedUsers[index as number]?.channelID!) as Discord.TextChannel;
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
async function execute(message: Discord.Message, commandData: FoundationClasses.CommandData, discordUser: DiscordUser): Promise<string> {
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
