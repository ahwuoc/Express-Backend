import { AppGateway } from "../core/base/gateway.base";
import { SocketGateway } from "../core/decorators/gateway.decorator";
import { SubscribeMessage } from "../core/decorators/method.decorator";
import { Socket } from "socket.io";
import { Inject } from "../core/decorators/params.decorator";
import UserModel from "../db/model/use.model";
@SocketGateway({ namespace: "/chat", port: 3001 })
export class ChatController implements AppGateway {
  constructor(@Inject(UserModel) private userModel: typeof UserModel) {}
  handleHandshake(socket: Socket): boolean | Promise<boolean> {
    return true;
  }
  @SubscribeMessage("message")
  async handleMessage(socket: Socket, message: string) {
    const users = await this.userModel.find().lean();
    socket.emit("traloi", users);
  }
}
