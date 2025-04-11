import { Response, NextFunction } from "express";
import { Request } from "../utils/types";
import AppMiddleware from "../base/middleware.base";
import Injectable from "../decorators/InjecTable.decorator";

@Injectable()
export class NotFoundMiddleware implements AppMiddleware {
  use(req: Request, res: Response, next: NextFunction): void {
    res.status(404).json({
      message: "Not Found",
      statusCode: 404,
      path: req.originalUrl,
    });
  }
}
