import User from "../models/user.model.ts";
import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler.ts";
import AppError from "../utils/appError.ts";

export const register = asyncHandler(async (req: Request, res: Response) => {
  // NOTE: this data is validated on the request
  const userData = req.body;

  const user = await User.findOne({ email: userData.email });
  if (user) throw new AppError("Email already exists", 409);

  const newUser = await User.create({
    ...userData,
    profileImg: `https://eu.ui-avatars.com/api/?name=${userData.firstName}+${userData.lastName}`,
  });

  res.status(201).json({ status: "success", data: newUser });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) throw new AppError("Invalid Email or Password", 401);
});
export const logout = asyncHandler(async (req: Request, res: Response) => {});
export const passportOauth = asyncHandler(
  async (req: Request, res: Response) => {},
);
export const forgotPassword = asyncHandler(
  async (req: Request, res: Response) => {},
);
export const verifyOtp = asyncHandler(
  async (req: Request, res: Response) => {},
);
export const resetPassword = asyncHandler(
  async (req: Request, res: Response) => {},
);
export const refreshToken = asyncHandler(
  async (req: Request, res: Response) => {},
);
