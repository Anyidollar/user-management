import { Request, Response } from "express";
import Address from "../../models/Address";
import User from "../../models/User";

export const getAddress = async (request: Request, response: Response) => {
  try {
    const { userId } = request.params;

    // Check if user exists
    const user = await User.findByPk(userId);
    if (!user) {
      response.status(404).json({ error: true, message: "User not found" });
      return;
    }

    // Fetch the user's address
    const address = await Address.findOne({ where: { userId } });

    if (!address) {
      response
        .status(404)
        .json({ error: true, message: "Address not found for this user" });
      return;
    }

    response.status(200).json({
      error: false,
      message: "Address retrieved successfully",
      data: address,
    });
  } catch (error: any) {
    response.status(500).json({
      error: true,
      message: "Internal server error",
      errorMessage: error.message,
    });
  }
};
