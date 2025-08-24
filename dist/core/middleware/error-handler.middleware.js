"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const InjecTable_decorator_1 = __importDefault(require("../decorators/InjecTable.decorator"));
(0, InjecTable_decorator_1.default)();
class ErrorHandlerMiddleware {
    use(error, req, res, next) {
        var _a, _b;
        if (next === undefined)
            return res();
        let messages = (_a = error.message) !== null && _a !== void 0 ? _a : "Internal Error";
        let statusCode = (_b = error.statusCode) !== null && _b !== void 0 ? _b : 500;
        res.status(statusCode).send({
            statusCode,
            messages,
        });
    }
}
exports.default = ErrorHandlerMiddleware;
