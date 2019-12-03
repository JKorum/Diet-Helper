"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildBody = function (data) {
    return {
        title: data.title.toLowerCase(),
        ingr: data.ingr.split(',').map(function (item) { return item.trim().toLowerCase(); })
    };
};
