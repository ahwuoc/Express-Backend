import { AppGuard } from "../core/base/guard.base";
import { AppContext } from "../core/base/context.base";
import { UnAuthorizedException } from "../core/base/error.base";
import { PassportService } from "../services/passport.service";
import { PROTECTED_METADATA_KEY } from "../utils/constant";
import { JwtPayload } from "jsonwebtoken";
import Injectable from "../core/decorators/injectable.decorator";
import { JwtStrategy } from "../strategies/jwt.strategies";
import { getMetadata } from "../core/metedata/metadata";

@Injectable()
export default class AuthGuard extends AppGuard {
  constructor(
    jwtStrategy: JwtStrategy,
    private passportService: PassportService
  ) {
    super();
  }
  canActive(context: AppContext): boolean {
    const passport = this.passportService.passport;
    const controllerClass = context.getClass();
    const handler = context.getHandler();
    const req = context.switchToHttpRequest();
    const res = context.switchToHttpResponse();
    const next = context.getNextFunction();
    const isProtected =
      getMetadata(PROTECTED_METADATA_KEY, handler) ??
      getMetadata(PROTECTED_METADATA_KEY, controllerClass);
    if (!isProtected) {
      return true;
    }
    passport.authenticate(
      "jwt",
      { session: false },
      (error: any, payload: JwtPayload, info: any) => {
        if (error || info) {
          next(new UnAuthorizedException());
        }
        console.log("Quyền truy cập hợp lệ", payload);
        return true;
      }
    )(req, res, next);
    return true;
  }
}
