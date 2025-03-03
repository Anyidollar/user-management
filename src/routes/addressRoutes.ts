import express from "express";
import { createAddress } from "../controllers/addressController/createAddress";

const addressRoutes = express.Router();

addressRoutes.post("/create-address", createAddress);

export default addressRoutes;
