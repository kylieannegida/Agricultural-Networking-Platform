import Joi from "joi";
import { Request, Response, NextFunction } from "express";

/**
 * Share Validation Schema
 * This schema validates the share data
 */
const shareValidationSchema = Joi.object({
  ShareID: Joi.number().required().messages({
    "any.required": "ShareID is required",
    "number.base": "ShareID must be a number",
  }),

  UserID: Joi.number().required().messages({
    "any.required": "UserID is required",
    "number.base": "UserID must be a number",
  }),

  PostID: Joi.number().required().messages({
    "any.required": "PostID is required",
    "number.base": "PostID must be a number",
  }),

  CreatedAt: Joi.date().messages({
    "date.base": "CreatedAt must be a valid date",
  }),

  SharedMessage: Joi.string().allow(null, "").messages({
    "string.base": "SharedMessage must be a string",
  }),

  VisibilitySettings: Joi.string().required().messages({
    "any.required": "VisibilitySettings is required",
    "string.base": "VisibilitySettings must be a string",
  }),
});

// Helper function to validate share data
export const validateShare = (data: any) => {
  return shareValidationSchema.validate(data, { abortEarly: false });
};

// Middleware to validate share data
export const validateShareMiddlewareV2 = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = validateShare(req.body);

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