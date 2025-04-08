import { Response, NextFunction } from "express";
import BadRequestException from "../core/base/error.base";
import { Request } from "../ultils/types";
import ErrorAppMiddleware from "./error.middleware";
export default class CumstomErrorHandlerMiddleware
  implements ErrorAppMiddleware
{
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
      test: "Error test",
    });
  }
}
