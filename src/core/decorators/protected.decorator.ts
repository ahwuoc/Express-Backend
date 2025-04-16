import { setMetadata } from "../metedata/metadata";
import { METADATA_KEYS } from "../utils/constant";

export const Protected = (): ClassDecorator & MethodDecorator =>
  setMetadata(METADATA_KEYS.protected_metadata_key, true);
