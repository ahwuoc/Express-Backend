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
const path_1 = __importDefault(require("path"));
const multer_1 = __importDefault(require("multer"));
const InjecTable_decorator_1 = __importDefault(require("../core/decorators/InjecTable.decorator"));
let UploadService = class UploadService {
    constructor(options = {}) {
        var _a, _b;
        const storage = multer_1.default.diskStorage({
            destination: (_a = options.destination) !== null && _a !== void 0 ? _a : path_1.default.resolve("./uploads"),
            filename: (_b = options.filename) !== null && _b !== void 0 ? _b : ((req, file, cb) => {
                cb(null, `${Date.now()}-${file.originalname}`);
            }),
        });
        this.upload = (0, multer_1.default)({ storage });
    }
    single(filename) {
        return this.upload.single(filename);
    }
    array(filename, maxCount) {
        return this.upload.array(filename, maxCount);
    }
    fileds(array) {
        return this.upload.fields(array);
    }
};
UploadService = __decorate([
    (0, InjecTable_decorator_1.default)(),
    __metadata("design:paramtypes", [Object])
], UploadService);
exports.default = UploadService;
