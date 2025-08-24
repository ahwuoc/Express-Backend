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
exports.AppGuard = void 0;
const InjecTable_decorator_1 = __importDefault(require("../decorators/InjecTable.decorator"));
const context_base_1 = require("./context.base");
const error_base_1 = require("./error.base");
let AppGuard = class AppGuard {
    use(req, res, next) {
        const context = new context_base_1.AppContext(req, res, next);
        try {
            const shouldPass = this.canActive(context);
            if (shouldPass) {
                next();
            }
            else {
                next(new error_base_1.ForbiddenException());
            }
        }
        catch (error) {
            next(error);
        }
    }
    canActive(context) {
        return false;
    }
};
exports.AppGuard = AppGuard;
exports.AppGuard = AppGuard = __decorate([
    (0, InjecTable_decorator_1.default)()
], AppGuard);
