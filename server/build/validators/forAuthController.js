"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_validator_1 = require("express-validator");
exports.registerValidator = [
    express_validator_1.body('name')
        .isString()
        .trim()
        .isLength({ min: 2 }),
    express_validator_1.body('email')
        .isString()
        .trim()
        .isEmail()
        .normalizeEmail(),
    express_validator_1.body('password')
        .isString()
        .trim()
        .isLength({ min: 6 })
];
exports.loginValidator = [
    express_validator_1.body('email')
        .isString()
        .trim()
        .isEmail()
        .normalizeEmail(),
    express_validator_1.body('password')
        .isString()
        .trim()
        .isLength({ min: 6 })
];
