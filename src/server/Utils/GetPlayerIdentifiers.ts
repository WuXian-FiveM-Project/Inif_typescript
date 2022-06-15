import { PlayerIdentifiers } from '../Types';
import { CantFoundPlayerError } from '../Player/PlayerError';

export function GetPlayerIdentifiers(playerID: string | number): PlayerIdentifiers {
    playerID = playerID.toString();
    if (!getPlayers().includes(playerID)) {
        throw new CantFoundPlayerError(`Player ID:${playerID} not found`);
    }
    var identifiers = getPlayerIdentifiers(playerID);
    var identifierDict: PlayerIdentifiers = {}
    identifierDict.ID = playerID;
    identifiers.forEach(identifier => {
        if (identifier.startsWith('steam:')) {
            identifierDict.Steam = identifier
        }
        if (identifier.startsWith('license:')) {
            identifierDict.License = identifier
        }
        if (identifier.startsWith('xbl:')) {
            identifierDict.XBoxLive = identifier
        }
        if (identifier.startsWith('live:')) {
            identifierDict.Microsoft = identifier
        }
        if (identifier.startsWith('ip:')) {
            identifierDict.IP = identifier
        }
        if (identifier.startsWith('discord:')) {
            identifierDict.Discord = identifier
        }
        if (identifier.startsWith('fivem:')) {
            identifierDict.FiveM = identifier
        }
        identifierDict.Name = GetPlayerName(playerID.toString())
    });

    return identifierDict;
}
