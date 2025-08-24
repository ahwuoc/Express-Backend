import Injectable from "../core/decorators/injectable.decorator";

@Injectable()
export default class commonService {
  createUser() {
    return "Logic commonServices";
  }
}
