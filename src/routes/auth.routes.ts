import { Router } from "express";
import {
  register,
  login,
  logout,
  passportOauth,
  forgotPassword,
  verifyOtp,
  resetPassword,
  refreshToken,
} from "../controllers/auth.controller.ts";

const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);

authRouter.get("/google", passportOauth);
authRouter.get("/google/callback", passportOauth);

authRouter.get("/github", passportOauth);
authRouter.get("/github/callback", passportOauth);

authRouter.post("/forgot-password", forgotPassword);
authRouter.post("/verify-opt", verifyOtp);
authRouter.post("/reset-password", resetPassword);

authRouter.post("/refresh-token", refreshToken);

export default authRouter;
