interface CallbackPoolObject {
    channel: string;
    callback: ClientCallbackFunction;
    handle: ClientCalblackHandle;
}

var callbackPool: CallbackPoolObject[] = [];
var callbackDictionary: { [key: string]: ClientCalblackHandle } = {};

export type ClientCallbackFunction = (...args: any[]) => Promise<any>;
export type ClientCalblackHandle = number;
/**
 * register server callback in to callback pool
 * @param {string} callbackChannel callback name
 * @param {ClientCallbackFunction} callbackFunction callback function
 * @returns {ClientCalblackHandle} callback handler for unregister
 * @example
 * with static number parameter
 * RegisterServerCallback("exampleCallback", (source, arg1, arg2) => {
 *      return "result";
 * }
 * @example
 * with dynamic number parameter
 * RegisterServerCallback("exampleCallback", (source, ...args) => {
 *     return "result";
 * }
 */
export function RegisterClientCallback(
    callbackChannel: string,
    callbackFunction: ClientCallbackFunction,
): ClientCalblackHandle {
    const handle = callbackPool.length;
    callbackPool.push({
        channel: callbackChannel,
        callback: callbackFunction,
        handle: handle,
    });
    callbackDictionary[callbackChannel] = handle;
    return handle;
}
/**
 * unregister server callback from callback pool
 * @param {ClientCalblackHandle} callbackHandle callback handler
 */
export function UnregisterClientCallback(callbackHandle: ClientCalblackHandle): void {
    const index = callbackPool[callbackHandle].handle;
    callbackPool.splice(index, 1);
    delete callbackDictionary[callbackHandle];
}

onNet('triggerClientCallback', (ticket: string, callbackChannel: string, ...args: any[]) => {
    const handle = callbackDictionary[callbackChannel];
    if (handle === undefined) {
        return;
    }
    if (callbackPool[handle] === undefined) {
        return;
    }
    const callback = callbackPool[handle].callback;
    callback(...args)
        .then(result => {
            emitNet('clientCallbackResult', ticket, result);
        })
        .catch(err => {
            console.error(err);
        });
    return;
});
