import bcrypt from "bcryptjs";

export const hashPassword = async (password: string) => {
  const saltRounds = 10;
  try {
    return await bcrypt.hash(password, saltRounds);
  } catch (error) {
    throw new Error("Password hashing failed");
  }
};
