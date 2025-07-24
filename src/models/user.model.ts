import mongoose from "mongoose";
import bcrypt from "bcrypt";
import AppError from "../utils/appError.ts";
import jwt from "jsonwebtoken";
import { User } from "../types/user.ts";

const userSchema = new mongoose.Schema<User>({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  role: { type: String, enum: ["User", "Admin", "Manager"] },
  profileImg: String,
  gender: { type: String, enum: ["Male", "Female"] },
  dateOfBirth: Date,
  phone: String,
  country: String,
  city: String,
  address: String,
  verified: Boolean,
  otp: String,
  otpExpire: Date,
  otpverified: Boolean,
  googleId: String,
  githubId: String,
  provider: { type: String, enum: ["google", "github"] },
  token: String,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});
userSchema.methods.validatePassword = async function (
  password: string,
): Promise<void> {
  const valid = await bcrypt.compare(password, this.password);
  if (!valid) throw new AppError("Invalid Email or Password", 401);
};

userSchema.methods.generateAccessToken = function (payload: {
  id: string;
}): string {
  const token = jwt.sign(payload, process.env.ACCESS_SECRET ?? "some-secret", {
    expiresIn: "5m",
  });
  return token;
};
userSchema.methods.generateRefreshToken = function (payload: {
  id: string;
}): string {
  const token = jwt.sign(payload, process.env.REFRESH_SECRET ?? "some-secret", {
    expiresIn: "1w",
  });
  return token;
};

const User = mongoose.model("User", userSchema);

export default User;
