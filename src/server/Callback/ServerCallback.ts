interface CallbackPoolObject {
    channel: string,
    callback: ServerCallbackFunction,
    handle: ServerCalblackHandle,
}

var callbackPool: CallbackPoolObject[] = [];
var callbackDictionary: { [key: string]: ServerCalblackHandle } = {};

export type ServerCallbackFunction = (source: string | number, ...args: any[]) => Promise<any>;
export type ServerCalblackHandle = number;
/**
 * register server callback in to callback pool
 * @param {string} callbackChannel callback name
 * @param {ServerCallbackFunction} callbackFunction callback function
 * @returns {ServerCalblackHandle} callback handler for unregister
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
export function RegisterServerCallback(callbackChannel: string, callbackFunction: ServerCallbackFunction): ServerCalblackHandle{
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
 * @param {ServerCalblackHandle} callbackHandle callback handler
 */
export function UnregisterServerCallback(callbackHandle: ServerCalblackHandle): void{
    const index = callbackPool[callbackHandle].handle;
    callbackPool.splice(index, 1);
    delete callbackDictionary[callbackHandle];
}

onNet("triggerServerCallback", (ticket: string, callbackChannel: string, ...args: any[]) => {
    const src = source;
    const handle = callbackDictionary[callbackChannel];
    if (handle === undefined) {
        return;
    }
    const callback = callbackPool[handle].callback;
    callback(src, ...args).then((result) => {
        emitNet("serverCallbackResult", src, ticket, result);
    }).catch((err) => {
        console.error(err);
    });
    return
})