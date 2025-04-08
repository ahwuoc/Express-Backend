import { Response, NextFunction } from "express";
import { Request } from "../../ultils/types";
import ErrorAppMiddleware from "../base/error-middleware.base";
import BadRequestException from "../base/error.base";
import Injectable from "../../decorator/InjecTable.decorator";
Injectable()
export default class ErrorHandlerMiddleware implements ErrorAppMiddleware {
  use(error: any, req: Request, res: Response, next: NextFunction): void {
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
