import FoundationClasses from './FoundationClasses';
import Level from 'level-ts';
/**
 * Class representing the startup values of a guild data structure.
 */
export interface GuildDataInitData {
    dataBase: Level;
    id: string;
    name: string;
    memberCount: number;
}
/**
 * Class representing a single guild/server.
 */
export default class GuildData extends FoundationClasses.DiscordEntity {
    readonly id: string;
    readonly dataBase: Level | null;
    readonly dataBaseKey: string;
    readonly guildName: string;
    readonly memberCount: number;
    borderColor: [number, number, number];
    trackedUsers: FoundationClasses.TrackedUser[];
    ghostedRoleID: string;
    timedMessages: FoundationClasses.TimedMessage[];
    logs: FoundationClasses.Log[];
    verificationSystem: FoundationClasses.VerificationSystem;
    deletionChannels: FoundationClasses.DeletionChannel[];
    defaultRoleIDs: string[];
    getFromDataBase(): Promise<void>;
    writeToDataBase(): Promise<void>;
    constructor(initData: GuildDataInitData);
}
