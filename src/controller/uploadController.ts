import { Delete, Get } from "routing-controllers";
import { Controller } from "../core/decorators/controller.decorator";
import { Patch, Post } from "../core/decorators/method.decorator";
import { Req } from "../core/decorators/params.decorator";
import { Request } from "../core/utils/types";

@Controller("/uploads")
export class UploadController {
  @Post()

  create(@Req() req: Request) {
    return req.file;
  }
}
