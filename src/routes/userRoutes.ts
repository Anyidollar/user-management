import express from "express";
import { userRegister } from "../controllers/userController/userRegister";
import { getUsers } from "../controllers/userController/getUsers";
import { getUserCount } from "../controllers/userController/getUserCount";
import { getUserById } from "../controllers/userController/getUserById";

const userRoutes = express.Router();

userRoutes.post("/register", userRegister);
userRoutes.get("/get-users", getUsers);
userRoutes.get("/user-count", getUserCount);
userRoutes.get("/users/:id", getUserById);

export default userRoutes;
