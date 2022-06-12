export function ShowHelpNotification(
    message: string,
    beepSound?: boolean,
): void {
    AddTextEntry('HelpNotification', message);
    BeginTextCommandDisplayHelp('HelpNotification');
    EndTextCommandDisplayHelp(0, false, beepSound || true, 0);
}