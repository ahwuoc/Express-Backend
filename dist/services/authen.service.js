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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenService = void 0;
const error_base_1 = require("../core/base/error.base");
const InjecTable_decorator_1 = __importDefault(require("../core/decorators/InjecTable.decorator"));
const params_decorator_1 = require("../core/decorators/params.decorator");
const user_model_1 = __importDefault(require("../models/user.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET_KEY;
let AuthenService = class AuthenService {
    constructor(usermodel) {
        this.usermodel = usermodel;
    }
    login(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const { password, email } = body;
            const user = yield this.usermodel.findOne({ email });
            if (!user) {
                throw new error_base_1.BadRequestException("Tài khoản không tồn tại");
            }
            if (user.password !== password) {
                throw new error_base_1.BadRequestException("Mật khẩu không chính xác, vui lòng nhập lại");
            }
            const _a = user.toObject(), { password: _ } = _a, payload = __rest(_a, ["password"]);
            const access_Token = jsonwebtoken_1.default.sign(payload, JWT_SECRET, { expiresIn: "15m" });
            return {
                access_Token,
                user: payload,
            };
        });
    }
};
exports.AuthenService = AuthenService;
exports.AuthenService = AuthenService = __decorate([
    (0, InjecTable_decorator_1.default)(),
    __param(0, (0, params_decorator_1.Inject)(user_model_1.default)),
    __metadata("design:paramtypes", [Object])
], AuthenService);
