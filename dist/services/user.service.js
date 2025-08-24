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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../models/user.model"));
const InjecTable_decorator_1 = __importDefault(require("../core/decorators/InjecTable.decorator"));
const params_decorator_1 = require("../core/decorators/params.decorator");
const error_base_1 = require("../core/base/error.base");
let userService = class userService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    createUser(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userModel.create(body);
        });
    }
    find() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userModel.find();
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userModel.findById(id);
                return user;
            }
            catch (_a) {
                throw new error_base_1.BadRequestException("ID không hợp lệ hoặc user không tồn tại");
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userModel.findById(id);
                if (!user)
                    throw new error_base_1.BadRequestException("Không có user tồn tại");
                yield this.userModel.deleteOne({ _id: id });
                return "Thành công";
            }
            catch (error) {
                throw new error_base_1.BadRequestException("ID không hợp lệ hoặc user không tồn tại");
            }
        });
    }
};
userService = __decorate([
    (0, InjecTable_decorator_1.default)(),
    __param(0, (0, params_decorator_1.Inject)(user_model_1.default)),
    __metadata("design:paramtypes", [Object])
], userService);
exports.default = userService;
