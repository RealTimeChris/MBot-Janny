// setreplacementinvite.ts - Module for my "set replacement invite" command.
// Feb 22, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

import Discord = require('discord.js');
import FoundationClasses from '../FoundationClasses';
import DiscordUser from '../DiscordUser';
import GuildData from '../GuildData';
import HelperFunctions from '../HelperFunctions';

const command: FoundationClasses.BotCommand = {
    name: 'setreplacementinvite',
    description: '!setreplacementinvite = REPLACEMENTINVITELINK\nBe sure to call this from within the chosen server, before it gets nuked!',
    function: Function()
};

async function execute(commandData: FoundationClasses.CommandData, discordUser: DiscordUser): Promise<FoundationClasses.CommandReturnData> {
    const commandReturnData: FoundationClasses.CommandReturnData = {
        commandName: command.name
    };
	
    try {
        const areWeInADM = await HelperFunctions.areWeInADM(commandData);

        if (areWeInADM === true) {
            return commandReturnData;
        }

        const doWeHaveAdminPerms = await HelperFunctions.doWeHaveAdminPermission(commandData, discordUser);

        if (doWeHaveAdminPerms === false) {
            return commandReturnData;
        }

        let guildData: GuildData;

        try{
            const guildData = new GuildData({dataBase: discordUser.dataBase, id: commandData.guild!.id, name: commandData.guild!.name, memberCount: commandData.guild!.memberCount});
            await guildData.getFromDataBase();
        }
        catch(error) {
            if (error.type === 'NotFoundError') {
                const msgString = '------\n**Sorry, but your current guild could not be found!**\n------';
                let msgEmbed = new Discord.MessageEmbed()
                    .setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
                    .setColor(guildData!.borderColor as [number, number, number])
                    .setDescription(msgString)
                    .setTimestamp(Date() as unknown as Date)
                    .setTitle('__**Server Issue:**__');
                let msg = await HelperFunctions.sendMessageWithCorrectChannel(commandData, msgEmbed);
                if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                    msg = new Discord.Message(commandData.guild!.client, msg, commandData.fromTextChannel!);
                }
                await msg.delete({timeout: 20000});
                return commandReturnData;
            }
        }
        

        const inviteRegExp = /https:\/\/discord.gg\/\w{1,26}/;

        let whatAreWeDoing = '';
        if (commandData.args[0] !== undefined && !inviteRegExp.test(commandData.args[0])) {
            const msgString = '------\n**Please, enter a valid new server invite link! (!setreplacementinvite = REPLACEMENTINVITELINK)**\n------';
            let msgEmbed = new Discord.MessageEmbed()
				.setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
				.setColor(guildData!.borderColor as [number, number, number])
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
        if (commandData.args[0] === undefined) {
            whatAreWeDoing = 'viewing';
        } else if (commandData.args[0] !== undefined && inviteRegExp.test(commandData.args[0])) {
            whatAreWeDoing = 'adding';
        }

        const inviteLink = commandData.args[0];

        if (whatAreWeDoing === 'viewing') {
            const serverRecordKey = `${commandData.guild!.id} + Record`;
            const serverRecordObject = await discordUser.dataBase.get(serverRecordKey);

            const inviteLink2 = serverRecordObject.replacementServerInvite;

            let msgString = '\n------\n';
            if (inviteLink === '') {
                msgString += "__There's no link to display, currently!__\n------";
            } else {
                msgString += `__**Link:**__ ${inviteLink2}\n------`;
            }

            const messageEmbed = new Discord.MessageEmbed()
                .setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
                .setColor(guildData!.borderColor as [number, number, number])
                .setTimestamp(Date() as unknown as Date)
                .setTitle('__**Replacement Invite Link:**__')
                .setDescription(msgString);

            await HelperFunctions.sendMessageWithCorrectChannel(commandData, messageEmbed);
            return commandReturnData;
        }
        if (whatAreWeDoing === 'adding') {
            const serverRecordKey = `${commandData.guild!.id} + Record`;
            const serverRecordObject = await discordUser.dataBase.get(serverRecordKey);

            serverRecordObject.replacementServerInvite = inviteLink;

            console.log(serverRecordObject);

            await discordUser.dataBase.put(serverRecordKey, serverRecordObject);

            const msgString = `Great! You've updated the guild ${serverRecordObject.serverName}'s replacement invite link!`
                                + `\n------\n__**Link:**__ ${serverRecordObject.replacementServerInvite}\n------`;

            const messageEmbed = new Discord.MessageEmbed()
                .setAuthor((commandData.guildMember as Discord.GuildMember).user.username, (commandData.guildMember as Discord.GuildMember).user.avatarURL()!)
                .setColor(guildData!.borderColor as [number, number, number])
                .setTimestamp(Date() as unknown as Date)
                .setTitle('__**Replacement Invite Link Updated:**__')
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
