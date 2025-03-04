import { Request, Response, NextFunction } from "express";
import Post from "../../models/Post";

export const deletePost = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const { id } = request.params;

    // Check if the post exists
    const post = await Post.findByPk(id);
    if (!post) {
      response.status(404).json({
        error: true,
        message: "Post not found",
      });
      return;
    }

    // Delete the post
    await post.destroy();

    response.status(200).json({
      error: false,
      message: "Post deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
