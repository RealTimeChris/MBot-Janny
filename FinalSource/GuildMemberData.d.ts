import FoundationClasses from './FoundationClasses';
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
 * Class representing a single guild member.
 */
export default class GuildMemberData extends FoundationClasses.DiscordEntity {
    readonly id: string;
    readonly guildId: string;
    readonly dataBase: Level | null;
    readonly dataBaseKey: string;
    readonly userName: string;
    readonly displayName: string;
    previousRoleIDs: string[];
    previousPermissionOverwrites: FoundationClasses.PermissionOverwrites[];
    getFromDataBase(): Promise<void>;
    writeToDataBase(): Promise<void>;
    constructor(initData: GuildMemberDataInitData);
}
