import { Observable } from "rxjs";
import { AppContext } from "../core/base/context.base";
import { AppInterceptor } from "../core/base/interceptor.base";
import { NextCallFunction } from "../core/base/next-call-function.base";
import Injectable from "../core/decorators/InjecTable.decorator";

@Injectable()
export class BodyValidateInterceptor implements AppInterceptor {
  intercept(context: AppContext, next: NextCallFunction): Observable<any> {
    const req = context.switchToHtppRequest();
    const body = req.body;
    return next.hanlde();
  }
}
