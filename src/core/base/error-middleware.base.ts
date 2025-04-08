import { Response, NextFunction } from "express";
import { Request } from "../../ultils/types";

export default class AppErrorMiddleware {
  use(
    error: any,
    req: Request,
    res: Response,
    next: NextFunction
  ): void | Promise<void> {}
}
