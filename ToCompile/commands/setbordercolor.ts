// setbordercolor.ts - Module for my "set border color" command.
// Apr 3, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

import Discord = require('discord.js');
import DiscordStuff = require('../DiscordStuff');

const command = new DiscordStuff.BotCommand();
command.name = 'setbordercolor';
command.description = '__**Set Border Color Usage:**__ Sets the default color of the borders of the chat messages sent out by this bot! '+
'!setbordercolor = BOTNAME, BOTCOLORREDCHANNEL, BOTCOLORGREENCHANNEL, BOTCOLORBLUECHANNEL where botcolor is an array of 3 color values between 0 and 255.';

async function execute(commandData: DiscordStuff.CommandData, discordUser: DiscordStuff.DiscordUser): Promise<DiscordStuff.CommandReturnData> {
    try{
        const commandReturnData = new DiscordStuff.CommandReturnData();
        commandReturnData.commandName = command.name;
        
        const guildData = await discordUser.getGuildDataFromDB(commandData.guild as Discord.Guild);

        const borderColor: number[] = [];
        if (commandData.args[0] === undefined || (commandData.args[0].toLowerCase() !== 'janny' && commandData.args[0].toLowerCase() !== 'gamehouse' && commandData.args[0] !== 'musichouse')){
            const msgString = `------\n**Please, enter a bot's name as the first argument to this command! (!setbordercolor = BOTNAME, BOTCOLORREDCHANNEL, BOTCOLORGREENCHANNEL, BOTCOLORBLUECHANNEL)**\n------`;
            const msgEmbed = new Discord.MessageEmbed();
            msgEmbed
                .setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL() as string)
                .setColor(guildData.borderColor as [number, number, number])
                .setDescription(msgString)
                .setTimestamp(Date() as unknown as Date)
                .setTitle("__**Missing Or Invalid Arguments:**__");
            await DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed);
            return commandReturnData;
        }
        else if (commandData.args[0].toLowerCase() !== 'janny'){
            return commandReturnData;
        }
        if (parseInt(commandData.args[1] as string, 10) > 255 || parseInt(commandData.args[1] as string) < 0){
            const msgString = `------\n**Please, enter a red-channel value between 0 and 255! (!setbordercolor = BOTNAME, BOTCOLORREDCHANNEL, BOTCOLORGREENCHANNEL, BOTCOLORBLUECHANNEL)**\n------`;
            const msgEmbed = new Discord.MessageEmbed();
            msgEmbed
                .setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL() as string)
                .setColor(guildData.borderColor as [number, number, number])
                .setDescription(msgString)
                .setTimestamp(Date() as unknown as Date)
                .setTitle("__**Missing Or Invalid Arguments:**__");
            await DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed);
            return commandReturnData;
        }
        else if (parseInt(commandData.args[2] as string, 10) > 255 || parseInt(commandData.args[2] as string) < 0){
            const msgString = `------\n**Please, enter a green-channel value between 0 and 255! (!setbordercolor = BOTNAME, BOTCOLORREDCHANNEL, BOTCOLORGREENCHANNEL, BOTCOLORBLUECHANNEL)**\n------`;
            const msgEmbed = new Discord.MessageEmbed();
            msgEmbed
                .setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL() as string)
                .setColor(guildData.borderColor as [number, number, number])
                .setDescription(msgString)
                .setTimestamp(Date() as unknown as Date)
                .setTitle("__**Missing Or Invalid Arguments:**__");
            await DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed);
            return commandReturnData;
        }
        else if (parseInt(commandData.args[3] as string, 10) > 255 || parseInt(commandData.args[3] as string) < 0){
            const msgString = `------\n**Please, enter a green-channel value between 0 and 255! (!setbordercolor = BOTNAME, BOTCOLORREDCHANNEL, BOTCOLORGREENCHANNEL, BOTCOLORBLUECHANNEL)**\n------`;
            const msgEmbed = new Discord.MessageEmbed();
            msgEmbed
                .setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL() as string)
                .setColor(guildData.borderColor as [number, number, number])
                .setDescription(msgString)
                .setTimestamp(Date() as unknown as Date)
                .setTitle("__**Missing Or Invalid Arguments:**__");
            await DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed);
            return commandReturnData;
        }
        else {
            borderColor[0] = parseInt(commandData.args[1] as string, 10);
            if (borderColor[0] === 255){
                borderColor[0] = 254;
            }
            borderColor[1] = parseInt(commandData.args[2] as string, 10);
            if (borderColor[1] === 255){
                borderColor[1] = 254;
            }
            borderColor[2] = parseInt(commandData.args[3] as string, 10);
            if (borderColor[2] === 255){
                borderColor[2] = 254;
            }
        }
 
        guildData.borderColor = borderColor;
        await discordUser.updateGuildDataInDB(guildData);

        const msgEmbed = new Discord.MessageEmbed();
        msgEmbed
            .setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL() as string)
            .setColor(guildData.borderColor as [number, number, number])
            .setDescription(`Nicely done, you've updated the default border color for this bot!\n------\n__**Border Color Values:**__ ${guildData.borderColor}\n------`)
            .setTimestamp(Date() as unknown as Date)
            .setTitle('__**Updated Border Color:**__');
        await DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed);
        return commandReturnData;
    }
    catch(error){
        return new Promise((resolve, reject) => {
            reject(error);
        })
    }

}
command.function = execute;
export default command as DiscordStuff.BotCommand;
