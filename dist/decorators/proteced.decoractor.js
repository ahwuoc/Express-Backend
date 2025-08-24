"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Protected = void 0;
const metadata_1 = require("../core/metedata/metadata");
const constant_1 = require("../core/utils/constant");
const Protected = () => (0, metadata_1.setMetadata)(constant_1.METADATA_KEYS.protected_metadata_key, true);
exports.Protected = Protected;
