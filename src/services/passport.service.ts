import Injectable from "../core/decorators/InjecTable.decorator";
import passport from "passport";
@Injectable()
export class PassportService {
  private passport: passport.PassportStatic = passport;

  getInstance() {
    return this.passport;
  }
}
