import type { Request as ERequest } from "express";

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
