export function ShowNotification(message: string, flash?: boolean): void {
    BeginTextCommandThefeedPost('STRING');
    AddTextComponentSubstringPlayerName(message);
    EndTextCommandThefeedPostTicker(flash || false, true);
}
