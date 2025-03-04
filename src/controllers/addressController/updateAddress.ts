import { Request, Response, NextFunction } from "express";
import Address from "../../models/Address";
import User from "../../models/User";

export const updateAddress = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const { userId } = request.params;
    const { street, city, state, zipCode } = request.body;

    // Check if user exists
    const user = await User.findByPk(userId);
    if (!user) {
      response.status(404).json({ error: true, message: "User not found" });
      return;
    }

    // Check if address exists
    let address = await Address.findOne({ where: { userId } });
    if (!address) {
      response
        .status(404)
        .json({ error: true, message: "Address not found for this user" });
      return;
    }

    // Update the address
    address = await address.update({ street, city, state, zipCode });

    response.status(200).json({
      error: false,
      message: "Address updated successfully",
      data: address,
    });
  } catch (error) {
    next(error);
  }
};
