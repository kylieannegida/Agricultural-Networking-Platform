import Joi from "joi";
import { Request, Response, NextFunction } from "express";

/**
 * Blocked Users Validation Schema
 * This follows the structured format with validation
 */
const blockedUsersValidationSchema = Joi.object({
  BlockID: Joi.number().required().messages({
    "any.required": "Block ID is required",
    "number.base": "Block ID must be a number",
  }),

  UserID: Joi.number().required().messages({
    "any.required": "User ID is required",
    "number.base": "User ID must be a number",
  }),

  BlockedUserID: Joi.number().required().messages({
    "any.required": "Blocked User ID is required",
    "number.base": "Blocked User ID must be a number",
  }),

  CreatedAt: Joi.date().optional().messages({
    "date.base": "CreatedAt must be a valid date",
  }),

  Reason: Joi.string()
    .valid("Spam", "Harassment", "Inappropriate Content", "Other")
    .required()
    .messages({
      "any.required": "Reason is required",
      "string.base": "Reason must be a string",
      "any.only": "Reason must be one of Spam, Harassment, Inappropriate Content, or Other",
    }),
});

// Helper function to validate blocked user data
export const validateBlockedUsers = (data: any) => {
  return blockedUsersValidationSchema.validate(data, { abortEarly: false });
};

// Middleware to validate blocked user data
export const validateBlockedUsersMiddlewareV2 = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = validateBlockedUsers(req.body);

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