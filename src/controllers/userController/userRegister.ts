import { Request, Response, NextFunction } from "express";
import User from "../../models/User";
import { v4 } from "uuid";
import { hashPassword } from "../../services/password";

export const userRegister = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const { lastName, firstName, email, password } = request.body;

    //Validate request body
    if (!lastName || !firstName || !email || !password) {
      response.status(400).json({
        error: true,
        message:
          "All fields (lastName, firstName, email, password) are required.",
      });
      return;
    }

    const existingEmail = await User.findOne({ where: { email } });

    if (existingEmail) {
      response.status(409).json({
        error: true,
        message: `User with email ${email} already exists.`,
      });
      return;
    }

    const id = v4();

    const hashedPassword = await hashPassword(password);

    // Create new user
    const newUser = await User.create({
      id,
      email,
      firstName,
      lastName,
      password: hashedPassword,
    });

    response.status(201).json({
      message: "User registration successful",
      error: false,
      data: newUser,
    });
  } catch (error) {
    next(error);
  }
};
