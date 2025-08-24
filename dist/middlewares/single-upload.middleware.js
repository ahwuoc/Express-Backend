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
exports.SingleFileUploadMiddleware = void 0;
const InjecTable_decorator_1 = __importDefault(require("../core/decorators/InjecTable.decorator"));
const upload_service_1 = __importDefault(require("../services/upload.service"));
const error_base_1 = require("../core/base/error.base");
let SingleFileUploadMiddleware = class SingleFileUploadMiddleware {
    constructor(uploaderService) {
        this.uploaderService = uploaderService;
    }
    use(req, res, next) {
        this.uploaderService.single("file")(req, res, (error) => {
            if (error) {
                throw new error_base_1.BadRequestException(error);
            }
            next();
        });
    }
};
exports.SingleFileUploadMiddleware = SingleFileUploadMiddleware;
exports.SingleFileUploadMiddleware = SingleFileUploadMiddleware = __decorate([
    (0, InjecTable_decorator_1.default)(),
    __metadata("design:paramtypes", [upload_service_1.default])
], SingleFileUploadMiddleware);
