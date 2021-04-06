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
 * Class representing the data contained within a single guild.
 */
export interface GuildDataValues {
    id?: string;
    borderColor?: [number, number, number];
    guildName?: string;
    memberCount?: number;
    trackedUsers?: FoundationClasses.TrackedUser[];
    ghostedRoleID?: string;
    timedMessages?: FoundationClasses.TimedMessage[];
    logs?: FoundationClasses.Log[];
    verificationSystem?: FoundationClasses.VerificationSystem;
    deletionChannels?: FoundationClasses.DeletionChannel[];
    defaultRoleIDs?: string[];
}
/**
 * Class representing a single guild/server.
 */
export default class GuildData extends FoundationClasses.DiscordEntity {
    protected readonly id: string;
    private readonly dataBase;
    private readonly dataBaseKey;
    private borderColor;
    private memberCount;
    private trackedUsers;
    private ghostedRoleID;
    private timedMessages;
    private guildName;
    private logs;
    private verificationSystem;
    private deletionChannels;
    private defaultRoleIDs;
    getFromDataBase(): Promise<void>;
    writeToDataBase(): Promise<void>;
    exposeDataValues(): GuildDataValues;
    constructor(initData: GuildDataInitData);
}
