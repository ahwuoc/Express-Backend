"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    status: { type: Number, default: 1 },
    join: { type: Date, default: Date.now },
    userType: { type: Number, default: 0 },
});
const UserModel = mongoose_1.default.model("User", UserSchema);
exports.default = UserModel;
