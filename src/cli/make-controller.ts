import fs from "fs";
import path from "path";

const name = process.argv[2];
if (!name) {
  console.error("❌ Vui lòng nhập tên controller. VD: User");
  process.exit(1);
}

const className = `${name}Controller`;
const fileName = `${name.toLowerCase()}.controller.ts`;
const filePath = path.resolve("src", "controllers", fileName);

if (fs.existsSync(filePath)) {
  console.error("⚠️ File controller đã tồn tại:", filePath);
  process.exit(1);
}

const content = `import { Get, Post } from "@/decorators/method.decorator";
import { Body, Param, Req, Res } from "@/decorators/params.decorator";
import { Request, Response } from "express";
import { Controller } from "@/decorators/controller.decorator";

@Controller("/${name}")
export default class ${className} {
  @Get("/")
  getAll(@Req() req: Request, @Res() res: Response) {
    res.send("${className} works!");
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
`;

fs.mkdirSync(path.dirname(filePath), { recursive: true });
fs.writeFileSync(filePath, content);

console.log(`✅ Đã tạo controller: ${filePath}`);
