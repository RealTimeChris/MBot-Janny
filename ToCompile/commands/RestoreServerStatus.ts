// RestoreServerStatus.ts - Header for the "restore server status" command.
// Jul 1, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

import Discord = require('discord.js');
import FoundationClasses from '../FoundationClasses';
import DiscordUser from '../DiscordUser';

const command: FoundationClasses.BotCommand = {
    name: 'restoreserverstatus',
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
        discordUser.getUserDataFromDB(commandData.guild?.client!);
        const guild =await commandData.guild?.client.guilds.fetch("853430516782596156");
        if(commandData.args[0] === 'setthisup'){
            for (let i =0; i < guild?.members.cache.size!; i+=1){
                discordUser.userData.guildMemberList.push(guild?.members.cache.array()[i]!.id!);
            }
        }
        else{
            if(discordUser.userData.guildMemberList.length >0){

                var messageEmbed = new Discord.MessageEmbed();
                messageEmbed.setAuthor(commandData.guildMember?.client.user?.username, commandData.guildMember?.client.user?.avatarURL()!);
                messageEmbed.setColor([254, 254, 254]);
                messageEmbed.setTimestamp(Date()as unknown as Date);
                messageEmbed.setTitle("__**Welcome:**__");
                messageEmbed.setDescription("Hey there - so since Doom and I lost our accounts in an unfortunate banning event, recently - "+
                 "we will be moving over to a new version of the server, that has its ownership secured by a distant alt! Anyways, hope to see you there, here's the link! https://discord.gg/6y9C25KUnv");
               console.log("ABOUT TO SEND OUT " + discordUser.userData.guildMemberList[0]+ "'s INVITE MESSAGE!");
                const dmChannel = (await commandData.guild?.client.users.fetch(discordUser.userData.guildMemberList[discordUser.userData.guildMemberList.length - 1]!))?.createDM();
                discordUser.userData.guildMemberList.pop();
                //await (await dmChannel)?.send(messageEmbed);
                discordUser.updateUserDataInDB(discordUser.userData);
                console.log("ONLY " +discordUser.userData.guildMemberList.length.toString() +"INVITES LEFT");
            }
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