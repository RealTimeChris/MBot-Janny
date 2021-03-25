// serverinfo.js - Module file for my display server info command.
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
var Discord = require('discord.js');
module.exports = {
    name: 'serverinfo',
    description: '!serverinfo to get info about the current server!\n!serverinfo = SERVERID to display info about that server!',
    /**
     * Displays the info of a chosen server.
     * @param {Discord.Message}             message
     * @param {String[]}                    args
     * @param {DiscordStuff.DiscordUser}    discordUser
     * @returns {String}
     */
    execute: function (message, args) {
        return __awaiter(this, void 0, void 0, function () {
            var idRegExp, currentServerID, argZero, serverArray, currentServer, x, categoryCount, voiceChannelCount, textChannelCount, x, fields, field1, field2, field3, field4, field5, field6, field7, field8, field9, field10, field11, messageEmbed, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 16, , 17]);
                        idRegExp = /\d{18}/;
                        currentServerID = void 0;
                        if (!(args[0] === undefined && message.channel.type !== 'dm')) return [3 /*break*/, 1];
                        currentServerID = message.guild.id;
                        return [3 /*break*/, 8];
                    case 1:
                        if (!(args[0] === undefined && message.channel.type === 'dm')) return [3 /*break*/, 3];
                        return [4 /*yield*/, message.reply('Please enter a valid server ID! (!displayserverinfo = SERVERID)')];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, this.name];
                    case 3:
                        if (!!idRegExp.test(args[0])) return [3 /*break*/, 7];
                        return [4 /*yield*/, message.reply('Please enter a valid server ID! (!displayserverinfo = SERVERID)')];
                    case 4:
                        _a.sent();
                        if (!(message.channel.type !== 'dm')) return [3 /*break*/, 6];
                        return [4 /*yield*/, message.delete()];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6: return [2 /*return*/, this.name];
                    case 7:
                        argZero = args[0];
                        currentServerID = argZero;
                        _a.label = 8;
                    case 8:
                        serverArray = [new Discord.Guild()];
                        serverArray = message.client.guilds.cache.array().sort();
                        currentServer = null;
                        for (x = 0; x < serverArray.length; x += 1) {
                            if (currentServerID === serverArray[x].id) {
                                currentServer = serverArray[x];
                            }
                        }
                        if (!(currentServer == null)) return [3 /*break*/, 12];
                        return [4 /*yield*/, message.reply('Sorry! No matching servers were found!')];
                    case 9:
                        _a.sent();
                        if (!(message.channel.type !== 'dm')) return [3 /*break*/, 11];
                        return [4 /*yield*/, message.delete()];
                    case 10:
                        _a.sent();
                        _a.label = 11;
                    case 11: return [2 /*return*/, this.name];
                    case 12:
                        categoryCount = 0;
                        voiceChannelCount = 0;
                        textChannelCount = 0;
                        for (x = 0; x < currentServer.channels.cache.size; x += 1) {
                            if (currentServer.channels.cache.array()[x].type === 'voice') {
                                voiceChannelCount += 1;
                            }
                            if (currentServer.channels.cache.array()[x].type === 'text') {
                                textChannelCount += 1;
                            }
                            if (currentServer.channels.cache.array()[x].type === 'category') {
                                categoryCount += 1;
                            }
                        }
                        fields = [];
                        field1 = { name: '__Server Name:__', value: currentServer.name, inline: true };
                        fields.push(field1);
                        field2 = { name: '__Server ID:__', value: currentServer.id, inline: true };
                        fields.push(field2);
                        field3 = { name: '__Server Member Count:__', value: currentServer.memberCount, inline: true };
                        fields.push(field3);
                        field4 = { name: '__Server Owner:__', value: "<@!" + currentServer.owner.user.id + "> (" + currentServer.owner.user.tag + ")", inline: true };
                        fields.push(field4);
                        field5 = { name: '__Server Owner ID:__', value: currentServer.ownerID, inline: true };
                        fields.push(field5);
                        field6 = { name: '__Role Count:__', value: currentServer.roles.cache.size, inline: true };
                        fields.push(field6);
                        field7 = { name: '__Channel Category Count:__', value: categoryCount, inline: true };
                        fields.push(field7);
                        field8 = { name: '__Text Channel Count:__', value: textChannelCount, inline: true };
                        fields.push(field8);
                        field9 = { name: '__Voice Channel Count:__', value: voiceChannelCount, inline: true };
                        fields.push(field9);
                        field10 = { name: '__Created At:__', value: currentServer.createdAt, inline: true };
                        fields.push(field10);
                        field11 = { name: '__Region:__', value: currentServer.region, inline: true };
                        fields.push(field11);
                        messageEmbed = new Discord.MessageEmbed()
                            .setImage(currentServer.iconURL())
                            .setTitle('__**Server Info:**__')
                            .setTimestamp(Date())
                            .setAuthor(message.author.username, message.author.avatarURL())
                            .setColor([0, 0, 255]);
                        messageEmbed.fields = fields;
                        return [4 /*yield*/, message.channel.send(messageEmbed)];
                    case 13:
                        _a.sent();
                        if (!(message.channel.type !== 'dm')) return [3 /*break*/, 15];
                        return [4 /*yield*/, message.delete()];
                    case 14:
                        _a.sent();
                        _a.label = 15;
                    case 15: return [2 /*return*/, this.name];
                    case 16:
                        error_1 = _a.sent();
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                reject(error_1);
                            })];
                    case 17: return [2 /*return*/];
                }
            });
        });
    },
};
