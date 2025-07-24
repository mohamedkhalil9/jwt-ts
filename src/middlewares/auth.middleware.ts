import { Request, Response, NextFunction } from "express";
import asyncHandler from "../utils/asyncHandler.ts";
import AppError from "../utils/appError.ts";
import { verifyToken } from "../utils/verifyToken.ts";

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

export const authorize = (...roles) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // const user = await
  };
};
