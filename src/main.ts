import "reflect-metadata";
import AppManager from "./core/App.Manager";
import userControler from "./controller/userController";
const PORT = 3000;

const appManager = new AppManager({
  controllers: [userControler],
});

const app = appManager.init();
app.listen(PORT, () => console.log(`App running at the localhost:${PORT}`));
