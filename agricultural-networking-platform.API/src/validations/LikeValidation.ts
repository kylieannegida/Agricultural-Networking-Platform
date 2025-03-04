import Joi from "joi";
import { Request, Response, NextFunction } from "express";

/**
 * Like Validation Schema
 * This schema validates the like data
 */
const likeValidationSchema = Joi.object({
  LikeID: Joi.number().required().messages({
    "any.required": "LikeID is required",
    "number.base": "LikeID must be a number",
  }),

  UserID: Joi.number().required().messages({
    "any.required": "UserID is required",
    "number.base": "UserID must be a number",
  }),

  PostID: Joi.number().required().messages({
    "any.required": "PostID is required",
    "number.base": "PostID must be a number",
  }),

  ReactionType: Joi.string()
    .valid("Like", "Love", "Haha", "Wow", "Sad", "Angry")
    .required()
    .messages({
      "any.required": "ReactionType is required",
      "string.base": "ReactionType must be a string",
      "any.only": "ReactionType must be one of: Like, Love, Haha, Wow, Sad, Angry",
    }),

  CreatedAt: Joi.date().messages({
    "date.base": "CreatedAt must be a valid date",
  }),
});

// Helper function to validate like data
export const validateLike = (data: any) => {
  return likeValidationSchema.validate(data, { abortEarly: false });
};

// Middleware to validate like data
export const validateLikeMiddlewareV2 = (req: Request, res: Response, next: NextFunction) => {
  const { error } = validateLike(req.body);

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