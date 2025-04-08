import type { Request as ERequest, NextFunction, Response } from "express";

export type Constructor<T> = new (...args: any) => T;
export enum Method {
  GET = "GET",
  POST = "POST",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

export type Request = ERequest & {
  context: {
    instance: any;
    handlerName: string;
  };
};

export interface MetadataStorage {
  metadata?: Record<string | symbol, any>;
  paramMetadata?: Array<{
    key: string | symbol;
    value: any;
  }>;
  [key: string | symbol]: any;
}
export interface MethodWithMetadata extends Function {
  metadata?: Record<string | symbol, any>;
  paramMetadata?: Array<{
    key: string | symbol;
    value: any;
  }>;
}

export type MiddlewareFunction = (
  req: ERequest,
  res: Response,
  next: NextFunction
) => void;

export type MiddlewareClass = Constructor<any>;

export type MiddlewareForRoute = {
  forRoute: string;
  useClass: MiddlewareClass;
};

export type TMiddlewareItem =
  | MiddlewareFunction
  | MiddlewareClass
  | MiddlewareForRoute;
