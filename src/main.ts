import "reflect-metadata";
import AppManager from "./core/App.Manager";
import userControler from "./controller/userController";
import connectMongo from "./db/connect.db";
import TestMiddleware from "./middlewares/test.middleware";
import { MiddlewareClass, MiddlewareForRoute } from "./core/utils/types";
import AuthGuard from "./guards/auth.middleware";
const PORT = 3000;

//  ===========Midleware Global=======
// const classMiddlewares: MiddlewareClass[] = [SomeMiddleware];

// ===========Middleware Route cụ thể=========
// const routeSpecific: MiddlewareForRoute[] = [
//   { forRoute: "/api", useClass: CustomMiddleware }
// ];

const appManager = new AppManager({
  controllers: [userControler],
  prefix: ["api"],
  middlewares: [],
  guards: [AuthGuard],
});

(async () => {
  await connectMongo();
  const AppServer = appManager.init();
  AppServer.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
})();
