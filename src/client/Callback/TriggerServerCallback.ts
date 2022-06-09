onNet("serverCallbackResult", (ticket: string, result: any) => {
    emit(ticket.toString(), result);
})



/**
 * trigger server callback
 * @param {string} callbackChannel callback name
 * @param {any[]} args parameters pass in
 * @returns {Promise<any>} result(Promise) of callback
 * @example TriggerServerCallback("exampleCallback").then((res)=>console.log(res))
 */
export async function TriggerServerCallback(callbackChannel: string, ...args: any[]): Promise<any> {
    const ticket = Citizen.getTickCount() + Math.random();
    emitNet("triggerServerCallback",ticket , callbackChannel, ...args)
    return new Promise((resolve) => {
        on(ticket.toString(), (result:any) => {
            resolve(result);
        })
    });
}
