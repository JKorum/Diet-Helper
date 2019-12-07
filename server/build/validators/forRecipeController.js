"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_validator_1 = require("express-validator");
exports.userRecipeValidator = [
    express_validator_1.body(['label', 'image', 'source', 'url'])
        .isString()
        .trim()
        .notEmpty(),
    express_validator_1.body(['dietLabels', 'healthLabels', 'cautions', 'ingredientLines'])
        .isArray()
        .custom(function (field) {
        field.forEach(function (item) {
            if (typeof item !== 'string') {
                throw new Error('arrays fields: invalid value types');
            }
        });
        return true;
    }),
    express_validator_1.body(['yield', 'calories', 'totalWeight', 'totalTime'])
        .notEmpty()
        .custom(function (field) {
        if (typeof field !== 'number') {
            throw new Error('numeric fields: invalid value types');
        }
        return true;
    })
];
