import Level from 'level-ts';
import FoundationClasses from './FoundationClasses';
/**
 * Class representing the startup values of a guild data structure.
 */
interface GuildDataInitData {
    dataBase: Level;
    id: string;
    memberCount: number;
    name: string;
}
/**
 * Class representing a single guild/server.
 */
export default class GuildData extends FoundationClasses.DiscordEntity {
    static readonly guildsData: Map<string, GuildData>;
    readonly dataBase: Level;
    readonly dataBaseKey: string;
    readonly guildName: string;
    readonly id: string;
    readonly memberCount: number;
    borderColor: [number, number, number];
    defaultRoleIDs: string[];
    deletionChannels: FoundationClasses.DeletionChannel[];
    ghostedRoleID: string;
    logs: FoundationClasses.Log[];
    timedMessages: FoundationClasses.TimedMessage[];
    trackedUsers: FoundationClasses.TrackedUser[];
    verificationSystem: FoundationClasses.VerificationSystem;
    getFromDataBase(): Promise<void>;
    writeToDataBase(): Promise<void>;
    constructor(initData: GuildDataInitData);
}
export {};
