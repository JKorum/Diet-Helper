"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var MetadataKeys_1 = require("./MetadataKeys");
function auth(handler) {
    return function (prototype, prop, desc) {
        Reflect.defineMetadata(MetadataKeys_1.MetadataKeys.auth, handler, prototype, prop);
    };
}
exports.auth = auth;
