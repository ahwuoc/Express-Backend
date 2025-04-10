import { authenticate } from "passport";
import { BadRequestException } from "../core/base/error.base";
import { Controller } from "../core/decorators/controller.decorator";
import { Post } from "../core/decorators/method.decorator";
import { Body, Inject } from "../core/decorators/params.decorator";
import UserModel from "../db/model/use.model";
import { AuthenService } from "../services/authen.service";

@Controller()
export class AuthenController {
  constructor(@Inject(AuthenService) private authenService: AuthenService) {}
  @Post("login")
  login(@Body() body: any) {
    return this.authenService.login(body);
  }
}
