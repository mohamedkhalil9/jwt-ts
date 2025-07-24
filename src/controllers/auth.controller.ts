import User from "../models/user.model.ts";
import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler.ts";
import AppError from "../utils/appError.ts";
import jwt from "jsonwebtoken";

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

  await user.validatePassword(password);

  const payload = { id: user._id };
  const accessToken = user.generateAccessToken(payload);
  const refreshToken = user.generateRefreshToken(payload);
  user.token = refreshToken;
  await user.save();

  res
    .status(200)
    .cookie("access", accessToken, {
      httpOnly: true,
      signed: true,
      secure: true,
      // sameSite: "strict"
      maxAge: 1000 * 60 * 5,
    })
    .cookie("refresh", refreshToken, {
      httpOnly: true,
      signed: true,
      secure: true,
      // sameSite: "strict"
      // path: '/api/v1/auth/refresh-token'
      maxAge: 1000 * 60 * 60 * 24 * 7,
    })
    .json({ status: "success", data: { accessToken, refreshToken, user } });
});

export const logout = asyncHandler(async (req: Request, res: Response) => {
  const token = req.signedCookies.refresh;
  if (!token) res.sendStatus(204);

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.REFRESH_SECRET);
  } catch (error) {
    return new AppError("Invalid token", 401);
  }

  const user = await User.findByIdAndUpdate(decoded.id, { token: undefined });

  res
    .status(200)
    .clearCookie("access", { httpOnly: true, signed: true })
    .clearCookie("refresh", { httpOnly: true, signed: true })
    .json({ status: "seccess" });
});

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
