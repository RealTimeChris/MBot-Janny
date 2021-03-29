// slashcommands.ts - Module for declaring my slash commands.
// Mar 28, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

import DiscordStuff = require('../DiscordStuff');
import {DiscordInteractions} from 'slash-commands';
import SlashCommands = require('slash-commands');

const command = new DiscordStuff.BotCommand();
command.name = 'slashcommands';
command.description = '!slashcommands';

async function execute(commandData: DiscordStuff.CommandData, discordUser: DiscordStuff.DiscordUser): Promise<DiscordStuff.CommandReturnData> {
    try{
        const commandReturnData = new DiscordStuff.CommandReturnData();
        commandReturnData.commandName = command.name;

        const interaction = new DiscordInteractions({applicationId: discordUser.userData.clientID,
            publicKey: discordUser.userData.publicKey,
            authToken: discordUser.userData.botToken})

        const commands = await interaction.getApplicationCommands();
        for (let x = 0; x < commands.length; x += 1){
            const newInteraction = await interaction.deleteApplicationCommand(commands[x]?.id as string);
            console.log(newInteraction);
        }

        const botinfo = {
            "name": "botinfo",
            "description": "Displays info about the current bot.",
            "options":[]
        }

        // Create Global Command
        await interaction.createApplicationCommand(botinfo).then(error => console.log(error)).catch(error => console.log(error.message));

        const ghost =  {
            "name": "ghost",
            "description": "Ghost or unghost a server member - muting and silencing them across the server.",
            "options":[
                {  
                "name": "add",
                "type": SlashCommands.ApplicationCommandOptionType.SUB_COMMAND,
                "description": "Applies the ghost status to a member.",
                "options": [{
                    "name": "user",
                    "type": SlashCommands.ApplicationCommandOptionType.USER,
                    "description": "The server member to ghost.",
                    "required": true
                },
                {
                    "name": "reason",
                    "type":SlashCommands.ApplicationCommandOptionType.STRING,
                    "description": "The reason for the ghosting application.",
                    "required": true
                }]},
                {  
                "name": "remove",
                "type": SlashCommands.ApplicationCommandOptionType.SUB_COMMAND,
                "description": "Removes the ghost status from a member.",
                "options": [{
                    "name": "user",
                    "type": SlashCommands.ApplicationCommandOptionType.USER,
                    "description": "The server member to unghost.",
                    "required": true
                }]},
                {
                    "name": "view",
                    "type": SlashCommands.ApplicationCommandOptionType.SUB_COMMAND,
                    "description": "Displays the currently ghosted server members, if applicable.",
                    "options":[{
                        "name": "display",
                        "type": SlashCommands.ApplicationCommandOptionType.BOOLEAN,
                        "description": "Displays the currently ghosted server members, if applicable.",
                        "required": true
                    }]
                }
            ]
        }        

        // Create Global Command
        await interaction.createApplicationCommand(ghost).then(error => console.log(error)).catch(error => console.log(error.message));

        const globalCommands = await interaction.getApplicationCommands();
        console.log(globalCommands.length);
        return commandReturnData;
}
    catch(error){
        return new Promise((resolve, reject) => {
            reject(error);
        });
    }
}
command.function = execute;
export default command as DiscordStuff.BotCommand;
