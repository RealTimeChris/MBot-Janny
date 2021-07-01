// IndexFunctions.ts - Module for my "Index functions".
// Apr 7, 2021
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
var FoundationClasses_1 = __importDefault(require("./FoundationClasses"));
var GuildData_1 = __importDefault(require("./GuildData"));
var HelperFunctions_1 = __importDefault(require("./HelperFunctions"));
var CommandIndex_1 = __importDefault(require("./CommandIndex"));
var IndexFunctions;
(function (IndexFunctions) {
    function onHeartBeat(client, discordUser) {
        return __awaiter(this, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        //await HelperFunctions.sendInviteIfGuildIsActive(client, discordUser);
                        return [4 /*yield*/, HelperFunctions_1.default.updateAndSaveDiscordRecord(client, discordUser)];
                    case 1:
                        //await HelperFunctions.sendInviteIfGuildIsActive(client, discordUser);
                        _a.sent();
                        return [4 /*yield*/, discordUser.updateDataCacheAndSaveToFile(client)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, HelperFunctions_1.default.sendTimedMessagesIfTimeHasPassed(client, discordUser)];
                    case 3:
                        _a.sent();
                        HelperFunctions_1.default.purgeMessageChannels(client, discordUser);
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _a.sent();
                        console.log(error_1);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    }
    IndexFunctions.onHeartBeat = onHeartBeat;
    function onReady(client, discordUser, eventEmitter) {
        return __awaiter(this, void 0, void 0, function () {
            var error_2;
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
                        eventEmitter.emit('HeartBeat');
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _a.sent();
                        console.log(error_2);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    }
    IndexFunctions.onReady = onReady;
    function onMessage(msg, client, discordUser) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function () {
            var command, args, x, commandData, cmdReturnData, error_3, newMsg, error_4, command, commandData, cmdReturnData, error_5, newMsg, error_6;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        if (client.users.resolve(msg.author.id) === null) {
                            console.log('Non-found user! Better escape!');
                            return [2 /*return*/];
                        }
                        if (msg.author.id === ((_a = client.user) === null || _a === void 0 ? void 0 : _a.id)) {
                            console.log('Better not track our own messages!');
                            return [2 /*return*/];
                        }
                        if (!msg.content.startsWith(discordUser.userData.prefix)) return [3 /*break*/, 14];
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
                        if (!CommandIndex_1.default.has(command)) {
                            return [2 /*return*/];
                        }
                        _e.label = 1;
                    case 1:
                        _e.trys.push([1, 12, , 13]);
                        commandData = new FoundationClasses_1.default.CommandData();
                        if (!(msg.channel.type !== 'dm' && msg.member !== null)) return [3 /*break*/, 3];
                        return [4 /*yield*/, commandData.initialize(client, msg.channel.id, msg.channel.type, null, msg.member.id, msg.guild.id)];
                    case 2:
                        _e.sent();
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, commandData.initialize(client, msg.channel.id, msg.channel.type, null, msg.author.id)];
                    case 4:
                        _e.sent();
                        _e.label = 5;
                    case 5:
                        commandData.args = args;
                        if (!msg.deletable) return [3 /*break*/, 7];
                        return [4 /*yield*/, msg.delete()];
                    case 6:
                        _e.sent();
                        _e.label = 7;
                    case 7:
                        _e.trys.push([7, 9, , 11]);
                        console.log("Command: '" + command + "' entered by user: " + msg.author.username);
                        return [4 /*yield*/, ((_b = CommandIndex_1.default.get(command)) === null || _b === void 0 ? void 0 : _b.function(commandData, discordUser))];
                    case 8:
                        cmdReturnData = _e.sent();
                        console.log("Completed Command: " + cmdReturnData.commandName);
                        return [3 /*break*/, 11];
                    case 9:
                        error_3 = _e.sent();
                        console.log(error_3);
                        return [4 /*yield*/, msg.reply('There was an error trying to process that message!')];
                    case 10:
                        newMsg = _e.sent();
                        newMsg.delete({ timeout: 20000 });
                        return [3 /*break*/, 11];
                    case 11: return [3 /*break*/, 13];
                    case 12:
                        error_4 = _e.sent();
                        console.log(error_4);
                        return [3 /*break*/, 13];
                    case 13: return [3 /*break*/, 26];
                    case 14:
                        if (!(msg.author.id !== ((_c = client.user) === null || _c === void 0 ? void 0 : _c.id))) return [3 /*break*/, 26];
                        command = 'message';
                        if (!CommandIndex_1.default.has(command)) {
                            return [2 /*return*/];
                        }
                        _e.label = 15;
                    case 15:
                        _e.trys.push([15, 25, , 26]);
                        _e.label = 16;
                    case 16:
                        _e.trys.push([16, 22, , 24]);
                        commandData = new FoundationClasses_1.default.CommandData();
                        if (!(msg.channel.type !== 'dm' && msg.member !== null)) return [3 /*break*/, 18];
                        return [4 /*yield*/, commandData.initialize(client, msg.channel.id, msg.channel.type, null, msg.member.id, msg.guild.id)];
                    case 17:
                        _e.sent();
                        return [3 /*break*/, 20];
                    case 18: return [4 /*yield*/, commandData.initialize(client, msg.channel.id, msg.channel.type, null, msg.author.id)];
                    case 19:
                        _e.sent();
                        _e.label = 20;
                    case 20:
                        console.log("Standard message entered: " + msg.author.username);
                        return [4 /*yield*/, ((_d = CommandIndex_1.default.get(command)) === null || _d === void 0 ? void 0 : _d.function(msg, commandData))];
                    case 21:
                        cmdReturnData = _e.sent();
                        console.log("Completed Command: " + cmdReturnData.commandName);
                        return [3 /*break*/, 24];
                    case 22:
                        error_5 = _e.sent();
                        console.log(error_5);
                        return [4 /*yield*/, msg.reply('There was an error trying to process that message!')];
                    case 23:
                        newMsg = _e.sent();
                        newMsg.delete({ timeout: 20000 });
                        return [3 /*break*/, 24];
                    case 24: return [3 /*break*/, 26];
                    case 25:
                        error_6 = _e.sent();
                        console.log(error_6);
                        return [3 /*break*/, 26];
                    case 26: return [2 /*return*/];
                }
            });
        });
    }
    IndexFunctions.onMessage = onMessage;
    function onInteractionCreate(interaction, client, discordUser) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var channel_id, channel, id_full, guild_id_full, options_full, name_full, commandData, id, guild_id, _b, options, name_1, id, guild_id, _c, options, name_2, nameSolid, name_3, value1, name_4, userID, reason, name_full_1, viewOrNot, value, logname, enableOrDisable, msgCountToPurge, value1, redChannelValue, greenChannelValue, blueChannelValue, name_full_2, role, role, quantity, name_full_3, inviteLink, message, emoji, msgName, msgName, msgContents, msgInterval, userID, userID, user, returnData;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        channel_id = interaction.channel_id;
                        return [4 /*yield*/, client.channels.fetch(channel_id)];
                    case 1:
                        channel = _d.sent();
                        commandData = new FoundationClasses_1.default.CommandData();
                        return [4 /*yield*/, channel.type];
                    case 2:
                        if (!((_d.sent()) === 'dm')) return [3 /*break*/, 4];
                        id = interaction.user.id, guild_id = interaction.guild_id, _b = interaction.data, options = _b.options, name_1 = _b.name;
                        id_full = id;
                        guild_id_full = guild_id;
                        options_full = options;
                        name_full = name_1;
                        return [4 /*yield*/, commandData.initialize(client, channel_id, channel.type, interaction, id_full)];
                    case 3:
                        _d.sent();
                        return [3 /*break*/, 6];
                    case 4:
                        id = interaction.member.user.id, guild_id = interaction.guild_id, _c = interaction.data, options = _c.options, name_2 = _c.name;
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
                            name_3 = 'janny';
                            commandData.args[0] = name_3;
                        }
                        if (name_full === "deletedbentry") {
                            value1 = options_full[0].value;
                            commandData.args[0] = 'janny';
                            commandData.args[1] = value1;
                        }
                        if (name_full === "displayguildsdata") {
                            name_4 = 'janny';
                            commandData.args[0] = name_4;
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
                                commandData.args[0] = 'janny';
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
                        return [4 /*yield*/, ((_a = CommandIndex_1.default.get(nameSolid)) === null || _a === void 0 ? void 0 : _a.function(commandData, discordUser))];
                    case 8:
                        returnData = _d.sent();
                        console.log("Completed Command: " + returnData.commandName);
                        return [2 /*return*/];
                }
            });
        });
    }
    IndexFunctions.onInteractionCreate = onInteractionCreate;
    function onChannelCreate(newChannel, client, discordUser) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var guildData, currentRolesArray, everyoneRoleID, x;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(newChannel instanceof Discord.GuildChannel)) return [3 /*break*/, 3];
                        guildData = new GuildData_1.default({ dataBase: discordUser.dataBase, id: newChannel.guild.id, memberCount: newChannel.guild.memberCount, name: newChannel.guild.name });
                        return [4 /*yield*/, guildData.getFromDataBase()];
                    case 1:
                        _b.sent();
                        if (!(guildData.verificationSystem.channelID !== '')) return [3 /*break*/, 3];
                        currentRolesArray = newChannel.guild.roles.cache.array();
                        everyoneRoleID = void 0;
                        for (x = 0; x < currentRolesArray.length; x += 1) {
                            if (currentRolesArray[x].name === '@everyone') {
                                everyoneRoleID = (_a = currentRolesArray[x]) === null || _a === void 0 ? void 0 : _a.id;
                            }
                        }
                        return [4 /*yield*/, newChannel.updateOverwrite(everyoneRoleID, { VIEW_CHANNEL: false })];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    }
    IndexFunctions.onChannelCreate = onChannelCreate;
    function onMessageReactionAdd(messageReaction, user, client, discordUser) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var command, returnData, error_7;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        command = 'onmessagereactionadd';
                        if (!CommandIndex_1.default.has(command)) {
                            return [2 /*return*/];
                        }
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        console.log("Command: '" + command + "' entered by system.");
                        return [4 /*yield*/, ((_a = CommandIndex_1.default.get(command)) === null || _a === void 0 ? void 0 : _a.function(messageReaction, client, user, discordUser))];
                    case 2:
                        returnData = _b.sent();
                        console.log("Completed Command: " + returnData.commandName);
                        return [2 /*return*/];
                    case 3:
                        error_7 = _b.sent();
                        console.log(error_7);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    }
    IndexFunctions.onMessageReactionAdd = onMessageReactionAdd;
    function onGuildDete(guild, discordUser) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var command, returnData, error_8;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        command = 'onguilddelete';
                        if (!CommandIndex_1.default.has(command)) {
                            return [2 /*return*/];
                        }
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        console.log("Command: '" + command + "' entered by system.");
                        return [4 /*yield*/, ((_a = CommandIndex_1.default.get(command)) === null || _a === void 0 ? void 0 : _a.function(guild, discordUser))];
                    case 2:
                        returnData = _b.sent();
                        console.log("Completed Command: " + returnData.commandName);
                        return [2 /*return*/];
                    case 3:
                        error_8 = _b.sent();
                        console.log(error_8);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    }
    IndexFunctions.onGuildDete = onGuildDete;
    function onGuildBanAdd(guild, client, user, discordUser) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var guildData, command, returnData, error_9;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        guildData = new GuildData_1.default({ dataBase: discordUser.dataBase, id: guild.id, name: guild.name, memberCount: guild.memberCount });
                        return [4 /*yield*/, guildData.getFromDataBase()];
                    case 1:
                        _b.sent();
                        command = 'onguildbanadd';
                        if (!CommandIndex_1.default.has(command)) {
                            return [2 /*return*/];
                        }
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 4, , 5]);
                        console.log("Command: '" + command + "' entered by system.");
                        return [4 /*yield*/, ((_a = CommandIndex_1.default.get(command)) === null || _a === void 0 ? void 0 : _a.function(guild, client, user, discordUser))];
                    case 3:
                        returnData = _b.sent();
                        console.log("Completed Command: " + returnData.commandName);
                        return [2 /*return*/];
                    case 4:
                        error_9 = _b.sent();
                        console.log(error_9);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    }
    IndexFunctions.onGuildBanAdd = onGuildBanAdd;
    function onGuildBanRemove(guild, client, user, discordUser) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var guildData, command, returnData, error_10;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        guildData = new GuildData_1.default({ dataBase: discordUser.dataBase, id: guild.id, name: guild.name, memberCount: guild.memberCount });
                        return [4 /*yield*/, guildData.getFromDataBase()];
                    case 1:
                        _b.sent();
                        command = 'onguildbanremove';
                        if (!CommandIndex_1.default.has(command)) {
                            return [2 /*return*/];
                        }
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 4, , 5]);
                        console.log("Command: '" + command + "' entered by system.");
                        return [4 /*yield*/, ((_a = CommandIndex_1.default.get(command)) === null || _a === void 0 ? void 0 : _a.function(client, client, guild, discordUser))];
                    case 3:
                        returnData = _b.sent();
                        console.log("Completed Command: " + returnData.commandName);
                        return [2 /*return*/];
                    case 4:
                        error_10 = _b.sent();
                        console.log(error_10);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    }
    IndexFunctions.onGuildBanRemove = onGuildBanRemove;
    function onGuildMemberAdd(member, client, discordUser) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var guildData, command, returnData, error_11;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        guildData = new GuildData_1.default({ dataBase: discordUser.dataBase, id: member.guild.id, name: member.guild.name, memberCount: member.guild.memberCount });
                        return [4 /*yield*/, guildData.getFromDataBase()];
                    case 1:
                        _b.sent();
                        command = 'onguildmemberadd';
                        if (!CommandIndex_1.default.has(command)) {
                            return [2 /*return*/];
                        }
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 4, , 5]);
                        console.log("Command: '" + command + "' entered by system.");
                        return [4 /*yield*/, ((_a = CommandIndex_1.default.get(command)) === null || _a === void 0 ? void 0 : _a.function(client, member, discordUser))];
                    case 3:
                        returnData = _b.sent();
                        console.log("Completed Command: " + returnData.commandName);
                        return [2 /*return*/];
                    case 4:
                        error_11 = _b.sent();
                        console.log(error_11);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    }
    IndexFunctions.onGuildMemberAdd = onGuildMemberAdd;
    function onGuildMemberRemove(member, client, discordUser) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var guildData, command, returnData, error_12;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        guildData = new GuildData_1.default({ dataBase: discordUser.dataBase, id: member.guild.id, name: member.guild.name, memberCount: member.guild.memberCount });
                        return [4 /*yield*/, guildData.getFromDataBase()];
                    case 1:
                        _b.sent();
                        command = 'onguildmemberremove';
                        if (!CommandIndex_1.default.has(command)) {
                            return [2 /*return*/];
                        }
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 4, , 5]);
                        console.log("Command: '" + command + "' entered by system.");
                        return [4 /*yield*/, ((_a = CommandIndex_1.default.get(command)) === null || _a === void 0 ? void 0 : _a.function(client, member, discordUser))];
                    case 3:
                        returnData = _b.sent();
                        console.log("Completed Command: " + returnData.commandName);
                        return [2 /*return*/];
                    case 4:
                        error_12 = _b.sent();
                        console.log(error_12);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    }
    IndexFunctions.onGuildMemberRemove = onGuildMemberRemove;
    function onGuildMemberUpdate(oldGuildMember, newGuildMember, client, discordUser) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var guildData, command, returnData, error_13, guildData, command, returnData, error_14, oldGuildMemberRoleManager, newGuildMemberRoleManager, collectionSizeDifference, guildData, command, returnData, error_15;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (!(oldGuildMember.displayName !== newGuildMember.displayName)) return [3 /*break*/, 5];
                        guildData = new GuildData_1.default({ dataBase: discordUser.dataBase, id: oldGuildMember.guild.id, name: oldGuildMember.guild.name, memberCount: oldGuildMember.guild.memberCount });
                        return [4 /*yield*/, guildData.getFromDataBase()];
                    case 1:
                        _d.sent();
                        command = 'ondisplaynamechange';
                        if (!CommandIndex_1.default.has(command)) {
                            return [2 /*return*/];
                        }
                        _d.label = 2;
                    case 2:
                        _d.trys.push([2, 4, , 5]);
                        console.log("Command: '" + command + "' entered by system.");
                        return [4 /*yield*/, ((_a = CommandIndex_1.default.get(command)) === null || _a === void 0 ? void 0 : _a.function(client, oldGuildMember, newGuildMember, discordUser))];
                    case 3:
                        returnData = _d.sent();
                        console.log("Completed Command: " + returnData.commandName);
                        return [2 /*return*/];
                    case 4:
                        error_13 = _d.sent();
                        return [2 /*return*/];
                    case 5:
                        if (!(oldGuildMember.nickname !== newGuildMember.nickname)) return [3 /*break*/, 10];
                        guildData = new GuildData_1.default({ dataBase: discordUser.dataBase, id: oldGuildMember.guild.id, name: oldGuildMember.guild.name, memberCount: oldGuildMember.guild.memberCount });
                        return [4 /*yield*/, guildData.getFromDataBase()];
                    case 6:
                        _d.sent();
                        command = 'onnicknamechange';
                        if (!CommandIndex_1.default.has(command)) {
                            return [2 /*return*/];
                        }
                        _d.label = 7;
                    case 7:
                        _d.trys.push([7, 9, , 10]);
                        console.log("Command: '" + command + "' entered by system.");
                        return [4 /*yield*/, ((_b = CommandIndex_1.default.get(command)) === null || _b === void 0 ? void 0 : _b.function(client, oldGuildMember, newGuildMember, discordUser))];
                    case 8:
                        returnData = _d.sent();
                        console.log("Completed Command: " + returnData.commandName);
                        return [2 /*return*/];
                    case 9:
                        error_14 = _d.sent();
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
                        command = 'onroleaddorremove';
                        if (!CommandIndex_1.default.has(command)) {
                            return [2 /*return*/];
                        }
                        _d.label = 12;
                    case 12:
                        _d.trys.push([12, 14, , 15]);
                        console.log("Command: '" + command + "' entered by system.");
                        return [4 /*yield*/, ((_c = CommandIndex_1.default.get(command)) === null || _c === void 0 ? void 0 : _c.function(client, oldGuildMemberRoleManager, newGuildMemberRoleManager, newGuildMember, collectionSizeDifference, discordUser))];
                    case 13:
                        returnData = _d.sent();
                        console.log("Completed Command: " + returnData.commandName);
                        return [2 /*return*/];
                    case 14:
                        error_15 = _d.sent();
                        console.log(error_15);
                        return [3 /*break*/, 15];
                    case 15: return [2 /*return*/];
                }
            });
        });
    }
    IndexFunctions.onGuildMemberUpdate = onGuildMemberUpdate;
    function onInviteCreate(invite, client, discordUser) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var guildData, command, returnData, error_16;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        guildData = new GuildData_1.default({ dataBase: discordUser.dataBase, id: invite.guild.id, name: invite.guild.name, memberCount: invite.guild.memberCount });
                        return [4 /*yield*/, guildData.getFromDataBase()];
                    case 1:
                        _b.sent();
                        command = 'oninvitecreate';
                        if (!CommandIndex_1.default.has(command)) {
                            return [2 /*return*/];
                        }
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 4, , 5]);
                        console.log("Command: '" + command + "' entered by system.");
                        return [4 /*yield*/, ((_a = CommandIndex_1.default.get(command)) === null || _a === void 0 ? void 0 : _a.function(client, invite, discordUser))];
                    case 3:
                        returnData = _b.sent();
                        console.log("Completed Command: " + returnData.commandName);
                        return [2 /*return*/];
                    case 4:
                        error_16 = _b.sent();
                        console.log(error_16);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    }
    IndexFunctions.onInviteCreate = onInviteCreate;
    function onMessageDelete(message, client, discordUser) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var guildData, command, returnData, error_17;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(message.channel.type !== 'dm')) return [3 /*break*/, 4];
                        guildData = new GuildData_1.default({ dataBase: discordUser.dataBase, id: message.guild.id, name: message.guild.name, memberCount: message.guild.memberCount });
                        command = 'onmessagedelete';
                        if (!CommandIndex_1.default.has(command)) {
                            return [2 /*return*/];
                        }
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        console.log("Command: '" + command + "' entered by system.");
                        return [4 /*yield*/, ((_a = CommandIndex_1.default.get(command)) === null || _a === void 0 ? void 0 : _a.function(client, message, discordUser))];
                    case 2:
                        returnData = _b.sent();
                        console.log("Completed Command: " + returnData.commandName);
                        return [2 /*return*/];
                    case 3:
                        error_17 = _b.sent();
                        console.log(error_17);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    }
    IndexFunctions.onMessageDelete = onMessageDelete;
    function onMessageDeleteBulk(collection, client, discordUser) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var guildData, command, returnData, error_18;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        guildData = new GuildData_1.default({ dataBase: discordUser.dataBase, id: collection.first().guild.id, name: collection.first().guild.name, memberCount: collection.first().guild.memberCount });
                        return [4 /*yield*/, guildData.getFromDataBase()];
                    case 1:
                        _b.sent();
                        command = 'onmessagedeletebulk';
                        if (!CommandIndex_1.default.has(command)) {
                            return [2 /*return*/];
                        }
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 4, , 5]);
                        console.log("Command: '" + command + "' entered by system.");
                        return [4 /*yield*/, ((_a = CommandIndex_1.default.get(command)) === null || _a === void 0 ? void 0 : _a.function(client, collection, discordUser))];
                    case 3:
                        returnData = _b.sent();
                        console.log("Completed Command: " + returnData.commandName);
                        return [2 /*return*/];
                    case 4:
                        error_18 = _b.sent();
                        console.log(error_18);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    }
    IndexFunctions.onMessageDeleteBulk = onMessageDeleteBulk;
    function onRoleCreate(role, client, discordUser) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var guildData, command, returnData, error_19;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        guildData = new GuildData_1.default({ dataBase: discordUser.dataBase, id: role.guild.id, name: role.guild.name, memberCount: role.guild.memberCount });
                        return [4 /*yield*/, guildData.getFromDataBase()];
                    case 1:
                        _b.sent();
                        command = 'onrolecreate';
                        if (!CommandIndex_1.default.has(command)) {
                            return [2 /*return*/];
                        }
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 4, , 5]);
                        console.log("Command: '" + command + "' entered by system.");
                        return [4 /*yield*/, ((_a = CommandIndex_1.default.get(command)) === null || _a === void 0 ? void 0 : _a.function(client, role, discordUser))];
                    case 3:
                        returnData = _b.sent();
                        console.log("Completed Command: " + returnData.commandName);
                        return [2 /*return*/];
                    case 4:
                        error_19 = _b.sent();
                        console.log(error_19);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    }
    IndexFunctions.onRoleCreate = onRoleCreate;
    function onRoleDelete(role, client, discordUser) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var guildData, command, returnData, error_20;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        guildData = new GuildData_1.default({ dataBase: discordUser.dataBase, id: role.guild.id, name: role.guild.name, memberCount: role.guild.memberCount });
                        return [4 /*yield*/, guildData.getFromDataBase()];
                    case 1:
                        _b.sent();
                        command = 'onroledelete';
                        if (!CommandIndex_1.default.has(command)) {
                            return [2 /*return*/];
                        }
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 4, , 5]);
                        console.log("Command: '" + command + "' entered by system.");
                        return [4 /*yield*/, ((_a = CommandIndex_1.default.get(command)) === null || _a === void 0 ? void 0 : _a.function(client, role, discordUser))];
                    case 3:
                        returnData = _b.sent();
                        console.log("Completed Command: " + returnData.commandName);
                        return [2 /*return*/];
                    case 4:
                        error_20 = _b.sent();
                        console.log(error_20);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    }
    IndexFunctions.onRoleDelete = onRoleDelete;
    function onUserUpdate(oldUser, newUser, client, discordUser) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var guildArray, x, guildMembersArray, y, guildData, command, returnData, error_21;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(oldUser.username !== newUser.username)) return [3 /*break*/, 10];
                        guildArray = client.guilds.cache.array();
                        x = 0;
                        _b.label = 1;
                    case 1:
                        if (!(x < guildArray.length)) return [3 /*break*/, 10];
                        return [4 /*yield*/, guildArray[x].members.fetch()];
                    case 2:
                        guildMembersArray = (_b.sent()).array();
                        y = 0;
                        _b.label = 3;
                    case 3:
                        if (!(y < guildMembersArray.length)) return [3 /*break*/, 9];
                        if (!(guildMembersArray[y].id === oldUser.id)) return [3 /*break*/, 8];
                        guildData = new GuildData_1.default({ dataBase: discordUser.dataBase, id: guildArray[x].id, name: guildArray[x].name, memberCount: guildArray[x].memberCount });
                        return [4 /*yield*/, guildData.getFromDataBase()];
                    case 4:
                        _b.sent();
                        command = 'onusernamechange';
                        if (!CommandIndex_1.default.has(command)) {
                            return [2 /*return*/];
                        }
                        _b.label = 5;
                    case 5:
                        _b.trys.push([5, 7, , 8]);
                        console.log("Command: '" + command + "' entered by system.");
                        return [4 /*yield*/, ((_a = CommandIndex_1.default.get(command)) === null || _a === void 0 ? void 0 : _a.function(client, oldUser, newUser, guildArray[x], discordUser))];
                    case 6:
                        returnData = _b.sent();
                        console.log("Completed Command: " + returnData.commandName);
                        return [3 /*break*/, 9];
                    case 7:
                        error_21 = _b.sent();
                        console.log(error_21);
                        return [2 /*return*/];
                    case 8:
                        y += 1;
                        return [3 /*break*/, 3];
                    case 9:
                        x += 1;
                        return [3 /*break*/, 1];
                    case 10: return [2 /*return*/];
                }
            });
        });
    }
    IndexFunctions.onUserUpdate = onUserUpdate;
})(IndexFunctions || (IndexFunctions = {}));
exports.default = IndexFunctions;
