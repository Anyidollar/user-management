import { Request, Response, NextFunction } from "express";
import User from "../../models/User";

export const getUserCount = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const count = await User.count();

    response.status(200).json({
      error: false,
      message: "User count retrieved successfully",
      data: count,
    });
  } catch (error) {
    next(error);
  }
};
