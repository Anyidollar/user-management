import express from "express";
import { userRegister } from "../controllers/userController/userRegister";
import { getUsers } from "../controllers/userController/getUsers";

const userRoutes = express.Router();

userRoutes.post("/register", userRegister);
userRoutes.get("/get-users", getUsers);

export default userRoutes;
