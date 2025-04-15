"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const InjecTable_decorator_1 = __importDefault(require("../decorators/InjecTable.decorator"));
(0, InjecTable_decorator_1.default)();
class ExecuteHandlerMiddleware {
    use(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let result;
            if (req.context) {
                const { context } = req;
                const instance = context.instance;
                const handlerName = context.handlerName;
                result = yield instance[handlerName](req, res, next);
                res.locals.data = result;
            }
            return result;
        });
    }
}
exports.default = ExecuteHandlerMiddleware;
