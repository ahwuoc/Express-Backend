import { MetadataStorage, MethodWithMetadata } from "../utils/types";
export function setMetadata(
  key: string | symbol,
  value: any
): ClassDecorator | MethodDecorator | ParameterDecorator {
  return function (
    target: MetadataStorage,
    propertyKey?: string | symbol,
    descriptorOrParamIndex?: PropertyDescriptor | number
  ) {
    // =======ParamDecorato Methodr========
    if (propertyKey && typeof descriptorOrParamIndex === "number") {
      const fn = target[propertyKey] as MethodWithMetadata;
      if (!fn.paramMetadata) {
        fn.paramMetadata = [];
      }
      fn.paramMetadata[descriptorOrParamIndex] = { key, value };
    }
    // =======ParamDecorato Constructor========
    else if (!propertyKey && typeof descriptorOrParamIndex === "number") {
      if (!target.paramMetadata) {
        target.paramMetadata = [];
      }
      target.paramMetadata[descriptorOrParamIndex] = {
        key,
        value,
      };
    }
    // Method decorator
    else if (propertyKey && descriptorOrParamIndex) {
      const descriptor = descriptorOrParamIndex as PropertyDescriptor;
      if (!descriptor.value.metadata) {
        descriptor.value.metadata = {};
      }
      descriptor.value.metadata[key] = value;
    }
    // ======Class Decoractor====
    else {
      if (!target.metadata) {
        target.metadata = {};
      }
      target.metadata[key] = value;
    }
  };
}
// ============Handle Get getMetada===========
export function getMetadata(
  key: string | symbol,
  target: MetadataStorage,
  paramIndex?: number
) {
  if (paramIndex !== undefined && target.paramMetadata) {
    return target.paramMetadata[paramIndex];
  } else if (target.metadata) {
    return target.metadata[key];
  }
  return undefined;
}

export function getAllMetadata(target: MetadataStorage) {
  if (target) {
    return target;
  }
  return undefined;
}
