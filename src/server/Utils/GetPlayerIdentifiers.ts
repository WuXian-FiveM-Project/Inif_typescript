import { PlayerIdentifiers } from '../Types';
import { CantFoundPlayerError } from '../Player/PlayerError';

export function GetPlayerIdentifiers(playerID: string | number): PlayerIdentifiers {
    playerID = playerID.toString();
    if (!getPlayers().includes(playerID)) {
        throw new CantFoundPlayerError(`Player ID:${playerID} not found`);
    }
    var identifiers = getPlayerIdentifiers(playerID);
    var identifierDict: PlayerIdentifiers;
    identifierDict.ID = playerID;
    identifiers.forEach(async identifier => {
        if (identifier.startsWith('steam:')) {
            identifierDict.Steam = identifier.substring('steam:'.length);
        }
        if (identifier.startsWith('license:')) {
            identifierDict.License = identifier.substring('license:'.length);
        }
        if (identifier.startsWith('xbl:')) {
            identifierDict.XBoxLive = identifier.substring('xbl:'.length);
        }
        if (identifier.startsWith('live:')) {
            identifierDict.Microsoft = identifier.substring('live:'.length);
        }
        if (identifier.startsWith('ip:')) {
            identifierDict.IP = identifier.substring('ip:'.length);
        }
        if (identifier.startsWith('discord:')) {
            identifierDict.Discord = identifier.substring('discord:'.length);
        }
        if (identifier.startsWith('fivem:')) {
            identifierDict.FiveM = identifier.substring('fivem:'.length);
        }
        identifierDict.Name = GetPlayerName(playerID.toString())
    });

    return identifierDict;
}
