import express from "express";
import "dotenv/config";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import compression from "compression";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss";
import hpp from "hpp";
import passport from "passport";
import { notFound, globalErrorHandler } from "./middlewares/errorHandler.ts";
import appRouter from "./routes/index.ts";

const app = express();

app.use(morgan("dev"));
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use("/api", apiLimiter);

app.use(helmet());
app.use(compression());
app.use(
  cors({
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser("someCookieSecret"));

// app.use(mongoSanitize());
// app.use(xss());
app.use(hpp());

app.use(passport.initialize());

app.use("/api/v1", appRouter);

app.use(notFound);
app.use(globalErrorHandler);

export default app;
