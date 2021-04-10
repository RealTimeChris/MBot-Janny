// oninvitecreate.ts - Module for my "on invite create" command.
// Mar 12, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

import Discord = require('discord.js');
import FoundationClasses from '../FoundationClasses';
import DiscordUser from '../DiscordUser';
import GuildData from '../GuildData';

const command: FoundationClasses.BotCommand = {
    name: 'oninvitecreate',
    description: "It's an automatic one!",
    function: Function()
};

async function execute(client: Discord.Client, invite: Discord.Invite,
    discordUser: DiscordUser): Promise<FoundationClasses.CommandReturnData> {
    try {
        const commandReturnData: FoundationClasses.CommandReturnData =  {
            commandName: command.name
        };
		
        if (!(invite instanceof Discord.Invite)) {
            return commandReturnData;
        }

        const guildData = new GuildData({dataBase: discordUser.dataBase, id: invite.guild!.id, name: invite.guild!.name, memberCount: invite.guild!.memberCount});
        await guildData.getFromDataBase();

        let logs: FoundationClasses.Log;
        for (let x = 0; x < guildData.logs.length; x += 1) {
            if (guildData.logs[x]!.nameSmall === 'invitecreate') {
                logs = guildData.logs[x]!;
                break;
            }
        }

        if (logs!.enabled === true) {
            const textChannel = await client.channels.fetch(logs!.loggingChannelID) as Discord.TextChannel;

            const msgEmbed = new Discord.MessageEmbed();
            let msgString = '';
            msgString = `__**Max Uses:**__ ${invite.maxUses}\n`;
            msgString += `__**Expires At:**__ ${invite.expiresAt}\n`;
            msgString += `__**URL:**__ ${invite.url}\n`;
            msgString += `__**Created By User:**__ <@!${invite.inviter!.id}> (${invite.inviter!.tag})`;
    
            msgEmbed
                .setTitle('__**New Invite:**__')
                .setTimestamp(Date() as unknown as Date)
                .setDescription(msgString)
                .setColor(guildData.borderColor);
            await textChannel.send(msgEmbed);
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
