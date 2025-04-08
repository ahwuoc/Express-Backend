import "reflect-metadata";
import AppManager from "./core/App.Manager";
import userControler from "./controller/userController";
import { ResponseFormatter } from "./core/middleware/response-formatter.middleware";
const PORT = 3000;

const appManager = new AppManager({
  controllers: [userControler],
  middlewares: [],
});

const app = appManager.init();
app.listen(PORT, () => console.log(`App running at the localhost:${PORT}`));
