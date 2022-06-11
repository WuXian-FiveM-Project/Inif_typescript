import { Vector3, RGBColorWithAlpha } from '../Types';

export type MarkerID =
    | 0
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 13
    | 14
    | 15
    | 16
    | 17
    | 18
    | 19
    | 20
    | 21
    | 22
    | 23
    | 24
    | 25
    | 26
    | 27
    | 28
    | 29
    | 30
    | 31
    | 32
    | 33
    | 34
    | 35
    | 36
    | 37
    | 38
    | 39
    | 40
    | 41
    | 42
    | 43;

export interface MarkerContructorParams {
    id: MarkerID;
    position: Vector3;
    rotation?: Vector3;
    scale: Vector3;
    color: RGBColorWithAlpha;
    detectRadius: number;
    renderDistance?: number;
    jumping?: boolean;
    faceCamera?: boolean;
    textureDict?: string;
    textureName?: string;
    drawOverEntity?: boolean;
    spin?: boolean;
    onPlayerEnter?: () => void;
    onPlayerExit?: () => void;
    onPlayerInside?: () => void;
}

export class Marker {
    private _isPlayerInside: boolean;
    private _drawTick: number;
    private _markerParms: MarkerContructorParams;

    constructor(marker: MarkerContructorParams) {
        marker.color.r = Math.floor(marker.color.r);
        marker.color.g = Math.floor(marker.color.g);
        marker.color.b = Math.floor(marker.color.b);
        marker.color.a = Math.floor(marker.color.a);
        this._markerParms = marker;
        this._isPlayerInside = false;
    }

    /**
     * draw marker only one tick
     */
    draw = (): void => {
        //TODO: replace GetEntityCoord to player class when Player class are done
        const currentPlayerPosition = GetEntityCoords(PlayerPedId(), true);
        if (
            Vdist2(
                this._markerParms.position.x,
                this._markerParms.position.y,
                this._markerParms.position.z,
                currentPlayerPosition['x'],
                currentPlayerPosition['y'],
                currentPlayerPosition['z'],
            ) < this._markerParms.renderDistance
        ) {
            return;
        }
        DrawMarker(
            this._markerParms.id,
            this._markerParms.position.x,
            this._markerParms.position.y,
            this._markerParms.position.z,
            0.0,
            0.0,
            0.0,
            this._markerParms.rotation.x,
            this._markerParms.rotation.y,
            this._markerParms.rotation.z,
            this._markerParms.scale.x,
            this._markerParms.scale.y,
            this._markerParms.scale.z,
            this._markerParms.color.r,
            this._markerParms.color.g,
            this._markerParms.color.b,
            this._markerParms.color.a,
            this._markerParms.jumping || false,
            this._markerParms.faceCamera || false,
            2,
            this._markerParms.spin || false,
            this._markerParms.textureDict || null,
            this._markerParms.textureName || null,
            this._markerParms.drawOverEntity || false,
        );
        if (
            Vdist2(
                this._markerParms.position.x,
                this._markerParms.position.y,
                this._markerParms.position.z,
                currentPlayerPosition['x'],
                currentPlayerPosition['y'],
                currentPlayerPosition['z'],
            ) < this._markerParms.detectRadius
        ) {
            if (this._isPlayerInside === false) {
                this._isPlayerInside = true;
                if (this._markerParms.onPlayerEnter) {
                    this._markerParms.onPlayerEnter();
                }
            }
            this._markerParms.onPlayerInside();
        } else {
            if (this._isPlayerInside === true) {
                this._isPlayerInside = false;
                if (this._markerParms.onPlayerExit) {
                    this._markerParms.onPlayerExit();
                }
            }
        }
    };

    startDraw = (): void => {
        this._drawTick = setTick(this.draw);
    };

    stopDraw = (): void => {
        clearTick(this._drawTick);
    };

    //#region properties
    public get id(): MarkerID {
        return this._markerParms.id;
    }
    public set id(id: MarkerID) {
        this._markerParms.id = id;
    }
    public get position(): Vector3 {
        return this._markerParms.position;
    }
    public set position(vec3: Vector3) {
        this._markerParms.position = vec3;
    }
    public get rotation(): Vector3 {
        return this._markerParms.rotation;
    }
    public set rotation(vec3: Vector3) {
        this._markerParms.rotation = vec3;
    }
    public get scale(): Vector3 {
        return this._markerParms.scale;
    }
    public set scale(vec3: Vector3) {
        this._markerParms.scale = vec3;
    }
    public get color(): RGBColorWithAlpha {
        return this._markerParms.color;
    }
    public set color(color: RGBColorWithAlpha) {
        this._markerParms.color = color;
    }
    public get detectRadius(): number {
        return this._markerParms.detectRadius;
    }
    public set detectRadius(radius: number) {
        this._markerParms.detectRadius = radius;
    }
    public get renderDistance(): number {
        return this._markerParms.renderDistance;
    }
    public set renderDistance(dist: number) {
        this._markerParms.renderDistance = dist;
    }
    public get jumping(): boolean {
        return this._markerParms.jumping;
    }
    public set jumping(bool: boolean) {
        this._markerParms.jumping = bool;
    }
    public get faceCamera(): boolean {
        return this._markerParms.faceCamera;
    }
    public set faceCamera(bool: boolean) {
        this._markerParms.faceCamera = bool;
    }
    public get textureDict(): string {
        return this._markerParms.textureDict;
    }
    public set textureDict(str: string) {
        this._markerParms.textureDict = str;
    }
    public get textureName(): string {
        return this._markerParms.textureName;
    }
    public set textureName(str: string) {
        this._markerParms.textureName = str;
    }
    public get drawOverEntity(): boolean {
        return this._markerParms.drawOverEntity;
    }
    public set drawOverEntity(bool: boolean) {
        this._markerParms.drawOverEntity = bool;
    }
    public get spin(): boolean {
        return this._markerParms.spin;
    }
    public set spin(bool: boolean) {
        this._markerParms.spin = bool;
    }
    public get onPlayerEnter(): () => void {
        return this._markerParms.onPlayerEnter;
    }
    public set onPlayerEnter(func: () => void) {
        this._markerParms.onPlayerEnter = func;
    }
    public get onPlayerExit(): () => void {
        return this._markerParms.onPlayerExit;
    }
    public set onPlayerExit(func: () => void) {
        this._markerParms.onPlayerExit = func;
    }
    public get onPlayerInside(): () => void {
        return this._markerParms.onPlayerInside;
    }
    public set onPlayerInside(func: () => void) {
        this._markerParms.onPlayerInside = func;
    }
    //#endregion
}
