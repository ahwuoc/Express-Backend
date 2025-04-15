"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultMethods = exports.combinePaths = void 0;
const combinePaths = (...paths) => {
    return `/${paths
        .filter((path) => path !== "" && path !== "/")
        .map((path) => path.replace(/^\/+|\/+$/g, ""))
        .join("/")}`;
};
exports.combinePaths = combinePaths;
exports.defaultMethods = [
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
