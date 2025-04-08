import { Controller } from "../decorator/controller.decorator";

import { Get, Post, Delete, Patch } from "../decorator/method.decorator";
import { Inject } from "../decorator/params.decorator";
@Controller("users")
class userControler {
  constructor(@Inject("test") private useService: string) {}
  @Get()
  getUser() {
    return this.useService;
  }
  @Post(":id")
  AddUser() {}

  @Delete(":id")
  DeleteUser() {}

  @Patch("/data/")
  UpdateUser() {}
}
export default userControler;
