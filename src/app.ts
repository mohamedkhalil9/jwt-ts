import express from "express";
import "dotenv/config";
import appRouter from "./routes/index.ts";

const app = express();

app.use(express.json());
app.use("/api/v1", appRouter);

export default app;
