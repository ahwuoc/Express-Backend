"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const container_di_1 = require("./dependency-manager/container.di");
const execute_handler_middleware_1 = __importDefault(require("./middleware/execute-handler.middleware"));
const error_handler_middleware_1 = __importDefault(require("./middleware/error-handler.middleware"));
const _404_handler_middleware_1 = require("./middleware/404-handler.middleware");
const register_route_1 = require("./routes/register-route");
const common_1 = require("./utils/common");
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const metadata_1 = require("./metedata/metadata");
const constant_1 = require("./utils/constant");
const error_base_1 = require("./base/error.base");
const next_call_function_base_1 = require("./base/next-call-function.base");
const context_base_1 = require("./base/context.base");
const importControllers_1 = __importDefault(require("../utils/importControllers"));
class AppManager {
    constructor({ controllers, middlewares, interceptors, prefix, guards, pipes, }) {
        var _a;
        this.restfulInstances = [];
        this.gatewayInstances = [];
        this.servers = new Map();
        this.controllers = (_a = (0, importControllers_1.default)()) !== null && _a !== void 0 ? _a : [];
        this.container = new container_di_1.Container();
        this.middlewares = middlewares !== null && middlewares !== void 0 ? middlewares : [];
        this.app = (0, express_1.default)();
        this.interceptors = interceptors !== null && interceptors !== void 0 ? interceptors : [];
        this.prefix = (0, common_1.combinePaths)(...(prefix !== null && prefix !== void 0 ? prefix : []));
        this.guards = guards !== null && guards !== void 0 ? guards : [];
        this.pipes = pipes !== null && pipes !== void 0 ? pipes : [];
    }
    init() {
        this.applyMiddlewares(express_1.default.json(), express_1.default.urlencoded({ extended: true }));
        this.useGlobalPipes();
        this.instanceRegister();
        this.RtRegister();
        this.applyMiddlewares(_404_handler_middleware_1.NotFoundMiddleware);
    }
    instanceRegister() {
        this.controllers.map((controller) => {
            const controllerPath = (0, metadata_1.getMetadata)(constant_1.METADATA_KEYS.method_metadata_key, controller);
            const instance = this.DIregister(controller);
            if (controllerPath !== undefined) {
                this.restfulInstances.push(instance);
            }
            else {
                this.gatewayInstances.push(instance);
            }
        });
    }
    getMiddleware(...middlewares) {
        if (middlewares && middlewares.length > 0) {
            return middlewares.map((middleware) => {
                if (typeof middleware === "object" &&
                    "forRoutes" in middleware &&
                    "useClass" in middleware) {
                    const instance = this.DIregister(middleware.useClass);
                    return (req, res, next) => {
                        middleware.forRoutes.forEach((route) => {
                            const path = (0, common_1.combinePaths)(this.prefix, route);
                            if (req.route.path.startsWith(path)) {
                                instance.use(req, res, next);
                            }
                            else {
                                next();
                            }
                        });
                    };
                }
                else {
                    try {
                        new middleware();
                        const instance = this.DIregister(middleware);
                        return instance.use.bind(instance);
                    }
                    catch (error) {
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
                const controllerPath = (0, metadata_1.getMetadata)(constant_1.METADATA_KEYS.method_metadata_key, controller);
                if (controllerPath === undefined) {
                    continue;
                }
                const methods = Object.getOwnPropertyNames(controller.prototype).filter((method) => !common_1.defaultMethods.includes(method));
                methods.forEach((method) => {
                    this.pipes.forEach((pipe) => {
                        if (typeof pipe === "object" &&
                            "forRoutes" in pipe &&
                            "useClass" in pipe) {
                            const methodMetadata = (0, metadata_1.getMetadata)(constant_1.METADATA_KEYS.method_metadata_key, controller.prototype[method]);
                            const path = (0, common_1.combinePaths)(controllerPath, methodMetadata.path);
                            pipe.forRoutes.forEach((route) => {
                                if (path.startsWith(route)) {
                                    controller.prototype[method].metadata = Object.assign(Object.assign({}, controller.prototype[method].metadata), { [constant_1.METADATA_KEYS.use_pipes_metadata_key]: pipe.useClass });
                                }
                            });
                        }
                        else {
                            controller.prototype[method].metadata = Object.assign(Object.assign({}, controller.prototype[method].metadata), { [constant_1.METADATA_KEYS.use_pipes_metadata_key]: pipe });
                        }
                    });
                });
            }
        }
    }
    pathStatic(pathStatic, folder) {
        this.app.use(pathStatic, express_1.default.static(path_1.default.resolve(folder)));
    }
    DIregister(constructor) {
        this.container.register(constructor);
        return this.container.get(constructor);
    }
    RtRegister() {
        this.restfulInstances.forEach((instance) => {
            const routers = (0, register_route_1.routeRegister)(instance);
            routers.forEach((router) => {
                const path = (0, common_1.combinePaths)(this.prefix, router.path);
                this.app[router.method.toLowerCase()](path, router.middleware, this.getMiddleware(...this.middlewares), this.getMiddleware(...this.guards), (req, res, next) => __awaiter(this, void 0, void 0, function* () {
                    const executeHandeleInstance = this.getMiddleware(execute_handler_middleware_1.default);
                    const instanceNextCallFunction = new next_call_function_base_1.NextCallFunction(req, res, next, ...executeHandeleInstance);
                    const interceptFunctions = this.getInterceptors(req);
                    const context = new context_base_1.AppContext(req, res, next);
                    for (const interceptFunction of interceptFunctions) {
                        if (!interceptFunction)
                            continue;
                        instanceNextCallFunction.observable = yield Promise.resolve(interceptFunction(context, instanceNextCallFunction));
                    }
                    instanceNextCallFunction.hanlde().subscribe({
                        next: (data) => res.send(data),
                        error: (error) => next(error),
                    });
                }), (error, req, res, next) => {
                    const instance = this.DIregister(error_handler_middleware_1.default);
                    instance.use(error, req, res, next);
                });
                console.log(
                    `\x1b[1m\x1b[32m🗸 Route [\x1b[33m${method.toUpperCase()}\x1b[32m] → \x1b[36m${path}\x1b[0m`
                  );
                  
            });
        });
    }
    getInterceptors(req) {
        return this.interceptors.flatMap((interceptor) => {
            if (typeof interceptor === "object" &&
                "forRoutes" in interceptor &&
                "useClass" in interceptor) {
                const instance = this.DIregister(interceptor.useClass);
                return interceptor.forRoutes.map((route) => {
                    const path = (0, common_1.combinePaths)(this.prefix, route);
                    if (req.route.path.startsWith(path)) {
                        return instance.intercept.bind(instance);
                    }
                    return undefined;
                });
            }
            else {
                const instance = this.DIregister(interceptor);
                return instance.intercept.bind(instance);
            }
        });
    }
    applyMiddlewares(...middlewares) {
        if (!middlewares || middlewares.length === 0)
            return;
        middlewares.forEach((middleware, index) => {
            try {
                if (typeof middleware === "object" &&
                    "forRoutes" in middleware &&
                    "useClass" in middleware) {
                    const instance = this.DIregister(middleware.useClass);
                    middleware.forRoutes.forEach((route) => {
                        const path = (0, common_1.combinePaths)(this.prefix, route);
                        if (typeof instance.use === "function") {
                            this.app.use(path, instance.use.bind(instance));
                        }
                    });
                }
                else {
                    const MiddlewareClass = middleware;
                    const instance = this.DIregister(MiddlewareClass);
                    if (typeof instance.use === "function") {
                        this.app.use(instance.use.bind(instance));
                    }
                }
            }
            catch (error) {
                this.app.use(middleware);
            }
        });
    }
    GatewayRegister(port) {
        this.gatewayInstances.forEach((instance) => {
            var _a, _b, _c;
            const gatewayOption = (0, metadata_1.getMetadata)(constant_1.METADATA_KEYS.socket_gateway_metadata_key, instance.constructor);
            if (!gatewayOption) {
                return;
            }
            let socketServer;
            const targetPort = (_a = gatewayOption.port) !== null && _a !== void 0 ? _a : port;
            if (this.servers.has(targetPort)) {
                socketServer = this.servers.get(targetPort);
            }
            else {
                socketServer = http_1.default.createServer();
                this.servers.set(targetPort, socketServer);
                socketServer.listen(targetPort);
            }
            const ioSocket = new socket_io_1.Server(socketServer, {
                cors: (_b = gatewayOption.cors) !== null && _b !== void 0 ? _b : {
                    origin: "*",
                },
            });
            const namespace = ioSocket.of((_c = gatewayOption.namespace) !== null && _c !== void 0 ? _c : "/");
            namespace.use((socket, next) => {
                if (typeof instance.handleHandshake === "function") {
                    const isAuthenticated = instance.handleHandshake(socket);
                    if (!isAuthenticated) {
                        return next(new error_base_1.UnAuthorizedException());
                    }
                    return next();
                }
                else
                    return next();
            });
            const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(instance)).filter((method) => !common_1.defaultMethods.includes(method) && method !== "handleHandshake");
            namespace.on("connection", (socket) => {
                methods.forEach((method) => {
                    const message = (0, metadata_1.getMetadata)(constant_1.METADATA_KEYS.subscribe_message_metadata_key, instance[method]);
                    if (!message) {
                        return;
                    }
                    socket.on(message, (data) => {
                        instance[method](socket, data);
                    });
                });
            });
        });
    }
    use(path = "/", middleware) {
        this.app.use(path, middleware);
    }
    listen(port) {
        this.init();
        const server = http_1.default.createServer(this.app);
        this.servers.set(port, server);
        this.app.listen(port, () => {
            console.log(`🌟 Server running at \x1b[36mhttp://localhost:${port}\x1b[0m`);
        });
        this.GatewayRegister(port);
    }
}
exports.default = AppManager;
