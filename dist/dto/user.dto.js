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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateDtoUser = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class CreateDtoUser {
}
exports.CreateDtoUser = CreateDtoUser;
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsString)({ message: "Họ không được để trống!" }),
    (0, class_validator_1.IsNotEmpty)({ message: "Họ không được để trống!" }),
    __metadata("design:type", String)
], CreateDtoUser.prototype, "first_name", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsString)({ message: "Tên không được để trống!" }),
    (0, class_validator_1.IsNotEmpty)({ message: "Tên không được để trống!" }),
    __metadata("design:type", String)
], CreateDtoUser.prototype, "last_name", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsEmail)({}, { message: "Email không hợp lệ!" }),
    __metadata("design:type", String)
], CreateDtoUser.prototype, "email", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsString)({ message: "Mật khẩu không được để trống!" }),
    __metadata("design:type", String)
], CreateDtoUser.prototype, "password", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsString)({ message: "Số điện thoại không được để trống!" }),
    __metadata("design:type", String)
], CreateDtoUser.prototype, "phone", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsInt)({ message: "Trạng thái phải là một số nguyên!" }),
    __metadata("design:type", Number)
], CreateDtoUser.prototype, "status", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsDate)({ message: "Ngày tham gia không hợp lệ!" }),
    __metadata("design:type", Date)
], CreateDtoUser.prototype, "join", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsInt)({ message: "Loại người dùng phải là một số nguyên!" }),
    __metadata("design:type", Number)
], CreateDtoUser.prototype, "userType", void 0);
