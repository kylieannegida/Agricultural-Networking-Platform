import Joi from "joi";
import { Request, Response, NextFunction } from "express";

/**
 * Comment Validation Schema
 * This follows the structured format with validation
 */
const commentValidationSchema = Joi.object({
  CommentID: Joi.number().required().messages({
    "any.required": "CommentID is required",
    "number.base": "CommentID must be a number",
  }),
  
  UserID: Joi.number().required().messages({
    "any.required": "UserID is required",
    "number.base": "UserID must be a number",
  }),
  
  PostID: Joi.number().required().messages({
    "any.required": "PostID is required",
    "number.base": "PostID must be a number",
  }),
  
  Content: Joi.string().required().messages({
    "any.required": "Content is required",
    "string.base": "Content must be a string",
  }),
  
  CreatedAt: Joi.date().required().messages({
    "date.base": "CreatedAt must be a valid date",
    "any.required": "CreatedAt is required",
  }),
  
  UpdatedAt: Joi.date().required().messages({
    "date.base": "UpdatedAt must be a valid date",
    "any.required": "UpdatedAt is required",
  }),
  
  ParentCommentID: Joi.number().allow(null).optional().messages({
    "number.base": "ParentCommentID must be a number",
  }),
  
  Mentions: Joi.array().items(Joi.string()).optional().messages({
    "array.base": "Mentions must be an array of strings",
  }),
  
  MediaURL: Joi.string().allow(null).optional().messages({
    "string.base": "MediaURL must be a string",
  }),
  
  Status: Joi.string().valid("active", "deleted", "hidden").required().messages({
    "any.required": "Status is required",
    "string.base": "Status must be a string",
    "any.only": "Status must be one of 'active', 'deleted', or 'hidden'",
  }),
});

// Helper function to validate comment data
export const validateComment = (data: any) => {
  return commentValidationSchema.validate(data, { abortEarly: false });
};

// Middleware to validate comment data
export const validateCommentMiddlewareV2 = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = validateComment(req.body);

  if (error) {
    return res.status(400).json({
      message: "Validation error",
      errors: error.details.map((err) => ({
        field: err.path.join(". "),
        message: err.message,
      })),
    });
  }

  next();
};