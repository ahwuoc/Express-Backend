import { ExtractJwt, Strategy, VerifiedCallback } from "passport-jwt";
import Injectable from "@/core/decorators/injectable.decorator";
import { JwtPayload } from "jsonwebtoken";
import { PassportService } from "../services/passport.service";
import { Request } from "../core/utils/types";
import dotenv from "dotenv";
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET_KEY;
@Injectable()
export class JwtStrategy extends Strategy {
  constructor(passportService: PassportService) {
    super(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: JWT_SECRET!,
        passReqToCallback: true,
      },
      (req: Request, payload: JwtPayload, done: VerifiedCallback) => {
        this.validate(req, payload, done);
      }
    );

    passportService.passport.use(this);
  }

  validate(req: Request, payload: JwtPayload, done: VerifiedCallback) {
    req.user = payload;
    return done(null, payload);
  }
}
