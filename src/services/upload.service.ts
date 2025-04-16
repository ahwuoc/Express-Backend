import path from "path";
import multer, { Multer } from "multer";
import Injectable from "../core/decorators/injectable.decorator";
import { Request } from "express";

type TUploader = {
  destination?: string;
  filename?: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: any, filename: string) => void
  ) => void;
};

@Injectable()
export default class UploadService {
  upload: Multer;

  constructor(options: TUploader = {}) {
    const storage = multer.diskStorage({
      destination: options.destination ?? path.resolve("./uploads"),
      filename:
        options.filename ??
        ((req, file, cb) => {
          cb(null, `${Date.now()}-${file.originalname}`);
        }),
    });

    this.upload = multer({ storage });
  }
  single(filename: string) {
    return this.upload.single(filename);
  }
  array(filename: string, maxCount: number) {
    return this.upload.array(filename, maxCount);
  }
  fileds(array: multer.Field[]) {
    return this.upload.fields(array);
  }
}
