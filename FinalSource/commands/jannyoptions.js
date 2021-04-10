// jannyoptions.ts - Module for my "gamehouse options" command.
// Mar 14, 2021
// Chris M.
// https://github.com/RealTimeChris
'use strict';
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Discord = __importStar(require("discord.js"));
const GuildData_1 = __importDefault(require("../GuildData"));
const HelperFunctions_1 = __importDefault(require("../HelperFunctions"));
const command = {
    name: 'jannyoptions',
    description: '!jannyoptions, to display a list of options for this bot!',
    function: Function()
};
function execute(commandData, discordUser) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const commandReturnData = {
                commandName: command.name
            };
            const areWeInADM = yield HelperFunctions_1.default.areWeInADM(commandData);
            if (areWeInADM === true) {
                return commandReturnData;
            }
            const doWeHaveAdminPerms = yield HelperFunctions_1.default.doWeHaveAdminPermission(commandData, discordUser);
            if (doWeHaveAdminPerms === false) {
                return commandReturnData;
            }
            const guildData = new GuildData_1.default({ dataBase: discordUser.dataBase, id: commandData.guild.id, name: commandData.guild.name, memberCount: commandData.guild.memberCount });
            yield guildData.getFromDataBase();
            const msgEmbed = new Discord.MessageEmbed();
            msgEmbed
                .setAuthor(commandData.guildMember.client.user.username, commandData.guildMember.client.user.avatarURL())
                .setTimestamp(Date())
                .setTitle('__**Janny Options:**__')
                .setColor(guildData.borderColor)
                .setDescription("**Enter '!help = COMMANDNAME to get instructions for each option!**");
            const fields = [];
            let resultIcon = '❌';
            for (let x = 0; x < guildData.logs.length; x += 1) {
                if (guildData.logs[x].enabled === true) {
                    resultIcon = '✅';
                    break;
                }
            }
            const logsField = { name: '__**Logs:**__', value: `__Active:__ ${resultIcon}\n__
			Command(s):__ '!managelogs'`, inline: true };
            fields.push(logsField);
            resultIcon = '❌';
            if (guildData.defaultRoleIDs.length > 0) {
                resultIcon = '✅';
            }
            const defaultRolesField = { name: '__**Default Roles:**__', value: `__Active:__ ${resultIcon}\n
			__Command(s):__ '!setdefaultrole'`, inline: true };
            fields.push(defaultRolesField);
            resultIcon = '❌';
            if (guildData.deletionChannels.length > 0) {
                resultIcon = '✅';
            }
            const deletionChannelsField = { name: '__**Delete Messages From Channels:**__', value: `__Active:__ ${resultIcon}\n
			__Command(s):__ '!setdeletionstatus'`, inline: true };
            fields.push(deletionChannelsField);
            resultIcon = '❌';
            const serverRecordKey = `${commandData.guild.id} + Record`;
            const serverRecordObject = yield discordUser.dataBase.get(serverRecordKey);
            if (serverRecordObject.replacementServerInvite !== '') {
                resultIcon = '✅';
            }
            const replacementServerInviteField = { name: '__**Replacement Server Invite:**__', value: `__Active:__ ${resultIcon}\n
			__Command(s):__ '!setreplacementinvite'`, inline: true };
            fields.push(replacementServerInviteField);
            resultIcon = '❌';
            if (guildData.verificationSystem.channelID != '') {
                resultIcon = '✅';
            }
            const requireServerVerificationField = { name: '__**Require Server Verification:**__', value: `__Active:__ ${resultIcon}\n
			__Command(s):__ '!setverificationsystem'`, inline: true };
            fields.push(requireServerVerificationField);
            resultIcon = '❌';
            if (guildData.timedMessages.length > 0) {
                resultIcon = '✅';
            }
            const timedMessagesField = { name: '__**Send Out Timed Messages:**__', value: `__Active:__ ${resultIcon}\n
			__Command(s):__ '!timedmessages'`, inline: true };
            fields.push(timedMessagesField);
            resultIcon = '❌';
            if (guildData.trackedUsers.length > 0) {
                resultIcon = '✅';
            }
            const trackUsersField = { name: "__**Track User's Messages:**__", value: `__Active:__ ${resultIcon}\n
			__Command(s):__ '!trackuser'`, inline: true };
            fields.push(trackUsersField);
            msgEmbed.fields = fields;
            yield HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed);
            return commandReturnData;
        }
        catch (error) {
            return new Promise((resolve, reject) => {
                reject(error);
            });
        }
    });
}
command.function = execute;
exports.default = command;
