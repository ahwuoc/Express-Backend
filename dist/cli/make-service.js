"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const serviceName = process.argv[2];
if (!serviceName) {
    console.error("❌ Vui lòng nhập tên service. VD: Common");
    process.exit(1);
}
const className = `${serviceName}Service`;
const fileName = `${serviceName}.service.ts`;
const filePath = path_1.default.resolve("src", "services", fileName);
if (fs_1.default.existsSync(filePath)) {
    console.error("⚠️ File service đã tồn tại:", filePath);
    process.exit(1);
}
const serviceContent = `import Injectable from "../core/decorators/InjecTable.decorator";

@Injectable()
export default class ${className} {
  createUser() {
    return "Logic ${serviceName}Services";
  }
}
`;
fs_1.default.mkdirSync(path_1.default.dirname(filePath), { recursive: true });
fs_1.default.writeFileSync(filePath, serviceContent);
console.log(`✅ Đã tạo service: src/services/${fileName}`);
