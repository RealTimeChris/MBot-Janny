// oninvitecreate.ts - Module for my "on invite create" command.
// Mar 12, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

import Discord = require('discord.js');
import DiscordStuff = require('../DiscordStuff');

const command = new DiscordStuff.BotCommand();
command.name = 'oninvitecreate';
command.description = "It's an automatic one!";

export async function execute(client: Discord.Client, invite: Discord.Invite,
    discordUser: DiscordStuff.DiscordUser): Promise<string> {
    try {
        const commandReturnData = new DiscordStuff.CommandReturnData();
		commandReturnData.commandName = command.name;
        if (!(invite instanceof Discord.Invite)) {
            return command.name;
        }

        const guildData = await discordUser.getGuildDataFromDB(invite.guild as Discord.Guild);

        let logs = new DiscordStuff.Log();
        for (let x = 0; x < guildData.logs.length; x += 1) {
            if ((guildData.logs[x] as DiscordStuff.Log).nameSmall === 'invitecreate') {
                logs = guildData.logs[x] as DiscordStuff.Log;
                break;
            }
        }

        const textChannel = await client.channels.fetch(logs.loggingChannelID) as Discord.TextChannel;

        const msgEmbed = new Discord.MessageEmbed();
        let msgString = String('');
        msgString = `__**Max Uses:**__ ${invite.maxUses}\n`;
        msgString += `__**Expires At:**__ ${invite.expiresAt}\n`;
        msgString += `__**URL:**__ ${invite.url}\n`;
        msgString += `__**Created By User:**__ <@!${(invite.inviter as Discord.User).id}> (${(invite.inviter as Discord.User).tag})`;

        msgEmbed
            .setTitle('__**New Invite:**__')
            .setTimestamp((Date() as unknown) as Date)
            .setDescription(msgString)
            .setColor([0, 0, 255]);
        await textChannel.send(msgEmbed);
        return command.name;
    } catch (error) {
        return new Promise((resolve, reject) => {
            reject(error);
        });
    }
}
command.function = execute;
export default command as DiscordStuff.BotCommand;
