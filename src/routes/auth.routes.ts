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
import { registerSchema, loginSchema } from "../schemas/user.schema.ts";
import { validateBody } from "../middlewares/validation.middleware.ts";

const authRouter = Router();

authRouter.post("/register", validateBody(registerSchema), register);
authRouter.post("/login", validateBody(loginSchema), login);
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
