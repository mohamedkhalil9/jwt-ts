import { Router } from "express";
import authRoutes from "./auth.routes.ts";
import profileRoutes from "./profile.routes.ts";
import userRoutes from "./user.routes.ts";

const appRouter = Router();

appRouter.use("/auth", authRoutes);
appRouter.use("/profile", profileRoutes);
appRouter.use("/users", userRoutes);

export default appRouter;
