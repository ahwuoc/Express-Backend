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
const guard_base_1 = require("../core/base/guard.base");
const InjecTable_decorator_1 = __importDefault(require("../core/decorators/InjecTable.decorator"));
const params_decorator_1 = require("../core/decorators/params.decorator");
const passport_service_1 = require("../services/passport.service");
const jwt_strategies_1 = require("../strategies/jwt.strategies");
const metadata_1 = require("../core/metedata/metadata");
const constant_1 = require("../core/utils/constant");
const error_base_1 = require("../core/base/error.base");
let AuthGuard = class AuthGuard extends guard_base_1.AppGuard {
    constructor(jwtStrategy, passportServie) {
        super();
        this.passportServie = passportServie;
    }
    canActive(context) {
        var _a;
        const passport = this.passportServie.passport;
        const controllerClass = context.getClass();
        const handler = context.getHandler();
        const req = context.switchToHtppRequest();
        const res = context.switchToHtppResponse();
        const next = context.getNextFunction();
        const isProtected = (_a = (0, metadata_1.getMetadata)(constant_1.METADATA_KEYS.protected_metadata_key, handler)) !== null && _a !== void 0 ? _a : (0, metadata_1.getMetadata)(constant_1.METADATA_KEYS.protected_metadata_key, controllerClass);
        if (!isProtected) {
            return true;
        }
        passport.authenticate("jwt", { session: false }, (error, payload, info) => {
            if (error || info) {
                throw new error_base_1.UnAuthorizedException();
            }
            return true;
        })(req, res, next);
        return true;
    }
};
AuthGuard = __decorate([
    (0, InjecTable_decorator_1.default)(),
    __param(1, (0, params_decorator_1.Inject)(passport_service_1.PassportService)),
    __metadata("design:paramtypes", [jwt_strategies_1.JwtStrategy,
        passport_service_1.PassportService])
], AuthGuard);
exports.default = AuthGuard;
