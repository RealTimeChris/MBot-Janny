// onguilddelete.ts - Module for my "on guild delete" command.
// Feb 22, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

import Discord = require('discord.js');
import DiscordStuff = require('../DiscordStuff');

const command = new DiscordStuff.BotCommand();
command.name ='onguilddelete';
command.description = "It's an automatic one!";

async function execute(guild: Discord.Guild, 
    discordUser: DiscordStuff.DiscordUser): Promise<string> {
    try {
        if (!(discordUser instanceof DiscordStuff.DiscordUser)) {
            return command.name;
        }

        const serverRecordKey = `${guild.id} + Record`;

        const serverRecordString = await discordUser.dataBase.get(serverRecordKey);
        const serverRecordObject = JSON.parse(serverRecordString);

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
export default command as DiscordStuff.BotCommand;
