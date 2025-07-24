import jwt from "jsonwebtoken";
import AppError from "./appError.ts";

export const verifyToken = (token: string, secret: string) => {
  try {
    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch (error) {
    throw new AppError("invalid token", 401);
  }
};
