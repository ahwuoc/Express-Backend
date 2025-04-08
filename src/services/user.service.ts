import Injectable from "../decorator/InjecTable.decorator";
import { Inject } from "../decorator/params.decorator";
import commonService from "./common.service";
@Injectable()
export class userService {
  constructor(@Inject(commonService) private commonService: commonService) {}

  createUser() {
    return this.commonService.createUser();
  }
}
