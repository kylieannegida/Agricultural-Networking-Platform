import Joi from "joi";
import { Request, Response, NextFunction } from "express";

/**
 * Friendship Validation Schema
 * This schema validates the friendship data
 */
const friendshipValidationSchema = Joi.object({
  FriendshipID: Joi.number().required().messages({
    "any.required": "FriendshipID is required",
    "number.base": "FriendshipID must be a number",
  }),

  UserID1: Joi.number().required().messages({
    "any.required": "UserID1 is required",
    "number.base": "UserID1 must be a number",
  }),

  UserID2: Joi.number().required().messages({
    "any.required": "UserID2 is required",
    "number.base": "UserID2 must be a number",
  }),

  Status: Joi.string()
    .valid("Pending", "Accepted", "Blocked")
    .required()
    .messages({
      "any.required": "Status is required",
      "string.base": "Status must be a string",
      "any.only": "Status must be one of: Pending, Accepted, Blocked",
    }),

  CreatedAt: Joi.date().messages({
    "date.base": "CreatedAt must be a valid date",
  }),

  UpdatedAt: Joi.date().messages({
    "date.base": "UpdatedAt must be a valid date",
  }),
});

// Helper function to validate friendship data
export const validateFriendship = (data: any) => {
  return friendshipValidationSchema.validate(data, { abortEarly: false });
};

// Middleware to validate friendship data
export const validateFriendshipMiddlewareV2 = (req: Request, res: Response, next: NextFunction) => {
  const { error } = validateFriendship(req.body);

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