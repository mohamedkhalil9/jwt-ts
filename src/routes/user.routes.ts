import { Router } from "express";
import { authenticate, authorize } from "../middlewares/auth.middleware.ts";
import {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.ts";
const userRouter = Router();

userRouter.use(authenticate);

userRouter.get("/", authorize("Admin", "Manager"), getUsers);

userRouter
  .route("/:userId")
  .get(authorize("Admin", "Manager"), getUser)
  .patch(authorize("Admin"), updateUser)
  .delete(authorize("Admin"), deleteUser);

export default userRouter;
