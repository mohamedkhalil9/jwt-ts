import { Request, Response, NextFunction } from "express";
import AppError from "../utils/appError.ts";
import { verifyToken } from "../utils/verifyToken.ts";
import User from "../models/user.model.ts";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization ?? req.signedCookies.access;

  if (!token) throw new AppError("token is required", 401);

  const payload = verifyToken(token, process.env.ACCESS_SECRET);
  req.user = payload;
  next();
};

export const authorize = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findById(req.user.id);

    if (!roles.includes(user.role)) throw new AppError("Access Denied", 403);
    next();
  };
};
