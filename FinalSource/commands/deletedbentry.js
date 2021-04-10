// deletedbentry.ts - Module for my "delete db entry" command.
// Mar 18, 2021
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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Discord = __importStar(require("discord.js"));
const GuildData_1 = __importDefault(require("../GuildData"));
const HelperFunctions_1 = __importDefault(require("../HelperFunctions"));
class Data {
    constructor() {
        this.key = '';
    }
}
class DeletedCounter {
    constructor() {
        this.deletedCount = 0;
        this.data = new Data();
    }
    setData(key, value) {
        const newData = new Data();
        newData.key = key;
        newData.value = value;
        this.data = newData;
    }
    getData() {
        return this.data;
    }
    incrementDeletedCount() {
        this.deletedCount += 1;
    }
    returnDeletedCount() {
        return this.deletedCount;
    }
}
function onData(dbKey, discordUser, deletedCounter) {
    return __awaiter(this, void 0, void 0, function* () {
        if (deletedCounter.getData() !== undefined && dbKey !== '') {
            if (deletedCounter.getData().key.includes(dbKey)) {
                try {
                    console.log(deletedCounter.getData().key, '=', deletedCounter.getData().value);
                    yield discordUser.dataBase.del(deletedCounter.getData().key);
                    deletedCounter.incrementDeletedCount();
                }
                catch (error) {
                    if (error.message.includes('Unexpected token')) {
                        yield discordUser.dataBase.del(deletedCounter.getData().key);
                        deletedCounter.incrementDeletedCount();
                    }
                }
            }
        }
    });
}
const command = {
    name: 'deletedbentry',
    description: "!deletedbentry = BOTNAME, DBENTRYKEY, where BOTNAME is a bot's name and DBENTRYKEY is the key" +
        "to a database entry that is stored within the bot!",
    function: Function()
};
function execute(commandData, discordUser) {
    var e_1, _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const commandReturnData = {
                commandName: command.name
            };
            const areWeInADM = yield HelperFunctions_1.default.areWeInADM(commandData);
            if (areWeInADM) {
                return commandReturnData;
            }
            const areWeACommander = yield HelperFunctions_1.default.doWeHaveAdminPermission(commandData, discordUser);
            if (!areWeACommander) {
                return commandReturnData;
            }
            const guildData = new GuildData_1.default({ dataBase: discordUser.dataBase, id: commandData.guild.id, name: commandData.guild.name, memberCount: commandData.guild.memberCount });
            yield guildData.getFromDataBase();
            if (commandData.args[0] === undefined) {
                const msgString = `------\n**Please, enter a bot to delete the key from! (!deletedbentry = BOTNAME, DBENTRYKEY)**\n------`;
                let msgEmbed = new Discord.MessageEmbed()
                    .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                    .setColor(guildData.borderColor)
                    .setDescription(msgString)
                    .setTimestamp(Date())
                    .setTitle('__**Missing Or Invalid Arguments:**__');
                let msg = yield HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed);
                if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                    msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                }
                yield msg.delete({ timeout: 20000 });
                return commandReturnData;
            }
            if (commandData.args[0].toLowerCase() !== 'janny' && commandData.args[0].toLowerCase() !== 'musichouse' && commandData.args[0].toLowerCase() !== 'gamehouse') {
                const msgString = `------\n**Please, enter a bot to delete the key from! (!deletedbentry = BOTNAME, DBENTRYKEY)**\n------`;
                let msgEmbed = new Discord.MessageEmbed()
                    .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                    .setColor(guildData.borderColor)
                    .setDescription(msgString)
                    .setTimestamp(Date())
                    .setTitle('__**Missing Or Invalid Arguments:**__');
                let msg = yield HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed);
                if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                    msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                }
                yield msg.delete({ timeout: 20000 });
                return commandReturnData;
            }
            if (commandData.args[0].toLowerCase() !== 'janny') {
                return commandReturnData;
            }
            if (commandData.args[1] === undefined) {
                const msgString = `------\n**Please, enter a DB key to search for!**\n------`;
                let msgEmbed = new Discord.MessageEmbed()
                    .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                    .setColor(guildData.borderColor)
                    .setDescription(msgString)
                    .setTimestamp(Date())
                    .setTitle('__**Missing Or Invalid Arguments:**__');
                let msg = yield HelperFunctions_1.default.sendMessageWithCorrectChannel(commandData, msgEmbed);
                if (commandData.toTextChannel instanceof Discord.WebhookClient) {
                    msg = new Discord.Message(commandData.guild.client, msg, commandData.fromTextChannel);
                }
                yield msg.delete({ timeout: 20000 });
                return commandReturnData;
            }
            let dbKey = '';
            if (commandData.args[1] !== undefined) {
                const argZero = commandData.args[1].toString();
                dbKey = argZero;
            }
            const deletedCounter = new DeletedCounter();
            const iterator = discordUser.dataBase.iterate({});
            try {
                for (var iterator_1 = __asyncValues(iterator), iterator_1_1; iterator_1_1 = yield iterator_1.next(), !iterator_1_1.done;) {
                    const { key, value } = iterator_1_1.value;
                    console.log(key + ' = ' + value);
                    if (key.includes(dbKey)) {
                        deletedCounter.setData(key, value);
                        yield onData(dbKey, discordUser, deletedCounter);
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (iterator_1_1 && !iterator_1_1.done && (_a = iterator_1.return)) yield _a.call(iterator_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            yield iterator.end();
            const msgEmbed = new Discord.MessageEmbed();
            msgEmbed
                .setAuthor(commandData.guildMember.user.username, commandData.guildMember.user.avatarURL())
                .setColor(guildData.borderColor)
                .setDescription(`------\n__**Number of Deleted Entries**__: ${deletedCounter.returnDeletedCount()}\n------`)
                .setTimestamp(Date.now())
                .setTitle('__**Deleted DB Entries:**__');
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
