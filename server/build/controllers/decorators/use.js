"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var MetadataKeys_1 = require("./MetadataKeys");
require("reflect-metadata");
function use(validator, handler) {
    return function (prototype, prop, desc) {
        if (validator) {
            var validators = Reflect.getMetadata(MetadataKeys_1.MetadataKeys.validators, prototype, prop) || [];
            Reflect.defineMetadata(MetadataKeys_1.MetadataKeys.validators, __spreadArrays(validators, [validator]), prototype, prop);
        }
        if (handler) {
            var middlewares = Reflect.getMetadata(MetadataKeys_1.MetadataKeys.middlewares, prototype, prop) || [];
            Reflect.defineMetadata(MetadataKeys_1.MetadataKeys.middlewares, __spreadArrays(middlewares, [handler]), prototype, prop);
        }
    };
}
exports.use = use;
