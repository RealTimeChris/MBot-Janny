// onguilddelete.ts - Module for my "on guild delete" command.
// Feb 22, 2021
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
const DiscordUser_1 = __importDefault(require("../DiscordUser"));
const command = {
    name: 'onguilddelete',
    description: "It's an automatic one!",
    function: Function()
};
function execute(guild, discordUser) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const commandReturnData = {
                commandName: command.name
            };
            if (!(discordUser instanceof DiscordUser_1.default)) {
                return commandReturnData;
            }
            const serverRecordKey = `${guild.id} + Record`;
            const serverRecordObject = yield discordUser.dataBase.get(serverRecordKey);
            if (serverRecordObject.replacementServerInvite.length >= 2) {
                discordUser.userData.activeInviteGuilds.push(guild.id);
                discordUser.updateUserDataInDB(discordUser.userData);
            }
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
