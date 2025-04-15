"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createParamDecorator = exports.Param = exports.Res = exports.Req = exports.Body = exports.Inject = void 0;
const context_base_1 = require("../base/context.base");
const metadata_1 = require("../metedata/metadata");
const constant_1 = require("../utils/constant");
const Inject = (value) => (0, metadata_1.setMetadata)(constant_1.METADATA_KEYS.param_metadata_key, value);
exports.Inject = Inject;
const Body = () => (0, exports.createParamDecorator)((context) => {
    const req = context.switchToHtppRequest();
    return req.body;
});
exports.Body = Body;
const Req = () => (0, exports.createParamDecorator)((context) => context.switchToHtppRequest());
exports.Req = Req;
const Res = () => (0, exports.createParamDecorator)((context) => context.switchToHtppResponse());
exports.Res = Res;
const Param = (field) => (0, exports.createParamDecorator)((context) => {
    const req = context.switchToHtppRequest();
    return req.params[field];
});
exports.Param = Param;
const createParamDecorator = (handler) => (0, metadata_1.setMetadata)(constant_1.METADATA_KEYS.param_metadata_key, (req, res, next) => {
    const context = new context_base_1.AppContext(req, res, next);
    return handler;
});
exports.createParamDecorator = createParamDecorator;
