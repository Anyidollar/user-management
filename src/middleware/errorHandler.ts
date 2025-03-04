import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  error: any,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  console.error("Server error:", error);
  response.status(error.status || 500).json({
    error: true,
    message: error.message || "Internal server error",
    ...(process.env.NODE_ENV === "development" && {
      errorDetails: error.stack,
    }),
  });
};
