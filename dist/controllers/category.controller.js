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
Object.defineProperty(exports, "__esModule", { value: true });
const method_decorator_1 = require("@/decorators/method.decorator");
const params_decorator_1 = require("@/decorators/params.decorator");
const controller_decorator_1 = require("@/decorators/controller.decorator");
let categoryController = class categoryController {
    getAll(req, res) {
        res.send("categoryController works!");
    }
    getId(id) {
        console.log(id);
    }
    postAll(body, req, res) {
        res.send("body works!");
    }
};
__decorate([
    (0, method_decorator_1.Get)("/"),
    __param(0, (0, params_decorator_1.Req)()),
    __param(1, (0, params_decorator_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], categoryController.prototype, "getAll", null);
__decorate([
    (0, method_decorator_1.Get)(":id"),
    __param(0, (0, params_decorator_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], categoryController.prototype, "getId", null);
__decorate([
    (0, method_decorator_1.Post)("/"),
    __param(0, (0, params_decorator_1.Body)()),
    __param(2, (0, params_decorator_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], categoryController.prototype, "postAll", null);
categoryController = __decorate([
    (0, controller_decorator_1.Controller)("categoryController")
], categoryController);
exports.default = categoryController;
