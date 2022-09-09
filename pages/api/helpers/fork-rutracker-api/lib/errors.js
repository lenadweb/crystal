export class AuthorizationError extends Error {
    constructor(...args) {
        super(...args);

        this.name = 'AuthorizationError';
        this.message = 'Incorrect username or password';
    }
}

export class NotAuthorizedError extends Error {
    constructor(...args) {
        super(...args);

        this.name = 'NotAuthorizedError';
        this.message = 'Try to call \'login\' method first';
    }
}

export class ServerError extends Error {}

export class ValidationError extends Error {}
