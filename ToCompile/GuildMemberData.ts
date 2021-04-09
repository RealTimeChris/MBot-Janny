// GuildMemberData.ts - Module for my "guild member data" class.
// Apr 5, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

import Level from 'level-ts';
import FoundationClasses from './FoundationClasses';

/**
 * Class representing the init data for a guild member data structure.
 */
interface GuildMemberDataInitData {
    dataBase: Level;
    displayName: string;
    guildId: string;
    id: string;
    userName: string;
}

/**
 * Class representing a single guild member.
 */
export default class GuildMemberData extends FoundationClasses.DiscordEntity {
    public static readonly guildMembersData: Map<string, GuildMemberData> = new Map<string, GuildMemberData>();
    public readonly dataBase: Level;
    public readonly dataBaseKey: string;
    public readonly displayName: string;
    public readonly guildId: string;
    public readonly id: string;
    public readonly userName: string;
    public previousPermissionOverwrites: FoundationClasses.PermissionOverwrites[] = [];
    public previousRoleIDs: string[] = [];
    
    public async getFromDataBase(): Promise<void> {
        try{
            const guildMemberData = await this.dataBase.get(this.dataBaseKey) as GuildMemberData;
            this.previousPermissionOverwrites = guildMemberData.previousPermissionOverwrites;
            this.previousRoleIDs = guildMemberData.previousRoleIDs;
        }
        catch(error) {
            if (error.type === 'NotFoundError') {
                console.log(`No entry found for user by the Id of ${this.id} with name ${this.userName}, creating one!`);
                console.log(this);
            }
        }
    }
    public async writeToDataBase(): Promise<void> {
        if (this.userName === ''|| this.displayName === '') {
            const error = new Error();
            error.name = "Non-Initialized Structure";
            error.message = "You've forgotten to initialize the GuildMemberData structure!";
            throw error;
        }
        await this.dataBase.put(this.dataBaseKey, this);
        GuildMemberData.guildMembersData.set(this.dataBaseKey, this);
    }
    constructor(initData: GuildMemberDataInitData) {
        super();
        const IdRegExp = /\d{17,18}/;
        this.dataBase = initData.dataBase;
        this.displayName = initData.displayName.trim();
        this.guildId = initData.guildId.trim();
        this.id = initData.id.trim();
        this.userName = initData.userName.trim();
        if (!IdRegExp.test(this.id)|| !IdRegExp.test(this.guildId)) {
            const error = new Error();
            error.name = "Guild Member Id and/or Guild Id Issue";
            error.message = "You've passed an invalid guild member Id and/or guild Id to the constructor:\n" + this.id + "\n" + this.guildId;
            throw error;
        }
        this.dataBaseKey = this.guildId + " + " + this.id;
    }
}
