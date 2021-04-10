// setdefaultrole.ts - Module for my "set default role" command.
// Feb 24, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

import Discord = require('discord.js');
import FoundationClasses from '../FoundationClasses';
import DiscordUser from '../DiscordUser';
import GuildData from '../GuildData';
import HelperFunctions from '../HelperFunctions';

const command: FoundationClasses.BotCommand = {
    name: 'setdefaultrole',
    description: 'Just enter !setdefaultrole to view the current list of default roles!\nEnter !setdefaultrole = ADD, ROLENAME, to add a '
    + 'role as a default for when someone new joins the server.\n!setdefaultrole = REMOVE, ROLENAME to remove a role from the list.',
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

        let roleMemberManager: Discord.RoleManager;
        let currentDiscordRole: Discord.Role;
        let whatAreWeDoing = '';
        let roleMentionRegExp = /<@&\d{18}>/;
        let idRegExp = /\d{18}/;
        if (commandData.args[0] === undefined) {
            whatAreWeDoing = 'view';
        } else if (commandData.args[0] !== undefined && commandData.args[0].toLowerCase() !== 'add' && commandData.args[0].toLowerCase() !== 'remove') {
            const msgString = `------\n**Please, only enter either 'add' or 'remove' as a first argument! (!setdefaultrole = ADDorREMOVE, ROLENAME, or just !setdefaultrol)**\n------`;
            let msgEmbed = new Discord.MessageEmbed()
				.setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
				.setColor(guildData.borderColor)
				.setDescription(msgString)
				.setTimestamp(Date() as unknown as Date)
				.setTitle('__**Missing Or Invalid Arguments:**__')
            let msg = await HelperFunctions.sendMessageWithCorrectChannel(commandData, msgEmbed);
            if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                msg = new Discord.Message(commandData.guild!.client, msg, commandData.fromTextChannel!);
            }
            await msg.delete({timeout: 20000});
            return commandReturnData;
        } else if (commandData.args[1] === undefined) {
            const msgString = `------\n**Please, enter the name of a server role! (!setdefaultrole = ADDorREMOVE, ROLENAME, or just !setdefaultrol)**\n------`;
            let msgEmbed = new Discord.MessageEmbed()
				.setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
				.setColor(guildData.borderColor)
				.setDescription(msgString)
				.setTimestamp(Date() as unknown as Date)
				.setTitle('__**Missing Or Invalid Arguments:**__')
            let msg = await HelperFunctions.sendMessageWithCorrectChannel(commandData, msgEmbed);
            if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                msg = new Discord.Message(commandData.guild!.client, msg, commandData.fromTextChannel!);
            }
            await msg.delete({timeout: 20000});
            return commandReturnData;
        } else if (roleMentionRegExp.test(commandData.args[1])) {
            const roleID = commandData.args[1].match(idRegExp)![0];
            roleMemberManager = new Discord.RoleManager(commandData.guild!);
            currentDiscordRole = await roleMemberManager.fetch(roleID!) as Discord.Role;
            commandData.args[1] = currentDiscordRole.name;
        } else if (idRegExp.test(commandData.args[1])) {
            roleMemberManager = new Discord.RoleManager(commandData.guild!);
            currentDiscordRole = await roleMemberManager.fetch(commandData.args[1]) as Discord.Role;
            commandData.args[1] = currentDiscordRole.name;
        }
        if (commandData.args[0]?.toLowerCase() === 'add') {
            whatAreWeDoing = 'add';
        } else if (commandData.args[0]?.toLowerCase() === 'remove') {
            whatAreWeDoing = 'remove';
        }

        const roleName = commandData.args[1];

        const roleArray = commandData.guild!.roles.cache.array().sort();

        for (let x = 0; x < guildData.defaultRoleIDs!.length; x += 1) {
            const isItFoundReal = roleArray.map(role => {
                let isItFound = false;
                if (role.id === guildData.defaultRoleIDs![x]) {
                    isItFound = true;
                    return isItFound;
                }
                return isItFound;
            });
            let isItFoundFinal = false
            for (let y = 0; y < isItFoundReal.length; y += 1) {
                if (isItFoundReal[y] === true) {
                    isItFoundFinal = true;
                }
            }
            if (isItFoundFinal === false) {
                console.log('Removing a missing guild role from the list of defaults.');
                guildData.defaultRoleIDs!.splice(x, 1);
                await guildData.writeToDataBase(); 
            }
        }

        if (whatAreWeDoing === 'view') {
            let msgString = '';

            if (guildData.defaultRoleIDs!.length > 0) {
                msgString = '\n------\n';
                guildData.defaultRoleIDs!.map(roleID => {
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
                .setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
                .setColor(guildData.borderColor)
                .setTitle('__**Default Roles:**__')
                .setTimestamp(Date() as unknown as Date)
                .setDescription(msgString);
            await HelperFunctions.sendMessageWithCorrectChannel(commandData, messageEmbed)
            return commandReturnData;
        }

        let currentRole = new Discord.Role(commandData.guildMember!.client, {}, commandData.guildMember!.client.guilds.resolve(guildData.id!)!);

        let isItFound = false;
        roleArray.map(role => {
            if (role.name === roleName) {
                currentRole = role;
                isItFound = true
            }
            return role;
        });

        if (isItFound === false) {
            const msgString = `------\n**Sorry, but the role you entered could not be found! Check spelling and case!**\n------`;
            let msgEmbed = new Discord.MessageEmbed()
                .setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
                .setColor(guildData.borderColor)
                .setDescription(msgString)
                .setTimestamp(Date() as unknown as Date)
                .setTitle('__**Role Issue:**__');
            let msg = await HelperFunctions.sendMessageWithCorrectChannel(commandData, msgEmbed);
            if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                msg = new Discord.Message(commandData.guild!.client, msg, commandData.fromTextChannel!);
             }
            await msg.delete({timeout: 20000});
            return commandReturnData;
        }

        if (whatAreWeDoing === 'add') {
            for (let x = 0; x < guildData.defaultRoleIDs!.length; x += 1) {
                if (currentRole.id === guildData.defaultRoleIDs![x]) {
                    const msgString = `------\n**Hey! It looks like you've already added that role!**\n------`;
                    let msgEmbed = new Discord.MessageEmbed()
				        .setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
				        .setColor(guildData.borderColor)
				        .setDescription(msgString)
				        .setTimestamp(Date() as unknown as Date)
				        .setTitle('__**Role Issue:**__')
                    let msg = await HelperFunctions.sendMessageWithCorrectChannel(commandData, msgEmbed);
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild!.client, msg, commandData.fromTextChannel!);
                    }
                    await msg.delete({timeout: 20000});
                    return commandReturnData;
                }
            }

            guildData.defaultRoleIDs!.push(currentRole.id);
            await guildData.writeToDataBase();

            const msgString = `\n------\n__**Role:**__ <@&${currentRole.id}>\n------`;

            const messageEmbed = new Discord.MessageEmbed();
            messageEmbed
                .setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
                .setColor(guildData.borderColor)
                .setTitle('__**New Default Role Added:**__')
                .setTimestamp((Date() as unknown) as Date)
                .setDescription(msgString);
            await HelperFunctions.sendMessageWithCorrectChannel(commandData, messageEmbed)
            return commandReturnData;
        }
        if (whatAreWeDoing === 'remove') {
            isItFound = false;
            for (let x = 0; x < guildData.defaultRoleIDs!.length; x += 1) {
                if (currentRole.id === guildData.defaultRoleIDs![x]) {
                    guildData.defaultRoleIDs!.splice(x, 1);
                    await guildData.writeToDataBase();
                    isItFound = true;
                }
            }

            if (isItFound === false) {
                const msgString = `------\n**Sorry, but the role you entered could not be found! Check spelling and case!**\n------`;
                let msgEmbed = new Discord.MessageEmbed()
				    .setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
				    .setColor(guildData.borderColor)
				    .setDescription(msgString)
				    .setTimestamp(Date() as unknown as Date)
				    .setTitle('__**Missing Or Invalid Arguments:**__')
                let msg = await HelperFunctions.sendMessageWithCorrectChannel(commandData, msgEmbed);
                if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                    msg = new Discord.Message(commandData.guild!.client, msg, commandData.fromTextChannel!);
                }
                await msg.delete({timeout: 20000});
                return commandReturnData;
            }

            const msgString = `${'\n------\n__**Role**__: <@&'}${currentRole.id}>\n------`;

            const messageEmbed = new Discord.MessageEmbed();
            messageEmbed
                .setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
                .setColor(guildData.borderColor)
                .setTitle('__**Default Role Removed:**__')
                .setTimestamp((Date() as unknown) as Date)
                .setDescription(msgString);
            await HelperFunctions.sendMessageWithCorrectChannel(commandData, messageEmbed);
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
