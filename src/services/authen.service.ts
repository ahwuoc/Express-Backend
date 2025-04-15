import { BadRequestException } from "../core/base/error.base";
import Injectable from "../core/decorators/InjecTable.decorator";
import { Inject } from "../core/decorators/params.decorator";
import UserModel from "../models/user.model";
import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET_KEY;
@Injectable()
export class AuthenService {
  constructor(@Inject(UserModel) private usermodel: typeof UserModel) {}

  async login(body: any) {
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
