import { StringLiteral } from "typescript";

export function Body(): ParameterDecorator {
  return (
    target: any,
    propertyKey: symbol | string | undefined,
    parameterIndex: number
  ) => {};
}

