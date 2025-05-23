"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundMiddleware = void 0;
const InjecTable_decorator_1 = __importDefault(require("../decorators/InjecTable.decorator"));
let NotFoundMiddleware = class NotFoundMiddleware {
    use(req, res, next) {
        res.status(404).json({
            message: "Not Found",
            statusCode: 404,
            path: req.originalUrl,
        });
    }
};
exports.NotFoundMiddleware = NotFoundMiddleware;
exports.NotFoundMiddleware = NotFoundMiddleware = __decorate([
    (0, InjecTable_decorator_1.default)()
], NotFoundMiddleware);
