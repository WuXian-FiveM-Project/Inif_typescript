import { Player } from "./Player";

//TODO: PlayerCachePool.ts
export class PlayerCachePool {
    private static _instance: PlayerCachePool;
    private _cache: { [key: string]: Player } = {};
    /**
     * get player id
     * @param {string} id Player ID
     * @returns {Player} Player instance
     */
    GetCachePlayer(id: string): Player {
        if (this._cache[id]) {
            return this._cache[id];
        } else {
            this._cache[id] = new Player(id);
            return this._cache[id];
        }
    }
}