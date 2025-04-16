import { map, Observable } from "rxjs";
import { AppContext } from "../core/base/context.base";
import { AppInterceptor } from "../core/base/interceptor.base";
import Injectable from "../core/decorators/injectable.decorator";
import { NextCallFunction } from "../core/base/next-call-function.base";

@Injectable()
export class BaseResponseFormatter implements AppInterceptor {
  intercept(context: AppContext, next: NextCallFunction): Observable<any> {
    return next.hanlde().pipe(
      map((data) => {
        return {
          message: "Thành công",
          data,
          statusCode: 200,
        };
      })
    );
  }
}
