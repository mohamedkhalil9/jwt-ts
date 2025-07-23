import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler.ts";
import AppError from "../utils/appError.ts";

export const register = asyncHandler(async (req: Request, res: Response) => {
  const data = req.body;

  if (!data) throw new AppError("please enter some data", 422);
  res.status(200).json({ status: "success", data });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  res.send(req.body);
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
