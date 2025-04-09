import { Controller } from "../core/decorators/controller.decorator";

import { Get, Post, Delete, Patch } from "../core/decorators/method.decorator";
import { Body, Inject, Req, Res } from "../core/decorators/params.decorator";
import { userService } from "../services/user.service";
import type { Request } from "express";

@Controller("users")
class userControler {
  constructor(@Inject(userService) private useService: userService) {}

  @Get("/get")
  test() {
    return "1";
  }

  @Get(":id")
  test2(req: Request) {
    const uid = req.params.id;
    return uid;
  }
}
export default userControler;
