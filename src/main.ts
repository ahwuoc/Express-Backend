import "reflect-metadata";
import AppManager from "./core/App.Manager";
import connectMongo from "./db/connect.db";
import dotenv from "dotenv";
import { SingleFileUploadMiddleware } from "./middlewares/single-upload.middleware";
import { BaseResponseFormatter } from "./interceptors/response-formatter.interceptor";
import { ValidationPipe } from "./pipes/validation.pipe";
import AuthGuard from "./guards/auth.guard";
dotenv.config();
const PORT = 3000;
const App = new AppManager({
  prefix: ["api"],
  middlewares: [
    {
      forRoutes: ["/uploads"],
      useClass: SingleFileUploadMiddleware,
    },
  ],
  guards: [AuthGuard],
  interceptors: [BaseResponseFormatter],
});

(async () => {
  await connectMongo();
  App.pathStatic("/public", "/public");
  App.listen(PORT);
})();
