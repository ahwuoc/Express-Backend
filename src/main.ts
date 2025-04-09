import "reflect-metadata";
import AppManager from "./core/App.Manager";
import userControler from "./controller/userController";
import connectMongo from "./db/connect.db";
import HandleMiddleware from "./middlewares/handler.middleware";
import AuthGuard from "./guards/auth.guard";
import { categoryController } from "./controller/categoryController";
const PORT = 3000;
const appManager = new AppManager({
  controllers: [userControler, categoryController],
  prefix: ["api"],
  middlewares: [HandleMiddleware],
  guards: [
    // {
    //   forRoutes: ["/users", "/categories"],
    //   useClass: AuthGuard,
    // },
  ],
});

(async () => {
  await connectMongo();
  const app = appManager.init();
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
})();
