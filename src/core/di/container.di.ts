import { METADATA_KEYS } from "../../ultils/constant";
import { getMetadata } from "../metedata/metadata";

export type Constructor<T> = new (...args: any) => T;

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
    const instance = new service(...dependencies);
    this.registerd.set(service.name, instance);
    return instance;
  }
}
