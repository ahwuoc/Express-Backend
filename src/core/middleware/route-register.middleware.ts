import { Response, NextFunction } from "express";
import AppMiddleware from "../base/middleware.base";
import { Request } from "../../ultils/types";
import Injectable from "../../decorator/InjecTable.decorator";
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
    };

    req.context = context;
    next();
  }
}
