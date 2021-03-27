// botinfo.ts - Module for my display user data function.
// Jan 30, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

import Discord = require('discord.js');
import DiscordStuff = require('../DiscordStuff.js');

const command = new DiscordStuff.BotCommand();
command.name = 'botinfo';
command.description = '!botinfo to display info about this bot in chat!';

 /*** Displays the data about the currend user.
* @param   {Discord.Message}             message
* @param   {String[]}                    args
* @param   {DiscordStuff.DiscordUser}    discordUser
* @returns {Promise<string>}
*/
export async function execute(message: Discord.Message, args: string[], discordUser: DiscordStuff.DiscordUser): Promise<string> {
   try {
       const fields: Discord.EmbedField[] = [];
       const field1 = { name: '__Bot Name:__', value: discordUser.userData.userName, inline: true };
       fields.push(field1 as Discord.EmbedField);
       const field2 = { name: '__Bot ID:__', value: discordUser.userData.userID, inline: true };
       fields.push(field2 as Discord.EmbedField);
       const field3 = { name: '__Guild Count:__', value: discordUser.userData.guildCount.toString(), inline: true };
       fields.push(field3 as Discord.EmbedField);
       const field4 = { name: '__Currency Name:__', value: discordUser.userData.currencyName, inline: true };
       fields.push(field4 as Discord.EmbedField);

       const messageEmbed = new Discord.MessageEmbed()
           .setImage((message.client.user as Discord.User).avatarURL() as string)
           .setColor([0, 0, 255])
           .setTitle('__**Bot Info:**__')
           .setTimestamp((Date() as unknown) as Date);
       messageEmbed.fields = fields;
       await message.channel.send(messageEmbed);
       if (message.channel.type !== 'dm') {
           await message.delete();
       }
       return new Promise((resolve, reject) => {
        resolve(command.name);
       });
   } catch (error) {
       return new Promise((resolve, reject) => {
           reject(error);
       });
   }
}
command.function = execute;
export default command as DiscordStuff.BotCommand;