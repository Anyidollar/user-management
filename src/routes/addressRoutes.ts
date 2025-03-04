import express from "express";
import { createAddress } from "../controllers/addressController/createAddress";
import { getAddress } from "../controllers/addressController/getAddress";

const addressRoutes = express.Router();

addressRoutes.post("/create-address", createAddress);
addressRoutes.get("/get-address/:userId", getAddress);

export default addressRoutes;
