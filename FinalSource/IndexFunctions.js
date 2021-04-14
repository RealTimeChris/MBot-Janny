// IndexFunctions.ts - Module for my "Index functions".
// Apr 7, 2021
// Chris M.
// https://github.com/RealTimeChris
'use strict';
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const Discord = __importStar(require("discord.js"));
const worker_threads_1 = require("worker_threads");
const FoundationClasses_1 = __importDefault(require("./FoundationClasses"));
const GuildData_1 = __importDefault(require("./GuildData"));
const HelperFunctions_1 = __importDefault(require("./HelperFunctions"));
const CommandIndex_1 = __importDefault(require("./CommandIndex"));
var IndexFunctions;
(function (IndexFunctions) {
    function onHeartBeat(client, discordUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield HelperFunctions_1.default.sendInviteIfGuildIsActive(client, discordUser);
                yield HelperFunctions_1.default.updateAndSaveDiscordRecord(client, discordUser);
                yield discordUser.updateDataCacheAndSaveToFile(client);
                yield HelperFunctions_1.default.sendTimedMessagesIfTimeHasPassed(client, discordUser);
                HelperFunctions_1.default.purgeMessageChannels(client, discordUser);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    IndexFunctions.onHeartBeat = onHeartBeat;
    function onReady(client, discordUser, eventEmitter) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield discordUser.initializeInstance(client);
                yield client.user.setPresence({ status: 'online', activity: { name: '!help for commands!', type: 'STREAMING' } });
                eventEmitter.emit('HeartBeat');
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    IndexFunctions.onReady = onReady;
    function onMessage(msg, client, discordUser) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            if (client.users.resolve(msg.author.id) === null) {
                console.log('Non-found user! Better escape!');
                return;
            }
            if (msg.author.id === ((_a = client.user) === null || _a === void 0 ? void 0 : _a.id)) {
                console.log('Better not track our own messages!');
                return;
            }
            if (msg.content.startsWith(discordUser.userData.prefix)) {
                let command = '';
                let args = [];
                if (msg.content.indexOf(' =') === -1) {
                    command = msg.content.slice(discordUser.userData.prefix.length).split(/ +/, 3)[0].trim().toLowerCase();
                }
                else {
                    command = msg.content.slice(discordUser.userData.prefix.length).substring(0, msg.content.indexOf(' =')).trim().toLowerCase();
                    args = msg.content.slice(discordUser.userData.prefix.length).substring(msg.content.indexOf(' =') + 2).split(',');
                    for (let x = 0; x < args.length; x += 1) {
                        args[x] = args[x].trim();
                    }
                }
                if (!CommandIndex_1.default.has(command)) {
                    return;
                }
                try {
                    const commandData = new FoundationClasses_1.default.CommandData();
                    if (msg.channel.type !== 'dm' && msg.member !== null) {
                        yield commandData.initialize(client, msg.channel.id, msg.channel.type, null, msg.member.id, msg.guild.id);
                    }
                    else {
                        yield commandData.initialize(client, msg.channel.id, msg.channel.type, null, msg.author.id);
                    }
                    commandData.args = args;
                    if (msg.deletable) {
                        yield msg.delete();
                    }
                    if (command = 'ghost') {
                        const messageArgs = [commandData, discordUser];
                        console.log(JSON.stringify(commandData));
                        // server.js
                        // Large array
                        // Create a worker thread and pass to it the originalArray
                        const worker = new worker_threads_1.Worker('./commands/ghostworker.js', {});
                        worker.postMessage(messageArgs);
                        // Receive messages from the worker thread
                        worker.once('message', (commandReturnData) => {
                            console.log(`Completed Command: ${commandReturnData.commandName}`);
                        });
                    }
                    try {
                        console.log(`Command: '${command}' entered by user: ${msg.author.username}`);
                        const cmdReturnData = yield ((_b = CommandIndex_1.default.get(command)) === null || _b === void 0 ? void 0 : _b.function(commandData, discordUser));
                        console.log(`Completed Command: ${cmdReturnData.commandName}`);
                    }
                    catch (error) {
                        console.log(error);
                        const newMsg = yield msg.reply('There was an error trying to process that message!');
                        newMsg.delete({ timeout: 20000 });
                    }
                }
                catch (error) {
                    console.log(error);
                }
            }
            else if (msg.author.id !== ((_c = client.user) === null || _c === void 0 ? void 0 : _c.id)) {
                const command = 'message';
                if (!CommandIndex_1.default.has(command)) {
                    return;
                }
                try {
                    try {
                        const commandData = new FoundationClasses_1.default.CommandData();
                        if (msg.channel.type !== 'dm' && msg.member !== null) {
                            yield commandData.initialize(client, msg.channel.id, msg.channel.type, null, msg.member.id, msg.guild.id);
                        }
                        else {
                            yield commandData.initialize(client, msg.channel.id, msg.channel.type, null, msg.author.id);
                        }
                        console.log(`Standard message entered: ${msg.author.username}`);
                        const cmdReturnData = yield ((_d = CommandIndex_1.default.get(command)) === null || _d === void 0 ? void 0 : _d.function(msg, commandData));
                        console.log(`Completed Command: ${cmdReturnData.commandName}`);
                    }
                    catch (error) {
                        console.log(error);
                        const newMsg = yield msg.reply('There was an error trying to process that message!');
                        newMsg.delete({ timeout: 20000 });
                    }
                }
                catch (error) {
                    console.log(error);
                }
            }
        });
    }
    IndexFunctions.onMessage = onMessage;
    function onInteractionCreate(interaction, client, discordUser) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const { channel_id } = interaction;
            const channel = yield client.channels.fetch(channel_id);
            let id_full, guild_id_full, options_full, name_full;
            const commandData = new FoundationClasses_1.default.CommandData();
            if ((yield channel.type) === 'dm') {
                let { user: { id }, guild_id, data: { options, name } } = interaction;
                id_full = id;
                guild_id_full = guild_id;
                options_full = options;
                name_full = name;
                yield commandData.initialize(client, channel_id, channel.type, interaction, id_full);
            }
            else {
                let { member: { user: { id } }, guild_id, data: { options, name } } = interaction;
                id_full = id;
                guild_id_full = guild_id;
                options_full = options;
                name_full = name;
                yield commandData.initialize(client, channel_id, channel.type, interaction, id_full, guild_id_full);
            }
            const nameSolid = name_full;
            if (name_full === 'botinfo') {
                const name = 'janny';
                commandData.args[0] = name;
            }
            if (name_full === "deletedbentry") {
                const { value: value1 } = options_full[0];
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
                else if (name_full === 'add') {
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
                if (options_full[0].options !== undefined) {
                    const { value } = options_full[0].options[0];
                    commandData.args[0] = value;
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
                    const { value: value1 } = options_full[0];
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
                else {
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
                const inviteLink = options_full[0].value;
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
            yield client.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                    type: 5
                }
            });
            if (commandData.guildMember instanceof Discord.GuildMember) {
                console.log(`Command: '${nameSolid}' entered by user: ${commandData.guildMember.user.username}`);
            }
            else if (commandData.guildMember instanceof Discord.User) {
                console.log(`Command: '${nameSolid}' entered by user: ${commandData.guildMember.username}`);
            }
            const returnData = yield ((_a = CommandIndex_1.default.get(nameSolid)) === null || _a === void 0 ? void 0 : _a.function(commandData, discordUser));
            console.log(`Completed Command: ${returnData.commandName}`);
        });
    }
    IndexFunctions.onInteractionCreate = onInteractionCreate;
    function onChannelCreate(newChannel, client, discordUser) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (newChannel instanceof Discord.GuildChannel) {
                const guildData = new GuildData_1.default({ dataBase: discordUser.dataBase, id: newChannel.guild.id, memberCount: newChannel.guild.memberCount, name: newChannel.guild.name });
                yield guildData.getFromDataBase();
                if (guildData.verificationSystem.channelID !== '') {
                    const currentRolesArray = newChannel.guild.roles.cache.array();
                    let everyoneRoleID;
                    for (let x = 0; x < currentRolesArray.length; x += 1) {
                        if (currentRolesArray[x].name === '@everyone') {
                            everyoneRoleID = (_a = currentRolesArray[x]) === null || _a === void 0 ? void 0 : _a.id;
                        }
                    }
                    yield newChannel.updateOverwrite(everyoneRoleID, { VIEW_CHANNEL: false });
                }
            }
        });
    }
    IndexFunctions.onChannelCreate = onChannelCreate;
    function onMessageReactionAdd(messageReaction, user, client, discordUser) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const command = 'onmessagereactionadd';
            if (!CommandIndex_1.default.has(command)) {
                return;
            }
            try {
                console.log(`Command: '${command}' entered by system.`);
                const returnData = yield ((_a = CommandIndex_1.default.get(command)) === null || _a === void 0 ? void 0 : _a.function(messageReaction, client, user, discordUser));
                console.log(`Completed Command: ${returnData.commandName}`);
                return;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    IndexFunctions.onMessageReactionAdd = onMessageReactionAdd;
    function onGuildDete(guild, discordUser) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const command = 'onguilddelete';
            if (!CommandIndex_1.default.has(command)) {
                return;
            }
            try {
                console.log(`Command: '${command}' entered by system.`);
                const returnData = yield ((_a = CommandIndex_1.default.get(command)) === null || _a === void 0 ? void 0 : _a.function(guild, discordUser));
                console.log(`Completed Command: ${returnData.commandName}`);
                return;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    IndexFunctions.onGuildDete = onGuildDete;
    function onGuildBanAdd(guild, client, user, discordUser) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const guildData = new GuildData_1.default({ dataBase: discordUser.dataBase, id: guild.id, name: guild.name, memberCount: guild.memberCount });
            yield guildData.getFromDataBase();
            const command = 'onguildbanadd';
            if (!CommandIndex_1.default.has(command)) {
                return;
            }
            try {
                console.log(`Command: '${command}' entered by system.`);
                const returnData = yield ((_a = CommandIndex_1.default.get(command)) === null || _a === void 0 ? void 0 : _a.function(guild, client, user, discordUser));
                console.log(`Completed Command: ${returnData.commandName}`);
                return;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    IndexFunctions.onGuildBanAdd = onGuildBanAdd;
    function onGuildBanRemove(guild, client, user, discordUser) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const guildData = new GuildData_1.default({ dataBase: discordUser.dataBase, id: guild.id, name: guild.name, memberCount: guild.memberCount });
            yield guildData.getFromDataBase();
            const command = 'onguildbanremove';
            if (!CommandIndex_1.default.has(command)) {
                return;
            }
            try {
                console.log(`Command: '${command}' entered by system.`);
                const returnData = yield ((_a = CommandIndex_1.default.get(command)) === null || _a === void 0 ? void 0 : _a.function(client, client, guild, discordUser));
                console.log(`Completed Command: ${returnData.commandName}`);
                return;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    IndexFunctions.onGuildBanRemove = onGuildBanRemove;
    function onGuildMemberAdd(member, client, discordUser) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const guildData = new GuildData_1.default({ dataBase: discordUser.dataBase, id: member.guild.id, name: member.guild.name, memberCount: member.guild.memberCount });
            yield guildData.getFromDataBase();
            const command = 'onguildmemberadd';
            if (!CommandIndex_1.default.has(command)) {
                return;
            }
            try {
                console.log(`Command: '${command}' entered by system.`);
                const returnData = yield ((_a = CommandIndex_1.default.get(command)) === null || _a === void 0 ? void 0 : _a.function(client, member, discordUser));
                console.log(`Completed Command: ${returnData.commandName}`);
                return;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    IndexFunctions.onGuildMemberAdd = onGuildMemberAdd;
    function onGuildMemberRemove(member, client, discordUser) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const guildData = new GuildData_1.default({ dataBase: discordUser.dataBase, id: member.guild.id, name: member.guild.name, memberCount: member.guild.memberCount });
            yield guildData.getFromDataBase();
            const command = 'onguildmemberremove';
            if (!CommandIndex_1.default.has(command)) {
                return;
            }
            try {
                console.log(`Command: '${command}' entered by system.`);
                const returnData = yield ((_a = CommandIndex_1.default.get(command)) === null || _a === void 0 ? void 0 : _a.function(client, member, discordUser));
                console.log(`Completed Command: ${returnData.commandName}`);
                return;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    IndexFunctions.onGuildMemberRemove = onGuildMemberRemove;
    function onGuildMemberUpdate(oldGuildMember, newGuildMember, client, discordUser) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            if (oldGuildMember.displayName !== newGuildMember.displayName) {
                const guildData = new GuildData_1.default({ dataBase: discordUser.dataBase, id: oldGuildMember.guild.id, name: oldGuildMember.guild.name, memberCount: oldGuildMember.guild.memberCount });
                yield guildData.getFromDataBase();
                const command = 'ondisplaynamechange';
                if (!CommandIndex_1.default.has(command)) {
                    return;
                }
                try {
                    console.log(`Command: '${command}' entered by system.`);
                    const returnData = yield ((_a = CommandIndex_1.default.get(command)) === null || _a === void 0 ? void 0 : _a.function(client, oldGuildMember, newGuildMember, discordUser));
                    console.log(`Completed Command: ${returnData.commandName}`);
                    return;
                }
                catch (error) {
                    return;
                }
            }
            if (oldGuildMember.nickname !== newGuildMember.nickname) {
                const guildData = new GuildData_1.default({ dataBase: discordUser.dataBase, id: oldGuildMember.guild.id, name: oldGuildMember.guild.name, memberCount: oldGuildMember.guild.memberCount });
                yield guildData.getFromDataBase();
                const command = 'onnicknamechange';
                if (!CommandIndex_1.default.has(command)) {
                    return;
                }
                try {
                    console.log(`Command: '${command}' entered by system.`);
                    const returnData = yield ((_b = CommandIndex_1.default.get(command)) === null || _b === void 0 ? void 0 : _b.function(client, oldGuildMember, newGuildMember, discordUser));
                    console.log(`Completed Command: ${returnData.commandName}`);
                    return;
                }
                catch (error) {
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
                const guildData = new GuildData_1.default({ dataBase: discordUser.dataBase, id: newGuildMember.guild.id, name: newGuildMember.guild.name, memberCount: newGuildMember.guild.memberCount });
                yield guildData.getFromDataBase();
                const command = 'onroleaddorremove';
                if (!CommandIndex_1.default.has(command)) {
                    return;
                }
                try {
                    console.log(`Command: '${command}' entered by system.`);
                    const returnData = yield ((_c = CommandIndex_1.default.get(command)) === null || _c === void 0 ? void 0 : _c.function(client, oldGuildMemberRoleManager, newGuildMemberRoleManager, newGuildMember, collectionSizeDifference, discordUser));
                    console.log(`Completed Command: ${returnData.commandName}`);
                    return;
                }
                catch (error) {
                    console.log(error);
                }
            }
        });
    }
    IndexFunctions.onGuildMemberUpdate = onGuildMemberUpdate;
    function onInviteCreate(invite, client, discordUser) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const guildData = new GuildData_1.default({ dataBase: discordUser.dataBase, id: invite.guild.id, name: invite.guild.name, memberCount: invite.guild.memberCount });
            yield guildData.getFromDataBase();
            const command = 'oninvitecreate';
            if (!CommandIndex_1.default.has(command)) {
                return;
            }
            try {
                console.log(`Command: '${command}' entered by system.`);
                const returnData = yield ((_a = CommandIndex_1.default.get(command)) === null || _a === void 0 ? void 0 : _a.function(client, invite, discordUser));
                console.log(`Completed Command: ${returnData.commandName}`);
                return;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    IndexFunctions.onInviteCreate = onInviteCreate;
    function onMessageDelete(message, client, discordUser) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (message.channel.type !== 'dm') {
                const guildData = new GuildData_1.default({ dataBase: discordUser.dataBase, id: message.guild.id, name: message.guild.name, memberCount: message.guild.memberCount });
                const command = 'onmessagedelete';
                if (!CommandIndex_1.default.has(command)) {
                    return;
                }
                try {
                    console.log(`Command: '${command}' entered by system.`);
                    const returnData = yield ((_a = CommandIndex_1.default.get(command)) === null || _a === void 0 ? void 0 : _a.function(client, message, discordUser));
                    console.log(`Completed Command: ${returnData.commandName}`);
                    return;
                }
                catch (error) {
                    console.log(error);
                }
            }
        });
    }
    IndexFunctions.onMessageDelete = onMessageDelete;
    function onMessageDeleteBulk(collection, client, discordUser) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const guildData = new GuildData_1.default({ dataBase: discordUser.dataBase, id: collection.first().guild.id, name: collection.first().guild.name, memberCount: collection.first().guild.memberCount });
            yield guildData.getFromDataBase();
            const command = 'onmessagedeletebulk';
            if (!CommandIndex_1.default.has(command)) {
                return;
            }
            try {
                console.log(`Command: '${command}' entered by system.`);
                const returnData = yield ((_a = CommandIndex_1.default.get(command)) === null || _a === void 0 ? void 0 : _a.function(client, collection, discordUser));
                console.log(`Completed Command: ${returnData.commandName}`);
                return;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    IndexFunctions.onMessageDeleteBulk = onMessageDeleteBulk;
    function onRoleCreate(role, client, discordUser) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const guildData = new GuildData_1.default({ dataBase: discordUser.dataBase, id: role.guild.id, name: role.guild.name, memberCount: role.guild.memberCount });
            yield guildData.getFromDataBase();
            const command = 'onrolecreate';
            if (!CommandIndex_1.default.has(command)) {
                return;
            }
            try {
                console.log(`Command: '${command}' entered by system.`);
                const returnData = yield ((_a = CommandIndex_1.default.get(command)) === null || _a === void 0 ? void 0 : _a.function(client, role, discordUser));
                console.log(`Completed Command: ${returnData.commandName}`);
                return;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    IndexFunctions.onRoleCreate = onRoleCreate;
    function onRoleDelete(role, client, discordUser) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const guildData = new GuildData_1.default({ dataBase: discordUser.dataBase, id: role.guild.id, name: role.guild.name, memberCount: role.guild.memberCount });
            yield guildData.getFromDataBase();
            const command = 'onroledelete';
            if (!CommandIndex_1.default.has(command)) {
                return;
            }
            try {
                console.log(`Command: '${command}' entered by system.`);
                const returnData = yield ((_a = CommandIndex_1.default.get(command)) === null || _a === void 0 ? void 0 : _a.function(client, role, discordUser));
                console.log(`Completed Command: ${returnData.commandName}`);
                return;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    IndexFunctions.onRoleDelete = onRoleDelete;
    function onUserUpdate(oldUser, newUser, client, discordUser) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (oldUser.username !== newUser.username) {
                const guildArray = client.guilds.cache.array();
                for (let x = 0; x < guildArray.length; x += 1) {
                    const guildMembersArray = (yield guildArray[x].members.fetch()).array();
                    for (let y = 0; y < guildMembersArray.length; y += 1) {
                        if (guildMembersArray[y].id === oldUser.id) {
                            const guildData = new GuildData_1.default({ dataBase: discordUser.dataBase, id: guildArray[x].id, name: guildArray[x].name, memberCount: guildArray[x].memberCount });
                            yield guildData.getFromDataBase();
                            const command = 'onusernamechange';
                            if (!CommandIndex_1.default.has(command)) {
                                return;
                            }
                            try {
                                console.log(`Command: '${command}' entered by system.`);
                                const returnData = yield ((_a = CommandIndex_1.default.get(command)) === null || _a === void 0 ? void 0 : _a.function(client, oldUser, newUser, guildArray[x], discordUser));
                                console.log(`Completed Command: ${returnData.commandName}`);
                                break;
                            }
                            catch (error) {
                                console.log(error);
                                return;
                            }
                        }
                    }
                }
            }
        });
    }
    IndexFunctions.onUserUpdate = onUserUpdate;
})(IndexFunctions || (IndexFunctions = {}));
exports.default = IndexFunctions;
