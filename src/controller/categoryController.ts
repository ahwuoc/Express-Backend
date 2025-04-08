import { Controller } from "../core/decorators/controller.decorator";
import profileService from "../services/profile.service";

@Controller()
export default class categoryController {
  constructor(public profileService: profileService) {}
  getCategory() {
    console.log("Get Category");
  }
}
