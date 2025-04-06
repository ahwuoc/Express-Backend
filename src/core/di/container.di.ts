type Constructor<T> = new (...args: any) => T;

export default class Container {
  services = new Map<string, Constructor<any>>();
  registered = new Map<string, any>();

  register(constructor: Constructor<any>) {
    this.services.set(constructor.name, constructor);
  }
  get<T>(consotructor: Constructor<T>): T {
    const service = this.services.get(consotructor.name);
    if (!service) {
      throw Error(`${consotructor.name} chưa được đăng ký`);
    }
    if (this.registered.has(consotructor.name)) {
      return this.registered.get(consotructor.name);
    }

    const paramTypes = Reflect.getMetadata("design:paramTypes", service) ?? [];
    const dependencies = paramTypes.map((params: Constructor<any>) => {
      this.register(params);
      return this.get(params);
    });
    const instance = new service();
    this.registered.set(service.name, instance);
    return instance;
  }
}
