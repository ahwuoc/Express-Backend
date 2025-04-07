// Class Decoractor ko co propertyKey
// Paramerter Decoractor ko the can thiep dc vao ham
export function setMetadata(
  key: string | symbol,
  value: any
): ClassDecorator | MethodDecorator | ParameterDecorator {
  return function (
    target: any,
    propertyKey?: string | symbol,
    descriptorOrParamIndex?: PropertyDescriptor | number
  ) {
    // =======ParamDecorato Methodr========
    if (propertyKey && typeof descriptorOrParamIndex === "number") {
      if (!target[propertyKey].paramMetada) {
        target[propertyKey].paramMetada = [];
      }
      target[propertyKey].paramMetada[descriptorOrParamIndex] = {
        key,
        value,
      };
    }
    // =======ParamDecorato Constructor========
    else if (!propertyKey && typeof descriptorOrParamIndex === "number") {
      if (!target.paramMetada) {
        target.paramMetada = [];
      }
      target.paramMetada = {
        key,
        value,
      };
    } else if (propertyKey && descriptorOrParamIndex) {
      const descriptor = descriptorOrParamIndex as PropertyDescriptor;
      if (!descriptor.value.metadata) {
        descriptor.value.metadata = {};
      }
      descriptor.value.metadata[key] = value;
    } else {
      if (!target.metadata) {
        target.metadata = {};
      }
      target.metadata[key] = value;
    }
  };
}

export function getMetadata(key: string | symbol, target: any) {
  return target.metadata[key];
}

export function getAllMetadata(target: any) {
  return target;
}
