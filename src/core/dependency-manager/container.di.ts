import { METADATA_KEYS } from "../utils/constant";
import { getMetadata, setMetadata } from "../metedata/metadata";
import { Constructor } from "../utils/types";

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
    ///Manager Denependecies

    let dependencies = paramTypes.map((param: Constructor<any>) => {
      this.register(param);
      return this.get(param);
    });
    ///Replace constructor param
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
    // Replace method params with decoractor
    const methods = Object.getOwnPropertyNames(service.prototype).filter(
      (method) => method != "constructor"
    );

    ///
    methods.forEach((method) => {
      if (typeof service.prototype[method] === "function") {
        const paramTypes =
          Reflect.getMetadata("design:paramtypes", service.prototype, method) ??
          [];
        const originalMethod: Function = service.prototype[method];
        service.prototype[method] = function (...args: any[]) {
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

          paramMetadatas.forEach((paramMetadata: any) => {
            args[paramMetadata.index] = paramMetadata.value(req, res, next);
          });

          return originalMethod.apply(this, args);
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
    this.registerd.set(service.name, instance);
    return instance;
  }
}
