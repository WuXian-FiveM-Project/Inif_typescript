import { Vector3 } from '../Types';

export enum NotificationArrowType {
    Bottom = 1,
    Right = 2,
    Top = 3,
    Left = 4,
    LeftTop = 5,
}

export function ShowFloatingHelpNotification(
    message: string,
    coords: Vector3,
    beepSound?: boolean,
    arrow?: boolean,
    hudColor?: number,
    arrowType?: NotificationArrowType,
    arrowOffset?: number,
): void {
    AddTextEntry('FloatingHelpNotification', message);
    SetFloatingHelpTextWorldPosition(1, coords.x, coords.y, coords.z);
    SetFloatingHelpTextStyle(arrow ? 1 : 0, 1, hudColor || 2, -1, arrowType || 3, arrowOffset || 0);
    BeginTextCommandDisplayHelp('FloatingHelpNotification');
    EndTextCommandDisplayHelp(2, false, beepSound || false, 0);
}
