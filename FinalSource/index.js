// index.js - The main entry point for my Discord Bot!
// Jan 28, 2021
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
var DiscordStuff = require("./DiscordStuff");
var config = require("../ToCompile/config.json");
var commandindex_1 = __importDefault(require("./commandindex"));
var discordUser = new DiscordStuff.DiscordUser();
var client = new Discord.Client();
client.ws.on('INTERACTION_CREATE', function (interaction) { return __awaiter(void 0, void 0, void 0, function () {
    var id, guild_id, _a, options, name, channel_id, commandData, nameSolid, userID, reason, name_1, value, returnData;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                id = interaction.member.user.id, guild_id = interaction.guild_id, _a = interaction.data, options = _a.options, name = _a.name, channel_id = interaction.channel_id;
                commandData = new DiscordStuff.CommandData();
                return [4 /*yield*/, commandData.initialize(client, guild_id, id, channel_id)];
            case 1:
                _c.sent();
                nameSolid = name;
                if (name === 'botinfo') {
                }
                if (name === 'ghost') {
                    userID = void 0;
                    reason = void 0;
                    name_1 = options[0].name;
                    console.log(name_1);
                    if (name_1 === 'view') {
                        commandData.args[0] = '';
                        commandData.args[1] = '';
                        commandData.args[2] = '';
                    }
                    else if (name_1 === 'add') {
                        userID = options[0].options[0].value;
                        reason = options[0].options[1].value;
                        commandData.args[0] = 'add';
                        commandData.args[1] = reason;
                        commandData.args[2] = userID;
                    }
                    else if (name_1 === 'remove') {
                        userID = options[0].options[0].value;
                        commandData.args[0] = 'remove';
                        commandData.args[1] = userID;
                    }
                }
                if (name === 'help') {
                    value = options[0].options[0].value;
                    commandData.args[0] = value;
                }
                client.api.interactions(interaction.id, interaction.token).callback.post({
                    data: {
                        type: 5
                    }
                });
                console.log("Command: '" + nameSolid + "' entered by user: " + commandData.guildMember.displayName);
                return [4 /*yield*/, ((_b = commandindex_1.default.commands.get(nameSolid)) === null || _b === void 0 ? void 0 : _b.function(commandData, discordUser))];
            case 2:
                returnData = _c.sent();
                console.log("Completed Command: " + returnData.commandName);
                return [4 /*yield*/, new Discord.WebhookClient(client.user.id, interaction.token).send(returnData.returnMessage)];
            case 3:
                _c.sent();
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
    var command, args, x, commandData, cmdReturnData, error_2, command, cmdName, error_3;
    var _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                if (msg.member == null && !(msg.channel.type === 'dm')) {
                    console.log('HMMM!? NULL MEMBER?! GTFO!');
                    return [2 /*return*/];
                }
                if (msg.author.id === client.user.id) {
                    console.log('Better not track our own messages!');
                    return [2 /*return*/];
                }
                if (!msg.content.startsWith(discordUser.userData.prefix)) return [3 /*break*/, 12];
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
                _d.label = 1;
            case 1:
                _d.trys.push([1, 10, , 11]);
                commandData = new DiscordStuff.CommandData();
                return [4 /*yield*/, commandData.initialize(client, msg.guild.id, msg.member.id, msg.channel.id)];
            case 2:
                _d.sent();
                commandData.args = args;
                if (!msg.deletable) return [3 /*break*/, 4];
                return [4 /*yield*/, msg.delete()];
            case 3:
                _d.sent();
                _d.label = 4;
            case 4:
                console.log(commandData.guildMember);
                console.log(commandData.guild);
                console.log(commandData.textChannel);
                console.log("Command: '" + command + "' entered by user: " + msg.author.username);
                return [4 /*yield*/, ((_a = commandindex_1.default.commands.get(command)) === null || _a === void 0 ? void 0 : _a.function(commandData, discordUser))];
            case 5:
                cmdReturnData = _d.sent();
                console.log("Completed Command: " + cmdReturnData.commandName);
                return [4 /*yield*/, discordUser.sendInviteIfTimeHasPassedAndGuildIsActive(client)];
            case 6:
                _d.sent();
                return [4 /*yield*/, discordUser.updateAndSaveDiscordRecordIfTimeHasPassed(client)];
            case 7:
                _d.sent();
                return [4 /*yield*/, discordUser.saveCacheIfTimeHasPassed(client)];
            case 8:
                _d.sent();
                return [4 /*yield*/, discordUser.sendTimedMessagesIfTimeHasPassed(client)];
            case 9:
                _d.sent();
                discordUser.purgeMessageChannelsIfTimeHasPassed(client).catch(function (error) {
                    console.log(error);
                });
                if (cmdReturnData.returnMessage !== '') {
                    (_b = commandData.textChannel) === null || _b === void 0 ? void 0 : _b.send(cmdReturnData.returnMessage);
                }
                return [2 /*return*/];
            case 10:
                error_2 = _d.sent();
                console.log(error_2);
                msg.reply('There was an error trying to execute that command!');
                return [3 /*break*/, 11];
            case 11: return [3 /*break*/, 20];
            case 12:
                if (!(msg.author.id !== client.user.id)) return [3 /*break*/, 20];
                command = 'message';
                if (!commandindex_1.default.commands.has(command)) {
                    return [2 /*return*/];
                }
                _d.label = 13;
            case 13:
                _d.trys.push([13, 19, , 20]);
                console.log("Standard message entered: " + msg.author.username);
                return [4 /*yield*/, ((_c = commandindex_1.default.commands.get(command)) === null || _c === void 0 ? void 0 : _c.function(msg))];
            case 14:
                cmdName = _d.sent();
                console.log("Completed Command: " + cmdName);
                return [4 /*yield*/, discordUser.sendInviteIfTimeHasPassedAndGuildIsActive(client)];
            case 15:
                _d.sent();
                return [4 /*yield*/, discordUser.updateAndSaveDiscordRecordIfTimeHasPassed(client)];
            case 16:
                _d.sent();
                return [4 /*yield*/, discordUser.saveCacheIfTimeHasPassed(client)];
            case 17:
                _d.sent();
                return [4 /*yield*/, discordUser.sendTimedMessagesIfTimeHasPassed(client)];
            case 18:
                _d.sent();
                discordUser.purgeMessageChannelsIfTimeHasPassed(client).catch(function (error) {
                    console.log(error);
                });
                return [2 /*return*/];
            case 19:
                error_3 = _d.sent();
                console.log(error_3);
                msg.reply('There was an error trying to process that message!');
                return [3 /*break*/, 20];
            case 20: return [2 /*return*/];
        }
    });
}); });
client.on('messageReactionAdd', function (messageReaction, user) { return __awaiter(void 0, void 0, void 0, function () {
    var command, cmdName, error_4;
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
                error_4 = _b.sent();
                console.log(error_4);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
client.on('guildDelete', function (guild) { return __awaiter(void 0, void 0, void 0, function () {
    var command, cmdName, error_5;
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
                error_5 = _b.sent();
                console.log(error_5);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
client.on('guildBanAdd', function (guild, user) { return __awaiter(void 0, void 0, void 0, function () {
    var guildData, x, command, cmdName, error_6;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, discordUser.getGuildDataFromDB(guild)];
            case 1:
                guildData = _b.sent();
                for (x = 0; x < guildData.logs.length; x += 1) {
                    if (guildData.logs[x].nameSmall === 'guildbanadd') {
                        if (guildData.logs[x].enabled === false) {
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
                error_6 = _b.sent();
                console.log(error_6);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
client.on('guildBanRemove', function (guild, user) { return __awaiter(void 0, void 0, void 0, function () {
    var guildData, x, command, cmdName, error_7;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, discordUser.getGuildDataFromDB(guild)];
            case 1:
                guildData = _b.sent();
                for (x = 0; x < guildData.logs.length; x += 1) {
                    if (guildData.logs[x].nameSmall === 'guildbanremove') {
                        if (guildData.logs[x].enabled === false) {
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
                error_7 = _b.sent();
                console.log(error_7);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
client.on('guildMemberAdd', function (member) { return __awaiter(void 0, void 0, void 0, function () {
    var guildData, x, command, cmdName, error_8;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, discordUser.getGuildDataFromDB(member.guild)];
            case 1:
                guildData = _b.sent();
                for (x = 0; x < guildData.logs.length; x += 1) {
                    if (guildData.logs[x].nameSmall === 'guildmemberadd') {
                        if (guildData.logs[x].enabled === false) {
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
                error_8 = _b.sent();
                console.log(error_8);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
client.on('guildMemberRemove', function (member) { return __awaiter(void 0, void 0, void 0, function () {
    var guildData, x, command, cmdName, error_9;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, discordUser.getGuildDataFromDB(member.guild)];
            case 1:
                guildData = _b.sent();
                for (x = 0; x < guildData.logs.length; x += 1) {
                    if (guildData.logs[x].nameSmall === 'guildmemberremove') {
                        if (guildData.logs[x].enabled === false) {
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
                error_9 = _b.sent();
                console.log(error_9);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
client.on('guildMemberUpdate', function (oldGuildMember, newGuildMember) { return __awaiter(void 0, void 0, void 0, function () {
    var guildData, x, command, cmdName, error_10, guildData, x, command, cmdName, error_11, oldGuildMemberRoleManager, newGuildMemberRoleManager, collectionSizeDifference, guildData, x, command, cmdName, error_12;
    var _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                if (!(oldGuildMember.displayName !== newGuildMember.displayName)) return [3 /*break*/, 5];
                return [4 /*yield*/, discordUser.getGuildDataFromDB(oldGuildMember.guild)];
            case 1:
                guildData = _d.sent();
                for (x = 0; x < guildData.logs.length; x += 1) {
                    if (guildData.logs[x].nameSmall === 'displaynamechange') {
                        if (guildData.logs[x].enabled === false) {
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
                error_10 = _d.sent();
                return [2 /*return*/];
            case 5:
                if (!(oldGuildMember.nickname !== newGuildMember.nickname)) return [3 /*break*/, 10];
                return [4 /*yield*/, discordUser.getGuildDataFromDB(oldGuildMember.guild)];
            case 6:
                guildData = _d.sent();
                for (x = 0; x < guildData.logs.length; x += 1) {
                    if (guildData.logs[x].nameSmall === 'nicknamechange') {
                        if (guildData.logs[x].enabled === false) {
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
                error_11 = _d.sent();
                return [2 /*return*/];
            case 10:
                oldGuildMemberRoleManager = new Discord.GuildMemberRoleManager(oldGuildMember);
                newGuildMemberRoleManager = new Discord.GuildMemberRoleManager(newGuildMember);
                oldGuildMemberRoleManager.cache.sort();
                newGuildMemberRoleManager.cache.sort();
                collectionSizeDifference = oldGuildMemberRoleManager
                    .cache.size - newGuildMemberRoleManager.cache.size;
                if (!(collectionSizeDifference !== 0)) return [3 /*break*/, 15];
                return [4 /*yield*/, discordUser.getGuildDataFromDB(newGuildMember.guild)];
            case 11:
                guildData = _d.sent();
                for (x = 0; x < guildData.logs.length; x += 1) {
                    if (guildData.logs[x].nameSmall === 'roleaddorremove') {
                        if (guildData.logs[x].enabled === false) {
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
                error_12 = _d.sent();
                console.log(error_12);
                return [3 /*break*/, 15];
            case 15: return [2 /*return*/];
        }
    });
}); });
client.on('inviteCreate', function (invite) { return __awaiter(void 0, void 0, void 0, function () {
    var guildData, x, command, cmdName, error_13;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, discordUser.getGuildDataFromDB(invite.guild)];
            case 1:
                guildData = _b.sent();
                for (x = 0; x < guildData.logs.length; x += 1) {
                    if (guildData.logs[x].nameSmall === 'invitecreate') {
                        if (guildData.logs[x].enabled === false) {
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
                error_13 = _b.sent();
                console.log(error_13);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
client.on('messageDelete', function (message) { return __awaiter(void 0, void 0, void 0, function () {
    var guildData, x, command, cmdName, error_14;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, discordUser.getGuildDataFromDB(message.guild)];
            case 1:
                guildData = _b.sent();
                for (x = 0; x < guildData.logs.length; x += 1) {
                    if (guildData.logs[x].nameSmall === 'messagedelete') {
                        if (guildData.logs[x].enabled === false) {
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
                error_14 = _b.sent();
                console.log(error_14);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
client.on('messageDeleteBulk', function (collection) { return __awaiter(void 0, void 0, void 0, function () {
    var guildData, x, command, cmdName, error_15;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, discordUser.getGuildDataFromDB(collection.first().guild)];
            case 1:
                guildData = _b.sent();
                for (x = 0; x < guildData.logs.length; x += 1) {
                    if (guildData.logs[x].nameSmall === 'messagedeletebulk') {
                        if (guildData.logs[x].enabled === false) {
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
                error_15 = _b.sent();
                console.log(error_15);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
client.on('roleCreate', function (role) { return __awaiter(void 0, void 0, void 0, function () {
    var guildData, x, command, cmdName, error_16;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, discordUser.getGuildDataFromDB(role.guild)];
            case 1:
                guildData = _b.sent();
                for (x = 0; x < guildData.logs.length; x += 1) {
                    if (guildData.logs[x].nameSmall === 'rolecreate') {
                        if (guildData.logs[x].enabled === false) {
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
                error_16 = _b.sent();
                console.log(error_16);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
client.on('roleDelete', function (role) { return __awaiter(void 0, void 0, void 0, function () {
    var guildData, x, command, cmdName, error_17;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, discordUser.getGuildDataFromDB(role.guild)];
            case 1:
                guildData = _b.sent();
                for (x = 0; x < guildData.logs.length; x += 1) {
                    if (guildData.logs[x].nameSmall === 'roledelete') {
                        if (guildData.logs[x].enabled === false) {
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
                error_17 = _b.sent();
                console.log(error_17);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
client.on('userUpdate', function (oldUser, newUser) { return __awaiter(void 0, void 0, void 0, function () {
    var guildArray, x, guildMembersArray, y, guildData, z, command, cmdName, error_18;
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
                return [4 /*yield*/, discordUser.getGuildDataFromDB(guildArray[x])];
            case 4:
                guildData = _b.sent();
                z = 0;
                _b.label = 5;
            case 5:
                if (!(z < guildData.logs.length)) return [3 /*break*/, 11];
                if (!(guildData.logs[z].nameSmall === 'usernamechange')) return [3 /*break*/, 10];
                if (!(guildData.logs[z].enabled === false)) return [3 /*break*/, 6];
                return [3 /*break*/, 11];
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
                error_18 = _b.sent();
                console.log(error_18);
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
