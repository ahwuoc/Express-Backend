import { METADATA_KEYS } from "../utils/constant";
import { getMetadata } from "../metedata/metadata";
import { combinePaths } from "../utils/common";
import RouteRegisterMiddleware from "../middleware/route-register.middleware";
export function routeRegister(instance: any) {
  const controllerPath = getMetadata(
    METADATA_KEYS.method_metadata_key,
    instance.constructor
  );

  const methods = Object.getOwnPropertyNames(
    Object.getPrototypeOf(instance)
  ).filter((method) => method !== "constructor");

  return methods
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
    .map((method) => {
      const methodMetadata = getMetadata(
        METADATA_KEYS.method_metadata_key,
        instance[method]
      );
      const path = combinePaths(controllerPath, methodMetadata.path);
      const routeRegisterMiddleware = new RouteRegisterMiddleware(
        instance,
        method
      );
      return {
        path,
        method: methodMetadata.method,
        middleware: routeRegisterMiddleware.use.bind(routeRegisterMiddleware),
      };
    });
}
