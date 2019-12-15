"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var express_validator_1 = require("express-validator");
require("reflect-metadata");
var decorators_1 = require("./decorators");
var middlewares_1 = require("../middlewares");
var validators_1 = require("../validators");
var idR = process.env.APP_ID_RECIPES;
var keyR = process.env.APP_KEY_RECIPES;
var idA = process.env.APP_ID_ANALYSIS;
var keyA = process.env.APP_KEY_ANALYSIS;
var ApiController = /** @class */ (function () {
    function ApiController() {
    }
    ApiController.prototype.fetchRecipes = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var errors, result, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        errors = express_validator_1.validationResult(req);
                        if (!errors.isEmpty()) {
                            res.status(422).send({ error: "query param 'q' not provided" });
                            return [2 /*return*/];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        if (!(typeof idR === 'string' &&
                            typeof keyR === 'string' &&
                            typeof req.query === 'string')) return [3 /*break*/, 3];
                        return [4 /*yield*/, axios_1.default.get("https://api.edamam.com/search" + req.query + "&app_id=" + idR + "&app_key=" + keyR)];
                    case 2:
                        result = _a.sent();
                        if (result.status === 200) {
                            res.status(200).send(result.data);
                            return [2 /*return*/];
                        }
                        else {
                            throw new Error('failed to fetch edamam');
                        }
                        return [3 /*break*/, 4];
                    case 3: throw new Error('invalid: id, key or query for API');
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        err_1 = _a.sent();
                        // got unsuccesful response from api
                        if (err_1.response) {
                            if (err_1.response.status === 404) {
                                res.status(404).send({ error: 'failed to fetch edamam' });
                                return [2 /*return*/];
                            }
                        }
                        else {
                            // no response from api || credentials OR query error || unknown error
                            console.log(err_1.message);
                            res.status(500).send({ error: 'internal server error' });
                            return [2 /*return*/];
                        }
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    ApiController.prototype.lineAnalysis = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var errors, result, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        errors = express_validator_1.validationResult(req);
                        if (!errors.isEmpty()) {
                            res.status(422).send({ error: "query param 'ingr' not provided" });
                            return [2 /*return*/];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        if (!(typeof idA === 'string' &&
                            typeof keyA === 'string' &&
                            typeof req.query === 'string')) return [3 /*break*/, 3];
                        return [4 /*yield*/, axios_1.default.get("https://api.edamam.com/api/nutrition-data" + req.query + "&app_id=" + idA + "&app_key=" + keyA)];
                    case 2:
                        result = _a.sent();
                        if (result.status === 200) {
                            res.status(200).send(result.data);
                            return [2 /*return*/];
                        }
                        else {
                            throw new Error('failed to fetch edamam');
                        }
                        return [3 /*break*/, 4];
                    case 3: throw new Error('invalid: id, key or query for API');
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        err_2 = _a.sent();
                        // got unsuccesful response from api
                        if (err_2.response) {
                            if (err_2.response.status === 404) {
                                res.status(404).send({ error: 'failed to fetch edamam' });
                                return [2 /*return*/];
                            }
                            else if (err_2.response.status === 422) {
                                res.status(422).send({ error: 'edamam failed to parse data' });
                                return [2 /*return*/];
                            }
                            else if (err_2.response.status === 555) {
                                res.status(555).send({ error: 'edamam failed to parse data' });
                                return [2 /*return*/];
                            }
                        }
                        else {
                            // no response from api || credentials OR query error || unknown error
                            console.log(err_2.message);
                            res.status(500).send({ error: 'internal server error' });
                            return [2 /*return*/];
                        }
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    ApiController.prototype.recipeAnalysis = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var errors, config, result, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        errors = express_validator_1.validationResult(req);
                        if (!errors.isEmpty()) {
                            res
                                .status(422)
                                .send({ error: "fields 'title' and 'ingr' should be provided" });
                            return [2 /*return*/];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        if (!(typeof idA === 'string' &&
                            typeof keyA === 'string' &&
                            Array.isArray(req.body.ingr))) return [3 /*break*/, 3];
                        config = {
                            url: "https://api.edamam.com/api/nutrition-details?app_id=" + idA + "&app_key=" + keyA,
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            data: req.body
                        };
                        return [4 /*yield*/, axios_1.default(config)];
                    case 2:
                        result = _a.sent();
                        if (result.status === 200) {
                            res.status(200).send(result.data);
                            return [2 /*return*/];
                        }
                        else {
                            throw new Error('failed to fetch edamam');
                        }
                        return [3 /*break*/, 4];
                    case 3: throw new Error('invalid: id, key or body for API');
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        err_3 = _a.sent();
                        // got unsuccesful response from api
                        if (err_3.response) {
                            if (err_3.response.status === 404) {
                                res.status(404).send({ error: 'failed to fetch edamam' });
                                return [2 /*return*/];
                            }
                            else if (err_3.response.status === 422) {
                                res.status(422).send({ error: 'edamam failed to parse data' });
                                return [2 /*return*/];
                            }
                            else if (err_3.response.status === 555) {
                                res.status(555).send({ error: 'edamam failed to parse data' });
                                return [2 /*return*/];
                            }
                        }
                        else {
                            // no response from api || credentials OR body error || unknown error
                            console.log(err_3.message);
                            res.status(500).send({ error: 'internal server error' });
                            return [2 /*return*/];
                        }
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        decorators_1.get('/recipes'),
        decorators_1.use(validators_1.recipesValidator, middlewares_1.transformQuery),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], ApiController.prototype, "fetchRecipes", null);
    __decorate([
        decorators_1.get('/recipes/analysis/line'),
        decorators_1.use(validators_1.lineValidator, middlewares_1.transformQuery),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], ApiController.prototype, "lineAnalysis", null);
    __decorate([
        decorators_1.post('/recipes/analysis/recipe'),
        decorators_1.auth(middlewares_1.authHandler),
        decorators_1.use(validators_1.recipeValidator, middlewares_1.transformBody),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], ApiController.prototype, "recipeAnalysis", null);
    ApiController = __decorate([
        decorators_1.controller()
    ], ApiController);
    return ApiController;
}());
