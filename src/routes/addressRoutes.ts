import express from "express";
import { createAddress } from "../controllers/addressController/createAddress";
import { getAddress } from "../controllers/addressController/getAddress";
import { updateAddress } from "../controllers/addressController/updateAddress";

const addressRoutes = express.Router();

addressRoutes.post("/create-address", createAddress);
addressRoutes.patch("/update-address/:userId", updateAddress);
addressRoutes.get("/get-address/:userId", getAddress);

export default addressRoutes;
