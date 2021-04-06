// botinfo.ts - Module for my display user data function.
// Jan 30, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

import Discord = require('discord.js');
import FoundationClasses = require('../FoundationClasses');
import DiscordUser from '../DiscordUser';
import HelperFunctions from '../HelperFunctions';

const command: FoundationClasses.BotCommand = {
    name: 'botinfo',
    description: '!botinfo to display info about this bot in chat!',
    function: Function()
};

 /**
 * Displays the data about the currend user.
 */ 
async function execute(commandData: FoundationClasses.CommandData, discordUser: DiscordUser): Promise<FoundationClasses.CommandReturnData> {
   try {
       const commandReturnData: FoundationClasses.CommandReturnData = {
           commandName: command.name
       };
       commandReturnData.commandName = command.name;
       const fields: Discord.EmbedField[] = [];
       const field1 = { name: '__Bot Name:__', value: discordUser.userData.userName, inline: true };
       fields.push(field1);
       const field2 = { name: '__Bot ID:__', value: discordUser.userData.userID, inline: true };
       fields.push(field2);
       const field3 = { name: '__Guild Count:__', value: discordUser.userData.guildCount.toString(), inline: true };
       fields.push(field3);
       const field4 = { name: '__Currency Name:__', value: discordUser.userData.currencyName, inline: true };
       fields.push(field4);

        const messageEmbed = new Discord.MessageEmbed()
           .setImage(commandData.guildMember?.client.user?.avatarURL()!)
           .setColor([254, 254, 254])
           .setTitle('__**Bot Info:**__')
           .setTimestamp(Date() as unknown as Date);
        messageEmbed.fields = fields;
        await HelperFunctions.sendMessageWithCorrectChannel(commandData, messageEmbed);
        return commandReturnData;
   } catch (error) {
       return new Promise((resolve, reject) => {
           reject(error);
       });
   }
}
command.function = execute;
export default command as FoundationClasses.BotCommand;
