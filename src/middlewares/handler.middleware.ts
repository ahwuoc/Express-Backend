import { Response, NextFunction } from "express";
import AppMiddleware from "../core/base/middleware.base";
import Injectable from "../core/decorators/InjecTable.decorator";
import { Request } from "../core/utils/types";

@Injectable()
export default class HandleMiddleware implements AppMiddleware {
  use(req: Request, res: Response, next: NextFunction): void {
    next();
  }
}
