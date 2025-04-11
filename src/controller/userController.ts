import { Request } from "express";
import { Controller } from "../core/decorators/controller.decorator";
import { Get, Post, Delete, Patch } from "../core/decorators/method.decorator";
import { Body, Inject, Param, Req } from "../core/decorators/params.decorator";
import { UsePipes } from "../core/decorators/use-pipes.decorator";
import { CreateDtoUser } from "../dto/user.dto";
import { ValidationPipe } from "../pipes/validation.pipe";
import { userService } from "../services/user.service";
@Controller("users")
class userControler {
  constructor(@Inject(userService) private useService: userService) {}
  @Get()
  get() {
    return this.useService.find();
  }

  @Post()
  add(@Body()id: number) {
    return "dsadsadsad";
  }
  @Post("post/:id")
  test23() {
    return "test xem lay params";
  }

  @Get("/test")
  chaoem() {
    return "co quyen truy cap";
  }
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.useService.findOne(id);
  }
  @Delete(":id")
  delete(@Param("id") id: string) {
    return this.useService.delete(id);
  }

  @Post("/test/validation")
  testvalidation(@Body() body: CreateDtoUser, @Req() req: Request) {
    return "test";
  }
}
export default userControler;
