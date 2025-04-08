import { setMetadata } from "../metedata/metadata";
import { METADATA_KEYS } from "../utils/constant";
import { Method } from "../utils/types";
function createMethod(method: Method) {
  return (path = ""): MethodDecorator =>
    setMetadata(METADATA_KEYS.method_metadata_key, {
      path,
      method,
    }) as MethodDecorator;
}

export const Get = createMethod(Method.GET);
export const Post = createMethod(Method.POST);
export const Delete = createMethod(Method.DELETE);
export const Patch = createMethod(Method.PATCH);
