import express from "express";
import userRoutes from "./userRoutes";

const indexRoutes = express.Router();

// indexRoutes.route("/users");
indexRoutes.use("/users", userRoutes);

export default indexRoutes;
