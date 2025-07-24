import { Request, Response, NextFunction } from "express";
import Joi from "joi";

const validate = (schema: Joi.ObjectSchema, source: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const data =
      source === "body"
        ? req.body
        : source === "params"
          ? req.params
          : req.query;

    const { error } = schema.validate(data);
    if (error) {
      const errors = error.details.map((detail) => ({
        field: detail.path.join("."),
        message: detail.message.replace(/['"]/g, ""),
      }));
      return res.status(422).json({ status: "error", errors });
    }
    next();
  };
};

export const validateBody = (schema: Joi.ObjectSchema) =>
  validate(schema, "body");

export const validateParams = (schema: Joi.ObjectSchema) =>
  validate(schema, "params");

export const validateQuery = (schema: Joi.ObjectSchema) =>
  validate(schema, "query");
