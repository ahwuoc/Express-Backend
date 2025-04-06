import Controller from "../decorator/controller.decorator";
import profileService from "../services/profile.service";
import { userService } from "../services/user.service";
@Controller()
export default class userControler {
  constructor(
    private userServices: userService,
    private profileService: profileService
  ) {}
  getUser() {
    console.log("get users");
    this.userServices.createUser();
  }
}
