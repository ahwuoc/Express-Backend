import { BadRequestException } from "../core/base/error.base";
import { Controller } from "../core/decorators/controller.decorator";
import { Post } from "../core/decorators/method.decorator";
import { Body, Inject } from "../core/decorators/params.decorator";
import UserModel from "../db/model/use.model";
import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET_KEY;

@Controller()
export class AuthenController {
  constructor(@Inject(UserModel) private usermodel: typeof UserModel) {}
  @Post("login")
  @Post("login")
  async login(@Body() body: any) {
    const { password, email } = body;

    const user = await this.usermodel.findOne({ email });

    if (!user) {
      throw new BadRequestException("Tài khoản không tồn tại");
    }

    if (user.password !== password) {
      throw new BadRequestException(
        "Mật khẩu không chính xác, vui lòng nhập lại"
      );
    }

    const { password: _, ...payload } = user.toObject();

    const access_Token = jwt.sign(payload, JWT_SECRET!, { expiresIn: "15m" });
    return {
      access_Token,
      user: payload,
    };
  }
}
