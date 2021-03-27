// jannyoptions.ts - Module for my "gamehouse options" command.
// Mar 14, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

import Discord = require('discord.js');
import DiscordStuff = require('../DiscordStuff');

const command = new DiscordStuff.BotCommand();
command.name = 'jannyoptions';
command.description = '!jannyoptions, to display a list of options for this bot!';

	export async function execute(message: Discord.Message, args: string[], discordUser: DiscordStuff.DiscordUser): Promise<string> {
	try {
		const areWeInADM = await DiscordStuff.areWeInADM(message);

		if (areWeInADM === true) {
			return command.name;
		}

		const doWeHaveAdminPerms = await discordUser.doWeHaveAdminPermission(message);

		if (doWeHaveAdminPerms === false) {
			return command.name;
		}

		const guildData = await discordUser.getGuildDataFromDB(message.guild as Discord.Guild);

		const msgEmbed = new Discord.MessageEmbed();
		msgEmbed
			.setAuthor((message.client.user as Discord.User).username, (message.client.user as Discord.User).avatarURL() as string)
			.setTimestamp((Date() as unknown) as Date)
			.setTitle('__**Janny Options:**__')
			.setColor([0, 0, 255])
			.setDescription("**Enter '!help = COMMANDNAME to get instructions for each option!**");

		const fields = [];
		let resultIcon = '❌';
		for (let x = 0; x < guildData.logs.length; x += 1) {
			if ((guildData.logs[x] as DiscordStuff.Log).enabled === true) {
				resultIcon = '✅';
				break;
			}
		}
		const logsField = { name: '__**Logs:**__', value: `__Active:__ ${resultIcon}\n__
			Command(s):__ '!managelogs'`, inline: true };
		fields.push(logsField);

		resultIcon = '❌';
		if (guildData.defaultRoleIDs.length > 0) {
			resultIcon = '✅';
		}
		const defaultRolesField = { name: '__**Default Roles:**__', value: `__Active:__ ${resultIcon}\n
			__Command(s):__ '!setdefaultrole'`, inline: true };
		fields.push(defaultRolesField);

		resultIcon = '❌';
		if (guildData.deletionChannels.length > 0) {
			resultIcon = '✅';
		}
		const deletionChannelsField = { name: '__**Delete Messages From Channels:**__', value: `__Active:__ ${resultIcon}\n
			__Command(s):__ '!setdeletionstatus'`, inline: true };
		fields.push(deletionChannelsField);

		resultIcon = '❌';
		const serverRecordKey = `${(message.guild as Discord.Guild).id} + Record`;
		const serverRecordString = await discordUser.dataBase.get(serverRecordKey);
		const serverRecordObject = JSON.parse(serverRecordString);
		if (serverRecordObject.replacementServerInvite !== '') {
			resultIcon = '✅';
		}
		const replacementServerInviteField = { name: '__**Replacement Server Invite:**__', value: `__Active:__ ${resultIcon}\n
			__Command(s):__ '!setreplacementinvite'`, inline: true };
		fields.push(replacementServerInviteField);

		resultIcon = '❌';
		if (guildData.verificationSystem.channelID != '') {
			resultIcon = '✅';
		}
		const requireServerVerificationField = { name: '__**Require Server Verification:**__', value: `__Active:__ ${resultIcon}\n
			__Command(s):__ '!setverificationsystem'`, inline: true };
		fields.push(requireServerVerificationField);

		resultIcon = '❌';
		if (guildData.timedMessages.length > 0) {
			resultIcon = '✅';
		}
		const timedMessagesField = { name: '__**Send Out Timed Messages:**__', value: `__Active:__ ${resultIcon}\n
			__Command(s):__ '!timedmessages'`, inline: true };
		fields.push(timedMessagesField);

		const userData = await discordUser.getUserDataFromDB(message.client);
		resultIcon = '❌';
		for (let x = 0; x < userData.trackingGuildIDs.length; x += 1) {
			if (userData.trackingGuildIDs[x] === (message.guild as Discord.Guild).id) {
				resultIcon = '✅';
			}
		}
		const trackUsersField = { name: "__**Track User's Messages:**__", value: `__Active:__ ${resultIcon}\n
			__Command(s):__ '!trackuser'`, inline: true };
		fields.push(trackUsersField);

		msgEmbed.fields = fields;
		await message.channel.send(msgEmbed);
		if (message.deletable) {
			await message.delete();
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
