import { setMetadata } from "../metedata/metadata";
import { METADATA_KEYS } from "../utils/constant";
import type { Response, Request } from "express";
// Inject 1 giá trị cụ thể
export const Inject = (value: any): ParameterDecorator =>
  setMetadata(METADATA_KEYS.param_metadata_key, value) as ParameterDecorator;

// Inject body từ request
export const Body = (): ParameterDecorator =>
  setMetadata(
    METADATA_KEYS.param_metadata_key,
    (req: Request) => req.body
  ) as ParameterDecorator;

export const Req = (): ParameterDecorator =>
  setMetadata(
    METADATA_KEYS.param_metadata_key,
    (req: Request) => req
  ) as ParameterDecorator;

export const Res = (): ParameterDecorator =>
  setMetadata(
    METADATA_KEYS.param_metadata_key,
    (req: Request, res: Response) => res
  ) as ParameterDecorator;
