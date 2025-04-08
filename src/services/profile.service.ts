import Injectable from "../core/decorators/InjecTable.decorator";

@Injectable()
export default class profileService {
  getProfile() {
    console.log("Get profile");
  }
}
