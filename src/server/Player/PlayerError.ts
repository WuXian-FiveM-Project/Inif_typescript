export class CantFoundPlayerError extends Error {
    constructor(message: string) {
        super(message);
    }
}