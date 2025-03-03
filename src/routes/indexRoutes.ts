import express from "express";
import userRoutes from "./userRoutes";
import addressRoutes from "./addressRoutes";

const indexRoutes = express.Router();

// indexRoutes.route("/users");
indexRoutes.use(userRoutes);
indexRoutes.use(addressRoutes);

export default indexRoutes;
