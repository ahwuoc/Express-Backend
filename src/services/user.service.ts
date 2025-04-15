import UserModel from "../model/use.model";
import Injectable from "../core/decorators/InjecTable.decorator";
import { Inject } from "../core/decorators/params.decorator";
import { BadRequestException } from "../core/base/error.base";
@Injectable()
export default class userService {
  constructor(@Inject(UserModel) private userModel: typeof UserModel) {}

  async createUser(body: any) {
    return await this.userModel.create(body);
  }
  async find() {
    return await this.userModel.find();
  }
  async findOne(id: string) {
    try {
      const user = await this.userModel.findById(id);
      return user;
    } catch {
      throw new BadRequestException("ID không hợp lệ hoặc user không tồn tại");
    }
  }
  async delete(id: string) {
    try {
      const user = await this.userModel.findById(id);
      if (!user) throw new BadRequestException("Không có user tồn tại");
      await this.userModel.deleteOne({ _id: id });
      return "Thành công";
    } catch (error) {
      throw new BadRequestException("ID không hợp lệ hoặc user không tồn tại");
    }
  }
}
