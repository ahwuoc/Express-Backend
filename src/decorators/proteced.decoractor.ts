import { setMetadata } from "../core/metedata/metadata";
import { METADATA_KEYS } from "../core/utils/constant";

export const Protected = (): ClassDecorator & MethodDecorator =>
  setMetadata(METADATA_KEYS.protected_metadata_key, true) as ClassDecorator &
    MethodDecorator;
