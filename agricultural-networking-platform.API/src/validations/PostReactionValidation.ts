import Joi from "joi";
import { Request, Response, NextFunction } from "express";

/**
 * Post Reaction Validation Schema
 * This schema validates the post reaction data
 */
const postReactionValidationSchema = Joi.object({
  ReactionID: Joi.number().required().messages({
    "any.required": "ReactionID is required",
    "number.base": "ReactionID must be a number",
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
    .valid("like", "love", "haha", "wow", "sad", "angry")
    .required()
    .messages({
      "any.required": "ReactionType is required",
      "string.base": "ReactionType must be a string",
      "any.only": "ReactionType must be one of: like, love, haha, wow, sad, angry",
    }),

  CreatedAt: Joi.date().messages({
    "date.base": "CreatedAt must be a valid date",
  }),

  UpdatedAt: Joi.date().messages({
    "date.base": "UpdatedAt must be a valid date",
  }),
});

// Helper function to validate post reaction data
export const validatePostReaction = (data: any) => {
  return postReactionValidationSchema.validate(data, { abortEarly: false });
};

// Middleware to validate post reaction data
export const validatePostReactionMiddlewareV2 = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = validatePostReaction(req.body);

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