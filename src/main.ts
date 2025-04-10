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

dotenv.config();
const PORT = 3000;
const appManager = new AppManager({
  controllers: [
    userControler,
    categoryController,
    AuthenController,
    UploadController,
  ],
  prefix: ["api"],
  middlewares: [
    {
      forRoutes: ["/uploads"],
      useClass: SingleFileUploadMiddleware,
    },
  ],
  guards: [AuthGuard],
});

(async () => {
  await connectMongo();
  const app = appManager.init();
  app.use("/static", express.static(path.resolve("./uploads")));
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
})();
