import "reflect-metadata";
import AppManager from "./core/App.Manager";
import userControler from "./controller/userController";
import connectMongo from "./db/connect.db";
import HandleMiddleware from "./middlewares/handler.middleware";
import AuthGuard from "./guards/auth.guard";
import { categoryController } from "./controller/categoryController";
import { AuthenController } from "./controller/AuthController";
import dotenv from "dotenv";
dotenv.config();
const PORT = 3000;
const appManager = new AppManager({
  controllers: [userControler, categoryController, AuthenController],
  prefix: ["api"],
  middlewares: [HandleMiddleware],
  // guards: [AuthGuard],
});

(async () => {
  await connectMongo();
  const app = appManager.init();
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
})();
