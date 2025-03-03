import { Request, Response } from "express";
import User from "../../models/User";

export const getUsers = async (request: Request, response: Response) => {
  try {
    let { pageNumber, pageSize } = request.query;

    const page = parseInt(pageNumber as string) || 0;
    const size = parseInt(pageSize as string) || 10;

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
  } catch (error: any) {
    response.status(500).json({
      error: true,
      message: "Internal server error",
      errorMessage: error.message,
    });
  }
};
