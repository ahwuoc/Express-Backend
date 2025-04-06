export const setMetada = (key: string | symbol, value: any) => {
  return (
    target: any,
    propertyKey: symbol | string,
    descriptorOrNumber: PropertyDecorator | number
  ) => {
    if (propertyKey && typeof descriptorOrNumber === "number") {
      if (!target[propertyKey].paramMetadata) {
        target[propertyKey].paramMetadata = [];
      }
      target[propertyKey].paramMetadata[descriptorOrNumber] = {
        key,
        value,
      };
    }
  };
};
