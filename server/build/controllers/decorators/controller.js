"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AppRouter_1 = require("../../AppRouter");
var MetadataKeys_1 = require("./MetadataKeys");
function controller() {
    var router = AppRouter_1.AppRouter.getInstance();
    // class decorator ->
    return function (constructor) {
        // constructing routes handlers ->
        for (var key in constructor.prototype) {
            var method = Reflect.getMetadata(MetadataKeys_1.MetadataKeys.method, constructor.prototype, key);
            var path = Reflect.getMetadata(MetadataKeys_1.MetadataKeys.path, constructor.prototype, key);
            var middlewares = Reflect.getMetadata(MetadataKeys_1.MetadataKeys.middlewares, constructor.prototype, key) || [];
            var routeHandler = constructor.prototype[key];
            var validators = Reflect.getMetadata(MetadataKeys_1.MetadataKeys.validators, constructor.prototype, key) || [];
            router[method](path, validators, middlewares, routeHandler);
        }
    };
}
exports.controller = controller;
