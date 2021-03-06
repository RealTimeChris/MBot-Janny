// slashcommands.ts - Module for declaring my slash commands.
// Mar 28, 2021
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
var slash_commands_1 = __importDefault(require("slash-commands"));
var HelperFunctions_1 = __importDefault(require("../HelperFunctions"));
var command = {
    name: 'slashcommands',
    description: '!slashcommands',
    function: Function()
};
function execute(commandData, discordUser) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function () {
        var commandReturnData, interaction, commands, x, globalCommands, msgString, msgEmbeds, x, msgEmbed, currentMsgEmbed, x, error_1;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _d.trys.push([0, 7, , 8]);
                    commandReturnData = {
                        commandName: command.name
                    };
                    interaction = new slash_commands_1.default({ applicationId: discordUser.userData.userID,
                        publicKey: discordUser.userData.publicKey,
                        authToken: discordUser.userData.botToken });
                    return [4 /*yield*/, interaction.getApplicationCommands()];
                case 1:
                    commands = _d.sent();
                    for (x = 0; x < commands.length; x += 1) {
                        //const newInteraction = await interaction.deleteApplicationCommand(commands[x]?.id as string);
                        //console.log(newInteraction);
                    }
                    return [4 /*yield*/, interaction.getApplicationCommands()];
                case 2:
                    globalCommands = _d.sent();
                    msgString = "------\n**Yes, IT'S COMPLETED! You have " + globalCommands.length + " commands registered!**\n------\n";
                    msgEmbeds = [];
                    for (x = 0; x < globalCommands.length; x += 1) {
                        msgString += "__**Name**__: " + ((_a = globalCommands[x]) === null || _a === void 0 ? void 0 : _a.name) + " __**Description**__: " + ((_b = globalCommands[x]) === null || _b === void 0 ? void 0 : _b.description) + "\n";
                        if (msgString.length >= 1900 || x === globalCommands.length - 1) {
                            msgEmbed = new Discord.MessageEmbed();
                            if (commandData.guildMember instanceof Discord.User) {
                                msgEmbed
                                    .setAuthor(commandData.guildMember.username, commandData.guildMember.avatarURL())
                                    .setColor([254, 254, 255])
                                    .setTimestamp(Date())
                                    .setTitle('__**Registered Commands:**__');
                            }
                            else {
                                msgEmbed
                                    .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                                    .setColor([254, 254, 254])
                                    .setTimestamp(Date())
                                    .setTitle('__**Registered Commands:**__');
                            }
                            msgString += "------";
                            currentMsgEmbed = msgEmbed;
                            currentMsgEmbed.setDescription(msgString);
                            msgEmbeds.push(currentMsgEmbed);
                            msgString = "------\n**Yes, IT'S COMPLETED! You have " + globalCommands.length + " commands registered!**\n------\n";
                        }
                    }
                    x = 0;
                    _d.label = 3;
                case 3:
                    if (!(x < msgEmbeds.length)) return [3 /*break*/, 6];
                    (_c = msgEmbeds[x]) === null || _c === void 0 ? void 0 : _c.setTitle("__**Registered Commands, (" + (x + 1).toString() + " of " + msgEmbeds.length + "): **__");
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbeds[x])];
                case 4:
                    _d.sent();
                    _d.label = 5;
                case 5:
                    x += 1;
                    return [3 /*break*/, 3];
                case 6: return [2 /*return*/, commandReturnData];
                case 7:
                    error_1 = _d.sent();
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            reject(error_1);
                        })];
                case 8: return [2 /*return*/];
            }
        });
    });
}
command.function = execute;
exports.default = command;
