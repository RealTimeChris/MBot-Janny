// setdefaultrole.ts - Module for my "set default role" command.
// Feb 24, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

import Discord = require('discord.js');
import DiscordStuff = require('../DiscordStuff');

const command = new DiscordStuff.BotCommand();
command.name = 'setdefaultrole';
command.description = 'Just enter !setdefaultrole to view the current list of default roles!\nEnter !setdefaultrole = ADD, ROLENAME, to add a '
+ 'role as a default for when someone new joins the server.\n!setdefaultrole = REMOVE, ROLENAME to remove a role from the list.';

export async function execute(message: Discord.Message, args: string[], discordUser: DiscordStuff.DiscordUser): Promise<string> {
    try {
        const areWeInADM = await DiscordStuff.areWeInADM(message);

        if (areWeInADM === true) {
            return command.name;
        }

        const doWeHaveAdminPerms = await DiscordStuff.doWeHaveAdminPermission(message, discordUser);

        if (doWeHaveAdminPerms === false) {
            return command.name;
        }

        let whatAreWeDoing = String('');

        if (args[0] === undefined) {
            whatAreWeDoing = 'view';
        } else if (args[0] !== undefined && args[0].toLowerCase() !== 'add' && args[0].toLowerCase() !== 'remove') {
            await message.reply("Please, only enter either 'add' or 'remove' as a first argument! (!setdefaultrole = ADDorREMOVE, ROLENAME, or just !setdefaultrol)");
            await message.delete();
            return command.name;
        } else if (args[1] === undefined) {
            await message.reply('Please, enter the name of a server role! (!setdefaultrole = ADDorREMOVE, ROLENAME, or just !setdefaultrol)');
            await message.delete();
            return command.name;
        } else if (args[0].toLowerCase() === 'add') {
            whatAreWeDoing = 'add';
        } else if (args[0].toLowerCase() === 'remove') {
            whatAreWeDoing = 'remove';
        }

        const roleName = args[1];

        const guildData = await discordUser.getGuildDataFromDB(message.guild as Discord.Guild);

        const roleArray = (message.guild as Discord.Guild).roles.cache.array().sort();

        for (let x = 0; x < guildData.defaultRoleIDs.length; x += 1) {
            const isItFoundReal = roleArray.map(role => {
                let isItFound = false;
                if (role.id === guildData.defaultRoleIDs[x]) {
                    isItFound = true;
                    return isItFound;
                }
                return isItFound;
            });
            let isItFoundFinal = false
            for (let y = 0; y < isItFoundReal.length; y += 1){
                if (isItFoundReal[y] === true) {
                    isItFoundFinal = true;
                }
            }
            if (isItFoundFinal === false){
                console.log('Removing a missing guild role from the list of defaults.');
                guildData.defaultRoleIDs.splice(x, 1);
                discordUser.updateGuildDataInDB(guildData);
            }
        }

        if (whatAreWeDoing === 'view') {
            let msgString = String('');

            if (guildData.defaultRoleIDs.length > 0) {
                msgString = '\n------\n';
                guildData.defaultRoleIDs.map(roleID => {
                    roleArray.map(role => {
                        if (roleID === role.id) {
                            msgString += `<@&${role.id}>\n`;
                        }
                        return role;
                    });
                    return roleID;
                });

                msgString += '------';
            } else {
                msgString = "------\n__You don't have any default roles!__\n------";
            }

            const messageEmbed = new Discord.MessageEmbed();
            messageEmbed
                .setAuthor(message.author.username, message.author.avatarURL() as string)
                .setColor([0, 0, 255])
                .setTitle('__**Default Roles:**__')
                .setTimestamp((Date() as unknown) as Date)
                .setDescription(msgString);
            await message.reply(messageEmbed);
            if (message.deletable) {
                await message.delete();
            }
            return command.name;
        }

        let currentRole = new Discord.Role(message.client, {}, message.client.guilds.resolve(guildData.guildID) as Discord.Guild);

        let isItFound = false;
        roleArray.map(role => {
            if (role.name === roleName) {
                currentRole = role;
                isItFound = true;
            }
            return role;
        });

        if (isItFound === false) {
            await message.reply('Sorry, but the role you entered could not be found! Check spelling and case!');
            if (message.deletable) {
                await message.delete();
            }
            return command.name;
        }

        if (whatAreWeDoing === 'add') {
            for (let x = 0; x < guildData.defaultRoleIDs.length; x += 1) {
                if (currentRole.id === guildData.defaultRoleIDs[x]) {
                    await message.reply("Hey! It looks like you've already added that role!");
                    if (message.deletable) {
                        await message.delete();
                    }
                    return command.name;
                }
            }

            guildData.defaultRoleIDs.push(currentRole.id);
            await discordUser.updateGuildDataInDB(guildData);

            const msgString = `\n------\n__**Role:**__ <@&${currentRole.id}>\n------`;

            const messageEmbed = new Discord.MessageEmbed();
            messageEmbed
                .setAuthor(message.author.username, message.author.avatarURL() as string)
                .setColor([0, 0, 255])
                .setTitle('__**New Default Role Added:**__')
                .setTimestamp((Date() as unknown) as Date)
                .setDescription(msgString);
            await message.reply(messageEmbed);
            if (message.deletable) {
                await message.delete();
            }
            return command.name;
        }
        if (whatAreWeDoing === 'remove') {
            isItFound = false;
            for (let x = 0; x < guildData.defaultRoleIDs.length; x += 1) {
                if (currentRole.id === guildData.defaultRoleIDs[x]) {
                    guildData.defaultRoleIDs.splice(x, 1);
                    await discordUser.updateGuildDataInDB(guildData);
                    isItFound = true;
                }
            }

            if (isItFound === false) {
                await message.reply('Sorry, but the role you entered could not be found! Check spelling and case!');
                if (message.deletable) {
                    await message.delete();
                }
                return command.name;
            }

            const msgString = `${'\n------\n__**Role**__: <@&'}${currentRole.id}>\n------`;

            const messageEmbed = new Discord.MessageEmbed();
            messageEmbed
                .setAuthor(message.author.username, message.author.avatarURL() as string)
                .setColor([0, 0, 255])
                .setTitle('__**Default Role Removed:**__')
                .setTimestamp((Date() as unknown) as Date)
                .setDescription(msgString);
            await message.reply(messageEmbed);
            if (message.deletable) {
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
