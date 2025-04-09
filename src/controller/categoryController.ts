import { Controller } from "../core/decorators/controller.decorator";
import { Get } from "../core/decorators/method.decorator";

@Controller("/categories")
export class categoryController {
  @Get()
  getAll() {
    return "All Danh Muc";
  }
}
