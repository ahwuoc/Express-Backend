"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
const metadata_1 = require("../metedata/metadata");
const constant_1 = require("../utils/constant");
const Controller = (path = "") => (0, metadata_1.setMetadata)(constant_1.METADATA_KEYS.method_metadata_key, path);
exports.Controller = Controller;
