"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = require("dotenv");
var express_1 = __importDefault(require("express"));
var client_sessions_1 = __importDefault(require("client-sessions"));
var chalk_1 = __importDefault(require("chalk"));
var AppRouter_1 = require("./AppRouter");
dotenv_1.config();
require("./database/config");
var app = express_1.default();
var port = process.env.PORT || 3003;
require("./controllers/ApiController");
require("./controllers/AuthController");
require("./controllers/UserController");
var pass = process.env.COOKIE_PASS;
if (!pass) {
    console.log(chalk_1.default.black.bgRed('env variable COOKIE_PASS inaccessible'));
    process.exit(1);
}
else if (typeof pass === 'string') {
    app.use(client_sessions_1.default({
        cookieName: 'session',
        secret: pass,
        duration: 24 * 60 * 60 * 1000,
        cookie: {
            httpOnly: true
        }
    }));
}
app.use(express_1.default.json());
app.use('/api', AppRouter_1.AppRouter.getInstance());
app.listen(port, function () {
    console.log(chalk_1.default.black.bgGreen("Server is running on port: " + port));
});
