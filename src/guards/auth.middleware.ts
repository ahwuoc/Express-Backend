import { Response, NextFunction } from "express";
import AppMiddleware from "../core/base/middleware.base";
import Injectable from "../core/decorators/InjecTable.decorator";
import { Request } from "../core/utils/types";
import { getMetadata } from "../core/metedata/metadata";
import { PROTECTED_METADATA_KEY } from "../utils/constant";

@Injectable()
export default class AuthGuard implements AppMiddleware {
  use(req: Request, res: Response, next: NextFunction): void {
    if (req.context) {
      const { instance, handlerName } = req.context;

      const isProtected =
        getMetadata(PROTECTED_METADATA_KEY, instance[handlerName]) ??
        getMetadata(PROTECTED_METADATA_KEY, instance.constructor);
      if (isProtected) {
        console.log("Can dang nhap");
      }
    }
    next();
  }
}
