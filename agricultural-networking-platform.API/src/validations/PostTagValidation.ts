import Joi from "joi";
import { Request, Response, NextFunction } from "express";

/**
 * Post Tag Validation Schema
 * This schema validates the post tag data
 */
const postTagValidationSchema = Joi.object({
  TagID: Joi.number().required().messages({
    "any.required": "TagID is required",
    "number.base": "TagID must be a number",
  }),

  PostID: Joi.number().required().messages({
    "any.required": "PostID is required",
    "number.base": "PostID must be a number",
  }),

  UserID: Joi.number().required().messages({
    "any.required": "UserID is required",
    "number.base": "UserID must be a number",
  }),

  CreatedAt: Joi.date().messages({
    "date.base": "CreatedAt must be a valid date",
  }),
});

// Helper function to validate post tag data
export const validatePostTag = (data: any) => {
  return postTagValidationSchema.validate(data, { abortEarly: false });
};

// Middleware to validate post tag data
export const validatePostTagMiddlewareV2 = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = validatePostTag(req.body);

  if (error) {
    return res.status(400).json({
      message: "Validation error",
      errors: error.details.map((err) => ({
        field: err.path.join("."),
        message: err.message,
      })),
    });
  }

  next();
};