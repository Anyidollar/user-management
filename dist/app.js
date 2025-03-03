"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = require("body-parser");
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const database_1 = require("./config/database");
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use((0, body_parser_1.json)());
app.use((0, body_parser_1.urlencoded)({ extended: true }));
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
app.use((0, morgan_1.default)("dev"));
app.get("/", (req, res) => {
    res.send("Hello Betavon-AI-Solution");
});
app.use("/v1", indexRoutes_1.default);
database_1.database
    .sync({})
    .then(() => {
    console.log("Database is connected successfully");
})
    .catch((err) => {
    console.log(err);
});
app.listen(process.env.PORT || 3000, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
exports.default = app;
