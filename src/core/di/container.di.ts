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

    const dependencies = paramTypes.map((params: Constructor<any>) => {
      this.register(params);
      return this.get(params);
    });
    const instance = new service(...dependencies);
    this.registerd.set(service.name, instance);
    return instance;
  }
}
