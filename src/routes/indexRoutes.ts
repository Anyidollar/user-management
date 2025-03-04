import express from "express";
import userRoutes from "./userRoutes";
import addressRoutes from "./addressRoutes";
import postRoutes from "./postRoutes";

const indexRoutes = express.Router();

// indexRoutes.route();
indexRoutes.use(userRoutes);
indexRoutes.use(addressRoutes);
indexRoutes.use(postRoutes);

export default indexRoutes;
