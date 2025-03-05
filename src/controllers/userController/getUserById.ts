import { Request, Response, NextFunction } from "express";
import User from "../../models/User";
import Address from "../../models/Address";

export const getUserById = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const { id } = request.params;

    const user = await User.findOne({
      where: { id },
      include: [
        {
          model: Address,
          as: "address",
          attributes: ["id", "street", "city", "state", "zipCode"],
        },
      ],
    });

    if (!user) {
      response.status(404).json({ error: true, message: "User not found" });
      return;
    }

    response.status(200).json({
      error: false,
      message: "User retrieved successfully",
      data: user,
    });
    return;
  } catch (error) {
    next(error);
  }
};
