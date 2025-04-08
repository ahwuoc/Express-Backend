import { setMetadata } from "../core/metedata/metadata";
import { METADATA_KEYS } from "../ultils/constant";

export function Body(): ParameterDecorator {
  return (
    target: any,
    propertyKey: symbol | string | undefined,
    parameterIndex: number
  ) => {};
}

export const Inject = (value: any): ParameterDecorator => {
  return setMetadata(
    METADATA_KEYS.param_metadata_key,
    value
  ) as ParameterDecorator;
};
