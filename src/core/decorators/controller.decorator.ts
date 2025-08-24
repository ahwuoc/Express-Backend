import { setMetadata } from "../metedata/metadata";
import { METADATA_KEYS } from "../utils/constant";
export const Controller = (path: string = ""): ClassDecorator =>
  setMetadata(METADATA_KEYS.method_metadata_key, path) as ClassDecorator;
