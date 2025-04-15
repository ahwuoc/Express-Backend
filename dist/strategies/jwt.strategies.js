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
exports.JwtStrategy = void 0;
const passport_jwt_1 = require("passport-jwt");
const InjecTable_decorator_1 = __importDefault(require("../core/decorators/InjecTable.decorator"));
const passport_service_1 = require("../services/passport.service");
const params_decorator_1 = require("../core/decorators/params.decorator");
require("dotenv/config");
const JWT_SECRET = process.env.JWT_SECRET_KEY;
let JwtStrategy = class JwtStrategy extends passport_jwt_1.Strategy {
    constructor(passportService) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: JWT_SECRET,
            passReqToCallback: true,
        }, (req, payload, done) => {
            this.validate(payload, done);
        });
        passportService.passport.use(this);
    }
    validate(payload, done) {
        return done(null, payload);
    }
};
exports.JwtStrategy = JwtStrategy;
exports.JwtStrategy = JwtStrategy = __decorate([
    (0, InjecTable_decorator_1.default)(),
    __param(0, (0, params_decorator_1.Inject)(passport_service_1.PassportService)),
    __metadata("design:paramtypes", [passport_service_1.PassportService])
], JwtStrategy);
