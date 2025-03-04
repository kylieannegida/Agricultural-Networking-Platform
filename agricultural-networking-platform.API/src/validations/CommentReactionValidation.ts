import Joi from "joi";
import { Request, Response, NextFunction } from "express";

/**
 * Comment Reaction Validation Schema
 * This follows the structured format with validation
 */
const commentReactionValidationSchema = Joi.object({
  ReactionID: Joi.number().required().messages({
    "any.required": "Reaction ID is required",
    "number.base": "Reaction ID must be a number",
  }),

  UserID: Joi.number().required().messages({
    "any.required": "User ID is required",
    "number.base": "User ID must be a number",
  }),

  CommentID: Joi.number().required().messages({
    "any.required": "Comment ID is required",
    "number.base": "Comment ID must be a number",
  }),

  CreatedAt: Joi.date().optional().messages({
    "date.base": "CreatedAt must be a valid date",
  }),

  ReactionType: Joi.string().required().messages({
    "any.required": "Reaction Type is required",
    "string.base": "Reaction Type must be a string",
  }),
});

// Helper function to validate comment reaction data
export const validateCommentReaction = (data: any) => {
  return commentReactionValidationSchema.validate(data, { abortEarly: false });
};

// Middleware to validate comment reaction data
export const validateCommentReactionMiddlewareV2 = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = validateCommentReaction(req.body);

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