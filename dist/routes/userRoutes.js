"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRegister_1 = require("../controllers/userController/userRegister");
const getUsers_1 = require("../controllers/userController/getUsers");
const userRoutes = express_1.default.Router();
userRoutes.post("/register", userRegister_1.userRegister);
userRoutes.get("/get-users", getUsers_1.getUsers);
exports.default = userRoutes;
