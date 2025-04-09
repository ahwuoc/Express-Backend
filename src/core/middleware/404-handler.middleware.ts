import { Response, NextFunction } from "express";
import { Request } from "../utils/types";
import AppMiddleware from "../base/middleware.base";
import Injectable from "../decorators/InjecTable.decorator";
import { AppService } from "../app/app.service";

@Injectable()
export class NotFoundMiddleware implements AppMiddleware {
  constructor(public AppService: AppService) {}
  use(req: Request, res: Response, next: NextFunction): void {
    const routers = this.AppService.getInstance()
      .router.stack.map((layer) => {
        if (layer.route) {
          return layer.route.path;
        }
        return undefined;
      })
      .filter((route) => route !== undefined);
    if (
      !req.route ||
      !routers.some((route: string) => route === req.route.path)
    ) {
      res.status(404).send({
        message: "Not Found",
        statusCode: 404,
      });
    } else next();
  }
}
