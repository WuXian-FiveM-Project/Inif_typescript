export interface PlayerIdentifiers {
    ID?: string;
    Steam?: string;
    Name?: string;
    License?: string;
    Discord?: string;
    FiveM?: string;
    XBoxLive?: string; // XBox Live ID = xbl
    Microsoft?: string; // Microsoft ID = live
    IP?: string;
}

export class PlayerIdentifiersInit implements PlayerIdentifiers {
    ID = "";
    Steam = "";
    Name = "";
    License = "";
    Discord = "";
    FiveM = "";
    XBoxLive = "";
    Microsoft = "";
    IP = "";
}