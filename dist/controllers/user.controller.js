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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const method_decorator_1 = require("@/decorators/method.decorator");
const controller_decorator_1 = require("@/decorators/controller.decorator");
const params_decorator_1 = require("@/decorators/params.decorator");
const user_service_1 = __importDefault(require("../services/user.service"));
let useController = class useController {
    constructor(userService) {
        this.userService = userService;
    }
    getUsers() {
        return this.userService.find();
    }
    addUsers() { }
};
__decorate([
    (0, method_decorator_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], useController.prototype, "getUsers", null);
__decorate([
    (0, method_decorator_1.Post)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], useController.prototype, "addUsers", null);
useController = __decorate([
    (0, controller_decorator_1.Controller)("/users"),
    __param(0, (0, params_decorator_1.Inject)(user_service_1.default)),
    __metadata("design:paramtypes", [user_service_1.default])
], useController);
exports.default = useController;
