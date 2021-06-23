// slashcommands.ts - Module for declaring my slash commands.
// Mar 28, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

import Discord = require('discord.js');
import DiscordInteractions from 'slash-commands';
import SlashCommands = require('slash-commands');
import FoundationClasses from '../FoundationClasses';
import DiscordUser from '../DiscordUser';
import GuildData from '../GuildData';
import HelperFunctions from '../HelperFunctions';

const command: FoundationClasses.BotCommand = {
    name: 'slashcommands',
    description: '!slashcommands',
    function: Function()
};

async function execute(commandData: FoundationClasses.CommandData, discordUser: DiscordUser): Promise<FoundationClasses.CommandReturnData> {
    try{
        const commandReturnData: FoundationClasses.CommandReturnData = {
            commandName: command.name
        };
        

        const interaction = new DiscordInteractions({applicationId: discordUser.userData.userID,
            publicKey: discordUser.userData.publicKey,
            authToken: discordUser.userData.botToken})

        const commands = await interaction.getApplicationCommands();
        for (let x = 0; x < commands.length; x += 1) {
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
                "name": "entrykey",
                "description": "The database key to prune from the database.",
                "type": SlashCommands.ApplicationCommandOptionType.STRING,
                "required": true,
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
                    "name": "display",
                    "type": SlashCommands.ApplicationCommandOptionType.SUB_COMMAND,
                    "description": "Display the server's currently ghosted members.",
                    "options": []
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

        for (let x = 0; x < commands.length; x += 1) {
            if ((commands[x] as SlashCommands.ApplicationCommand).name === 'listdbguilds') {
                const newInteraction = await interaction.deleteApplicationCommand(commands[x]?.id as string);
                console.log(newInteraction);
            }            
        }

        const listdbguilds = {
            "name": "listdbguilds",
            "description": "Lists all of the database server entries for which the bot is no longer a member.",
        }

        // Create Global Command
        await interaction.createApplicationCommand(listdbguilds).then(error => console.log(error)).catch(error => console.log(error.message));

        const purge = {
                "name": "purge",
                "description": "Bulk deletes up to 100 messages at a time, from a given channel.",
                "options":[{
                    "name": "messagecount",
                    "description": "How many message shall we delete?",
                    "type": SlashCommands.ApplicationCommandOptionType.INTEGER,
                    "required": true
                    }]
                }

        // Create Global Command
        await interaction.createApplicationCommand(purge).then(error => console.log(error)).catch(error => console.log(error.message));

        const managelogs = {
            "name": "managelogs",
            "description": "Lists the status of all of the available logging types.",
            "options": [{
                "name": "group1",
                "description": "The first group of logs.",
                "type": SlashCommands.ApplicationCommandOptionType.SUB_COMMAND,
                "options": [{
                    "name": "log",
                    "description": "Which logs are we going to modify?",
                    "type": SlashCommands.ApplicationCommandOptionType.STRING,
                    "required": true,
                    "choices": [] as any[]
            },
            {
                "name": "status",
                "description": "Enable or disable the currently selected logs?",
                "type": SlashCommands.ApplicationCommandOptionType.BOOLEAN,
                "required": true,
            }]},
            {
            "name": "group2",
                "description": "The second group of logs.",
                "type": SlashCommands.ApplicationCommandOptionType.SUB_COMMAND,
                "options": [{
                    "name": "log",
                    "description": "Which logs are we going to modify?",
                    "type": SlashCommands.ApplicationCommandOptionType.STRING,
                    "required": true,
                    "choices": [] as any[]
            },
            {
                "name": "status",
                "description": "Enable or disable the currently selected logs?",
                "type": SlashCommands.ApplicationCommandOptionType.BOOLEAN,
                "required": true,
            }]},
            {
                "name": "display",
                "description": "Display the current log statuses.",
                "type": SlashCommands.ApplicationCommandOptionType.SUB_COMMAND,
                "options":[]
            }
            ]
        }
        let guildData = new GuildData({dataBase: discordUser.dataBase, id: commandData.guild!.id, memberCount: commandData.guild!.memberCount, name: commandData.guild!.name});
        let choices1: any[] = [];
        for (let x = 0; x < guildData.logs.length; x += 1) {
            if (x < 10) {
                let choice = {name: '', value: ''};
                choice.name = (guildData.logs as FoundationClasses.Log[])[x]?.nameSmall as string;
                choice.value = (guildData.logs as FoundationClasses.Log[])[x]?.nameSmall as string;
                choices1.push(choice);    
            }            
        }
        managelogs.options[0]!.options[0]!.choices = choices1;

        let choices2: any[] = [];
        for (let x = 0; x < guildData.logs.length; x += 1) {
            if (x >= 10) {
                let choice = {name: '', value: ''};
                choice.name = (guildData.logs as FoundationClasses.Log[])[x]?.nameSmall as string;
                choice.value = (guildData.logs as FoundationClasses.Log[])[x]?.nameSmall as string;
                choices2.push(choice);
            }            
        }
        managelogs.options[1]!.options[0]!.choices = choices2;

        // Create Global Command
        await interaction.createApplicationCommand(managelogs).then(error => console.log(error)).catch(error => console.log(error.message));        

        const ping = {
            "name": "ping",
            "description": "A basic ping-pong command!",
            "options": []
        }
        
        // Create Global Command
        await interaction.createApplicationCommand(ping).then(error => console.log(error)).catch(error => console.log(error.message));

        const serverinfo = {
            "name": "serverinfo",
            "description": "Displays info about a given server.",
            "options":[{
                "name": "serverID",
                "description": "The server ID to examine.",
                "type": SlashCommands.ApplicationCommandOptionType.STRING,
                "required": false,
                "choices": []
                }]
            }

        // Create Global Command
        await interaction.createApplicationCommand(serverinfo).then(error => console.log(error)).catch(error => console.log(error.message));

        const setbordercolor = {
            "name":"setbordercolor",
            "description": "Sets the default border color for chat messages sent out by this bot.",
            "options":[
                {
                    "name":"redchannel",
                    "description": "Pick a value between 0 and 255 to set this color channel value.",
                    "type": SlashCommands.ApplicationCommandOptionType.INTEGER,
                    "required": true
                },
                {
                    "name":"greenchannel",
                    "description": "Pick a value between 0 and 255 to set this color channel value.",
                    "type": SlashCommands.ApplicationCommandOptionType.INTEGER,
                    "required": true
                },
                {
                    "name":"bluechannel",
                    "description": "Pick a value between 0 and 255 to set this color channel value.",
                    "type": SlashCommands.ApplicationCommandOptionType.INTEGER,
                    "required": true
                }
            ]
        }

        // Create Global Command
        await interaction.createApplicationCommand(setbordercolor).then(value => console.log(value)).catch(error => console.log(error.message));
  
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
                    "name": "display",
                    "type": SlashCommands.ApplicationCommandOptionType.SUB_COMMAND,
                    "description": "Displays the current list of default roles.",
                    "options":[]
                }
            ]
        }
        // Create Global Command
        await interaction.createApplicationCommand(setdefaultrole).then(error => console.log(error)).catch(error => console.log(error.message));

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
                    "name": "display",
                    "type": SlashCommands.ApplicationCommandOptionType.SUB_COMMAND,
                    "description": "Displays the current list of channels with purging enabled.",
                    "options":[]
                }
            ]
        }

        // Create Global Command
        await interaction.createApplicationCommand(setdeletionstatus).then(error => console.log(error)).catch(error => console.log(error.message));

        const setreplacementinvite = {
            "name": "setreplacementinvite",
            "description": "Sets a replacement invite to be send out to members upon the server's deletion.",
            "options": [{
                "name": "link",
                "description": "The replacement server invite link.",
                "type": SlashCommands.ApplicationCommandOptionType.STRING,
                "required": true
            }]
        }

        // Create Global Command
        await interaction.createApplicationCommand(setreplacementinvite).then(error => console.log(error)).catch(error => console.log(error.message));

        const setverificationsystem = {
            "name": "setverificationsystem",
            "description": "Sets a 'verification' channel for new users to have to verify their existence as a non-bot",
            "options":[{
                "name": "enable",
                "description": "Enable the verification system.",
                "type": SlashCommands.ApplicationCommandOptionType.SUB_COMMAND,
                "options":[{
                    "name": "message",
                    "description": "Which message to display as part of the verification?",
                    "type": SlashCommands.ApplicationCommandOptionType.STRING,
                    "required": true
                },
                {
                    "name": "emoji",
                    "description": 'Which emoji to use as the reaction target?',
                    "type": SlashCommands.ApplicationCommandOptionType.STRING,
                    "required": true
                }]
            },
            {
                "name": "disable",
                "description": "Disable the server's current verification system.",
                "type": SlashCommands.ApplicationCommandOptionType.SUB_COMMAND,
            },
            {
                "name": "display",
                "description": "Display the server's current verification system stats, if applicable.",
                "type": SlashCommands.ApplicationCommandOptionType.SUB_COMMAND,
            }
        ]
        }

        // Create Global Command
        await interaction.createApplicationCommand(setverificationsystem as SlashCommands.PartialApplicationCommand).then(error => console.log(error)).catch(error => console.log(error.message));

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

        const userinfo = {
            "name": "userinfo",
            "description": "Displays information about a selected user.",
            "options":[{
                "name": "user",
                "description": "Which user to display info about.",
                "type": SlashCommands.ApplicationCommandOptionType.USER,
                "required": true
            }]}

        // Create Global Command
        await interaction.createApplicationCommand(userinfo).then(error => console.log(error)).catch(error => console.log(error.message));

        const timedmessages = {
            "name": "timedmessages",
            "description": "Creates a message to be sent out at a chosen time interval.",
            "options":[{
                "name": "enable",
                "description": "Creates the timed message.",
                "type": SlashCommands.ApplicationCommandOptionType.SUB_COMMAND,
                "options":[{
                    "name": "name",
                    "description": "What would you like to name the timed message?",
                    "type": SlashCommands.ApplicationCommandOptionType.STRING,
                    "required": true
                },
                {
                    "name": "message",
                    "description": "Which message would you like to be send out?",
                    "type": SlashCommands.ApplicationCommandOptionType.STRING,
                    "required": true
                },
                {
                    "name": "interval",
                    "description": 'Which interval would you like it to be sent out in ms?',
                    "type": SlashCommands.ApplicationCommandOptionType.INTEGER,
                    "required": true
                }]
            },
            {
                "name": "disable",
                "description": "Disable the chosen timed message.",
                "type": SlashCommands.ApplicationCommandOptionType.SUB_COMMAND,
                "options":[{
                    "name": "name",
                    "description": "What is the name of the message you would like to delete?",
                    "type": SlashCommands.ApplicationCommandOptionType.STRING,
                    "required": true
                }]

            },
            {
                "name": "display",
                "description": "Display the server's current timed messages, if applicable.",
                "type": SlashCommands.ApplicationCommandOptionType.SUB_COMMAND,
            }
        ]
        }

        // Create Global Command
        await interaction.createApplicationCommand(timedmessages).then(error => console.log(error)).catch(error => console.log(error.message));

        const trackuser = {
            "name": "trackuser",
            "description": "Tracks a given user's messages within the selected chat channel.",
            "options":[{
                "name": "enable",
                "description": "Enables the user-tracking.",
                "type": SlashCommands.ApplicationCommandOptionType.SUB_COMMAND,
                "options":[{
                    "name": "name",
                    "description": "Which user would you like to track the messages of?",
                    "type": SlashCommands.ApplicationCommandOptionType.USER,
                    "required": true
                }]
            },
            {
                "name": "disable",
                "description": "Disable the tracking for the chosen user.",
                "type": SlashCommands.ApplicationCommandOptionType.SUB_COMMAND,
                "options":[{
                    "name": "name",
                    "description": "Which user would you like to disable tracking for?",
                    "type": SlashCommands.ApplicationCommandOptionType.USER,
                    "required": true
                }]

            },
            {
                "name": "display",
                "description": "Display the server's currently tracked users.",
                "type": SlashCommands.ApplicationCommandOptionType.SUB_COMMAND,
            }
        ]};

        // Create Global Command
        await interaction.createApplicationCommand(trackuser).then(error => console.log(error)).catch(error => console.log(error.message));
        */
       const globalCommands = await interaction.getApplicationCommands();

        let msgString = `------\n**Yes, IT'S COMPLETED! You have ${globalCommands.length} commands registered!**\n------\n`;
        let msgEmbeds: Discord.MessageEmbed[] = [];
        for (let x = 0; x < globalCommands.length; x += 1) {
            msgString += `__**Name**__: ${globalCommands[x]?.name} __**Description**__: ${globalCommands[x]?.description}\n`;
            if (msgString.length >= 1900 || x === globalCommands.length - 1) {
                let msgEmbed = new Discord.MessageEmbed();
                if (commandData.guildMember instanceof Discord.User) {
                    msgEmbed
                        .setAuthor(commandData.guildMember.username, commandData.guildMember.avatarURL()!)
                        .setColor([254, 254, 255])
                        .setTimestamp(Date() as unknown as Date)
                        .setTitle('__**Registered Commands:**__');
                }
                else {
                    msgEmbed
                        .setAuthor(commandData.guildMember!.user.username, commandData.guildMember!.user.avatarURL()!)
                        .setColor([254, 254, 254])
                        .setTimestamp(Date() as unknown as Date)
                        .setTitle('__**Registered Commands:**__');
                }
                
                msgString += `------`;
                let currentMsgEmbed = msgEmbed;
                currentMsgEmbed.setDescription(msgString);
                msgEmbeds.push(currentMsgEmbed);
                msgString = `------\n**Yes, IT'S COMPLETED! You have ${globalCommands.length} commands registered!**\n------\n`;
            }
        }
        for (let x = 0; x < msgEmbeds.length; x += 1) {
            msgEmbeds[x]?.setTitle(`__**Registered Commands, (${(x + 1).toString()} of ${msgEmbeds.length}): **__`);
            await HelperFunctions.sendMessageWithCorrectChannel(commandData, msgEmbeds[x]!);
        }

    return commandReturnData;
    }
    catch(error) {
        return new Promise((resolve, reject) => {
            reject(error);
        });
    }
}
command.function = execute;
export default command as FoundationClasses.BotCommand;
