import { Controller } from "../decorator/controller.decorator";
import commonService from "../services/common.service";
import profileService from "../services/profile.service";
import { userService } from "../services/user.service";
import { Get, Post } from "../decorator/method.decorator";
@Controller("/users")
class userControler {
  constructor(
    public userServices: userService,
    public profileServices: profileService,
    public comminServices: commonService
  ) {}
  @Get()
  getUser() {
    this.userServices.createUser();
  }
  @Post()
  AddUser() {}
}
export default userControler;
