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
            //const newInteraction = await interaction.deleteApplicationCommand(commands[x]?.id as string);
            //console.log(newInteraction);
        }
/*
        const botinfo = {
            "name": "botinfo",
            "description": "Displays info about the current bot.",
            "options":[]
        }

        // Create Global Command
        await interaction.createApplicationCommand(botinfo).then(error => console.log(error)).catch(error => console.log(error.message));

        const deletedbentry = {
            "name": "deletedbentry",
            "description": "Used to delete database entries, based on their key.",
            "options":[{
                "name": "delete",
                "description": "Delete the entries with the provided key.",
                "type": SlashCommands.ApplicationCommandOptionType.SUB_COMMAND,
                "options":[{
                    "name": "botname",
                    "description": "Which bot to delete the database entries from.",
                    "type": SlashCommands.ApplicationCommandOptionType.STRING,
                    "required": true,
                    "choices": [
                        {
                            "name": "janny",
                            "value": "janny"
                        }]
                    },
                    {
                    "name": "entrykey",
                    "description": "The database key to prune from the database.",
                    "type": SlashCommands.ApplicationCommandOptionType.STRING,
                    "required": true,
                }]
            }]
        }

        // Create Global Command
        await interaction.createApplicationCommand(deletedbentry).then(error => console.log(error)).catch(error => console.log(error.message));

        const displayguildsdata = {
            "name": "displayguildsdata",
            "description": "Display info about the servers that the bot is in.",
            "options":[]                        
        }

        // Create Global Command
        await interaction.createApplicationCommand(displayguildsdata).then(error => console.log(error)).catch(error => console.log(error.message));

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

        const help = {
            "name": "help",
            "description": "Displays help about the bot's various commands.",
            "options":[{
                  
                    "name": "group1",
                    "description": "The first group of commands.",
                    "type": SlashCommands.ApplicationCommandOptionType.SUB_COMMAND,
                    "required": false,
                    "options":[{
                        "name": "commandname",
                        "description": " The name of the command, from group 1.",
                        "type": SlashCommands.ApplicationCommandOptionType.STRING,
                        "required": false,
                        "choices": [{
                            "name": "botinfo",
                            "value": "botinfo"
                                    },
                                    {
                                        "name":"deletedbentry",
                                        "value":"deletedbentry"
                                    },
                                    {
                                        "name": "displayguildsdata",
                                        "value": "displayguildsdata"
                                    },
                                    {
                                        "name":"ghost",
                                        "value": "ghost"
                                    },
                                    {
                                        "name":"help",
                                        "value":"help"
                                    },
                                    {
                                        "name":"jannyoptions",
                                        "value":"jannyoptions"
                                    },
                                    {
                                        "name":"listdbguilds",
                                        "value":"listdbguilds"
                                    },
                                    {
                                        "name":"managelogs",
                                        "value":"managelogs"
                                    },
                                    {
                                        "name":"ping",
                                        "value":"ping"
                                    },
                                    {
                                        "name":"purge",
                                        "value":"purge"
                                    }
                            ]
                        }]
                },
                {  
                    "name": "group2",
                    "description": "The second group of commands.",
                    "type": SlashCommands.ApplicationCommandOptionType.SUB_COMMAND,
                    "required": false,
                    "options":[{
                        "name": "commandname",
                        "description": " The name of the command, from group 2.",
                        "type": SlashCommands.ApplicationCommandOptionType.STRING,
                        "required": false,
                        "choices": [{
                                        "name":"serverinfo",
                                        "value":"serverinfo"
                                    },
                                    {
                                        "name":"setdefaultrole",
                                        "value":"setdefaultrole"
                                    },
                                    {
                                        "name":"setdeletionstatus",
                                        "value":"setdeletionstatus"
                                    },
                                    {
                                        "name":"setreplacementinvite",
                                        "value":"setreplacementinvite"
                                    },
                                    {
                                        "name":"setverificationsystem",
                                        "value":"setverificationsystem"
                                    },
                                    {
                                        "name":"slashcommands",
                                        "value":"slashcommands"
                                    },
                                    {
                                        "name":"test",
                                        "value":"test"
                                    },
                                    {
                                        "name":"timedmessages",
                                        "value":"timedmessages"
                                    },
                                    {
                                        "name":"trackuser",
                                        "value":"trackuser"
                                    },
                                    {
                                        "name":"userinfo",
                                        "value":"userinfo"
                                    }
                            ]
                        }]
                    }
            ]
        }
        
        // Create Global Command
        await interaction.createApplicationCommand(help).then(error => console.log(error)).catch(error => console.log(error.message));

        const jannyoptions = {
            "name": "jannyoptions",
            "description": "Lists all of the major settings for this bot.",
            "options": []
        }

        // Create Global Command
        await interaction.createApplicationCommand(jannyoptions).then(error => console.log(error)).catch(error => console.log(error.message));

        const listdbguilds = {
            "name": "listdbguilds",
            "description": "Lists all of the database server entries for which the bot is no longer a member.",
            "options":[{
                "name": "list",
                "description": "List the entries of the depracated servers.",
                "type": SlashCommands.ApplicationCommandOptionType.SUB_COMMAND,
                "options":[{
                    "name": "botname",
                    "description": "Which bot to list the entries from.",
                    "type": SlashCommands.ApplicationCommandOptionType.STRING,
                    "required": true,
                    "choices": [
                        {
                            "name": "janny",
                            "value": "janny"
                        }]                    
                    }]
                }]}

        // Create Global Command
        await interaction.createApplicationCommand(listdbguilds).then(error => console.log(error)).catch(error => console.log(error.message));

        const purge = {
                "name": "purge",
                "description": "Bulk deletes up to 100 messages at a time, from a given channel.",
                "options":[{
                    "name": "delete",
                    "description": "Delete the selected number of messages.",
                    "type": SlashCommands.ApplicationCommandOptionType.SUB_COMMAND,
                    "options":[{
                        "name": "messagecount",
                        "description": "How many message shall we delete?",
                        "type": SlashCommands.ApplicationCommandOptionType.INTEGER,
                        "required": true,
                        "choices": []
                        }]
                    }]}

        // Create Global Command
        await interaction.createApplicationCommand(purge).then(error => console.log(error)).catch(error => console.log(error.message));

        const managelogs = {
            "name": "managelogs",
            "description": "Lists the status of all of the available logging types.",
            "options": []
        }

        // Create Global Command
        await interaction.createApplicationCommand(managelogs).then(error => console.log(error)).catch(error => console.log(error.message));        

        const ping = {
            "name": "ping",
            "description": "A basic ping-pong command!",
            "options": []
        }
        
        // Create Global Command
        await interaction.createApplicationCommand(ping).then(error => console.log(error)).catch(error => console.log(error.message));
        
        const slashcommands = {
            "name": "slashcommands",
            "description": "Declares the slash commands to the Discord servers!",
            "options": []
        }

        // Create Global Command
        await interaction.createApplicationCommand(slashcommands).then(error => console.log(error)).catch(error => console.log(error.message));

        const test = {
            "name": "test",
            "description": "Testing module, for experimentation!",
            "options": []
        }

        // Create Global Command
        await interaction.createApplicationCommand(test).then(error => console.log(error)).catch(error => console.log(error.message));

        const serverinfo = {
            "name": "serverinfo",
            "description": "Displays info about a given server.",
            "options":[{
                "name": "server",
                "description": "Which server shall you list.",
                "type": SlashCommands.ApplicationCommandOptionType.SUB_COMMAND,
                "options":[{
                    "name": "serverID",
                    "description": "The server ID to examine.",
                    "type": SlashCommands.ApplicationCommandOptionType.STRING,
                    "required": false,
                    "choices": []
                    }]
                }]}

        // Create Global Command
        await interaction.createApplicationCommand(serverinfo).then(error => console.log(error)).catch(error => console.log(error.message));

        const setdefaultrole =  {
            "name": "setdefaultrole",
            "description": "Adds or removes a default role to the server, to be added upon someone joining.",
            "options":[
                {  
                "name": "add",
                "type": SlashCommands.ApplicationCommandOptionType.SUB_COMMAND,
                "description": "Adds a role to the list of defaults.",
                "options": [{
                    "name": "role",
                    "type": SlashCommands.ApplicationCommandOptionType.ROLE,
                    "description": "The server role to add.",
                    "required": true
                },]},
                {  
                "name": "remove",
                "type": SlashCommands.ApplicationCommandOptionType.SUB_COMMAND,
                "description": "Removes a role from the list of defaults.",
                "options": [{
                    "name": "role",
                    "type": SlashCommands.ApplicationCommandOptionType.ROLE,
                    "description": "The server member to unghost.",
                    "required": true
                }]},
                {
                    "name": "view",
                    "type": SlashCommands.ApplicationCommandOptionType.SUB_COMMAND,
                    "description": "Displays the current list of default roles.",
                    "options":[{
                        "name": "display",
                        "type": SlashCommands.ApplicationCommandOptionType.BOOLEAN,
                        "description": "Displays the currently defaulted server roles.",
                        "required": true
                    }]
                }
            ]
        }
        // Create Global Command
        await interaction.createApplicationCommand(setdefaultrole).then(error => console.log(error)).catch(error => console.log(error.message));
*/

        const setdeletionstatus =  {
            "name": "setdeletionstatus",
            "description": "Enables or disables message-purging in the current channel.",
            "options":[
                {
                    "name": "enable",
                    "type": SlashCommands.ApplicationCommandOptionType.SUB_COMMAND,
                    "description": "Enables purging in the current channel.",
                    "options": [{
                        "name": "quantity",
                        "type": SlashCommands.ApplicationCommandOptionType.INTEGER,
                        "description": "The quantity of messages in the channel to save.",
                        "required": false
                },]},
                {
                    "name": "disable",
                    "type": SlashCommands.ApplicationCommandOptionType.SUB_COMMAND,
                    "description": "Disables purging in the current channel.",
                    "options": []
                },
                {
                    "name": "view",
                    "type": SlashCommands.ApplicationCommandOptionType.SUB_COMMAND,
                    "description": "Displays the current list of channels with purging enabled.",
                    "options":[]
                }
            ]
        }

        // Create Global Command
        await interaction.createApplicationCommand(setdeletionstatus).then(error => console.log(error)).catch(error => console.log(error.message));


        const globalCommands = await interaction.getApplicationCommands();
        console.log(globalCommands.length);
        await DiscordStuff.sendMessageWithCorrectChannel(commandData, `Yes, IT'S COMPLETED!, You have ${globalCommands.length} commands registered!`);
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
