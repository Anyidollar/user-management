import { Request, Response } from "express";
import User from "../../models/User";
import Address from "../../models/Address";

export const getUserById = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;

    const user = await User.findOne({
      where: { id },
      include: [
        {
          model: Address,
          as: "address",
          attributes: ["street", "city", "state", "zipCode"],
        },
      ],
    });

    if (!user) {
      response.status(404).json({ error: true, message: "User not found" });
    }

    response.status(200).json({
      error: false,
      message: "User retrieved successfully",
      data: user,
    });
  } catch (error: any) {
    response.status(500).json({
      error: true,
      message: "Internal server error",
      errorMessage: error.message,
    });
  }
};
