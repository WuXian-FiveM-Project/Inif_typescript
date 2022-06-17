export class EntityNotFoundError extends Error {
    constructor(message: string) {
        super(message);
    }
}

export class EntityAlreadyDeletedError extends Error {
    constructor(message: string) {
        super(message);
    }
}