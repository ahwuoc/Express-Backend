import { Get, Post } from "@/decorators/method.decorator";
import { Body, Param, Req, Res } from "@/decorators/params.decorator";
import { Request, Response } from "express";
import { Controller } from "@/decorators/controller.decorator";

@Controller("/order")
export default class orderController {
  @Get("/")
  getAll(@Req() req: Request, @Res() res: Response) {
    res.send("orderController works!");
  }
  @Get(":id")
  getId(@Param("id") id: number) {
    console.log(id);
  }
  @Post("/")
  postAll(@Body() body: any, @Req() req: Request, @Res() res: Response) {
    res.send("body works!");
  }
}
