import { Container } from "./dependency-manager/container.di";
import express, {
  type Response,
  type Request,
  type NextFunction,
  type Application,
} from "express";
import ExecuteHandlerMiddleware from "./middleware/execute-handler.middleware";
import ErrorHandlerMiddleware from "./middleware/error-handler.middleware";
import { BaseResponseFormatter } from "./middleware/response-formatter.middleware";
import { NotFoundMiddleware } from "./middleware/404-handler.middleware";
import { routeRegister } from "./routes/register-route";
import { combinePaths } from "./utils/common";
import {
  Constructor,
  MiddlewareFunction,
  TMiddlewareItem,
} from "./utils/types";

interface TAppManager {
  controllers?: Constructor<any>[];
  middlewares?: any[];
  interceptors?: TMiddleware;
  prefix?: string[];
  guards?: TMiddleware;
}

type TMiddleware = TMiddlewareItem[];

export default class AppManager {
  controllers: Constructor<any>[];
  AppExpress: Application;
  container: Container;
  instances: any;
  middlewares: TMiddleware;
  interceptors: TMiddleware;
  prefix: string;
  guards: TMiddleware;
  constructor({
    controllers,
    middlewares,
    interceptors,
    prefix,
    guards,
  }: TAppManager) {
    this.controllers = controllers ?? [];
    this.AppExpress = express();
    this.container = new Container();
    this.middlewares = middlewares ?? [];
    this.interceptors = interceptors ?? [];
    this.prefix = combinePaths(...(prefix ?? []));
    this.guards = guards ?? [];
  }

  init() {
    this.DIregister();
    // ========Middleware======
    this.applyMiddlewares(
      express.json(),
      express.urlencoded({ extended: true })
    );
    this.applyMiddlewares(...this.middlewares);
    this.RtRegister();
    this.applyMiddlewares(...this.guards);
    // =====================================================
    this.applyMiddlewares(ExecuteHandlerMiddleware);
    this.applyMiddlewares(...this.interceptors);
    this.applyMiddlewares(BaseResponseFormatter);
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
      this.AppExpress.use(this.prefix, router);
    });
  }
  applyMiddlewares(...middlewares: TMiddleware) {
    if (middlewares && middlewares.length > 0) {
      middlewares.forEach((middleware) => {
        if (
          typeof middleware === "object" &&
          "forRoute" in middleware &&
          "useClass" in middleware
        ) {
          this.container.register(middleware.useClass);
          const path = combinePaths(this.prefix, middleware.forRoute);

          const instance = this.container.get<any>(middleware.useClass);
          this.AppExpress.use(path, instance.use.bind(instance));
        } else {
          try {
            middleware = middleware as Constructor<any>;
            new middleware();
            this.container.register(middleware);

            const instance = this.container.get<any>(middleware);
            const test = this.AppExpress.use(instance.use.bind(instance));
          } catch {
            this.AppExpress.use(middleware as MiddlewareFunction);
          }
        }
      });
    }
  }
}
