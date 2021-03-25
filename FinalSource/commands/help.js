// help.ts - Module for my help command.
// Jan 29, 2021
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = void 0;
var Discord = require("discord.js");
var DiscordStuff = require("../DiscordStuff.js");
var commandIndex = require("../commandindex");
var command = new DiscordStuff.BotCommand();
command.name = 'help';
command.description = 'Help Usage: !help, or !help = COMMANDNAME, in order to get help with a specific COMMAND.';
/**
 * Returns a menu of helping information for the various commands I have.
 * @param   {Discord.Message}             message
 * @param   {String[]}                    args
 * @param   {DiscordStuff.DiscordUser}    discordUser
 * @returns {Promise<string>}
 */
function execute(message, args) {
    return __awaiter(this, void 0, void 0, function () {
        var commandFiles_1, commandNames_1, msgString_1, currentIndex_1, messageEmbed, dmChannel, isFound_1, commandDescription_1, commandName_1, messageEmbed, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 19, , 20]);
                    commandFiles_1 = commandIndex.default.commands;
                    if (!(args[0] === undefined)) return [3 /*break*/, 8];
                    commandNames_1 = [String('')];
                    commandFiles_1.forEach(function (value, key, map) {
                        commandNames_1[key] = value.name;
                        return commandNames_1;
                    });
                    msgString_1 = String('');
                    msgString_1 += '!help = COMMANDNAMEHERE\n\n__**List of command names:**__ ';
                    currentIndex_1 = Number(0);
                    commandFiles_1.forEach(function (value, key, map) {
                        msgString_1 += commandNames_1[key];
                        currentIndex_1 += 1;
                        if (currentIndex_1 < commandFiles_1.size) {
                            msgString_1 += ', ';
                        }
                        return commandNames_1;
                    });
                    messageEmbed = new Discord.MessageEmbed();
                    messageEmbed.setImage(message.client.user.avatarURL().toString()).setTimestamp(Date())
                        .setAuthor(message.author.username, message.author.avatarURL()).setTitle("__**" + message.client.user.username + " Help:**__")
                        .setDescription(msgString_1)
                        .setColor([254, 254, 254]);
                    if (!(message.author.dmChannel == null)) return [3 /*break*/, 3];
                    return [4 /*yield*/, message.author.createDM()];
                case 1:
                    dmChannel = _a.sent();
                    return [4 /*yield*/, dmChannel.send(messageEmbed)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, message.author.dmChannel.send(messageEmbed)];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5:
                    if (!(message.channel.type !== 'dm' && message.deletable)) return [3 /*break*/, 7];
                    return [4 /*yield*/, message.delete()];
                case 6:
                    _a.sent();
                    _a.label = 7;
                case 7: return [2 /*return*/, command.name];
                case 8:
                    isFound_1 = false;
                    commandName_1 = String('');
                    commandFiles_1.forEach(function (value, key, map) {
                        var command = value;
                        if (args[0] === command.name) {
                            isFound_1 = true;
                            commandDescription_1 = command.description;
                            commandName_1 = command.name;
                        }
                        return commandName_1;
                    });
                    if (!(isFound_1 === false)) return [3 /*break*/, 12];
                    if (!(message.channel.type !== 'dm' && message.deletable)) return [3 /*break*/, 10];
                    return [4 /*yield*/, message.delete()];
                case 9:
                    _a.sent();
                    _a.label = 10;
                case 10: return [4 /*yield*/, message.reply('Sorry, but that command was not found!')];
                case 11:
                    _a.sent();
                    return [2 /*return*/, command.name];
                case 12:
                    if (!(commandDescription_1 instanceof Discord.MessageEmbed)) return [3 /*break*/, 14];
                    commandDescription_1.setAuthor(message.author.username, message.author.avatarURL()).setColor([254, 254, 254])
                        .setTitle("__**" + (commandName_1.charAt(0).toUpperCase() + commandName_1.slice(1)) + " Help:**__").setTimestamp(Date());
                    return [4 /*yield*/, message.channel.send(commandDescription_1)];
                case 13:
                    _a.sent();
                    return [3 /*break*/, 16];
                case 14:
                    messageEmbed = new Discord.MessageEmbed();
                    messageEmbed.setDescription(commandDescription_1)
                        .setTimestamp(Date()).setAuthor(message.author.username, message.author.avatarURL())
                        .setTitle("__**" + (commandName_1.charAt(0).toUpperCase() + commandName_1.slice(1)) + " Help:**__")
                        .setColor([254, 254, 254]);
                    return [4 /*yield*/, message.channel.send(messageEmbed)];
                case 15:
                    _a.sent();
                    _a.label = 16;
                case 16:
                    if (!(message.channel.type !== 'dm' && message.deletable)) return [3 /*break*/, 18];
                    return [4 /*yield*/, message.delete()];
                case 17:
                    _a.sent();
                    _a.label = 18;
                case 18: return [2 /*return*/, command.name];
                case 19:
                    error_1 = _a.sent();
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            reject(error_1);
                        })];
                case 20: return [2 /*return*/];
            }
        });
    });
}
exports.execute = execute;
command.function = execute;
exports.default = command;
