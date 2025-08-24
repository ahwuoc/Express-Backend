import { Socket } from "socket.io";
import { AppGateway } from "@/core/base/gateway.base";
import { SocketGateway } from "@/decorators/gateway.decorator";
import { SubscribeMessage } from "@/decorators/method.decorator";

@SocketGateway({
  namespace: "/chat",
  port: 3000,
})
export default class ChatGateway implements AppGateway {
  handleHandshake(socket: Socket): boolean | Promise<boolean> {
    return true;
  }

  @SubscribeMessage("message")
  async handleMessage(socket: Socket, message: string) {
    socket.emit("reply", "ChatGateway received: " + message);
  }
}
