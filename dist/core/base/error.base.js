"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnAuthorizedException = exports.ForbiddenException = exports.BadRequestException = void 0;
class BadRequestException extends Error {
    constructor(message) {
        super(message);
        if (Array.isArray(message)) {
            this.message = message;
        }
        this.statusCode = 400;
    }
}
exports.BadRequestException = BadRequestException;
class ForbiddenException extends Error {
    constructor() {
        super();
        this.statusCode = 403;
        this.message = "Forbidden";
    }
}
exports.ForbiddenException = ForbiddenException;
class UnAuthorizedException extends Error {
    constructor() {
        super();
        this.statusCode = 401;
        this.message = "UnAuthorized";
    }
}
exports.UnAuthorizedException = UnAuthorizedException;
