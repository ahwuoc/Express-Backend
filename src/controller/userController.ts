import { Controller } from "../core/decorators/controller.decorator";
import { Get, Post, Delete, Patch } from "../core/decorators/method.decorator";
import { Body, Inject, Param } from "../core/decorators/params.decorator";
import { userService } from "../services/user.service";
import { Protected } from "../decorators/proteced.decoractor";

@Controller("users")
class userControler {
  constructor(@Inject(userService) private useService: userService) {}

  @Get()
  get() {
    return this.useService.find();
  }

  @Post()
  add(@Body() body: any) {
    return this.useService.createUser(body);
  }

  @Protected()
  @Get("/test")
  chaoem() {
    return "co quyen truy cap";
  }

  @Protected()
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.useService.findOne(id);
  }
  @Delete(":id")
  delete(@Param("id") id: string) {
    return this.useService.delete(id);
  }
}
export default userControler;
