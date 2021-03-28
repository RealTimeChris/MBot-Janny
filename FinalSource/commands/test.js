// test.ts - Module for my testing stuff.
// Feb 4, 2021
// Chris M.
// https://github.com/RealTimeChriss
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
exports.execute = void 0;
var DiscordStuff = require("../DiscordStuff.js");
var slash_commands_1 = require("slash-commands");
var SlashCommands = require("slash-commands");
var command = new DiscordStuff.BotCommand();
command.name = 'test';
command.description = '!test';
function execute(message, args, discordUser) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var interaction, appCommands, x, isItDeleted, ghostCommand, ghostCommandResult, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 7, , 8]);
                    if (message.deletable) {
                    }
                    interaction = new slash_commands_1.DiscordInteractions({ applicationId: discordUser.userData.clientID, authToken: discordUser.userData.botToken, publicKey: discordUser.userData.publicKey, });
                    return [4 /*yield*/, interaction.getApplicationCommands()];
                case 1:
                    appCommands = _b.sent();
                    x = 0;
                    _b.label = 2;
                case 2:
                    if (!(x < appCommands.length)) return [3 /*break*/, 5];
                    return [4 /*yield*/, interaction.deleteApplicationCommand((_a = appCommands[x]) === null || _a === void 0 ? void 0 : _a.id)];
                case 3:
                    isItDeleted = _b.sent();
                    console.log(isItDeleted);
                    _b.label = 4;
                case 4:
                    x += 1;
                    return [3 /*break*/, 2];
                case 5:
                    ghostCommand = {
                        "name": "ghost",
                        "desctription": "Mutes and silences the user across the entire server.",
                        "options": [
                            {
                                "name": "user",
                                "description": "The user to ghost",
                                "type": SlashCommands.ApplicationCommandOptionType.USER,
                                "required": true
                            },
                            {
                                "name": "user",
                                "description": "The user to unghost",
                                "type": SlashCommands.ApplicationCommandOptionType.USER,
                                "required": true
                            }
                        ]
                    };
                    return [4 /*yield*/, interaction.createApplicationCommand(ghostCommand).catch(function (error) {
                            console.log(error);
                        })];
                case 6:
                    ghostCommandResult = _b.sent();
                    console.log(ghostCommandResult.name);
                    console.log(ghostCommandResult.description);
                    return [2 /*return*/, command.name];
                case 7:
                    error_1 = _b.sent();
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            reject(error_1);
                        })];
                case 8: return [2 /*return*/];
            }
        });
    });
}
exports.execute = execute;
command.function = execute;
exports.default = command;
