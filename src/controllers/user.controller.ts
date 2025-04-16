import { Get, Post } from "@/decorators/method.decorator";
import { Controller } from "@/decorators/controller.decorator";
import { Body, Inject, Param } from "@/decorators/params.decorator";
import userService from "../services/user.service";
import { CreateDtoUser } from "../dto/user.dto";
import { UsePipes } from "../core/decorators/use-pipes.decorator";
import { ValidationPipe } from "../pipes/validation.pipe";
import { Request } from "express";
@Controller("/users")
export default class useController {
  constructor(@Inject(userService) private userService: userService) {}
  @Get()
  getUsers() {
    return this.userService.find();
  }

  @Get(":id")
  getId(@Param("id") param: any) {
    return param;
  }

  @UsePipes(ValidationPipe)
  @Post()
  addUsers(@Body() body: CreateDtoUser) {
    return body;
  }
}
