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
export async function execute(message: Discord.Message, args: string[], discordUser: DiscordStuff.DiscordUser): Promise<string> {
    try {
        const areWeInADM = await DiscordStuff.areWeInADM(message);

        if (areWeInADM === true) {
            return command.name;
        }

        const areWeAnAdmin = await DiscordStuff.doWeHaveAdminPermission(message, discordUser);

        if (areWeAnAdmin === false) {
            return command.name;
        }

        const guildData = await discordUser.getGuildDataFromDB(message.guild as Discord.Guild);

        if (args[0] === undefined) {
            const fields = [];
            for (let x = 0; x < guildData.logs.length; x += 1) {
                if (message.client.channels.resolve((guildData.logs[x] as DiscordStuff.Log).loggingChannelID) === null) {
                    (guildData.logs[x] as DiscordStuff.Log).loggingChannelID = '';
                    (guildData.logs[x] as DiscordStuff.Log).loggingChannelName = '';
                    (guildData.logs[x] as DiscordStuff.Log).enabled = false;
                }
                if ((guildData.logs[x] as DiscordStuff.Log).enabled === false) {
                    const field = { name: `__**${(guildData.logs[x] as DiscordStuff.Log).name}**__`, value: '__Enabled:__ ❌', inline: true };
                    fields.push(field);
                } else if ((guildData.logs[x] as DiscordStuff.Log).enabled === true) {
                    const field = { name: `__**${(guildData.logs[x] as DiscordStuff.Log).name}**__`, value: `__Enabled:__ ✅\n__Logging Channel:__ <#${(guildData.logs[x] as DiscordStuff.Log).loggingChannelID}>`, inline: true };
                    fields.push(field);
                }
            }

            const msgEmbed = new Discord.MessageEmbed();
            let msgString = String('');
            msgString = "**To enable/disable a given log, enter within the text channel where you would like it to be logged: !managelogs = <enable/disable>, <logname>\nFor example, '!managelogs = enable, guildbanadd'.**";
            msgEmbed.setAuthor(message.author.username, (message.author as Discord.User).avatarURL() as string)
                .setColor([0, 0, 255]).setDescription(msgString).setTimestamp((Date() as unknown) as Date)
                .setTitle('__**Manage Logs:**__').fields = fields;

            await message.channel.send(msgEmbed);
            await message.delete();
        } else if (args[0].toLowerCase() !== 'enable' && args[0].toLowerCase() !== 'disable') {
            await message.reply('Please, enter enable or disable for the second argument of this command! (!managelogs = <enable/disable>, <logname>)');
            await message.delete();
            return command.name;
        } else {
            switch ((args[1] as string).toLowerCase()) {
            case 'guildbanadd':
                if (args[0].toLowerCase() === 'enable') {
                    for (let x = 0; x < guildData.logs.length; x += 1) {
                        if (((args[1] as string) as string).toLowerCase() === (guildData.logs[x] as DiscordStuff.Log).nameSmall) {
                            (guildData.logs[x] as DiscordStuff.Log).loggingChannelID = message.channel.id;
                            (guildData.logs[x] as DiscordStuff.Log).loggingChannelName = (message.channel as Discord.TextChannel).name;
                            (guildData.logs[x] as DiscordStuff.Log).enabled = true;
                            await discordUser.updateGuildDataInDB(guildData);
                            const msgEmbed = new Discord.MessageEmbed();
                            const msgString = `Nicely done! You've enabled logging for '${(guildData.logs[x] as DiscordStuff.Log).name}', in channel <#${(guildData.logs[x] as DiscordStuff.Log).loggingChannelID}>.`;
                            msgEmbed.setAuthor(message.author.username, (message.author as Discord.User).avatarURL()as string)
                                .setColor([0, 0, 255]).setDescription(msgString).setTimestamp((Date() as unknown) as Date)
                                .setTitle('__**Manage Logs Enabled:**__');
                            await message.channel.send(msgEmbed);
                            await message.delete();
                            break;
                        }
                    }
                } else if (args[0].toLowerCase() === 'disable') {
                    for (let x = 0; x < guildData.logs.length; x += 1) {
                        if ((args[1] as string).toLowerCase() === (guildData.logs[x] as DiscordStuff.Log).nameSmall) {
                            (guildData.logs[x] as DiscordStuff.Log).loggingChannelID = '';
                            (guildData.logs[x] as DiscordStuff.Log).loggingChannelName = '';
                            (guildData.logs[x] as DiscordStuff.Log).enabled = false;
                            await discordUser.updateGuildDataInDB(guildData);
                            const msgEmbed = new Discord.MessageEmbed();
                            const msgString = `Nicely done! You've disabled logging for '${(guildData.logs[x] as DiscordStuff.Log).name}.`;
                            msgEmbed.setAuthor(message.author.username, (message.author as Discord.User).avatarURL()as string)
                                .setColor([0, 0, 255]).setDescription(msgString).setTimestamp((Date() as unknown) as Date)
                                .setTitle('__**Manage Logs Disabled:**__');
                            await message.channel.send(msgEmbed);
                            await message.delete();
                            break;
                        }
                    }
                }
                break;
            case 'guildbanremove':
                if (args[0].toLowerCase() === 'enable') {
                    for (let x = 0; x < guildData.logs.length; x += 1) {
                        if ((args[1] as string).toLowerCase() === (guildData.logs[x] as DiscordStuff.Log).nameSmall) {
                            (guildData.logs[x] as DiscordStuff.Log).loggingChannelID = message.channel.id;
                            (guildData.logs[x] as DiscordStuff.Log).loggingChannelName = (message.channel as Discord.TextChannel).name;
                            (guildData.logs[x] as DiscordStuff.Log).enabled = true;
                            await discordUser.updateGuildDataInDB(guildData);
                            const msgEmbed = new Discord.MessageEmbed();
                            const msgString = `Nicely done! You've enabled logging for '${(guildData.logs[x] as DiscordStuff.Log).name}', in channel <#${(guildData.logs[x] as DiscordStuff.Log).loggingChannelID}>.`;
                            msgEmbed.setAuthor(message.author.username, (message.author as Discord.User).avatarURL()as string)
                                .setColor([0, 0, 255]).setDescription(msgString).setTimestamp((Date() as unknown) as Date)
                                .setTitle('__**Manage Logs Enabled:**__');
                            await message.channel.send(msgEmbed);
                            await message.delete();
                            break;
                        }
                    }
                } else if (args[0].toLowerCase() === 'disable') {
                    for (let x = 0; x < guildData.logs.length; x += 1) {
                        if ((args[1] as string).toLowerCase() === (guildData.logs[x] as DiscordStuff.Log).nameSmall) {
                            (guildData.logs[x] as DiscordStuff.Log).loggingChannelID = '';
                            (guildData.logs[x] as DiscordStuff.Log).loggingChannelName = '';
                            (guildData.logs[x] as DiscordStuff.Log).enabled = false;
                            await discordUser.updateGuildDataInDB(guildData);
                            const msgEmbed = new Discord.MessageEmbed();
                            const msgString = `Nicely done! You've disabled logging for '${(guildData.logs[x] as DiscordStuff.Log).name}.`;
                            msgEmbed.setAuthor(message.author.username, (message.author as Discord.User).avatarURL()as string)
                                .setColor([0, 0, 255]).setDescription(msgString).setTimestamp((Date() as unknown) as Date)
                                .setTitle('__**Manage Logs Disabled:**__');
                            await message.channel.send(msgEmbed);
                            await message.delete();
                            break;
                        }
                    }
                }
                break;
            case 'guildmemberadd':
                if (args[0].toLowerCase() === 'enable') {
                    for (let x = 0; x < guildData.logs.length; x += 1) {
                        if ((args[1] as string).toLowerCase() === (guildData.logs[x] as DiscordStuff.Log).nameSmall) {
                            (guildData.logs[x] as DiscordStuff.Log).loggingChannelID = message.channel.id;
                            (guildData.logs[x] as DiscordStuff.Log).loggingChannelName = (message.channel as Discord.TextChannel).name;
                            (guildData.logs[x] as DiscordStuff.Log).enabled = true;
                            await discordUser.updateGuildDataInDB(guildData);
                            const msgEmbed = new Discord.MessageEmbed();
                            const msgString = `Nicely done! You've enabled logging for '${(guildData.logs[x] as DiscordStuff.Log).name}', in channel <#${(guildData.logs[x] as DiscordStuff.Log).loggingChannelID}>.`;
                            msgEmbed.setAuthor(message.author.username, (message.author as Discord.User).avatarURL()as string)
                                .setColor([0, 0, 255]).setDescription(msgString).setTimestamp((Date() as unknown) as Date)
                                .setTitle('__**Manage Logs Enabled:**__');
                            await message.channel.send(msgEmbed);
                            await message.delete();
                            break;
                        }
                    }
                } else if (args[0].toLowerCase() === 'disable') {
                    for (let x = 0; x < guildData.logs.length; x += 1) {
                        if ((args[1] as string).toLowerCase() === (guildData.logs[x] as DiscordStuff.Log).nameSmall) {
                            (guildData.logs[x] as DiscordStuff.Log).loggingChannelID = '';
                            (guildData.logs[x] as DiscordStuff.Log).loggingChannelName = '';
                            (guildData.logs[x] as DiscordStuff.Log).enabled = false;
                            await discordUser.updateGuildDataInDB(guildData);
                            const msgEmbed = new Discord.MessageEmbed();
                            const msgString = `Nicely done! You've disabled logging for '${(guildData.logs[x] as DiscordStuff.Log).name}.`;
                            msgEmbed.setAuthor(message.author.username, (message.author as Discord.User).avatarURL()as string)
                                .setColor([0, 0, 255]).setDescription(msgString).setTimestamp((Date() as unknown) as Date)
                                .setTitle('__**Manage Logs Disabled:**__');
                            await message.channel.send(msgEmbed);
                            await message.delete();
                            break;
                        }
                    }
                }
                break;
            case 'guildmemberremove':
                if (args[0].toLowerCase() === 'enable') {
                    for (let x = 0; x < guildData.logs.length; x += 1) {
                        if ((args[1] as string).toLowerCase() === (guildData.logs[x] as DiscordStuff.Log).nameSmall) {
                            (guildData.logs[x] as DiscordStuff.Log).loggingChannelID = message.channel.id;
                            (guildData.logs[x] as DiscordStuff.Log).loggingChannelName = (message.channel as Discord.TextChannel).name;
                            (guildData.logs[x] as DiscordStuff.Log).enabled = true;
                            await discordUser.updateGuildDataInDB(guildData);
                            const msgEmbed = new Discord.MessageEmbed();
                            const msgString = `Nicely done! You've enabled logging for '${(guildData.logs[x] as DiscordStuff.Log).name}', in channel <#${(guildData.logs[x] as DiscordStuff.Log).loggingChannelID}>.`;
                            msgEmbed.setAuthor(message.author.username, (message.author as Discord.User).avatarURL()as string)
                                .setColor([0, 0, 255]).setDescription(msgString).setTimestamp((Date() as unknown) as Date)
                                .setTitle('__**Manage Logs Enabled:**__');
                            await message.channel.send(msgEmbed);
                            await message.delete();
                            break;
                        }
                    }
                } else if (args[0].toLowerCase() === 'disable') {
                    for (let x = 0; x < guildData.logs.length; x += 1) {
                        if ((args[1] as string).toLowerCase() === (guildData.logs[x] as DiscordStuff.Log).nameSmall) {
                            (guildData.logs[x] as DiscordStuff.Log).loggingChannelID = '';
                            (guildData.logs[x] as DiscordStuff.Log).loggingChannelName = '';
                            (guildData.logs[x] as DiscordStuff.Log).enabled = false;
                            await discordUser.updateGuildDataInDB(guildData);
                            const msgEmbed = new Discord.MessageEmbed();
                            const msgString = `Nicely done! You've disabled logging for '${(guildData.logs[x] as DiscordStuff.Log).name}.`;
                            msgEmbed.setAuthor(message.author.username, (message.author as Discord.User).avatarURL()as string)
                                .setColor([0, 0, 255]).setDescription(msgString).setTimestamp((Date() as unknown) as Date)
                                .setTitle('__**Manage Logs Disabled:**__');
                            await message.channel.send(msgEmbed);
                            await message.delete();
                            break;
                        }
                    }
                }
                break;
            case 'displaynamechange':
                if (args[0].toLowerCase() === 'enable') {
                    for (let x = 0; x < guildData.logs.length; x += 1) {
                        if ((args[1] as string).toLowerCase() === (guildData.logs[x] as DiscordStuff.Log).nameSmall) {
                            (guildData.logs[x] as DiscordStuff.Log).loggingChannelID = message.channel.id;
                            (guildData.logs[x] as DiscordStuff.Log).loggingChannelName = (message.channel as Discord.TextChannel).name;
                            (guildData.logs[x] as DiscordStuff.Log).enabled = true;
                            await discordUser.updateGuildDataInDB(guildData);
                            const msgEmbed = new Discord.MessageEmbed();
                            const msgString = `Nicely done! You've enabled logging for '${(guildData.logs[x] as DiscordStuff.Log).name}', in channel <#${(guildData.logs[x] as DiscordStuff.Log).loggingChannelID}>.`;
                            msgEmbed.setAuthor(message.author.username, (message.author as Discord.User).avatarURL()as string)
                                .setColor([0, 0, 255]).setDescription(msgString).setTimestamp((Date() as unknown) as Date)
                                .setTitle('__**Manage Logs Enabled:**__');
                            await message.channel.send(msgEmbed);
                            await message.delete();
                            break;
                        }
                    }
                } else if (args[0].toLowerCase() === 'disable') {
                    for (let x = 0; x < guildData.logs.length; x += 1) {
                        if ((args[1] as string).toLowerCase() === (guildData.logs[x] as DiscordStuff.Log).nameSmall) {
                            (guildData.logs[x] as DiscordStuff.Log).loggingChannelID = '';
                            (guildData.logs[x] as DiscordStuff.Log).loggingChannelName = '';
                            (guildData.logs[x] as DiscordStuff.Log).enabled = false;
                            await discordUser.updateGuildDataInDB(guildData);
                            const msgEmbed = new Discord.MessageEmbed();
                            const msgString = `Nicely done! You've disabled logging for '${(guildData.logs[x] as DiscordStuff.Log).name}.`;
                            msgEmbed.setAuthor(message.author.username, (message.author as Discord.User).avatarURL()as string)
                            .setColor([0, 0, 255]).setDescription(msgString).setTimestamp((Date() as unknown) as Date)
                                .setTitle('__**Manage Logs Disabled:**__');
                            await message.channel.send(msgEmbed);
                            await message.delete();
                            break;
                        }
                    }
                }
                break;
            case 'nicknamechange':
                if (args[0].toLowerCase() === 'enable') {
                    for (let x = 0; x < guildData.logs.length; x += 1) {
                        if ((args[1] as string).toLowerCase() === (guildData.logs[x] as DiscordStuff.Log).nameSmall) {
                            (guildData.logs[x] as DiscordStuff.Log).loggingChannelID = message.channel.id;
                            (guildData.logs[x] as DiscordStuff.Log).loggingChannelName = (message.channel as Discord.TextChannel).name;
                            (guildData.logs[x] as DiscordStuff.Log).enabled = true;
                            await discordUser.updateGuildDataInDB(guildData);
                            const msgEmbed = new Discord.MessageEmbed();
                            const msgString = `Nicely done! You've enabled logging for '${(guildData.logs[x] as DiscordStuff.Log).name}', in channel <#${(guildData.logs[x] as DiscordStuff.Log).loggingChannelID}>.`;
                            msgEmbed.setAuthor(message.author.username, (message.author as Discord.User).avatarURL()as string)
                                .setColor([0, 0, 255]).setDescription(msgString).setTimestamp((Date() as unknown) as Date)
                                .setTitle('__**Manage Logs Enabled:**__');
                            await message.channel.send(msgEmbed);
                            await message.delete();
                            break;
                        }
                    }
                } else if (args[0].toLowerCase() === 'disable') {
                    for (let x = 0; x < guildData.logs.length; x += 1) {
                        if ((args[1] as string).toLowerCase() === (guildData.logs[x] as DiscordStuff.Log).nameSmall) {
                            (guildData.logs[x] as DiscordStuff.Log).loggingChannelID = '';
                            (guildData.logs[x] as DiscordStuff.Log).loggingChannelName = '';
                            (guildData.logs[x] as DiscordStuff.Log).enabled = false;
                            await discordUser.updateGuildDataInDB(guildData);
                            const msgEmbed = new Discord.MessageEmbed();
                            const msgString = `Nicely done! You've disabled logging for '${(guildData.logs[x] as DiscordStuff.Log).name}.`;
                            msgEmbed.setAuthor(message.author.username, (message.author as Discord.User).avatarURL()as string)
                            .setColor([0, 0, 255]).setDescription(msgString).setTimestamp((Date() as unknown) as Date)
                                .setTitle('__**Manage Logs Disabled:**__');
                            await message.channel.send(msgEmbed);
                            await message.delete();
                            break;
                        }
                    }
                }
                break;
            case 'roleaddorremove':
                if (args[0].toLowerCase() === 'enable') {
                    for (let x = 0; x < guildData.logs.length; x += 1) {
                        if ((args[1] as string).toLowerCase() === (guildData.logs[x] as DiscordStuff.Log).nameSmall) {
                            (guildData.logs[x] as DiscordStuff.Log).loggingChannelID = message.channel.id;
                            (guildData.logs[x] as DiscordStuff.Log).loggingChannelName = (message.channel as Discord.TextChannel).name;
                            (guildData.logs[x] as DiscordStuff.Log).enabled = true;
                            await discordUser.updateGuildDataInDB(guildData);
                            const msgEmbed = new Discord.MessageEmbed();
                            const msgString = `Nicely done! You've enabled logging for '${(guildData.logs[x] as DiscordStuff.Log).name}', in channel <#${(guildData.logs[x] as DiscordStuff.Log).loggingChannelID}>.`;
                            msgEmbed.setAuthor(message.author.username, (message.author as Discord.User).avatarURL()as string)
                            .setColor([0, 0, 255]).setDescription(msgString).setTimestamp((Date() as unknown) as Date)
                                .setTitle('__**Manage Logs Enabled:**__');
                            await message.channel.send(msgEmbed);
                            await message.delete();
                            break;
                        }
                    }
                } else if (args[0].toLowerCase() === 'disable') {
                    for (let x = 0; x < guildData.logs.length; x += 1) {
                        if ((args[1] as string).toLowerCase() === (guildData.logs[x] as DiscordStuff.Log).nameSmall) {
                            (guildData.logs[x] as DiscordStuff.Log).loggingChannelID = '';
                            (guildData.logs[x] as DiscordStuff.Log).loggingChannelName = '';
                            (guildData.logs[x] as DiscordStuff.Log).enabled = false;
                            await discordUser.updateGuildDataInDB(guildData);
                            const msgEmbed = new Discord.MessageEmbed();
                            const msgString = `Nicely done! You've disabled logging for '${(guildData.logs[x] as DiscordStuff.Log).name}.`;
                            msgEmbed.setAuthor(message.author.username, (message.author as Discord.User).avatarURL()as string)
                                .setColor([0, 0, 255]).setDescription(msgString).setTimestamp((Date() as unknown) as Date)
                                .setTitle('__**Manage Logs Disabled:**__');
                            await message.channel.send(msgEmbed);
                            await message.delete();
                            break;
                        }
                    }
                }
                break;
            case 'invitecreate':
                if (args[0].toLowerCase() === 'enable') {
                    for (let x = 0; x < guildData.logs.length; x += 1) {
                        if ((args[1] as string).toLowerCase() === (guildData.logs[x] as DiscordStuff.Log).nameSmall) {
                            (guildData.logs[x] as DiscordStuff.Log).loggingChannelID = message.channel.id;
                            (guildData.logs[x] as DiscordStuff.Log).loggingChannelName = (message.channel as Discord.TextChannel).name;
                            (guildData.logs[x] as DiscordStuff.Log).enabled = true;
                            await discordUser.updateGuildDataInDB(guildData);
                            const msgEmbed = new Discord.MessageEmbed();
                            const msgString = `Nicely done! You've enabled logging for '${(guildData.logs[x] as DiscordStuff.Log).name}', in channel <#${(guildData.logs[x] as DiscordStuff.Log).loggingChannelID}>.`;
                            msgEmbed.setAuthor(message.author.username, (message.author as Discord.User).avatarURL()as string)
                                .setColor([0, 0, 255]).setDescription(msgString).setTimestamp((Date() as unknown) as Date)
                                .setTitle('__**Manage Logs Enabled:**__');
                            await message.channel.send(msgEmbed);
                            await message.delete();
                            break;
                        }
                    }
                } else if (args[0].toLowerCase() === 'disable') {
                    for (let x = 0; x < guildData.logs.length; x += 1) {
                        if ((args[1] as string).toLowerCase() === (guildData.logs[x] as DiscordStuff.Log).nameSmall) {
                            (guildData.logs[x] as DiscordStuff.Log).loggingChannelID = '';
                            (guildData.logs[x] as DiscordStuff.Log).loggingChannelName = '';
                            (guildData.logs[x] as DiscordStuff.Log).enabled = false;
                            await discordUser.updateGuildDataInDB(guildData);
                            const msgEmbed = new Discord.MessageEmbed();
                            const msgString = `Nicely done! You've disabled logging for '${(guildData.logs[x] as DiscordStuff.Log).name}.`;
                            msgEmbed.setAuthor(message.author.username, (message.author as Discord.User).avatarURL()as string)
                                .setColor([0, 0, 255]).setDescription(msgString).setTimestamp((Date() as unknown) as Date)
                                .setTitle('__**Manage Logs Disabled:**__');
                            await message.channel.send(msgEmbed);
                            await message.delete();
                            break;
                        }
                    }
                }
                break;
            case 'messagedelete':
                if (args[0].toLowerCase() === 'enable') {
                    for (let x = 0; x < guildData.logs.length; x += 1) {
                        if ((args[1] as string).toLowerCase() === (guildData.logs[x] as DiscordStuff.Log).nameSmall) {
                            (guildData.logs[x] as DiscordStuff.Log).loggingChannelID = message.channel.id;
                            (guildData.logs[x] as DiscordStuff.Log).loggingChannelName = (message.channel as Discord.TextChannel).name;
                            (guildData.logs[x] as DiscordStuff.Log).enabled = true;
                            await discordUser.updateGuildDataInDB(guildData);
                            const msgEmbed = new Discord.MessageEmbed();
                            const msgString = `Nicely done! You've enabled logging for '${(guildData.logs[x] as DiscordStuff.Log).name}', in channel <#${(guildData.logs[x] as DiscordStuff.Log).loggingChannelID}>.`;
                            msgEmbed.setAuthor(message.author.username, (message.author as Discord.User).avatarURL()as string)
                                .setColor([0, 0, 255]).setDescription(msgString).setTimestamp((Date() as unknown) as Date)
                                .setTitle('__**Manage Logs Enabled:**__');
                            await message.channel.send(msgEmbed);
                            await message.delete();
                            break;
                        }
                    }
                } else if (args[0].toLowerCase() === 'disable') {
                    for (let x = 0; x < guildData.logs.length; x += 1) {
                        if ((args[1] as string).toLowerCase() === (guildData.logs[x] as DiscordStuff.Log).nameSmall) {
                            (guildData.logs[x] as DiscordStuff.Log).loggingChannelID = '';
                            (guildData.logs[x] as DiscordStuff.Log).loggingChannelName = '';
                            (guildData.logs[x] as DiscordStuff.Log).enabled = false;
                            await discordUser.updateGuildDataInDB(guildData);
                            const msgEmbed = new Discord.MessageEmbed();
                            const msgString = `Nicely done! You've disabled logging for '${(guildData.logs[x] as DiscordStuff.Log).name}.`;
                            msgEmbed.setAuthor(message.author.username, (message.author as Discord.User).avatarURL()as string)
                                .setColor([0, 0, 255]).setDescription(msgString).setTimestamp((Date() as unknown) as Date)
                                .setTitle('__**Manage Logs Disabled:**__');
                            await message.channel.send(msgEmbed);
                            await message.delete();
                            break;
                        }
                    }
                }
                break;
            case 'messagedeletebulk':
                if (args[0].toLowerCase() === 'enable') {
                    for (let x = 0; x < guildData.logs.length; x += 1) {
                        if ((args[1] as string).toLowerCase() === (guildData.logs[x] as DiscordStuff.Log).nameSmall) {
                            (guildData.logs[x] as DiscordStuff.Log).loggingChannelID = message.channel.id;
                            (guildData.logs[x] as DiscordStuff.Log).loggingChannelName = (message.channel as Discord.TextChannel).name;
                            (guildData.logs[x] as DiscordStuff.Log).enabled = true;
                            await discordUser.updateGuildDataInDB(guildData);
                            const msgEmbed = new Discord.MessageEmbed();
                            const msgString = `Nicely done! You've enabled logging for '${(guildData.logs[x] as DiscordStuff.Log).name}', in channel <#${(guildData.logs[x] as DiscordStuff.Log).loggingChannelID}>.`;
                            msgEmbed.setAuthor(message.author.username, (message.author as Discord.User).avatarURL()as string)
                                .setColor([0, 0, 255]).setDescription(msgString).setTimestamp((Date() as unknown) as Date)
                                .setTitle('__**Manage Logs Enabled:**__');
                            await message.channel.send(msgEmbed);
                            await message.delete();
                            break;
                        }
                    }
                } else if (args[0].toLowerCase() === 'disable') {
                    for (let x = 0; x < guildData.logs.length; x += 1) {
                        if ((args[1] as string).toLowerCase() === (guildData.logs[x] as DiscordStuff.Log).nameSmall) {
                            (guildData.logs[x] as DiscordStuff.Log).loggingChannelID = '';
                            (guildData.logs[x] as DiscordStuff.Log).loggingChannelName = '';
                            (guildData.logs[x] as DiscordStuff.Log).enabled = false;
                            await discordUser.updateGuildDataInDB(guildData);
                            const msgEmbed = new Discord.MessageEmbed();
                            const msgString = `Nicely done! You've disabled logging for '${(guildData.logs[x] as DiscordStuff.Log).name}.`;
                            msgEmbed.setAuthor(message.author.username, (message.author as Discord.User).avatarURL()as string)
                                .setColor([0, 0, 255]).setDescription(msgString).setTimestamp((Date() as unknown) as Date)
                                .setTitle('__**Manage Logs Disabled:**__');
                            await message.channel.send(msgEmbed);
                            await message.delete();
                            break;
                        }
                    }
                }
                break;
            case 'messageupdate':
                if (args[0].toLowerCase() === 'enable') {
                    for (let x = 0; x < guildData.logs.length; x += 1) {
                        if ((args[1] as string).toLowerCase() === (guildData.logs[x] as DiscordStuff.Log).nameSmall) {
                            (guildData.logs[x] as DiscordStuff.Log).loggingChannelID = message.channel.id;
                            (guildData.logs[x] as DiscordStuff.Log).loggingChannelName = (message.channel as Discord.TextChannel).name;
                            (guildData.logs[x] as DiscordStuff.Log).enabled = true;
                            await discordUser.updateGuildDataInDB(guildData);
                            const msgEmbed = new Discord.MessageEmbed();
                            const msgString = `Nicely done! You've enabled logging for '${(guildData.logs[x] as DiscordStuff.Log).name}', in channel <#${(guildData.logs[x] as DiscordStuff.Log).loggingChannelID}>.`;
                            msgEmbed.setAuthor(message.author.username, (message.author as Discord.User).avatarURL()as string)
                                .setColor([0, 0, 255]).setDescription(msgString).setTimestamp((Date() as unknown) as Date)
                                .setTitle('__**Manage Logs Enabled:**__');
                            await message.channel.send(msgEmbed);
                            await message.delete();
                            break;
                        }
                    }
                } else if (args[0].toLowerCase() === 'disable') {
                    for (let x = 0; x < guildData.logs.length; x += 1) {
                        if ((args[1] as string).toLowerCase() === (guildData.logs[x] as DiscordStuff.Log).nameSmall) {
                            (guildData.logs[x] as DiscordStuff.Log).loggingChannelID = '';
                            (guildData.logs[x] as DiscordStuff.Log).loggingChannelName = '';
                            (guildData.logs[x] as DiscordStuff.Log).enabled = false;
                            await discordUser.updateGuildDataInDB(guildData);
                            const msgEmbed = new Discord.MessageEmbed();
                            const msgString = `Nicely done! You've disabled logging for '${(guildData.logs[x] as DiscordStuff.Log).name}.`;
                            msgEmbed.setAuthor(message.author.username, (message.author as Discord.User).avatarURL()as string)
                                .setColor([0, 0, 255]).setDescription(msgString).setTimestamp((Date() as unknown) as Date)
                                .setTitle('__**Manage Logs Disabled:**__');
                            await message.channel.send(msgEmbed);
                            await message.delete();
                            break;
                        }
                    }
                }
                break;
            case 'rolecreate':
                if (args[0].toLowerCase() === 'enable') {
                    for (let x = 0; x < guildData.logs.length; x += 1) {
                        if ((args[1] as string).toLowerCase() === (guildData.logs[x] as DiscordStuff.Log).nameSmall) {
                            (guildData.logs[x] as DiscordStuff.Log).loggingChannelID = message.channel.id;
                            (guildData.logs[x] as DiscordStuff.Log).loggingChannelName = (message.channel as Discord.TextChannel).name;
                            (guildData.logs[x] as DiscordStuff.Log).enabled = true;
                            await discordUser.updateGuildDataInDB(guildData);
                            const msgEmbed = new Discord.MessageEmbed();
                            const msgString = `Nicely done! You've enabled logging for '${(guildData.logs[x] as DiscordStuff.Log).name}', in channel <#${(guildData.logs[x] as DiscordStuff.Log).loggingChannelID}>.`;
                            msgEmbed.setAuthor(message.author.username, (message.author as Discord.User).avatarURL()as string)
                                .setColor([0, 0, 255]).setDescription(msgString).setTimestamp((Date() as unknown) as Date)
                                .setTitle('__**Manage Logs Enabled:**__');
                            await message.channel.send(msgEmbed);
                            await message.delete();
                            break;
                        }
                    }
                } else if (args[0].toLowerCase() === 'disable') {
                    for (let x = 0; x < guildData.logs.length; x += 1) {
                        if ((args[1] as string).toLowerCase() === (guildData.logs[x] as DiscordStuff.Log).nameSmall) {
                            (guildData.logs[x] as DiscordStuff.Log).loggingChannelID = '';
                            (guildData.logs[x] as DiscordStuff.Log).loggingChannelName = '';
                            (guildData.logs[x] as DiscordStuff.Log).enabled = false;
                            await discordUser.updateGuildDataInDB(guildData);
                            const msgEmbed = new Discord.MessageEmbed();
                            const msgString = `Nicely done! You've disabled logging for '${(guildData.logs[x] as DiscordStuff.Log).name}.`;
                            msgEmbed.setAuthor(message.author.username, (message.author as Discord.User).avatarURL()as string)
                                .setColor([0, 0, 255]).setDescription(msgString).setTimestamp((Date() as unknown) as Date)
                                .setTitle('__**Manage Logs Disabled:**__');
                            await message.channel.send(msgEmbed);
                            await message.delete();
                            break;
                        }
                    }
                }
                break;
            case 'roledelete':
                if (args[0].toLowerCase() === 'enable') {
                    for (let x = 0; x < guildData.logs.length; x += 1) {
                        if ((args[1] as string).toLowerCase() === (guildData.logs[x] as DiscordStuff.Log).nameSmall) {
                            (guildData.logs[x] as DiscordStuff.Log).loggingChannelID = message.channel.id;
                            (guildData.logs[x] as DiscordStuff.Log).loggingChannelName = (message.channel as Discord.TextChannel).name;
                            (guildData.logs[x] as DiscordStuff.Log).enabled = true;
                            await discordUser.updateGuildDataInDB(guildData);
                            const msgEmbed = new Discord.MessageEmbed();
                            const msgString = `Nicely done! You've enabled logging for '${(guildData.logs[x] as DiscordStuff.Log).name}', in channel <#${(guildData.logs[x] as DiscordStuff.Log).loggingChannelID}>.`;
                            msgEmbed.setAuthor(message.author.username, (message.author as Discord.User).avatarURL()as string)
                                .setColor([0, 0, 255]).setDescription(msgString).setTimestamp((Date() as unknown) as Date)
                                .setTitle('__**Manage Logs Enabled:**__');
                            await message.channel.send(msgEmbed);
                            await message.delete();
                            break;
                        }
                    }
                } else if (args[0].toLowerCase() === 'disable') {
                    for (let x = 0; x < guildData.logs.length; x += 1) {
                        if ((args[1] as string).toLowerCase() === (guildData.logs[x] as DiscordStuff.Log).nameSmall) {
                            (guildData.logs[x] as DiscordStuff.Log).loggingChannelID = '';
                            (guildData.logs[x] as DiscordStuff.Log).loggingChannelName = '';
                            (guildData.logs[x] as DiscordStuff.Log).enabled = false;
                            await discordUser.updateGuildDataInDB(guildData);
                            const msgEmbed = new Discord.MessageEmbed();
                            const msgString = `Nicely done! You've disabled logging for '${(guildData.logs[x] as DiscordStuff.Log).name}.`;
                            msgEmbed.setAuthor(message.author.username, (message.author as Discord.User).avatarURL()as string)
                                .setColor([0, 0, 255]).setDescription(msgString).setTimestamp((Date() as unknown) as Date)
                                .setTitle('__**Manage Logs Disabled:**__');
                            await message.channel.send(msgEmbed);
                            await message.delete();
                            break;
                        }
                    }
                }
                break;
            case 'usernamechange':
                if (args[0].toLowerCase() === 'enable') {
                    for (let x = 0; x < guildData.logs.length; x += 1) {
                        if ((args[1] as string).toLowerCase() === (guildData.logs[x] as DiscordStuff.Log).nameSmall) {
                            (guildData.logs[x] as DiscordStuff.Log).loggingChannelID = message.channel.id;
                            (guildData.logs[x] as DiscordStuff.Log).loggingChannelName = (message.channel as Discord.TextChannel).name;
                            (guildData.logs[x] as DiscordStuff.Log).enabled = true;
                            await discordUser.updateGuildDataInDB(guildData);
                            const msgEmbed = new Discord.MessageEmbed();
                            const msgString = `Nicely done! You've enabled logging for '${(guildData.logs[x] as DiscordStuff.Log).name}', in channel <#${(guildData.logs[x] as DiscordStuff.Log).loggingChannelID}>.`;
                            msgEmbed.setAuthor(message.author.username, (message.author as Discord.User).avatarURL()as string)
                                .setColor([0, 0, 255]).setDescription(msgString).setTimestamp((Date() as unknown) as Date)
                                .setTitle('__**Manage Logs Enabled:**__');
                            await message.channel.send(msgEmbed);
                            await message.delete();
                            break;
                        }
                    }
                } else if (args[0].toLowerCase() === 'disable') {
                    for (let x = 0; x < guildData.logs.length; x += 1) {
                        if ((args[1] as string).toLowerCase() === (guildData.logs[x] as DiscordStuff.Log).nameSmall) {
                            (guildData.logs[x] as DiscordStuff.Log).loggingChannelID = '';
                            (guildData.logs[x] as DiscordStuff.Log).loggingChannelName = '';
                            (guildData.logs[x] as DiscordStuff.Log).enabled = false;
                            await discordUser.updateGuildDataInDB(guildData);
                            const msgEmbed = new Discord.MessageEmbed();
                            const msgString = `Nicely done! You've disabled logging for '${(guildData.logs[x] as DiscordStuff.Log).name}.`;
                            msgEmbed.setAuthor(message.author.username, (message.author as Discord.User).avatarURL()as string)
                            .setColor([0, 0, 255]).setDescription(msgString).setTimestamp((Date() as unknown) as Date)
                                .setTitle('__**Manage Logs Disabled:**__');
                            await message.channel.send(msgEmbed);
                            await message.delete();
                            break;
                        }
                    }
                }
                break;
            default:
                await message.reply('Please enter a proper log name!');
                await message.delete();
                return command.name;
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
export default command as DiscordStuff.BotCommand;
