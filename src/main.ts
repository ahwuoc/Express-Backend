import "reflect-metadata";
import AppManager from "./core/App.Manager";
import connectMongo from "./db/connect.db";
import AuthGuard from "./guards/auth.guard";
import dotenv from "dotenv";
import { SingleFileUploadMiddleware } from "./middlewares/single-upload.middleware";
import path from "path";
import express from "express";
import { BaseResponseFormatter } from "./interceptors/response-formatter.interceptor";
import { BodyValidateInterceptor } from "./interceptors/body-validate.interceptor";
import { ValidationPipe } from "./pipes/validation.pipe";
import useController from "@/controllers/user.controller";
dotenv.config();
const PORT = 3000;
const App = new AppManager({
  controllers: [useController],
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
  // await connectMongo();
  App.use("/static", express.static(path.resolve("./uploads")));
  App.init();
  App.listen(PORT, () => {
    console.log(`🌟 Server running at http://localhost:${PORT}`);
  });
})();
