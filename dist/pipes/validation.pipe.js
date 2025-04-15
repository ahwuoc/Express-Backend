"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationPipe = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const error_base_1 = require("../core/base/error.base");
const InjecTable_decorator_1 = __importDefault(require("../core/decorators/InjecTable.decorator"));
let ValidationPipe = class ValidationPipe {
    transform(value, type) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof type !== "function" || !this.isDto(type)) {
                return value;
            }
            value = (0, class_transformer_1.plainToInstance)(type, value);
            const errors = yield (0, class_validator_1.validate)(value, { whitelist: true });
            if (errors.length > 0) {
                const errorMessages = errors.flatMap((error) => {
                    if (!error.constraints)
                        return;
                    return Object.entries(error.constraints).map(([key, value]) => value);
                });
                throw new error_base_1.BadRequestException(errorMessages);
            }
            return value;
        });
    }
    isDto(type) {
        const excludedTypes = [Object, Number, String, Array, Boolean];
        return !excludedTypes.includes(type);
    }
};
exports.ValidationPipe = ValidationPipe;
exports.ValidationPipe = ValidationPipe = __decorate([
    (0, InjecTable_decorator_1.default)()
], ValidationPipe);
