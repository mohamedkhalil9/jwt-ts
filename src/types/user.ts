import { Types } from "mongoose";

enum userRole {
  USER = "User",
  ADMIN = "Admin",
  MANAGER = "Manager",
}

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: userRole;
  profileImg: string;
  gender: string;
  dateOfBirth: Date;
  phone: number;
  country: string;
  city: string;
  address: string;
  verified: boolean;
  otp: string;
  otpExpire: Date;
  otpverified: boolean;
  googleId: string;
  githubId: string;
  provider: string;
  token: string;
  validatePassword(password: string): Promise<void>;
  generateAccessToken(payload: { id: Types.ObjectId }): string;
  generateRefreshToken(payload: { id: Types.ObjectId }): string;
}
