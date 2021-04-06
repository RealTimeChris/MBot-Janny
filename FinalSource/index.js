// index.js - The main entry point for my Discord Bot!
// Jan 28, 2021
// Chris M.s
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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Discord = require("discord.js");
var FoundationClasses = require("./FoundationClasses");
var DiscordUser = require("./DiscordUser");
var GuildData_1 = __importDefault(require("./GuildData"));
var commandindex_1 = __importDefault(require("./commandindex"));
var HelperFunctions_1 = __importDefault(require("./HelperFunctions"));
var config = require("../ToCompile/config.json");
var discordUser = new DiscordUser.DiscordUser();
var client = new Discord.Client();
client.ws.on('INTERACTION_CREATE', function (interaction) { return __awaiter(void 0, void 0, void 0, function () {
    var channel_id, channel, id_full, guild_id_full, options_full, name_full, commandData, id, guild_id, _a, options, name_1, id, guild_id, _b, options, name_2, nameSolid, value1, userID, reason, name_full_1, viewOrNot, value, logname, enableOrDisable, msgCountToPurge, value1, redChannelValue, greenChannelValue, blueChannelValue, name_full_2, role, role, quantity, name_full_3, inviteLink, message, emoji, msgName, msgName, msgContents, msgInterval, userID, userID, user, returnData;
    var _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                channel_id = interaction.channel_id;
                return [4 /*yield*/, client.channels.fetch(channel_id)];
            case 1:
                channel = _d.sent();
                commandData = new FoundationClasses.CommandData();
                return [4 /*yield*/, channel.type];
            case 2:
                if (!((_d.sent()) === 'dm')) return [3 /*break*/, 4];
                id = interaction.user.id, guild_id = interaction.guild_id, _a = interaction.data, options = _a.options, name_1 = _a.name;
                id_full = id;
                guild_id_full = guild_id;
                options_full = options;
                name_full = name_1;
                return [4 /*yield*/, commandData.initialize(client, channel_id, channel.type, interaction, id_full)];
            case 3:
                _d.sent();
                return [3 /*break*/, 6];
            case 4:
                id = interaction.member.user.id, guild_id = interaction.guild_id, _b = interaction.data, options = _b.options, name_2 = _b.name;
                id_full = id;
                guild_id_full = guild_id;
                options_full = options;
                name_full = name_2;
                return [4 /*yield*/, commandData.initialize(client, channel_id, channel.type, interaction, id_full, guild_id_full)];
            case 5:
                _d.sent();
                _d.label = 6;
            case 6:
                nameSolid = name_full;
                if (name_full === 'botinfo') {
                }
                if (name_full === "deletedbentry") {
                    value1 = options_full[0].value;
                    commandData.args[0] = 'janny';
                    commandData.args[1] = value1;
                }
                if (name_full === "displayguildsdata") {
                }
                if (name_full === 'ghost') {
                    userID = void 0;
                    reason = void 0;
                    name_full_1 = options_full[0].name;
                    if (name_full_1 === 'view') {
                        viewOrNot = options_full[0].options[0].value;
                        commandData.args[1] = '';
                        commandData.args[2] = '';
                        if (!viewOrNot) {
                            return [2 /*return*/];
                        }
                    }
                    else if (name_full_1 === 'add') {
                        userID = options_full[0].options[0].value;
                        reason = options_full[0].options[1].value;
                        commandData.args[0] = 'add';
                        commandData.args[1] = reason;
                        commandData.args[2] = userID;
                    }
                    else if (name_full_1 === 'remove') {
                        userID = options_full[0].options[0].value;
                        commandData.args[0] = 'remove';
                        commandData.args[1] = userID;
                    }
                }
                if (name_full === 'help') {
                    if (options_full[0].options !== undefined) {
                        value = options_full[0].options[0].value;
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
                        logname = options_full[0].options[0].value;
                        enableOrDisable = void 0;
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
                    msgCountToPurge = options_full[0].value;
                    commandData.args[0] = msgCountToPurge;
                }
                if (name_full === 'serverinfo') {
                    if (options_full !== undefined) {
                        value1 = options_full[0].value;
                        commandData.args[0] = value1;
                    }
                }
                if (name_full === 'setbordercolor') {
                    commandData.args[0] = 'janny';
                    redChannelValue = options_full[0].value;
                    greenChannelValue = options_full[1].value;
                    blueChannelValue = options_full[2].value;
                    commandData.args[1] = redChannelValue.toString();
                    commandData.args[2] = greenChannelValue.toString();
                    commandData.args[3] = blueChannelValue.toString();
                }
                if (name_full === 'setdefaultrole') {
                    name_full_2 = options_full[0].name;
                    if (name_full_2 === 'add') {
                        role = options_full[0].options[0].value;
                        commandData.args[0] = 'add';
                        commandData.args[1] = role;
                    }
                    else if (name_full_2 === 'remove') {
                        role = options_full[0].options[0].value;
                        commandData.args[0] = 'remove';
                        commandData.args[1] = role;
                    }
                    else {
                    }
                }
                if (name_full === 'setdeletionstatus') {
                    quantity = void 0;
                    if (options_full[0].options !== undefined) {
                        quantity = options_full[0].options[0].value;
                    }
                    name_full_3 = options_full[0].name;
                    if (name_full_3 == 'view') {
                    }
                    else if (name_full_3 === 'enable') {
                        commandData.args[0] = 'enable';
                        commandData.args[1] = quantity;
                    }
                    else if (name_full_3 === 'disable') {
                        commandData.args[0] = 'disable';
                    }
                }
                if (name_full === 'setreplacementinvite') {
                    inviteLink = options_full[0].value;
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
                        message = options_full[0].options[0].value;
                        emoji = options_full[0].options[1].value;
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
                        msgName = options_full[0].options[0].value;
                        commandData.args[0] = 'remove';
                        commandData.args[1] = msgName;
                    }
                    else if (name_full === 'enable') {
                        msgName = options_full[0].options[0].value;
                        msgContents = options_full[0].options[1].value;
                        msgInterval = options_full[0].options[2].value;
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
                        userID = options_full[0].options[0].value;
                        commandData.args[0] = 'add';
                        commandData.args[1] = userID;
                    }
                    else if (name_full === 'disable') {
                        userID = options_full[0].options[0].value;
                        commandData.args[0] = 'remove';
                        commandData.args[1] = userID;
                    }
                }
                if (name_full === 'userinfo') {
                    user = options_full[0].value;
                    commandData.args[0] = user;
                }
                return [4 /*yield*/, client.api.interactions(interaction.id, interaction.token).callback.post({
                        data: {
                            type: 5
                        }
                    })];
            case 7:
                _d.sent();
                if (commandData.guildMember instanceof Discord.GuildMember) {
                    console.log("Command: '" + nameSolid + "' entered by user: " + commandData.guildMember.user.username);
                }
                else if (commandData.guildMember instanceof Discord.User) {
                    console.log("Command: '" + nameSolid + "' entered by user: " + commandData.guildMember.username);
                }
                return [4 /*yield*/, ((_c = commandindex_1.default.commands.get(nameSolid)) === null || _c === void 0 ? void 0 : _c.function(commandData, discordUser))];
            case 8:
                returnData = _d.sent();
                console.log("Completed Command: " + returnData.commandName);
                return [2 /*return*/];
        }
    });
}); });
client.once('ready', function () { return __awaiter(void 0, void 0, void 0, function () {
    var error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, discordUser.initializeInstance(client)];
            case 1:
                _a.sent();
                return [4 /*yield*/, client.user.setPresence({ status: 'online', activity: { name: '!help for commands!', type: 'STREAMING' } })];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                console.log(error_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
client.on('message', function (msg) { return __awaiter(void 0, void 0, void 0, function () {
    var command, args, x, commandData, cmdReturnData, error_2, newMsg, error_3, command, commandData, cmdName, error_4, newMsg, error_5;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                if (msg.author.id === client.user.id) {
                    console.log('Better not track our own messages!');
                    return [2 /*return*/];
                }
                if (!msg.content.startsWith(discordUser.userData.prefix)) return [3 /*break*/, 18];
                command = '';
                args = [];
                if (msg.content.indexOf(' =') === -1) {
                    command = msg.content.slice(discordUser.userData.prefix.length).split(/ +/, 3)[0].trim().toLowerCase();
                }
                else {
                    command = msg.content.slice(discordUser.userData.prefix.length).substring(0, msg.content.indexOf(' =')).trim().toLowerCase();
                    args = msg.content.slice(discordUser.userData.prefix.length).substring(msg.content.indexOf(' =') + 2).split(',');
                    for (x = 0; x < args.length; x += 1) {
                        args[x] = args[x].trim();
                    }
                }
                if (!commandindex_1.default.commands.has(command)) {
                    return [2 /*return*/];
                }
                _c.label = 1;
            case 1:
                _c.trys.push([1, 16, , 17]);
                commandData = new FoundationClasses.CommandData();
                if (!(msg.channel.type !== 'dm' && msg.member !== null)) return [3 /*break*/, 3];
                return [4 /*yield*/, commandData.initialize(client, msg.channel.id, msg.channel.type, null, msg.member.id, msg.guild.id)];
            case 2:
                _c.sent();
                return [3 /*break*/, 5];
            case 3: return [4 /*yield*/, commandData.initialize(client, msg.channel.id, msg.channel.type, null, msg.author.id)];
            case 4:
                _c.sent();
                _c.label = 5;
            case 5:
                commandData.args = args;
                if (!msg.deletable) return [3 /*break*/, 7];
                return [4 /*yield*/, msg.delete()];
            case 6:
                _c.sent();
                _c.label = 7;
            case 7:
                _c.trys.push([7, 9, , 11]);
                console.log("Command: '" + command + "' entered by user: " + msg.author.username);
                return [4 /*yield*/, ((_a = commandindex_1.default.commands.get(command)) === null || _a === void 0 ? void 0 : _a.function(commandData, discordUser))];
            case 8:
                cmdReturnData = _c.sent();
                console.log("Completed Command: " + cmdReturnData.commandName);
                return [3 /*break*/, 11];
            case 9:
                error_2 = _c.sent();
                console.log(error_2);
                return [4 /*yield*/, msg.reply('There was an error trying to process that message!')];
            case 10:
                newMsg = _c.sent();
                newMsg.delete({ timeout: 20000 });
                return [3 /*break*/, 11];
            case 11: return [4 /*yield*/, HelperFunctions_1.default.sendInviteIfTimeHasPassedAndGuildIsActive(client, discordUser)];
            case 12:
                _c.sent();
                return [4 /*yield*/, HelperFunctions_1.default.updateAndSaveDiscordRecordIfTimeHasPassed(client, discordUser)];
            case 13:
                _c.sent();
                return [4 /*yield*/, discordUser.saveCacheIfTimeHasPassed(client)];
            case 14:
                _c.sent();
                return [4 /*yield*/, HelperFunctions_1.default.sendTimedMessagesIfTimeHasPassed(client, discordUser)];
            case 15:
                _c.sent();
                HelperFunctions_1.default.purgeMessageChannelsIfTimeHasPassed(client, discordUser).catch(function (error) {
                    console.log(error);
                });
                return [2 /*return*/];
            case 16:
                error_3 = _c.sent();
                console.log(error_3);
                return [3 /*break*/, 17];
            case 17: return [3 /*break*/, 34];
            case 18:
                if (!(msg.author.id !== client.user.id)) return [3 /*break*/, 34];
                command = 'message';
                if (!commandindex_1.default.commands.has(command)) {
                    return [2 /*return*/];
                }
                _c.label = 19;
            case 19:
                _c.trys.push([19, 33, , 34]);
                _c.label = 20;
            case 20:
                _c.trys.push([20, 26, , 28]);
                commandData = new FoundationClasses.CommandData();
                if (!(msg.channel.type !== 'dm')) return [3 /*break*/, 22];
                return [4 /*yield*/, commandData.initialize(client, msg.channel.id, msg.channel.type, null, msg.member.id, msg.guild.id)];
            case 21:
                _c.sent();
                return [3 /*break*/, 24];
            case 22: return [4 /*yield*/, commandData.initialize(client, msg.channel.id, msg.channel.type, null, msg.author.id)];
            case 23:
                _c.sent();
                _c.label = 24;
            case 24:
                console.log("Standard message entered: " + msg.author.username);
                return [4 /*yield*/, ((_b = commandindex_1.default.commands.get(command)) === null || _b === void 0 ? void 0 : _b.function(msg, commandData, discordUser))];
            case 25:
                cmdName = _c.sent();
                console.log("Completed Command: " + cmdName);
                return [3 /*break*/, 28];
            case 26:
                error_4 = _c.sent();
                console.log(error_4);
                return [4 /*yield*/, msg.reply('There was an error trying to process that message!')];
            case 27:
                newMsg = _c.sent();
                newMsg.delete({ timeout: 20000 });
                return [3 /*break*/, 28];
            case 28: return [4 /*yield*/, HelperFunctions_1.default.sendInviteIfTimeHasPassedAndGuildIsActive(client, discordUser)];
            case 29:
                _c.sent();
                return [4 /*yield*/, HelperFunctions_1.default.updateAndSaveDiscordRecordIfTimeHasPassed(client, discordUser)];
            case 30:
                _c.sent();
                return [4 /*yield*/, discordUser.saveCacheIfTimeHasPassed(client)];
            case 31:
                _c.sent();
                return [4 /*yield*/, HelperFunctions_1.default.sendTimedMessagesIfTimeHasPassed(client, discordUser)];
            case 32:
                _c.sent();
                HelperFunctions_1.default.purgeMessageChannelsIfTimeHasPassed(client, discordUser).catch(function (error) {
                    console.log(error);
                });
                return [2 /*return*/];
            case 33:
                error_5 = _c.sent();
                console.log(error_5);
                return [3 /*break*/, 34];
            case 34: return [2 /*return*/];
        }
    });
}); });
client.on('messageReactionAdd', function (messageReaction, user) { return __awaiter(void 0, void 0, void 0, function () {
    var command, cmdName, error_6;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                command = 'onmessagereactionadd';
                if (!commandindex_1.default.commands.has(command)) {
                    return [2 /*return*/];
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                console.log("Command: '" + command + "' entered by system.");
                return [4 /*yield*/, ((_a = commandindex_1.default.commands.get(command)) === null || _a === void 0 ? void 0 : _a.function(messageReaction, client, user, discordUser))];
            case 2:
                cmdName = _b.sent();
                console.log("Completed Command: " + cmdName);
                return [2 /*return*/];
            case 3:
                error_6 = _b.sent();
                console.log(error_6);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
client.on('guildDelete', function (guild) { return __awaiter(void 0, void 0, void 0, function () {
    var command, cmdName, error_7;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                command = 'onguilddelete';
                if (!commandindex_1.default.commands.has(command)) {
                    return [2 /*return*/];
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                console.log("Command: '" + command + "' entered by system.");
                return [4 /*yield*/, ((_a = commandindex_1.default.commands.get(command)) === null || _a === void 0 ? void 0 : _a.function(guild, discordUser))];
            case 2:
                cmdName = _b.sent();
                console.log("Completed Command: " + cmdName);
                return [2 /*return*/];
            case 3:
                error_7 = _b.sent();
                console.log(error_7);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
client.on('guildBanAdd', function (guild, user) { return __awaiter(void 0, void 0, void 0, function () {
    var guildData, x, command, cmdName, error_8;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                guildData = new GuildData_1.default({ dataBase: discordUser.dataBase, id: guild.id, name: guild.name, memberCount: guild.memberCount });
                return [4 /*yield*/, guildData.getFromDataBase()];
            case 1:
                _b.sent();
                for (x = 0; x < guildData.exposeDataValues().logs.length; x += 1) {
                    if (guildData.exposeDataValues().logs[x].nameSmall === 'guildbanadd') {
                        if (guildData.exposeDataValues().logs[x].enabled === false) {
                            return [2 /*return*/];
                        }
                    }
                }
                command = 'onguildbanadd';
                if (!commandindex_1.default.commands.has(command)) {
                    return [2 /*return*/];
                }
                _b.label = 2;
            case 2:
                _b.trys.push([2, 4, , 5]);
                console.log("Command: '" + command + "' entered by system.");
                return [4 /*yield*/, ((_a = commandindex_1.default.commands.get(command)) === null || _a === void 0 ? void 0 : _a.function(client, guild, user, discordUser))];
            case 3:
                cmdName = _b.sent();
                console.log("Completed Command: " + cmdName);
                return [2 /*return*/];
            case 4:
                error_8 = _b.sent();
                console.log(error_8);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
client.on('guildBanRemove', function (guild, user) { return __awaiter(void 0, void 0, void 0, function () {
    var guildData, x, command, cmdName, error_9;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                guildData = new GuildData_1.default({ dataBase: discordUser.dataBase, id: guild.id, name: guild.name, memberCount: guild.memberCount });
                return [4 /*yield*/, guildData.getFromDataBase()];
            case 1:
                _b.sent();
                for (x = 0; x < guildData.exposeDataValues().logs.length; x += 1) {
                    if (guildData.exposeDataValues().logs[x].nameSmall === 'guildbanremove') {
                        if (guildData.exposeDataValues().logs[x].enabled === false) {
                            return [2 /*return*/];
                        }
                    }
                }
                command = 'onguildbanremove';
                if (!commandindex_1.default.commands.has(command)) {
                    return [2 /*return*/];
                }
                _b.label = 2;
            case 2:
                _b.trys.push([2, 4, , 5]);
                console.log("Command: '" + command + "' entered by system.");
                return [4 /*yield*/, ((_a = commandindex_1.default.commands.get(command)) === null || _a === void 0 ? void 0 : _a.function(client, guild, user, discordUser))];
            case 3:
                cmdName = _b.sent();
                console.log("Completed Command: " + cmdName);
                return [2 /*return*/];
            case 4:
                error_9 = _b.sent();
                console.log(error_9);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
client.on('guildMemberAdd', function (member) { return __awaiter(void 0, void 0, void 0, function () {
    var guildData, x, command, cmdName, error_10;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                guildData = new GuildData_1.default({ dataBase: discordUser.dataBase, id: member.guild.id, name: member.guild.name, memberCount: member.guild.memberCount });
                return [4 /*yield*/, guildData.getFromDataBase()];
            case 1:
                _b.sent();
                for (x = 0; x < guildData.exposeDataValues().logs.length; x += 1) {
                    if (guildData.exposeDataValues().logs[x].nameSmall === 'guildmemberadd') {
                        if (guildData.exposeDataValues().logs[x].enabled === false) {
                            return [2 /*return*/];
                        }
                    }
                }
                command = 'onguildmemberadd';
                if (!commandindex_1.default.commands.has(command)) {
                    return [2 /*return*/];
                }
                _b.label = 2;
            case 2:
                _b.trys.push([2, 4, , 5]);
                console.log("Command: '" + command + "' entered by system.");
                return [4 /*yield*/, ((_a = commandindex_1.default.commands.get(command)) === null || _a === void 0 ? void 0 : _a.function(client, member, discordUser))];
            case 3:
                cmdName = _b.sent();
                console.log("Completed Command: " + cmdName);
                return [2 /*return*/];
            case 4:
                error_10 = _b.sent();
                console.log(error_10);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
client.on('guildMemberRemove', function (member) { return __awaiter(void 0, void 0, void 0, function () {
    var guildData, x, command, cmdName, error_11;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                guildData = new GuildData_1.default({ dataBase: discordUser.dataBase, id: member.guild.id, name: member.guild.name, memberCount: member.guild.memberCount });
                return [4 /*yield*/, guildData.getFromDataBase()];
            case 1:
                _b.sent();
                for (x = 0; x < guildData.exposeDataValues().logs.length; x += 1) {
                    if (guildData.exposeDataValues().logs[x].nameSmall === 'guildmemberremove') {
                        if (guildData.exposeDataValues().logs[x].enabled === false) {
                            return [2 /*return*/];
                        }
                    }
                }
                command = 'onguildmemberremove';
                if (!commandindex_1.default.commands.has(command)) {
                    return [2 /*return*/];
                }
                _b.label = 2;
            case 2:
                _b.trys.push([2, 4, , 5]);
                console.log("Command: '" + command + "' entered by system.");
                return [4 /*yield*/, ((_a = commandindex_1.default.commands.get(command)) === null || _a === void 0 ? void 0 : _a.function(client, member, discordUser))];
            case 3:
                cmdName = _b.sent();
                console.log("Completed Command: " + cmdName);
                return [2 /*return*/];
            case 4:
                error_11 = _b.sent();
                console.log(error_11);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
client.on('guildMemberUpdate', function (oldGuildMember, newGuildMember) { return __awaiter(void 0, void 0, void 0, function () {
    var guildData, x, command, cmdName, error_12, guildData, x, command, cmdName, error_13, oldGuildMemberRoleManager, newGuildMemberRoleManager, collectionSizeDifference, guildData, x, command, cmdName, error_14;
    var _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                if (!(oldGuildMember.displayName !== newGuildMember.displayName)) return [3 /*break*/, 5];
                guildData = new GuildData_1.default({ dataBase: discordUser.dataBase, id: oldGuildMember.guild.id, name: oldGuildMember.guild.name, memberCount: oldGuildMember.guild.memberCount });
                return [4 /*yield*/, guildData.getFromDataBase()];
            case 1:
                _d.sent();
                for (x = 0; x < guildData.exposeDataValues().logs.length; x += 1) {
                    if (guildData.exposeDataValues().logs[x].nameSmall === 'guildmemberupdate') {
                        if (guildData.exposeDataValues().logs[x].enabled === false) {
                            return [2 /*return*/];
                        }
                    }
                }
                command = 'ondisplaynamechange';
                if (!commandindex_1.default.commands.has(command)) {
                    return [2 /*return*/];
                }
                _d.label = 2;
            case 2:
                _d.trys.push([2, 4, , 5]);
                console.log("Command: '" + command + "' entered by system.");
                return [4 /*yield*/, ((_a = commandindex_1.default.commands.get(command)) === null || _a === void 0 ? void 0 : _a.function(client, oldGuildMember, newGuildMember, discordUser))];
            case 3:
                cmdName = _d.sent();
                console.log("Completed Command: " + cmdName);
                return [2 /*return*/];
            case 4:
                error_12 = _d.sent();
                return [2 /*return*/];
            case 5:
                if (!(oldGuildMember.nickname !== newGuildMember.nickname)) return [3 /*break*/, 10];
                guildData = new GuildData_1.default({ dataBase: discordUser.dataBase, id: oldGuildMember.guild.id, name: oldGuildMember.guild.name, memberCount: oldGuildMember.guild.memberCount });
                return [4 /*yield*/, guildData.getFromDataBase()];
            case 6:
                _d.sent();
                for (x = 0; x < guildData.exposeDataValues().logs.length; x += 1) {
                    if (guildData.exposeDataValues().logs[x].nameSmall === 'nicknamechange') {
                        if (guildData.exposeDataValues().logs[x].enabled === false) {
                            return [2 /*return*/];
                        }
                    }
                }
                command = 'onnicknamechange';
                if (!commandindex_1.default.commands.has(command)) {
                    return [2 /*return*/];
                }
                _d.label = 7;
            case 7:
                _d.trys.push([7, 9, , 10]);
                console.log("Command: '" + command + "' entered by system.");
                return [4 /*yield*/, ((_b = commandindex_1.default.commands.get(command)) === null || _b === void 0 ? void 0 : _b.function(client, oldGuildMember, newGuildMember, discordUser))];
            case 8:
                cmdName = _d.sent();
                console.log("Completed Command: " + cmdName);
                return [2 /*return*/];
            case 9:
                error_13 = _d.sent();
                return [2 /*return*/];
            case 10:
                oldGuildMemberRoleManager = new Discord.GuildMemberRoleManager(oldGuildMember);
                newGuildMemberRoleManager = new Discord.GuildMemberRoleManager(newGuildMember);
                oldGuildMemberRoleManager.cache.sort();
                newGuildMemberRoleManager.cache.sort();
                collectionSizeDifference = oldGuildMemberRoleManager
                    .cache.size - newGuildMemberRoleManager.cache.size;
                if (!(collectionSizeDifference !== 0)) return [3 /*break*/, 15];
                guildData = new GuildData_1.default({ dataBase: discordUser.dataBase, id: newGuildMember.guild.id, name: newGuildMember.guild.name, memberCount: newGuildMember.guild.memberCount });
                return [4 /*yield*/, guildData.getFromDataBase()];
            case 11:
                _d.sent();
                console.log(guildData.exposeDataValues().logs);
                for (x = 0; x < guildData.exposeDataValues().logs.length; x += 1) {
                    if (guildData.exposeDataValues().logs[x].nameSmall === 'roleaddorremove') {
                        if (guildData.exposeDataValues().logs[x].enabled === false) {
                            return [2 /*return*/];
                        }
                    }
                }
                command = 'onroleaddorremove';
                if (!commandindex_1.default.commands.has(command)) {
                    return [2 /*return*/];
                }
                _d.label = 12;
            case 12:
                _d.trys.push([12, 14, , 15]);
                console.log("Command: '" + command + "' entered by system.");
                return [4 /*yield*/, ((_c = commandindex_1.default.commands.get(command)) === null || _c === void 0 ? void 0 : _c.function(client, oldGuildMemberRoleManager, newGuildMemberRoleManager, newGuildMember, collectionSizeDifference, discordUser))];
            case 13:
                cmdName = _d.sent();
                console.log("Completed Command: " + cmdName);
                return [2 /*return*/];
            case 14:
                error_14 = _d.sent();
                console.log(error_14);
                return [3 /*break*/, 15];
            case 15: return [2 /*return*/];
        }
    });
}); });
client.on('inviteCreate', function (invite) { return __awaiter(void 0, void 0, void 0, function () {
    var guildData, x, command, cmdName, error_15;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                guildData = new GuildData_1.default({ dataBase: discordUser.dataBase, id: invite.guild.id, name: invite.guild.name, memberCount: invite.guild.memberCount });
                return [4 /*yield*/, guildData.getFromDataBase()];
            case 1:
                _b.sent();
                for (x = 0; x < guildData.exposeDataValues().logs.length; x += 1) {
                    if (guildData.exposeDataValues().logs[x].nameSmall === 'invitecreate') {
                        if (guildData.exposeDataValues().logs[x].enabled === false) {
                            return [2 /*return*/];
                        }
                    }
                }
                command = 'oninvitecreate';
                if (!commandindex_1.default.commands.has(command)) {
                    return [2 /*return*/];
                }
                _b.label = 2;
            case 2:
                _b.trys.push([2, 4, , 5]);
                console.log("Command: '" + command + "' entered by system.");
                return [4 /*yield*/, ((_a = commandindex_1.default.commands.get(command)) === null || _a === void 0 ? void 0 : _a.function(client, invite, discordUser))];
            case 3:
                cmdName = _b.sent();
                console.log("Completed Command: " + cmdName);
                return [2 /*return*/];
            case 4:
                error_15 = _b.sent();
                console.log(error_15);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
client.on('messageDelete', function (message) { return __awaiter(void 0, void 0, void 0, function () {
    var guildData, x, command, cmdName, error_16;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (!(message.channel.type !== 'dm')) return [3 /*break*/, 5];
                guildData = new GuildData_1.default({ dataBase: discordUser.dataBase, id: message.guild.id, name: message.guild.name, memberCount: message.guild.memberCount });
                return [4 /*yield*/, guildData.getFromDataBase()];
            case 1:
                _b.sent();
                for (x = 0; x < guildData.exposeDataValues().logs.length; x += 1) {
                    if (guildData.exposeDataValues().logs[x].nameSmall === 'messageDelete') {
                        if (guildData.exposeDataValues().logs[x].enabled === false) {
                            return [2 /*return*/];
                        }
                    }
                }
                command = 'onmessagedelete';
                if (!commandindex_1.default.commands.has(command)) {
                    return [2 /*return*/];
                }
                _b.label = 2;
            case 2:
                _b.trys.push([2, 4, , 5]);
                console.log("Command: '" + command + "' entered by system.");
                return [4 /*yield*/, ((_a = commandindex_1.default.commands.get(command)) === null || _a === void 0 ? void 0 : _a.function(client, message, discordUser))];
            case 3:
                cmdName = _b.sent();
                console.log("Completed Command: " + cmdName);
                return [2 /*return*/];
            case 4:
                error_16 = _b.sent();
                console.log(error_16);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
client.on('messageDeleteBulk', function (collection) { return __awaiter(void 0, void 0, void 0, function () {
    var guildData, x, command, cmdName, error_17;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                guildData = new GuildData_1.default({ dataBase: discordUser.dataBase, id: collection.first().guild.id, name: collection.first().guild.name, memberCount: collection.first().guild.memberCount });
                return [4 /*yield*/, guildData.getFromDataBase()];
            case 1:
                _b.sent();
                for (x = 0; x < guildData.exposeDataValues().logs.length; x += 1) {
                    if (guildData.exposeDataValues().logs[x].nameSmall === 'messageDeleteBulk') {
                        if (guildData.exposeDataValues().logs[x].enabled === false) {
                            return [2 /*return*/];
                        }
                    }
                }
                command = 'onmessagedeletebulk';
                if (!commandindex_1.default.commands.has(command)) {
                    return [2 /*return*/];
                }
                _b.label = 2;
            case 2:
                _b.trys.push([2, 4, , 5]);
                console.log("Command: '" + command + "' entered by system.");
                return [4 /*yield*/, ((_a = commandindex_1.default.commands.get(command)) === null || _a === void 0 ? void 0 : _a.function(client, collection, discordUser))];
            case 3:
                cmdName = _b.sent();
                console.log("Completed Command: " + cmdName);
                return [2 /*return*/];
            case 4:
                error_17 = _b.sent();
                console.log(error_17);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
client.on('roleCreate', function (role) { return __awaiter(void 0, void 0, void 0, function () {
    var guildData, x, command, cmdName, error_18;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                guildData = new GuildData_1.default({ dataBase: discordUser.dataBase, id: role.guild.id, name: role.guild.name, memberCount: role.guild.memberCount });
                return [4 /*yield*/, guildData.getFromDataBase()];
            case 1:
                _b.sent();
                for (x = 0; x < guildData.exposeDataValues().logs.length; x += 1) {
                    if (guildData.exposeDataValues().logs[x].nameSmall === 'rolecreate') {
                        if (guildData.exposeDataValues().logs[x].enabled === false) {
                            return [2 /*return*/];
                        }
                    }
                }
                command = 'onrolecreate';
                if (!commandindex_1.default.commands.has(command)) {
                    return [2 /*return*/];
                }
                _b.label = 2;
            case 2:
                _b.trys.push([2, 4, , 5]);
                console.log("Command: '" + command + "' entered by system.");
                return [4 /*yield*/, ((_a = commandindex_1.default.commands.get(command)) === null || _a === void 0 ? void 0 : _a.function(client, role, discordUser))];
            case 3:
                cmdName = _b.sent();
                console.log("Completed Command: " + cmdName);
                return [2 /*return*/];
            case 4:
                error_18 = _b.sent();
                console.log(error_18);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
client.on('roleDelete', function (role) { return __awaiter(void 0, void 0, void 0, function () {
    var guildData, x, command, cmdName, error_19;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                guildData = new GuildData_1.default({ dataBase: discordUser.dataBase, id: role.guild.id, name: role.guild.name, memberCount: role.guild.memberCount });
                return [4 /*yield*/, guildData.getFromDataBase()];
            case 1:
                _b.sent();
                for (x = 0; x < guildData.exposeDataValues().logs.length; x += 1) {
                    if (guildData.exposeDataValues().logs[x].nameSmall === 'roledelete') {
                        if (guildData.exposeDataValues().logs[x].enabled === false) {
                            return [2 /*return*/];
                        }
                    }
                }
                command = 'onroledelete';
                if (!commandindex_1.default.commands.has(command)) {
                    return [2 /*return*/];
                }
                _b.label = 2;
            case 2:
                _b.trys.push([2, 4, , 5]);
                console.log("Command: '" + command + "' entered by system.");
                return [4 /*yield*/, ((_a = commandindex_1.default.commands.get(command)) === null || _a === void 0 ? void 0 : _a.function(client, role, discordUser))];
            case 3:
                cmdName = _b.sent();
                console.log("Completed Command: " + cmdName);
                return [2 /*return*/];
            case 4:
                error_19 = _b.sent();
                console.log(error_19);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
client.on('userUpdate', function (oldUser, newUser) { return __awaiter(void 0, void 0, void 0, function () {
    var guildArray, x, guildMembersArray, y, guildData, z, command, cmdName, error_20;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (!(oldUser.username !== newUser.username)) return [3 /*break*/, 13];
                guildArray = client.guilds.cache.array();
                x = 0;
                _b.label = 1;
            case 1:
                if (!(x < guildArray.length)) return [3 /*break*/, 13];
                return [4 /*yield*/, guildArray[x].members.fetch()];
            case 2:
                guildMembersArray = (_b.sent()).array();
                y = 0;
                _b.label = 3;
            case 3:
                if (!(y < guildMembersArray.length)) return [3 /*break*/, 12];
                if (!(guildMembersArray[y].id === oldUser.id)) return [3 /*break*/, 11];
                guildData = new GuildData_1.default({ dataBase: discordUser.dataBase, id: guildArray[x].id, name: guildArray[x].name, memberCount: guildArray[x].memberCount });
                return [4 /*yield*/, guildData.getFromDataBase()];
            case 4:
                _b.sent();
                z = 0;
                _b.label = 5;
            case 5:
                if (!(z < guildData.exposeDataValues().logs.length)) return [3 /*break*/, 11];
                if (!(guildData.exposeDataValues().logs[z].nameSmall === 'userupdate')) return [3 /*break*/, 10];
                if (!(guildData.exposeDataValues().logs[z].enabled === false)) return [3 /*break*/, 6];
                return [2 /*return*/];
            case 6:
                command = 'onusernamechange';
                if (!commandindex_1.default.commands.has(command)) {
                    return [2 /*return*/];
                }
                _b.label = 7;
            case 7:
                _b.trys.push([7, 9, , 10]);
                console.log("Command: '" + command + "' entered by system.");
                return [4 /*yield*/, ((_a = commandindex_1.default.commands.get(command)) === null || _a === void 0 ? void 0 : _a.function(client, oldUser, newUser, guildArray[x], discordUser))];
            case 8:
                cmdName = _b.sent();
                console.log("Completed Command: " + cmdName);
                return [3 /*break*/, 11];
            case 9:
                error_20 = _b.sent();
                console.log(error_20);
                return [2 /*return*/];
            case 10:
                z += 1;
                return [3 /*break*/, 5];
            case 11:
                y += 1;
                return [3 /*break*/, 3];
            case 12:
                x += 1;
                return [3 /*break*/, 1];
            case 13: return [2 /*return*/];
        }
    });
}); });
client.login(config.botToken);
