import { Container } from "./dependency-manager/container.di";
import ExecuteHandlerMiddleware from "./middleware/execute-handler.middleware";
import ErrorHandlerMiddleware from "./middleware/error-handler.middleware";
import { NotFoundMiddleware } from "./middleware/404-handler.middleware";
import { routeRegister } from "./routes/register-route";
import { combinePaths, defaultMethods } from "./utils/common";
import express, { Application, NextFunction, Response } from "express";
import {
  MiddlewareClass,
  MiddlewareForRoute,
  MiddlewareFunctionError,
  Request,
  TGateway,
} from "./utils/types";
import path from "path";
import http from "http";
import { Server, Socket } from "socket.io";
import { Constructor, MiddlewareFunction } from "./utils/types";
import { getMetadata, setMetadata } from "./metedata/metadata";
import { METADATA_KEYS } from "./utils/constant";
import { UnAuthorizedException } from "./base/error.base";
import { NextCallFunction } from "./base/next-call-function.base";
import { AppContext } from "./base/context.base";
export interface TAppManager {
  controllers?: Constructor<any>[];
  middlewares?: any[];
  interceptors?: TInterceptor;
  prefix?: string[];
  guards?: TMiddleware;
  pipes?: TPipes;
}

export type TInterceptor = (Constructor<any> | MiddlewareForRoute)[];
export type TPipes = (Constructor<any> | MiddlewareForRoute)[];
export type TMiddleware = (
  | MiddlewareFunction
  | MiddlewareFunctionError
  | MiddlewareClass
  | MiddlewareForRoute
)[];

export default class AppManager {
  private controllers: Constructor<any>[];
  private app: Application;
  private container: Container;
  private middlewares: TMiddleware;
  private interceptors: TInterceptor;
  private prefix: string;
  private guards: TMiddleware;
  private restfulInstances: any[] = [];
  private gatewayInstances: any[] = [];
  private servers = new Map<number, http.Server>();
  private pipes: TPipes;
  constructor({
    controllers,
    middlewares,
    interceptors,
    prefix,
    guards,
    pipes,
  }: TAppManager) {
    this.controllers = controllers ?? [];
    this.container = new Container();
    this.middlewares = middlewares ?? [];
    this.app = express();
    this.interceptors = interceptors ?? [];
    this.prefix = combinePaths(...(prefix ?? []));
    this.guards = guards ?? [];
    this.pipes = pipes ?? [];
  }

  public init() {
    this.applyMiddlewares(
      express.json(),
      express.urlencoded({ extended: true })
    );
    this.useGlobalPipes();
    this.instanceRegister();
    this.RtRegister();
    this.applyMiddlewares(NotFoundMiddleware);
  }

  private instanceRegister() {
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
  private getMiddleware(...middlewares: TMiddleware) {
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
  useGlobalPipes() {
    if (this.pipes && this.pipes.length > 0) {
      for (const controller of this.controllers) {
        const controllerPath = getMetadata(
          METADATA_KEYS.method_metadata_key,
          controller
        );
        if (controllerPath === undefined) {
          continue;
        }
        const methods = Object.getOwnPropertyNames(controller.prototype).filter(
          (method) => !defaultMethods.includes(method)
        );
        methods.forEach((method) => {
          this.pipes.forEach((pipe) => {
            if (
              typeof pipe === "object" &&
              "forRoutes" in pipe &&
              "useClass" in pipe
            ) {
              const methodMetadata = getMetadata(
                METADATA_KEYS.method_metadata_key,
                controller.prototype[method]
              );
              const path = combinePaths(controllerPath, methodMetadata.path);
              pipe.forRoutes.forEach((route) => {
                if (path.startsWith(route)) {
                  controller.prototype[method].metadata = {
                    ...controller.prototype[method].metadata,
                    [METADATA_KEYS.use_pipes_metadata_key]: pipe.useClass,
                  };
                }
              });
            } else {
              controller.prototype[method].metadata = {
                ...controller.prototype[method].metadata,
                [METADATA_KEYS.use_pipes_metadata_key]: pipe,
              };
            }
          });
        });
      }
    }
  }

  public pathStatic(pathStatic: string, folder: string) {
    this.app.use(pathStatic, express.static(path.resolve(folder)));
  }
  private DIregister(constructor: Constructor<any>) {
    this.container.register(constructor);
    return this.container.get(constructor);
  }
  private RtRegister() {
    this.restfulInstances.forEach((instance: any) => {
      const routers = routeRegister(instance);
      routers.forEach((router) => {
        const path = combinePaths(this.prefix, router.path);
        this.app[router.method.toLowerCase() as keyof Application](
          path,
          router.middleware,
          this.getMiddleware(...this.middlewares),
          this.getMiddleware(...this.guards),

          async (req: Request, res: Response, next: NextFunction) => {
            const executeHandeleInstance = this.getMiddleware(
              ExecuteHandlerMiddleware
            );
            const instanceNextCallFunction = new NextCallFunction(
              req,
              res,
              next,
              ...executeHandeleInstance
            );
            const interceptFunctions = this.getInterceptors(req);
            const context = new AppContext(req, res, next);
            for (const interceptFunction of interceptFunctions) {
              if (!interceptFunction) continue;
              instanceNextCallFunction.observable = await Promise.resolve(
                interceptFunction(context, instanceNextCallFunction)
              );
            }
            instanceNextCallFunction.hanlde().subscribe({
              next: (data) => res.send(data),
              error: (error) => next(error),
            });
          },
          (error: any, req: Request, res: Response, next: NextFunction) => {
            const instance = this.DIregister(ErrorHandlerMiddleware);
            instance.use(error, req, res, next);
          }
        );
        console.log(`🗸 Đăng ký route thành công ${router.method} ${path}`);
      });
    });
  }

  private getInterceptors(req: Request) {
    return this.interceptors.flatMap((interceptor) => {
      if (
        typeof interceptor === "object" &&
        "forRoutes" in interceptor &&
        "useClass" in interceptor
      ) {
        const instance = this.DIregister(interceptor.useClass);
        return interceptor.forRoutes.map((route) => {
          const path = combinePaths(this.prefix, route);
          if (req.route.path.startsWith(path)) {
            return instance.intercept.bind(instance);
          }
          return undefined;
        });
      } else {
        const instance = this.DIregister(interceptor);
        return instance.intercept.bind(instance);
      }
    });
  }

  private applyMiddlewares(...middlewares: TMiddleware) {
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
  private GatewayRegister(port: number) {
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
          const isAuthenticated = instance.handleHandshake(socket);
          if (!isAuthenticated) {
            return next(new UnAuthorizedException());
          }
          return next();
        } else return next();
      });
      const methods = Object.getOwnPropertyNames(
        Object.getPrototypeOf(instance)
      ).filter(
        (method) =>
          !defaultMethods.includes(method) && method !== "handleHandshake"
      );
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

  public use(path: string = "/", middleware: MiddlewareFunction) {
    this.app.use(path, middleware);
  }
  public listen(port: number, callback: () => void) {
    const server = http.createServer(this.app);
    this.servers.set(port, server);
    this.app.listen(port, callback);
    this.GatewayRegister(port);
  }
}
