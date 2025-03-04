"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoutes_1 = __importDefault(require("./userRoutes"));
const addressRoutes_1 = __importDefault(require("./addressRoutes"));
const postRoutes_1 = __importDefault(require("./postRoutes"));
const indexRoutes = express_1.default.Router();
// indexRoutes.route();
indexRoutes.use(userRoutes_1.default);
indexRoutes.use(addressRoutes_1.default);
indexRoutes.use(postRoutes_1.default);
exports.default = indexRoutes;
