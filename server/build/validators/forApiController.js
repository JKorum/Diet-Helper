"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_validator_1 = require("express-validator");
exports.recipesValidator = express_validator_1.query('q')
    .notEmpty()
    .isString();
exports.lineValidator = express_validator_1.query('ingr')
    .notEmpty()
    .isString();
exports.recipeValidator = express_validator_1.body(['title', 'ingr'])
    .notEmpty()
    .isString()
    .trim();
