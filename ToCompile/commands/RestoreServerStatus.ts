// RestoreServerStatus.ts - Header for the "restore server status" command.
// Jul 1, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

import Discord = require('discord.js');
import FoundationClasses from '../FoundationClasses';
import DiscordUser from '../DiscordUser';

const command: FoundationClasses.BotCommand = {
    name: 'restoreserverstatuc',
    description: "It's an automatic one!",
    function: Function()
};

async function execute(commandData: FoundationClasses.CommandData, discordUser: DiscordUser): Promise<FoundationClasses.CommandReturnData> {
    try {
        const commandReturnData: FoundationClasses.CommandReturnData = {
            commandName: command.name
        };
		
        if (!(discordUser instanceof DiscordUser)) {
            return commandReturnData;
        }

        for (let i =0; i < commandData.guild?.members.cache.size!; i+=1){
            discordUser.userData.guildMemberList.push(commandData.guild?.members.cache.array()[i]!.id!);
        }
    
        discordUser.userData.guildMemberList.push();

        return commandReturnData;
    } catch (error) {
        return new Promise((resolve, reject) => {
            reject(error);
        });
    }
}
command.function = execute;
export default command as FoundationClasses.BotCommand;
;