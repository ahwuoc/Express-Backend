import "reflect-metadata";
import AppManager from "./core/App.Manager";
import connectMongo from "./db/connect.db";
import AuthGuard from "./guards/auth.guard";
import dotenv from "dotenv";
import { SingleFileUploadMiddleware } from "./middlewares/single-upload.middleware";
import { BaseResponseFormatter } from "./interceptors/response-formatter.interceptor";
import { ValidationPipe } from "./pipes/validation.pipe";
import importDynamic from "./utils/importControllers";
dotenv.config();
const PORT = 3000;
const App = new AppManager({
  controllers: importDynamic(),
  prefix: ["api"],
  middlewares: [
    {
      forRoutes: ["/uploads"],
      useClass: SingleFileUploadMiddleware,
    },
  ],
  guards: [
    {
      forRoutes: ["/users"],
      useClass: AuthGuard,
    },
  ],
  interceptors: [BaseResponseFormatter],
  pipes: [ValidationPipe],
});

(async () => {
  await connectMongo();
  App.pathStatic("/public", "./uploads");
  App.init();
  App.listen(PORT, () => {
    console.log(`🌟 Server running at http://localhost:${PORT}`);
  });
})();
