// jannyoptions.ts - Module for my "gamehouse options" command.
// Mar 14, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

import Discord = require('discord.js');
import FoundationClasses = require('../FoundationClasses');
import DiscordUser = require('../DiscordUser');
import GuildData from '../GuildData';
import HelperFunctions from '../HelperFunctions';

const command: FoundationClasses.BotCommand = {
	name: 'jannyoptions',
	description: '!jannyoptions, to display a list of options for this bot!',
	function: Function()
};

async function execute(commandData: FoundationClasses.CommandData,  discordUser: DiscordUser.DiscordUser): Promise<FoundationClasses.CommandReturnData> {
	try {
		const commandReturnData: FoundationClasses.CommandReturnData = {
			commandName: command.name
		};
		commandReturnData.commandName = command.name;
		const areWeInADM = await HelperFunctions.areWeInADM(commandData);

		if (areWeInADM === true) {
			return commandReturnData;
		}

		const doWeHaveAdminPerms = await HelperFunctions.doWeHaveAdminPermission(commandData, discordUser);

		if (doWeHaveAdminPerms === false) {
			return commandReturnData;
		}

		const guildData = new GuildData({dataBase: discordUser.dataBase, id: commandData.guild!.id, name: commandData.guild!.name, memberCount: commandData.guild!.memberCount});

		const msgEmbed = new Discord.MessageEmbed();
		msgEmbed
			.setAuthor((commandData.guildMember as Discord.GuildMember).client.user!.username, (commandData.guildMember as Discord.GuildMember).client.user!.avatarURL()!)
			.setTimestamp(Date() as unknown as Date)
			.setTitle('__**Janny Options:**__')
			.setColor(guildData.exposeDataValues().borderColor as [number, number, number])
			.setDescription("**Enter '!help = COMMANDNAME to get instructions for each option!**");

		const fields = [];
		let resultIcon = '❌';
		for (let x = 0; x < guildData.exposeDataValues().logs!.length; x += 1) {
			if (guildData.exposeDataValues().logs![x]!.enabled === true) {
				resultIcon = '✅';
				break;
			}
		}
		const logsField = { name: '__**Logs:**__', value: `__Active:__ ${resultIcon}\n__
			Command(s):__ '!managelogs'`, inline: true };
		fields.push(logsField);

		resultIcon = '❌';
		if (guildData.exposeDataValues().defaultRoleIDs!.length > 0) {
			resultIcon = '✅';
		}
		const defaultRolesField = { name: '__**Default Roles:**__', value: `__Active:__ ${resultIcon}\n
			__Command(s):__ '!setdefaultrole'`, inline: true };
		fields.push(defaultRolesField);

		resultIcon = '❌';
		if (guildData.exposeDataValues().deletionChannels!.length > 0) {
			resultIcon = '✅';
		}
		const deletionChannelsField = { name: '__**Delete Messages From Channels:**__', value: `__Active:__ ${resultIcon}\n
			__Command(s):__ '!setdeletionstatus'`, inline: true };
		fields.push(deletionChannelsField);

		resultIcon = '❌';
		const serverRecordKey = `${commandData.guild!.id} + Record`;
		const serverRecordObject = await discordUser.dataBase.get(serverRecordKey);
		if (serverRecordObject.replacementServerInvite !== '') {
			resultIcon = '✅';
		}
		const replacementServerInviteField = { name: '__**Replacement Server Invite:**__', value: `__Active:__ ${resultIcon}\n
			__Command(s):__ '!setreplacementinvite'`, inline: true };
		fields.push(replacementServerInviteField);

		resultIcon = '❌';
		if (guildData.exposeDataValues().verificationSystem!.channelID != '') {
			resultIcon = '✅';
		}
		const requireServerVerificationField = { name: '__**Require Server Verification:**__', value: `__Active:__ ${resultIcon}\n
			__Command(s):__ '!setverificationsystem'`, inline: true };
		fields.push(requireServerVerificationField);

		resultIcon = '❌';
		if (guildData.exposeDataValues().timedMessages!.length > 0) {
			resultIcon = '✅';
		}
		const timedMessagesField = { name: '__**Send Out Timed Messages:**__', value: `__Active:__ ${resultIcon}\n
			__Command(s):__ '!timedmessages'`, inline: true };
		fields.push(timedMessagesField);
		
		resultIcon = '❌';
		if (guildData.exposeDataValues().trackedUsers!.length > 0) {
			resultIcon = '✅';
		}
		const trackUsersField = { name: "__**Track User's Messages:**__", value: `__Active:__ ${resultIcon}\n
			__Command(s):__ '!trackuser'`, inline: true };
		fields.push(trackUsersField);

		msgEmbed.fields = fields;
		await HelperFunctions.sendMessageWithCorrectChannel(commandData, msgEmbed);
		return commandReturnData;
	} catch (error) {
		return new Promise((resolve, reject) => {
			reject(error);
		});
	}
}
command.function = execute;
export default command as FoundationClasses.BotCommand;
