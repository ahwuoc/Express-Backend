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
    params: any;
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
export type TGateway = {
  namespace?: string;
  port?: number;
  cors?: {
    origin?: string;
    method?: Method;
  };
};

export type MiddlewareFunction = (
  req: ERequest,
  res: Response,
  next: NextFunction
) => void;
export type MiddlewareFunctionError = {
  error: ERequest;
  req: Request;
  res: Response;
  next: NextFunction;
};
export type MiddlewareClass = Constructor<any>;

export type MiddlewareForRoute = {
  forRoutes: string[];
  useClass: MiddlewareClass;
};

export type TMiddlewareItem =
  | MiddlewareFunction
  | MiddlewareFunctionError
  | MiddlewareClass
  | MiddlewareForRoute;
