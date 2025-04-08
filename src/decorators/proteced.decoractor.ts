import { setMetadata } from "../core/metedata/metadata";
import { PROTECTED_METADATA_KEY } from "../utils/constant";

export const Protected = (): ClassDecorator & MethodDecorator =>
  setMetadata(PROTECTED_METADATA_KEY, true) as ClassDecorator & MethodDecorator;
