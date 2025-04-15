import { Socket } from "socket.io";
import { AppGateway } from "@/core/base/gateway.base";
import { SocketGateway } from "@/decorators/gateway.decorator";
import { SubscribeMessage } from "@/decorators/method.decorator";

@SocketGateway({
  namespace: "/notifcation",
  port: 3000,
})
export default class notifcationGateway implements AppGateway {
  handleHandshake(socket: Socket): boolean | Promise<boolean> {
    return true;
  }

  @SubscribeMessage("message")
  async handleMessage(socket: Socket, message: string) {
    socket.emit("reply", "notifcationGateway received: " + message);
  }
}
