import { Request, Response } from "express";
import User from "../../models/User";
import Post from "../../models/Post";

export const getUserPosts = async (req: Request, res: Response) => {
  try {
    const userId = req.query.userId as string;

    // Validate the userId parameter
    if (!userId) {
      res.status(400).json({
        error: true,
        message: "userId is required as a query parameter",
      });
      return;
    }

    // Check if the user exists
    const user = await User.findByPk(userId);
    if (!user) {
      res.status(404).json({ error: true, message: "User not found" });
      return;
    }

    // Fetch posts for the given userId
    const posts = await Post.findAll({
      where: { userId },
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({
      error: false,
      message: "User posts retrieved successfully",
      data: posts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, message: "Internal server error" });
  }
};
