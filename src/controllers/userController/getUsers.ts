import { Request, Response, NextFunction } from "express";
import User from "../../models/User";

export const getUsers = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    let { pageNumber, pageSize } = request.query;

    const page = parseInt(pageNumber as string) || 0;
    const size = parseInt(pageSize as string) || 10;

    if (page < 0 || size <= 0) {
      response.status(400).json({
        error: true,
        message:
          "Invalid pagination parameters. pageNumber must be >= 0, pageSize must be > 0.",
      });
      return;
    }

    const { count, rows: users } = await User.findAndCountAll({
      offset: page * size,
      limit: size,
      order: [["createdAt", "DESC"]],
    });

    response.status(200).json({
      error: false,
      message: "Users retrieved successfully",
      totalUsers: count,
      currentPage: page,
      pageSize: size,
      totalPages: Math.ceil(count / size),
      data: users,
    });
  } catch (error) {
    next(error);
  }
};
