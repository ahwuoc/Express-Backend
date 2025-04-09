import express, { Application } from "express";
import Injectable from "../decorators/InjecTable.decorator";

@Injectable()
export class AppService {
  private express: Application = express();
  getInstance(): Application {
    return this.express;
  }
}
