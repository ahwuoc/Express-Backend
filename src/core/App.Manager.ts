import { Container } from "./dependency-manager/container.di";
import ExecuteHandlerMiddleware from "./middleware/execute-handler.middleware";
import ErrorHandlerMiddleware from "./middleware/error-handler.middleware";
import { BaseResponseFormatter } from "./middleware/response-formatter.middleware";
import { NotFoundMiddleware } from "./middleware/404-handler.middleware";
import { routeRegister } from "./routes/register-route";
import { combinePaths, defaultMethods } from "./utils/common";
import express, { Application, NextFunction, Response } from "express";
import { Request, TGateway } from "./utils/types";
import http from "http";
import { Server, Socket } from "socket.io";
import {
  Constructor,
  MiddlewareFunction,
  TMiddlewareItem,
} from "./utils/types";
import { getMetadata } from "./metedata/metadata";
import { METADATA_KEYS } from "./utils/constant";
import { UnAuthorizedException } from "./base/error.base";
export interface TAppManager {
  controllers?: Constructor<any>[];
  middlewares?: any[];
  interceptors?: TMiddleware;
  prefix?: string[];
  guards?: TMiddleware;
}

export type TMiddleware = TMiddlewareItem[];

export default class AppManager {
  private controllers: Constructor<any>[];
  private app: Application;
  private container: Container;
  private middlewares: TMiddleware;
  private interceptors: TMiddleware;
  private prefix: string;
  private guards: TMiddleware;
  private restfulInstances: any[] = [];
  private gatewayInstances: any[] = [];
  private servers = new Map<number, http.Server>();
  constructor({
    controllers,
    middlewares,
    interceptors,
    prefix,
    guards,
  }: TAppManager) {
    this.controllers = controllers ?? [];
    this.container = new Container();
    this.middlewares = middlewares ?? [];
    this.app = express();
    this.interceptors = interceptors ?? [];
    this.prefix = combinePaths(...(prefix ?? []));
    this.guards = guards ?? [];
  }

  init() {
    this.applyMiddlewares(
      express.json(),
      express.urlencoded({ extended: true })
    );
    this.instanceRegister();
    this.RtRegister();
    this.applyMiddlewares(NotFoundMiddleware);
    return this;
  }

  instanceRegister() {
    this.controllers.map((controller) => {
      const controllerPath = getMetadata(
        METADATA_KEYS.method_metadata_key,
        controller
      );
      const instance = this.DIregister(controller);
      if (controllerPath !== undefined) {
        this.restfulInstances.push(instance);
      } else {
        this.gatewayInstances.push(instance);
      }
    });
  }
  getMiddleware(...middlewares: TMiddleware) {
    if (middlewares && middlewares.length > 0) {
      return middlewares.map((middleware) => {
        if (
          typeof middleware === "object" &&
          "forRoutes" in middleware &&
          "useClass" in middleware
        ) {
          const instance = this.DIregister(middleware.useClass);
          return (req: Request, res: Response, next: NextFunction) => {
            middleware.forRoutes.forEach((route) => {
              const path = combinePaths(this.prefix, route);
              if (req.route.path.startsWith(path)) {
                instance.use(req, res, next);
              } else {
                next();
              }
            });
          };
        } else {
          try {
            new (middleware as Constructor<any>)();
            const instance = this.DIregister(middleware as Constructor<any>);
            return instance.use.bind(instance);
          } catch (error) {
            return middleware;
          }
        }
      });
    }
    return [];
  }

  DIregister(constructor: Constructor<any>) {
    this.container.register(constructor);
    return this.container.get(constructor);
  }
  RtRegister() {
    this.restfulInstances.forEach((instance: any) => {
      const routers = routeRegister(instance);
      routers.forEach((router) => {
        const path = combinePaths(this.prefix, router.path);
        this.app[router.method.toLowerCase() as keyof Application](
          path,
          router.middleware,
          this.getMiddleware(...this.middlewares),
          this.getMiddleware(...this.guards),
          this.getMiddleware(ExecuteHandlerMiddleware),
          this.getMiddleware(...this.interceptors),
          this.getMiddleware(BaseResponseFormatter),
          (error: any, req: Request, res: Response, next: NextFunction) => {
            const instance = this.DIregister(ErrorHandlerMiddleware);
            instance.use(error, req, res, next);
          }
        );
        console.log(`🗸 Đăng ký route thành công ${router.method} ${path}`);
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
          const instance = this.DIregister(middleware.useClass);
          middleware.forRoutes.forEach((route) => {
            const path = combinePaths(this.prefix, route);
            if (typeof instance.use === "function") {
              this.app.use(path, instance.use.bind(instance));
            }
          });
        } else {
          const MiddlewareClass = middleware as Constructor<any>;
          const instance = this.DIregister(MiddlewareClass);
          if (typeof instance.use === "function") {
            this.app.use(instance.use.bind(instance));
          }
        }
      } catch (error) {
        this.app.use(middleware as MiddlewareFunction);
      }
    });
  }
  GatewayRegister(port: number) {
    this.gatewayInstances.forEach((instance) => {
      const gatewayOption: TGateway = getMetadata(
        METADATA_KEYS.socket_gateway_metadata_key,
        instance.constructor
      );
      if (!gatewayOption) {
        return;
      }
      let socketServer: http.Server;
      const targetPort = gatewayOption.port ?? port;
      if (this.servers.has(targetPort)) {
        socketServer = this.servers.get(targetPort)!;
      } else {
        socketServer = http.createServer();
        this.servers.set(targetPort, socketServer);
        socketServer.listen(targetPort);
      }
      const ioSocket = new Server(socketServer, {
        cors: gatewayOption.cors ?? {
          origin: "*",
        },
      });
      const namespace = ioSocket.of(gatewayOption.namespace ?? "/");
      namespace.use((socket: Socket, next: any) => {
        if (typeof instance.handleHandshake === "function") {
          const isAuthenticted = instance.handleHandshake(socket);
          if (!isAuthenticted) {
            return next(new UnAuthorizedException());
          }
          return next();
        } else {
          return next();
        }
      });
      const methods = Object.getOwnPropertyNames(
        Object.getPrototypeOf(instance)
      ).filter((method) => !defaultMethods.includes(method));
      namespace.on("connection", (socket) => {
        methods.forEach((method) => {
          const message = getMetadata(
            METADATA_KEYS.subscribe_message_metadata_key,
            instance[method]
          );
          if (!message) {
            return;
          }
          socket.on(message, (data: any) => {
            instance[method](socket, data);
          });
        });
      });
    });
  }
  use(path: string = "/", middleware: MiddlewareFunction) {
    this.app.use(path, middleware);
  }
  listen(port: number, callback: () => void) {
    const server = http.createServer(this.app);
    this.servers.set(port, server);
    this.app.listen(port, callback);
    this.GatewayRegister(port);
  }
}
