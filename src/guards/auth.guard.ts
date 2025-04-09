import { Response, NextFunction } from "express";
import AppMiddleware from "../core/base/middleware.base";
import Injectable from "../core/decorators/InjecTable.decorator";
import { Request } from "../core/utils/types";
import { getMetadata } from "../core/metedata/metadata";
import { PROTECTED_METADATA_KEY } from "../utils/constant";
import { AppService } from "../core/app/app.service";

@Injectable()
export default class AuthGuard implements AppMiddleware {
  use(req: Request, res: Response, next: NextFunction): void {
    console.log("Cần đăng nhập");
    next();
  }
}
