import express from "express";
import "reflect-metadata";
import Container from "./core/di/container.di";
import userControler from "./controller/userController";
const app = express();
const PORT = 3000;

const container = new Container();
container.register(userControler);
const user = container.get(userControler);

app.listen(PORT, () => console.log(`App running at the localhost:${PORT}`));
