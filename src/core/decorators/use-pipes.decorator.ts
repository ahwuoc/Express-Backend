import { setMetadata } from "../metedata/metadata";
import { METADATA_KEYS } from "../utils/constant";
import { Constructor } from "../utils/types";

export function UsePipes(constructor: any): ClassDecorator & MethodDecorator {
  return setMetadata(METADATA_KEYS.use_pipes_metadata_key, constructor);
}
