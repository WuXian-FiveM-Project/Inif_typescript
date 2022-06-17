import { GetPlayerIdentifiers } from '../Utils';
import { CantFoundPlayerError } from './PlayerError';
import { PlayerIdentifiers } from '../Types/PlayerIdentifiers';
import { Ped } from "../Ped"

export class Player extends Ped {
    private _identifiers: PlayerIdentifiers;

    constructor(id: string | number) {
        id = id.toString();
        if (!getPlayers().includes(id)) {
            throw new CantFoundPlayerError(`Player ID:${id} not found`);
        }
        super(GetPlayerPed(id));
        this._identifiers = GetPlayerIdentifiers(id);
    }

    static create(): any {
        console.log('Player.create()');
    }


    
    //#region identifiers getters
    public get id(): string {
        return this._identifiers.ID;
    }

    public get steam(): string {
        return this._identifiers.Steam;
    }

    public get license(): string {
        return this._identifiers.License;
    }

    public get discord(): string {
        return this._identifiers.Discord;
    }

    public get fiveM(): string {
        return this._identifiers.FiveM;
    }

    public get xBoxLive(): string {
        return this._identifiers.XBoxLive;
    }

    public get microsoft(): string {
        return this._identifiers.Microsoft;
    }

    public get ip(): string {
        return this._identifiers.IP;
    }

    public get name(): string {
        return this._identifiers.Name;
    }
    //#endregion
}
