"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
const errorHandler_1 = require("./middleware/errorHandler");
const app = (0, express_1.default)();
dotenv_1.default.config();
// Middleware
app.use((0, body_parser_1.json)());
app.use((0, body_parser_1.urlencoded)({ extended: true }));
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
app.use((0, morgan_1.default)("dev"));
// Routes
app.get("/", (req, res) => {
    res.send("Hello, Beautiful World");
});
app.use("/api", indexRoutes_1.default);
app.use(errorHandler_1.errorHandler);
// Database connection
database_1.database
    .sync({ force: true })
    .then(() => {
    if (process.env.NODE_ENV !== "test") {
        console.log("Database is connected successfully");
    }
})
    .catch((err) => {
    console.log(err);
});
// Start the server only if not in test environment
let server; // Explicitly type the server variable
if (process.env.NODE_ENV !== "test") {
    const PORT = process.env.PORT || 3000;
    server = app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
    // Graceful shutdown
    const gracefulShutdown = () => __awaiter(void 0, void 0, void 0, function* () {
        console.log("\n🔄 Initiating graceful shutdown...");
        try {
            yield database_1.database.close();
            console.log("Database connection closed");
            // Server closed successfully
            server.close(() => {
                console.log("Server stopped listening for requests");
                process.exit(0);
            });
        }
        catch (error) {
            console.error("Error during shutdown:", error);
            process.exit(1);
        }
    });
    // Handle termination signals
    process.on("SIGINT", gracefulShutdown);
    process.on("SIGTERM", gracefulShutdown);
}
exports.default = app;
