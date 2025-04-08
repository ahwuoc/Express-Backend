import UserModel from "../db/model/use.model";
import Injectable from "../core/decorators/InjecTable.decorator";
import { Inject } from "../core/decorators/params.decorator";
@Injectable()
export class userService {
  constructor(@Inject(UserModel) private useModel: typeof UserModel) {}

  async createUser(body: any) {
    return await this.useModel.create(body);
  }
  async find() {
    return await this.useModel.find();
  }
}
