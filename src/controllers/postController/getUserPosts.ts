import { Request, Response, NextFunction } from "express";
import Post from "../../models/Post";
import User from "../../models/User";

export const getUserPosts = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const userId = request.query.userId as string;

    // Validate the userId parameter
    if (!userId) {
      response.status(400).json({
        error: true,
        message: "userId is required as a query parameter",
      });
      return;
    }

    // Check if the user exists
    const user = await User.findByPk(userId);
    if (!user) {
      response.status(404).json({ error: true, message: "User not found" });
      return;
    }

    // Fetch posts for the given userId
    const posts = await Post.findAll({
      where: { userId },
      order: [["createdAt", "DESC"]],
    });

    response.status(200).json({
      error: false,
      message: "User posts retrieved successfully",
      data: posts,
    });
  } catch (error) {
    next(error);
  }
};
