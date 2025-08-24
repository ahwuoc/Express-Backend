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
require("reflect-metadata");
const App_Manager_1 = __importDefault(require("./core/App.Manager"));
const connect_db_1 = __importDefault(require("./db/connect.db"));
const auth_guard_1 = __importDefault(require("./guards/auth.guard"));
const dotenv_1 = __importDefault(require("dotenv"));
const single_upload_middleware_1 = require("./middlewares/single-upload.middleware");
const response_formatter_interceptor_1 = require("./interceptors/response-formatter.interceptor");
const validation_pipe_1 = require("./pipes/validation.pipe");
dotenv_1.default.config();
const PORT = 3000;
const App = new App_Manager_1.default({
    prefix: ["api"],
    middlewares: [
        {
            forRoutes: ["/uploads"],
            useClass: single_upload_middleware_1.SingleFileUploadMiddleware,
        },
    ],
    guards: [
        {
            forRoutes: ["/users"],
            useClass: auth_guard_1.default,
        },
    ],
    interceptors: [response_formatter_interceptor_1.BaseResponseFormatter],
    pipes: [validation_pipe_1.ValidationPipe],
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, connect_db_1.default)();
    App.pathStatic("/public", "/public");
    App.listen(PORT);
}))();
