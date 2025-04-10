import { Response, NextFunction } from "express";
import AppMiddleware from "../core/base/middleware.base";
import Injectable from "../core/decorators/InjecTable.decorator";
import { Request } from "../core/utils/types";
import { AppService } from "../core/app/app.service";

@Injectable()
export default class HandleMiddleware implements AppMiddleware {
  constructor(private AppService: AppService) {}
  use(req: Request, res: Response, next: NextFunction): void {
    next();
  }
}
