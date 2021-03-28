// test.ts - Module for my testing stuff.
// Feb 4, 2021
// Chris M.
// https://github.com/RealTimeChriss

'use strict';

import Discord = require('discord.js');
import DiscordStuff = require('../DiscordStuff.js');
import {DiscordInteractions} from 'slash-commands';
import SlashCommands = require('slash-commands');

const command = new DiscordStuff.BotCommand();
command.name = 'test';
command.description = '!test';

 export async function execute(message: Discord.Message, args: string[], discordUser: DiscordStuff.DiscordUser): Promise<string> {
    try {
        if (message.deletable) {
        }
        const interaction = new DiscordInteractions({applicationId: discordUser.userData.clientID, authToken: discordUser.userData.botToken, publicKey: discordUser.userData.publicKey,});
        const appCommands = await interaction.getApplicationCommands();
        for (let x = 0; x < appCommands.length; x += 1){
            const isItDeleted = await interaction.deleteApplicationCommand(appCommands[x]?.id as string);
            console.log(isItDeleted);
        }

        const ghostCommand = {
            "name": "ghost",
            "desctription":"Mutes and silences the user across the entire server.",
            "options":[
                {
                    "name": "user",
                    "description": "The user to ghost",
                    "type": SlashCommands.ApplicationCommandOptionType.USER,
                    "required": true
                },
                {
                    "name": "user",
                    "description": "The user to unghost",
                    "type": SlashCommands.ApplicationCommandOptionType.USER,
                    "required": true
                }
            ]   
        }

        const ghostCommandResult = await interaction.createApplicationCommand(ghostCommand).catch(error => {
            console.log(error);
        });
        console.log((ghostCommandResult as SlashCommands.ApplicationCommand).name);
        console.log((ghostCommandResult as SlashCommands.ApplicationCommand).description);
        

        return command.name;
    } catch (error) {
        return new Promise((resolve, reject) => {
            reject(error);
        });
    }
}
command.function = execute;
export default command as DiscordStuff.BotCommand;
