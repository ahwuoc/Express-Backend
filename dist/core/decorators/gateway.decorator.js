"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketGateway = SocketGateway;
const metadata_1 = require("../metedata/metadata");
const constant_1 = require("../utils/constant");
function SocketGateway(options = {}) {
    return (0, metadata_1.setMetadata)(constant_1.METADATA_KEYS.socket_gateway_metadata_key, options);
}
