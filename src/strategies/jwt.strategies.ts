import { ExtractJwt, Strategy, VerifiedCallback } from "passport-jwt";
import Injectable from "../core/decorators/InjecTable.decorator";
import { JwtPayload } from "jsonwebtoken";
import passport from "passport";
import { PassportService } from "../services/passport.service";
import { Inject } from "../core/decorators/params.decorator";
const JWT_SECRET = process.env.JWT_SECRET_KEY;
@Injectable()
export class JwtStrategy extends Strategy {
  constructor(@Inject(PassportService) passportService: PassportService) {
    super(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: JWT_SECRET!,
        passReqToCallback: true,
      },
      (req: Request, payload: JwtPayload, done: VerifiedCallback) => {
        this.validate(payload, done);
      }
    );
    passportService.getInstance().use(this);
  }
  validate(payload: JwtPayload, done: VerifiedCallback) {
    return done(null, payload);
  }
}
