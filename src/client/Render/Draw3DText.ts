import { RGBColorWithAlpha, Vector3 } from '../Types';

export type fontType = 1 | 2 | 3 | 4 | 5;

export function DrawText3D(
    message: string,
    coords: Vector3,
    size: number,
    font?: fontType,
    centerText?: boolean,
): void {
    SetTextScale(0.0 * size, 0.55 * size);
    SetTextFont(font || 1);
    SetTextColour(255, 255, 255, 255);
    BeginTextCommandDisplayText('STRING');
    SetTextCentre(centerText || true);
    AddTextComponentSubstringPlayerName(message);
    SetDrawOrigin(coords.x, coords.y, coords.z, 0);
    EndTextCommandDisplayText(0.0, 0.0);
    ClearDrawOrigin();
}
export function DrawText3DWithColor(
    message: string,
    coords: Vector3,
    size: number,
    color: RGBColorWithAlpha,
    font?: fontType,
    centerText?: boolean,
): void {
    SetTextScale(0.0 * size, 0.55 * size);
    SetTextFont(font || 1);
    SetTextColour(color.r, color.g, color.b, color.a);
    BeginTextCommandDisplayText('STRING');
    SetTextCentre(centerText || true);
    AddTextComponentSubstringPlayerName(message);
    SetDrawOrigin(coords.x, coords.y, coords.z, 0);
    EndTextCommandDisplayText(0.0, 0.0);
    ClearDrawOrigin();
}
