"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const name = process.argv[2];
if (!name) {
    console.error("❌ Vui lòng nhập tên gateway. VD: Chat");
    process.exit(1);
}
const className = `${name}Gateway`;
const fileName = `${name.toLowerCase()}.gateway.ts`;
const filePath = path_1.default.resolve("src", "gateways", fileName);
if (fs_1.default.existsSync(filePath)) {
    console.error("⚠️ File gateway đã tồn tại:", filePath);
    process.exit(1);
}
const content = `import { Socket } from "socket.io";
import { AppGateway } from "@/core/base/gateway.base";
import { SocketGateway } from "@/decorators/gateway.decorator";
import { SubscribeMessage } from "@/decorators/method.decorator";

@SocketGateway({
  namespace: "/${name.toLowerCase()}",
  port: 3000,
})
export default class ${className} implements AppGateway {
  handleHandshake(socket: Socket): boolean | Promise<boolean> {
    return true;
  }

  @SubscribeMessage("message")
  async handleMessage(socket: Socket, message: string) {
    socket.emit("reply", "${className} received: " + message);
  }
}
`;
fs_1.default.mkdirSync(path_1.default.dirname(filePath), { recursive: true });
fs_1.default.writeFileSync(filePath, content);
console.log(`✅ Đã tạo gateway: ${filePath}`);
