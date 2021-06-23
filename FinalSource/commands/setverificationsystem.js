//  setverificationsystem.ts - Module for my "set verification system" command!.
// Feb 26, 2021
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
var GuildData_1 = __importDefault(require("../GuildData"));
var HelperFunctions_1 = __importDefault(require("../HelperFunctions"));
var command = {
    name: 'setverificationsystem',
    description: '!setverificationsystem = ENABLE, VERIFICATIONMESSAGE, REACTIONEMOJI, in the channel you would like to use for your verification channel!\nAlso, !setverificationsystem = DISABLE.',
    function: Function()
};
function execute(commandData, discordUser) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    return __awaiter(this, void 0, void 0, function () {
        var commandReturnData, areWeInADM, doWeHaveAdminPermission, guildData, whatAreWeDoing, emojiRegExp, msgString_1, msgEmbed, msg, msgString_2, msgEmbed, msg, msgString_3, msgEmbed, msg, msgString, messageManager, newMessage, error_1, msgEmbed_1, msgEmbed, currentChannel, msgString_4, msgEmbed_2, msg, messageManager, msgEmbed, msgString_5, msgEmbed_3, msg_1, msgEmbed2, newMessage, currentGuild, channelsArray, currentRolesArray, everyoneRoleID, x, x, rolesArray, y, y, argTwo, msgEmbed, msg, error_2;
        return __generator(this, function (_k) {
            switch (_k.label) {
                case 0:
                    _k.trys.push([0, 56, , 57]);
                    commandReturnData = {
                        commandName: command.name
                    };
                    return [4 /*yield*/, HelperFunctions_1.default.areWeInADM(commandData)];
                case 1:
                    areWeInADM = _k.sent();
                    if (areWeInADM === true) {
                        return [2 /*return*/, commandReturnData];
                    }
                    return [4 /*yield*/, HelperFunctions_1.default.doWeHaveAdminPermission(commandData, discordUser)];
                case 2:
                    doWeHaveAdminPermission = _k.sent();
                    if (doWeHaveAdminPermission === false) {
                        return [2 /*return*/, commandReturnData];
                    }
                    guildData = new GuildData_1.default({ dataBase: discordUser.dataBase, id: commandData.guild.id, name: commandData.guild.name, memberCount: commandData.guild.memberCount });
                    return [4 /*yield*/, guildData.getFromDataBase()];
                case 3:
                    _k.sent();
                    whatAreWeDoing = void 0;
                    emojiRegExp = /.{1,26}/;
                    if (!(commandData.args[0] === undefined)) return [3 /*break*/, 4];
                    whatAreWeDoing = 'viewing';
                    return [3 /*break*/, 14];
                case 4:
                    if (!(commandData.args[0].toLowerCase() !== 'enable' && commandData.args[0].toLowerCase() !== 'disable')) return [3 /*break*/, 7];
                    msgString_1 = "------\n**Please enter either 'enable' or 'disable' as the first argument! (!setverificationsystem = ENABLE, VERIFICATIONMESSAGE, REACTIONEMOJI, or !setverificationsystem = DISABLE)**\n------";
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString_1)
                        .setTimestamp(Date())
                        .setTitle('__**Missing Or Invalid Arguments:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 5:
                    msg = _k.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 6:
                    _k.sent();
                    return [2 /*return*/, commandReturnData];
                case 7:
                    if (!(commandData.args[0].toLowerCase() === 'enable' && commandData.args[1] === undefined)) return [3 /*break*/, 10];
                    msgString_2 = '------\n**Please, enter a greeting message for the verification system!**\n------';
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString_2)
                        .setTimestamp(Date())
                        .setTitle('__**Missing Or Invalid Arguments:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 8:
                    msg = _k.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 9:
                    _k.sent();
                    return [2 /*return*/, commandReturnData];
                case 10:
                    if (!(commandData.args[0].toLowerCase() === 'enable' && (commandData.args[2] === undefined || !emojiRegExp.test(commandData.args[2])))) return [3 /*break*/, 13];
                    msgString_3 = '------\n**Please, enter a valid emoji for them to react with!**\n------';
                    msgEmbed = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString_3)
                        .setTimestamp(Date())
                        .setTitle('__**Missing Or Invalid Arguments:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 11:
                    msg = _k.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 12:
                    _k.sent();
                    return [2 /*return*/, commandReturnData];
                case 13:
                    if (commandData.args[0].toLowerCase() === 'enable') {
                        whatAreWeDoing = 'enable';
                    }
                    else if (commandData.args[0].toLowerCase() === 'disable') {
                        whatAreWeDoing = 'disable';
                    }
                    _k.label = 14;
                case 14:
                    msgString = '';
                    if (!(whatAreWeDoing === 'viewing')) return [3 /*break*/, 25];
                    if (!(guildData.verificationSystem.messageID !== '')) return [3 /*break*/, 21];
                    _k.label = 15;
                case 15:
                    _k.trys.push([15, 17, , 20]);
                    messageManager = new Discord.MessageManager(commandData.guildMember.client.channels.resolve(guildData.verificationSystem.channelID));
                    return [4 /*yield*/, messageManager.fetch(guildData.verificationSystem.messageID)];
                case 16:
                    newMessage = _k.sent();
                    msgString = "------\n__**Channel:**__ <#" + guildData.verificationSystem.channelID + ">\n";
                    msgString += "__**Message Content:**__ " + newMessage.embeds[0].description + "\n";
                    msgString += "__**Emoji:**__ " + guildData.verificationSystem.emoji + "\n------";
                    return [3 /*break*/, 20];
                case 17:
                    error_1 = _k.sent();
                    console.log(error_1);
                    msgString = '------\n__The verification system is currently disabled.__\n------\n';
                    guildData.verificationSystem.channelID = '';
                    guildData.verificationSystem.messageID = '';
                    guildData.verificationSystem.emoji = '';
                    return [4 /*yield*/, guildData.writeToDataBase()];
                case 18:
                    _k.sent();
                    msgEmbed_1 = new Discord.MessageEmbed();
                    msgEmbed_1
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setTimestamp(Date())
                        .setTitle('__**Verification System:**__')
                        .setDescription(msgString);
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed_1)];
                case 19:
                    _k.sent();
                    return [2 /*return*/, commandReturnData];
                case 20: return [3 /*break*/, 23];
                case 21:
                    msgString = '------\n__The verification system is currently disabled.__\n------\n';
                    guildData.verificationSystem.channelID = '';
                    guildData.verificationSystem.messageID = '';
                    guildData.verificationSystem.emoji = '';
                    return [4 /*yield*/, guildData.writeToDataBase()];
                case 22:
                    _k.sent();
                    _k.label = 23;
                case 23:
                    msgEmbed = new Discord.MessageEmbed();
                    msgEmbed
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setTimestamp(Date())
                        .setTitle('__**Verification System:**__')
                        .setDescription(msgString);
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 24:
                    _k.sent();
                    return [2 /*return*/, commandReturnData];
                case 25:
                    if (!(whatAreWeDoing === 'disable')) return [3 /*break*/, 33];
                    currentChannel = commandData.guildMember.client.channels
                        .resolve(guildData.verificationSystem.channelID);
                    if (!(guildData.verificationSystem.channelID == '' || currentChannel === null)) return [3 /*break*/, 29];
                    msgString_4 = '------\n**Sorry, it looks as though it is already disabled!**\n------';
                    msgEmbed_2 = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString_4)
                        .setTimestamp(Date())
                        .setTitle('__**Existence Issue:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed_2)];
                case 26:
                    msg = _k.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 27:
                    _k.sent();
                    guildData.verificationSystem.channelID = '';
                    guildData.verificationSystem.messageID = '';
                    guildData.verificationSystem.emoji = '';
                    return [4 /*yield*/, guildData.writeToDataBase()];
                case 28:
                    _k.sent();
                    return [2 /*return*/, commandReturnData];
                case 29:
                    messageManager = new Discord.MessageManager(currentChannel);
                    return [4 /*yield*/, messageManager.delete(guildData.verificationSystem.messageID)];
                case 30:
                    _k.sent();
                    guildData.verificationSystem.channelID = '';
                    guildData.verificationSystem.messageID = '';
                    guildData.verificationSystem.emoji = '';
                    return [4 /*yield*/, guildData.writeToDataBase()];
                case 31:
                    _k.sent();
                    msgString = "__**Nicely done! You've disabled the verification system for this server!**__";
                    msgEmbed = new Discord.MessageEmbed();
                    msgEmbed
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setTimestamp(Date())
                        .setTitle('__**Set Verification System:**__')
                        .setDescription(msgString);
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 32:
                    _k.sent();
                    return [2 /*return*/, commandReturnData];
                case 33:
                    if (!(whatAreWeDoing === 'enable')) return [3 /*break*/, 55];
                    if (!(guildData.defaultRoleIDs.length === 0)) return [3 /*break*/, 36];
                    msgString_5 = '------\n**Please, first set a default role to be applied to the new member! Using !setdefaultrole.**\n------';
                    msgEmbed_3 = new Discord.MessageEmbed()
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setDescription(msgString_5)
                        .setTimestamp(Date())
                        .setTitle('__**Role Issue:**__');
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed_3)];
                case 34:
                    msg_1 = _k.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg_1 = new Discord.Message(commandData.guild.client, msg_1, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg_1.delete({ timeout: 20000 })];
                case 35:
                    _k.sent();
                    return [2 /*return*/, commandReturnData];
                case 36:
                    msgEmbed2 = new Discord.MessageEmbed()
                        .setColor(guildData.borderColor)
                        .setDescription(commandData.args[1])
                        .setTimestamp(Date());
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed2)];
                case 37:
                    newMessage = _k.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        newMessage = new Discord.Message(commandData.guild.client, newMessage, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, newMessage.react(commandData.args[2])];
                case 38:
                    _k.sent();
                    currentGuild = (_a = commandData.guild) === null || _a === void 0 ? void 0 : _a.client.guilds.resolve(commandData.guild.id);
                    channelsArray = currentGuild.channels.cache.array();
                    currentRolesArray = currentGuild.roles.cache.array();
                    everyoneRoleID = void 0;
                    for (x = 0; x < currentRolesArray.length; x += 1) {
                        if (currentRolesArray[x].name === '@everyone') {
                            everyoneRoleID = (_b = currentRolesArray[x]) === null || _b === void 0 ? void 0 : _b.id;
                        }
                    }
                    x = 0;
                    _k.label = 39;
                case 39:
                    if (!(x < channelsArray.length)) return [3 /*break*/, 51];
                    rolesArray = currentGuild.roles.cache.array();
                    if (!(channelsArray[x].id !== commandData.fromTextChannel.id)) return [3 /*break*/, 45];
                    y = 0;
                    _k.label = 40;
                case 40:
                    if (!(y < guildData.defaultRoleIDs.length)) return [3 /*break*/, 43];
                    if (!((_d = (_c = channelsArray[x]) === null || _c === void 0 ? void 0 : _c.permissionsFor(guildData.defaultRoleIDs[y])) === null || _d === void 0 ? void 0 : _d.has('VIEW_CHANNEL'))) return [3 /*break*/, 42];
                    return [4 /*yield*/, ((_e = channelsArray[x]) === null || _e === void 0 ? void 0 : _e.updateOverwrite(guildData.defaultRoleIDs[y], { VIEW_CHANNEL: true }))];
                case 41:
                    _k.sent();
                    _k.label = 42;
                case 42:
                    y += 1;
                    return [3 /*break*/, 40];
                case 43: return [4 /*yield*/, ((_f = channelsArray[x]) === null || _f === void 0 ? void 0 : _f.updateOverwrite(everyoneRoleID, { VIEW_CHANNEL: false }))];
                case 44:
                    _k.sent();
                    return [3 /*break*/, 50];
                case 45: return [4 /*yield*/, ((_g = channelsArray[x]) === null || _g === void 0 ? void 0 : _g.updateOverwrite(everyoneRoleID, { VIEW_CHANNEL: true, SEND_MESSAGES: false, ATTACH_FILES: false, EMBED_LINKS: false }))];
                case 46:
                    _k.sent();
                    y = 0;
                    _k.label = 47;
                case 47:
                    if (!(y < rolesArray.length)) return [3 /*break*/, 50];
                    if (!(((_h = rolesArray[y]) === null || _h === void 0 ? void 0 : _h.id) !== everyoneRoleID)) return [3 /*break*/, 49];
                    return [4 /*yield*/, ((_j = channelsArray[x]) === null || _j === void 0 ? void 0 : _j.updateOverwrite(rolesArray[y].id, { VIEW_CHANNEL: false }))];
                case 48:
                    _k.sent();
                    _k.label = 49;
                case 49:
                    y += 1;
                    return [3 /*break*/, 47];
                case 50:
                    x += 1;
                    return [3 /*break*/, 39];
                case 51:
                    guildData.verificationSystem.channelID = commandData.fromTextChannel.id;
                    guildData.verificationSystem.messageID = newMessage.id;
                    argTwo = commandData.args[2];
                    guildData.verificationSystem.emoji = argTwo;
                    return [4 /*yield*/, guildData.writeToDataBase()];
                case 52:
                    _k.sent();
                    msgString = "__**Nicely done! You've enabled the verification system for this server!**__";
                    msgEmbed = new Discord.MessageEmbed();
                    msgEmbed
                        .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                        .setColor(guildData.borderColor)
                        .setTimestamp(Date())
                        .setTitle('__**Set Verification System:**__')
                        .setDescription(msgString);
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 53:
                    msg = _k.sent();
                    if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                        msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                    }
                    return [4 /*yield*/, msg.delete({ timeout: 20000 })];
                case 54:
                    _k.sent();
                    return [2 /*return*/, commandReturnData];
                case 55: return [2 /*return*/, commandReturnData];
                case 56:
                    error_2 = _k.sent();
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            reject(error_2);
                        })];
                case 57: return [2 /*return*/];
            }
        });
    });
}
command.function = execute;
exports.default = command;
