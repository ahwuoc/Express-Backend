import passport from "passport";
import Injectable from "@/decorators/injectable.decorator";

@Injectable()
export class PassportService {
  public passport = passport;
}
