import passport from "passport";
import { AppContext } from "../core/base/context.base";
import { AppGuard } from "../core/base/guard.base";
import Injectable from "../core/decorators/InjecTable.decorator";
import { Inject } from "../core/decorators/params.decorator";
import { PassportService } from "../services/passport.service";
import { JwtStrategy } from "../strategies/jwt.strategies";
import { getMetadata } from "../core/metedata/metadata";
import { METADATA_KEYS } from "../core/utils/constant";
import { JwtPayload } from "jsonwebtoken";
import { UnAuthorizedException } from "../core/base/error.base";

@Injectable()
export default class AuthGuard extends AppGuard {
  constructor(
    jwtStrategy: JwtStrategy,
    @Inject(PassportService) private passportServie: PassportService
  ) {
    super();
  }
  canActive(context: AppContext): boolean | Promise<boolean> {
    const passport = this.passportServie.passport;
    const controllerClass = context.getClass();
    const handler = context.getHandler();
    const req = context.switchToHtppRequest();
    const res = context.switchToHtppResponse();
    const next = context.getNextFunction();

    const isProtected =
      getMetadata(METADATA_KEYS.protected_metadata_key, handler) ??
      getMetadata(METADATA_KEYS.protected_metadata_key, controllerClass);
    if (!isProtected) {
      return true;
    }
    passport.authenticate(
      "jwt",
      { session: false },
      (error: any, payload: JwtPayload, info: any) => {
        if (error || info) {
          throw new UnAuthorizedException();
        }
        return true;
      }
    )(req, res, next);
    return true;
  }
}
