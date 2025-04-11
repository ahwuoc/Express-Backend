import passport from "passport";
import Injectable from "../core/decorators/InjecTable.decorator";

@Injectable()
export class PassportService {
  passport = passport;
}
