import type { Response, NextFunction } from "express";
import { Request } from "../../ultils/types";
export default class AppMiddleware {
  use(req: Request, res: Response, next: NextFunction): void {}
}
