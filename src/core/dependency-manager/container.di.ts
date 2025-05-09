import { METADATA_KEYS } from "../utils/constant";
import { getMetadata, setMetadata } from "../metedata/metadata";
import { Constructor } from "../utils/types";
import { defaultMethods } from "../utils/common";
import { NextFunction } from "express";
import { BadRequestException } from "../base/error.base";

export class Container {
  services = new Map<string, Constructor<any>>();
  registerd = new Map<string, any>();

  register(constructor: Constructor<any>) {
    this.services.set(constructor.name, constructor);
  }

  get<T>(constructor: Constructor<T>): T {
    const service = this.services.get(constructor.name);
    if (!service) {
      throw new Error(`No service found for ${constructor.name}`);
    }
    if (this.registerd.has(service.name)) {
      return this.registerd.get(service.name);
    }
    const paramTypes = Reflect.getMetadata("design:paramtypes", service) ?? [];

    let dependencies = paramTypes.map((param: Constructor<any>) => {
      this.register(param);
      return this.get(param);
    });
    dependencies = dependencies.map((dependency: any, index: number) => {
      const shouldReplaced = getMetadata(
        METADATA_KEYS.param_metadata_key,
        service,
        index
      );
      if (shouldReplaced) {
        try {
          new shouldReplaced.value();
          this.register(shouldReplaced.value);
          return this.get(shouldReplaced.value);
        } catch (error) {
          return shouldReplaced.value;
        }
      }
      return dependency;
    });
    const methods = Object.getOwnPropertyNames(service.prototype).filter(
      (method) => !defaultMethods.includes(method)
    );

    methods.forEach((method) => {
      if (typeof service.prototype[method] === "function") {
        const paramTypes =
          Reflect.getMetadata("design:paramtypes", service.prototype, method) ??
          [];
        const originalMethod: Function = service.prototype[method];
        const pipe = getMetadata(
          METADATA_KEYS.use_pipes_metadata_key,
          service.prototype[method]
        );
        let self = this;
        service.prototype[method] = async function (...args: any[]) {
          const [req, res, next] = args;
          const paramMetadatas: any[] = paramTypes
            .map((paramType: any, index: number) => {
              const paramMetadata = getMetadata(
                METADATA_KEYS.param_metadata_key,
                service.prototype[method],
                index
              );
              if (paramMetadata) return { ...paramMetadata, index };
              return undefined;
            })
            .filter((paramType: any) => paramType !== undefined);
          for (const paramMetadata of paramMetadatas) {
            let result = paramMetadata.value(req, res, next);
            const index = paramMetadata.index;
            const paramsType = paramTypes[index];
            if (pipe) {
              self.register(pipe);
              const instancePipe = self.get<any>(pipe);
              if (typeof instancePipe.transform === "function") {
                result = await instancePipe.transform(result, paramsType);
              }
            }
            args[paramMetadata.index] = paramMetadata.value(req, res, next);
          }
          return await originalMethod.apply(this, args);
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
