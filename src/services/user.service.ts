import Injectable from "../decorator/InjecTable.decorator";
import commonServices from "./common.service";
@Injectable()
export class userService {
  constructor(public commonService: commonServices) {}
  createUser() {
    console.log("Tao users");
  }
}
