"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildQuery = function (data) {
    var q = data.q, from = data.from, diet = data.diet, health = data.health, calories = data.calories;
    var result = "?q=" + encodeURIComponent(q);
    if (typeof from === 'string') {
        result = result + ("&from=" + from);
    }
    if (typeof diet === 'string') {
        result = result + ("&diet=" + diet);
    }
    if (typeof calories === 'string') {
        result = result + ("&calories=" + encodeURIComponent(calories));
    }
    if (typeof health === 'string') {
        result = result + ("&health=" + health);
    }
    if (Array.isArray(health)) {
        health.forEach(function (item) {
            result = result + ("&health=" + item);
        });
    }
    return result.toLowerCase();
};
