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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Container = void 0;
const constant_1 = require("../utils/constant");
const metadata_1 = require("../metedata/metadata");
const common_1 = require("../utils/common");
class Container {
    constructor() {
        this.services = new Map();
        this.registerd = new Map();
    }
    register(constructor) {
        this.services.set(constructor.name, constructor);
    }
    get(constructor) {
        var _a;
        const service = this.services.get(constructor.name);
        if (!service) {
            throw new Error(`No service found for ${constructor.name}`);
        }
        if (this.registerd.has(service.name)) {
            return this.registerd.get(service.name);
        }
        const paramTypes = (_a = Reflect.getMetadata("design:paramtypes", service)) !== null && _a !== void 0 ? _a : [];
        let dependencies = paramTypes.map((param) => {
            this.register(param);
            return this.get(param);
        });
        dependencies = dependencies.map((dependency, index) => {
            const shouldReplaced = (0, metadata_1.getMetadata)(constant_1.METADATA_KEYS.param_metadata_key, service, index);
            if (shouldReplaced) {
                try {
                    new shouldReplaced.value();
                    this.register(shouldReplaced.value);
                    return this.get(shouldReplaced.value);
                }
                catch (error) {
                    return shouldReplaced.value;
                }
            }
            return dependency;
        });
        const methods = Object.getOwnPropertyNames(service.prototype).filter((method) => !common_1.defaultMethods.includes(method));
        methods.forEach((method) => {
            var _a;
            if (typeof service.prototype[method] === "function") {
                const paramTypes = (_a = Reflect.getMetadata("design:paramtypes", service.prototype, method)) !== null && _a !== void 0 ? _a : [];
                const originalMethod = service.prototype[method];
                const pipe = (0, metadata_1.getMetadata)(constant_1.METADATA_KEYS.use_pipes_metadata_key, service.prototype[method]);
                let self = this;
                service.prototype[method] = function (...args) {
                    return __awaiter(this, void 0, void 0, function* () {
                        const [req, res, next] = args;
                        const paramMetadatas = paramTypes
                            .map((paramType, index) => {
                            const paramMetadata = (0, metadata_1.getMetadata)(constant_1.METADATA_KEYS.param_metadata_key, service.prototype[method], index);
                            if (paramMetadata)
                                return Object.assign(Object.assign({}, paramMetadata), { index });
                            return undefined;
                        })
                            .filter((paramType) => paramType !== undefined);
                        for (const paramMetadata of paramMetadatas) {
                            let result = paramMetadata.value(req, res, next);
                            const index = paramMetadata.index;
                            const paramsType = paramTypes[index];
                            if (pipe) {
                                self.register(pipe);
                                const instancePipe = self.get(pipe);
                                if (typeof instancePipe.transform === "function") {
                                    result = yield instancePipe.transform(result, paramsType);
                                }
                            }
                            args[paramMetadata.index] = paramMetadata.value(req, res, next);
                        }
                        return yield originalMethod.apply(this, args);
                    });
                };
                Object.defineProperty(service.prototype[method], "name", {
                    value: originalMethod.name,
                });
                const keys = Reflect.getMetadataKeys(originalMethod);
                keys.forEach((key) => {
                    const value = Reflect.getMetadata(key, originalMethod);
                    Reflect.defineMetadata(key, value, service.prototype[method]);
                });
                Object.entries(originalMethod).forEach(([key, value]) => {
                    service.prototype[method][key] = value;
                });
            }
        });
        const instance = new service(...dependencies);
        if (typeof instance.onInit === "function") {
            instance.onInit();
        }
        this.registerd.set(service.name, instance);
        return instance;
    }
}
exports.Container = Container;
