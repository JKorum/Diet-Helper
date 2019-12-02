"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../utils");
function transform(req, res, next) {
    var queryString = utils_1.buildQuery(req.query);
    req.query = queryString;
    next();
    return;
}
exports.transform = transform;
