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
    protected readonly id: string;
    private readonly guildId;
    private readonly dataBase;
    private readonly dataBaseKey;
    private userName;
    private displayName;
    private previousRoleIDs;
    private previousPermissionOverwrites;
    getFromDataBase(): Promise<void>;
    writeToDataBase(): Promise<void>;
    exposeDataValues(): GuildMemberDataValues;
    constructor(initData: GuildMemberDataInitData);
}
