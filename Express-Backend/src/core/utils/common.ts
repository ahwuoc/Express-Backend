export const combinePaths = (...paths: string[]): string => {
  return `/${paths
    .filter((path) => path !== "" && path !== "/")
    .map((path) => path.replace(/^\/+|\/+$/g, ""))
    .join("/")}`;
};

export const defaultMethods = [
  "constructor",
  "toString",
  "valueOf",
  "hasOwnProperty",
  "isPrototypeOf",
  "propertyIsEnumerable",
  "toLocaleString",
  "toSource",
  "__proto__",
  "onInit",
];
