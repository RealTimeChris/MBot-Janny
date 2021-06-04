// botinfo.ts - Module for my display user data function.
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Discord = require("discord.js");
const HelperFunctions_1 = __importDefault(require("../HelperFunctions"));
const command = {
    name: 'botinfo',
    description: '!botinfo to display info about this bot in chat!',
    function: Function()
};
/**
* Displays the data about the currend user.
*/
function execute(commandData, discordUser) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const commandReturnData = {
                commandName: command.name
            };
            if (((_a = commandData.args[0]) === null || _a === void 0 ? void 0 : _a.toLowerCase()) !== 'janny' && ((_b = commandData.args[0]) === null || _b === void 0 ? void 0 : _b.toLowerCase()) !== 'musichouse' && ((_c = commandData.args[0]) === null || _c === void 0 ? void 0 : _c.toLowerCase()) !== 'gamehouse') {
                const msgString = '------\n**Please, enter the name of a bot as the first argument! (!displayguildsdata = BOTNAME)**\n------';
                const msgEmbed = new Discord.MessageEmbed();
                msgEmbed
                    .setAuthor(discordUser.userData.userName, (_e = (_d = commandData.guildMember) === null || _d === void 0 ? void 0 : _d.client.users.resolve(discordUser.userData.userID)) === null || _e === void 0 ? void 0 : _e.avatarURL())
                    .setColor([254, 254, 254])
                    .setDescription(msgString)
                    .setTimestamp(Date())
                    .setTitle("__**Invalid Or Missing Arguments:**__");
                let msg = yield HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed);
                if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                    msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                }
                yield msg.delete({ timeout: 20000 });
            }
            if (((_f = commandData.args[0]) === null || _f === void 0 ? void 0 : _f.toLowerCase()) !== 'janny') {
                return commandReturnData;
            }
            const fields = [];
            const field0 = { name: '__Public Bot?:__', value: (_h = (yield ((_g = commandData.guild) === null || _g === void 0 ? void 0 : _g.client.fetchApplication())).botPublic) === null || _h === void 0 ? void 0 : _h.valueOf.toString(), inline: true };
            fields.push(field0);
            const field1 = { name: '__Bot Name:__', value: discordUser.userData.userName, inline: true };
            fields.push(field1);
            const field2 = { name: '__Bot ID:__', value: discordUser.userData.userID, inline: true };
            fields.push(field2);
            const field3 = { name: '__Guild Count:__', value: discordUser.userData.guildCount.toString(), inline: true };
            fields.push(field3);
            const field4 = { name: '__Currency Name:__', value: discordUser.userData.currencyName, inline: true };
            fields.push(field4);
            const field5 = { name: '__Created At:__', value: (_k = (_j = commandData.guild) === null || _j === void 0 ? void 0 : _j.client.user) === null || _k === void 0 ? void 0 : _k.createdAt.toString(), inline: true };
            fields.push(field5);
            const field6 = { name: '__Locale:__', value: (_o = (_m = (_l = commandData.guild) === null || _l === void 0 ? void 0 : _l.client.user) === null || _m === void 0 ? void 0 : _m.locale) === null || _o === void 0 ? void 0 : _o.toString(), inline: true };
            fields.push(field6);
            const field7 = { name: 'Verified?:__', value: (_q = (_p = commandData.guild) === null || _p === void 0 ? void 0 : _p.client.user) === null || _q === void 0 ? void 0 : _q.verified.valueOf.toString(), inline: true };
            fields.push(field7);
            const messageEmbed = new Discord.MessageEmbed()
                .setImage((_s = (_r = commandData.guildMember) === null || _r === void 0 ? void 0 : _r.client.user) === null || _s === void 0 ? void 0 : _s.avatarURL())
                .setColor([254, 254, 254])
                .setTitle('__**Bot Info:**__')
                .setTimestamp(Date());
            messageEmbed.fields = fields;
            yield HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, messageEmbed);
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
