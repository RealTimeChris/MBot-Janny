// setdefaultrole.ts - Module for my "set default role" command.
// Feb 24, 2021
// Chris M.
// https://github.com/RealTimeChris
'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Discord = require("discord.js");
const GuildData_1 = __importDefault(require("../GuildData"));
const HelperFunctions_1 = __importDefault(require("../HelperFunctions"));
const command = {
    name: 'setdefaultrole',
    description: 'Just enter !setdefaultrole to view the current list of default roles!\nEnter !setdefaultrole = ADD, ROLENAME, to add a '
        + 'role as a default for when someone new joins the server.\n!setdefaultrole = REMOVE, ROLENAME to remove a role from the list.',
    function: Function()
};
function execute(commandData, discordUser) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const commandReturnData = {
                commandName: command.name
            };
            const areWeInADM = yield HelperFunctions_1.default.areWeInADM(commandData);
            if (areWeInADM === true) {
                return commandReturnData;
            }
            const doWeHaveAdminPerms = yield HelperFunctions_1.default.doWeHaveAdminPermission(commandData, discordUser);
            if (doWeHaveAdminPerms === false) {
                return commandReturnData;
            }
            const guildData = new GuildData_1.default({ dataBase: discordUser.dataBase, id: commandData.guild.id, name: commandData.guild.name, memberCount: commandData.guild.memberCount });
            yield guildData.getFromDataBase();
            let roleMemberManager;
            let currentDiscordRole;
            let whatAreWeDoing = '';
            let roleMentionRegExp = /<@&\d{18}>/;
            let idRegExp = /\d{18}/;
            if (commandData.args[0] === undefined) {
                whatAreWeDoing = 'view';
            }
            else if (commandData.args[0] !== undefined && commandData.args[0].toLowerCase() !== 'add' && commandData.args[0].toLowerCase() !== 'remove') {
                const msgString = `------\n**Please, only enter either 'add' or 'remove' as a first argument! (!setdefaultrole = ADDorREMOVE, ROLENAME, or just !setdefaultrol)**\n------`;
                let msgEmbed = new Discord.MessageEmbed()
                    .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                    .setColor(guildData.borderColor)
                    .setDescription(msgString)
                    .setTimestamp(Date())
                    .setTitle('__**Missing Or Invalid Arguments:**__');
                let msg = yield HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed);
                if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                    msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                }
                yield msg.delete({ timeout: 20000 });
                return commandReturnData;
            }
            else if (commandData.args[1] === undefined) {
                const msgString = `------\n**Please, enter the name of a server role! (!setdefaultrole = ADDorREMOVE, ROLENAME, or just !setdefaultrol)**\n------`;
                let msgEmbed = new Discord.MessageEmbed()
                    .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                    .setColor(guildData.borderColor)
                    .setDescription(msgString)
                    .setTimestamp(Date())
                    .setTitle('__**Missing Or Invalid Arguments:**__');
                let msg = yield HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed);
                if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                    msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                }
                yield msg.delete({ timeout: 20000 });
                return commandReturnData;
            }
            else if (roleMentionRegExp.test(commandData.args[1])) {
                const roleID = commandData.args[1].match(idRegExp)[0];
                roleMemberManager = new Discord.RoleManager(commandData.guild);
                currentDiscordRole = (yield roleMemberManager.fetch(roleID));
                commandData.args[1] = currentDiscordRole.name;
            }
            else if (idRegExp.test(commandData.args[1])) {
                roleMemberManager = new Discord.RoleManager(commandData.guild);
                currentDiscordRole = (yield roleMemberManager.fetch(commandData.args[1]));
                commandData.args[1] = currentDiscordRole.name;
            }
            if (((_a = commandData.args[0]) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === 'add') {
                whatAreWeDoing = 'add';
            }
            else if (((_b = commandData.args[0]) === null || _b === void 0 ? void 0 : _b.toLowerCase()) === 'remove') {
                whatAreWeDoing = 'remove';
            }
            const roleName = commandData.args[1];
            const roleArray = commandData.guild.roles.cache.array().sort();
            for (let x = 0; x < guildData.defaultRoleIDs.length; x += 1) {
                const isItFoundReal = roleArray.map(role => {
                    let isItFound = false;
                    if (role.id === guildData.defaultRoleIDs[x]) {
                        isItFound = true;
                        return isItFound;
                    }
                    return isItFound;
                });
                let isItFoundFinal = false;
                for (let y = 0; y < isItFoundReal.length; y += 1) {
                    if (isItFoundReal[y] === true) {
                        isItFoundFinal = true;
                    }
                }
                if (isItFoundFinal === false) {
                    console.log('Removing a missing guild role from the list of defaults.');
                    guildData.defaultRoleIDs.splice(x, 1);
                    yield guildData.writeToDataBase();
                }
            }
            if (whatAreWeDoing === 'view') {
                let msgString = '';
                if (guildData.defaultRoleIDs.length > 0) {
                    msgString = '\n------\n';
                    guildData.defaultRoleIDs.map(roleID => {
                        roleArray.map(role => {
                            if (roleID === role.id) {
                                msgString += `<@&${role.id}>\n`;
                            }
                            return role;
                        });
                        return roleID;
                    });
                    msgString += '------';
                }
                else {
                    msgString = "------\n__You don't have any default roles!__\n------";
                }
                const messageEmbed = new Discord.MessageEmbed();
                messageEmbed
                    .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                    .setColor(guildData.borderColor)
                    .setTitle('__**Default Roles:**__')
                    .setTimestamp(Date())
                    .setDescription(msgString);
                yield HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, messageEmbed);
                return commandReturnData;
            }
            let currentRole = new Discord.Role(commandData.guildMember.client, {}, commandData.guildMember.client.guilds.resolve(guildData.id));
            let isItFound = false;
            roleArray.map(role => {
                if (role.name === roleName) {
                    currentRole = role;
                    isItFound = true;
                }
                return role;
            });
            if (isItFound === false) {
                const msgString = `------\n**Sorry, but the role you entered could not be found! Check spelling and case!**\n------`;
                let msgEmbed = new Discord.MessageEmbed()
                    .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                    .setColor(guildData.borderColor)
                    .setDescription(msgString)
                    .setTimestamp(Date())
                    .setTitle('__**Role Issue:**__');
                let msg = yield HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed);
                if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                    msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                }
                yield msg.delete({ timeout: 20000 });
                return commandReturnData;
            }
            if (whatAreWeDoing === 'add') {
                for (let x = 0; x < guildData.defaultRoleIDs.length; x += 1) {
                    if (currentRole.id === guildData.defaultRoleIDs[x]) {
                        const msgString = `------\n**Hey! It looks like you've already added that role!**\n------`;
                        let msgEmbed = new Discord.MessageEmbed()
                            .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                            .setColor(guildData.borderColor)
                            .setDescription(msgString)
                            .setTimestamp(Date())
                            .setTitle('__**Role Issue:**__');
                        let msg = yield HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed);
                        if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                            msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                        }
                        yield msg.delete({ timeout: 20000 });
                        return commandReturnData;
                    }
                }
                guildData.defaultRoleIDs.push(currentRole.id);
                yield guildData.writeToDataBase();
                const msgString = `\n------\n__**Role:**__ <@&${currentRole.id}>\n------`;
                const messageEmbed = new Discord.MessageEmbed();
                messageEmbed
                    .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                    .setColor(guildData.borderColor)
                    .setTitle('__**New Default Role Added:**__')
                    .setTimestamp(Date())
                    .setDescription(msgString);
                yield HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, messageEmbed);
                return commandReturnData;
            }
            if (whatAreWeDoing === 'remove') {
                isItFound = false;
                for (let x = 0; x < guildData.defaultRoleIDs.length; x += 1) {
                    if (currentRole.id === guildData.defaultRoleIDs[x]) {
                        guildData.defaultRoleIDs.splice(x, 1);
                        yield guildData.writeToDataBase();
                        isItFound = true;
                    }
                }
                if (isItFound === false) {
                    const msgString = `------\n**Sorry, but the role you entered could not be found! Check spelling and case!**\n------`;
                    let msgEmbed = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString)
                        .setTimestamp(Date())
                        .setTitle('__**Missing Or Invalid Arguments:**__');
                    let msg = yield HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed);
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    yield msg.delete({ timeout: 20000 });
                    return commandReturnData;
                }
                const msgString = `${'\n------\n__**Role**__: <@&'}${currentRole.id}>\n------`;
                const messageEmbed = new Discord.MessageEmbed();
                messageEmbed
                    .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                    .setColor(guildData.borderColor)
                    .setTitle('__**Default Role Removed:**__')
                    .setTimestamp(Date())
                    .setDescription(msgString);
                yield HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, messageEmbed);
                return commandReturnData;
            }
            return commandReturnData;
        }
        catch (error) {
            return new Promise((resolve, reject) => {
                reject(error);
            });
        }
    });
}
command.function = execute;
exports.default = command;
