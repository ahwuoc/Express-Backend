import { Get, Post } from "@/decorators/method.decorator";
import { Controller } from "@/decorators/controller.decorator";
import { Body, Inject, Param } from "@/decorators/params.decorator";
import userService from "../services/user.service";
import { CreateDtoUser } from "../dto/user.dto";
import { UsePipes } from "@/decorators/use-pipes.decorator";
import { ValidationPipe } from "../pipes/validation.pipe";
import { Protected } from "@/decorators/protected.decorator";
@Protected()
@Controller("/users")
export default class useController {
  constructor(@Inject(userService) private userService: userService) {}
  @Get()
  getUsers() {
    return this.userService.find();
  }

  @UsePipes(ValidationPipe)
  @Get(":id")
  getId(@Param("id") param: any) {
    return this.userService.findOne(param);
  }
  @UsePipes(ValidationPipe)
  @Post()
  addUsers(@Body() body: CreateDtoUser) {
    return this.userService.createUser(body);
  }
}
