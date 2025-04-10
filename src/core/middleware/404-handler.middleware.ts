import { Response, NextFunction } from "express";
import { Request } from "../utils/types";
import AppMiddleware from "../base/middleware.base";
import Injectable from "../decorators/InjecTable.decorator";

@Injectable()
export class NotFoundMiddleware implements AppMiddleware {
  use(req: Request, res: Response, next: NextFunction): void {
    const isStaticAsset = /\.(jpg|jpeg|png|gif|svg|css|js|ico|woff2?)$/.test(
      req.originalUrl
    );

    if (isStaticAsset) {
      return next();
    }
    res.status(404).json({
      message: "Not Found",
      statusCode: 404,
      path: req.originalUrl,
    });
  }
}
