import { Response, NextFunction } from "express";
import { Request } from "../utils/types";

export default class AppErorrMiddlware {
  use(
    error: any,
    req: Request,
    res: Response,
    next: NextFunction
  ): void | Promise<void> {}
}
