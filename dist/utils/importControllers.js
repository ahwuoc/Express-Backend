"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const importDynamic = () => {
    const folders = ["../controllers", "../gateways"];
    const allModules = [];
    folders.forEach((folder) => {
        const dir = path_1.default.resolve(__dirname, folder);
        if (!fs_1.default.existsSync(dir)) {
            console.warn(`📁 Folder không tồn tại: ${dir}`);
            return;
        }
        const files = fs_1.default
            .readdirSync(dir)
            .filter((file) => file.endsWith(".controller.ts") || file.endsWith(".gateway.ts"));
        files.forEach((file) => {
            const filePath = path_1.default.resolve(dir, file);
            try {
                const module = require(filePath);
                const mod = module.default || module;
                allModules.push(mod);
            }
            catch (err) {
                console.error(`❌ Lỗi import ${filePath}:`, err.message);
            }
        });
    });
    return allModules;
};
exports.default = importDynamic;
