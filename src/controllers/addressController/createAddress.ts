import { Request, Response } from "express";
import Address from "../../models/Address";
import User from "../../models/User";
import { v4 } from "uuid";

export const createAddress = async (request: Request, response: Response) => {
  try {
    const { userId } = request.params;
    const { street, city, state, zipCode } = request.body;

    const user = await User.findByPk(userId);

    if (!user) {
      response.status(404).json({ error: true, message: "User not found" });
      return;
    }

    //check if the user already has an address
    const existingAddress = await Address.findOne({ where: { userId } });
    if (existingAddress) {
      response
        .status(400)
        .json({ error: true, message: "User already has an address" });
      return;
    }

    const id = v4();
    // Create new address
    const newAddress = await Address.create({
      id,
      userId,
      street,
      city,
      state,
      zipCode,
    });

    response.status(201).json({
      error: false,
      message: "Address created successfully",
      data: newAddress,
    });
  } catch (error: any) {
    response.status(500).json({
      error: true,
      message: "Internal server error",
      errorMessage: error.message,
    });
  }
};
