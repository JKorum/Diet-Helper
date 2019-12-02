"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dotenv_1 = require("dotenv");
var AppRouter_1 = require("./AppRouter");
dotenv_1.config();
var app = express_1.default();
var port = process.env.PORT || 3003;
require("./controllers/ApiController");
// app.use(express.json())
app.use('/api', AppRouter_1.AppRouter.getInstance());
app.listen(port, function () {
    console.log("server is running on port: " + port);
});
