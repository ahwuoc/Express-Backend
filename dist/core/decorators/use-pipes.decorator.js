"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsePipes = UsePipes;
const metadata_1 = require("../metedata/metadata");
const constant_1 = require("../utils/constant");
function UsePipes(constructor) {
    return (0, metadata_1.setMetadata)(constant_1.METADATA_KEYS.use_pipes_metadata_key, constructor);
}
