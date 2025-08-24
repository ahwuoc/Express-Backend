import { concatMap, Observable, from } from "rxjs";
import Injectable from "../decorators/injectable.decorator";
import { NextFunction, Request, Response } from "express";
@Injectable()
export class NextCallFunction {
  observable: Observable<any>;
  constructor(
    req: Request,
    res: Response,
    next: NextFunction,
    ...use: ((req: Request, res: Response, next: NextFunction) => void)[]
  ) {
    this.observable = from(use).pipe(
      concatMap((middleware: any) => {
        return new Observable((subscribe) => {
          const result = middleware(req, res, next);
          if (result instanceof Promise) {
            result
              .then((data) => {
                subscribe.next(data);
                subscribe.complete();
              })
              .catch((error) => {
                subscribe.error(error);
              });
          }
        });
      })
    );
  }
  hanlde() {
    return this.observable;
  }
}
