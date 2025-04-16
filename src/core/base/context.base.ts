import type { Response, NextFunction } from "express";
import Injectable from "../decorators/injectable.decorator";
import { Constructor, Request } from "../utils/types";

@Injectable()
export class AppContext {
  private controllerClass: Constructor<any>;
  private handler: Function;
  private request: Request;
  private response: Response;
  private next: NextFunction;
  constructor(req: Request, res: Response, next: NextFunction) {
    this.controllerClass = req.context.instance.constructor ?? undefined;
    this.handler = req.context.instance[req.context.handlerName] ?? undefined;
    this.request = req;
    this.response = res;
    this.next = next;
  }
  switchToHttpRequest() {
    return this.request;
  }
  switchToHttpResponse() {
    return this.response;
  }
  getClass() {
    return this.controllerClass;
  }
  getHandler() {
    return this.handler;
  }
  getNextFunction() {
    return this.next;
  }
}
