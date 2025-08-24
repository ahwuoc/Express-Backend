import { setMetadata } from "../metedata/metadata";
import { METADATA_KEYS } from "../utils/constant";
import { Method } from "../utils/types";
function createMethod(method: Method) {
  return (path = ""): MethodDecorator =>
    setMetadata(METADATA_KEYS.method_metadata_key, {
      path,
      method,
    });
}

export const Get = createMethod(Method.GET);
export const Post = createMethod(Method.POST);
export const DeleteTest = createMethod(Method.DELETE);
export const Patch = createMethod(Method.PATCH);

export const SubscribeMessage = (message: string): MethodDecorator =>
  setMetadata(METADATA_KEYS.subscribe_message_metadata_key, message);
