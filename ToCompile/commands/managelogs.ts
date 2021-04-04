// managelogs.ts - Module for my "manage logs" command.
// Mar 11, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

import Discord = require('discord.js');
import DiscordStuff = require('../DiscordStuff');

const command = new DiscordStuff.BotCommand();
command.name = 'managelogs';
command.description = '!managelogs, to view an enabled/disabled list of possible logs!';
async function execute(commandData: DiscordStuff.CommandData, discordUser: DiscordStuff.DiscordUser): Promise<DiscordStuff.CommandReturnData> {
    try {
        const commandReturnData = new DiscordStuff.CommandReturnData();
		commandReturnData.commandName = command.name;
        const areWeInADM = await DiscordStuff.areWeInADM(commandData);

        if (areWeInADM === true) {
            return commandReturnData;
        }

        const areWeAnAdmin = await discordUser.doWeHaveAdminPermission(commandData);

        if (areWeAnAdmin === false) {
            return commandReturnData;
        }

        const guildData = await discordUser.getGuildDataFromDB(commandData.guild!);

        if (commandData.args[0] as string === undefined) {
            const fields = [];
            for (let x = 0; x < guildData.logs.length; x += 1) {
                if (commandData.guildMember!.client.channels.resolve(guildData.logs[x]!.loggingChannelID) === null) {
                    guildData.logs[x]!.loggingChannelID = '';
                    guildData.logs[x]!.loggingChannelName = '';
                    guildData.logs[x]!.enabled = false;
                }
                if (guildData.logs[x]!.enabled === false) {
                    const field = { name: `__**${guildData.logs[x]!.name}**__`, value: '__Enabled:__ ❌', inline: true };
                    fields.push(field);
                } else if (guildData.logs[x]!.enabled === true) {
                    const field = { name: `__**${guildData.logs[x]!.name}**__`, value: `__Enabled:__ ✅
                        \n__Logging Channel:__ <#${guildData.logs[x]!.loggingChannelID}>`, inline: true };
                    fields.push(field);
                }
            }

            const msgEmbed = new Discord.MessageEmbed();
            let msgString = '';
            msgString = `**To enable/disable a given log, enter within the text channel where you would like it to be logged: !managelogs = 
                <enable/disable>, <logname>\nFor example, '!managelogs = enable, guildbanadd'.**'`;
            msgEmbed
                .setAuthor((commandData.guildMember as Discord.GuildMember).user.username, ((commandData.guildMember as Discord.GuildMember).user as Discord.User).avatarURL() as string)
                .setColor(guildData.borderColor as [number, number, number])
                .setDescription(msgString)
                .setTimestamp(Date() as unknown as Date)
                .setTitle('__**Manage Logs:**__').fields = fields;

            await DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed);
           
        } else if ((commandData.args[0] as string).toString().toLowerCase() !== 'enable' && (commandData.args[0] as string).toString().toLowerCase() !== 'disable') {
            const msgString = `------\n**Please, enter enable or disable for the first argument of this command! 
            (!managelogs = <enable/disable>, <logname>)**\n------`;
            let msgEmbed = new Discord.MessageEmbed()
				.setAuthor((commandData.guildMember as Discord.GuildMember)?.user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL() as string)
				.setColor(guildData.borderColor as [number, number, number])
				.setDescription(msgString)
				.setTimestamp(Date() as unknown as Date)
				.setTitle('__**Missing Or Invalid Arguments:**__')
            let msg = await DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed);
            if (commandData.toTextChannel instanceof Discord.WebhookClient){
                msg = new Discord.Message(commandData.guild!.client, msg, commandData.fromTextChannel!);
            }
            await msg.delete({timeout: 20000});
           
            return commandReturnData;
        } 
        else if (commandData.args[1] === undefined){
            const msgString = `------\n**Please, enter  a log name to disable or enable as the second argument of this command! 
            (!managelogs = <enable/disable>, <logname>)**\n------`;
            let msgEmbed = new Discord.MessageEmbed()
				.setAuthor((commandData.guildMember as Discord.GuildMember)?.user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL() as string)
				.setColor(guildData.borderColor as [number, number, number])
				.setDescription(msgString)
				.setTimestamp(Date() as unknown as Date)
				.setTitle('__**Missing Or Invalid Arguments:**__')
            let msg = await DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed);
            if (commandData.toTextChannel instanceof Discord.WebhookClient){
                msg = new Discord.Message(commandData.guild!.client, msg, commandData.fromTextChannel!);
            }
            await msg.delete({timeout: 20000});
           
            return commandReturnData;
        }
        else {
            switch (((commandData.args[1] as string) as string).toLowerCase()) {
            case 'guildbanadd':
                if (commandData.args[0]!.toString().toLowerCase() === 'enable') {
                    for (let x = 0; x < guildData.logs.length; x += 1) {
                        if (commandData.args[1]!.toLowerCase() === guildData.logs[x]!.nameSmall) {
                            guildData.logs[x]!.loggingChannelID = commandData.permsChannel!.id;
                            guildData.logs[x]!.loggingChannelName = commandData.permsChannel!.name;
                            guildData.logs[x]!.enabled = true;
                            await discordUser.updateGuildDataInDB(guildData);
                            const msgEmbed = new Discord.MessageEmbed();
                            const msgString = `------\n**Nicely done! You've enabled logging for '${guildData.logs[x]!.name}'.\nIn channel <#${guildData.logs[x]!.loggingChannelID}>.**\n------`;
                            msgEmbed
                                .setAuthor((commandData.guildMember as Discord.GuildMember).user.username, ((commandData.guildMember as Discord.GuildMember).user as Discord.User).avatarURL() as string)
                                .setColor(guildData.borderColor as [number, number, number])
                                .setDescription(msgString)
                                .setTimestamp(Date() as unknown as Date)
                                .setTitle('__**Manage Logs Enabled:**__');
                            await DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed);
                            
                            break;
                        }
                    }
                } else if ((commandData.args[0] as string).toString().toLowerCase() === 'disable') {
                    for (let x = 0; x < guildData.logs.length; x += 1) {
                        if ((commandData.args[1] as string).toLowerCase() === guildData.logs[x]!.nameSmall) {
                            guildData.logs[x]!.loggingChannelID = '';
                            guildData.logs[x]!.loggingChannelName = '';
                            guildData.logs[x]!.enabled = false;
                            await discordUser.updateGuildDataInDB(guildData);
                            const msgEmbed = new Discord.MessageEmbed();    
                            const msgString = `------\n**Nicely done! You've disabled logging for '${guildData.logs[x]!.name}'.**\n------`;
                            msgEmbed
                                .setAuthor((commandData.guildMember as Discord.GuildMember).user.username, ((commandData.guildMember as Discord.GuildMember).user as Discord.User).avatarURL() as string)
                                .setColor(guildData.borderColor as [number, number, number])
                                .setDescription(msgString)
                                .setTimestamp(Date() as unknown as Date)
                                .setTitle('__**Manage Logs Disabled:**__');
                            await DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed);
                            
                            break;
                        }
                    }
                }
                break;
            case 'guildbanremove':
                if (commandData.args[0]!.toString().toLowerCase() === 'enable') {
                    for (let x = 0; x < guildData.logs.length; x += 1) {
                        if ((commandData.args[1] as string).toLowerCase() === guildData.logs[x]!.nameSmall) {
                            guildData.logs[x]!.loggingChannelID = commandData.permsChannel!.id;
                            guildData.logs[x]!.loggingChannelName = commandData.permsChannel!.name;
                            guildData.logs[x]!.enabled = true;
                            await discordUser.updateGuildDataInDB(guildData);
                            const msgEmbed = new Discord.MessageEmbed();
                            const msgString = `------\n**Nicely done! You've enabled logging for '${guildData.logs[x]!.name}'.\nIn channel <#${guildData.logs[x]!.loggingChannelID}>.**\n------`;
                            msgEmbed
                                .setAuthor((commandData.guildMember as Discord.GuildMember).user.username, ((commandData.guildMember as Discord.GuildMember).user as Discord.User).avatarURL() as string)
                                .setColor(guildData.borderColor as [number, number, number])
                                .setDescription(msgString)
                                .setTimestamp(Date() as unknown as Date)
                                .setTitle('__**Manage Logs Enabled:**__');
                            await DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed);
                            
                            break;
                        }
                    }
                } else if ((commandData.args[0] as string).toString().toLowerCase() === 'disable') {
                    for (let x = 0; x < guildData.logs.length; x += 1) {
                        if (commandData.args[1]!.toLowerCase() === guildData.logs[x]!.nameSmall) {
                            guildData.logs[x]!.loggingChannelID = '';
                            guildData.logs[x]!.loggingChannelName = '';
                            guildData.logs[x]!.enabled = false;
                            await discordUser.updateGuildDataInDB(guildData);
                            const msgEmbed = new Discord.MessageEmbed();
                            const msgString = `------\n**Nicely done! You've disabled logging for '${guildData.logs[x]!.name}'.**\n------`;
                            msgEmbed
                            .setAuthor((commandData.guildMember as Discord.GuildMember).user.username, ((commandData.guildMember as Discord.GuildMember).user as Discord.User).avatarURL() as string)
                                .setColor(guildData.borderColor as [number, number, number])
                                .setDescription(msgString)
                                .setTimestamp(Date() as unknown as Date)
                                .setTitle('__**Manage Logs Disabled:**__');
                            await DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed);
                            
                            break;
                        }
                    }
                }
                break;
            case 'guildmemberadd':
                if (commandData.args[0]!.toString().toLowerCase() === 'enable') {
                    for (let x = 0; x < guildData.logs.length; x += 1) {
                        if (commandData.args[1]!.toLowerCase() === guildData.logs[x]!.nameSmall) {
                            guildData.logs[x]!.loggingChannelID = commandData.permsChannel!.id;
                            guildData.logs[x]!.loggingChannelName = commandData.permsChannel!.name;
                            guildData.logs[x]!.enabled = true;
                            await discordUser.updateGuildDataInDB(guildData);
                            const msgEmbed = new Discord.MessageEmbed();
                            const msgString = `------\n**Nicely done! You've enabled logging for '${guildData.logs[x]!.name}'.\nIn channel <#${guildData.logs[x]!.loggingChannelID}>.**\n------`;
                            msgEmbed
                                .setAuthor((commandData.guildMember as Discord.GuildMember).user.username, ((commandData.guildMember as Discord.GuildMember).user as Discord.User).avatarURL() as string)
                                .setColor(guildData.borderColor as [number, number, number])
                                .setDescription(msgString)
                                .setTimestamp(Date() as unknown as Date)
                                .setTitle('__**Manage Logs Enabled:**__');
                            await DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed);
                            
                            break;
                        }
                    }
                } else if ((commandData.args[0] as string).toString().toLowerCase() === 'disable') {
                    for (let x = 0; x < guildData.logs.length; x += 1) {
                        if ((commandData.args[1] as string).toLowerCase() === guildData.logs[x]!.nameSmall) {
                            guildData.logs[x]!.loggingChannelID = '';
                            guildData.logs[x]!.loggingChannelName = '';
                            guildData.logs[x]!.enabled = false;
                            await discordUser.updateGuildDataInDB(guildData);
                            const msgEmbed = new Discord.MessageEmbed();
                            const msgString = `------\n**Nicely done! You've disabled logging for '${guildData.logs[x]!.name}'.**\n------`;
                            msgEmbed
                                .setAuthor((commandData.guildMember as Discord.GuildMember).user.username, ((commandData.guildMember as Discord.GuildMember).user as Discord.User).avatarURL() as string)
                                .setColor(guildData.borderColor as [number, number, number])
                                .setDescription(msgString)
                                .setTimestamp(Date() as unknown as Date)
                                .setTitle('__**Manage Logs Disabled:**__');
                            await DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed);
                            
                            break;
                        }
                    }
                }
                break;
            case 'guildmemberremove':
                if (commandData.args[0]!.toString().toLowerCase() === 'enable') {
                    for (let x = 0; x < guildData.logs.length; x += 1) {
                        if (commandData.args[1]!.toLowerCase() === guildData.logs[x]!.nameSmall) {
                            guildData.logs[x]!.loggingChannelID = commandData.permsChannel!.id;
                            guildData.logs[x]!.loggingChannelName = commandData.permsChannel!.name;
                            guildData.logs[x]!.enabled = true;
                            await discordUser.updateGuildDataInDB(guildData);
                            const msgEmbed = new Discord.MessageEmbed();
                            const msgString = `------\n**Nicely done! You've enabled logging for '${guildData.logs[x]!.name}' in channel <#${guildData.logs[x]!.loggingChannelID}>.**\n------'`;
                            
                            msgEmbed
                                .setAuthor((commandData.guildMember as Discord.GuildMember).user.username, ((commandData.guildMember as Discord.GuildMember).user as Discord.User).avatarURL() as string)
                                .setColor(guildData.borderColor as [number, number, number])
                                .setDescription(msgString)
                                .setTimestamp(Date() as unknown as Date)
                                .setTitle('__**Manage Logs Enabled:**__');
                            await DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed);
                            
                            break;
                        }
                    }
                } else if ((commandData.args[0] as string).toString().toLowerCase() === 'disable') {
                    for (let x = 0; x < guildData.logs.length; x += 1) {
                        if (commandData.args[1]!.toLowerCase() === guildData.logs[x]!.nameSmall) {
                            guildData.logs[x]!.loggingChannelID = '';
                            guildData.logs[x]!.loggingChannelName = '';
                            guildData.logs[x]!.enabled = false;
                            await discordUser.updateGuildDataInDB(guildData);
                            const msgEmbed = new Discord.MessageEmbed();
                            const msgString = `------\n**Nicely done! You've disabled logging for '${guildData.logs[x]!.name}'.**\n------`;
                            msgEmbed
                                .setAuthor((commandData.guildMember as Discord.GuildMember).user.username, ((commandData.guildMember as Discord.GuildMember).user as Discord.User).avatarURL() as string)
                                .setColor(guildData.borderColor as [number, number, number])
                                .setDescription(msgString)
                                .setTimestamp(Date() as unknown as Date)
                                .setTitle('__**Manage Logs Disabled:**__');
                            await DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed);
                            
                            break;
                        }
                    }
                }
                break;
            case 'displaynamechange':
                if (commandData.args[0]!.toString().toLowerCase() === 'enable') {
                    for (let x = 0; x < guildData.logs.length; x += 1) {
                        if (commandData.args[1]!.toLowerCase() === guildData.logs[x]!.nameSmall) {
                            guildData.logs[x]!.loggingChannelID = commandData.permsChannel!.id;
                            guildData.logs[x]!.loggingChannelName = commandData.permsChannel!.name;
                            guildData.logs[x]!.enabled = true;
                            await discordUser.updateGuildDataInDB(guildData);
                            const msgEmbed = new Discord.MessageEmbed();
                            const msgString = `------\n**Nicely done! You've enabled logging for '${guildData.logs[x]!.name}'.\nIn channel <#${guildData.logs[x]!.loggingChannelID}>.**\n------`;
                            msgEmbed
                                .setAuthor((commandData.guildMember as Discord.GuildMember).user.username, ((commandData.guildMember as Discord.GuildMember).user as Discord.User).avatarURL() as string)
                                .setColor(guildData.borderColor as [number, number, number])
                                .setDescription(msgString)
                                .setTimestamp(Date() as unknown as Date)
                                .setTitle('__**Manage Logs Enabled:**__');
                            await DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed);
                            
                            break;
                        }
                    }
                } else if ((commandData.args[0] as string).toString().toLowerCase() === 'disable') {
                    for (let x = 0; x < guildData.logs.length; x += 1) {
                        if (commandData.args[1]!.toLowerCase() === guildData.logs[x]!.nameSmall) {
                            guildData.logs[x]!.loggingChannelID = '';
                            guildData.logs[x]!.loggingChannelName = '';
                            guildData.logs[x]!.enabled = false;
                            await discordUser.updateGuildDataInDB(guildData);
                            const msgEmbed = new Discord.MessageEmbed();
                            const msgString = `------\n**Nicely done! You've disabled logging for '${guildData.logs[x]!.name}'.**\n------`;
                            msgEmbed
                                .setAuthor((commandData.guildMember as Discord.GuildMember).user.username, ((commandData.guildMember as Discord.GuildMember).user as Discord.User).avatarURL() as string)
                                .setColor(guildData.borderColor as [number, number, number])
                                .setDescription(msgString)
                                .setTimestamp(Date() as unknown as Date)
                                .setTitle('__**Manage Logs Disabled:**__');
                            await DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed);
                            
                            break;
                        }
                    }
                }
                break;
            case 'nicknamechange':
                if (commandData.args[0]!.toString().toLowerCase() === 'enable') {
                    for (let x = 0; x < guildData.logs.length; x += 1) {
                        if (commandData.args[1]!.toLowerCase() === guildData.logs[x]!.nameSmall) {
                            guildData.logs[x]!.loggingChannelID = commandData.permsChannel!.id;
                            guildData.logs[x]!.loggingChannelName = commandData.permsChannel!.name;
                            guildData.logs[x]!.enabled = true;
                            await discordUser.updateGuildDataInDB(guildData);
                            const msgEmbed = new Discord.MessageEmbed();
                            const msgString = `------\n**Nicely done! You've enabled logging for '${guildData.logs[x]!.name}'.\nIn channel <#${guildData.logs[x]!.loggingChannelID}>.**\n------`;
                            msgEmbed
                                .setAuthor((commandData.guildMember as Discord.GuildMember).user.username, ((commandData.guildMember as Discord.GuildMember).user as Discord.User).avatarURL() as string)
                                .setColor(guildData.borderColor as [number, number, number])
                                .setDescription(msgString)
                                .setTimestamp(Date() as unknown as Date)
                                .setTitle('__**Manage Logs Enabled:**__');
                            await DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed);
                            
                            break;
                        }
                    }
                } else if ((commandData.args[0] as string).toString().toLowerCase() === 'disable') {
                    for (let x = 0; x < guildData.logs.length; x += 1) {
                        if (commandData.args[1]!.toLowerCase() === guildData.logs[x]!.nameSmall) {
                            guildData.logs[x]!.loggingChannelID = '';
                            guildData.logs[x]!.loggingChannelName = '';
                            guildData.logs[x]!.enabled = false;
                            await discordUser.updateGuildDataInDB(guildData);
                            const msgEmbed = new Discord.MessageEmbed();
                            const msgString = `------\n**Nicely done! You've disabled logging for '${guildData.logs[x]!.name}'.**\n------`;
                            msgEmbed
                                .setAuthor((commandData.guildMember as Discord.GuildMember).user.username, ((commandData.guildMember as Discord.GuildMember).user as Discord.User).avatarURL() as string)
                                .setColor(guildData.borderColor as [number, number, number])
                                .setDescription(msgString)
                                .setTimestamp(Date() as unknown as Date)
                                .setTitle('__**Manage Logs Disabled:**__');
                            await DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed);
                            
                            break;
                        }
                    }
                }
                break;
            case 'roleaddorremove':
                if (commandData.args[0]!.toString().toLowerCase() === 'enable') {
                    for (let x = 0; x < guildData.logs.length; x += 1) {
                        if (commandData.args[1]!.toLowerCase() === guildData.logs[x]!.nameSmall) {
                            guildData.logs[x]!.loggingChannelID = commandData.permsChannel!.id;
                            guildData.logs[x]!.loggingChannelName = commandData.permsChannel!.name;
                            guildData.logs[x]!.enabled = true;
                            await discordUser.updateGuildDataInDB(guildData);
                            const msgEmbed = new Discord.MessageEmbed();
                            const msgString = `------\n**Nicely done! You've enabled logging for '${guildData.logs[x]!.name}'.\nIn channel <#${guildData.logs[x]!.loggingChannelID}>.**\n------`;
                            msgEmbed
                                .setAuthor((commandData.guildMember as Discord.GuildMember).user.username, ((commandData.guildMember as Discord.GuildMember).user as Discord.User).avatarURL() as string)
                                .setColor(guildData.borderColor as [number, number, number])
                                .setDescription(msgString)
                                .setTimestamp(Date() as unknown as Date)
                                .setTitle('__**Manage Logs Enabled:**__');
                            await DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed);
                            
                            break;
                        }
                    }
                } else if ((commandData.args[0] as string).toString().toLowerCase() === 'disable') {
                    for (let x = 0; x < guildData.logs.length; x += 1) {
                        if (commandData.args[1]!.toLowerCase() === guildData.logs[x]!.nameSmall) {
                            guildData.logs[x]!.loggingChannelID = '';
                            guildData.logs[x]!.loggingChannelName = '';
                            guildData.logs[x]!.enabled = false;
                            await discordUser.updateGuildDataInDB(guildData);
                            const msgEmbed = new Discord.MessageEmbed();
                            const msgString = `------\n**Nicely done! You've disabled logging for '${guildData.logs[x]!.name}'.**\n------`;
                            msgEmbed
                                .setAuthor((commandData.guildMember as Discord.GuildMember).user.username, ((commandData.guildMember as Discord.GuildMember).user as Discord.User).avatarURL() as string)
                                .setColor(guildData.borderColor as [number, number, number])
                                .setDescription(msgString)
                                .setTimestamp(Date() as unknown as Date)
                                .setTitle('__**Manage Logs Disabled:**__');
                            await DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed);
                            
                            break;
                        }
                    }
                }
                break;
            case 'invitecreate':
                if (commandData.args[0]!.toString().toLowerCase() === 'enable') {
                    for (let x = 0; x < guildData.logs.length; x += 1) {
                        if (commandData.args[1]!.toLowerCase() === guildData.logs[x]!.nameSmall) {
                            guildData.logs[x]!.loggingChannelID = commandData.permsChannel!.id;
                            guildData.logs[x]!.loggingChannelName = commandData.permsChannel!.name;
                            guildData.logs[x]!.enabled = true;
                            await discordUser.updateGuildDataInDB(guildData);
                            const msgEmbed = new Discord.MessageEmbed();
                            const msgString = `------\n**Nicely done! You've enabled logging for '${guildData.logs[x]!.name}'.\nIn channel <#${guildData.logs[x]!.loggingChannelID}>.**\n------`;
                            msgEmbed
                                .setAuthor((commandData.guildMember as Discord.GuildMember).user.username, ((commandData.guildMember as Discord.GuildMember).user as Discord.User).avatarURL() as string)
                                .setColor(guildData.borderColor as [number, number, number])
                                .setDescription(msgString)
                                .setTimestamp(Date() as unknown as Date)
                                .setTitle('__**Manage Logs Enabled:**__');
                            await DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed);
                            
                            break;
                        }
                    }
                } else if ((commandData.args[0] as string).toString().toLowerCase() === 'disable') {
                    for (let x = 0; x < guildData.logs.length; x += 1) {
                        if (commandData.args[1]!.toLowerCase() === guildData.logs[x]!.nameSmall) {
                            guildData.logs[x]!.loggingChannelID = '';
                            guildData.logs[x]!.loggingChannelName = '';
                            guildData.logs[x]!.enabled = false;
                            await discordUser.updateGuildDataInDB(guildData);
                            const msgEmbed = new Discord.MessageEmbed();
                            const msgString = `------\n**Nicely done! You've disabled logging for '${guildData.logs[x]!.name}'.**\n------`;
                            msgEmbed
                                .setAuthor((commandData.guildMember as Discord.GuildMember).user.username, ((commandData.guildMember as Discord.GuildMember).user as Discord.User).avatarURL() as string)
                                .setColor(guildData.borderColor as [number, number, number])
                                .setDescription(msgString)
                                .setTimestamp(Date() as unknown as Date)
                                .setTitle('__**Manage Logs Disabled:**__');
                            await DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed);
                            
                            break;
                        }
                    }
                }
                break;
            case 'messagedelete':
                if (commandData.args[0]!.toString().toLowerCase() === 'enable') {
                    for (let x = 0; x < guildData.logs.length; x += 1) {
                        if (commandData.args[1]!.toLowerCase() === guildData.logs[x]!.nameSmall) {
                            guildData.logs[x]!.loggingChannelID = commandData.permsChannel!.id;
                            guildData.logs[x]!.loggingChannelName = commandData.permsChannel!.name;
                            guildData.logs[x]!.enabled = true;
                            await discordUser.updateGuildDataInDB(guildData);
                            const msgEmbed = new Discord.MessageEmbed();
                            const msgString = `------\n**Nicely done! You've enabled logging for '${guildData.logs[x]!.name}'.\nIn channel <#${guildData.logs[x]!.loggingChannelID}>.**\n------`;
                            msgEmbed
                                .setAuthor((commandData.guildMember as Discord.GuildMember).user.username, ((commandData.guildMember as Discord.GuildMember).user as Discord.User).avatarURL() as string)
                                .setColor(guildData.borderColor as [number, number, number])
                                .setDescription(msgString)
                                .setTimestamp(Date() as unknown as Date)
                                .setTitle('__**Manage Logs Enabled:**__');
                            await DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed);
                            
                            break;
                        }
                    }
                } else if ((commandData.args[0] as string).toString().toLowerCase() === 'disable') {
                    for (let x = 0; x < guildData.logs.length; x += 1) {
                        if (commandData.args[1]!.toLowerCase() === guildData.logs[x]!.nameSmall) {
                            guildData.logs[x]!.loggingChannelID = '';
                            guildData.logs[x]!.loggingChannelName = '';
                            guildData.logs[x]!.enabled = false;
                            await discordUser.updateGuildDataInDB(guildData);
                            const msgEmbed = new Discord.MessageEmbed();
                            const msgString = `------\n**Nicely done! You've disabled logging for '${guildData.logs[x]!.name}'.**\n------`;
                            msgEmbed
                                .setAuthor((commandData.guildMember as Discord.GuildMember).user.username, ((commandData.guildMember as Discord.GuildMember).user as Discord.User).avatarURL() as string)
                                .setColor(guildData.borderColor as [number, number, number])
                                .setDescription(msgString)
                                .setTimestamp(Date() as unknown as Date)
                                .setTitle('__**Manage Logs Disabled:**__');
                            await DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed);
                            
                            break;
                        }
                    }
                }
                break;
            case 'messagedeletebulk':
                if (commandData.args[0]!.toString().toLowerCase() === 'enable') {
                    for (let x = 0; x < guildData.logs.length; x += 1) {
                        if (commandData.args[1]!.toLowerCase() === guildData.logs[x]!.nameSmall) {
                            guildData.logs[x]!.loggingChannelID = commandData.permsChannel!.id;
                            guildData.logs[x]!.loggingChannelName = commandData.permsChannel!.name;
                            guildData.logs[x]!.enabled = true;
                            await discordUser.updateGuildDataInDB(guildData);
                            const msgEmbed = new Discord.MessageEmbed();
                            const msgString = `------\n**Nicely done! You've enabled logging for '${guildData.logs[x]!.name}'.\nIn channel <#${guildData.logs[x]!.loggingChannelID}>.**\n------`;
                            msgEmbed
                                .setAuthor((commandData.guildMember as Discord.GuildMember).user.username, ((commandData.guildMember as Discord.GuildMember).user as Discord.User).avatarURL() as string)
                                .setColor(guildData.borderColor as [number, number, number])
                                .setDescription(msgString)
                                .setTimestamp(Date() as unknown as Date)
                                .setTitle('__**Manage Logs Enabled:**__');
                            await DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed);
                            
                            break;
                        }
                    }
                } else if ((commandData.args[0] as string).toString().toLowerCase() === 'disable') {
                    for (let x = 0; x < guildData.logs.length; x += 1) {
                        if (commandData.args[1]!.toLowerCase() === guildData.logs[x]!.nameSmall) {
                            guildData.logs[x]!.enabled = true;
                            guildData.logs[x]!.loggingChannelName = '';
                            guildData.logs[x]!.enabled = false;
                            await discordUser.updateGuildDataInDB(guildData);
                            const msgEmbed = new Discord.MessageEmbed();
                            const msgString = `------\n**Nicely done! You've disabled logging for '${guildData.logs[x]!.name}'.**\n------`;
                            msgEmbed
                                .setAuthor((commandData.guildMember as Discord.GuildMember).user.username, ((commandData.guildMember as Discord.GuildMember).user as Discord.User).avatarURL() as string)
                                .setColor(guildData.borderColor as [number, number, number])
                                .setDescription(msgString)
                                .setTimestamp(Date() as unknown as Date)
                                .setTitle('__**Manage Logs Disabled:**__');
                            await DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed);
                            
                            break;
                        }
                    }
                }
                break;
            case 'messageupdate':
                if (commandData.args[0]!.toString().toLowerCase() === 'enable') {
                    for (let x = 0; x < guildData.logs.length; x += 1) {
                        if (commandData.args[1]!.toLowerCase() === guildData.logs[x]!.nameSmall) {
                            guildData.logs[x]!.loggingChannelID = commandData.permsChannel!.id;
                            guildData.logs[x]!.loggingChannelName = commandData.permsChannel!.name;
                            guildData.logs[x]!.enabled = true;
                            await discordUser.updateGuildDataInDB(guildData);
                            const msgEmbed = new Discord.MessageEmbed();
                            const msgString = `------\n**Nicely done! You've enabled logging for '${guildData.logs[x]!.name}'.\nIn channel <#${guildData.logs[x]!.loggingChannelID}>.**\n------`;
                            msgEmbed
                                .setAuthor((commandData.guildMember as Discord.GuildMember).user.username, ((commandData.guildMember as Discord.GuildMember).user as Discord.User).avatarURL() as string)
                                .setColor(guildData.borderColor as [number, number, number])
                                .setDescription(msgString)
                                .setTimestamp(Date() as unknown as Date)
                                .setTitle('__**Manage Logs Enabled:**__');
                            await DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed);
                            
                            break;
                        }
                    }
                } else if ((commandData.args[0] as string).toString().toLowerCase() === 'disable') {
                    for (let x = 0; x < guildData.logs.length; x += 1) {
                        if (commandData.args[1]!.toLowerCase() === guildData.logs[x]!.nameSmall) {
                            guildData.logs[x]!.loggingChannelID = '';
                            guildData.logs[x]!.loggingChannelName = '';
                            guildData.logs[x]!.enabled = false;
                            await discordUser.updateGuildDataInDB(guildData);
                            const msgEmbed = new Discord.MessageEmbed();
                            const msgString = `------\n**Nicely done! You've disabled logging for '${guildData.logs[x]!.name}'.**\n------`;
                            msgEmbed
                                .setAuthor((commandData.guildMember as Discord.GuildMember).user.username, ((commandData.guildMember as Discord.GuildMember).user as Discord.User).avatarURL() as string)
                                .setColor(guildData.borderColor as [number, number, number])
                                .setDescription(msgString)
                                .setTimestamp(Date() as unknown as Date)
                                .setTitle('__**Manage Logs Disabled:**__');
                            await DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed);
                            
                            break;
                        }
                    }
                }
                break;
            case 'rolecreate':
                if (commandData.args[0]!.toString().toLowerCase() === 'enable') {
                    for (let x = 0; x < guildData.logs.length; x += 1) {
                        if (commandData.args[1]!.toLowerCase() === guildData.logs[x]!.nameSmall) {
                            guildData.logs[x]!.loggingChannelID = commandData.permsChannel!.id;
                            guildData.logs[x]!.loggingChannelName = commandData.permsChannel!.name;
                            guildData.logs[x]!.enabled = true;
                            await discordUser.updateGuildDataInDB(guildData);
                            const msgEmbed = new Discord.MessageEmbed();
                            const msgString = `------\n**Nicely done! You've enabled logging for '${guildData.logs[x]!.name}'.\nIn channel <#${guildData.logs[x]!.loggingChannelID}>.**\n------`;
                            msgEmbed
                                .setAuthor((commandData.guildMember as Discord.GuildMember).user.username, ((commandData.guildMember as Discord.GuildMember).user as Discord.User).avatarURL() as string)
                                .setColor(guildData.borderColor as [number, number, number])
                                .setDescription(msgString)
                                .setTimestamp(Date() as unknown as Date)
                                .setTitle('__**Manage Logs Enabled:**__');
                            await DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed);
                            
                            break;
                        }
                    }
                } else if ((commandData.args[0] as string).toString().toLowerCase() === 'disable') {
                    for (let x = 0; x < guildData.logs.length; x += 1) {
                        if (commandData.args[1]!.toLowerCase() === guildData.logs[x]!.nameSmall) {
                            guildData.logs[x]!.loggingChannelID = '';
                            guildData.logs[x]!.loggingChannelName = '';
                            guildData.logs[x]!.enabled = false;
                            await discordUser.updateGuildDataInDB(guildData);
                            const msgEmbed = new Discord.MessageEmbed();
                            const msgString = `------\n**Nicely done! You've disabled logging for '${guildData.logs[x]!.name}'.**\n------`;
                            msgEmbed
                                .setAuthor((commandData.guildMember as Discord.GuildMember).user.username, ((commandData.guildMember as Discord.GuildMember).user as Discord.User).avatarURL() as string)
                                .setColor(guildData.borderColor as [number, number, number])
                                .setDescription(msgString)
                                .setTimestamp(Date() as unknown as Date)
                                .setTitle('__**Manage Logs Disabled:**__');
                            await DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed);
                            
                            break;
                        }
                    }
                }
                break;
            case 'roledelete':
                if (commandData.args[0]!.toString().toLowerCase() === 'enable') {
                    for (let x = 0; x < guildData.logs.length; x += 1) {
                        if (commandData.args[1]!.toLowerCase() === guildData.logs[x]!.nameSmall) {
                            guildData.logs[x]!.loggingChannelID = commandData.permsChannel!.id;
                            guildData.logs[x]!.loggingChannelName = commandData.permsChannel!.name;
                            guildData.logs[x]!.enabled = true;
                            await discordUser.updateGuildDataInDB(guildData);
                            const msgEmbed = new Discord.MessageEmbed();
                            const msgString = `------\n**Nicely done! You've enabled logging for '${guildData.logs[x]!.name}'.\nIn channel <#${guildData.logs[x]!.loggingChannelID}>.**\n------`;
                            msgEmbed
                                .setAuthor((commandData.guildMember as Discord.GuildMember).user.username, ((commandData.guildMember as Discord.GuildMember).user as Discord.User).avatarURL() as string)
                                .setColor(guildData.borderColor as [number, number, number])
                                .setDescription(msgString)
                                .setTimestamp(Date() as unknown as Date)
                                .setTitle('__**Manage Logs Enabled:**__');
                            await DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed);
                            
                            break;
                        }
                    }
                } else if ((commandData.args[0] as string).toString().toLowerCase() === 'disable') {
                    for (let x = 0; x < guildData.logs.length; x += 1) {
                        if (commandData.args[1]!.toLowerCase() === guildData.logs[x]!.nameSmall) {
                            guildData.logs[x]!.loggingChannelID = '';
                            guildData.logs[x]!.enabled = false;
                            guildData.logs[x]!.enabled = false;
                            await discordUser.updateGuildDataInDB(guildData);
                            const msgEmbed = new Discord.MessageEmbed();
                            const msgString = `------\n**Nicely done! You've disabled logging for '${guildData.logs[x]!.name}'.**\n------`;
                            msgEmbed
                                .setAuthor((commandData.guildMember as Discord.GuildMember).user.username, ((commandData.guildMember as Discord.GuildMember).user as Discord.User).avatarURL() as string)
                                .setColor(guildData.borderColor as [number, number, number])
                                .setDescription(msgString)
                                .setTimestamp(Date() as unknown as Date)
                                .setTitle('__**Manage Logs Disabled:**__');
                            await DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed);
                            
                            break;
                        }
                    }
                }
                break;
            case 'usernamechange':
                if (commandData.args[0]!.toString().toLowerCase() === 'enable') {
                    for (let x = 0; x < guildData.logs.length; x += 1) {
                        if (commandData.args[1]!.toLowerCase() === guildData.logs[x]!.nameSmall) {
                            guildData.logs[x]!.loggingChannelID = commandData.permsChannel!.id;
                            guildData.logs[x]!.loggingChannelName = commandData.permsChannel!.name;
                            guildData.logs[x]!.enabled = true;
                            await discordUser.updateGuildDataInDB(guildData);
                            const msgEmbed = new Discord.MessageEmbed();
                            const msgString = `------\n**Nicely done! You've enabled logging for '${guildData.logs[x]!.name}'.\nIn channel <#${guildData.logs[x]!.loggingChannelID}>.**\n------`;
                            msgEmbed
                                .setAuthor((commandData.guildMember as Discord.GuildMember).user.username, ((commandData.guildMember as Discord.GuildMember).user as Discord.User).avatarURL() as string)
                                .setColor(guildData.borderColor as [number, number, number])
                                .setDescription(msgString)
                                .setTimestamp(Date() as unknown as Date)
                                .setTitle('__**Manage Logs Enabled:**__');
                            await DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed);
                            
                            break;
                        }
                    }
                } else if ((commandData.args[0] as string).toString().toLowerCase() === 'disable') {
                    for (let x = 0; x < guildData.logs.length; x += 1) {
                        if (commandData.args[1]!.toLowerCase() === guildData.logs[x]!.nameSmall) {
                            guildData.logs[x]!.loggingChannelID = '';
                            guildData.logs[x]!.loggingChannelName = '';
                            guildData.logs[x]!.enabled = false;
                            await discordUser.updateGuildDataInDB(guildData);
                            const msgEmbed = new Discord.MessageEmbed();
                            const msgString = `------\n**Nicely done! You've disabled logging for '${guildData.logs[x]!.name}'.**\n------`;
                            msgEmbed
                                .setAuthor((commandData.guildMember as Discord.GuildMember).user.username, ((commandData.guildMember as Discord.GuildMember).user as Discord.User).avatarURL() as string)
                                .setColor(guildData.borderColor as [number, number, number])
                                .setDescription(msgString)
                                .setTimestamp(Date() as unknown as Date)
                                .setTitle('__**Manage Logs Disabled:**__');
                            await DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed);
                            
                            break;
                        }
                    }
                }
                break;
            default:
                const msgString = 'Please enter a proper log name!';
                let msgEmbed = new Discord.MessageEmbed()
                        .setAuthor((commandData.guildMember as Discord.GuildMember).user.username, ((commandData.guildMember as Discord.GuildMember).user as Discord.User).avatarURL() as string)
                        .setColor(guildData.borderColor as [number, number, number])
                        .setDescription(msgString)
                        .setTimestamp(Date() as unknown as Date)
                        .setTitle('__**Manage Logs:**__');
                    let msg = await DiscordStuff.sendMessageWithCorrectChannel(commandData, msgEmbed);
                    if (commandData.toTextChannel instanceof Discord.WebhookClient){
                        msg = new Discord.Message(commandData.guild!.client, msg, commandData.fromTextChannel!);
                    }
                    await msg.delete({timeout: 20000});
                return commandReturnData;
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
export default command as DiscordStuff.BotCommand;
