// setreplacementinvite.ts - Module for my "set replacement invite" command.
// Feb 22, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

import Discord = require('discord.js');
import DiscordStuff = require('../DiscordStuff');

const command = new DiscordStuff.BotCommand();
command.name = 'setreplacementinvite';
command.description = '!setreplacementinvite = REPLACEMENTINVITELINK\nBe sure to call this from within the chosen server, before it gets nuked!';

export async function execute(commandData: DiscordStuff.CommandData, discordUser: DiscordStuff.DiscordUser): Promise<DiscordStuff.CommandReturnData> {
    const commandReturnData = new DiscordStuff.CommandReturnData();
	commandReturnData.commandName = command.name;
    try {
        const areWeInADM = await DiscordStuff.areWeInADM(commandData);

        if (areWeInADM === true) {
            return commandReturnData;
        }

        const doWeHaveAdminPerms = await discordUser.doWeHaveAdminPermission(commandData);

        if (doWeHaveAdminPerms === false) {
            return commandReturnData;
        }

        const inviteRegExp = /https:\/\/discord.gg\/\w{1,26}/;

        let whatAreWeDoing = '';
        if (commandData.args[0] !== undefined && !inviteRegExp.test(commandData.args[0])) {
            const msgString = 'Please, enter a valid new server invite link! (!setreplacementinvite = REPLACEMENTINVITELINK)';
            await DiscordStuff.sendMessageWithCorrectChannel(commandData, msgString);
            return commandReturnData;
        }
        if (commandData.args[0] === undefined) {
            whatAreWeDoing = 'viewing';
        } else if (commandData.args[0] !== undefined && inviteRegExp.test(commandData.args[0])) {
            whatAreWeDoing = 'adding';
        }

        const inviteLink = commandData.args[0];

        if (whatAreWeDoing === 'viewing') {
            const serverRecordKey = `${(commandData.guild as Discord.Guild).id} + Record`;
            const serverRecordObject = await discordUser.dataBase.get(serverRecordKey);

            const inviteLink2 = serverRecordObject.replacementServerInvite;

            let msgString = '\n------\n';
            if (inviteLink === '') {
                msgString += "__There's no link to display, currently!__\n------";
            } else {
                msgString += `__**Link:**__ ${inviteLink2}\n------`;
            }

            const messageEmbed = new Discord.MessageEmbed()
                .setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL() as string)
                .setColor([0, 0, 255])
                .setTimestamp((Date() as unknown) as Date)
                .setTitle('__**Replacement Invite Link:**__')
                .setDescription(msgString);

            await DiscordStuff.sendMessageWithCorrectChannel(commandData, messageEmbed);
            return commandReturnData;
        }
        if (whatAreWeDoing === 'adding') {
            const serverRecordKey = `${(commandData.guild as Discord.Guild).id} + Record`;
            const serverRecordObject = await discordUser.dataBase.get(serverRecordKey);

            serverRecordObject.replacementServerInvite = inviteLink;

            console.log(serverRecordObject);

            await discordUser.dataBase.put(serverRecordKey, serverRecordObject);

            const msgString = `Great! You've updated the guild ${serverRecordObject.serverName}'s replacement invite link!`
                                + `\n------\n__**Link:**__ ${serverRecordObject.replacementServerInvite}\n------`;

            const messageEmbed = new Discord.MessageEmbed()
                .setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL() as string)
                .setColor([0, 0, 254])
                .setTimestamp((Date() as unknown) as Date)
                .setTitle('__**Replacement Invite Link Updated:**__')
                .setDescription(msgString);

            await DiscordStuff.sendMessageWithCorrectChannel(commandData, messageEmbed);
            return commandReturnData;
        }
        return commandReturnData;
    } catch (error) {
        if (error.type === 'NotFoundError') {
            const msgString = 'Sorry, but your current guild could not be found!';
            await DiscordStuff.sendMessageWithCorrectChannel(commandData, msgString);
            return commandReturnData;
        }
        return new Promise((resolve, reject) => {
            reject(error);
        });
    }
}
command.function = execute;
export default command as DiscordStuff.BotCommand;
