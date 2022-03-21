// timedmessages.ts - Module for my "timed messages" command.
// Mar 13, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

import Discord = require('discord.js');
import FoundationClasses from '../FoundationClasses';
import DiscordUser from '../DiscordUser';
import GuildData from '../GuildData';
import HelperFunctions from '../HelperFunctions';

const command: FoundationClasses.BotCommand = {
    name: 'timedmessages',
    description: "__**Timed Messages Usage:**__ !timedmessages to view the server's current timed messages.\n"
    + '!timedmessages = ADD, MESSAGENAME, MSBETWEENSENDS, MESSAGECONTENT to add a new message.\nAnd !timedmessages = REMOVE, MESSAGENAME, to remove a timed message!',
    function: Function()
};

async function execute(commandData: FoundationClasses.CommandData, discordUser: DiscordUser): Promise<FoundationClasses.CommandReturnData> {
    try {
        const commandReturnData: FoundationClasses.CommandReturnData = {
            commandName: command.name
        };
		
        const areWeInADM = await HelperFunctions.areWeInADM(commandData);

        if (areWeInADM === true) {
            return commandReturnData;
        }

        const doWeHaveAdminPerms = await HelperFunctions.doWeHaveAdminPermission(commandData, discordUser);

        if (doWeHaveAdminPerms === false) {
            return commandReturnData;
        }

        const guildData = new GuildData({dataBase: discordUser.dataBase, id: commandData.guild!.id, name: commandData.guild!.name, memberCount: commandData.guild!.memberCount});
        await guildData.getFromDataBase();

        let whatAreWeDoing = '';
        let messageName = '';
        let msBetweenSends = 0;
        let messageContent = '';

        if (commandData.args[0] === undefined) {
            whatAreWeDoing = 'viewing';
        } else if (commandData.args[0].toLowerCase() === 'add') {
            whatAreWeDoing = 'adding';
            const argOne = commandData.args[1];
            messageName = argOne!;
            msBetweenSends = Math.abs(parseInt(commandData.args[2]!, 10));
            const argThreee = commandData.args[3];
            messageContent = argThreee!;
        } else if (commandData.args[0].toLowerCase() === 'remove') {
            whatAreWeDoing = 'removing';
            const argOne = commandData.args[1];
            messageName = argOne!;
        } else {
            const msgString = `------\n**Please, enter a proper first argument or enter none at all!**\n------`;
            let msgEmbed = new Discord.MessageEmbed()
				.setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
				.setColor(guildData.borderColor)
				.setDescription(msgString)
				.setTimestamp(Date() as unknown as Date)
				.setTitle('__**Missing Or Invalid Arguments:**__');
            let msg = await HelperFunctions.sendMessageWithCorrectChannel(commandData, msgEmbed);
            if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                msg = new Discord.Message(commandData.guild!.client, msg, commandData.fromTextChannel!);
            }
            await msg.delete({timeout: 20000});
            return commandReturnData;
        }

        if (whatAreWeDoing === 'viewing') {
            const embedFields = [];

            for (let x = 0; x < guildData.timedMessages!.length; x += 1) {
                const msPerSecond = 1000;
                const secondPerMinute = 60;
                const msPerMinute = msPerSecond * secondPerMinute;
                const minutePerHour = 60;
                const msPerHour = msPerMinute * minutePerHour;

                const timeRemaining = guildData.timedMessages![x]!
                    .msBetweenSends - (new Date().getTime() - guildData.timedMessages![x]!.timeOfLastSend);

                const hoursRemaining = Math.trunc(timeRemaining / msPerHour);
                const minutesRemaining = Math.trunc((timeRemaining % msPerHour) / msPerMinute);
                const secondsRemaining = Math.trunc(((timeRemaining % msPerHour)
                % msPerMinute) / msPerSecond);

                const currentField = { name: `__**${guildData.timedMessages![x]!.name}:**__`, value: `__**ms Between Sends:**__ 
                    ${guildData.timedMessages![x]!.msBetweenSends}\n`, inline: true };
                currentField.value += `__**In Channel:**__ <#${guildData.timedMessages![x]!.textChannelID}>\n`;
                currentField.value += `__**Content:**__ ${guildData.timedMessages![x]!.messageContent}\n`;
                currentField.value += `__**Time Until Next Send:**__ ${hoursRemaining} Hours, ${minutesRemaining} Minutes, and ${secondsRemaining} Seconds.`;
                embedFields.push(currentField);
            }

            if (guildData.timedMessages!.length === 0) {
                const currentField = { name: '__**Empty:**__', value: 'Sorry, but there are no timed messages!', inline: true };
                embedFields.push(currentField);
            }

            const msgEmbed = new Discord.MessageEmbed();
            msgEmbed
                .setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
                .setColor(guildData.borderColor)
                .setTimestamp(Date() as unknown as Date)
                .setTitle('__**Timed Messages:**__');
            msgEmbed.fields = embedFields;

            await HelperFunctions.sendMessageWithCorrectChannel(commandData, msgEmbed);
            return commandReturnData;
        }
        if (whatAreWeDoing === 'adding') {
            const newTimedMessage: FoundationClasses.TimedMessage = {
                name: messageName,
                msBetweenSends: msBetweenSends,
                textChannelID: commandData.fromTextChannel!.id,
                timeOfLastSend: 0,
                messageContent: messageContent
            }; 

            guildData.timedMessages!.push(newTimedMessage);
            await guildData.writeToDataBase();

            const msgEmbed = new Discord.MessageEmbed();
            let msgString = '';
            msgString = "Congrats, you've just added a new timed message to your server! It is as follows:\n------\n";
            msgString += `__**Name:**__ ${newTimedMessage.name}\n`;
            msgString += `__**ms Between Sends:**__ ${newTimedMessage.msBetweenSends}\n`;
            msgString += `__**In Channel:**__ <#${newTimedMessage.textChannelID}>\n`;
            msgString += `__**Content:**__ ${newTimedMessage.messageContent}\n------`;
            msgEmbed
                .setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
                .setColor(guildData.borderColor)
                .setTimestamp(Date() as unknown as Date)
                .setTitle('__**Timed Message Added:**__')
                .setDescription(msgString);

            await HelperFunctions.sendMessageWithCorrectChannel(commandData, msgEmbed);
            return commandReturnData;
        }
        if (whatAreWeDoing === 'removing') {
            let isItFound = false;
            let currentTimedMessageName = '';
            for (let x = 0; x < guildData.timedMessages!.length; x += 1) {
                if (messageName === guildData.timedMessages![x]!.name) {
                    isItFound = true;
                    currentTimedMessageName = guildData.timedMessages![x]!.name;
                    guildData.timedMessages!.splice(x, 1);
                    await guildData.writeToDataBase();
                    break;
                }
            }

            if (isItFound === false) {
                const msgString = `------\n**Sorry, but the timed message you requested could not be found!**\n------`;
                let msgEmbed = new Discord.MessageEmbed()
				    .setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
				    .setColor(guildData.borderColor)
				    .setDescription(msgString)
				    .setTimestamp(Date() as unknown as Date)
				    .setTitle('__**Message Issue:**__');
                let msg = await HelperFunctions.sendMessageWithCorrectChannel(commandData, msgEmbed);
                if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                    msg = new Discord.Message(commandData.guild!.client, msg, commandData.fromTextChannel!);
                }
                await msg.delete({timeout: 20000});
                return commandReturnData;
            }

            const msgEmbed = new Discord.MessageEmbed();
            let msgString = '';
            msgString = `You've just removed a timed message from your server! It is as follows:\n------\n__**Name:**__ ${currentTimedMessageName}\n------`;
            msgEmbed
                .setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
                .setColor(guildData.borderColor)
                .setTimestamp(Date() as unknown as Date)
                .setTitle('__**Timed Message Removed:**__')
                .setDescription(msgString);

            await HelperFunctions.sendMessageWithCorrectChannel(commandData, msgEmbed);
            return commandReturnData;
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
