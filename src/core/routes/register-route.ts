import { Router } from "express";
import { METADATA_KEYS } from "../../ultils/constant";
import express from "express";
import { getMetadata } from "../metedata/metadata";
import { combinePaths } from "../../ultils/common";
import RouteRegisterMiddleware from "../middleware/route-register.middleware";
export function routeRegister(instance: any): Router {
  const router = express.Router();

  const controllerPath = getMetadata(
    METADATA_KEYS.method_metadata_key,
    instance.constructor
  );

  const methods = Object.getOwnPropertyNames(
    Object.getPrototypeOf(instance)
  ).filter((method) => method !== "constructor");

  methods.forEach((method) => {
    const methodMetadata = getMetadata(
      METADATA_KEYS.method_metadata_key,
      instance[method]
    );
    const path = combinePaths(controllerPath, methodMetadata.path);

    const routeRegisterMiddleware = new RouteRegisterMiddleware(
      instance,
      method
    );
    (router as any)[methodMetadata.method.toLowerCase()](
      path,
      routeRegisterMiddleware.use.bind(routeRegisterMiddleware)
    );
  });
  return router;
}
