// jannyoptions.ts - Module for my "gamehouse options" command.
// Mar 14, 2021
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
    name: 'jannyoptions',
    description: '!jannyoptions, to display a list of options for this bot!',
    function: Function()
};
function execute(commandData, discordUser) {
    return __awaiter(this, void 0, void 0, function () {
        var commandReturnData, areWeInADM, doWeHaveAdminPerms, guildData, msgEmbed, fields, resultIcon, x, logsField, defaultRolesField, deletionChannelsField, serverRecordKey, serverRecordObject, replacementServerInviteField, requireServerVerificationField, timedMessagesField, trackUsersField, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 6, , 7]);
                    commandReturnData = {
                        commandName: command.name
                    };
                    return [4 /*yield*/, HelperFunctions_1.default.areWeInADM(commandData)];
                case 1:
                    areWeInADM = _a.sent();
                    if (areWeInADM === true) {
                        return [2 /*return*/, commandReturnData];
                    }
                    return [4 /*yield*/, HelperFunctions_1.default.doWeHaveAdminPermission(commandData, discordUser)];
                case 2:
                    doWeHaveAdminPerms = _a.sent();
                    if (doWeHaveAdminPerms === false) {
                        return [2 /*return*/, commandReturnData];
                    }
                    guildData = new GuildData_1.default({ dataBase: discordUser.dataBase, id: commandData.guild.id, name: commandData.guild.name, memberCount: commandData.guild.memberCount });
                    return [4 /*yield*/, guildData.getFromDataBase()];
                case 3:
                    _a.sent();
                    msgEmbed = new Discord.MessageEmbed();
                    msgEmbed
                        .setAuthor(commandData.guildMember.client.user.username, commandData.guildMember.client.user.avatarURL())
                        .setTimestamp(Date())
                        .setTitle('__**Janny Options:**__')
                        .setColor(guildData.borderColor)
                        .setDescription("**Enter '!help = COMMANDNAME to get instructions for each option!**");
                    fields = [];
                    resultIcon = '❌';
                    for (x = 0; x < guildData.logs.length; x += 1) {
                        if (guildData.logs[x].enabled === true) {
                            resultIcon = '✅';
                            break;
                        }
                    }
                    logsField = { name: '__**Logs:**__', value: "__Active:__ " + resultIcon + "\n__\n\t\t\tCommand(s):__ '!managelogs'", inline: true };
                    fields.push(logsField);
                    resultIcon = '❌';
                    if (guildData.defaultRoleIDs.length > 0) {
                        resultIcon = '✅';
                    }
                    defaultRolesField = { name: '__**Default Roles:**__', value: "__Active:__ " + resultIcon + "\n\n\t\t\t__Command(s):__ '!setdefaultrole'", inline: true };
                    fields.push(defaultRolesField);
                    resultIcon = '❌';
                    if (guildData.deletionChannels.length > 0) {
                        resultIcon = '✅';
                    }
                    deletionChannelsField = { name: '__**Delete Messages From Channels:**__', value: "__Active:__ " + resultIcon + "\n\n\t\t\t__Command(s):__ '!setdeletionstatus'", inline: true };
                    fields.push(deletionChannelsField);
                    resultIcon = '❌';
                    serverRecordKey = commandData.guild.id + " + Record";
                    return [4 /*yield*/, discordUser.dataBase.get(serverRecordKey)];
                case 4:
                    serverRecordObject = _a.sent();
                    if (serverRecordObject.replacementServerInvite !== '') {
                        resultIcon = '✅';
                    }
                    replacementServerInviteField = { name: '__**Replacement Server Invite:**__', value: "__Active:__ " + resultIcon + "\n\n\t\t\t__Command(s):__ '!setreplacementinvite'", inline: true };
                    fields.push(replacementServerInviteField);
                    resultIcon = '❌';
                    if (guildData.verificationSystem.channelID != '') {
                        resultIcon = '✅';
                    }
                    requireServerVerificationField = { name: '__**Require Server Verification:**__', value: "__Active:__ " + resultIcon + "\n\n\t\t\t__Command(s):__ '!setverificationsystem'", inline: true };
                    fields.push(requireServerVerificationField);
                    resultIcon = '❌';
                    if (guildData.timedMessages.length > 0) {
                        resultIcon = '✅';
                    }
                    timedMessagesField = { name: '__**Send Out Timed Messages:**__', value: "__Active:__ " + resultIcon + "\n\n\t\t\t__Command(s):__ '!timedmessages'", inline: true };
                    fields.push(timedMessagesField);
                    resultIcon = '❌';
                    if (guildData.trackedUsers.length > 0) {
                        resultIcon = '✅';
                    }
                    trackUsersField = { name: "__**Track User's Messages:**__", value: "__Active:__ " + resultIcon + "\n\n\t\t\t__Command(s):__ '!trackuser'", inline: true };
                    fields.push(trackUsersField);
                    msgEmbed.fields = fields;
                    return [4 /*yield*/, HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed)];
                case 5:
                    _a.sent();
                    return [2 /*return*/, commandReturnData];
                case 6:
                    error_1 = _a.sent();
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            reject(error_1);
                        })];
                case 7: return [2 /*return*/];
            }
        });
    });
}
command.function = execute;
exports.default = command;
