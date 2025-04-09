import { Container } from "./dependency-manager/container.di";
import ExecuteHandlerMiddleware from "./middleware/execute-handler.middleware";
import ErrorHandlerMiddleware from "./middleware/error-handler.middleware";
import { BaseResponseFormatter } from "./middleware/response-formatter.middleware";
import { NotFoundMiddleware } from "./middleware/404-handler.middleware";
import { routeRegister } from "./routes/register-route";
import { combinePaths } from "./utils/common";
import express, { Application } from "express";
import {
  Constructor,
  MiddlewareFunction,
  TMiddlewareItem,
} from "./utils/types";
import { AppService } from "./app/app.service";

export interface TAppManager {
  controllers?: Constructor<any>[];
  middlewares?: any[];
  interceptors?: TMiddleware;
  prefix?: string[];
  guards?: TMiddleware;
}

export type TMiddleware = TMiddlewareItem[];

export default class AppManager {
  controllers: Constructor<any>[];
  app: Application;
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
    this.container = new Container();
    this.container.register(AppService);
    this.app = this.container.get<AppService>(AppService).getInstance();
    this.middlewares = middlewares ?? [];
    this.interceptors = interceptors ?? [];
    this.prefix = combinePaths(...(prefix ?? []));
    this.guards = guards ?? [];
  }

  init() {
    this.DIregister();
    this.applyMiddlewares(
      express.json(),
      express.urlencoded({ extended: true })
    );
    this.RtRegister();
    this.applyMiddlewares(NotFoundMiddleware);
    this.applyMiddlewares(...this.middlewares);
    this.applyMiddlewares(...this.middlewares);
    this.applyMiddlewares(...this.guards);
    this.applyMiddlewares(...this.interceptors);
    this.applyMiddlewares(ExecuteHandlerMiddleware);
    this.applyMiddlewares(BaseResponseFormatter);
    this.applyMiddlewares(ErrorHandlerMiddleware);
    return this.app;
  }

  DIregister() {
    this.instances = this.controllers.map((controller) => {
      this.container.register(controller);
      return this.container.get(controller);
    });
  }
  RtRegister() {
    this.instances.forEach((instance: any) => {
      const routers = routeRegister(instance);
      routers.forEach((router) => {
        const path = combinePaths(this.prefix, router.path);
        this.app[router.method.toLowerCase() as keyof Application](
          path,
          router.middleware
        );
        console.log(`✅ Đăng ký route  thành công ${router.method} ${path}`);
      });
    });
  }

  applyMiddlewares(...middlewares: TMiddleware) {
    if (!middlewares || middlewares.length === 0) return;

    middlewares.forEach((middleware, index) => {
      try {
        if (
          typeof middleware === "object" &&
          "forRoutes" in middleware &&
          "useClass" in middleware
        ) {
          this.container.register(middleware.useClass);
          const instance = this.container.get<any>(middleware.useClass);

          middleware.forRoutes.forEach((route) => {
            const path = combinePaths(this.prefix, route);
            if (typeof instance.use === "function") {
              this.app.use(path, instance.use.bind(instance));
            }
          });
        } else {
          const MiddlewareClass = middleware as Constructor<any>;
          const testInstance = new MiddlewareClass();
          this.container.register(MiddlewareClass);
          const instance = this.container.get<any>(MiddlewareClass);
          if (typeof instance.use === "function") {
            this.app.use(instance.use.bind(instance));
          }
        }
      } catch (error) {
        this.app.use(middleware as MiddlewareFunction);
      }
    });
  }
}
