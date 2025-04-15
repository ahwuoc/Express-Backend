import { Get, Post } from "@/decorators/method.decorator";
import { Controller } from "@/decorators/controller.decorator";
import { Inject } from "@/decorators/params.decorator";
import userService from "../services/user.service";

@Controller("/users")
export default class useController {
  constructor(@Inject(userService) private userService: userService) {}
  @Get()
  getUsers() {
    return this.userService.find();
  }
  @Post()
  addUsers() {}
}
