// GuildMemberData.ts - Module for my "guild member data" class.
// Apr 5, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict'

import FoundationClasses = require('./FoundationClasses');
import Level from 'level-ts';

/**
 * Class representing the init data for a guild member data structure.
 * 
 */
export interface GuildMemberDataInitData {
    dataBase: Level;
    id: string;
    guildId: string;
    userName: string;
    displayName: string;
}

/**
 * Class representing the values contained within a single guild member.
 */
export interface GuildMemberDataValues {
    id?: string;
    guildId?: string;
    userName?: string;
    displayName?: string;
    previousRoleIDs?: string[];
    previousPermissionOverwrites?: FoundationClasses.PermissionOverwrites[];
}

/**
 * Class representing a single guild member.
 */
export default class GuildMemberData extends FoundationClasses.DiscordEntity {
    protected readonly id: string = '';
    private readonly guildId: string = '';
    private readonly dataBase: Level | null = null;
    private readonly dataBaseKey: string = '';
    private userName: string = '';
    private displayName: string = '';
    private previousRoleIDs: string[] = [];
    private previousPermissionOverwrites: FoundationClasses.PermissionOverwrites[] = [];
    async getFromDataBase(){
        try{
            const guildMemberData = await this.dataBase?.get(this.dataBaseKey) as GuildMemberData;
            this.previousPermissionOverwrites = guildMemberData.previousPermissionOverwrites;
            this.previousRoleIDs = guildMemberData.previousRoleIDs;
            this.displayName = guildMemberData.displayName;
            this.userName = guildMemberData.userName;
        }
        catch(error){
            if (error.type === 'NotFoundError') {
                console.log("No entry found for user by the Id of " + this.id + " creating one!");
                console.log(this);
            }
        }
    }
    async writeToDataBase(){
        if (this.userName === ''){
            const error = new Error();
            error.name = "Non-Initialized Structure";
            error.message = "You've forgotten to initialize the GuildMemberData structure!";
            throw error;
        }
        await this.dataBase?.put(this.dataBaseKey, this);
    }
    exposeDataValues(){
        const dataValues: GuildMemberDataValues = {userName: this.userName, displayName: this.displayName, id: this.id,
             guildId: this.guildId, previousRoleIDs: this.previousRoleIDs, previousPermissionOverwrites: this.previousPermissionOverwrites};
        return dataValues;
    }
    constructor(initData: GuildMemberDataInitData) {
        super();
        const IdRegExp = /\d{17,18}/;
        this.dataBase = initData.dataBase;
        this.id = initData.id.trim();
        this.guildId = initData.guildId.trim();
        this.userName = initData.userName.trim();
        this.displayName = initData.displayName.trim();
        this.dataBaseKey = this.guildId + " + " + this.id;
        if (!IdRegExp.test(this.id)|| !IdRegExp.test(this.guildId)){
            const error = new Error();
            error.name = "Guild Member Id and/or Guild Id Issue";
            error.message = "You've passed an invalid guild member Id and/or guild Id to the constructor:\n" + this.id + "\n" + this.guildId;
            this.dataBase.del(this.dataBaseKey);
            throw error;
        }
    }
}
