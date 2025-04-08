import { Controller } from "../core/decorators/controller.decorator";

import { Get, Post, Delete, Patch } from "../core/decorators/method.decorator";
import { Body, Inject, Req, Res } from "../core/decorators/params.decorator";
import { userService } from "../services/user.service";
import { Protected } from "../decorators/proteced.decoractor";

@Controller("users")
@Protected()
class userControler {
  constructor(@Inject(userService) private useService: userService) {}

  @Get("/get")
  test() {
    return "1";
  }
  @Get(":id")
  test2() {
    return "2";
  }
}
export default userControler;
