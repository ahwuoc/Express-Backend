"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscribeMessage = exports.Patch = exports.DeleteTest = exports.Post = exports.Get = void 0;
const metadata_1 = require("../metedata/metadata");
const constant_1 = require("../utils/constant");
const types_1 = require("../utils/types");
function createMethod(method) {
    return (path = "") => (0, metadata_1.setMetadata)(constant_1.METADATA_KEYS.method_metadata_key, {
        path,
        method,
    });
}
exports.Get = createMethod(types_1.Method.GET);
exports.Post = createMethod(types_1.Method.POST);
exports.DeleteTest = createMethod(types_1.Method.DELETE);
exports.Patch = createMethod(types_1.Method.PATCH);
const SubscribeMessage = (message) => (0, metadata_1.setMetadata)(constant_1.METADATA_KEYS.subscribe_message_metadata_key, message);
exports.SubscribeMessage = SubscribeMessage;
