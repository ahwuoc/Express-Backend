import Injectable from "../decorator/InjecTable.decorator";

@Injectable()
export default class profileService {
  getProfile() {
    console.log("Get profile");
  }
}
