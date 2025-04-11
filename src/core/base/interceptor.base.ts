import { Observable } from "rxjs";
import Injectable from "../decorators/InjecTable.decorator";
import { AppContext } from "./context.base";
import { NextCallFunction } from "./next-call-function.base";

@Injectable()
export class AppInterceptor {
  intercept(context: AppContext, next: NextCallFunction): Observable<any> {
    return next.hanlde();
  }
}
