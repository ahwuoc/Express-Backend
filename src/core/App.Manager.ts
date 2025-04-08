import { Application } from "express";
import { Constructor, Container } from "./di/container.di";
import express, { type Router, type Response, type Request } from "express";
import RouteRegisterMiddleware from "./middleware/route-register.middleware";
import ExecuteHandlerMiddleware from "./middleware/execute-handler.middleware";
import ErrorHandlerMiddleware from "./middleware/error-handler.middleware";
import { ResponseFormatter } from "./middleware/response-formatter.middleware";
import { NotFoundMiddleware } from "./middleware/404-handler.middleware";
import { routeRegister } from "./routes/register-route";

interface TAppManager {
  controllers?: Constructor<any>[];
  middlewares?: any[];
  interceptors?: any[];
}

export default class AppManager {
  controllers: Constructor<any>[];
  AppExpress: Application;
  container: Container;
  instances: any;
  middlewares: any[];
  interceptors: any[];
  constructor({ controllers, middlewares, interceptors }: TAppManager) {
    this.controllers = controllers ?? [];
    this.AppExpress = express();
    this.container = new Container();
    this.middlewares = middlewares ?? [];
    this.interceptors = interceptors ?? [];
  }

  init() {
    this.DIregister();
    this.applyMiddlewares(...this.middlewares);
    this.RtRegister();
    this.applyMiddlewares(ExecuteHandlerMiddleware);
    this.applyMiddlewares(...this.interceptors);
    this.applyMiddlewares(ResponseFormatter);
    this.applyMiddlewares(ErrorHandlerMiddleware);
    this.applyMiddlewares(NotFoundMiddleware);
    return this.AppExpress;
  }

  DIregister() {
    this.instances = this.controllers.map((controller) => {
      this.container.register(controller);
      return this.container.get(controller);
    });
  }
  RtRegister() {
    this.instances.forEach((instance: any) => {
      const router = routeRegister(instance);
      this.AppExpress.use(router);
    });
  }
  applyMiddlewares(...middlewares: any[]) {
    if (middlewares && middlewares.length > 0) {
      middlewares.forEach((middleware) => {
        try {
          new middleware();
          this.container.register(middleware);
          const instance = this.container.get<any>(middleware);
          const test = this.AppExpress.use(instance.use.bind(instance));
        } catch {
          this.AppExpress.use(middleware);
        }
      });
    }
  }
}
