"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../utils");
function transformQuery(req, res, next) {
    var queryString = utils_1.buildQuery(req.query);
    req.query = queryString;
    next();
    return;
}
exports.transformQuery = transformQuery;
function transformBody(req, res, next) {
    var body = utils_1.buildBody(req.body);
    req.body = body;
    next();
    return;
}
exports.transformBody = transformBody;
