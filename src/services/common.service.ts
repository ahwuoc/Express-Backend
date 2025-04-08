import Injectable from "../decorator/InjecTable.decorator";

@Injectable()
export default class commonService {
  createUser() {
    return "Logic commonServices";
  }
}
