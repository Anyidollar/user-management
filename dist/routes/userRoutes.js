"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const createUser_1 = require("../controllers/userController/createUser");
const getUsers_1 = require("../controllers/userController/getUsers");
const getUserCount_1 = require("../controllers/userController/getUserCount");
const getUserById_1 = require("../controllers/userController/getUserById");
const userRoutes = express_1.default.Router();
userRoutes.post("/register", createUser_1.userRegister);
userRoutes.get("/get-users", getUsers_1.getUsers);
userRoutes.get("/user-count", getUserCount_1.getUserCount);
userRoutes.get("/users/:id", getUserById_1.getUserById);
exports.default = userRoutes;
