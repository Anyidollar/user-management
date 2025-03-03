import { Request, Response } from "express";
import User from "../../models/User";

export const getUserCount = async (request: Request, response: Response) => {
  try {
    const count = await User.count();

    response.status(200).json({
      error: false,
      message: "User count retrieved successfully",
      data: count,
    });
  } catch (error: any) {
    response.status(500).json({
      error: true,
      message: "Internal server error",
      errorMessage: error.message,
    });
  }
};
