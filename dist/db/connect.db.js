"use strict";
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
exports.default = connectMongo;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const MONGODB_URL = process.env.MONGODB_URL;
function connectMongo() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!MONGODB_URL) {
                return console.log("\x1b[31m⚠️ Không có thông tin MONGODB_URL trong .env\x1b[0m");
            }
            yield mongoose_1.default.connect(MONGODB_URL);
            console.log("\x1b[32m🎉 MongoDB connected successfully!\x1b[0m");
        }
        catch (err) {
            console.error("\x1b[31m🔥 MongoDB connection error:\x1b[0m");
            throw err;
        }
    });
}
