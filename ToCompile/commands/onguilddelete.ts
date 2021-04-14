// onguilddelete.ts - Module for my "on guild delete" command.
// Feb 22, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

import Discord = require('discord.js');
import FoundationClasses from '../FoundationClasses';
import DiscordUser from '../DiscordUser';

const command: FoundationClasses.BotCommand = {
    name: 'onguilddelete',
    description: "It's an automatic one!",
    function: Function()
};

async function execute(guild: Discord.Guild, 
    discordUser: DiscordUser): Promise<FoundationClasses.CommandReturnData> {
    try {
        const commandReturnData: FoundationClasses.CommandReturnData = {
            commandName: command.name
        };
		
        if (!(discordUser instanceof DiscordUser)) {
            return commandReturnData;
        }

        const serverRecordKey = `${guild.id} + Record`;

        const serverRecordObject  = await discordUser.dataBase.get(serverRecordKey);

        if (serverRecordObject.replacementServerInvite.length >= 2) {
            discordUser.userData.activeInviteGuilds.push(guild.id);
            discordUser.updateUserDataInDB(discordUser.userData);
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
