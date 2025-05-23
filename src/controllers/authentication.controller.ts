import { Get, Post } from "@/decorators/method.decorator";
import { Body, Param, Req, Res } from "@/decorators/params.decorator";
import { Request, Response } from "express";
import { Controller } from "@/decorators/controller.decorator";

@Controller("/authentication")
export default class authenticationController {
  @Get("/")
  getAll(@Req() req: Request, @Res() res: Response) {
    res.send("authenticationController works!");
  }

  @Get(":id")
  getId(@Param("id") id: number) {
    console.log(id);
  }
  @Post()
  login() {}

  @Post("/")
  postAll(@Body() body: any, @Req() req: Request, @Res() res: Response) {
    res.send("body works!");
  }
}
