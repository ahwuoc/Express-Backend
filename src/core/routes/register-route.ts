import { Router } from "express";
import { METADATA_KEYS } from "../utils/constant";
import express from "express";
import { getMetadata } from "../metedata/metadata";
import { combinePaths } from "../utils/common";
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

  methods
    .sort((a, b) => {
      const pathA = getMetadata(
        METADATA_KEYS.method_metadata_key,
        instance[a]
      ).path;
      const pathB = getMetadata(
        METADATA_KEYS.method_metadata_key,
        instance[b]
      ).path;
      return pathA.includes(":") ? -1 : pathB.includes(":") ? 1 : 0;
    })
    .forEach((method) => {
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
