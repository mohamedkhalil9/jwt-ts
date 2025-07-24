import { Request, Response, NextFunction } from "express";
import AppError from "../utils/appError";

const notFound = (req: Request, res: Response, next: NextFunction) => {
  return res
    .status(404)
    .json({ status: "error", message: "This resource is not available" });
};

const globalErrorHandler = (
  error: AppError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.status(error.statusCode || 500).json({
    status: error.status || "error",
    message: error.message,
    code: error.statusCode || 500,
    data: null,
  });
};

export { notFound, globalErrorHandler };
