"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppContext = void 0;
const InjecTable_decorator_1 = __importDefault(require("../decorators/InjecTable.decorator"));
let AppContext = class AppContext {
    constructor(req, res, next) {
        var _a, _b;
        this.controllerClass = (_a = req.context.instance.constructor) !== null && _a !== void 0 ? _a : undefined;
        this.handler = (_b = req.context.instance[req.context.handlerName]) !== null && _b !== void 0 ? _b : undefined;
        this.request = req;
        this.response = res;
        this.next = next;
    }
    switchToHtppRequest() {
        return this.request;
    }
    switchToHtppResponse() {
        return this.response;
    }
    getClass() {
        return this.controllerClass;
    }
    getHandler() {
        return this.handler;
    }
    getNextFunction() {
        return this.next;
    }
};
exports.AppContext = AppContext;
exports.AppContext = AppContext = __decorate([
    (0, InjecTable_decorator_1.default)(),
    __metadata("design:paramtypes", [Object, Object, Function])
], AppContext);
