import { Request, Response } from "express";
import { v4 } from "uuid";
import Post from "../../models/Post";
import User from "../../models/User";

export const createPost = async (request: Request, response: Response) => {
  try {
    const { title, body, userId } = request.body;

    // Validate input data
    if (!title || !body || !userId) {
      response.status(400).json({
        error: true,
        message: "All fields (title, body, userId) are required",
      });
      return;
    }

    // Check if user exists
    const user = await User.findByPk(userId);
    if (!user) {
      response.status(404).json({ error: true, message: "User not found" });
      return;
    }

    const id = v4();

    // Create new post
    const post = await Post.create({
      id,
      userId,
      title,
      body,
    });

    response.status(201).json({
      error: false,
      message: "Post created successfully",
      data: post,
    });
  } catch (error: any) {
    response.status(500).json({
      error: true,
      message: "Internal server error",
      errorMessage: error.message,
    });
  }
};
