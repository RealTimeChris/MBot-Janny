// GuildMemberData.ts - Module for my "guild member data" class.
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const FoundationClasses_1 = __importDefault(require("./FoundationClasses"));
/**
 * Class representing a single guild member.
 */
class GuildMemberData extends FoundationClasses_1.default.DiscordEntity {
    constructor(initData) {
        super();
        this.previousPermissionOverwrites = [];
        this.previousRoleIDs = [];
        const IdRegExp = /\d{17,18}/;
        this.dataBase = initData.dataBase;
        this.displayName = initData.displayName.trim();
        this.guildId = initData.guildId.trim();
        this.id = initData.id.trim();
        this.userName = initData.userName.trim();
        if (!IdRegExp.test(this.id) || !IdRegExp.test(this.guildId)) {
            const error = new Error();
            error.name = "Guild Member Id and/or Guild Id Issue";
            error.message = "You've passed an invalid guild member Id and/or guild Id to the constructor:\n" + this.id + "\n" + this.guildId;
            throw error;
        }
        this.dataBaseKey = this.guildId + " + " + this.id;
    }
    getFromDataBase() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const guildMemberData = yield this.dataBase.get(this.dataBaseKey);
                this.previousPermissionOverwrites = guildMemberData.previousPermissionOverwrites;
                this.previousRoleIDs = guildMemberData.previousRoleIDs;
            }
            catch (error) {
                if (error.type === 'NotFoundError') {
                    console.log(`No entry found for user by the Id of ${this.id} with name ${this.userName}, creating one!`);
                    console.log(this);
                }
            }
        });
    }
    writeToDataBase() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.userName === '' || this.displayName === '') {
                const error = new Error();
                error.name = "Non-Initialized Structure";
                error.message = "You've forgotten to initialize the GuildMemberData structure!";
                throw error;
            }
            yield this.dataBase.put(this.dataBaseKey, this);
            GuildMemberData.guildMembersData.set(this.dataBaseKey, this);
        });
    }
}
exports.default = GuildMemberData;
GuildMemberData.guildMembersData = new Map();
