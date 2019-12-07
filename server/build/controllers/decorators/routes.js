"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var Methods_1 = require("./Methods");
var MetadataKeys_1 = require("./MetadataKeys");
function routeBinder(method) {
    // decorator factory ->
    return function (path) {
        // decorator ->
        return function (prototype, prop, desc) {
            Reflect.defineMetadata(MetadataKeys_1.MetadataKeys.method, method, prototype, prop);
            Reflect.defineMetadata(MetadataKeys_1.MetadataKeys.path, path, prototype, prop);
        };
    };
}
exports.get = routeBinder(Methods_1.Methods.get);
exports.post = routeBinder(Methods_1.Methods.post);
exports.patch = routeBinder(Methods_1.Methods.patch);
exports.del = routeBinder(Methods_1.Methods.del);
