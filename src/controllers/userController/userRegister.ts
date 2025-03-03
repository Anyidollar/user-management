import { Request, Response } from "express";
import User from "../../models/User";
import { v4 } from "uuid";
import { hashPassword } from "../../services/password";

export const userRegister = async (request: Request, response: Response) => {
  try {
    const { lastName, firstName, email, password } = request.body;

    const existingEmail = await User.findOne({ where: { email } });

    if (existingEmail) {
      response
        .status(400)
        .json({ error: true, message: `${email} already exists` });
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

    response.status(200).json({
        message: "Registration successful",
      error: false,
      data: newUser,
      
    });
  } catch (error: any) {
    response.status(500).json({
      error: true,
      message: "Internal server error",
      errorMessage: error.message,
    });
  }
};
