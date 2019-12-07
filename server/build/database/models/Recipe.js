"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var RecipeSchema = new mongoose_1.default.Schema({
    owner: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true
    },
    label: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    source: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    yield: {
        type: Number,
        required: true
    },
    dietLabels: {
        type: [String],
        required: true
    },
    healthLabels: {
        type: [String],
        required: true
    },
    cautions: {
        type: [String],
        required: true
    },
    ingredientLines: {
        type: [String],
        required: true
    },
    calories: {
        type: Number,
        required: true
    },
    totalWeight: {
        type: Number,
        required: true
    },
    totalTime: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});
exports.Recipe = mongoose_1.default.model('Recipe', RecipeSchema);
