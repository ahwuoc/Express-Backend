import { Response, NextFunction } from "express";
import AppMiddleware from "../base/middleware.base";
import { Request } from "../utils/types";
import Injectable from "../decorators/injectable.decorator";
@Injectable()
export default class RouteRegisterMiddleware implements AppMiddleware {
  instance: any;
  handlerName: string;
  constructor(instance: any, handlerName: string) {
    this.handlerName = handlerName;
    this.instance = instance;
  }
  use(req: Request, res: Response, next: NextFunction): void {
    const context = {
      instance: this.instance,
      handlerName: this.handlerName,
      params: req.params,
    };
    req.context = context;
    next();
  }
}
