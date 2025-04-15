import fs from "fs";
import path from "path";

const name = process.argv[2];
if (!name) {
  console.error("❌ Vui lòng nhập tên gateway. VD: Chat");
  process.exit(1);
}

const className = `${name}Gateway`;
const fileName = `${name.toLowerCase()}.gateway.ts`;
const filePath = path.resolve("src", "gateways", fileName);

if (fs.existsSync(filePath)) {
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
export class ${className} implements AppGateway {
  handleHandshake(socket: Socket): boolean | Promise<boolean> {
    return true;
  }

  @SubscribeMessage("message")
  async handleMessage(socket: Socket, message: string) {
    socket.emit("reply", "${className} received: " + message);
  }
}
`;

fs.mkdirSync(path.dirname(filePath), { recursive: true });
fs.writeFileSync(filePath, content);

console.log(`✅ Đã tạo gateway: ${filePath}`);
