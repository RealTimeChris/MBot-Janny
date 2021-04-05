// onguilddelete.ts - Module for my "on guild delete" command.
// Feb 22, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

import Discord = require('discord.js');
import DiscordUser from '../DiscordUser';
import HelperFunctions from '../HelperFunctions';

const command = new DiscordUser.BotCommand();
command.name ='onguilddelete';
command.description = "It's an automatic one!";

async function execute(guild: Discord.Guild, 
    discordUser: DiscordUser.DiscordUser): Promise<string> {
    try {
        const commandReturnData = new DiscordUser.CommandReturnData();
		commandReturnData.commandName = command.name;
        if (!(discordUser instanceof DiscordUser.DiscordUser)) {
            return command.name;
        }

        const serverRecordKey = `${guild.id} + Record`;

        const serverRecordObject  = await discordUser.dataBase.get(serverRecordKey);

        if (serverRecordObject.replacementServerInvite.length >= 2) {
            discordUser.userData.activeInviteGuilds.push(guild.id);
            discordUser.updateUserDataInDB(discordUser.userData);
        }
        return command.name;
    } catch (error) {
        return new Promise((resolve, reject) => {
            reject(error);
        });
    }
}
command.function = execute;
export default command as DiscordUser.BotCommand;
