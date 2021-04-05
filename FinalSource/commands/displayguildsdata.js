// displayguildsdata.ts - Module for my displayguildsdata command.
// Jan 30, 2021
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
var DiscordUser_1 = __importDefault(require("../DiscordUser"));
var HelperFunctions_1 = __importDefault(require("../HelperFunctions"));
var command = new DiscordUser_1.default.BotCommand;
command.name = 'displayguildsdata';
command.description = '!displayguildsdata to display the guild info of the bots in chat!';
/**
 * Displays all of the data for all of the guilds, either in console or in chat.
 */
function execute(commandData, discordUser) {
    return __awaiter(this, void 0, void 0, function () {
        var commandReturnData, currentCount_1;
        return __generator(this, function (_a) {
            try {
                commandReturnData = new DiscordUser_1.default.CommandReturnData();
                commandReturnData.commandName = command.name;
                currentCount_1 = 0;
                discordUser.guildsData.forEach(function (guild) {
                    var _a;
                    var msgString = '';
                    msgString += "__Guild Name:__ " + guild.guildName + "\n";
                    msgString += "__Guild ID:__ " + guild.guildID + "\n";
                    msgString += "__Member Count:__ " + guild.guildMemberCount + "\n";
                    (_a = commandData.guildMember) === null || _a === void 0 ? void 0 : _a.client.guilds.fetch(guild.guildID).then(function (guild) {
                        msgString += "__Created:__ " + guild.createdAt + "\n";
                        msgString += "__Guild Owner:__ <@!" + guild.owner.id + "> (" + guild.owner.user.tag + ")\n";
                        var messageEmbed = new Discord.MessageEmbed()
                            .setColor([254, 254, 254])
                            .setThumbnail(guild.iconURL())
                            .setTitle("__**Guild Data " + (currentCount_1 + 1) + " of " + discordUser.guildsData.size + ":**__")
                            .setTimestamp(Date())
                            .setDescription(msgString);
                        HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, messageEmbed);
                        currentCount_1 += 1;
                    });
                });
                return [2 /*return*/, commandReturnData];
            }
            catch (error) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        reject(error);
                    })];
            }
            return [2 /*return*/];
        });
    });
}
command.function = execute;
exports.default = command;
