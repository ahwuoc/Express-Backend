"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routeRegister = routeRegister;
const constant_1 = require("../utils/constant");
const metadata_1 = require("../metedata/metadata");
const common_1 = require("../utils/common");
const route_register_middleware_1 = __importDefault(require("../middleware/route-register.middleware"));
function routeRegister(instance) {
    const controllerPath = (0, metadata_1.getMetadata)(constant_1.METADATA_KEYS.method_metadata_key, instance.constructor);
    const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(instance)).filter((method) => !common_1.defaultMethods.includes(method));
    return methods
        .sort((a, b) => {
        const pathA = (0, metadata_1.getMetadata)(constant_1.METADATA_KEYS.method_metadata_key, instance[a]).path;
        const pathB = (0, metadata_1.getMetadata)(constant_1.METADATA_KEYS.method_metadata_key, instance[b]).path;
        return pathA.includes(":") ? -1 : pathB.includes(":") ? 1 : 0;
    })
        .map((method) => {
        const methodMetadata = (0, metadata_1.getMetadata)(constant_1.METADATA_KEYS.method_metadata_key, instance[method]);
        const path = (0, common_1.combinePaths)(controllerPath, methodMetadata.path);
        const routeRegisterMiddleware = new route_register_middleware_1.default(instance, method);
        return {
            path,
            method: methodMetadata.method,
            middleware: routeRegisterMiddleware.use.bind(routeRegisterMiddleware),
        };
    });
}
