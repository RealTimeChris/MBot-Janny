// test.ts - Module for my testing stuff.
// Feb 4, 2021
// Chris M.
// https://github.com/RealTimeChriss

'use strict';

import Discord = require('discord.js');
import DiscordStuff = require('../DiscordStuff.js');
import { DiscordInteractions } from 'slash-commands';
import SlashCommands = require('slash-commands');
const command = new DiscordStuff.BotCommand();
command.name = 'test';
command.description = '!test';

 export async function execute(message: Discord.Message, args: string[], discordUser: DiscordStuff.DiscordUser): Promise<string> {
    try {
        if (message.deletable) {
            //await message.delete();
        }       
        const interaction = new DiscordInteractions({applicationId: "814635740469919764",
            publicKey: "ea9a5395682ad831e63f8d3b60547cd7f7c98625d62484d04f3e0c7c44432606",
            authToken:"ODE0NjM1NzQwNDY5OTE5NzY0.YDgupw.pJ4IL3EseMEu9wS0l3RzlnwxlMQ"});

         const slashCommand =  {
            "name": "ghost",
            "description": "Ghost or unghost a server member.",
            "options":[

                {"name": "ghost",
                "type": SlashCommands.ApplicationCommandOptionType.SUB_COMMAND,
                "description": "Applies the ghost status to a member.",
                "options": [{
                    "name": "user",
                    "type": SlashCommands.ApplicationCommandOptionType.USER,
                    "description": "The server member to ghost.",
                    "required": true
                }

                ]},
                {"name": "unghost",
                "type": SlashCommands.ApplicationCommandOptionType.SUB_COMMAND,
                "description": "Removes the ghost status from a member.",
                "options": [{
                    "name": "user",
                    "type": SlashCommands.ApplicationCommandOptionType.USER,
                    "description": "The server member to unghost.",
                    "required": true
                }]
                }
            ]
        }

        const commands = await interaction.getApplicationCommands();
        for (let x = 0; x < commands.length; x += 1){
            const newInteraction = await interaction.deleteApplicationCommand(commands[x]?.id as string);
            console.log(newInteraction);
        }
        

        // Create Global Command
        const newInteraction = await interaction
        .createApplicationCommand(slashCommand).then(error => console.log(error)).catch(error => console.log(error.message));

        const globalCommands = await interaction
        .getApplicationCommands();
        console.log(globalCommands.length);
        console.log(globalCommands[0]?.description);
        console.log(globalCommands[0]?.options);
        return command.name;
    } catch (error) {
        return new Promise((resolve, reject) => {
            reject(error);
        });
    }
}
command.function = execute;
export default command as DiscordStuff.BotCommand;


