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
exports.BodyValidateInterceptor = void 0;
const InjecTable_decorator_1 = __importDefault(require("../core/decorators/InjecTable.decorator"));
let BodyValidateInterceptor = class BodyValidateInterceptor {
    intercept(context, next) {
        const req = context.switchToHtppRequest();
        const body = req.body;
        return next.hanlde();
    }
};
exports.BodyValidateInterceptor = BodyValidateInterceptor;
exports.BodyValidateInterceptor = BodyValidateInterceptor = __decorate([
    (0, InjecTable_decorator_1.default)()
], BodyValidateInterceptor);
