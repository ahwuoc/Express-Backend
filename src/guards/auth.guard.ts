import { AppContext } from "../core/base/context.base";
import { AppGuard } from "../core/base/guard.base";
import Injectable from "../core/decorators/InjecTable.decorator";

@Injectable()
export default class AuthGuard extends AppGuard {
  canActive(context: AppContext): boolean | Promise<boolean> {
    return false;
  }
}
