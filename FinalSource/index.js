// Index.ts - The main entry point for my Discord Bot!
// Jan 28, 2021
// Chris M.s
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
const events_1 = __importDefault(require("events"));
const IndexFunctions_1 = __importDefault(require("./IndexFunctions"));
const DiscordUser_1 = __importDefault(require("./DiscordUser"));
const config = require("./config.json");
const discordUser = new DiscordUser_1.default();
const client = new Discord.Client();
const eventEmitter = new events_1.default();
eventEmitter.on('HeartBeat', () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('HeartBeat emitted and captured!');
    setTimeout(() => {
        eventEmitter.emit('HeartBeat');
    }, 60000);
    yield IndexFunctions_1.default.onHeartBeat(client, discordUser);
}));
client.once('ready', () => __awaiter(void 0, void 0, void 0, function* () {
    yield IndexFunctions_1.default.onReady(client, discordUser, eventEmitter);
}));
client.on('message', (msg) => __awaiter(void 0, void 0, void 0, function* () {
    yield IndexFunctions_1.default.onMessage(msg, client, discordUser);
}));
client.ws.on('INTERACTION_CREATE', (interaction) => __awaiter(void 0, void 0, void 0, function* () {
    yield IndexFunctions_1.default.onInteractionCreate(interaction, client, discordUser);
}));
client.on('channelCreate', (newChannel) => __awaiter(void 0, void 0, void 0, function* () {
    yield IndexFunctions_1.default.onChannelCreate(newChannel, client, discordUser);
}));
client.on('messageReactionAdd', (messageReaction, user) => __awaiter(void 0, void 0, void 0, function* () {
    yield IndexFunctions_1.default.onMessageReactionAdd(messageReaction, user, client, discordUser);
}));
client.on('guildDelete', (guild) => __awaiter(void 0, void 0, void 0, function* () {
    yield IndexFunctions_1.default.onGuildDete(guild, discordUser);
}));
client.on('guildBanAdd', (guild, user) => __awaiter(void 0, void 0, void 0, function* () {
    yield IndexFunctions_1.default.onGuildBanAdd(guild, client, user, discordUser);
}));
client.on('guildBanRemove', (guild, user) => __awaiter(void 0, void 0, void 0, function* () {
    yield IndexFunctions_1.default.onGuildBanRemove(guild, client, user, discordUser);
}));
client.on('guildMemberAdd', (member) => __awaiter(void 0, void 0, void 0, function* () {
    yield IndexFunctions_1.default.onGuildMemberAdd(member, client, discordUser);
}));
client.on('guildMemberRemove', (member) => __awaiter(void 0, void 0, void 0, function* () {
    yield IndexFunctions_1.default.onGuildMemberRemove(member, client, discordUser);
}));
client.on('guildMemberUpdate', (oldGuildMember, newGuildMember) => __awaiter(void 0, void 0, void 0, function* () {
    yield IndexFunctions_1.default.onGuildMemberUpdate(oldGuildMember, newGuildMember, client, discordUser);
}));
client.on('inviteCreate', (invite) => __awaiter(void 0, void 0, void 0, function* () {
    yield IndexFunctions_1.default.onInviteCreate(invite, client, discordUser);
}));
client.on('messageDelete', (message) => __awaiter(void 0, void 0, void 0, function* () {
    yield IndexFunctions_1.default.onMessageDelete(message, client, discordUser);
}));
client.on('messageDeleteBulk', (collection) => __awaiter(void 0, void 0, void 0, function* () {
    yield IndexFunctions_1.default.onMessageDeleteBulk(collection, client, discordUser);
}));
client.on('roleCreate', (role) => __awaiter(void 0, void 0, void 0, function* () {
    yield IndexFunctions_1.default.onRoleCreate(role, client, discordUser);
}));
client.on('roleDelete', (role) => __awaiter(void 0, void 0, void 0, function* () {
    yield IndexFunctions_1.default.onRoleDelete(role, client, discordUser);
}));
client.on('userUpdate', (oldUser, newUser) => __awaiter(void 0, void 0, void 0, function* () {
    yield IndexFunctions_1.default.onUserUpdate(oldUser, newUser, client, discordUser);
}));
client.login(config.botToken);
