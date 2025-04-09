import { Response, NextFunction } from "express";
import { Request } from "../utils/types";
import ErrorAppMiddleware from "../base/error-middleware.base";
import BadRequestException from "../base/error.base";
import Injectable from "../decorators/InjecTable.decorator";
import { AppService } from "../app/app.service";
Injectable();
export default class ErrorHandlerMiddleware implements ErrorAppMiddleware {
  constructor(private AppExpress: AppService) {}
  use(error: any, req: Request, res: Response, next: NextFunction): void {
    if (next === undefined) return (res as unknown as NextFunction)();
    let messages = "Internal Error";
    let statusCode = 500;
    if (error instanceof BadRequestException) {
      messages = error.message;
      statusCode = error.statusCode;
    }
    res.status(statusCode).send({
      statusCode,
      messages,
    });
  }
}
