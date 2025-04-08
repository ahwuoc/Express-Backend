import { Response, NextFunction } from "express";
import AppMiddleware from "../base/middleware.base";
import { Request } from "../../ultils/types";
import Injectable from "../../decorator/InjecTable.decorator";
@Injectable()
export class ResponseFormatter implements AppMiddleware {
  use(req: Request, res: Response, next: NextFunction): void {
    const { data } = res.locals;
    if (data) {
       res.status(res.statusCode).send({
        messages: "Thành công",
        data,
        statusCode: res.statusCode,
      });
    }else{

      next();
    }
  }
}
