// RestoreServerStatus.ts - Header for the "restore server status" command.
// Jul 1, 2021
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
var command = {
    name: 'restoreserverstatus',
    description: "It's an automatic one!",
    function: Function()
};
function execute(commandData, discordUser) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    return __awaiter(this, void 0, void 0, function () {
        var commandReturnData, guild, i, messageEmbed, dmChannel, error_1;
        return __generator(this, function (_j) {
            switch (_j.label) {
                case 0:
                    _j.trys.push([0, 5, , 6]);
                    commandReturnData = {
                        commandName: command.name
                    };
                    if (!(discordUser instanceof DiscordUser_1.default)) {
                        return [2 /*return*/, commandReturnData];
                    }
                    discordUser.getUserDataFromDB((_a = commandData.guild) === null || _a === void 0 ? void 0 : _a.client);
                    return [4 /*yield*/, ((_b = commandData.guild) === null || _b === void 0 ? void 0 : _b.client.guilds.fetch("853430516782596156"))];
                case 1:
                    guild = _j.sent();
                    if (!(commandData.args[0] === 'setthisup')) return [3 /*break*/, 2];
                    for (i = 0; i < (guild === null || guild === void 0 ? void 0 : guild.members.cache.size); i += 1) {
                        discordUser.userData.guildMemberList.push(guild === null || guild === void 0 ? void 0 : guild.members.cache.array()[i].id);
                    }
                    return [3 /*break*/, 4];
                case 2:
                    if (!(discordUser.userData.guildMemberList.length > 0)) return [3 /*break*/, 4];
                    messageEmbed = new Discord.MessageEmbed();
                    messageEmbed.setAuthor((_d = (_c = commandData.guildMember) === null || _c === void 0 ? void 0 : _c.client.user) === null || _d === void 0 ? void 0 : _d.username, (_f = (_e = commandData.guildMember) === null || _e === void 0 ? void 0 : _e.client.user) === null || _f === void 0 ? void 0 : _f.avatarURL());
                    messageEmbed.setColor([254, 254, 254]);
                    messageEmbed.setTimestamp(Date());
                    messageEmbed.setTitle("__**Welcome:**__");
                    messageEmbed.setDescription("Hey there - so since Doom and I lost our accounts in an unfortunate banning event, recently - " +
                        "we will be moving over to a new version of the server, that has its ownership secured by a distant alt! Anyways, hope to see you there, here's the link! https://discord.gg/6y9C25KUnv");
                    console.log("ABOUT TO SEND OUT " + discordUser.userData.guildMemberList[0] + "'s INVITE MESSAGE!");
                    return [4 /*yield*/, ((_g = commandData.guild) === null || _g === void 0 ? void 0 : _g.client.users.fetch(discordUser.userData.guildMemberList[discordUser.userData.guildMemberList.length - 1]))];
                case 3:
                    dmChannel = (_h = (_j.sent())) === null || _h === void 0 ? void 0 : _h.createDM();
                    discordUser.userData.guildMemberList.pop();
                    //await (await dmChannel)?.send(messageEmbed);
                    discordUser.updateUserDataInDB(discordUser.userData);
                    console.log("ONLY " + discordUser.userData.guildMemberList.length.toString() + "INVITES LEFT");
                    _j.label = 4;
                case 4:
                    discordUser.userData.guildMemberList.push();
                    return [2 /*return*/, commandReturnData];
                case 5:
                    error_1 = _j.sent();
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            reject(error_1);
                        })];
                case 6: return [2 /*return*/];
            }
        });
    });
}
command.function = execute;
exports.default = command;
;
