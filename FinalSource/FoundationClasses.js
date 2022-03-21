// FoundationClasses.ts - Module for my "builder classes".
// Apr 5, 2021
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
var Discord = require("discord.js");
var FoundationClasses;
(function (FoundationClasses) {
    /**
    * Base abstract class for Discord classes.
    */
    var DiscordEntity = /** @class */ (function () {
        function DiscordEntity() {
        }
        return DiscordEntity;
    }());
    FoundationClasses.DiscordEntity = DiscordEntity;
    /**
    * Class representing the data that goes into a command.
    */
    var CommandData = /** @class */ (function () {
        function CommandData() {
            this.args = [];
            this.fromTextChannel = null;
            this.fromTextChannelType = '';
            this.guild = null;
            this.guildMember = null;
            this.interaction = null;
            this.permsChannel = null;
            this.toTextChannel = null;
        }
        CommandData.prototype.initialize = function (client, fromTextChannelID, fromTextChannelType, interaction, guildMemberID, guildID) {
            if (interaction === void 0) { interaction = null; }
            if (guildMemberID === void 0) { guildMemberID = ''; }
            if (guildID === void 0) { guildID = ''; }
            return __awaiter(this, void 0, void 0, function () {
                var _a, _b, _c, _d, _e, _f, _g, _h, _j, error_1;
                return __generator(this, function (_k) {
                    switch (_k.label) {
                        case 0:
                            _k.trys.push([0, 16, , 17]);
                            this.fromTextChannelType = fromTextChannelType;
                            _a = this;
                            return [4 /*yield*/, client.channels.fetch(fromTextChannelID)];
                        case 1:
                            _a.fromTextChannel = (_k.sent());
                            if (interaction !== null) {
                                this.interaction = interaction;
                            }
                            if (!(guildID !== '')) return [3 /*break*/, 3];
                            _b = this;
                            return [4 /*yield*/, client.guilds.fetch(guildID)];
                        case 2:
                            _b.guild = _k.sent();
                            _k.label = 3;
                        case 3:
                            if (!(guildMemberID !== '' && guildID !== '')) return [3 /*break*/, 5];
                            _c = this;
                            return [4 /*yield*/, this.guild.members.fetch(guildMemberID)];
                        case 4:
                            _c.guildMember = _k.sent();
                            return [3 /*break*/, 7];
                        case 5:
                            _d = this;
                            return [4 /*yield*/, client.users.fetch(guildMemberID)];
                        case 6:
                            _d.guildMember = _k.sent();
                            _k.label = 7;
                        case 7:
                            if (interaction !== null && fromTextChannelType !== 'dm') {
                                this.toTextChannel = new Discord.WebhookClient(client.user.id, this.interaction.token);
                                this.permsChannel = new Discord.GuildChannel(this.guild, this.fromTextChannel);
                            }
                            if (!(interaction === null && fromTextChannelType !== 'dm')) return [3 /*break*/, 10];
                            _e = this;
                            return [4 /*yield*/, client.channels.fetch(fromTextChannelID)];
                        case 8:
                            _e.toTextChannel = (_k.sent());
                            _f = this;
                            return [4 /*yield*/, client.channels.fetch(fromTextChannelID)];
                        case 9:
                            _f.permsChannel = (_k.sent());
                            _k.label = 10;
                        case 10:
                            if (!(interaction !== null && fromTextChannelType === 'dm')) return [3 /*break*/, 12];
                            this.toTextChannel = new Discord.WebhookClient(client.user.id, this.interaction.token);
                            _g = this;
                            return [4 /*yield*/, client.channels.fetch(fromTextChannelID)];
                        case 11:
                            _g.permsChannel = (_k.sent());
                            _k.label = 12;
                        case 12:
                            if (!(interaction === null && fromTextChannelType === 'dm')) return [3 /*break*/, 15];
                            _h = this;
                            return [4 /*yield*/, this.guildMember.createDM(true)];
                        case 13:
                            _h.toTextChannel = _k.sent();
                            _j = this;
                            return [4 /*yield*/, client.channels.fetch(fromTextChannelID)];
                        case 14:
                            _j.permsChannel = (_k.sent());
                            _k.label = 15;
                        case 15: return [2 /*return*/];
                        case 16:
                            error_1 = _k.sent();
                            return [2 /*return*/, new Promise(function (resolve, reject) {
                                    reject(error_1);
                                })];
                        case 17: return [2 /*return*/];
                    }
                });
            });
        };
        return CommandData;
    }());
    FoundationClasses.CommandData = CommandData;
})(FoundationClasses || (FoundationClasses = {}));
exports.default = FoundationClasses;
