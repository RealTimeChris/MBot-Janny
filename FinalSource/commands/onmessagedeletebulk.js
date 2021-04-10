// onmessagedeletebulk.ts - Module for my "on message delete bulk" command.
// Mar 12, 2021
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
    name: 'onmessagedeletebulk',
    description: "It's an automatic one!",
    function: Function()
};
function execute(client, collection, discordUser) {
    return __awaiter(this, void 0, void 0, function () {
        var commandReturnData, guildData, logs, x, textChannel, msgEmbed, msgString, keyArray, x, currentMessage, msgString2, msgEmbed2, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 10, , 11]);
                    commandReturnData = {
                        commandName: command.name
                    };
                    if (!(collection instanceof Discord.Collection)) {
                        return [2 /*return*/, commandReturnData];
                    }
                    guildData = new GuildData_1.default({ dataBase: discordUser.dataBase, id: collection.first().guild.id,
                        name: collection.first().guild.name, memberCount: collection.first().guild.memberCount });
                    return [4 /*yield*/, guildData.getFromDataBase()];
                case 1:
                    _a.sent();
                    logs = void 0;
                    for (x = 0; x < guildData.logs.length; x += 1) {
                        if (guildData.logs[x].nameSmall === 'messagedeletebulk') {
                            logs = guildData.logs[x];
                            break;
                        }
                    }
                    if (!(logs.enabled === true)) return [3 /*break*/, 9];
                    return [4 /*yield*/, client.channels.fetch(logs.loggingChannelID)];
                case 2:
                    textChannel = _a.sent();
                    msgEmbed = new Discord.MessageEmbed();
                    msgString = '';
                    msgString = "__**Number of Messages:**__ " + collection.size + "\n";
                    msgEmbed
                        .setTitle('__**Messages Bulk Deleted:**__')
                        .setTimestamp(Date())
                        .setDescription(msgString)
                        .setColor(guildData.borderColor);
                    return [4 /*yield*/, textChannel.send(msgEmbed)];
                case 3:
                    _a.sent();
                    keyArray = collection.keyArray();
                    x = 0;
                    _a.label = 4;
                case 4:
                    if (!(x < keyArray.length)) return [3 /*break*/, 9];
                    currentMessage = collection.get(keyArray[x]);
                    if (!(currentMessage.content !== '')) return [3 /*break*/, 6];
                    msgString2 = "__**Message Author:**__ <@!" + currentMessage.author.id + "> (" + currentMessage.author.tag + ")\n";
                    msgString2 += "__**Message Id:**__ " + currentMessage.id + "\n";
                    msgString2 += "__**Message Content:**__ " + currentMessage.content + "\n";
                    msgString2 += "__**Message Channel:**__ " + (currentMessage === null || currentMessage === void 0 ? void 0 : currentMessage.channel).name;
                    msgEmbed
                        .setTitle("__**Deleted Message: " + (x + 1) + " of " + keyArray.length + "**__")
                        .setTimestamp(Date())
                        .setDescription(msgString2)
                        .setColor(guildData.borderColor);
                    return [4 /*yield*/, textChannel.send(msgEmbed)];
                case 5:
                    _a.sent();
                    _a.label = 6;
                case 6:
                    if (!(currentMessage.embeds.length > 0)) return [3 /*break*/, 8];
                    msgEmbed2 = currentMessage.embeds[0];
                    return [4 /*yield*/, textChannel.send("Message Content: " + (x + 1) + " of " + keyArray.length, { embed: msgEmbed2 })];
                case 7:
                    _a.sent();
                    _a.label = 8;
                case 8:
                    x += 1;
                    return [3 /*break*/, 4];
                case 9: return [2 /*return*/, commandReturnData];
                case 10:
                    error_1 = _a.sent();
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            reject(error_1);
                        })];
                case 11: return [2 /*return*/];
            }
        });
    });
}
command.function = execute;
exports.default = command;
