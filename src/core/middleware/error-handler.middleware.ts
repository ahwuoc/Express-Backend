import { Response, NextFunction } from "express";
import { Request } from "../utils/types";
import AppErorrMiddlware from "../base/error-middleware.base";
import { BadRequestException } from "../base/error.base";
import Injectable from "../decorators/InjecTable.decorator";

Injectable();
export default class ErrorHandlerMiddleware implements AppErorrMiddlware {

  use(error: any, req: Request, res: Response, next: NextFunction): void {
    if (next === undefined) return (res as unknown as NextFunction)();
    let messages = error.message ?? "Internal Error";
    let statusCode = error.statusCode ?? 500;
    res.status(statusCode).send({
      statusCode,
      messages,
    });
  }
}
