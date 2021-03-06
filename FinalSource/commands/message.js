// message.ts - Module for my message command.
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
var GuildData_1 = __importDefault(require("../GuildData"));
var command = {
    name: 'message',
    description: '__**Message Usage**__: Command executes automatically upon receiving certain messages!.',
    function: Function()
};
function trackIfTrackedUser(message, commandData) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            try {
                if (message.guild === undefined || message.guild === null || message.author.bot) {
                    return [2 /*return*/];
                }
                GuildData_1.default.guildsData.forEach(function (guildData) {
                    var _a, _b;
                    var msgStringContent;
                    var user = message.author;
                    var isItFound = false;
                    var index;
                    for (var x = 0; x < guildData.trackedUsers.length; x += 1) {
                        if (user.id === ((_a = guildData.trackedUsers[x]) === null || _a === void 0 ? void 0 : _a.userID)) {
                            msgStringContent = "__**Tracked User:**__ <@!" + user.id + "> (" + user.username + ")\n__**On Server:**__ " + message.guild.name +
                                ("\n__**In Channel:**__ <#" + message.channel.id + "> (" + message.channel.name + ")\n__**Message ID**__ " + message.id + "\n__**What They Said:**__ " + message.content);
                            isItFound = true;
                            index = x;
                        }
                    }
                    if (isItFound === false) {
                        return;
                    }
                    else {
                        var msgEmbed = new Discord.MessageEmbed();
                        msgEmbed
                            .setAuthor(user.username, user.avatarURL())
                            .setColor([254, 254, 254])
                            .setDescription(msgStringContent)
                            .setTimestamp(Date())
                            .setTitle("__**Tracked User Message:**__");
                        var currentTextChannel = commandData.guildMember.client.channels.resolve((_b = guildData.trackedUsers[index]) === null || _b === void 0 ? void 0 : _b.channelID);
                        currentTextChannel.send(msgEmbed);
                    }
                });
            }
            catch (error) {
                console.log(error);
            }
            return [2 /*return*/];
        });
    });
}
/**
* Selects a chosen chat message and sends it via the appropriate channel,
* upon recieving a trigger phrase or word.
*/
function execute(message, commandData) {
    return __awaiter(this, void 0, void 0, function () {
        var commandReturnData, number, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    commandReturnData = {
                        commandName: command.name
                    };
                    return [4 /*yield*/, trackIfTrackedUser(message, commandData)];
                case 1:
                    _a.sent();
                    number = Math.random() * 100;
                    if (!(message.content != null && message.content !== undefined)) return [3 /*break*/, 3];
                    if (!(message.content.toLowerCase().includes('hey ') && number <= 15)) return [3 /*break*/, 3];
                    return [4 /*yield*/, message.reply("Greetings, what's up fellow Discordee?! Can I offer you some drugs?")];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3: return [2 /*return*/, commandReturnData];
                case 4:
                    error_1 = _a.sent();
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            reject(error_1);
                        })];
                case 5: return [2 /*return*/];
            }
        });
    });
}
command.function = execute;
exports.default = command;
