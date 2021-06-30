// IndexFunctions.ts - Module for my "Index functions".
// Apr 7, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

import Discord = require('discord.js');
import EventEmitter from 'events';
import FoundationClasses from './FoundationClasses';
import DiscordUser from './DiscordUser';
import GuildData from './GuildData';
import HelperFunctions from './HelperFunctions';
import botCommands from './CommandIndex';

module IndexFunctions{
    export async function onHeartBeat(client: Discord.Client, discordUser: DiscordUser) {
        try{
            //await HelperFunctions.sendInviteIfGuildIsActive(client, discordUser);
            await HelperFunctions.updateAndSaveDiscordRecord(client, discordUser);
            await discordUser.updateDataCacheAndSaveToFile(client);
            await HelperFunctions.sendTimedMessagesIfTimeHasPassed(client, discordUser);
            HelperFunctions.purgeMessageChannels(client, discordUser);
        }
        catch(error) {
            console.log(error);
        }
    }

    export async function onReady(client: Discord.Client, discordUser: DiscordUser, eventEmitter: EventEmitter) {
        try {
            await discordUser.initializeInstance(client);
            await (client.user as Discord.ClientUser).setPresence({ status: 'online', activity: { name: '!help for commands!', type: 'STREAMING' } });
            eventEmitter.emit('HeartBeat');
        } catch (error) {
            console.log(error);
        }
    }
    
    export async function onMessage(msg: Discord.Message, client: Discord.Client, discordUser: DiscordUser) {
        if (client.users.resolve(msg.author.id) === null) {
            console.log('Non-found user! Better escape!');
            return;
        }
        if (msg.author.id === client.user?.id) {
            console.log('Better not track our own messages!');
            return;
        }
        if (msg.content.startsWith(discordUser.userData.prefix)) {
            let command = '';
            let args: string[] = [];
            if (msg.content.indexOf(' =') === -1) {
                command = msg.content.slice(discordUser.userData.prefix.length).split(/ +/, 3)[0]!.trim().toLowerCase();
            } else {
                command = msg.content.slice(discordUser.userData.prefix.length).substring(0, msg.content.indexOf(' =')).trim().toLowerCase();
                args = msg.content.slice(discordUser.userData.prefix.length).substring(msg.content.indexOf(' =') + 2).split(',');
                for (let x = 0; x < args.length; x += 1) {
                    args[x] = args[x]!.trim();
                }
            }
    
            if (!botCommands.has(command)) {
                return;
            }
    
            try{
                const commandData = new FoundationClasses.CommandData();
                if (msg.channel.type !== 'dm' && msg.member !== null) {
                    await commandData.initialize(client, msg.channel.id, msg.channel.type, null, msg.member.id, msg.guild!.id);
                }
                else{
                    await commandData.initialize(client, msg.channel.id, msg.channel.type, null, msg.author.id);
                }
                commandData.args = args;
    
                if (msg.deletable) {
                    await msg.delete();
                }
    
                try {	
                    console.log(`Command: '${command}' entered by user: ${msg.author.username}`);
                    const cmdReturnData = await botCommands.get(command)?.function(commandData, discordUser) as FoundationClasses.CommandReturnData;
                    console.log(`Completed Command: ${cmdReturnData.commandName}`);
                } catch (error) {
                    console.log(error);
                    const newMsg = await msg.reply('There was an error trying to process that message!');
                    newMsg.delete({timeout: 20000});
                }
            }
            catch(error) {
                console.log(error);
            }
        } else if (msg.author.id !== client.user?.id) {
            const command = 'message';
            if (!botCommands.has(command)) {
                return;
            }
            try{
                try {
                    const commandData = new FoundationClasses.CommandData();
                    if (msg.channel.type !== 'dm' && msg.member !== null) {
                        await commandData.initialize(client, msg.channel.id, msg.channel.type, null, msg.member.id, msg.guild!.id);
                    }
                    else {
                        await commandData.initialize(client, msg.channel.id, msg.channel.type, null, msg.author.id);
                    }
    
                    console.log(`Standard message entered: ${msg.author.username}`);
                    const cmdReturnData = await botCommands.get(command)?.function(msg, commandData) as FoundationClasses.CommandReturnData;
                    console.log(`Completed Command: ${cmdReturnData.commandName}`);
                } catch (error) {
                    console.log(error);
                    const newMsg = await msg.reply('There was an error trying to process that message!');
                    newMsg.delete({timeout: 20000});
                }
            }
            catch(error) {
                console.log(error);
            }
        }
    }

    export async function onInteractionCreate(interaction: any, client: any, discordUser: DiscordUser) {
        const {channel_id} = interaction;
        const channel = await client.channels.fetch(channel_id);
        let id_full, guild_id_full, options_full, name_full;
        const commandData = new FoundationClasses.CommandData();
        if (await channel.type === 'dm') {
            let {user:{id}, guild_id, data:{options, name}} = interaction;
            id_full = id;
            guild_id_full = guild_id;
            options_full = options;
            name_full = name;
            await commandData.initialize(client, channel_id, channel.type, interaction, id_full);
        }
        else {
            let {member:{user:{id}}, guild_id, data:{options, name}} = interaction;
            id_full = id;
            guild_id_full = guild_id;
            options_full = options;
            name_full = name;
            await commandData.initialize(client, channel_id, channel.type, interaction, id_full, guild_id_full);
        }
        const nameSolid = name_full;
        if (name_full === 'botinfo') {
            const name = 'janny';
            commandData.args[0] = name;
        }
        if (name_full === "deletedbentry") {
            const {value:value1} = options_full[0];
            commandData.args[0] = 'janny';
            commandData.args[1] = value1;
        }
        if (name_full === "displayguildsdata") {
            const name = 'janny';
            commandData.args[0] = name;
        }
        if (name_full === 'ghost') {
            let userID;
            let reason;
            const name_full = options_full[0].name;
            if (name_full === 'view') {
                const viewOrNot = options_full[0].options[0].value;
                commandData.args[1] = '';
                commandData.args[2] = '';
                if (!viewOrNot) {
                    return;
                }
            }
            else if(name_full === 'add') {
                userID = options_full[0].options[0].value;
                reason = options_full[0].options[1].value;
                commandData.args[0] = 'add';
                commandData.args[1] = reason;
                commandData.args[2] = userID;
            }
            else if (name_full === 'remove') {
                userID = options_full[0].options[0].value;
                commandData.args[0] = 'remove';
                commandData.args[1] = userID;
            }
        }
        if (name_full === 'help') {
            if (options_full[0].options !==  undefined) {
                const {value} = options_full[0].options[0];
                commandData.args[0] ='janny';
                commandData.args[1] = value;
            }
        }
        if (name_full === 'jannyoptinos') {
            
        }
        if (name_full === 'listdbguilds') {
            commandData.args[0] = 'janny';
        }
        if (name_full === "managelogs") {
            name_full = options_full[0].name;
            if (name_full === 'display') {

            }
            else if (name_full = "group1" || "group2") {
                const logname = options_full[0].options[0].value;
                let enableOrDisable;
                if (options_full[0].options[1].value === true) {
                    enableOrDisable = 'enable';
                }
                else {
                    enableOrDisable = 'disable';
                }
                commandData.args[1] = logname;
                commandData.args[0] = enableOrDisable;
            }
        }
        if (name_full === 'ping') {
            
        }
        if (name_full === 'purge') {
            const msgCountToPurge = options_full[0].value;
            commandData.args[0] = msgCountToPurge;
        }
        if (name_full === 'serverinfo') {
            if (options_full !== undefined) {
                const {value:value1} = options_full[0];
                commandData.args[0] = value1;
            }		
        }
        if (name_full === 'setbordercolor') {
            commandData.args[0] = 'janny';
            const redChannelValue = options_full[0].value;
            const greenChannelValue = options_full[1].value;
            const blueChannelValue = options_full[2].value;
            commandData.args[1] = redChannelValue.toString();
            commandData.args[2] = greenChannelValue.toString();
            commandData.args[3] = blueChannelValue.toString();
        }
        if (name_full === 'setdefaultrole') {
            const name_full = options_full[0].name;
            if (name_full === 'add') {
                let role = options_full[0].options[0].value;
                commandData.args[0] = 'add';
                commandData.args[1] = role;
            }
            else if (name_full === 'remove') {
                let role = options_full[0].options[0].value;
                commandData.args[0] = 'remove';
                commandData.args[1] = role;
            }
            else{

            }
        }
        if (name_full === 'setdeletionstatus') {
            let quantity;
            if (options_full[0].options !== undefined) {
                quantity = options_full[0].options[0].value;
            }
            const name_full = options_full[0].name;
            if (name_full == 'view') {

            }
            else if (name_full === 'enable') {
                commandData.args[0] = 'enable';
                commandData.args[1] = quantity;
            }
            else if (name_full === 'disable') {
                commandData.args[0] = 'disable';
            }
        }
        if (name_full === 'setreplacementinvite') {
            const inviteLink = options_full[0].value
            commandData.args[0] = inviteLink;
        }
        if (name_full === 'setverificationsystem') {
            name_full = options_full[0].name;
            if (name_full === "display") {

            }
            else if (name_full === 'disable') {
                commandData.args[0] = 'disable';
            }
            else if (name_full === 'enable') {
                const message = options_full[0].options[0].value;
                const emoji = options_full[0].options[1].value;
                commandData.args[0] = 'enable';
                commandData.args[1] = message;
                commandData.args[2] = emoji;
            }
        }
        if (name_full === 'slashcommands') {
            
        }
        if (name_full === 'test') {

        }
        if (name_full === 'timedmessages') {
            name_full = options_full[0].name;
            if (name_full === 'display') {

            }
            else if (name_full === 'disable') {
                const msgName = options_full[0].options[0].value;
                commandData.args[0] = 'remove';
                commandData.args[1] = msgName;
            }
            else if (name_full === 'enable') {
                const msgName = options_full[0].options[0].value;
                const msgContents = options_full[0].options[1].value;
                const msgInterval = options_full[0].options[2].value;
                commandData.args[0] = 'add';
                commandData.args[1] = msgName;
                commandData.args[2] = msgInterval;
                commandData.args[3] = msgContents;
            }
        }
        if (name_full === 'trackuser') {
            name_full = options_full[0].name;
            if (name_full === "display") {

            }
            else if (name_full === 'enable') {
                const userID = options_full[0].options[0].value;
                commandData.args[0] = 'add';
                commandData.args[1] = userID;
            }
            else if (name_full === 'disable') {
                const userID = options_full[0].options[0].value;
                commandData.args[0] = 'remove';
                commandData.args[1] = userID;
            }
        }
        if (name_full === 'userinfo') {
            const user = options_full[0].value;
            commandData.args[0] = user;
        }
        await client.api.interactions(interaction.id, interaction.token).callback.post({
            data:{
                type: 5
            }
        });
        if (commandData.guildMember instanceof Discord.GuildMember) {
            console.log(`Command: '${nameSolid}' entered by user: ${commandData.guildMember.user.username}`);
        }
        else if (commandData.guildMember instanceof Discord.User) {
            console.log(`Command: '${nameSolid}' entered by user: ${commandData.guildMember.username}`);
        }
        const returnData = await botCommands.get(nameSolid)?.function(commandData, discordUser) as FoundationClasses.CommandReturnData;
        console.log(`Completed Command: ${returnData.commandName}`);
    }

    export async function onChannelCreate(newChannel:  Discord.Channel | Discord.DMChannel | Discord.GuildChannel, client: Discord.Client, discordUser: DiscordUser) {
        if (newChannel instanceof Discord.GuildChannel) {
            const guildData = new GuildData({dataBase: discordUser.dataBase, id: newChannel.guild.id, memberCount: newChannel.guild.memberCount, name: newChannel.guild.name});
            await guildData.getFromDataBase();
            if (guildData.verificationSystem.channelID !== '') {
                const currentRolesArray = newChannel.guild.roles.cache.array();
                let everyoneRoleID: string;
                for (let x = 0; x < currentRolesArray.length; x += 1) {
                    if (currentRolesArray[x]!.name === '@everyone') {
                        everyoneRoleID = currentRolesArray[x]?.id!;
                    }
                }
                await newChannel.updateOverwrite(everyoneRoleID!, {VIEW_CHANNEL: false});
            }
        }
    }

    export async function onMessageReactionAdd(messageReaction: Discord.MessageReaction, user: Discord.User, client: Discord.Client, discordUser: DiscordUser) {
        const command = 'onmessagereactionadd';

        if (!botCommands.has(command)) {
            return;
        }
        try {
            console.log(`Command: '${command}' entered by system.`);
            const returnData = await botCommands.get(command)?.function(messageReaction, client, user, discordUser) as FoundationClasses.CommandReturnData;
            console.log(`Completed Command: ${returnData.commandName}`);
            return;
        } catch (error) {
            console.log(error);
        }
    }

    export async function onGuildDete(guild: Discord.Guild, discordUser: DiscordUser) {
        const command = 'onguilddelete';

        if (!botCommands.has(command)) {
            return;
        }
        try {
            console.log(`Command: '${command}' entered by system.`);
            const returnData = await botCommands.get(command)?.function(guild, discordUser) as FoundationClasses.CommandReturnData;
            console.log(`Completed Command: ${returnData.commandName}`);
            return;
        } catch (error) {
            console.log(error);
        }
    }

    export async function onGuildBanAdd(guild: Discord.Guild, client: Discord.Client, user: Discord.User, discordUser: DiscordUser) {
        const guildData = new GuildData({dataBase: discordUser.dataBase, id: guild.id, name: guild.name, memberCount: guild.memberCount});
        await guildData.getFromDataBase();
        const command = 'onguildbanadd';
        if (!botCommands.has(command)) {
            return;
        }
        try {
            console.log(`Command: '${command}' entered by system.`);
            const returnData = await botCommands.get(command)?.function(guild, client, user, discordUser) as FoundationClasses.CommandReturnData;
            console.log(`Completed Command: ${returnData.commandName}`);
            return;
        } catch (error) {
            console.log(error);
        }
    }

    export async function onGuildBanRemove(guild: Discord.Guild, client: Discord.Client, user: Discord.User, discordUser: DiscordUser) {
        const guildData = new GuildData({dataBase: discordUser.dataBase, id: guild.id, name: guild.name, memberCount: guild.memberCount});
        await guildData.getFromDataBase();
        const command = 'onguildbanremove';

        if (!botCommands.has(command)) {
            return;
        }
        try {
            console.log(`Command: '${command}' entered by system.`);
            const returnData = await botCommands.get(command)?.function(client, client, guild, discordUser) as FoundationClasses.CommandReturnData;
            console.log(`Completed Command: ${returnData.commandName}`);
            return;
        } catch (error) {
            console.log(error);
        }
    }

    export async function onGuildMemberAdd(member: Discord.GuildMember, client: Discord.Client, discordUser: DiscordUser) {
        const guildData = new GuildData({dataBase: discordUser.dataBase, id: member.guild.id, name: member.guild.name, memberCount: member.guild.memberCount});
        await guildData.getFromDataBase();
        const command = 'onguildmemberadd';

        if (!botCommands.has(command)) {
            return;
        }
        try {
            console.log(`Command: '${command}' entered by system.`);
            const returnData = await botCommands.get(command)?.function(client, member, discordUser) as FoundationClasses.CommandReturnData;
            console.log(`Completed Command: ${returnData.commandName}`);
            return;
        } catch (error) {
            console.log(error);
        }
    }

    export async function onGuildMemberRemove(member: Discord.GuildMember, client: Discord.Client, discordUser: DiscordUser) {
        const guildData = new GuildData({dataBase: discordUser.dataBase, id: member.guild.id, name: member.guild.name, memberCount: member.guild.memberCount});
        await guildData.getFromDataBase();
        const command = 'onguildmemberremove';

        if (!botCommands.has(command)) {
            return;
        }
        try {
            console.log(`Command: '${command}' entered by system.`);
            const returnData = await botCommands.get(command)?.function(client, member, discordUser) as FoundationClasses.CommandReturnData;
            console.log(`Completed Command: ${returnData.commandName}`);
            return;
        } catch (error) {
            console.log(error);
        }
    }

    export async function onGuildMemberUpdate(oldGuildMember: Discord.GuildMember, newGuildMember: Discord.GuildMember, client: Discord.Client, discordUser: DiscordUser) {
        if (oldGuildMember.displayName !== newGuildMember.displayName) {
            const guildData = new GuildData({dataBase: discordUser.dataBase, id: oldGuildMember.guild.id, name: oldGuildMember.guild.name, memberCount: oldGuildMember.guild.memberCount});
            await guildData.getFromDataBase();
            const command = 'ondisplaynamechange';
                    
            if (!botCommands.has(command)) {
                return;
            }
            try {
                console.log(`Command: '${command}' entered by system.`);
                const returnData = await botCommands.get(command)?.function(client, oldGuildMember, newGuildMember, discordUser) as FoundationClasses.CommandReturnData;
                console.log(`Completed Command: ${returnData.commandName}`);
                return;
            } catch (error) {
                return;
            }
        }
        if (oldGuildMember.nickname !== newGuildMember.nickname) {
            const guildData = new GuildData({dataBase: discordUser.dataBase, id: oldGuildMember.guild.id, name: oldGuildMember.guild.name, memberCount: oldGuildMember.guild.memberCount});
            await guildData.getFromDataBase();
            const command = 'onnicknamechange';

            if (!botCommands.has(command)) {
                return;
            }
            try {
                console.log(`Command: '${command}' entered by system.`);
                const returnData = await botCommands.get(command)?.function(client, oldGuildMember, newGuildMember, discordUser) as FoundationClasses.CommandReturnData;
                console.log(`Completed Command: ${returnData.commandName}`);
                return;
            } catch (error) {
                return;
            }
        }
        const oldGuildMemberRoleManager = new Discord.GuildMemberRoleManager(oldGuildMember);
        const newGuildMemberRoleManager = new Discord.GuildMemberRoleManager(newGuildMember);
    
        oldGuildMemberRoleManager.cache.sort();
        newGuildMemberRoleManager.cache.sort();
    
        const collectionSizeDifference = oldGuildMemberRoleManager
            .cache.size - newGuildMemberRoleManager.cache.size;
    
        if (collectionSizeDifference !== 0) {
            const guildData = new GuildData({dataBase: discordUser.dataBase, id: newGuildMember.guild.id, name: newGuildMember.guild.name, memberCount: newGuildMember.guild.memberCount});
            await guildData.getFromDataBase();
            const command = 'onroleaddorremove';
    
            if (!botCommands.has(command)) {
                return;
            }
            try {
                console.log(`Command: '${command}' entered by system.`);
                const returnData = await botCommands.get(command)?.function(client, oldGuildMemberRoleManager, newGuildMemberRoleManager, newGuildMember, collectionSizeDifference, discordUser) as FoundationClasses.CommandReturnData;
                console.log(`Completed Command: ${returnData.commandName}`);
                return;
            } catch (error) {
                console.log(error);
            }
        }
    }

    export async function onInviteCreate(invite: Discord.Invite, client: Discord.Client, discordUser: DiscordUser) {
        const guildData = new GuildData({dataBase: discordUser.dataBase, id: invite.guild!.id, name: invite.guild!.name, memberCount: invite.guild!.memberCount});
        await guildData.getFromDataBase();
        const command = 'oninvitecreate';

        if (!botCommands.has(command)) {
            return;
        }
        try {
            console.log(`Command: '${command}' entered by system.`);
            const returnData = await botCommands.get(command)?.function(client, invite, discordUser) as FoundationClasses.CommandReturnData;
            console.log(`Completed Command: ${returnData.commandName}`);
            return;
        } catch (error) {
            console.log(error);
        }
    }

    export async function onMessageDelete(message: Discord.Message, client: Discord.Client, discordUser: DiscordUser) {
        if (message.channel.type !== 'dm') {
            const guildData = new GuildData({dataBase: discordUser.dataBase, id: message.guild!.id, name: message.guild!.name, memberCount: message.guild!.memberCount});
            const command = 'onmessagedelete';
        
            if (!botCommands.has(command)) {
                return;
            }
            try {
                console.log(`Command: '${command}' entered by system.`);
                const returnData = await botCommands.get(command)?.function(client, message, discordUser) as FoundationClasses.CommandReturnData;
                console.log(`Completed Command: ${returnData.commandName}`);
                return;
            } catch (error) {
                console.log(error);
            }
        }
    }

    export async function onMessageDeleteBulk(collection: Discord.Collection<string, Discord.Message>, client: Discord.Client, discordUser: DiscordUser) {
        const guildData = new GuildData({dataBase: discordUser.dataBase, id: collection.first()!.guild!.id, name: collection.first()!.guild!.name, memberCount: collection.first()!.guild!.memberCount});
        await guildData.getFromDataBase();
        const command = 'onmessagedeletebulk';

        if (!botCommands.has(command)) {
            return;
        }
        try {
            console.log(`Command: '${command}' entered by system.`);
            const returnData = await botCommands.get(command)?.function(client, collection, discordUser) as FoundationClasses.CommandReturnData;
            console.log(`Completed Command: ${returnData.commandName}`);
            return;
        } catch (error) {
            console.log(error);
        }
    }

    export async function onRoleCreate(role: Discord.Role, client: Discord.Client, discordUser: DiscordUser) {
        const guildData = new GuildData({dataBase: discordUser.dataBase, id: role.guild.id, name: role.guild.name, memberCount: role.guild.memberCount});
        await guildData.getFromDataBase();
        const command = 'onrolecreate';

        if (!botCommands.has(command)) {
            return;
        }
        try {
            console.log(`Command: '${command}' entered by system.`);
            const returnData = await botCommands.get(command)?.function(client, role, discordUser) as FoundationClasses.CommandReturnData;
            console.log(`Completed Command: ${returnData.commandName}`);
            return;
        } catch (error) {
            console.log(error);
        }
    }

    export async function onRoleDelete(role: Discord.Role, client: Discord.Client, discordUser: DiscordUser) {
        const guildData = new GuildData({dataBase: discordUser.dataBase, id: role.guild.id, name: role.guild.name, memberCount: role.guild.memberCount});
        await guildData.getFromDataBase();
        const command = 'onroledelete';

        if (!botCommands.has(command)) {
            return;
        }
        try {
            console.log(`Command: '${command}' entered by system.`);
            const returnData = await botCommands.get(command)?.function(client, role, discordUser) as FoundationClasses.CommandReturnData;
            console.log(`Completed Command: ${returnData.commandName}`);
            return;
        } catch (error) {
            console.log(error);
        }
    }

    export async function onUserUpdate(oldUser: Discord.User, newUser: Discord.User, client: Discord.Client, discordUser: DiscordUser) {
        if (oldUser.username !== newUser.username) {
            const guildArray = client.guilds.cache.array() as Discord.Guild[];
            for (let x = 0; x < guildArray.length; x += 1) {
                const guildMembersArray = (await guildArray[x]!.members.fetch()).array();
                for (let y = 0; y < guildMembersArray.length; y += 1) {
                    if (guildMembersArray[y]!.id === oldUser.id) {
                        const guildData = new GuildData({dataBase: discordUser.dataBase, id: guildArray[x]!.id, name: guildArray[x]!.name, memberCount: guildArray[x]!.memberCount});
                        await guildData.getFromDataBase();
                        const command = 'onusernamechange';

                        if (!botCommands.has(command)) {
                            return;
                        }
                        try {
                            console.log(`Command: '${command}' entered by system.`);
                            const returnData = await botCommands.get(command)?.function(client, oldUser, newUser, guildArray[x],  discordUser) as FoundationClasses.CommandReturnData;
                            console.log(`Completed Command: ${returnData.commandName}`);
                            break;
                        } catch (error) {
                            console.log(error);
                            return;
                        }
                    }
                }
            }
        }
    }
}
export default IndexFunctions;
