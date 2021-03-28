//  setverificationsystem.ts - Module for my "set verification system" command!.
// Feb 26, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

import Discord = require('discord.js');
import DiscordStuff = require('../DiscordStuff');

const command = new DiscordStuff.BotCommand();
command.name = 'setverificationsystem';
command.description = '!setverificationsystem = ENABLE, VERIFICATIONMESSAGE, REACTIONEMOJI, in the channel you would like to use for your verification channel!\nAlso, !setverificationsystem = DISABLE.';

export async function execute(message: Discord.Message, args: string[], discordUser: DiscordStuff.DiscordUser): Promise<string> {
    try {
        const areWeInADM = await DiscordStuff.areWeInADM(message);

        if (areWeInADM === true) {
            return command.name;
        }

        const doWeHaveAdminPermission = await discordUser.doWeHaveAdminPermission(message);

        if (doWeHaveAdminPermission === false) {
            return command.name;
        }

        const guildData = await discordUser.getGuildDataFromDB(message.guild as Discord.Guild);

        let whatAreWeDoing;
        const emojiRegExp = /.{1,26}/;
        if (args[0] === undefined) {
            whatAreWeDoing = 'viewing';
        } else if (args[0].toLowerCase() !== 'enable' && args[0].toLowerCase() !== 'disable') {
            await message.reply("Please enter either 'enable' or 'disable' as the first argument! (!setverificationsystem = ENABLE, VERIFICATIONMESSAGE, REACTIONEMOJI, or !setverificationsystem = DISABLE)");
            if (message.deletable){
                await message.delete();
            }
            return command.name;
        } else if (args[0].toLowerCase() === 'enable' && args[1] === undefined) {
            await message.reply('Please, enter a greeting message for the verification system!');
            if (message.deletable){
                await message.delete();
            }
            return command.name;
        } else if (args[0].toLowerCase() === 'enable' && (args[2] === undefined || !emojiRegExp.test(args[2]))) {
            await message.reply('Please, enter a valid emoji for them to react with!');
            if (message.deletable){
                await message.delete();
            }
            return command.name;
        } else if (args[0].toLowerCase() === 'enable') {
            whatAreWeDoing = 'enable';
        } else if (args[0].toLowerCase() === 'disable') {
            whatAreWeDoing = 'disable';
        }

        let msgString = '';
        if (whatAreWeDoing === 'viewing') {
            if (guildData.verificationSystem.channelID === '') {
                msgString = '------\n__The verification system is currently disabled.__\n------\n';
            } else {
                const newMessage = await message.fetch();
                msgString = `------\n__**Channel:**__ <#${guildData.verificationSystem.channelID}>\n`;
                msgString += `__**Message Content:**__ ${(newMessage.embeds[0] as Discord.MessageEmbed).description}\n`;
                msgString += `__**Emoji:**__ ${guildData.verificationSystem.emoji}\n------`;
            }

            const msgEmbed = new Discord.MessageEmbed();
            msgEmbed
                .setAuthor(message.author.username, message.author.avatarURL() as string)
                .setColor([0, 0, 255])
                .setTimestamp((Date() as unknown) as Date)
                .setTitle('__**Verification System:**__')
                .setDescription(msgString);
            await message.channel.send(msgEmbed);
            if (message.deletable){
                await message.delete();
            }
            return command.name;
        }
        if (whatAreWeDoing === 'disable') {
            if (guildData.verificationSystem.channelID == null) {
                await message.reply('Sorry, it looks as though it is already disabled!');
                if (message.deletable){
                    await message.delete();
                }
                return command.name;
            }
            const currentChannel = message.client.channels
                .resolve(guildData.verificationSystem.channelID) as Discord.TextChannel;
            const messageManager = new Discord.MessageManager(currentChannel);

            await messageManager.delete(guildData.verificationSystem.messageID);

            guildData.verificationSystem.channelID = '';
            guildData.verificationSystem.messageID = '';

            msgString = "__**Nicely done! You've disabled the verification system for this server!**__";
            const msgEmbed = new Discord.MessageEmbed();
            msgEmbed
                .setAuthor(message.author.username, message.author.avatarURL() as string)
                .setColor([0, 0, 255])
                .setTimestamp((Date() as unknown) as Date)
                .setTitle('__**Set Verification System:**__')
                .setDescription(msgString);
            await message.channel.send(msgEmbed);
            if (message.deletable){
                await message.delete();
            }
            return command.name;
        }
        if (whatAreWeDoing === 'enable') {
            if (guildData.defaultRoleIDs.length === 0) {
                await message.reply('Please, first set a default role to be applied to the new member! Using !setdefaultrole.');
                if (message.deletable){
                    await message.delete();
                }
                return command.name;
            }

            const msgEmbed2 = new Discord.MessageEmbed()
                .setColor([0, 0, 255])
                .setDescription(args[1])
                .setTimestamp((Date() as unknown) as Date);
            const newMessage = await message.channel.send(msgEmbed2);
            await newMessage.react(args[2] as string);

            guildData.verificationSystem.channelID = message.channel.id;
            guildData.verificationSystem.messageID = newMessage.id;
            const argTwo = args[2];
            guildData.verificationSystem.emoji = argTwo as string;
            discordUser.updateGuildDataInDB(guildData);

            msgString = "__**Nicely done! You've enabled the verification system for this server!**__";
            const msgEmbed = new Discord.MessageEmbed();
            msgEmbed
                .setAuthor(message.author.username, message.author.avatarURL() as string)
                .setColor([0, 0, 255])
                .setTimestamp((Date() as unknown) as Date)
                .setTitle('__**Set Verification System:**__')
                .setDescription(msgString);
            await message.channel.send(msgEmbed);
            if (message.deletable){
                await message.delete();
            }
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
