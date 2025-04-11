import "reflect-metadata";
import AppManager from "./core/App.Manager";
import userControler from "./controller/userController";
import connectMongo from "./db/connect.db";
import AuthGuard from "./guards/auth.guard";
import { categoryController } from "./controller/categoryController";
import { AuthenController } from "./controller/authenController";
import dotenv from "dotenv";
import { UploadController } from "./controller/uploadController";
import { SingleFileUploadMiddleware } from "./middlewares/single-upload.middleware";
import path from "path";
import express from "express";
import { ChatController } from "./controller/chatController";
import { BaseResponseFormatter } from "./interceptors/response-formatter.interceptor";
import { BodyValidateInterceptor } from "./interceptors/body-validate.intercept";

dotenv.config();
const PORT = 3000;
const App = new AppManager({
  controllers: [
    userControler,
    categoryController,
    AuthenController,
    UploadController,
    ChatController,
  ],
  prefix: ["api"],
  middlewares: [
    {
      forRoutes: ["/uploads"],
      useClass: SingleFileUploadMiddleware,
    },
  ],
  guards: [AuthGuard],
  interceptors: [
    {
      forRoutes: ["/users", "/test"],
      useClass: BaseResponseFormatter,
    },
    BodyValidateInterceptor,
  ],
});

(async () => {
  await connectMongo();
  App.use("/static", express.static(path.resolve("./uploads")));
  App.init();
  App.listen(PORT, () => {
    console.log(`🌟 Server running at http://localhost:${PORT}`);
  });
})();
