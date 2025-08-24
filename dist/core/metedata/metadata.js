"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setMetadata = setMetadata;
exports.getMetadata = getMetadata;
exports.getAllMetadata = getAllMetadata;
function setMetadata(key, value) {
    return function (target, propertyKey, descriptorOrParamIndex) {
        // =======ParamDecorato Methodr========
        if (propertyKey && typeof descriptorOrParamIndex === "number") {
            const fn = target[propertyKey];
            if (!fn.paramMetadata) {
                fn.paramMetadata = [];
            }
            fn.paramMetadata[descriptorOrParamIndex] = { key, value };
        }
        // =======ParamDecorato Constructor========
        else if (!propertyKey && typeof descriptorOrParamIndex === "number") {
            if (!target.paramMetadata) {
                target.paramMetadata = [];
            }
            target.paramMetadata[descriptorOrParamIndex] = {
                key,
                value,
            };
        }
        // Method decorator
        else if (propertyKey && descriptorOrParamIndex) {
            const descriptor = descriptorOrParamIndex;
            if (!descriptor.value.metadata) {
                descriptor.value.metadata = {};
            }
            descriptor.value.metadata[key] = value;
        }
        // ======Class Decoractor====
        else {
            if (!target.metadata) {
                target.metadata = {};
            }
            target.metadata[key] = value;
        }
    };
}
// ============Handle Get getMetada===========
function getMetadata(key, target, paramIndex) {
    if (paramIndex !== undefined && target.paramMetadata) {
        return target.paramMetadata[paramIndex];
    }
    else if (target.metadata) {
        return target.metadata[key];
    }
    return undefined;
}
function getAllMetadata(target) {
    if (target) {
        return target;
    }
    return undefined;
}
