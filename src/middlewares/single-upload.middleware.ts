import { Response, NextFunction } from "express";
import AppMiddleware from "../core/base/middleware.base";
import Injectable from "../core/decorators/InjecTable.decorator";
import { Request } from "../core/utils/types";
import { Inject } from "../core/decorators/params.decorator";
import UploadService from "../services/upload.service";
import { BadRequestException } from "../core/base/error.base";

@Injectable()
export class SingleFileUploadMiddleware implements AppMiddleware {
  constructor(private uploaderService: UploadService) {}
  use(req: Request, res: Response, next: NextFunction): void {
    this.uploaderService.single("file")(req, res, (error: any) => {
      if (error) {
        throw new BadRequestException(error);
      }
      next();
    });
  }
}
