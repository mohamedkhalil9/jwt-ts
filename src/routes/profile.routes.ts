import { Router } from "express";
import {
  getProfile,
  updateProfile,
  deleteProfile,
  sendVerifyEmail,
  verifyEmail,
  updatePassword,
  uploadProfileImg,
} from "../controllers/profile.controller.ts";
import { authenticate } from "../middlewares/auth.middleware.ts";

const profileRouter = Router();

profileRouter.use(authenticate);

profileRouter
  .route("/")
  .get(getProfile)
  .patch(updateProfile)
  .delete(deleteProfile);

profileRouter.get("/verify-email", sendVerifyEmail);
profileRouter.get("/verify-email/:token", verifyEmail);

profileRouter.patch("/update-password", updatePassword);

profileRouter.patch("/upload", uploadProfileImg);

export default profileRouter;
