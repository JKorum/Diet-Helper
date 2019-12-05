"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_validator_1 = require("express-validator");
exports.updateValidator = [
    express_validator_1.body('newName')
        .isString()
        .trim()
        .isLength({ min: 2 })
        .optional(),
    express_validator_1.body('newEmail')
        .isString()
        .trim()
        .isEmail()
        .normalizeEmail()
        .optional(),
    express_validator_1.body('newPassword')
        .isString()
        .trim()
        .isLength({ min: 6 })
        .optional()
];
