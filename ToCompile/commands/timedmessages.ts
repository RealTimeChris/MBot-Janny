// timedmessages.ts - Module for my "timed messages" command.
// Mar 13, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

import Discord = require('discord.js');
import DiscordStuff = require('../DiscordStuff');

const command = new DiscordStuff.BotCommand();
command.name = 'timedmessages';
command.description = "__**Timed Messages Usage:**__ !timedmessages to view the server's current timed messages.\n"
+ '!timedmessages = ADD, MESSAGENAME, MSBETWEENSENDS, MESSAGECONTENT to add a new message.\nAnd !timedmessages = REMOVE, MESSAGENAME, to remove a timed message!';

 export async function execute(message: Discord.Message, args: string[], discordUser: DiscordStuff.DiscordUser): Promise<string> {
    try {
        const areWeInADM = await DiscordStuff.areWeInADM(message);

        if (areWeInADM === true) {
            return command.name;
        }

        const doWeHaveAdminPerms = await discordUser.doWeHaveAdminPermission(message);

        if (doWeHaveAdminPerms === false) {
            return command.name;
        }

        const guildData = await discordUser.getGuildDataFromDB(message.guild as Discord.Guild);

        let whatAreWeDoing = String('');
        let messageName = String('');
        let msBetweenSends = Number();
        let messageContent = String('');

        if (args[0] === undefined) {
            whatAreWeDoing = 'viewing';
        } else if (args[0].toLowerCase() === 'add') {
            whatAreWeDoing = 'adding';
            const argOne = args[1];
            messageName = argOne as string;
            msBetweenSends = Math.abs(parseInt(args[2] as string, 10));
            const argThreee = args[3];
            messageContent = argThreee as string;
        } else if (args[0].toLowerCase() === 'remove') {
            whatAreWeDoing = 'removing';
            const argOne = args[1];
            messageName = argOne as string;
        } else {
            await message.reply('Please, enter a proper first argument or enter none at all!');
            await message.delete();
            return command.name;
        }

        if (whatAreWeDoing === 'viewing') {
            const embedFields = [];

            for (let x = 0; x < guildData.timedMessages.length; x += 1) {
                const msPerSecond = 1000;
                const secondPerMinute = 60;
                const msPerMinute = msPerSecond * secondPerMinute;
                const minutePerHour = 60;
                const msPerHour = msPerMinute * minutePerHour;

                const timeRemaining = (guildData.timedMessages[x] as DiscordStuff.TimedMessage)
                    .msBetweenSends - (new Date().getTime() - (guildData.timedMessages[x] as DiscordStuff.TimedMessage).timeOfLastSend);

                const hoursRemaining = Math.trunc(timeRemaining / msPerHour);
                const minutesRemaining = Math.trunc((timeRemaining % msPerHour) / msPerMinute);
                const secondsRemaining = Math.trunc(((timeRemaining % msPerHour)
                % msPerMinute) / msPerSecond);

                const currentField = { name: `__**${(guildData.timedMessages[x] as DiscordStuff.TimedMessage).name}:**__`, value: `__**ms Between Sends:**__ 
                    ${(guildData.timedMessages[x] as DiscordStuff.TimedMessage).msBetweenSends}\n`, inline: true };
                currentField.value += `__**In Channel:**__ <#${(guildData.timedMessages[x] as DiscordStuff.TimedMessage).textChannelID}>\n`;
                currentField.value += `__**Content:**__ ${(guildData.timedMessages[x] as DiscordStuff.TimedMessage).messageContent}\n`;
                currentField.value += `__**Time Until Next Send:**__ ${hoursRemaining} Hours, ${minutesRemaining} Minutes, and ${secondsRemaining} Seconds.`;
                embedFields.push(currentField);
            }

            if (guildData.timedMessages.length === 0) {
                const currentField = { name: '__**Empty:**__', value: 'Sorry, but there are no timed messages!', inline: true };
                embedFields.push(currentField);
            }

            const msgEmbed = new Discord.MessageEmbed();
            msgEmbed
                .setAuthor(message.author.username, message.author.avatarURL() as string)
                .setColor([0, 0, 255])
                .setTimestamp((Date() as unknown) as Date)
                .setTitle('__**Timed Messages:**__');
            msgEmbed.fields = embedFields;

            await message.channel.send(msgEmbed);
            await message.delete();
            return command.name;
        }
        if (whatAreWeDoing === 'adding') {
            const newTimedMessage = new DiscordStuff.TimedMessage();
            newTimedMessage.name = messageName;
            newTimedMessage.msBetweenSends = msBetweenSends;
            newTimedMessage.textChannelID = message.channel.id;
            newTimedMessage.timeOfLastSend = 0;
            newTimedMessage.messageContent = messageContent;

            guildData.timedMessages.push(newTimedMessage);
            await discordUser.updateGuildDataInDB(guildData);

            const msgEmbed = new Discord.MessageEmbed();
            let msgString = String('');
            msgString = "Congrats, you've just added a new timed message to your server! It is as follows:\n------\n";
            msgString += `__**Name:**__ ${newTimedMessage.name}\n`;
            msgString += `__**ms Between Sends:**__ ${newTimedMessage.msBetweenSends}\n`;
            msgString += `__**In Channel:**__ <#${newTimedMessage.textChannelID}>\n`;
            msgString += `__**Content:**__ ${newTimedMessage.messageContent}\n------`;
            msgEmbed
                .setAuthor(message.author.username, message.author.avatarURL() as string)
                .setColor([0, 0, 255])
                .setTimestamp((Date() as unknown) as Date)
                .setTitle('__**Timed Message Added:**__')
                .setDescription(msgString);

            await message.channel.send(msgEmbed);
            await message.delete();
            return command.name;
        }
        if (whatAreWeDoing === 'removing') {
            let isItFound = false;
            let currentTimedMessageName = String('');
            for (let x = 0; x < guildData.timedMessages.length; x += 1) {
                if (messageName === (guildData.timedMessages[x] as DiscordStuff.TimedMessage).name) {
                    isItFound = true;
                    currentTimedMessageName = (guildData.timedMessages[x] as DiscordStuff.TimedMessage).name;
                    guildData.timedMessages.splice(x, 1);
                    await discordUser.updateGuildDataInDB(guildData);
                    break;
                }
            }

            if (isItFound === false) {
                await message.reply('Sorry, but the timed message you requested could not be found!');
                await message.delete();
                return command.name;
            }

            const msgEmbed = new Discord.MessageEmbed();
            let msgString = String('');
            msgString = `You've just removed a timed message from your server! It is as follows:\n------\n__**Name:**__ ${currentTimedMessageName}\n------`;
            msgEmbed
                .setAuthor(message.author.username, message.author.avatarURL() as string)
                .setColor([0, 0, 255])
                .setTimestamp((Date() as unknown) as Date)
                .setTitle('__**Timed Message Removed:**__')
                .setDescription(msgString);

            await message.channel.send(msgEmbed);
            await message.delete();
            return command.name;
        }

        return command.name;
    } catch (error) {
        return new Promise((resolve, reject) => {
            reject(error);
        });
    }
}
command.function = execute;
export default command as DiscordStuff.BotCommand;
