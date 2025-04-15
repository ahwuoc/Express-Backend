import { AppContext } from "../base/context.base";
import { setMetadata } from "../metedata/metadata";
import { METADATA_KEYS } from "../utils/constant";
import type { Response, NextFunction } from "express";
import { Request } from "../utils/types";

export const Inject = (value: any): ParameterDecorator =>
  setMetadata(METADATA_KEYS.param_metadata_key, value);

export const Body = (): ParameterDecorator =>
  createParamDecorator((context) => {
    const req = context.switchToHtppRequest();
    return req.body;
  });

export const Req = (): ParameterDecorator =>
  createParamDecorator((context) => context.switchToHtppRequest());

export const Res = (): ParameterDecorator =>
  createParamDecorator((context) => context.switchToHtppResponse());

export const Param = (field: string): ParameterDecorator =>
  createParamDecorator((context) => {
    const req = context.switchToHtppRequest();
    return req.params[field];
  });

export const createParamDecorator = (handler: (context: AppContext) => any) =>
  setMetadata(
    METADATA_KEYS.param_metadata_key,
    (req: Request, res: Response, next: NextFunction) => {
      const context = new AppContext(req, res, next);
      return handler;
    }
  );
