import { RGBColorWithAlpha, Vector3 } from '../Types';

export type fontType = 1 | 2 | 3 | 4 | 5;

export interface DrawText3DParams {
    message: string;
    coords: Vector3;
    size: number;
    color: RGBColorWithAlpha;
    font?: fontType;
    centerText?: boolean;
}

export class Draw3DText {
    private _params: DrawText3DParams;
    private _tickHandler: number;

    constructor(params: DrawText3DParams) {
        this._params = params;
    }

    /**
     * only draw one tick
     */
    draw = (): void => {
        SetTextScale(0.0 * this._params.size, 0.55 * this._params.size);
        SetTextFont(this._params.font || 1);
        SetTextColour(
            this._params.color.r,
            this._params.color.g,
            this._params.color.b,
            this._params.color.a,
        );
        BeginTextCommandDisplayText('STRING');
        SetTextCentre(this._params.centerText || true);
        AddTextComponentSubstringPlayerName(this._params.message);
        SetDrawOrigin(this._params.coords.x, this._params.coords.y, this._params.coords.z, 0);
        EndTextCommandDisplayText(0.0, 0.0);
        ClearDrawOrigin();
    };

    startDraw = (): void => {
        this._tickHandler = setTick(this.draw);
    }

    stopDraw = (): void => {
        clearTick(this._tickHandler);
    }

    //#region getter and setter
    public get message(): string {
        return this._params.message;
    }
    public set message(value: string) {
        this._params.message = value;
    }

    public get coords(): Vector3 {
        return this._params.coords;
    }
    public set coords(value: Vector3) {
        this._params.coords = value;
    }

    public get size(): number {
        return this._params.size;
    }
    public set size(value: number) {
        this._params.size = value;
    }

    public get color(): RGBColorWithAlpha {
        return this._params.color;
    }
    public set color(value: RGBColorWithAlpha) {
        value.r = Math.floor(value.r);
        value.g = Math.floor(value.g);
        value.b = Math.floor(value.b);
        value.a = Math.floor(value.a);
        this._params.color = value;
    }

    public get font(): fontType {
        return this._params.font;
    }
    public set font(value: fontType) {
        this._params.font = value;
    }

    public get centerText(): boolean {
        return this._params.centerText;
    }
    public set centerText(value: boolean) {
        this._params.centerText = value;
    }
    //#endregion
}
