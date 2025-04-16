import { Response, NextFunction } from "express";
import { Request } from "../utils/types";
import AppMiddleware from "../base/middleware.base";
import Injectable from "../decorators/injectable.decorator";

@Injectable()
export class NotFoundMiddleware implements AppMiddleware {
  use(req: Request, res: Response, next: NextFunction): void {
    if (res.headersSent) {
      return next();
    }
    res.status(404).json({
      message: "Not Found",
      statusCode: 404,
      path: req.originalUrl,
    });
  }
}
