import { Application } from "express";
import { Constructor, Container } from "./di/container.di";
import express from "express";
import { getMetadata } from "./metedata/metadata";
import { METADATA_KEYS } from "../Ultis/constant";
interface TAppManager {
  controller?: Constructor<any>[];
}
export default class AppManager {
  controllers: Constructor<any>[];
  AppExpress: Application;
  container: Container;
  constructor({ controllers }: { controllers: Constructor<any>[] }) {
    this.controllers = controllers;
    this.AppExpress = express();
    this.container = new Container();
  }
  init() {
    this.DIregister();
    return this.AppExpress;
  }

  DIregister() {
    const instances = this.controllers.map((controller) => {
      this.container.register(controller);
      return this.container.get(controller);
    });

    instances.forEach((instance) => {
      const controlerPath = getMetadata(
        METADATA_KEYS.method_metadata_key,
        instance.constructor
      );

      const methods = Object.getOwnPropertyNames(
        Object.getPrototypeOf(instance)
      ).filter((method) => method !== "constructor");
      console.log(methods);
    });
  }
}
