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
Object.defineProperty(exports, "__esModule", { value: true });
const Discord = require("discord.js");
var FoundationClasses;
(function (FoundationClasses) {
    /**
    * Base abstract class for Discord classes.
    */
    class DiscordEntity {
    }
    FoundationClasses.DiscordEntity = DiscordEntity;
    /**
    * Class representing the data that goes into a command.
    */
    class CommandData {
        constructor() {
            this.args = [];
            this.fromTextChannel = null;
            this.fromTextChannelType = '';
            this.guild = null;
            this.guildMember = null;
            this.interaction = null;
            this.permsChannel = null;
            this.toTextChannel = null;
        }
        initialize(client, fromTextChannelID, fromTextChannelType, interaction = null, guildMemberID = '', guildID = '') {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    this.fromTextChannelType = fromTextChannelType;
                    this.fromTextChannel = (yield client.channels.fetch(fromTextChannelID));
                    if (interaction !== null) {
                        this.interaction = interaction;
                    }
                    if (guildID !== '') {
                        this.guild = yield client.guilds.fetch(guildID);
                    }
                    if (guildMemberID !== '' && guildID !== '') {
                        this.guildMember = yield this.guild.members.fetch(guildMemberID);
                    }
                    else {
                        this.guildMember = yield client.users.fetch(guildMemberID);
                    }
                    if (interaction !== null && fromTextChannelType !== 'dm') {
                        this.toTextChannel = new Discord.WebhookClient(client.user.id, this.interaction.token);
                        this.permsChannel = new Discord.GuildChannel(this.guild, this.fromTextChannel);
                    }
                    if (interaction === null && fromTextChannelType !== 'dm') {
                        this.toTextChannel = (yield client.channels.fetch(fromTextChannelID));
                        this.permsChannel = (yield client.channels.fetch(fromTextChannelID));
                    }
                    if (interaction !== null && fromTextChannelType === 'dm') {
                        this.toTextChannel = new Discord.WebhookClient(client.user.id, this.interaction.token);
                        this.permsChannel = (yield client.channels.fetch(fromTextChannelID));
                    }
                    if (interaction === null && fromTextChannelType === 'dm') {
                        this.toTextChannel = yield this.guildMember.createDM(true);
                        this.permsChannel = (yield client.channels.fetch(fromTextChannelID));
                    }
                    return;
                }
                catch (error) {
                    return new Promise((resolve, reject) => {
                        reject(error);
                    });
                }
            });
        }
    }
    FoundationClasses.CommandData = CommandData;
})(FoundationClasses || (FoundationClasses = {}));
exports.default = FoundationClasses;
