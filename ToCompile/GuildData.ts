// GuildData.ts - Module for my "guild data" class.
// Apr 6, 2021
// Chris M.
// https://github.com/RealTimeChris

'use strict';

import FoundationClasses from './FoundationClasses';
import Level from 'level-ts';

/**
 * Class representing the startup values of a guild data structure.
 */
export interface GuildDataInitData {
    dataBase: Level;
    id: string;
    memberCount: number;
    name: string;
}

/**
 * Class representing a single guild/server.
 */
export default class GuildData extends FoundationClasses.DiscordEntity {
    public static guildsData: Map<string, GuildData> = new Map<string, GuildData>();
    readonly dataBase: Level | null = null;
    readonly dataBaseKey: string = '';
    readonly guildName: string = '';
    readonly id: string = '';
    readonly memberCount: number = 0;
    borderColor: [number, number, number] = [254, 254, 254];
    defaultRoleIDs: string[] = [];
    deletionChannels:FoundationClasses.DeletionChannel[] = [];
    ghostedRoleID: string = '';
    logs: FoundationClasses.Log[] = [];
    timedMessages: FoundationClasses.TimedMessage[] = [];
    trackedUsers: FoundationClasses.TrackedUser[] = [];
    verificationSystem: FoundationClasses.VerificationSystem = {channelID: '', emoji: '', messageID: ''};
    
    async getFromDataBase(): Promise<void> {
        try{
            const guildData = await this.dataBase?.get(this.dataBaseKey) as GuildData;
            this.borderColor = guildData.borderColor;
            this.defaultRoleIDs = guildData.defaultRoleIDs;
            this.deletionChannels = guildData.deletionChannels;
            this.ghostedRoleID = guildData.ghostedRoleID;
            this.logs = guildData.logs;
            this.timedMessages = guildData.timedMessages;
            this.trackedUsers = guildData.trackedUsers;
            this.verificationSystem = guildData.verificationSystem;
        }
        catch(error){
            if (error.type === 'NotFoundError') {
                console.log(`No entry found for guild by the Id of ${this.id} with name of ${this.guildName}, creating one!`);
                console.log(this);
            }
        }
    }
    async writeToDataBase(): Promise<void> {
        if (this.guildName === ''){
            const error = new Error();
            error.name = "Non-Initialized Structure";
            error.message = "You've forgotten to initialize the GuildData structure!";
            throw error;
        }
        console.log('Updating database values for guild: ' + this.guildName);
        await this.dataBase?.put(this.dataBaseKey, this);
        GuildData.guildsData.set(this.dataBaseKey, this);
    }
    constructor(initData: GuildDataInitData) {
        super();
        const IdRegExp = /\d{17,18}/;
        this.dataBase = initData.dataBase;
        this.guildName = initData.name.trim();
        this.id = initData.id.trim();
        this.memberCount = initData.memberCount;
        if (!IdRegExp.test(this.id)){
            const error = new Error();
            error.name = "Guild Id Issue";
            error.message = "You've passed an invalid guild Id to the constructor:\n" + this.id;
            this.dataBase.del(this.dataBaseKey);
            throw error;
        }
        this.dataBaseKey = this.id;
        this.logs[0] = {name: '', nameSmall:'', enabled: false, loggingChannelID: '', loggingChannelName: ''};
        this.logs[0]!.name = 'Guild Ban Add';
        this.logs[0]!.nameSmall = 'guildbanadd';
        this.logs[1] = {name: '', nameSmall:'', enabled: false, loggingChannelID: '', loggingChannelName: ''};
        this.logs[1]!.name = 'Guild Ban Remove';
        this.logs[1]!.nameSmall = 'guildbanremove';
        this.logs[2] = {name: '', nameSmall:'', enabled: false, loggingChannelID: '', loggingChannelName: ''};
        this.logs[2]!.name = 'Guild Member Add';
        this.logs[2]!.nameSmall = 'guildmemberadd';
        this.logs[3] = {name: '', nameSmall:'', enabled: false, loggingChannelID: '', loggingChannelName: ''};
        this.logs[3]!.name = 'Guild Member Remove';
        this.logs[3]!.nameSmall = 'guildmemberremove';
        this.logs[4] = {name: '', nameSmall:'', enabled: false, loggingChannelID: '', loggingChannelName: ''};
        this.logs[4]!.name = 'Display Name Change';
        this.logs[4]!.nameSmall = 'displaynamechange';
        this.logs[5] = {name: '', nameSmall:'', enabled: false, loggingChannelID: '', loggingChannelName: ''};
        this.logs[5]!.name = 'Nickname Change';
        this.logs[5]!.nameSmall = 'nicknamechange';
        this.logs[6] = {name: '', nameSmall:'', enabled: false, loggingChannelID: '', loggingChannelName: ''};
        this.logs[6]!.name = 'Role Add Or Remove';
        this.logs[6]!.nameSmall = 'roleaddorremove';
        this.logs[7] = {name: '', nameSmall:'', enabled: false, loggingChannelID: '', loggingChannelName: ''};
        this.logs[7]!.name = 'Invite Create';
        this.logs[7]!.nameSmall = 'invitecreate';
        this.logs[8] = {name: '', nameSmall:'', enabled: false, loggingChannelID: '', loggingChannelName: ''};
        this.logs[8]!.name = 'Message Delete';
        this.logs[8]!.nameSmall = 'messagedelete';
        this.logs[9] = {name: '', nameSmall:'', enabled: false, loggingChannelID: '', loggingChannelName: ''};
        this.logs[9]!.name = 'Message Delete Bulk';
        this.logs[9]!.nameSmall = 'messagedeletebulk';
        this.logs[10] = {name: '', nameSmall:'', enabled: false, loggingChannelID: '', loggingChannelName: ''};
        this.logs[10]!.name = 'Role Create';
        this.logs[10]!.nameSmall = 'rolecreate';
        this.logs[11] = {name: '', nameSmall:'', enabled: false, loggingChannelID: '', loggingChannelName: ''};
        this.logs[11]!.name = 'Role Delete';
        this.logs[11]!.nameSmall = 'roledelete';
        this.logs[12] = {name: '', nameSmall:'', enabled: false, loggingChannelID: '', loggingChannelName: ''};
        this.logs[12]!.name = 'Username Change';
        this.logs[12]!.nameSmall = 'usernamechange';
    }
}
