export function ShowHelpNotification(
    message: string,
    beepSound?: boolean,
    duration?: number,
): void {
    AddTextEntry('HelpNotification', message);
    BeginTextCommandDisplayHelp('HelpNotification');
    EndTextCommandDisplayHelp(0, false, beepSound || true, duration || -1);
}


export function ShowHelpNotificationOneTick(
    message: string,
    beepSound?: boolean,
): void {
    AddTextEntry('HelpNotification', message);
    BeginTextCommandDisplayHelp('HelpNotification');
    EndTextCommandDisplayHelp(0, false, beepSound || true, 1);
}
